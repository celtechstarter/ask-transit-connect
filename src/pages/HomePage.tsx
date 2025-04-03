
import { useLanguage } from "@/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Ambulance, Shield, Calendar, Phone, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

export default function HomePage() {
  const { t } = useLanguage();
  const servicesRef = useRef<HTMLElement>(null);
  
  // Refs for animation sections
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesCardRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const aboutRef = useRef<HTMLDivElement>(null);

  // Text-to-speech state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Set up text-to-speech voices when available
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const setVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const germanVoice = voices.find(voice => voice.lang.includes('de'));
        setCurrentVoice(germanVoice || voices[0]);
      };

      // Chrome loads voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = setVoices;
      }
      
      setVoices();
    }

    return () => {
      // Clean up any ongoing speech when component unmounts
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

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

  // Text-to-speech function
  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      
      if (currentVoice) {
        utterance.voice = currentVoice;
      }
      
      utterance.lang = 'de-DE';
      utterance.rate = 0.9; // Slightly slower for better understanding
      utterance.pitch = 1;
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Function to speak the current section
  const speakSection = (element: HTMLElement | null, title: string) => {
    if (!element) return;
    
    const text = `${title}. ${element.textContent}`;
    speakText(text);
  };

  return (
    <main className="flex-1" role="main">
      {/* Skip to content link for keyboard users */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-primary focus:text-white focus:z-50"
      >
        {t('accessibility.skipToContent')}
      </a>

      {/* Text-to-speech control */}
      <div 
        className="fixed bottom-4 right-4 z-40"
        aria-live="polite"
      >
        <Button
          variant="default"
          size="icon"
          className="rounded-full shadow-lg bg-primary hover:bg-primary/90 text-white"
          onClick={() => speakSection(document.querySelector('main'), t('accessibility.entirePage'))}
          aria-label={t('accessibility.readPage')}
          aria-pressed={isSpeaking}
          title={t('accessibility.readPage')}
        >
          <Volume2 className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">{t('accessibility.readPage')}</span>
        </Button>
      </div>

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
                className="bg-medical-orange hover:bg-medical-orange/90 focus:ring-2 focus:ring-offset-2 focus:ring-medical-orange"
                onClick={() => servicesRef.current?.scrollIntoView({ behavior: 'smooth' })}
                aria-label={t('services') + ', ' + t('button.scrollToSection')}
              >
                {t('services')}
              </Button>
              <Link to="/contact">
                <Button 
                  size="lg"
                  variant="outline" 
                  className="border-white bg-transparent text-white hover:bg-white/20 dark:border-white dark:text-white dark:hover:bg-white/10 focus:ring-2 focus:ring-offset-2 focus:ring-white"
                  aria-label={t('hero.cta')}
                >
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                  {t('hero.cta')}
                </Button>
              </Link>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => speakSection(heroRef.current, t('hero.title'))}
              className="mt-4 text-white hover:bg-white/20"
              aria-label={t('accessibility.readSection')}
            >
              <Volume2 className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>{t('accessibility.readSection')}</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        ref={servicesRef}
        className="py-16 md:py-24 bg-background"
        aria-labelledby="services-heading"
        id="main-content"
      >
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 id="services-heading" className="text-3xl font-bold mb-4">
              {t('services.title')}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => speakSection(servicesRef.current, t('services.title'))}
              className="text-primary hover:bg-primary/10"
              aria-label={t('accessibility.readSection') + ': ' + t('services.title')}
            >
              <Volume2 className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>{t('accessibility.readSection')}</span>
            </Button>
          </div>
          
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8" 
            role="list" 
            aria-label={t('services.list.description')}
          >
            {/* Service Card 1 */}
            <div 
              ref={servicesCardRefs[0]}
              className="bg-card rounded-lg shadow-md p-6 opacity-0 focus-within:ring-2 focus-within:ring-primary"
              role="listitem"
              tabIndex={0}
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => speakText(t('services.ambulance.title') + '. ' + t('services.ambulance.description'))}
                className="w-full mt-4 text-primary hover:bg-primary/10"
                aria-label={t('accessibility.readSection') + ': ' + t('services.ambulance.title')}
              >
                <Volume2 className="mr-2 h-4 w-4" aria-hidden="true" />
                <span className="sr-only">{t('accessibility.readSection')}</span>
              </Button>
            </div>
            
            {/* Service Card 2 */}
            <div 
              ref={servicesCardRefs[1]}
              className="bg-card rounded-lg shadow-md p-6 opacity-0 focus-within:ring-2 focus-within:ring-primary"
              role="listitem"
              tabIndex={0}
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => speakText(t('services.emergency.title') + '. ' + t('services.emergency.description'))}
                className="w-full mt-4 text-primary hover:bg-primary/10"
                aria-label={t('accessibility.readSection') + ': ' + t('services.emergency.title')}
              >
                <Volume2 className="mr-2 h-4 w-4" aria-hidden="true" />
                <span className="sr-only">{t('accessibility.readSection')}</span>
              </Button>
            </div>
            
            {/* Service Card 3 */}
            <div 
              ref={servicesCardRefs[2]}
              className="bg-card rounded-lg shadow-md p-6 opacity-0 focus-within:ring-2 focus-within:ring-primary"
              role="listitem"
              tabIndex={0}
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => speakText(t('services.special.title') + '. ' + t('services.special.description'))}
                className="w-full mt-4 text-primary hover:bg-primary/10"
                aria-label={t('accessibility.readSection') + ': ' + t('services.special.title')}
              >
                <Volume2 className="mr-2 h-4 w-4" aria-hidden="true" />
                <span className="sr-only">{t('accessibility.readSection')}</span>
              </Button>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services">
              <Button 
                variant="outline" 
                size="lg"
                aria-label={t('services') + ' ' + t('button.moreInfo')}
                className="focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {t('services')} &rarr;
                <span className="sr-only">{t('button.moreInfo')}</span>
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
                className="focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {t('about')} &rarr;
                <span className="sr-only">{t('button.moreInfo')}</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => speakSection(aboutRef.current, t('about.title'))}
              className="block mx-auto mt-4 text-primary hover:bg-primary/10"
              aria-label={t('accessibility.readSection') + ': ' + t('about.title')}
            >
              <Volume2 className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>{t('accessibility.readSection')}</span>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
