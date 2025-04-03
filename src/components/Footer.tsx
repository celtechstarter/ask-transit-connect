
import { useLanguage } from "@/providers/LanguageProvider";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-bold mb-4">ASK Krankentransporte</h3>
            <address className="not-italic">
              <p className="mb-1">Musterstraße 123</p>
              <p className="mb-1">10115 Berlin</p>
              <p className="mb-1">Deutschland</p>
              <p className="mb-1">
                <strong>{t('contact.phone')}:</strong> +49 123 4567890
              </p>
              <p>
                <strong>{t('contact.email')}:</strong> info@ask-krankentransporte.de
              </p>
            </address>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('services')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="hover:underline">
                  {t('services.ambulance.title')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:underline">
                  {t('services.emergency.title')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:underline">
                  {t('services.special.title')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('contact.title')}</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:text-accent" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-accent" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-accent" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom links and copyright */}
        <div className="border-t border-primary-foreground/20 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm mb-4 sm:mb-0">
              &copy; {currentYear} ASK Krankentransporte. {t('footer.rights')}
            </p>
            <nav className="flex space-x-4 text-sm">
              <Link to="/privacy" className="hover:underline">
                {t('footer.privacy')}
              </Link>
              <Link to="/terms" className="hover:underline">
                {t('footer.terms')}
              </Link>
              <Link to="/imprint" className="hover:underline">
                {t('footer.imprint')}
              </Link>
            </nav>
          </div>
        </div>
        
        {/* Back to top button */}
        <div className="text-center mt-8">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-sm hover:underline"
            aria-label={t('back.to.top')}
          >
            <span>{t('back.to.top')}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="inline"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
