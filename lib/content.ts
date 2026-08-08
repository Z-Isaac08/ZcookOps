import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { parseCustomDate } from "./utils";
import writeupsIndex from "../content/index.json";

const contentDirectory = path.join(process.cwd(), "content");

export interface WriteupMetadata {
  title: string;
  date: string;
  tags: string[];
  category: string;
  lang: string;
  description: string;
  difficulty?: "easy" | "medium" | "hard" | "insane";
  slug: string;
  platform?: string;
  readingTime?: number;
}

export function getWriteupsByCategory(category: string, lang: string): WriteupMetadata[] {
  return (writeupsIndex as WriteupMetadata[]).filter(
    (w) => w.category === category && w.lang === lang
  );
}

export function getAllWriteups(lang: string): WriteupMetadata[] {
  return (writeupsIndex as WriteupMetadata[]).filter((w) => w.lang === lang);
}

export function getWriteup(category: string, slug: string) {
  const fullPath = path.join(contentDirectory, category, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const indexed = (writeupsIndex as WriteupMetadata[]).find(
    (w) => w.category === category && w.slug === slug
  );

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

export function getSimilarWriteups(
  category: string,
  slug: string,
  lang: string,
  limit = 2
): WriteupMetadata[] {
  const current = (writeupsIndex as WriteupMetadata[]).find(
    (w) => w.category === category && w.slug === slug
  );
  if (!current) return [];

  return (writeupsIndex as WriteupMetadata[])
    .filter((w) => w.lang === lang && !(w.category === category && w.slug === slug))
    .map((w) => {
      const commonTags = w.tags.filter((tag) => current.tags.includes(tag)).length;
      return { writeup: w, score: commonTags };
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return parseCustomDate(b.writeup.date).getTime() - parseCustomDate(a.writeup.date).getTime();
    })
    .slice(0, limit)
    .map((item) => item.writeup);
}

