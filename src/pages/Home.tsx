import { Navbar } from '@/components/Navbar';
import { NavSlider } from '@/components/NavSlider';
import { Hero } from '@/components/home/Hero';
import { BoardsSection } from '@/components/home/BoardsSection';
import { ExamsSection } from '@/components/home/ExamsSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <NavSlider />
      <main>
        <Hero />
        <BoardsSection />
        <ExamsSection />
      </main>
      <footer className="border-t py-12 bg-card">
        <div className="container">
          <div className="text-center mb-6">
            <blockquote className="text-lg md:text-xl font-serif italic text-foreground/90 max-w-3xl mx-auto">
              "A room without books is like a body without a soul. Education is the kindling of a flame, not the filling of a vessel."
            </blockquote>
            <p className="mt-2 text-sm text-muted-foreground">— Socrates</p>
          </div>
          <div className="text-center text-sm text-muted-foreground border-t pt-6">
            <p>© 2025 BookFinder. Helping students find the best exam preparation books.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
