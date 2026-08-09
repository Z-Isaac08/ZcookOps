import { CodeBlock } from '@/components/CodeBlock';
import { TableOfContents } from '@/components/TableOfContents';
import { Badge } from '@/components/ui/badge';
import { WriteupCard } from '@/components/WriteupCard';
import { getSimilarWriteups, getWriteup } from '@/lib/content';
import { Locale, getDictionary } from '@/lib/i18n';
import { Calendar, Clock, Tag } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

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
  const writeup = getWriteup(category, slug);
  const dict = await getDictionary(lang);

  if (!writeup) {
    notFound();
  }

  const similarWriteups = getSimilarWriteups(category, slug, lang, 2);

  return (
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
                    : category === 'walkthroughs'
                      ? dict.nav.walkthroughs
                      : category.replace('-', ' ')}
              </Badge>
              {writeup.metadata.difficulty && (
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

          <div className="prose prose-invert prose-slate max-w-none prose-headings:scroll-mt-20 prose-table:border prose-table:border-collapse prose-th:border prose-td:border prose-th:p-2 prose-td:p-2 leading-relaxed">
            <MDXRemote
              source={writeup.content}
              components={{
                pre: ({ children, ...props }: any) => <CodeBlock {...props}>{children}</CodeBlock>,
                img: ({ src, alt, ...props }: any) => (
                  <img
                    src={src}
                    alt={alt || 'Screenshot'}
                    loading="lazy"
                    className="mx-auto block my-8 max-h-137.5 w-auto object-contain transition-all duration-300"
                    {...props}
                  />
                ),
              }}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </div>

          {/* Similar Articles */}
          {similarWriteups.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border/30">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                {dict.writeupPage.similarArticles}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {similarWriteups.map(w => (
                  <WriteupCard key={w.slug} writeup={w} lang={lang} />
                ))}
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
  );
}
