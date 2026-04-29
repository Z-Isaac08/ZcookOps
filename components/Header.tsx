import { Locale, getDictionary } from '@/lib/i18n';
import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';

export async function Header({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight text-primary">ZcookOps</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href={`/${lang}/ctf`} className="transition-colors hover:text-primary">
            {dict.nav.ctf}
          </Link>
          <Link href={`/${lang}/pentest-labs`} className="transition-colors hover:text-primary">
            {dict.nav.pentest}
          </Link>
          <Link href={`/${lang}/network-labs`} className="transition-colors hover:text-primary">
            {dict.nav.network}
          </Link>
          <Link href={`/${lang}/walkthroughs`} className="transition-colors hover:text-primary">
            {dict.nav.walkthroughs}
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <LanguageSwitcher currentLang={lang} />
        </div>
      </div>
    </header>
  );
}
