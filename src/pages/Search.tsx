import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { NavSlider } from '@/components/NavSlider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function Search() {
  const [searchParams] = useSearchParams();
  const examId = searchParams.get('exam');
  const boardId = searchParams.get('board');
  const gradeId = searchParams.get('grade');
  const [selectedGrade, setSelectedGrade] = useState<string | null>(gradeId);

  const { data: grades } = useQuery({
    queryKey: ['grades', boardId],
    queryFn: async () => {
      if (!boardId) return null;
      const { data, error } = await supabase
        .from('grades')
        .select('*')
        .eq('board_id', boardId)
        .order('grade_level');
      if (error) throw error;
      return data;
    },
    enabled: !!boardId,
  });

  const { data: books, isLoading } = useQuery({
    queryKey: ['books', examId, boardId, selectedGrade],
    queryFn: async () => {
      let query = supabase
        .from('books')
        .select(`
          *,
          book_publications (
            id,
            edition,
            isbn,
            publication_id,
            publications (name, logo_url),
            book_links (
              id,
              url,
              price,
              in_stock,
              platform_id,
              shopping_platforms (name, logo_url)
            )
          )
        `);

      if (examId) query = query.eq('exam_id', examId);
      if (boardId) query = query.eq('board_id', boardId);
      if (selectedGrade) query = query.eq('grade_id', selectedGrade);

      const { data, error } = await query.order('title');
      if (error) throw error;
      return data;
    },
  });

  const { data: contextInfo } = useQuery({
    queryKey: ['context', examId, boardId],
    queryFn: async () => {
      if (examId) {
        const { data } = await supabase
          .from('exams')
          .select('name')
          .eq('id', examId)
          .single();
        return { type: 'exam', name: data?.name };
      }
      if (boardId) {
        const { data } = await supabase
          .from('boards')
          .select('name')
          .eq('id', boardId)
          .single();
        return { type: 'board', name: data?.name };
      }
      return null;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <NavSlider />
        <main className="container py-16">
          <div className="mb-8 text-center animate-pulse">
            <div className="h-10 bg-muted rounded w-64 mx-auto" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-48 bg-muted rounded" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <NavSlider />
      <main className="container py-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">
            Recommended Books {contextInfo?.name ? `for ${contextInfo.name}` : ''}
          </h1>
          <p className="text-muted-foreground">
            Compare prices across multiple sellers and find the best deals
          </p>
        </div>

        {grades && grades.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            <Badge
              variant={!selectedGrade ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-2"
              onClick={() => setSelectedGrade(null)}
            >
              All Grades
            </Badge>
            {grades.map((grade) => (
              <Badge
                key={grade.id}
                variant={selectedGrade === grade.id ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-2"
                onClick={() => setSelectedGrade(grade.id)}
              >
                {grade.display_name}
              </Badge>
            ))}
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {books?.map((book) => (
            <Card key={book.id} className="overflow-hidden">
              {book.cover_image_url && (
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={book.cover_image_url}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{book.title}</CardTitle>
                {book.author && (
                  <CardDescription className="text-sm">by {book.author}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {book.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {book.description}
                  </p>
                )}

                {book.book_publications && book.book_publications.length > 0 && (
                  <div className="space-y-3">
                    {book.book_publications.map((publication: any) => (
                      <div key={publication.id} className="border-t pt-3">
                        <div className="flex items-center gap-2 mb-2">
                          {publication.publications?.logo_url && (
                            <img
                              src={publication.publications.logo_url}
                              alt={publication.publications?.name}
                              className="h-5 w-5 object-contain"
                            />
                          )}
                          <span className="text-sm font-semibold">
                            {publication.publications?.name}
                          </span>
                          {publication.edition && (
                            <Badge variant="secondary" className="text-xs">
                              {publication.edition}
                            </Badge>
                          )}
                        </div>

                        {publication.book_links && publication.book_links.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs text-muted-foreground">Available at:</p>
                            {publication.book_links
                              .sort((a: any, b: any) => (a.price || 0) - (b.price || 0))
                              .map((link: any) => (
                                <div
                                  key={link.id}
                                  className="flex items-center justify-between p-2 bg-muted/50 rounded"
                                >
                                  <div className="flex items-center gap-2">
                                    {link.shopping_platforms?.logo_url && (
                                      <img
                                        src={link.shopping_platforms.logo_url}
                                        alt={link.shopping_platforms?.name}
                                        className="h-4 w-4 object-contain"
                                      />
                                    )}
                                    <span className="text-sm">
                                      {link.shopping_platforms?.name}
                                    </span>
                                    {link.price && (
                                      <span className="font-semibold">₹{link.price}</span>
                                    )}
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    asChild
                                    disabled={!link.in_stock}
                                  >
                                    <a
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {link.in_stock ? (
                                        <>
                                          <ShoppingCart className="h-3 w-3 mr-1" />
                                          Buy
                                        </>
                                      ) : (
                                        'Out of Stock'
                                      )}
                                      <ExternalLink className="h-3 w-3 ml-1" />
                                    </a>
                                  </Button>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {books && books.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              No books found. Check back soon for recommendations!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
