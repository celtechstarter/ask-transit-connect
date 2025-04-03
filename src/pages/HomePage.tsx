
import { useLanguage } from "@/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Ambulance, Shield, Calendar, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

export default function HomePage() {
  const { t } = useLanguage();
  const servicesRef = useRef<HTMLElement>(null);
  
  // Refs for animation sections
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesCardRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const aboutRef = useRef<HTMLDivElement>(null);

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe hero section
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    // Observe service cards
    servicesCardRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Observe about section
    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main className="flex-1" role="main">
      {/* Hero Section */}
      <section 
        className="py-16 md:py-24 bg-gradient-to-br from-medical-blue to-medical-teal text-white"
        aria-labelledby="hero-heading"
      >
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div 
            ref={heroRef}
            className="max-w-3xl mx-auto text-center opacity-0"
          >
            <h1 id="hero-heading" className="text-3xl md:text-5xl font-bold mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="default" 
                className="bg-medical-orange hover:bg-medical-orange/90"
                onClick={() => servicesRef.current?.scrollIntoView({ behavior: 'smooth' })}
                aria-label={t('services') + ', ' + t('button.scrollToSection')}
              >
                {t('services')}
              </Button>
              <Link to="/contact">
                <Button 
                  size="lg"
                  variant="outline" 
                  className="border-white bg-transparent text-white hover:bg-white/20 dark:border-white dark:text-white dark:hover:bg-white/10"
                  aria-label={t('hero.cta')}
                >
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                  {t('hero.cta')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        ref={servicesRef}
        className="py-16 md:py-24 bg-background"
        aria-labelledby="services-heading"
      >
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 id="services-heading" className="text-3xl font-bold mb-4">
              {t('services.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list" aria-label={t('services.list.description')}>
            {/* Service Card 1 */}
            <div 
              ref={servicesCardRefs[0]}
              className="bg-card rounded-lg shadow-md p-6 opacity-0"
              role="listitem"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4 mx-auto" aria-hidden="true">
                <Ambulance className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">
                {t('services.ambulance.title')}
              </h3>
              <p className="text-muted-foreground text-center">
                {t('services.ambulance.description')}
              </p>
            </div>
            
            {/* Service Card 2 */}
            <div 
              ref={servicesCardRefs[1]}
              className="bg-card rounded-lg shadow-md p-6 opacity-0"
              role="listitem"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4 mx-auto" aria-hidden="true">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">
                {t('services.emergency.title')}
              </h3>
              <p className="text-muted-foreground text-center">
                {t('services.emergency.description')}
              </p>
            </div>
            
            {/* Service Card 3 */}
            <div 
              ref={servicesCardRefs[2]}
              className="bg-card rounded-lg shadow-md p-6 opacity-0"
              role="listitem"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4 mx-auto" aria-hidden="true">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">
                {t('services.special.title')}
              </h3>
              <p className="text-muted-foreground text-center">
                {t('services.special.description')}
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services">
              <Button 
                variant="outline" 
                size="lg"
                aria-label={t('services') + ' ' + t('button.moreInfo')}
              >
                {t('services')} &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        className="py-16 md:py-24 bg-muted"
        aria-labelledby="about-heading"
      >
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div 
            ref={aboutRef}
            className="max-w-3xl mx-auto text-center opacity-0"
          >
            <h2 id="about-heading" className="text-3xl font-bold mb-8">
              {t('about.title')}
            </h2>
            <p className="text-lg mb-8 leading-relaxed">
              {t('about.description')}
            </p>
            <Link to="/about">
              <Button 
                variant="default" 
                size="lg"
                aria-label={t('about') + ' ' + t('button.moreInfo')}
              >
                {t('about')} &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
