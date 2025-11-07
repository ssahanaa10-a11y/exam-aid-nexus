import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ExamsSection = () => {
  const { data: exams, isLoading } = useQuery({
    queryKey: ['exams'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exams')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <section className="container py-16 bg-muted/30">
        <h2 className="mb-8 text-center text-3xl font-bold">Browse by Entrance Exam</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
    <section className="container py-16 bg-muted/30">
      <h2 className="mb-8 text-center text-3xl font-bold">Browse by Entrance Exam</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exams?.map((exam) => (
          <Link key={exam.id} to={`/search?exam=${exam.id}`}>
            <Card className="h-full transition-all hover:shadow-[var(--shadow-hover)] hover:-translate-y-1 cursor-pointer border-2 hover:border-secondary/50">
              <CardHeader>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <Award className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>{exam.name}</CardTitle>
                <CardDescription>{exam.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
