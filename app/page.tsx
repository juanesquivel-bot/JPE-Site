import Image from "next/image";
import Button from "./components/UI/button";
import SectionHeading from "./components/UI/sectionheading";
import ContactForm from "./components/ContactForm";
import { ArrowRight, Mail, MapPin, User } from "lucide-react";

const whyUs = [
  {
    title: "40 Years of Industry Expertise",
    description:
      "Decades of site supervision, custom framing, and general contracting leadership.",
  },
  {
    title: "Full-Service Residential & Commercial",
    description:
      "Seamless management from site preparation and framing to high-end interior finishes.",
  },
  {
    title: "Uncompromising Standards",
    description:
      "Precision craftsmanship utilizing energy-efficient, fire-rated, and moisture-resistant building materials.",
  },
];

const residentialServices = [
  {
    title: "Custom Home Construction",
    description:
      "End-to-end management of custom new builds, working from blueprints through framing, drywall, and complete interior delivery.",
  },
  {
    title: "Home Additions & Expansions",
    description:
      "Room additions, second-story expansions, attached/detached garages, and accessory dwelling units (ADUs).",
  },
  {
    title: "Full Home & Interior Remodeling",
    description:
      "Open-concept transformations, structural wall modifications, kitchen/bath gut remodels, and basement finishing.",
  },
  {
    title: "Residential Framing (Wood & Metal Stud)",
    description:
      "Expert structural framing for new builds, load-bearing walls, custom ceiling designs (vaulted, tray, coffered), and additions.",
  },
  {
    title: "Custom Drywall & Architectural Finishes",
    description:
      "High-grade residential drywall installation, high-end smooth wall finishes (Level 5 drywall finish), custom ceiling textures, and soundproof interior wall systems for media rooms and bedrooms.",
  },
  {
    title: "Damage Restoration & Moisture Repair",
    description:
      "Specialized replacement of water-damaged, mold-resistant, or fire-impacted drywall and framing components.",
  },
];

const commercialServices = [
  {
    title: "Metal Stud Framing",
    description:
      "Engineering and erecting heavy-duty structural skeletons for exterior load-bearing walls, interior office partitions, and overhead soffits.",
  },
  {
    title: "Commercial Drywall Installation",
    description:
      "Precision hanging and taping of specialized gypsum systems (high-impact, Type X fire-rated assemblies, and moisture-resistant boards).",
  },
  {
    title: "Acoustical Ceiling Systems",
    description:
      "Expert layout and hanging of suspended ceiling grids and acoustic tiles (ACT) for superior noise reduction and clean commercial design.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative h-screen w-full overflow-hidden scroll-mt-0">
        <div className="absolute inset-0 bg-navy/55 z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000"
          alt="Construction craftsmanship"
          fill
          className="object-cover animate-slow-zoom"
          priority
        />
        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center text-white">
          <div className="animate-fade-in-up max-w-4xl">
            <h2 className="text-xs md:text-sm tracking-[0.4em] uppercase mb-6 opacity-90 border-l-2 border-sky pl-4">
              JPE Ventures — General Contracting
            </h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-8 leading-[1.1]">
              Built on 40 Years of Uncompromising Quality
            </h1>
            <p className="max-w-2xl text-lg opacity-90 mb-12 font-light leading-relaxed">
              From custom home construction and structural renovations to high-precision commercial build-outs, JPE Ventures brings four decades of trade mastery, structural integrity, and dedicated site leadership to every project.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button variant="sky" href="#contact">
                Request a Consultation <ArrowRight size={16} />
              </Button>
              <Button variant="outline" href="#services" className="border-white text-white hover:bg-white hover:text-navy">
                View Our Services
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-0 w-full z-20 flex justify-center animate-bounce duration-[2000ms]">
          <div className="w-[1px] h-16 bg-sky/70"></div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 md:py-32 bg-white scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
            <div>
              <SectionHeading subtitle="About Us" title="Master Craftsmanship, Built to Last" />
              <div className="space-y-6 text-muted font-light text-lg leading-relaxed">
                <p>
                  At JPE Ventures, construction isn&apos;t just about building structures—it&apos;s about creating lasting value for homeowners, property managers, and commercial clients.
                </p>
                <p>
                  Founded and led by Juan Pablo Esquivel Sr., JPE Ventures is backed by 40 years of hands-on expertise in residential homebuilding, structural metal framing, high-end drywall systems, and comprehensive general contracting.
                </p>
                <p>
                  Juan Pablo&apos;s deep roots in structural assembly, precision framing, and wall systems ensure that every home we construct or renovate is built on an exceptional baseline of structural stability, energy efficiency, and long-lasting craftsmanship. Whether bringing a custom home blueprint to life or executing a multi-room residential addition, JPE Ventures delivers projects on time, on budget, and built to code.
                </p>
              </div>
            </div>
            <div className="relative w-full aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1600"
                alt="Structural framing and site craftsmanship"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-sky-dark mb-12">
              Why Work With Us?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyUs.map((item, i) => (
                <div
                  key={item.title}
                  className="bg-frost p-10 border border-ice hover:shadow-xl transition-shadow duration-500"
                >
                  <span className="text-4xl font-serif text-sky mb-6 block">0{i + 1}</span>
                  <h4 className="text-xl font-serif text-navy mb-3">{item.title}</h4>
                  <p className="text-muted font-light text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 md:py-32 bg-ice scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <SectionHeading
              subtitle="Capabilities"
              title="Our Services & Specialized Capabilities"
            />
            <h3 className="text-2xl md:text-3xl font-serif text-navy mb-4 -mt-8">
              Residential Construction & Home Upgrades
            </h3>
            <p className="text-muted font-light text-lg leading-relaxed">
              We partner with homeowners to build, expand, and modernize living spaces with high-end craftsmanship and structural integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 mb-28">
            {residentialServices.map((service) => (
              <div key={service.title} className="border-t border-sky-light pt-6">
                <h4 className="text-xl font-serif text-navy mb-3">{service.title}</h4>
                <p className="text-muted font-light leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-navy text-white p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-navy-mid/50 -skew-x-12 translate-x-1/2"></div>
            <div className="relative z-10">
              <span className="block text-xs font-bold tracking-[0.2em] uppercase mb-4 text-sky">
                Specialized Commercial Capabilities
              </span>
              <h3 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">
                Commercial General Contracting & Interior Build-Outs
              </h3>
              <p className="text-sky-light font-light text-lg leading-relaxed max-w-3xl mb-14">
                We deliver reliable commercial builds, tenant improvements, and structural interior projects on strict business schedules.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {commercialServices.map((service) => (
                  <div key={service.title}>
                    <h4 className="text-xl font-serif text-white mb-3">{service.title}</h4>
                    <p className="text-sky-light font-light text-sm leading-relaxed">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 md:py-32 bg-white scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <SectionHeading
                subtitle="Contact Us"
                title="Ready to Build? Let’s Talk About Your Project."
              />
              <p className="text-lg font-light text-muted mb-12 max-w-md -mt-8">
                Reach out today to discuss your residential blueprints, schedule a walk-through for a home addition, or get a bid on commercial drywall and framing.
              </p>

              <div className="space-y-8">
                <div className="flex items-start">
                  <User className="mt-1 mr-6 text-sky shrink-0" size={20} />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-navy mb-1">Company</h4>
                    <p className="text-muted font-light">JPE Ventures</p>
                    <p className="text-muted font-light">Lead Contractor: Juan Pablo Esquivel Sr.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="mt-1 mr-6 text-sky shrink-0" size={20} />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-navy mb-1">Email</h4>
                    <a
                      href="mailto:Juanesquivel@jpe-ventures.com"
                      className="text-muted font-light hover:text-sky transition-colors"
                    >
                      Juanesquivel@jpe-ventures.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="mt-1 mr-6 text-sky shrink-0" size={20} />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-navy mb-1">Service Area</h4>
                    <p className="text-muted font-light">Texas, USA</p>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
