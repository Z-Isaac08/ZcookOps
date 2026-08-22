import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WriteupMetadata } from '@/lib/content';
import { ArrowUpRight, Calendar, Clock, FileText, Tag } from 'lucide-react';
import Link from 'next/link';

export function WriteupCard({ writeup, lang }: { writeup: WriteupMetadata; lang: string }) {
  const getDifficultyBadge = (difficulty?: string) => {
    if (!difficulty) return null;
    const diffLower = difficulty.toLowerCase();

    let colorClasses = 'bg-muted text-muted-foreground border-border/50';
    if (diffLower === 'easy') {
      colorClasses = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    } else if (diffLower === 'medium') {
      colorClasses = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    } else if (diffLower === 'hard') {
      colorClasses = 'bg-orange-500/10 text-orange-400 border-orange-500/30';
    } else if (diffLower === 'insane') {
      colorClasses = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }

    return (
      <Badge
        variant="outline"
        className={`text-[10px] uppercase font-bold py-0.5 px-1.5 leading-none transition-colors ${colorClasses}`}
      >
        {difficulty}
      </Badge>
    );
  };

  return (
    <Link href={`/${lang}/${writeup.category}/${writeup.slug}`}>
      <Card className="h-full hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col bg-card/30 backdrop-blur-xs border-border/60 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 group relative overflow-hidden">
        {/* Subtle hover accent bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary/80 via-primary to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="pt-6">
          <div className="flex justify-between items-start mb-3 gap-2">
            <div className="flex flex-wrap gap-1.5 items-center">
              <Badge
                variant="outline"
                className="text-[10px] uppercase font-bold py-0.5 px-1.5 leading-none bg-muted/40 text-muted-foreground border-border/50 flex items-center gap-1"
              >
                <FileText className="w-2.5 h-2.5 text-primary/70" />
                {lang === 'fr' ? 'Article' : 'Writeup'}
              </Badge>
              {getDifficultyBadge(writeup.difficulty)}
              {writeup.platform && (
                <Badge
                  variant="secondary"
                  className="text-[10px] uppercase font-bold py-0.5 px-1.5 leading-none bg-primary/10 text-primary border-none"
                >
                  {writeup.platform}
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-2 shrink-0">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {writeup.date}
              </div>
              {writeup.readingTime && (
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {writeup.readingTime} min
                </div>
              )}
            </div>
          </div>

          <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors flex items-start justify-between gap-2 leading-snug">
            <span>{writeup.title}</span>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
          </CardTitle>
          <CardDescription className="line-clamp-3 leading-relaxed mt-1">
            {writeup.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-auto pt-2">
          <div className="flex flex-wrap gap-2">
            {writeup.tags.slice(0, 4).map(tag => (
              <div
                key={tag}
                className="flex items-center text-xs bg-secondary/70 group-hover:bg-secondary px-2 py-1 rounded text-secondary-foreground transition-colors"
              >
                <Tag className="w-3 h-3 mr-1 text-primary/60" />
                {tag}
              </div>
            ))}
            {writeup.tags.length > 4 && (
              <div className="text-[10px] text-muted-foreground py-1">
                +{writeup.tags.length - 4}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

