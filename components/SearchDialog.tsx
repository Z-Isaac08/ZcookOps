"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, ArrowRight } from "lucide-react";
import { WriteupMetadata } from "@/lib/content";

interface SearchDialogProps {
  writeups: WriteupMetadata[];
  lang: string;
  dict: {
    placeholder: string;
    noResults: string;
    hint: string;
  };
}

const categoryLabels: Record<string, string> = {
  ctf: "CTF & Challenges",
  "pentest-labs": "Pentest Labs",
  walkthroughs: "Walkthroughs",
};

export function SearchDialog({ writeups, lang, dict }: SearchDialogProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      // Focus input after dialog animation
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Filter writeups by query on title + tags
  const filtered = useMemo(() => {
    if (!query.trim()) return writeups;
    const q = query.toLowerCase().trim();
    return writeups.filter(
      (w) =>
        w.title.toLowerCase().includes(q) ||
        w.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [query, writeups]);

  // Group filtered results by category
  const grouped = useMemo(() => {
    const groups: Record<string, WriteupMetadata[]> = {};
    for (const w of filtered) {
      if (!groups[w.category]) groups[w.category] = [];
      groups[w.category].push(w);
    }
    return groups;
  }, [filtered]);

  // Flat list for keyboard navigation
  const flatResults = useMemo(() => {
    return Object.values(grouped).flat();
  }, [grouped]);

  const navigateTo = useCallback(
    (writeup: WriteupMetadata) => {
      setOpen(false);
      router.push(`/${lang}/${writeup.category}/${writeup.slug}`);
    },
    [lang, router]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && flatResults[activeIndex]) {
        e.preventDefault();
        navigateTo(flatResults[activeIndex]);
      }
    },
    [flatResults, activeIndex, navigateTo]
  );

  // Scroll active item into view
  useEffect(() => {
    const activeEl = listRef.current?.querySelector(
      `[data-index="${activeIndex}"]`
    );
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  let flatIndex = -1;

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground rounded-md border border-border bg-secondary/50 hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
        aria-label={dict.hint}
      >
        <Search className="w-4 h-4" />
        <span className="hidden lg:inline">{dict.hint}</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[540px] p-0 gap-0 overflow-hidden border-border bg-background/95 backdrop-blur-xl shadow-2xl">
          <DialogTitle className="sr-only">{dict.hint}</DialogTitle>

          {/* Search input */}
          <div className="flex items-center gap-3 px-4 border-b border-border">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={dict.placeholder}
              className="flex-1 py-3 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Results */}
          <div
            ref={listRef}
            className="max-h-[360px] overflow-y-auto py-2"
          >
            {flatResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Search className="w-8 h-8 mb-3 opacity-40" />
                <p className="text-sm">{dict.noResults}</p>
              </div>
            ) : (
              Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  {/* Category header */}
                  <div className="px-4 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {categoryLabels[category] || category}
                  </div>

                  {/* Items */}
                  {items.map((writeup) => {
                    flatIndex++;
                    const idx = flatIndex;
                    const isActive = idx === activeIndex;

                    return (
                      <button
                        key={`${writeup.category}-${writeup.slug}`}
                        data-index={idx}
                        onClick={() => navigateTo(writeup)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors cursor-pointer ${
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "text-foreground/80 hover:bg-accent/50"
                        }`}
                      >
                        <FileText className="w-4 h-4 shrink-0 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {writeup.title}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {writeup.difficulty && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1.5 py-0"
                              >
                                {writeup.difficulty}
                              </Badge>
                            )}
                            {writeup.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] text-muted-foreground"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        {isActive && (
                          <ArrowRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer hints */}
          {flatResults.length > 0 && (
            <div className="flex items-center gap-4 px-4 py-2 border-t border-border text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">↑↓</kbd>
                naviguer
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">↵</kbd>
                ouvrir
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">esc</kbd>
                fermer
              </span>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
