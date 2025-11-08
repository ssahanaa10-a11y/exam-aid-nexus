import { Link } from 'react-router-dom';
import { Home, BookOpen, GraduationCap, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: BookOpen, label: 'Boards', path: '/#boards' },
  { icon: GraduationCap, label: 'Exams', path: '/#exams' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const NavSlider = () => {
  return (
    <div className="fixed left-0 top-24 z-40 bg-card border-r border-border shadow-lg rounded-r-lg p-2">
      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link key={item.label} to={item.path}>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 hover:bg-primary/10 hover:text-primary transition-colors"
              title={item.label}
            >
              <item.icon className="h-5 w-5" />
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};
