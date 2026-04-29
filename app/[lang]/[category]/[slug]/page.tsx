import { Badge } from '@/components/ui/badge';
import { getWriteup } from '@/lib/content';
import { Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Calendar, Tag } from 'lucide-react';
import { TableOfContents } from '@/components/TableOfContents';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

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

  if (!writeup) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 grow max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <article className="grow max-w-4xl min-w-0">
          <header className="mb-12 border-b pb-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="secondary" className="uppercase">
                {writeup.metadata.category.replace('-', ' ')}
              </Badge>
              <Badge>{writeup.metadata.difficulty || 'medium'}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                {writeup.metadata.date}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {writeup.metadata.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">{writeup.metadata.description}</p>

            <div className="flex flex-wrap gap-2">
              {writeup.metadata.tags.map(tag => (
                <div
                  key={tag}
                  className="flex items-center text-xs bg-muted px-3 py-1 rounded-full"
                >
                  <Tag className="w-3 h-3 mr-2" />
                  {tag}
                </div>
              ))}
            </div>
          </header>

          <div className="prose prose-invert prose-slate max-w-none prose-headings:scroll-mt-20 prose-table:border prose-table:border-collapse prose-th:border prose-td:border prose-th:p-2 prose-td:p-2">
            <MDXRemote
              source={writeup.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </div>
        </article>

        {/* Sidebar / TOC */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <TableOfContents />
          </div>
        </aside>
      </div>
    </div>
  );
}
