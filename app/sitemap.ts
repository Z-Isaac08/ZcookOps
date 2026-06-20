import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { locales } from "@/lib/i18n";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://znote.isaacncho.tech";

// Helper to get all categories
function getCategories() {
  const contentDirectory = path.join(process.cwd(), "content");
  if (!fs.existsSync(contentDirectory)) return [];
  return fs.readdirSync(contentDirectory).filter((file) => {
    return fs.statSync(path.join(contentDirectory, file)).isDirectory();
  });
}

// Helper to get all writeups for a category
function getWriteupSlugs(category: string) {
  const categoryDir = path.join(process.cwd(), "content", category);
  if (!fs.existsSync(categoryDir)) return [];
  return fs
    .readdirSync(categoryDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];
  const categories = getCategories();

  // Add root for each locale
  locales.forEach((locale) => {
    sitemapEntries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });

    // Add category pages
    categories.forEach((category) => {
      sitemapEntries.push({
        url: `${SITE_URL}/${locale}/${category}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });

      // Add individual writeups
      const slugs = getWriteupSlugs(category);
      slugs.forEach((slug) => {
        sitemapEntries.push({
          url: `${SITE_URL}/${locale}/${category}/${slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      });
    });
  });

  return sitemapEntries;
}
