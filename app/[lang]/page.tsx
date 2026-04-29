import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getDictionary, Locale } from '@/lib/i18n';
import { BookOpen, Network, Shield, Terminal } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  const categories = [
    {
      id: 'ctf',
      icon: <Terminal className="w-8 h-8 text-primary" />,
      ...dict.home.categories.ctf,
    },
    {
      id: 'pentest-labs',
      icon: <Shield className="w-8 h-8 text-primary" />,
      ...dict.home.categories.pentest,
    },
    {
      id: 'network-labs',
      icon: <Network className="w-8 h-8 text-primary" />,
      ...dict.home.categories.network,
    },
    {
      id: 'walkthroughs',
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      ...dict.home.categories.walkthroughs,
    },
  ];

  return (
    <main className="container mx-auto px-4 py-16 grow">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          {dict.home.hero.title}
        </h1>
        <p className="text-xl text-muted-foreground">{dict.home.hero.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {categories.map((category) => (
          <Link key={category.id} href={`/${lang}/${category.id}`}>
            <Card className="h-full border-border/50 bg-card/30 backdrop-blur-sm transition-colors cursor-pointer">
              <CardHeader>
                <div className="mb-4 text-primary">{category.icon}</div>
                <CardTitle className="text-2xl">{category.title}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {category.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      {/* About Me Section */}
      <section className="mt-32 max-w-4xl mx-auto border-t border-border/40 pt-16 pb-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-48 h-48 rounded-2xl bg-linear-to-br from-primary/10 to-secondary/10 border border-primary/10 flex items-center justify-center shrink-0 relative overflow-hidden">
            <Terminal className="w-20 h-20 text-primary opacity-40" />
          </div>
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight">{dict.about.title}</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">{dict.about.description1}</p>
              <p className="text-lg">{dict.about.description2}</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-medium border border-border/50">
                {dict.about.skills.infra}
              </div>
              <div className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-medium border border-border/50">
                {dict.about.skills.pentest}
              </div>
              <div className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-medium border border-border/50">
                {dict.about.skills.ai}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
