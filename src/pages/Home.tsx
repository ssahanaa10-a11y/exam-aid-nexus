import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/home/Hero';
import { BoardsSection } from '@/components/home/BoardsSection';
import { ExamsSection } from '@/components/home/ExamsSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <BoardsSection />
        <ExamsSection />
      </main>
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 BookFinder. Helping students find the best exam preparation books.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
