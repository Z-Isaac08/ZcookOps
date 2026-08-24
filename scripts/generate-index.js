const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(__dirname, '../content');
const categories = ['ctf', 'pentest-labs', 'playbooks'];


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

    const entries = fs.readdirSync(categoryPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const folderSlug = entry.name;
        const folderDirPath = path.join(categoryPath, folderSlug);
        const folderJsonPath = path.join(folderDirPath, 'folder.json');

        if (!fs.existsSync(folderJsonPath)) continue;

        let folderData = {};
        try {
          folderData = JSON.parse(fs.readFileSync(folderJsonPath, 'utf8'));
        } catch (err) {
          console.error(`Error reading ${folderJsonPath}:`, err);
          continue;
        }

        const childFiles = fs.readdirSync(folderDirPath).filter(f => f.endsWith('.mdx'));
        let orderedSlugs = [];

        if (Array.isArray(folderData.order) && folderData.order.length > 0) {
          // Keep specified order, then add any remaining .mdx files
          const specifiedSlugs = folderData.order.map(s => s.replace(/\.mdx$/, ''));
          const remainingSlugs = childFiles
            .map(f => f.replace(/\.mdx$/, ''))
            .filter(s => !specifiedSlugs.includes(s));
          orderedSlugs = [...specifiedSlugs, ...remainingSlugs];
        } else {
          orderedSlugs = childFiles.map(f => f.replace(/\.mdx$/, ''));
        }

        let folderTotalReadingTime = 0;
        const items = [];

        for (const childSlug of orderedSlugs) {
          const childFilePath = path.join(folderDirPath, `${childSlug}.mdx`);
          if (!fs.existsSync(childFilePath)) continue;

          const fileContents = fs.readFileSync(childFilePath, 'utf8');
          const { data, content } = matter(fileContents);
          const readingTime = estimateReadingTime(content);
          folderTotalReadingTime += readingTime;

          items.push({
            slug: childSlug,
            folderSlug,
            title: data.title || childSlug,
            date: data.date || folderData.date || '',
            tags: data.tags || folderData.tags || [],
            category,
            lang: data.lang || folderData.lang || 'fr',
            description: data.description || '',
            difficulty: data.difficulty || folderData.difficulty,
            platform: data.platform || folderData.platform,
            readingTime,
          });
        }

        allWriteups.push({
          isFolder: true,
          slug: folderSlug,
          title: folderData.title || folderSlug,
          date: folderData.date || '',
          tags: folderData.tags || [],
          category,
          lang: folderData.lang || 'fr',
          description: folderData.description || '',
          difficulty: folderData.difficulty,
          platform: folderData.platform,
          image: folderData.image || undefined,
          readingTime: folderTotalReadingTime,
          items,
        });
      } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
        const file = entry.name;
        const filePath = path.join(categoryPath, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        const slug = file.replace(/\.mdx$/, '');

        const readingTime = estimateReadingTime(content);

        allWriteups.push({
          isFolder: false,
          slug,
          title: data.title || '',
          date: data.date || '',
          tags: data.tags || [],
          category,
          lang: data.lang || 'fr',
          description: data.description || '',
          difficulty: data.difficulty || undefined,
          platform: data.platform || undefined,
          image: data.image || undefined,
          readingTime,
        });
      }

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
  console.log(`Successfully generated index with ${allWriteups.length} items (writeups & folders).`);
}

generateIndex();

