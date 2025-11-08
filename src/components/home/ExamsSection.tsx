import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, GraduationCap, Briefcase, Scale, BookOpen, Heart, Cpu, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const streamIcons = {
  engineering: Cpu,
  medical: Heart,
  management: Briefcase,
  law: Scale,
  arts: BookOpen,
  commerce: Briefcase,
  science: GraduationCap,
  general: Users,
};

const streamColors = {
  engineering: 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20',
  medical: 'bg-red-500/10 text-red-600 hover:bg-red-500/20',
  management: 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20',
  law: 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20',
  arts: 'bg-pink-500/10 text-pink-600 hover:bg-pink-500/20',
  commerce: 'bg-green-500/10 text-green-600 hover:bg-green-500/20',
  science: 'bg-cyan-500/10 text-cyan-600 hover:bg-cyan-500/20',
  general: 'bg-slate-500/10 text-slate-600 hover:bg-slate-500/20',
};

export const ExamsSection = () => {
  const [selectedStream, setSelectedStream] = useState<string | null>(null);

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

  const streams = Array.from(new Set(exams?.map(exam => exam.stream) || []));
  const filteredExams = selectedStream 
    ? exams?.filter(exam => exam.stream === selectedStream)
    : exams;

  if (isLoading) {
    return (
      <section className="container py-16 bg-muted/30">
        <h2 className="mb-8 text-center text-3xl font-bold">Browse by Entrance Exam</h2>
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-9 w-24 bg-muted rounded-full animate-pulse" />
          ))}
        </div>
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
      
      {/* Stream Filters */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        <Badge
          variant={selectedStream === null ? 'default' : 'outline'}
          className="cursor-pointer px-4 py-2 text-sm"
          onClick={() => setSelectedStream(null)}
        >
          All Streams
        </Badge>
        {streams.map((stream) => {
          const Icon = streamIcons[stream as keyof typeof streamIcons] || Award;
          return (
            <Badge
              key={stream}
              variant={selectedStream === stream ? 'default' : 'outline'}
              className={`cursor-pointer px-4 py-2 text-sm transition-colors ${
                selectedStream === stream ? '' : streamColors[stream as keyof typeof streamColors]
              }`}
              onClick={() => setSelectedStream(stream)}
            >
              <Icon className="mr-1 h-3 w-3" />
              {stream.charAt(0).toUpperCase() + stream.slice(1)}
            </Badge>
          );
        })}
      </div>

      {/* Exams Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredExams?.map((exam) => {
          const Icon = streamIcons[exam.stream as keyof typeof streamIcons] || Award;
          return (
            <Link key={exam.id} to={`/search?exam=${exam.id}`}>
              <Card className="h-full transition-all hover:shadow-[var(--shadow-hover)] hover:-translate-y-1 cursor-pointer border-2 hover:border-secondary/50">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                      <Icon className="h-6 w-6 text-secondary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {exam.stream}
                    </Badge>
                  </div>
                  <CardTitle>{exam.name}</CardTitle>
                  {exam.description && (
                    <CardDescription>
                      <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                        {exam.description.split('.').filter(point => point.trim()).map((point, idx) => (
                          <li key={idx}>{point.trim()}</li>
                        ))}
                      </ul>
                    </CardDescription>
                  )}
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
