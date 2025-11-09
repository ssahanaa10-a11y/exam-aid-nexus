import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-2xl">
          BookFinder
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;
