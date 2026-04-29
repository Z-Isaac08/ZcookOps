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
  const dict = await getDictionary(lang);

  const writeups = getWriteupsByCategory(category, lang);

  // Validate category
  const validCategories = ['ctf', 'pentest-labs', 'network-labs', 'walkthroughs'];
  if (!validCategories.includes(category)) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-12 grow">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 capitalize">{category.replace('-', ' ')}</h1>
        <p className="text-muted-foreground text-lg">{writeups.length} writeups disponibles.</p>
      </div>

      {writeups.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl">
          <p className="text-muted-foreground">Aucun article trouvé dans cette catégorie.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {writeups.map(writeup => (
            <WriteupCard key={writeup.slug} writeup={writeup} lang={lang} />
          ))}
        </div>
      )}
    </main>
  );
}
