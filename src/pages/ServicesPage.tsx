
import { useLanguage } from "@/providers/LanguageProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Ambulance, Shield, Calendar, Clock, Users, Heart } from "lucide-react";

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Ambulance className="h-6 w-6" />,
      title: t('services.ambulance.title'),
      description: t('services.ambulance.description'),
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('services.emergency.title'),
      description: t('services.emergency.description'),
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum."
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: t('services.special.title'),
      description: t('services.special.description'),
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24/7 Service",
      description: "Round-the-clock availability for all your medical transport needs",
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Professional Team",
      description: "Highly trained medical professionals for your safety",
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Patient-Centered Care",
      description: "Compassionate and attentive care for every patient",
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum."
    }
  ];

  return (
    <div className="flex-1">
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary to-medical-teal text-white">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {t('services.title')}
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-6 mx-auto">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-center mb-4">
                    {service.description}
                  </p>
                  <p className="text-sm">
                    {service.details}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
