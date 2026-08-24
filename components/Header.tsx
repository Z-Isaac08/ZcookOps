import { getAllWriteups } from '@/lib/content';
import { Locale, getDictionary } from '@/lib/i18n';
import Image from 'next/image';
import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SearchDialog } from './SearchDialog';

export async function Header({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  const writeups = getAllWriteups(lang);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center space-x-3 group">
          <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
            <Image
              src="/zlogo.png"
              alt="ZNote Logo"
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">ZNote</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href={`/${lang}/ctf`} className="transition-colors hover:text-primary">
            {dict.nav.ctf}
          </Link>
          <Link href={`/${lang}/pentest-labs`} className="transition-colors hover:text-primary">
            {dict.nav.pentest}
          </Link>
          <Link href={`/${lang}/playbooks`} className="transition-colors hover:text-primary">
            {dict.nav.playbooks}
          </Link>

        </nav>

        <div className="flex items-center space-x-4">
          <SearchDialog writeups={writeups} lang={lang} dict={dict.search} />
          <LanguageSwitcher currentLang={lang} />
        </div>
      </div>
    </header>
  );
}
