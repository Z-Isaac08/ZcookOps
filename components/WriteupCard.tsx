import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WriteupMetadata } from '@/lib/content';
import { Calendar, Tag, Clock } from 'lucide-react';
import Link from 'next/link';

export function WriteupCard({ writeup, lang }: { writeup: WriteupMetadata; lang: string }) {
  return (
    <Link href={`/${lang}/${writeup.category}/${writeup.slug}`}>
      <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer flex flex-col bg-card/30 backdrop-blur-xs border-border/50">
        <CardHeader>
          <div className="flex justify-between items-start mb-2 gap-2">
            <div className="flex flex-wrap gap-1.5">
              {writeup.difficulty && (
                <Badge variant="outline" className="text-[10px] uppercase font-bold py-0.5 px-1.5 leading-none">
                  {writeup.difficulty}
                </Badge>
              )}
              {writeup.platform && (
                <Badge variant="secondary" className="text-[10px] uppercase font-bold py-0.5 px-1.5 leading-none bg-primary/10 text-primary border-none">
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
          <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">{writeup.title}</CardTitle>
          <CardDescription className="line-clamp-3">{writeup.description}</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {writeup.tags.slice(0, 4).map(tag => ( // Limit to 4 tags to avoid card overflow
              <div
                key={tag}
                className="flex items-center text-xs bg-secondary px-2 py-1 rounded text-secondary-foreground"
              >
                <Tag className="w-3 h-3 mr-1" />
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
