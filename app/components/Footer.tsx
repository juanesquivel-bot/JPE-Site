'use client';

import Logo from './Logo';

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-deep text-muted-light py-20 border-t border-navy">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <Logo className="h-24 w-auto mb-6" />
            <p className="text-sm font-light leading-relaxed max-w-xs">
              Four decades of trade mastery, structural integrity, and dedicated site leadership.
            </p>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Navigate</h4>
            <ul className="space-y-4 text-sm font-light">
              <li>
                <button type="button" onClick={() => scrollTo('hero')} className="hover:text-sky transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('about')} className="hover:text-sky transition-colors cursor-pointer">
                  About
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('services')} className="hover:text-sky transition-colors cursor-pointer">
                  Services
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('contact')} className="hover:text-sky transition-colors cursor-pointer">
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4 text-sm font-light">
              <li>JPE Ventures</li>
              <li>Juan Pablo Esquivel Sr.</li>
              <li>
                <a href="mailto:Juanesquivel@jpe-ventures.com" className="hover:text-sky transition-colors">
                  Juanesquivel@jpe-ventures.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-navy text-xs tracking-widest uppercase">
          <p className="opacity-60">© {new Date().getFullYear()} JPE Ventures.</p>
          <p className="mt-4 md:mt-0 opacity-60">Built to last.</p>
        </div>
      </div>
    </footer>
  );
}
