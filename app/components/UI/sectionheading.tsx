import React from 'react'

const SectionHeading = ({ subtitle, title, dark = false }: { subtitle: string, title: string, dark?: boolean }) => {
  return (
    <div className="mb-16">
      <span className={`block text-xs font-bold tracking-[0.2em] uppercase mb-4 ${dark ? 'text-sky' : 'text-sky-dark'}`}>
        {subtitle}
      </span>
      <h2 className={`text-4xl md:text-5xl font-serif leading-tight ${dark ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
    </div>
  );
}

export default SectionHeading
