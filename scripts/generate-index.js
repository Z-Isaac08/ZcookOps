const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(__dirname, '../content');
const categories = ['ctf', 'pentest-labs', 'walkthroughs'];

function parseCustomDate(dateString) {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function estimateReadingTime(text) {
  const wordsPerMinute = 200;
  // Strip Markdown links, inline formatting, etc. to estimate word count cleanly
  const cleanText = text
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // replace markdown links with text
    .replace(/<\/?[^>]+(>|$)/g, '')            // remove HTML tags
    .replace(/[_`*~#\-]/g, '');                // remove markdown characters
  const words = cleanText.split(/\s+/).filter(word => word.length > 0);
  return Math.max(1, Math.ceil(words.length / wordsPerMinute));
}

function generateIndex() {
  const allWriteups = [];

  for (const category of categories) {
    const categoryPath = path.join(contentDir, category);
    if (!fs.existsSync(categoryPath)) continue;

    const files = fs.readdirSync(categoryPath);
    for (const file of files) {
      if (!file.endsWith('.mdx')) continue;

      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      const slug = file.replace(/\.mdx$/, '');

      const readingTime = estimateReadingTime(content);

      allWriteups.push({
        slug,
        title: data.title || '',
        date: data.date || '',
        tags: data.tags || [],
        category,
        lang: data.lang || 'fr',
        description: data.description || '',
        difficulty: data.difficulty || undefined,
        platform: data.platform || undefined,
        readingTime,
      });
    }
  }

  // Sort by date descending
  allWriteups.sort((a, b) => {
    try {
      const dateA = parseCustomDate(a.date);
      const dateB = parseCustomDate(b.date);
      return dateB.getTime() - dateA.getTime();
    } catch (e) {
      return 0;
    }
  });

  const outputPath = path.join(contentDir, 'index.json');
  fs.writeFileSync(outputPath, JSON.stringify(allWriteups, null, 2), 'utf8');
  console.log(`Successfully generated index with ${allWriteups.length} writeups.`);
}

generateIndex();
