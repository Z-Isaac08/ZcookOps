import { FolderCard } from '@/components/FolderCard';
import { FolderBreadcrumb } from '@/components/FolderNav';
import { MdxContent } from '@/components/MdxContent';
import { ScrollProgress } from '@/components/ScrollProgress';
import { TableOfContents } from '@/components/TableOfContents';
import { Badge } from '@/components/ui/badge';
import { WriteupCard } from '@/components/WriteupCard';
import { ZoomableImage } from '@/components/ZoomableImage';
import { getFolder, getSimilarWriteups, getWriteup } from '@/lib/content';
import { Locale, getDictionary } from '@/lib/i18n';
import { ArrowRight, Calendar, Clock, Folder, Layers, Network, Tag } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';


export default async function WriteupPage({

  params,
}: {
  params: Promise<{ lang: string; category: string; slug: string }>;
}) {
  const { lang, category, slug } = (await params) as {
    lang: Locale;
    category: string;
    slug: string;
  };
  const dict = await getDictionary(lang);

  // Check if this slug is a Folder
  const folder = getFolder(category, slug);

  if (folder) {
    return (
      <div className="container mx-auto px-4 py-12 grow max-w-5xl animate-fade-in">
        <FolderBreadcrumb lang={lang} category={category} folder={folder} />

        <div className="bg-card/40 border border-primary/20 rounded-2xl p-6 md:p-10 mb-12 shadow-xl backdrop-blur-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-primary via-primary/80 to-primary/30" />

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge className="bg-primary text-primary-foreground font-bold tracking-wider uppercase flex items-center gap-1">
              <Folder className="w-3.5 h-3.5 fill-current" />
              {lang === 'fr' ? 'Dossier Multi-Parties' : 'Multi-Part Folder'}
            </Badge>
            <Badge variant="secondary" className="font-bold tracking-wider uppercase flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-primary" />
              {folder.items.length} {lang === 'fr' ? (folder.items.length > 1 ? 'chapitres' : 'chapitre') : (folder.items.length > 1 ? 'chapters' : 'chapter')}
            </Badge>
            {folder.category !== 'playbooks' && folder.difficulty && (
              <Badge variant="outline" className="uppercase font-bold tracking-wider">
                {folder.difficulty}
              </Badge>
            )}


            {folder.platform && (
              <Badge
                variant="outline"
                className="uppercase font-bold tracking-wider bg-primary/5 text-primary border-primary/20"
              >
                {folder.platform}
              </Badge>
            )}
            <div className="flex items-center text-sm text-muted-foreground gap-4 ml-auto">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1.5" />
                {folder.date}
              </div>
              {folder.readingTime && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5" />
                  ~{folder.readingTime} min total
                </div>
              )}
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-foreground leading-tight">
            {folder.title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            {folder.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {folder.tags.map(tag => (
              <div
                key={tag}
                className="flex items-center text-xs bg-secondary/80 px-3 py-1.5 rounded-full text-secondary-foreground"
              >
                <Tag className="w-3 h-3 mr-1.5 text-primary" />
                {tag}
              </div>
            ))}
          </div>

          {folder.image && (
            <div className="mt-8 pt-6 border-t border-border/40">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                <Network className="w-4 h-4 text-primary" />
                {lang === 'fr' ? 'Topologie & Schéma du Lab' : 'Lab Network Topology'}
              </span>
              <ZoomableImage src={folder.image} alt={`Topologie - ${folder.title}`} />
            </div>
          )}
        </div>


        {/* Chapter Index Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Layers className="w-6 h-6 text-primary" />
              {lang === 'fr' ? 'Sommaire et Chapitres' : 'Chapters Overview'}
            </h2>
            <span className="text-sm text-muted-foreground">
              {folder.items.length} {lang === 'fr' ? 'parties disponibles' : 'parts available'}
            </span>
          </div>

          <div className="space-y-4">
            {folder.items.map((item, index) => (
              <Link
                key={item.slug}
                href={`/${lang}/${category}/${folder.slug}/${item.slug}`}
                className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-xl border border-border/60 hover:border-primary/50 bg-card/30 hover:bg-card/80 transition-all gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-mono font-bold flex items-center justify-center shrink-0 text-base border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border/30">
                  {item.readingTime && (
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {item.readingTime} min
                    </span>
                  )}
                  <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform">
                    {lang === 'fr' ? 'Lire la suite' : 'Read writeup'}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Otherwise, handle Standalone Writeup
  const writeup = getWriteup(category, slug);

  if (!writeup) {
    notFound();
  }

  const similarWriteups = getSimilarWriteups(category, slug, lang, 2);

  return (
    <>
      <ScrollProgress />
      <div className="container mx-auto px-4 py-16 grow max-w-7xl animate-fade-in">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <article className="grow max-w-4xl min-w-0">
            <header className="mb-12 border-b pb-8">
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <Badge variant="secondary" className="uppercase font-bold tracking-wider">
                  {category === 'ctf'
                    ? dict.nav.ctf
                    : category === 'pentest-labs'
                      ? dict.nav.pentest
                      : category === 'playbooks'
                        ? dict.nav.playbooks
                        : category.replace('-', ' ')}
                </Badge>
                {category !== 'playbooks' && writeup.metadata.difficulty && (
                  <Badge className="uppercase font-bold tracking-wider">
                    {writeup.metadata.difficulty}
                  </Badge>
                )}


                {writeup.metadata.platform && (
                  <Badge
                    variant="outline"
                    className="uppercase font-bold tracking-wider bg-primary/5 text-primary border-primary/20"
                  >
                    {writeup.metadata.platform}
                  </Badge>
                )}
                <div className="flex items-center text-sm text-muted-foreground gap-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {writeup.metadata.date}
                  </div>
                  {writeup.metadata.readingTime && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {writeup.metadata.readingTime} min
                    </div>
                  )}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-foreground">
                {writeup.metadata.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                {writeup.metadata.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {writeup.metadata.tags.map(tag => (
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

            <MdxContent source={writeup.content} />


          {/* Similar Articles */}
          {similarWriteups.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border/30">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                {dict.writeupPage.similarArticles}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {similarWriteups.map(w =>
                  w.isFolder ? (
                    <FolderCard key={w.slug} folder={w} lang={lang} />
                  ) : (
                    <WriteupCard key={w.slug} writeup={w} lang={lang} />
                  )
                )}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar / TOC */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">
            <TableOfContents />
          </div>
        </aside>
      </div>
    </div>
    </>
  );
}


