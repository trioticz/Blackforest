/**
 * Complete default page sections seed data for Black Forest Holidays CMS
 */

const defaultPageSections = [
  // ─────────────────────────────────────────────────────────────
  // 1. HOMEPAGE SECTIONS
  // ─────────────────────────────────────────────────────────────
  {
    page_slug: 'home',
    section_key: 'home.hero',
    section_name: 'Homepage Hero Video & Banner',
    order_index: 0,
    is_visible: true,
    content: {
      headline: 'Black Forest Holidays',
      subheadline: 'We are the artist of Travel',
      description: 'Curated luxury travel experiences and bespoke escapes across the world’s most breathtaking destinations.',
      primary_button_label: 'Explore Destinations',
      primary_button_url: '/destinations',
      secondary_button_label: 'Plan My Journey',
      secondary_button_url: '#enquiry',
      video_url: '/hero-video-1080p60.mp4',
      desktop_poster: '/hero-poster.webp',
      mobile_poster: '/hero-poster-mobile.webp',
      fallback_poster: '/hero-poster.jpg',
      show_sound_toggle: true
    }
  },
  {
    page_slug: 'home',
    section_key: 'home.intro',
    section_name: 'Homepage Introduction & Core Services Slider',
    order_index: 1,
    is_visible: true,
    content: {
      tagline: 'Curated Experiences',
      heading: 'What We Offer',
      subheading: 'Tailored services crafted for discerning travelers seeking unforgettable memories.',
      cards: [
        {
          id: 'visa',
          key: 'homepage.intro.card_1',
          title: 'Visa &\nAir Tickets',
          description: 'Hassle-free visa processing and international flight bookings for a smooth, seamless journey.',
          image: '/2nd1.webp',
          link: '/concierge'
        },
        {
          id: 'corporate',
          key: 'homepage.intro.card_2',
          title: 'Corporate &\nGroup Packages',
          description: 'Effortless journeys for corporate teams, MICE groups, and private gatherings.',
          image: '/2nd2.webp',
          link: '/corporate-travel'
        },
        {
          id: 'luxury',
          key: 'homepage.intro.card_3',
          title: 'Luxury\nHolidays',
          description: 'Curated luxury experiences and bespoke escapes, personalised to every single detail.',
          image: '/2nd3.webp',
          link: '/international-tours'
        },
        {
          id: 'honeymoon',
          key: 'homepage.intro.card_4',
          title: 'Honeymoon\nPackages',
          description: 'Romantic journeys and intimate getaways designed around your most unforgettable moments.',
          image: '/2nd4.webp',
          link: '/honeymoon-escapes'
        },
        {
          id: 'inbound',
          key: 'homepage.intro.card_5',
          title: 'Inbound &\nOutbound Travels',
          description: 'Curated international journeys from India and exceptional inbound travel experiences across India.',
          image: '/2nd5.webp',
          link: '/india-tours'
        },
        {
          id: 'cruise',
          key: 'homepage.intro.card_6',
          title: 'Cruise &\nGroup Trip',
          description: "Explore the world's most beautiful oceans and destinations with luxury cruises and guided group trips.",
          image: '/2nd6.webp',
          link: '/cruises'
        }
      ]
    }
  },
  {
    page_slug: 'home',
    section_key: 'home.about_memories',
    section_name: 'Homepage About & Memories Showcase',
    order_index: 2,
    is_visible: true,
    content: {
      badge: 'Why Choose Us',
      heading: 'Let us plan your journey,\nYou create the memories.',
      paragraph_1: 'Welcome to BLACK FOREST HOLIDAYS, your trusted partner in creating unforgettable travel experiences. We believe that every journey should be more than just a trip—it should be a collection of wonderful memories, new discoveries, and meaningful experiences.',
      paragraph_2: 'With our expertise in travel planning, we help individuals, families, couples, and groups plan their perfect getaway. From flights and hotels to customized holiday packages, sightseeing, transportation, and travel assistance, we take care of the details so you can enjoy your journey with confidence.',
      button_label: 'Discover Our Story',
      button_url: '/about',
      map_image: '/map-intro.webp'
    }
  },
  {
    page_slug: 'home',
    section_key: 'home.adventure',
    section_name: 'Homepage Adventure & Nature Section',
    order_index: 3,
    is_visible: true,
    content: {
      badge: 'Uncharted Escapes',
      heading: 'Adventure & Nature Holidays',
      subheading: 'Immerse yourself in lush landscapes, wildlife sanctuaries, and mountain trails.',
      button_label: 'Explore Adventure Tours',
      button_url: '/adventure-nature'
    }
  },
  {
    page_slug: 'home',
    section_key: 'home.islands',
    section_name: 'Homepage Island Holidays Section',
    order_index: 4,
    is_visible: true,
    content: {
      badge: 'Tropical Paradise',
      heading: 'Exquisite Island Holidays',
      subheading: 'Unwind on turquoise shores, private overwater villas, and tropical sunsets.',
      button_label: 'Discover Island Holidays',
      button_url: '/island-holidays'
    }
  },
  {
    page_slug: 'home',
    section_key: 'home.international_tours',
    section_name: 'Homepage Popular International Tours',
    order_index: 5,
    is_visible: true,
    content: {
      badge: 'Global Horizons',
      heading: 'Popular International Packages',
      subheading: 'Curated luxury journeys across Europe, Asia, Africa, and the Americas.',
      button_label: 'View All International Tours',
      button_url: '/international-tours'
    }
  },
  {
    page_slug: 'home',
    section_key: 'home.india_tours',
    section_name: 'Homepage India Tours Section',
    order_index: 6,
    is_visible: true,
    content: {
      badge: 'Incredible India',
      heading: 'Discover Royal & Scenic India',
      subheading: 'From royal heritage palaces in Rajasthan to the serene backwaters of Kerala.',
      button_label: 'Explore India Packages',
      button_url: '/india-tours'
    }
  },
  {
    page_slug: 'home',
    section_key: 'home.value_props',
    section_name: 'Homepage Value Propositions & Why Choose Us',
    order_index: 7,
    is_visible: true,
    content: {
      heading: 'Why Travel With Black Forest',
      subheading: 'Six reasons why our guests entrust their journeys to our care',
      items: [
        {
          id: 1,
          title: 'Tailor-Made Journeys',
          desc: 'Travel experiences thoughtfully designed around your interests, style, and dreams.'
        },
        {
          id: 2,
          title: 'Exceptional Experiences',
          desc: 'Discover extraordinary places and unforgettable moments, curated just for you.'
        },
        {
          id: 3,
          title: 'Expert Travel Design',
          desc: 'Our experienced travel specialists bring knowledge, care, and attention to every journey.'
        },
        {
          id: 4,
          title: 'Journeys For Every Story',
          desc: 'From romantic escapes to family adventures, we create travel experiences that feel truly personal.'
        },
        {
          id: 5,
          title: 'Personalised Itineraries',
          desc: 'Every detail is thoughtfully planned around the way you want to explore the world.'
        },
        {
          id: 6,
          title: 'Seamless Travel Support',
          desc: "From your first enquiry to your return home, we're here to make your journey effortless."
        }
      ]
    }
  },
  {
    page_slug: 'home',
    section_key: 'home.stats',
    section_name: 'Homepage Statistics & Counter',
    order_index: 8,
    is_visible: true,
    content: {
      heading: 'Our Journey in Numbers',
      subheading: 'Milestones of trust, happiness, and unforgettable destinations',
      stats: [
        { value: 50, suffix: '+', label: 'Island Destinations Explored' },
        { value: 25, suffix: '+', label: 'Countries Covered Worldwide' },
        { value: 150, suffix: '+', label: 'Tailor-Made Itineraries Curated' },
        { value: 100, suffix: '%', label: 'Guest Satisfaction Rate' }
      ]
    }
  },
  {
    page_slug: 'home',
    section_key: 'home.testimonials',
    section_name: 'Homepage Testimonials Slider',
    order_index: 9,
    is_visible: true,
    content: {
      heading: 'Words From Our Travelers',
      subheading: 'Real stories from people whose dream journeys came to life with Black Forest.'
    }
  },
  {
    page_slug: 'home',
    section_key: 'home.journal',
    section_name: 'Homepage Journal & Travel Stories',
    order_index: 10,
    is_visible: true,
    content: {
      heading: 'From Our Travel Journal',
      subheading: 'Inspiration, travel guides, tips, and hidden gems from our specialists',
      button_label: 'Read All Articles',
      button_url: '/journal'
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 2. GLOBAL SECTIONS
  // ─────────────────────────────────────────────────────────────
  {
    page_slug: 'global',
    section_key: 'global.header',
    section_name: 'Global Header & Navigation Bar',
    order_index: 0,
    is_visible: true,
    content: {
      announcement_text: 'Plan your 2026 holiday escape with Black Forest Holidays — Personalized travel experiences',
      announcement_active: true,
      phone: '+91 90432 02008',
      phone_label: 'Call Us',
      cta_label: 'Plan My Trip',
      cta_url: '#enquiry'
    }
  },
  {
    page_slug: 'global',
    section_key: 'global.footer',
    section_name: 'Global Website Footer & Branches',
    order_index: 1,
    is_visible: true,
    content: {
      column_1_title: 'Reach Us',
      address_bangalore: '737, 3rd Floor, Kheny Plaza CMH Main Road, 2nd Cross Rd, Binnamangala, Indiranagar, Bengaluru, Karnataka 560038',
      column_2_title: 'Head Office',
      address_coimbatore: '76, 1st floor, 8th Street, Crosscut Road, Gandhipuram, Coimbatore – 641012',
      phone_numbers: '+91 90432 02008 / +91 90432 02009',
      emails: 'info@blackforestholidays.com / booking@blackforestholidays.com',
      copyright: '© 2026 Black Forest Holidays Pvt. Ltd. All rights reserved.',
      social_links: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com'
      }
    }
  },
  {
    page_slug: 'global',
    section_key: 'global.faq',
    section_name: 'Global Frequently Asked Questions',
    order_index: 2,
    is_visible: true,
    content: {
      heading: 'Frequently Asked Questions',
      subheading: 'Everything you need to know about planning your dream journey with Black Forest Holidays',
      faqs: [
        {
          question: 'How do I book a tailor-made holiday with Black Forest?',
          answer: 'Simply send us an enquiry or call our travel specialists. We will discuss your preferences, travel dates, and budget, then craft a completely customized itinerary tailored to your rhythm.'
        },
        {
          question: 'Do you handle visa processing and international flights?',
          answer: 'Yes, our dedicated concierge team manages end-to-end travel logistics including visa documentation, premium flight bookings, travel insurance, and private ground transfers.'
        },
        {
          question: 'Can I customize an existing package on your website?',
          answer: 'Absolutely! Every tour package featured on our website can be customized. You can change hotels, add extra nights, include private excursions, or modify the travel pace.'
        },
        {
          question: 'What is your cancellation and refund policy?',
          answer: 'We provide transparent and flexible booking terms. Exact cancellation conditions depend on airline rules and luxury hotel partner policies, which are shared upfront before confirmation.'
        },
        {
          question: 'Do you cater to corporate and MICE travel groups?',
          answer: 'Yes, our corporate travel division specializes in corporate offsites, annual retreats, executive conferences, and international incentive trips with full event coordination.'
        }
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 3. ABOUT PAGE SECTIONS
  // ─────────────────────────────────────────────────────────────
  {
    page_slug: 'about',
    section_key: 'about.hero',
    section_name: 'About Page Hero Banner',
    order_index: 0,
    is_visible: true,
    content: {
      headline: 'We are the Artists of Travel',
      subheadline: 'Crafting thoughtful, immersive, and unforgettable journeys across the globe since 2018.',
      bg_image: '/assets/images/about-hero-bg.jpg'
    }
  },
  {
    page_slug: 'about',
    section_key: 'about.story',
    section_name: 'About Page Brand Story & Philosophy',
    order_index: 1,
    is_visible: true,
    content: {
      badge: 'Our Philosophy',
      heading: 'Passion for Exploration, Precision in Planning',
      paragraph_1: 'Founded with a vision to redefine experiential travel, Black Forest Holidays brings together deep destination expertise, personalized attention, and a passion for luxury journeys.',
      paragraph_2: 'We believe travel is not about checking destinations off a list; it is about experiencing the world in a way that resonates with who you are. From intimate private retreats to grand family explorations, we design every detail with care.',
      paragraph_3: 'Our travel curators work closely with luxury hotels, private guides, and trusted local partners worldwide to ensure every step of your journey is effortless and enriching.'
    }
  },
  {
    page_slug: 'about',
    section_key: 'about.values',
    section_name: 'About Page Values & Pillars',
    order_index: 2,
    is_visible: true,
    content: {
      heading: 'The Pillars of Our Craft',
      subheading: 'How we ensure every journey exceeds your highest expectations',
      pillars: [
        {
          title: 'Deep Destination Knowledge',
          desc: 'Our specialists have personally visited the destinations, curated the villas, and vetted every local partner.'
        },
        {
          title: 'Uncompromised Personalization',
          desc: 'No two itineraries are identical. Every plan is handcrafted around your interests, pace, and preferences.'
        },
        {
          title: '24/7 Dedicated Care',
          desc: 'From departure to return, your private travel manager is always a single message or call away.'
        }
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 4. CONTACT PAGE SECTIONS
  // ─────────────────────────────────────────────────────────────
  {
    page_slug: 'contact',
    section_key: 'contact.hero',
    section_name: 'Contact Page Hero & Introduction',
    order_index: 0,
    is_visible: true,
    content: {
      headline: 'Get in Touch With Our Specialists',
      subheadline: 'Whether you have a specific destination in mind or need inspiration, we are here to help.',
      office_hours: 'Monday – Saturday: 9:30 AM – 7:00 PM (IST)'
    }
  },
  {
    page_slug: 'contact',
    section_key: 'contact.offices',
    section_name: 'Contact Page Office Locations',
    order_index: 1,
    is_visible: true,
    content: {
      bengaluru_title: 'Bengaluru Office',
      bengaluru_address: '737, 3rd Floor, Kheny Plaza CMH Main Road, 2nd Cross Rd, Indiranagar, Bengaluru 560038',
      bengaluru_phone: '+91 90432 02008',
      bengaluru_email: 'info@blackforestholidays.com',
      coimbatore_title: 'Coimbatore Head Office',
      coimbatore_address: '76, 1st Floor, 8th Street, Crosscut Road, Gandhipuram, Coimbatore 641012',
      coimbatore_phone: '+91 90432 02009',
      coimbatore_email: 'booking@blackforestholidays.com'
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 5. CORPORATE TRAVEL SECTIONS
  // ─────────────────────────────────────────────────────────────
  {
    page_slug: 'corporate',
    section_key: 'corporate.hero',
    section_name: 'Corporate Travel Hero & Overview',
    order_index: 0,
    is_visible: true,
    content: {
      headline: 'Corporate Travel & MICE Solutions',
      subheadline: 'World-class corporate travel management, incentive tours, conferences, and executive retreats.',
      primary_cta_label: 'Request Corporate Proposal',
      primary_cta_url: '#enquiry'
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 6. CRUISES SECTIONS
  // ─────────────────────────────────────────────────────────────
  {
    page_slug: 'cruises',
    section_key: 'cruises.hero',
    section_name: 'Cruises Page Hero & Ocean Voyages',
    order_index: 0,
    is_visible: true,
    content: {
      headline: 'Luxury Ocean & River Cruises',
      subheadline: 'Sail the world’s most magnificent waterways aboard world-class luxury cruise liners.',
      primary_cta_label: 'Explore Cruise Packages',
      primary_cta_url: '#cruise-packages'
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 7. CONCIERGE SECTIONS
  // ─────────────────────────────────────────────────────────────
  {
    page_slug: 'concierge',
    section_key: 'concierge.hero',
    section_name: 'Concierge Services Hero',
    order_index: 0,
    is_visible: true,
    content: {
      headline: 'Bespoke Travel Concierge',
      subheadline: 'Visa assistance, private jet charter, flight ticketing, and tailored luxury ground handling.',
      primary_cta_label: 'Connect With Concierge',
      primary_cta_url: '#enquiry'
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 8. COACH TOUR SECTIONS
  // ─────────────────────────────────────────────────────────────
  {
    page_slug: 'coach_tour',
    section_key: 'coach_tour.hero',
    section_name: 'Coach Tours Hero & Itineraries',
    order_index: 0,
    is_visible: true,
    content: {
      headline: 'Scenic Guided Coach Tours',
      badge: 'Escorted Group Journeys',
      subheadline: 'Travel in luxury and comfort across the world’s most picturesque panoramic routes.',
      primary_cta_label: 'View Coach Itineraries',
      primary_cta_url: '#coach-itineraries'
    }
  },

  // ── TOURS CATALOG ──
  {
    page_slug: 'tours',
    section_key: 'tours.hero',
    section_name: 'Tours Catalog Header Banner',
    order_index: 0,
    is_visible: true,
    content: {
      headline: 'Tour Packages',
      badge: 'Curated Journeys',
      subheadline: 'Handcrafted luxury tours across Europe, Africa, America, Far East Asia, Australia, and Indian Ocean atolls.'
    }
  },

  // ── DESTINATIONS ──
  {
    page_slug: 'destinations',
    section_key: 'destinations.hero',
    section_name: 'Destinations Catalog Header Banner',
    order_index: 0,
    is_visible: true,
    content: {
      headline: 'Explore Extraordinary Destinations',
      badge: 'Curated Destinations Worldwide',
      subheadline: 'Immerse yourself in authentic cultural journeys, pristine landscapes, and unforgettable horizons across all 7 continents.'
    }
  },

  // ── JOURNAL / BLOG ──
  {
    page_slug: 'journal',
    section_key: 'journal.hero',
    section_name: 'Journal & Travel Blog Header Banner',
    order_index: 0,
    is_visible: true,
    content: {
      headline: 'Travel Dispatches & Stories',
      badge: 'The Blackforest Journal',
      subheadline: 'Tales from mountain trails, cultural encounters, packing guides, and insider secrets from travel experts.'
    }
  }
];

const seedPageSections = async () => {
  try {
    const { PageSection } = require('../models');
    let created = 0;
    for (const item of defaultPageSections) {
      const existing = await PageSection.findOne({ where: { section_key: item.section_key } });
      if (!existing) {
        await PageSection.create({
          page_slug: item.page_slug,
          section_key: item.section_key,
          section_name: item.section_name,
          order_index: item.order_index,
          is_visible: item.is_visible,
          content: item.content,
          original_content: item.content,
          draft_content: null,
          publication_status: 'published',
          updated_by: 'System Seed'
        });
        created += 1;
      }
    }
    console.log(`✅ PageSections seeded/verified successfully (${defaultPageSections.length} sections, ${created} created)`);
  } catch (error) {
    console.error('❌ Failed to seed PageSections:', error.message);
  }
};

module.exports = {
  defaultPageSections,
  seedPageSections
};
