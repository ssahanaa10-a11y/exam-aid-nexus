import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BoardsSection = () => {
  const { data: boards, isLoading } = useQuery({
    queryKey: ['boards'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('boards')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <section className="container py-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Browse by Board</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container py-16">
      <h2 className="mb-8 text-center text-3xl font-bold">Browse by Board</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {boards?.map((board) => (
          <Link key={board.id} to={`/search?board=${board.id}`}>
            <Card className="h-full transition-all hover:shadow-[var(--shadow-hover)] hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
              <CardHeader>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{board.name}</CardTitle>
                <CardDescription>{board.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
