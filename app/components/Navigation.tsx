'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isOverHero = !scrolled && activeId === 'hero' && !mobileMenuOpen;

  const navBg = mobileMenuOpen
    ? 'bg-white py-3 border-b border-ice'
    : scrolled
      ? 'bg-white/95 backdrop-blur-md py-3 shadow-sm border-b border-ice'
      : 'bg-transparent py-6';

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${navBg}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button
            type="button"
            onClick={() => scrollTo('hero')}
            className="relative z-50 cursor-pointer shrink-0"
            aria-label="JPE Ventures home"
          >
            <Logo
              priority
              className={`transition-all duration-500 ${
                scrolled || mobileMenuOpen ? 'h-12 md:h-14' : 'h-14 md:h-18'
              } ${isOverHero ? 'drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]' : ''}`}
            />
          </button>

          <div className="hidden md:flex space-x-12">
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className={`text-xs font-medium tracking-[0.2em] uppercase hover:opacity-70 transition-all duration-300 relative group cursor-pointer
                    ${isActive ? 'opacity-100' : 'opacity-80'}
                    ${isOverHero ? 'text-white' : 'text-navy'}
                  `}
                >
                  {link.label}
                  <span className={`absolute -bottom-2 left-0 h-px bg-current transition-all duration-300 group-hover:w-full ${isActive ? 'w-full' : 'w-0'}`}></span>
                </button>
              );
            })}
          </div>

          <div className="md:hidden z-50">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`transition-colors duration-300 ${isOverHero ? 'text-white' : 'text-navy'}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-white md:hidden flex flex-col justify-center px-8 transition-transform duration-500 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              className="text-left text-3xl font-serif text-navy hover:text-sky transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="mt-12 pt-12 border-t border-ice">
          <p className="text-xs uppercase tracking-widest text-sky-dark mb-2">JPE Ventures</p>
          <p className="text-navy mb-1">Juan Pablo Esquivel Sr.</p>
          <p className="text-muted font-light">General Contracting</p>
        </div>
      </div>
    </>
  );
}
