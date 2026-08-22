import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderMetadata } from '@/lib/content';
import { Calendar, Clock, Folder, Layers, Tag } from 'lucide-react';
import Link from 'next/link';

export function FolderCard({ folder, lang }: { folder: FolderMetadata; lang: string }) {
  const chapterCount = folder.items?.length || 0;

  return (
    <Link href={`/${lang}/${folder.category}/${folder.slug}`}>
      <Card className="h-full hover:border-primary/60 transition-all cursor-pointer flex flex-col bg-card/40 backdrop-blur-xs border-primary/20 hover:shadow-lg hover:shadow-primary/5 group relative overflow-hidden">
        {/* Accent indicator line on top of folder card */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary/80 via-primary to-primary/40" />

        <CardHeader className="pt-6">
          <div className="flex justify-between items-start mb-3 gap-2">
            <div className="flex flex-wrap gap-1.5 items-center">
              <Badge
                variant="default"
                className="text-[10px] uppercase font-bold py-0.5 px-2 leading-none bg-primary text-primary-foreground flex items-center gap-1"
              >
                <Folder className="w-3 h-3 fill-current" />
                {lang === 'fr' ? 'Dossier' : 'Folder'}
              </Badge>
              <Badge
                variant="secondary"
                className="text-[10px] uppercase font-bold py-0.5 px-1.5 leading-none bg-muted text-muted-foreground border border-border/50 flex items-center gap-1"
              >
                <Layers className="w-2.5 h-2.5" />
                {chapterCount} {lang === 'fr' ? (chapterCount > 1 ? 'chapitres' : 'chapitre') : (chapterCount > 1 ? 'chapters' : 'chapter')}
              </Badge>
              {folder.difficulty && (
                <Badge variant="outline" className="text-[10px] uppercase font-bold py-0.5 px-1.5 leading-none">
                  {folder.difficulty}
                </Badge>
              )}
              {folder.platform && (
                <Badge variant="secondary" className="text-[10px] uppercase font-bold py-0.5 px-1.5 leading-none bg-primary/10 text-primary border-none">
                  {folder.platform}
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-2 shrink-0">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {folder.date}
              </div>
              {folder.readingTime && (
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {folder.readingTime} min
                </div>
              )}
            </div>
          </div>

          <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors flex items-start gap-2">
            <span>{folder.title}</span>
          </CardTitle>
          <CardDescription className="line-clamp-3 leading-relaxed mt-1">
            {folder.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-auto pt-2">
          <div className="flex flex-wrap gap-2">
            {folder.tags.slice(0, 4).map(tag => (
              <div
                key={tag}
                className="flex items-center text-xs bg-secondary/80 px-2 py-1 rounded text-secondary-foreground"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </div>
            ))}
            {folder.tags.length > 4 && (
              <div className="text-[10px] text-muted-foreground py-1">
                +{folder.tags.length - 4}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
