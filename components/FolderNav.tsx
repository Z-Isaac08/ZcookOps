import { FolderMetadata, WriteupMetadata } from '@/lib/content';
import { ChevronLeft, ChevronRight, Folder, Home, Layers } from 'lucide-react';
import Link from 'next/link';

interface FolderNavProps {
  lang: string;
  category: string;
  folder: FolderMetadata;
  currentSlug: string;
  prev: WriteupMetadata | null;
  next: WriteupMetadata | null;
  chapterNumber: number;
  totalChapters: number;
}

export function FolderBreadcrumb({
  lang,
  category,
  folder,
  currentTitle,
}: {
  lang: string;
  category: string;
  folder: FolderMetadata;
  currentTitle?: string;
}) {
  const categoryNames: Record<string, string> = {
    'ctf': 'CTF',
    'pentest-labs': 'Pentest Labs',
    'playbooks': 'Playbooks',
  };


  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center text-sm text-muted-foreground gap-2">
      <Link href={`/${lang}`} className="hover:text-foreground transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
      </Link>
      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
      <Link href={`/${lang}/${category}`} className="hover:text-foreground transition-colors">
        {categoryNames[category] || category}
      </Link>
      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
      <Link href={`/${lang}/${category}/${folder.slug}`} className="hover:text-foreground transition-colors flex items-center gap-1">
        <Folder className="w-3.5 h-3.5 text-primary" />
        <span>{folder.title}</span>
      </Link>
      {currentTitle && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
          <span className="text-foreground font-medium truncate max-w-62.5 md:max-w-md">
            {currentTitle}
          </span>
        </>
      )}
    </nav>
  );
}

export function FolderNavFooter({
  lang,
  category,
  folderSlug,
  prev,
  next,
}: {
  lang: string;
  category: string;
  folderSlug: string;
  prev: WriteupMetadata | null;
  next: WriteupMetadata | null;
}) {
  return (
    <div className="mt-12 pt-8 border-t border-border/40 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={`/${lang}/${category}/${folderSlug}/${prev.slug}`}
          className="group flex flex-col p-4 rounded-xl border border-border/60 hover:border-primary/50 bg-card/40 hover:bg-card/80 transition-all text-left"
        >
          <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1 group-hover:text-primary transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />
            {lang === 'fr' ? 'Chapitre précédent' : 'Previous chapter'}
          </span>
          <span className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next && (
        <Link
          href={`/${lang}/${category}/${folderSlug}/${next.slug}`}
          className="group flex flex-col p-4 rounded-xl border border-border/60 hover:border-primary/50 bg-card/40 hover:bg-card/80 transition-all text-right sm:col-start-2"
        >
          <span className="text-xs text-muted-foreground flex items-center justify-end gap-1 mb-1 group-hover:text-primary transition-colors">
            {lang === 'fr' ? 'Chapitre suivant' : 'Next chapter'}
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
          <span className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {next.title}
          </span>
        </Link>
      )}
    </div>
  );
}

export function FolderChapterSidebar({
  lang,
  category,
  folder,
  currentSlug,
}: {
  lang: string;
  category: string;
  folder: FolderMetadata;
  currentSlug: string;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/30 p-4 mb-8">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/40 text-sm font-semibold text-foreground">
        <Layers className="w-4 h-4 text-primary" />
        <span>{lang === 'fr' ? 'Sommaire du dossier' : 'Folder Index'}</span>
        <span className="ml-auto text-xs text-muted-foreground font-normal">
          ({folder.items.length})
        </span>
      </div>
      <ol className="space-y-1.5 text-sm">
        {folder.items.map((item, index) => {
          const isActive = item.slug === currentSlug;
          return (
            <li key={item.slug}>
              <Link
                href={`/${lang}/${category}/${folder.slug}/${item.slug}`}
                className={`flex items-start gap-2.5 p-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary/15 text-primary font-medium border border-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <span className="text-xs shrink-0 mt-0.5 w-5 h-5 rounded-full bg-muted flex items-center justify-center font-mono">
                  {index + 1}
                </span>
                <span className="line-clamp-2 leading-snug">{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
