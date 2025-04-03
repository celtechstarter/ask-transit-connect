
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/providers/LanguageProvider";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" aria-label="ASK Krankentransporte">
              <span className="text-xl font-bold text-primary">ASK</span>
              <span className="hidden sm:inline-block text-lg font-medium">Krankentransporte</span>
            </Link>
          </div>

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

          <div className="flex items-center space-x-1">
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
