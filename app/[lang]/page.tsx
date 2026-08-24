import { FolderCard } from '@/components/FolderCard';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WriteupCard } from '@/components/WriteupCard';
import { getAllWriteups, getWriteupsByCategory } from '@/lib/content';
import { Locale, getDictionary } from '@/lib/i18n';
import { ArrowRight, BookOpen, ChevronRight, Cpu, Layers, Shield, Sparkles, Terminal } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  const allItems = getAllWriteups(lang);
  const recentItems = allItems.slice(0, 3);

  const categories = [
    {
      id: 'ctf',
      icon: <Terminal className="w-8 h-8 text-primary" />,
      count: getWriteupsByCategory('ctf', lang).length,
      ...dict.home.categories.ctf,
    },
    {
      id: 'pentest-labs',
      icon: <Shield className="w-8 h-8 text-primary" />,
      count: getWriteupsByCategory('pentest-labs', lang).length,
      ...dict.home.categories.pentest,
    },
    {
      id: 'playbooks',
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      count: getWriteupsByCategory('playbooks', lang).length,
      ...dict.home.categories.playbooks,
    },
  ];

  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, lineIndex, arr) => {
      const parts = line.split(/(\*\*.*?\*\*|_.*?_)/g);
      return (
        <React.Fragment key={lineIndex}>
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <span
                  key={i}
                  className="text-foreground font-bold underline decoration-primary/40 underline-offset-4"
                >
                  {part.slice(2, -2)}
                </span>
              );
            }
            if (part.startsWith('_') && part.endsWith('_')) {
              return (
                <em key={i} className="italic text-foreground/80">
                  {part.slice(1, -1)}
                </em>
              );
            }
            return part;
          })}
          {lineIndex < arr.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <main className="container mx-auto px-4 py-12 md:py-20 grow max-w-7xl animate-fade-in">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center mb-20 relative">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold tracking-wide mb-8 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span>Personal Cybersecurity Writeups & Research</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight text-foreground">
          {dict.home.hero.title}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10">
          {renderFormattedText(dict.home.hero.description)}
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/${lang}/pentest-labs`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-105"
          >
            <Shield className="w-4 h-4" />
            <span>{lang === 'fr' ? 'Explorer les Labs' : 'Explore Pentest Labs'}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
          <Link
            href={`/${lang}/playbooks`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border/80 hover:border-primary/40 text-foreground font-semibold hover:bg-muted/50 transition-all"
          >
            <BookOpen className="w-4 h-4 text-primary" />
            <span>{lang === 'fr' ? 'Consulter les Playbooks' : 'View Playbooks'}</span>
          </Link>
        </div>

      </section>

      {/* Categories Grid */}
      <section className="mb-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            {dict.home.categories.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map(category => (
            <Link key={category.id} href={`/${lang}/${category.id}`}>
              <Card className="h-full border-border/60 bg-card/40 backdrop-blur-xs transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/40 group relative overflow-hidden flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 border border-primary/20">
                      {category.icon}
                    </div>
                    <Badge variant="secondary" className="text-xs font-bold font-mono">
                      {category.count} {lang === 'fr' ? 'articles' : 'writeups'}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors flex items-center justify-between">
                    <span>{category.title}</span>
                    <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed mt-2">
                    {category.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Publications Section */}
      {recentItems.length > 0 && (
        <section className="mb-24 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                {lang === 'fr' ? 'Dernières Publications' : 'Recent Publications'}
              </h2>
            </div>
            <Link
              href={`/${lang}/pentest-labs`}
              className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>{lang === 'fr' ? 'Tout voir' : 'View all'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentItems.map(item =>
              item.isFolder ? (
                <FolderCard key={item.slug} folder={item} lang={lang} />
              ) : (
                <WriteupCard key={item.slug} writeup={item} lang={lang} />
              )
            )}
          </div>
        </section>
      )}

      {/* About Me Section */}
      <section className="max-w-5xl mx-auto border-t border-border/40 pt-16 pb-12">
        <div className="bg-card/40 border border-border/60 rounded-2xl p-6 md:p-10 shadow-xl backdrop-blur-xs relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            {/* Terminal Window Graphic */}
            <div className="w-full md:w-72 shrink-0 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
              <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-slate-400 ml-2">whoami</span>
              </div>
              <div className="p-4 font-mono text-xs text-slate-300 space-y-2">
                <p className="text-primary font-bold">zcook@ops ~ % whoami</p>
                <p className="text-slate-400"># Cyber Security & AI Researcher</p>
                <div className="pt-2 border-t border-slate-800/80 space-y-1">
                  <p>
                    <span className="text-muted-foreground">OS:</span> Linux / Windows AD
                  </p>
                  <p>
                    <span className="text-muted-foreground">Role:</span> Pentester / Dev
                  </p>
                  <p>
                    <span className="text-muted-foreground">Status:</span> Active Research
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-6 text-center md:text-left grow">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                {dict.about.title}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-base md:text-lg">{renderFormattedText(dict.about.description1)}</p>
                <p className="text-base md:text-lg">{renderFormattedText(dict.about.description2)}</p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-2.5 pt-2">
                <div className="px-3.5 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-semibold border border-border/50 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-primary" />
                  {dict.about.skills.infra}
                </div>
                <div className="px-3.5 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-semibold border border-border/50 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                  {dict.about.skills.pentest}
                </div>
                <div className="px-3.5 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-semibold border border-border/50 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-primary" />
                  {dict.about.skills.ai}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

