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
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary py-20 md:py-32">
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-primary-foreground md:text-6xl">
            Find Your Perfect Exam Preparation Books
          </h1>
          <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl">
            Compare prices across multiple publications and platforms. Get the best books for CBSE, ICSE, JEE, NEET, and more.
          </p>
          
          <form onSubmit={handleSearch} className="mx-auto max-w-2xl">
            <div className="flex gap-2 rounded-lg bg-background p-2 shadow-[var(--shadow-hover)]">
              <Input
                type="text"
                placeholder="Search for books, subjects, or exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0"
              />
              <Button type="submit" variant="hero" size="lg">
                <Search className="h-5 w-5" />
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,white)]" />
    </section>
  );
};
