import { Star } from 'lucide-react';
import SectionHeading from './UI/sectionheading';
import { getGoogleBusinessPlace } from '@/lib/google-business';

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rounded ? 'fill-sky text-sky' : 'text-sky-light'}
        />
      ))}
    </span>
  );
}

export default async function GoogleBusiness() {
  const place = await getGoogleBusinessPlace();
  if (!place) return null;

  const mapSrc = `https://www.google.com/maps?q=place_id:${encodeURIComponent(place.placeId)}&output=embed`;

  return (
    <section id="reviews" className="py-24 md:py-32 bg-white scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <SectionHeading subtitle="Google Business" title="Find Us on Google" />
          <p className="text-muted font-light text-lg leading-relaxed -mt-8">
            See hours, directions, and recent reviews from our Google Business Profile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="w-full aspect-[4/3] bg-ice overflow-hidden">
            <iframe
              title={`${place.name} on Google Maps`}
              src={mapSrc}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div>
            <h3 className="text-2xl font-serif text-navy mb-2">{place.name}</h3>
            <p className="text-muted font-light mb-6">{place.address}</p>

            {place.rating !== null ? (
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <Stars rating={place.rating} />
                <span className="font-serif text-2xl text-navy">{place.rating.toFixed(1)}</span>
                {place.reviewCount !== null ? (
                  <span className="text-muted font-light">
                    {place.reviewCount} review{place.reviewCount === 1 ? '' : 's'}
                  </span>
                ) : null}
              </div>
            ) : null}

            {place.openNow !== null || place.weekdayHours.length > 0 ? (
              <div className="mb-10">
                <h4 className="text-xs font-bold uppercase tracking-widest text-navy mb-4">Hours</h4>
                {place.openNow !== null ? (
                  <p className={`text-sm mb-3 ${place.openNow ? 'text-sky-dark' : 'text-muted'}`}>
                    {place.openNow ? 'Open now' : 'Closed now'}
                  </p>
                ) : null}
                {place.weekdayHours.length > 0 ? (
                  <ul className="space-y-1 text-sm font-light text-muted">
                    {place.weekdayHours.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}

            {place.reviews.length > 0 ? (
              <div className="space-y-8 mb-10">
                <h4 className="text-xs font-bold uppercase tracking-widest text-navy">Recent Reviews</h4>
                {place.reviews.map((review) => (
                  <blockquote key={`${review.author}-${review.relativeTime}`} className="border-t border-ice pt-6">
                    <Stars rating={review.rating} />
                    <p className="text-navy font-light leading-relaxed mt-3">{review.text}</p>
                    <footer className="mt-3 text-xs uppercase tracking-widest text-muted">
                      {review.author}
                      {review.relativeTime ? ` · ${review.relativeTime}` : ''}
                    </footer>
                  </blockquote>
                ))}
              </div>
            ) : (
              <p className="text-muted font-light mb-10">
                Reviews will appear here once the Google Place ID and Maps API key are connected.
              </p>
            )}

            <a
              href={place.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.2em] uppercase text-navy border-b border-sky pb-1 hover:text-sky transition-colors"
            >
              View on Google
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
