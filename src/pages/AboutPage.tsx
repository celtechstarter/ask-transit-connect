
import { useLanguage } from "@/providers/LanguageProvider";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="flex-1">
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary to-medical-teal text-white">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {t('about.title')}
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Our Story</h2>
            <p className="mb-6 leading-relaxed">
              {t('about.description')}
            </p>
            <p className="mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porttitor metus in fermentum efficitur. Praesent eu sodales turpis, non vulputate nisl. Nullam malesuada molestie lorem, in imperdiet lacus mattis ac.
            </p>
            <p className="mb-6 leading-relaxed">
              Fusce pretium pellentesque sem vel lobortis. Vivamus vitae eros sed augue accumsan iaculis. Duis et risus quam. Donec id massa justo. Nullam id sapien sit amet eros molestie faucibus ut non nunc.
            </p>

            <div className="my-12 bg-muted h-64 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Team photo placeholder</p>
            </div>

            <h2 className="text-2xl font-bold mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-2">Safety</h3>
                <p>Our top priority is the safety and well-being of our patients during transport.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-2">Professionalism</h3>
                <p>We maintain the highest standards of professionalism in all our services.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-2">Compassion</h3>
                <p>We provide empathetic care tailored to each patient's individual needs.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-2">Reliability</h3>
                <p>We are dependable and punctual, ensuring timely service when needed most.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Our Certifications</h2>
            <p className="mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porttitor metus in fermentum efficitur. Praesent eu sodales turpis, non vulputate nisl. Nullam malesuada molestie lorem, in imperdiet lacus mattis ac.
            </p>

            <div className="flex flex-wrap justify-center gap-8 my-8">
              <div className="bg-muted rounded-lg w-24 h-24 flex items-center justify-center">
                <span className="text-muted-foreground">Cert 1</span>
              </div>
              <div className="bg-muted rounded-lg w-24 h-24 flex items-center justify-center">
                <span className="text-muted-foreground">Cert 2</span>
              </div>
              <div className="bg-muted rounded-lg w-24 h-24 flex items-center justify-center">
                <span className="text-muted-foreground">Cert 3</span>
              </div>
              <div className="bg-muted rounded-lg w-24 h-24 flex items-center justify-center">
                <span className="text-muted-foreground">Cert 4</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
