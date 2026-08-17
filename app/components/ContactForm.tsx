'use client';

import { useState, FormEvent } from 'react';
import Button from './UI/button';

const projectTypes = [
  'Residential Custom Home',
  'Residential Remodel/Addition',
  'Commercial Build',
  'Drywall & Framing Subcontracting',
];

const fieldClass =
  'w-full bg-white border-none outline-none p-4 text-navy focus:ring-1 focus:ring-sky transition-all placeholder:text-muted-light';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      fullName: String(formData.get('fullName') || ''),
      email: String(formData.get('email') || ''),
      projectType: String(formData.get('projectType') || ''),
      details: String(formData.get('details') || ''),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({ ok: false }));

      if (!response.ok || !result.ok) {
        setError(result.error || 'Unable to send your inquiry right now.');
        return;
      }

      setSubmitted(true);
    } catch {
      setError('Unable to send your inquiry right now.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-ice p-10 lg:p-16 flex flex-col justify-center min-h-[420px]">
        <span className="block text-xs font-bold tracking-[0.2em] uppercase text-sky-dark mb-4">
          Inquiry Received
        </span>
        <h3 className="text-3xl font-serif text-navy mb-4">Thank you.</h3>
        <p className="text-muted font-light leading-relaxed">
          We have received your project inquiry and will be in touch shortly to discuss next steps.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-ice p-10 lg:p-16">
      <h3 className="text-2xl font-serif text-navy mb-8">Send Us a Message</h3>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="text-xs uppercase tracking-widest text-muted mb-2 block">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              className={fieldClass}
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted mb-2 block">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={fieldClass}
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="projectType" className="text-xs uppercase tracking-widest text-muted mb-2 block">
            Project Type
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue=""
            className={`${fieldClass} cursor-pointer`}
          >
            <option value="" disabled>
              Select a project type
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="details" className="text-xs uppercase tracking-widest text-muted mb-2 block">
            Project Details
          </label>
          <textarea
            id="details"
            name="details"
            rows={5}
            required
            className={`${fieldClass} resize-none`}
            placeholder="Tell us about your residential blueprints, addition, or commercial scope..."
          />
        </div>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <Button type="submit" variant="primary" className={`w-full py-4 mt-4 ${submitting ? 'opacity-70 pointer-events-none' : ''}`}>
          {submitting ? 'Sending...' : 'Submit Project Inquiry'}
        </Button>
      </form>
    </div>
  );
}
