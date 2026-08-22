'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

// Langages de shell / commande
const COMMAND_LANGUAGES = new Set([
  'bash',
  'sh',
  'shell',
  'zsh',
  'powershell',
  'pwsh',
  'cmd',
]);

// Langages de programmation et de configuration (Code Source)
const CODE_LANGUAGES = new Set([
  'c',
  'cpp',
  'c++',
  'csharp',
  'c#',
  'rust',
  'rs',
  'go',
  'golang',
  'asm',
  'nasm',
  'assembly',
  'python',
  'py',
  'javascript',
  'js',
  'typescript',
  'ts',
  'java',
  'php',
  'ruby',
  'sql',
  'cypher',
  'html',
  'css',
  'xml',
  'yaml',
  'yml',
  'json',
  'zig',
  'nim',
]);

// Mappage pour l'affichage propre des langages dans l'en-tête
const DISPLAY_NAMES: Record<string, string> = {
  c: 'C',
  cpp: 'C++',
  'c++': 'C++',
  csharp: 'C#',
  'c#': 'C#',
  rust: 'Rust',
  rs: 'Rust',
  go: 'Go',
  golang: 'Go',
  asm: 'Assembleur',
  nasm: 'Assembleur (NASM)',
  assembly: 'Assembleur',
  python: 'Python',
  py: 'Python',
  javascript: 'JavaScript',
  js: 'JavaScript',
  typescript: 'TypeScript',
  ts: 'TypeScript',
  java: 'Java',
  php: 'PHP',
  ruby: 'Ruby',
  bash: 'Bash',
  sh: 'Shell',
  zsh: 'Zsh',
  powershell: 'PowerShell',
  pwsh: 'PowerShell',
  cmd: 'CMD',
  sql: 'SQL',
  html: 'HTML',
  css: 'CSS',
  json: 'JSON',
  yaml: 'YAML',
  yml: 'YAML',
  zig: 'Zig',
  nim: 'Nim',
};

// Trouve le premier <code className="language-xxx"> dans l'arbre pour en extraire le langage.
function findLanguage(node: React.ReactNode): string | null {
  if (!node || typeof node !== 'object') return null;
  if (Array.isArray(node)) {
    for (const child of node) {
      const found = findLanguage(child);
      if (found) return found;
    }
    return null;
  }
  const element = node as any;
  const className: string | undefined = element.props?.className;
  if (className) {
    const match = /language-([\w#+-]+)/.exec(className);
    if (match) return match[1].toLowerCase();
  }
  if (element.props?.children) {
    return findLanguage(element.props.children);
  }
  return null;
}

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return node.toString();
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    const element = node as any;
    return extractText(element.props?.children ?? '');
  }
  return '';
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rawLanguage = findLanguage(children);
  const language = rawLanguage ? (DISPLAY_NAMES[rawLanguage] || rawLanguage) : null;

  const isCommand = rawLanguage !== null && COMMAND_LANGUAGES.has(rawLanguage);
  const isCode = rawLanguage !== null && CODE_LANGUAGES.has(rawLanguage);

  const blockType = isCommand ? 'Commande' : isCode ? 'Code' : 'Sortie';

  const code = extractText(children);
  const lines = code.split(/\r?\n/);
  const shouldCollapse = lines.length > 14;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="not-prose relative group my-6 overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
      {/* Bandeau d'en-tête : badge type (Commande / Code / Sortie) + langage + copier */}
      <div
        className={[
          'flex items-center justify-between border-b px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider',
          isCommand
            ? 'bg-emerald-950/40 border-emerald-900/40 text-emerald-400'
            : isCode
              ? 'bg-sky-950/40 border-sky-900/40 text-sky-400'
              : 'bg-slate-900/60 border-slate-800 text-slate-500',
        ].join(' ')}
      >
        <span>{blockType}</span>
        <div className="flex items-center gap-3">
          {mounted && language && (
            <span className="opacity-75 font-mono text-[10px]">
              {language}
            </span>
          )}
          <button
            onClick={handleCopy}
            className="p-1 rounded-sm hover:bg-white/10 transition-colors duration-150"
            title="Copy to clipboard"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 opacity-70 hover:opacity-100" />
            )}
          </button>
        </div>
      </div>

      <pre
        className={[
          'm-0! p-4! border-0! rounded-none! bg-transparent! w-full overflow-x-auto text-sm leading-6',
          shouldCollapse && !expanded ? 'max-h-72 overflow-y-hidden' : 'max-h-none',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
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
    </div>
  );
}
