'use client';

import { X, ZoomIn } from 'lucide-react';
import { useState } from 'react';

export function ZoomableImage({ src, alt, ...props }: any) {
  const [isOpen, setIsOpen] = useState(false);

  if (!src) return null;

  return (
    <>
      <span className="relative group inline-block my-4 cursor-zoom-in max-w-full rounded-xl transition-transform duration-300">
        <img
          src={src}
          alt={alt || 'Screenshot'}
          loading="lazy"
          onClick={() => setIsOpen(true)}
          className="mx-auto block max-h-137.5 w-auto object-contain transition-all duration-300 group-hover:scale-[1.01]"
          {...props}
        />
        <span
          onClick={() => setIsOpen(true)}
          className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-slate-950/80 text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs flex items-center gap-1 text-xs"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </span>
      </span>

      {isOpen && (
        <span
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in cursor-zoom-out"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors z-10 border border-slate-700"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={src}
            alt={alt || 'Screenshot'}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </span>
      )}
    </>
  );
}
