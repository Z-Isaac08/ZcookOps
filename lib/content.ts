import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { parseCustomDate } from "./utils";
import writeupsIndex from "../content/index.json";

const contentDirectory = path.join(process.cwd(), "content");

export interface WriteupMetadata {
  isFolder?: false;
  title: string;
  date: string;
  tags: string[];
  category: string;
  lang: string;
  description: string;
  difficulty?: "easy" | "medium" | "hard" | "insane";
  slug: string;
  folderSlug?: string;
  platform?: string;
  readingTime?: number;
}

export interface FolderMetadata {
  isFolder: true;
  slug: string;
  title: string;
  date: string;
  tags: string[];
  category: string;
  lang: string;
  description: string;
  difficulty?: "easy" | "medium" | "hard" | "insane";
  platform?: string;
  readingTime?: number;
  items: WriteupMetadata[];
}

export type ContentItem = WriteupMetadata | FolderMetadata;

export function getWriteupsByCategory(category: string, lang: string): ContentItem[] {
  return (writeupsIndex as ContentItem[]).filter(
    (w) => w.category === category && w.lang === lang
  );
}

export function getAllWriteups(lang: string): ContentItem[] {
  return (writeupsIndex as ContentItem[]).filter((w) => w.lang === lang);
}

export function getFolder(category: string, folderSlug: string): FolderMetadata | null {
  const item = (writeupsIndex as ContentItem[]).find(
    (w) => w.isFolder && w.category === category && w.slug === folderSlug
  );
  return (item as FolderMetadata) || null;
}

export function getWriteup(category: string, slug: string) {
  const fullPath = path.join(contentDirectory, category, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const indexed = (writeupsIndex as ContentItem[]).find(
    (w) => !w.isFolder && w.category === category && w.slug === slug
  ) as WriteupMetadata | undefined;

  return {
    metadata: {
      slug,
      ...(data as Omit<WriteupMetadata, "slug">),
      readingTime: indexed?.readingTime,
      platform: indexed?.platform,
    },
    content,
  };
}

export function getFolderWriteup(category: string, folderSlug: string, writeupSlug: string) {
  const folder = getFolder(category, folderSlug);
  if (!folder) return null;

  const fullPath = path.join(contentDirectory, category, folderSlug, `${writeupSlug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const currentIndex = folder.items.findIndex((item) => item.slug === writeupSlug);
  const currentItem = currentIndex !== -1 ? folder.items[currentIndex] : null;

  const prev = currentIndex > 0 ? folder.items[currentIndex - 1] : null;
  const next = currentIndex < folder.items.length - 1 ? folder.items[currentIndex + 1] : null;

  return {
    metadata: {
      slug: writeupSlug,
      folderSlug,
      title: data.title || currentItem?.title || writeupSlug,
      date: data.date || folder.date,
      tags: data.tags || folder.tags,
      category,
      lang: data.lang || folder.lang,
      description: data.description || "",
      difficulty: data.difficulty || folder.difficulty,
      platform: data.platform || folder.platform,
      readingTime: currentItem?.readingTime,
    } as WriteupMetadata,
    content,
    folder,
    prev,
    next,
    chapterNumber: currentIndex !== -1 ? currentIndex + 1 : 1,
    totalChapters: folder.items.length,
  };
}

export function getSimilarWriteups(
  category: string,
  slug: string,
  lang: string,
  limit = 2
): ContentItem[] {
  const items = writeupsIndex as ContentItem[];
  const current = items.find((w) => w.slug === slug);
  if (!current) return [];

  return items
    .filter((w) => w.lang === lang && !(w.category === category && w.slug === slug))
    .map((w) => {
      const commonTags = w.tags.filter((tag) => current.tags.includes(tag)).length;
      return { item: w, score: commonTags };
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return parseCustomDate(b.item.date).getTime() - parseCustomDate(a.item.date).getTime();
    })
    .slice(0, limit)
    .map((entry) => entry.item);
}


