export type GoogleReview = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
};

export type GoogleBusinessPlace = {
  placeId: string;
  name: string;
  address: string;
  rating: number | null;
  reviewCount: number | null;
  mapsUrl: string;
  weekdayHours: string[];
  openNow: boolean | null;
  reviews: GoogleReview[];
};

type PlacesText = { text?: string };
type PlacesAuthor = { displayName?: string };

type PlacesDetailsResponse = {
  displayName?: PlacesText;
  formattedAddress?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  regularOpeningHours?: {
    weekdayDescriptions?: string[];
    openNow?: boolean;
  };
  reviews?: Array<{
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: PlacesText;
    originalText?: PlacesText;
    authorAttribution?: PlacesAuthor;
  }>;
};

export async function getGoogleBusinessPlace(): Promise<GoogleBusinessPlace | null> {
  const placeId = process.env.GOOGLE_PLACE_ID?.trim();
  if (!placeId) return null;

  const apiKey = process.env.GOOGLE_MAPS_API_KEY?.trim();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${encodeURIComponent(placeId)}`;

  if (!apiKey) {
    return {
      placeId,
      name: 'JPE Ventures',
      address: 'Texas, USA',
      rating: null,
      reviewCount: null,
      mapsUrl,
      weekdayHours: [],
      openNow: null,
      reviews: [],
    };
  }

  const fieldMask = [
    'displayName',
    'formattedAddress',
    'rating',
    'userRatingCount',
    'regularOpeningHours',
    'reviews',
    'googleMapsUri',
  ].join(',');

  const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': fieldMask,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return {
      placeId,
      name: 'JPE Ventures',
      address: 'Texas, USA',
      rating: null,
      reviewCount: null,
      mapsUrl,
      weekdayHours: [],
      openNow: null,
      reviews: [],
    };
  }

  const data = (await response.json()) as PlacesDetailsResponse;
  const reviews = (data.reviews || [])
    .map((review) => ({
      author: review.authorAttribution?.displayName || 'Google user',
      rating: review.rating || 0,
      text: review.text?.text || review.originalText?.text || '',
      relativeTime: review.relativePublishTimeDescription || '',
    }))
    .filter((review) => review.text)
    .slice(0, 3);

  return {
    placeId,
    name: data.displayName?.text || 'JPE Ventures',
    address: data.formattedAddress || 'Texas, USA',
    rating: typeof data.rating === 'number' ? data.rating : null,
    reviewCount: typeof data.userRatingCount === 'number' ? data.userRatingCount : null,
    mapsUrl: data.googleMapsUri || mapsUrl,
    weekdayHours: data.regularOpeningHours?.weekdayDescriptions || [],
    openNow: typeof data.regularOpeningHours?.openNow === 'boolean' ? data.regularOpeningHours.openNow : null,
    reviews,
  };
}
