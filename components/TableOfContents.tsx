'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3, h4'))
      .map(elem => ({
        id: elem.id,
        text: elem.textContent || '',
        level: Number(elem.tagName.substring(1)),
      }))
      .filter(item => item.id);

    setHeadings(elements);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    document.querySelectorAll('h2, h3, h4').forEach(elem => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-2">
      <p className="text-xs font-bold uppercase tracking-widest text-primary/70 mb-6 px-4">
        Table des matières
      </p>
      <ul className="space-y-1 text-sm border-l border-border/40 ml-4">
        {headings.map(heading => (
          <li
            key={heading.id}
            className={cn(
              'transition-all duration-200',
              heading.level === 2 ? 'mt-4 first:mt-0' : 'mt-1'
            )}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                'block py-1 pr-4 -ml-px border-l-2 transition-colors',
                heading.level === 2 ? 'font-semibold' : 'font-normal',
                heading.level === 3 ? 'pl-6' : heading.level === 4 ? 'pl-10' : 'pl-4',
                activeId === heading.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
