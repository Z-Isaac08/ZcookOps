import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WriteupMetadata } from '@/lib/content';
import { Calendar, Tag } from 'lucide-react';
import Link from 'next/link';

export function WriteupCard({ writeup, lang }: { writeup: WriteupMetadata; lang: string }) {
  return (
    <Link href={`/${lang}/${writeup.category}/${writeup.slug}`}>
      <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            {writeup.difficulty && (
              <Badge variant="outline">{writeup.difficulty}</Badge>
            )}
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="w-3 h-3 mr-1" />
              {writeup.date}
            </div>
          </div>
          <CardTitle className="text-xl line-clamp-2">{writeup.title}</CardTitle>
          <CardDescription className="line-clamp-3">{writeup.description}</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {writeup.tags.map(tag => (
              <div
                key={tag}
                className="flex items-center text-xs bg-secondary px-2 py-1 rounded text-secondary-foreground"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
