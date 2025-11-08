import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32" style={{ background: 'var(--gradient-hero)' }}>
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl">
          <form onSubmit={handleSearch} className="mb-12 ml-16">
            <div className="flex gap-2 rounded-lg bg-card p-2 shadow-[var(--shadow-hover)] max-w-xl">
              <Input
                type="text"
                placeholder="Search for books, subjects, or exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0"
              />
              <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90">
                <Search className="h-5 w-5" />
                Search
              </Button>
            </div>
          </form>
          
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-extrabold text-foreground md:text-6xl tracking-tight">
              Find Your Perfect Exam Preparation Books
            </h1>
            <p className="mb-8 text-lg text-foreground/80 md:text-xl font-medium">
              Compare prices across multiple publications and platforms. Get the best books for CBSE, ICSE, JEE, NEET, and more.
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,white)]" />
    </section>
  );
};
