import { Link } from 'react-router-dom';
import { Home, BookOpen, GraduationCap, User, Languages, HelpCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const navItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const NavSlider = () => {
  const [language, setLanguage] = useState('English');
  const { toast } = useToast();

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    toast({
      title: "Language Changed",
      description: `Language set to ${lang}`,
    });
  };

  const handleHelpCenter = () => {
    toast({
      title: "Help Center",
      description: "Opening help center...",
    });
  };

  const handleWishlist = () => {
    toast({
      title: "Wishlist",
      description: "Opening your wishlist...",
    });
  };

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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 hover:bg-primary/10 hover:text-primary transition-colors"
              title="Change Language"
            >
              <Languages className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start">
            <DropdownMenuItem onClick={() => handleLanguageChange('English')}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange('Hindi')}>
              हिन्दी (Hindi)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange('Spanish')}>
              Español (Spanish)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange('French')}>
              Français (French)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 hover:bg-primary/10 hover:text-primary transition-colors"
          title="Help Center"
          onClick={handleHelpCenter}
        >
          <HelpCircle className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 hover:bg-primary/10 hover:text-primary transition-colors"
          title="Wishlist"
          onClick={handleWishlist}
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
