import { allDestinationsData } from '../data/destinationsData';

const STORAGE_KEY = 'bf_destinations_v1';
const CONTENT_STORAGE_PREFIX = 'bf_dest_content_';
export const DESTINATIONS_EVENT = 'bf_destinations_updated';

// Default 8 destinations
export const initialEightDestinations = [
  {
    id: 1,
    slug: 'africa',
    name: 'Africa',
    tagline: 'Untamed Wilderness & Safaris',
    heroImage: allDestinationsData['africa']?.heroImage || '/assets/images/sean-robertson-5ftxFgXLtkI-unsplash-scaled.jpg',
    countriesCount: allDestinationsData['africa']?.countries?.length || 11,
    isPublished: true
  },
  {
    id: 2,
    slug: 'america',
    name: 'America',
    tagline: 'From Coast to Coast',
    heroImage: allDestinationsData['america']?.heroImage || '/assets/images/sidra-s-KHYCVWu-Tng-unsplash-scaled.jpg',
    countriesCount: allDestinationsData['america']?.countries?.length || 10,
    isPublished: true
  },
  {
    id: 3,
    slug: 'asian-countries',
    name: 'Asian Countries',
    tagline: 'Heritage to Himalayas',
    heroImage: allDestinationsData['asian-countries']?.heroImage || '/assets/images/xavier-coiffic-ByAHlRiTQjo-unsplash-scaled.jpg',
    countriesCount: allDestinationsData['asian-countries']?.countries?.length || 10,
    isPublished: true
  },
  {
    id: 4,
    slug: 'australia',
    name: 'Australia',
    tagline: 'Wonders Down Under',
    heroImage: allDestinationsData['australia']?.heroImage || '/assets/images/family-holidays-nsw-main.jpg',
    countriesCount: allDestinationsData['australia']?.countries?.length || 6,
    isPublished: true
  },
  {
    id: 5,
    slug: 'europe',
    name: 'Europe',
    tagline: 'Timeless Charm & Grandeur',
    heroImage: allDestinationsData['europe']?.heroImage || '/assets/images/snow-dusts-spires-famed-neuschwanstein-castle.jpg',
    countriesCount: allDestinationsData['europe']?.countries?.length || 8,
    isPublished: true
  },
  {
    id: 6,
    slug: 'indian-ocean',
    name: 'Indian Ocean',
    tagline: 'Your Island Story Begins Here',
    heroImage: allDestinationsData['indian-ocean']?.heroImage || '/assets/images/idyllic-tropical-island-resort-hotel-luxury-travel-concept-generative-ai.jpg',
    countriesCount: allDestinationsData['indian-ocean']?.countries?.length || 4,
    isPublished: true
  },
  {
    id: 7,
    slug: 'middle-east',
    name: 'Middle East',
    tagline: 'Desert Dunes & Gilded Skylines',
    heroImage: allDestinationsData['middle-east']?.heroImage || '/assets/images/metro-railway-station-dubai-night-concept-modern-urban-architecture.jpg',
    countriesCount: allDestinationsData['middle-east']?.countries?.length || 5,
    isPublished: true
  },
  {
    id: 8,
    slug: 'south-asia',
    name: 'South Asia',
    tagline: 'Heritage to Himalayas',
    heroImage: allDestinationsData['south-asia']?.heroImage || '/assets/images/swayambhunath-ancient-religious-architecture-kathmandu-valley-nepal.jpg',
    countriesCount: allDestinationsData['south-asia']?.countries?.length || 6,
    isPublished: true
  }
];

export function getStoredDestinations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialEightDestinations;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // 1. Merge the standard 8 destinations
      const initialMerged = initialEightDestinations.map(item => {
        const found = parsed.find(p => p.slug === item.slug);
        return found ? { ...item, ...found } : item;
      });

      // 2. Append any custom destinations added by the admin
      const customAdded = parsed.filter(p => !initialEightDestinations.some(init => init.slug === p.slug));

      return [...initialMerged, ...customAdded];
    }
  } catch (err) {
    console.error('Error reading destinations from storage', err);
  }
  return initialEightDestinations;
}

export function saveStoredDestinations(destinations) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(destinations));
    window.dispatchEvent(new Event(DESTINATIONS_EVENT));
  } catch (err) {
    console.error('Error saving destinations to storage', err);
  }
}

export function toggleDestinationPublish(slug) {
  const list = getStoredDestinations();
  const updated = list.map(d => {
    if (d.slug === slug) {
      return { ...d, isPublished: !d.isPublished };
    }
    return d;
  });
  saveStoredDestinations(updated);
  return updated.find(d => d.slug === slug);
}

export function updateDestinationDetails(slug, details) {
  const list = getStoredDestinations();
  const updated = list.map(d => {
    if (d.slug === slug) {
      return { ...d, ...details };
    }
    return d;
  });
  saveStoredDestinations(updated);
  return updated.find(d => d.slug === slug);
}

export function addDestination(newDest) {
  const list = getStoredDestinations();
  const rawSlug = newDest.slug || newDest.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const cleanSlug = rawSlug.trim() || `dest-${Date.now()}`;

  const destItem = {
    id: Date.now(),
    slug: cleanSlug,
    name: newDest.name,
    tagline: newDest.tagline || '',
    heroImage: newDest.heroImage || '/assets/images/family-holidays-nsw-main.jpg',
    countriesCount: Array.isArray(newDest.countries) ? newDest.countries.length : 0,
    isPublished: newDest.isPublished !== false,
    isCustom: true
  };

  const existingIdx = list.findIndex(d => d.slug === cleanSlug);
  let updatedList;
  if (existingIdx >= 0) {
    updatedList = [...list];
    updatedList[existingIdx] = { ...updatedList[existingIdx], ...destItem };
  } else {
    updatedList = [...list, destItem];
  }

  saveStoredDestinations(updatedList);

  if (newDest.content) {
    saveDestinationFullContent(cleanSlug, newDest.content);
  }

  return destItem;
}

export function deleteDestination(slug) {
  const list = getStoredDestinations();
  const updated = list.filter(d => d.slug !== slug);
  saveStoredDestinations(updated);
  try {
    localStorage.removeItem(CONTENT_STORAGE_PREFIX + slug);
  } catch (e) {}
  window.dispatchEvent(new Event(DESTINATIONS_EVENT));
  return true;
}

export function isDestinationPublished(slug) {
  const cleanSlug = (slug || '').toLowerCase().replace(/^\//, '');
  const list = getStoredDestinations();
  const found = list.find(d => d.slug === cleanSlug);
  return found ? Boolean(found.isPublished) : true;
}

export function getPublishedDestinations() {
  const list = getStoredDestinations();
  return list.filter(d => d.isPublished !== false);
}

/**
 * Returns full rich content for a destination (intro story, countries, tabs, highlights, parallax banner, FAQs)
 * Merges baseline static data with any admin overrides from localStorage.
 */
export function getDestinationFullContent(slug) {
  const cleanSlug = (slug || '').toLowerCase().replace(/^\//, '');
  const base = allDestinationsData[cleanSlug] || {
    name: cleanSlug.charAt(0).toUpperCase() + cleanSlug.slice(1).replace(/-/g, ' '),
    slug: cleanSlug,
    heroImage: '/assets/images/sean-robertson-5ftxFgXLtkI-unsplash-scaled.jpg',
    tagline: 'Untamed Wilderness & Curated Luxury',
    intro: {
      eyebrow: 'Where Every Horizon Tells a Story',
      title: `Luxury Escapes Across ${cleanSlug.charAt(0).toUpperCase() + cleanSlug.slice(1).replace(/-/g, ' ')}`,
      description: 'Experience unparalleled elegance, secluded retreats, and bespoke itineraries designed by private luxury travel specialists.',
      img1: '/assets/images/sutirta-budiman-kjOBqwMUnWw-unsplash-scaled.jpg',
      img2: '/assets/images/sean-robertson-5ftxFgXLtkI-unsplash-scaled.jpg'
    },
    tabs: {
      tab1: {
        label: 'Why Blackforest Holidays?',
        subtitle: 'Every Journey Feels Legendary',
        title: 'Where Wild Expeditions Meet Luxury Retreats',
        description: 'At Black Forest Holidays, we go beyond standard tourism. With bespoke planning, local concierge access, and vetted accommodations, every trip is seamless and unforgettable.',
        image: '/assets/images/hendrik-cornelissen-qs4E9t0hJc0-unsplash-scaled.jpg'
      },
      tab2: {
        label: 'Destinations',
        subtitle: 'Our Curated Footprint',
        title: 'Island Blues to Mountain Views',
        items: [],
        image: '/assets/images/ahmed-shabana-ADa9bb3tqR4-unsplash-scaled.jpg'
      },
      tab3: {
        label: 'Highlights',
        subtitle: 'Signature Experiences',
        title: 'Highlights',
        highlights: [
          '1. Private guided excursions with master naturalists',
          '2. Handpicked 5-star boutique lodgings and heritage stays',
          '3. Seamless VIP ground handling and private airport transfers',
          '4. Dedicated 24/7 travel concierge throughout your journey'
        ],
        image: '/assets/images/sergi-ferrete-YXwt-vJ3szA-unsplash-scaled.jpg'
      }
    },
    parallaxBanner: {
      eyebrow: 'Start a trip now',
      title: 'Discover the World Through a Lens of Luxury',
      subtitle: 'Everything you need for an extraordinary journey.',
      buttonText: 'CONTACT US',
      buttonLink: '/contact',
      bgImage: '/assets/images/4.png'
    },
    countries: [],
    faqs: []
  };

  try {
    const raw = localStorage.getItem(CONTENT_STORAGE_PREFIX + cleanSlug);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...base,
        ...parsed,
        intro: { ...base.intro, ...(parsed.intro || {}) },
        tabs: {
          tab1: { ...base.tabs?.tab1, ...(parsed.tabs?.tab1 || {}) },
          tab2: { ...base.tabs?.tab2, ...(parsed.tabs?.tab2 || {}) },
          tab3: { ...base.tabs?.tab3, ...(parsed.tabs?.tab3 || {}) }
        },
        parallaxBanner: { ...base.parallaxBanner, ...(parsed.parallaxBanner || {}) },
        countries: Array.isArray(parsed.countries) ? parsed.countries : base.countries || [],
        faqs: Array.isArray(parsed.faqs) ? parsed.faqs : base.faqs || []
      };
    }
  } catch (err) {
    console.error('Error reading destination content', err);
  }

  return base;
}

/**
 * Saves the rich content for a destination and updates countriesCount in the main destinations list.
 */
export function saveDestinationFullContent(slug, content) {
  const cleanSlug = (slug || '').toLowerCase().replace(/^\//, '');
  try {
    localStorage.setItem(CONTENT_STORAGE_PREFIX + cleanSlug, JSON.stringify(content));

    // Update countries count in main destinations list
    const list = getStoredDestinations();
    const count = Array.isArray(content.countries) ? content.countries.length : 0;
    const updated = list.map(d => {
      if (d.slug === cleanSlug) {
        return {
          ...d,
          name: content.name || d.name,
          tagline: content.tagline || d.tagline,
          heroImage: content.heroImage || d.heroImage,
          countriesCount: count
        };
      }
      return d;
    });
    saveStoredDestinations(updated);

    window.dispatchEvent(new Event(DESTINATIONS_EVENT));
  } catch (err) {
    console.error('Error saving destination content', err);
  }
}
