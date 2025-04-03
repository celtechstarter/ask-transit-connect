
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/providers/LanguageProvider";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigationItems = [
  { name: "home", href: "/" },
  { name: "services", href: "/services" },
  { name: "about", href: "/about" },
  { name: "contact", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Full width banner image */}
      <div className="w-full">
        <img 
          src="/lovable-uploads/d47c07cc-564a-46a9-9daf-1099aa851a2e.png" 
          alt="ASK Krankentransport Header" 
          className="w-full h-auto"
        />
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t(item.name)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-1 ml-auto">
            {/* Phone button for quick contact */}
            <Button variant="outline" size="sm" className="hidden sm:flex items-center space-x-2 mr-2">
              <Phone className="h-4 w-4" />
              <span>+49 123 4567890</span>
            </Button>
            
            {/* Theme and language switchers */}
            <ThemeSwitcher />
            <LanguageSwitcher />
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={t('menu.toggle')}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden",
          isOpen ? "block" : "hidden"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              {t(item.name)}
            </Link>
          ))}
          {/* Mobile phone button */}
          <Button variant="default" size="sm" className="flex w-full items-center justify-center space-x-2 mt-2">
            <Phone className="h-4 w-4" />
            <span>+49 123 4567890</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
