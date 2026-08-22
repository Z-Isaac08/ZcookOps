import { FolderCard } from '@/components/FolderCard';
import { WriteupCard } from '@/components/WriteupCard';
import { getWriteupsByCategory } from '@/lib/content';
import { Locale, getDictionary } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: string; category: string }>;
}) {
  const { lang, category } = (await params) as { lang: Locale; category: string };

  const validCategories = ['ctf', 'pentest-labs', 'walkthroughs'];
  if (!validCategories.includes(category)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const items = getWriteupsByCategory(category, lang);

  const categoryTitles: Record<string, string> = {
    'ctf': dict.nav.ctf,
    'pentest-labs': dict.nav.pentest,
    'walkthroughs': dict.nav.walkthroughs,
  };

  return (
    <main className="container mx-auto px-4 py-12 grow max-w-7xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{categoryTitles[category]}</h1>

        <p className="text-muted-foreground text-lg">
          {items.length} {lang === 'fr' ? 'éléments disponibles' : 'items available'}.
        </p>

        {lang === 'en' && items.length > 0 && (
          <div className="mt-4 p-3 bg-muted/50 border border-border rounded-lg block w-full text-center">
            <span className="text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> All writeups and lab reports are currently only available in French.
            </span>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl">
          <p className="text-muted-foreground">
            {lang === 'fr'
              ? 'Aucun contenu trouvé dans cette catégorie.'
              : 'No content found in this category.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item =>
            item.isFolder ? (
              <FolderCard key={item.slug} folder={item} lang={lang} />
            ) : (
              <WriteupCard key={item.slug} writeup={item} lang={lang} />
            )
          )}
        </div>
      )}
    </main>
  );
}

