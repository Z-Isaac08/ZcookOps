'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const extractText = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return node.toString();
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (node && typeof node === 'object' && 'props' in node) {
      const element = node as any;
      return extractText(element.props?.children ?? '');
    }
    return '';
  };

  const code = extractText(children);
  const lines = code.split(/\r?\n/);
  const shouldCollapse = lines.length > 14;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre
        className={[
          'm-0 overflow-x-auto p-4 text-sm leading-6',
          shouldCollapse && !expanded ? 'max-h-72 overflow-y-hidden' : 'max-h-none',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <code>{children}</code>
      </pre>

      {shouldCollapse && !expanded && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-slate-950 via-slate-950/80 to-transparent" />
      )}

      {shouldCollapse && (
        <button
          type="button"
          onClick={() => setExpanded(prev => !prev)}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-border/60 bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-slate-200 shadow-lg backdrop-blur transition hover:bg-slate-800"
        >
          {expanded ? 'Afficher moins' : 'Afficher plus'}
        </button>
      )}

      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-slate-700 hover:bg-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        title="Copy to clipboard"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-slate-300" />
        )}
      </button>
    </div>
  );
}
