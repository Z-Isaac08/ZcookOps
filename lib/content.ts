import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
}

export function getWriteupsByCategory(category: string, lang: string) {
  const categoryDir = path.join(contentDirectory, category);
  
  if (!fs.existsSync(categoryDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(categoryDir);
  const allWriteupsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(categoryDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        ...(data as Omit<WriteupMetadata, "slug">),
      };
    })
    .filter((writeup) => writeup.lang === lang);

  return allWriteupsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getWriteup(category: string, slug: string) {
  const fullPath = path.join(contentDirectory, category, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    metadata: {
      slug,
      ...(data as Omit<WriteupMetadata, "slug">),
    },
    content,
  };
}
