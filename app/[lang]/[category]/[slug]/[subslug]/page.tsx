import {
  FolderBreadcrumb,
  FolderChapterSidebar,
  FolderNavFooter,
} from '@/components/FolderNav';
import { MdxContent } from '@/components/MdxContent';
import { ScrollProgress } from '@/components/ScrollProgress';
import { TableOfContents } from '@/components/TableOfContents';
import { Badge } from '@/components/ui/badge';
import { getFolderWriteup } from '@/lib/content';
import { Locale, getDictionary } from '@/lib/i18n';
import { Calendar, Clock, Folder, Tag } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function FolderChapterPage({
  params,
}: {
  params: Promise<{ lang: string; category: string; slug: string; subslug: string }>;
}) {
  const { lang, category, slug, subslug } = (await params) as {
    lang: Locale;
    category: string;
    slug: string;
    subslug: string;
  };

  const chapterData = getFolderWriteup(category, slug, subslug);
  const dict = await getDictionary(lang);

  if (!chapterData) {
    notFound();
  }

  const { metadata, content, folder, prev, next, chapterNumber, totalChapters } = chapterData;

  return (
    <>
      <ScrollProgress />
      <div className="container mx-auto px-4 py-12 grow max-w-7xl animate-fade-in">
        <FolderBreadcrumb
          lang={lang}
          category={category}
          folder={folder}
          currentTitle={metadata.title}
        />

        <div className="flex flex-col lg:flex-row gap-12 mt-6">
          {/* Main Content */}
          <article className="grow max-w-4xl min-w-0">
            <header className="mb-12 border-b pb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Link href={`/${lang}/${category}/${folder.slug}`}>
                  <Badge className="bg-primary text-primary-foreground uppercase font-bold tracking-wider hover:bg-primary/90 flex items-center gap-1">
                    <Folder className="w-3.5 h-3.5 fill-current" />
                    {folder.title}
                  </Badge>
                </Link>
                <Badge variant="secondary" className="uppercase font-bold tracking-wider bg-muted text-foreground border border-border/50">
                  {lang === 'fr' ? `Chapitre ${chapterNumber} / ${totalChapters}` : `Chapter ${chapterNumber} / ${totalChapters}`}
                </Badge>
                {category !== 'playbooks' && metadata.difficulty && (
                  <Badge variant="outline" className="uppercase font-bold tracking-wider">
                    {metadata.difficulty}
                  </Badge>
                )}


                {metadata.platform && (
                  <Badge
                    variant="outline"
                    className="uppercase font-bold tracking-wider bg-primary/5 text-primary border-primary/20"
                  >
                    {metadata.platform}
                  </Badge>
                )}
                <div className="flex items-center text-sm text-muted-foreground gap-4 ml-auto">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {metadata.date}
                  </div>
                  {metadata.readingTime && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {metadata.readingTime} min
                    </div>
                  )}
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-foreground leading-tight">
                {metadata.title}
              </h1>

              {metadata.description && (
                <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                  {metadata.description}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {metadata.tags.map(tag => (
                  <div
                    key={tag}
                    className="flex items-center text-xs bg-muted px-3 py-1.5 rounded-full text-muted-foreground border border-border/40 hover:text-foreground transition-colors"
                  >
                    <Tag className="w-3 h-3 mr-2 text-primary/60" />
                    {tag}
                  </div>
                ))}
              </div>
            </header>

            <MdxContent source={content} />


          {/* Chapter Navigation Footer */}
          <FolderNavFooter
            lang={lang}
            category={category}
            folderSlug={folder.slug}
            prev={prev}
            next={next}
          />
        </article>

        {/* Sidebar / Chapter Navigation + Table of Contents */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1 space-y-6">
            <FolderChapterSidebar
              lang={lang}
              category={category}
              folder={folder}
              currentSlug={subslug}
            />
            <TableOfContents />
          </div>
        </aside>
      </div>
    </div>
    </>
  );
}

