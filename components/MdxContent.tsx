import React from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ZoomableImage } from '@/components/ZoomableImage';
import {
  AlertCircle,
  ExternalLink,
  Info,
  Lightbulb,
  ShieldAlert,
  TriangleAlert,
} from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

function extractNodeText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractNodeText).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    const element = node as any;
    return extractNodeText(element.props?.children ?? '');
  }
  return '';
}

// Custom blockquote / Callout parser for > [!NOTE], > [!TIP], > [!WARNING], etc.
function CustomBlockquote({ children }: { children?: React.ReactNode }) {
  const textContent = extractNodeText(children).trim();

  const alertMatch = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i.exec(textContent);

  if (alertMatch) {
    const alertType = alertMatch[1].toUpperCase();

    // Render formatted children without the [!TYPE] marker prefix
    const renderCleanChildren = (nodes: React.ReactNode): React.ReactNode => {
      if (typeof nodes === 'string') {
        return nodes.replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i, '');
      }
      if (Array.isArray(nodes)) {
        return nodes.map((child, idx) => (idx === 0 ? renderCleanChildren(child) : child));
      }
      if (nodes && typeof nodes === 'object' && 'props' in nodes) {
        const element = nodes as any;
        if (element.props?.children) {
          return React.cloneElement(element, {
            children: renderCleanChildren(element.props.children),
          });
        }
      }
      return nodes;
    };

    const cleanContent = renderCleanChildren(children);

    let styles = {
      container: 'bg-sky-950/30 border-sky-500/40 text-sky-200',
      icon: <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />,
      label: 'Note',
      labelColor: 'text-sky-400',
    };

    if (alertType === 'TIP') {
      styles = {
        container: 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200',
        icon: <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />,
        label: 'Astuce',
        labelColor: 'text-emerald-400',
      };
    } else if (alertType === 'IMPORTANT') {
      styles = {
        container: 'bg-purple-950/30 border-purple-500/40 text-purple-200',
        icon: <AlertCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />,
        label: 'Important',
        labelColor: 'text-purple-400',
      };
    } else if (alertType === 'WARNING') {
      styles = {
        container: 'bg-amber-950/30 border-amber-500/40 text-amber-200',
        icon: <TriangleAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />,
        label: 'Attention',
        labelColor: 'text-amber-400',
      };
    } else if (alertType === 'CAUTION') {
      styles = {
        container: 'bg-rose-950/30 border-rose-500/40 text-rose-200',
        icon: <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />,
        label: 'Avertissement',
        labelColor: 'text-rose-400',
      };
    }

    return (
      <div className={`my-6 p-4 rounded-xl border ${styles.container} shadow-md backdrop-blur-xs`}>
        <div className="flex items-center gap-2 mb-2 font-bold uppercase text-xs tracking-wider">
          {styles.icon}
          <span className={styles.labelColor}>{styles.label}</span>
        </div>
        <div className="text-sm leading-relaxed prose-p:my-1 text-slate-300">
          {cleanContent}
        </div>
      </div>
    );
  }

  return (
    <blockquote className="my-6 border-l-4 border-primary/60 bg-muted/20 p-4 rounded-r-xl italic text-muted-foreground prose-p:my-1">
      {children}
    </blockquote>
  );
}

// Custom Link Component (Opens external links in new tab)
function CustomLink({ href, children, ...props }: any) {
  const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-0.5 text-primary hover:underline underline-offset-4 font-medium transition-colors group"
        {...props}
      >
        <span>{children}</span>
        <ExternalLink className="w-3.5 h-3.5 text-primary/70 group-hover:text-primary transition-colors inline shrink-0" />
      </a>
    );
  }

  return (
    <Link
      href={href || '#'}
      className="text-primary hover:underline underline-offset-4 font-medium transition-colors"
      {...props}
    >
      {children}
    </Link>
  );
}

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose prose-invert prose-slate max-w-none prose-headings:scroll-mt-20 leading-relaxed">
      <MDXRemote
        source={source}
        components={{
          pre: ({ children, ...props }: any) => <CodeBlock {...props}>{children}</CodeBlock>,
          blockquote: (props: any) => <CustomBlockquote {...props} />,
          a: (props: any) => <CustomLink {...props} />,
          img: (props: any) => <ZoomableImage {...props} />,
          table: ({ children, ...props }: any) => (
            <div className="my-6 w-full overflow-x-auto rounded-xl border border-border/60 shadow-md">
              <table className="w-full border-collapse text-sm" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }: any) => (
            <thead className="bg-muted/70 text-foreground font-semibold border-b border-border/60" {...props}>
              {children}
            </thead>
          ),
          th: ({ children, ...props }: any) => (
            <th className="p-3 text-left border-r border-border/40 last:border-r-0 text-xs uppercase tracking-wider font-bold text-muted-foreground" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }: any) => (
            <td className="p-3 border-t border-border/40 border-r last:border-r-0 text-muted-foreground hover:text-foreground transition-colors" {...props}>
              {children}
            </td>
          ),
          tr: ({ children, ...props }: any) => (
            <tr className="even:bg-muted/15 hover:bg-muted/30 transition-colors" {...props}>
              {children}
            </tr>
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
  );
}
