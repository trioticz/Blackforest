const { WebsiteImage } = require('../models');

const defaultWebsiteImages = [
  // ── 1. HOMEPAGE ──
  {
    image_key: 'homepage.hero.desktop',
    image_name: 'Homepage Hero Banner (Desktop Poster)',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'Hero Section',
    image_url: '/hero-poster.webp',
    original_image_url: '/hero-poster.webp',
    alt_text: 'Black Forest Luxury Travel Hero Banner',
    dimensions: '1920x1080',
    aspect_ratio: '16:9',
    publication_status: 'published'
  },
  {
    image_key: 'homepage.hero.mobile',
    image_name: 'Homepage Hero Banner (Mobile Poster)',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'Hero Section',
    image_url: '/hero-poster-mobile.webp',
    original_image_url: '/hero-poster-mobile.webp',
    alt_text: 'Black Forest Luxury Travel Mobile Poster',
    dimensions: '768x1024',
    aspect_ratio: '3:4',
    publication_status: 'published'
  },
  {
    image_key: 'homepage.hero.fallback',
    image_name: 'Homepage Hero Fallback Image',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'Hero Section',
    image_url: '/hero-poster.jpg',
    original_image_url: '/hero-poster.jpg',
    alt_text: 'Black Forest Holidays Luxury Travel',
    dimensions: '1536x1024',
    aspect_ratio: '3:2',
    publication_status: 'published'
  },
  {
    image_key: 'homepage.intro.card_1',
    image_name: 'Visa & Air Tickets Card',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'Introduction Cards',
    image_url: '/2nd1.webp',
    original_image_url: '/2nd1.webp',
    alt_text: 'Visa and Air Tickets Booking Services',
    dimensions: '600x800',
    aspect_ratio: '3:4',
    publication_status: 'published'
  },
  {
    image_key: 'homepage.intro.card_2',
    image_name: 'Corporate & Group Packages Card',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'Introduction Cards',
    image_url: '/2nd2.webp',
    original_image_url: '/2nd2.webp',
    alt_text: 'Corporate and Group Travel Packages',
    dimensions: '600x800',
    aspect_ratio: '3:4',
    publication_status: 'published'
  },
  {
    image_key: 'homepage.intro.card_3',
    image_name: 'Luxury Holidays Card',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'Introduction Cards',
    image_url: '/2nd3.webp',
    original_image_url: '/2nd3.webp',
    alt_text: 'Curated Luxury Holidays and Escapes',
    dimensions: '600x800',
    aspect_ratio: '3:4',
    publication_status: 'published'
  },
  {
    image_key: 'homepage.intro.card_4',
    image_name: 'Honeymoon Packages Card',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'Introduction Cards',
    image_url: '/2nd4.webp',
    original_image_url: '/2nd4.webp',
    alt_text: 'Romantic Honeymoon Packages',
    dimensions: '600x800',
    aspect_ratio: '3:4',
    publication_status: 'published'
  },
  {
    image_key: 'homepage.intro.card_5',
    image_name: 'Inbound & Outbound Travels Card',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'Introduction Cards',
    image_url: '/2nd5.webp',
    original_image_url: '/2nd5.webp',
    alt_text: 'Inbound and Outbound Travels',
    dimensions: '600x800',
    aspect_ratio: '3:4',
    publication_status: 'published'
  },
  {
    image_key: 'homepage.intro.card_6',
    image_name: 'Cruise & Group Trip Card',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'Introduction Cards',
    image_url: '/2nd6.webp',
    original_image_url: '/2nd6.webp',
    alt_text: 'Luxury Cruise and Guided Group Trips',
    dimensions: '600x800',
    aspect_ratio: '3:4',
    publication_status: 'published'
  },
  {
    image_key: 'homepage.about_memories.map',
    image_name: 'About Memories Travel Gear & Map',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'About Memories',
    image_url: '/map-intro.webp',
    original_image_url: '/map-intro.webp',
    alt_text: 'Let us plan your journey - Travel Map and Accessories',
    dimensions: '600x480',
    aspect_ratio: '5:4',
    publication_status: 'published'
  },
  {
    image_key: 'homepage.about_memories.bg_pattern',
    image_name: 'About Memories Mountain Background',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'About Memories',
    image_url: '/assets/images/home-intro-bg_d266ed.jpg',
    original_image_url: '/assets/images/home-intro-bg_d266ed.jpg',
    alt_text: 'Mountain Silhouette Background Pattern',
    dimensions: '1920x600',
    aspect_ratio: '16:5',
    publication_status: 'published'
  },
  {
    image_key: 'homepage.about_memories.mask_pine',
    image_name: 'About Memories Pine Tree Mask',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'About Memories',
    image_url: '/assets/images/mask-pine.jpg',
    original_image_url: '/assets/images/mask-pine.jpg',
    alt_text: 'Pine Forest Silhouette Cutout',
    dimensions: '560x480',
    aspect_ratio: '7:6',
    publication_status: 'published'
  },
  {
    image_key: 'homepage.value_props.bg',
    image_name: 'Value Propositions Background Image',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'Value Propositions',
    image_url: '/assets/images/value-props-bg.jpg',
    original_image_url: '/assets/images/value-props-bg.jpg',
    alt_text: 'Scenic Mountain Valley Landscape',
    dimensions: '1920x800',
    aspect_ratio: '12:5',
    publication_status: 'published'
  },
  {
    image_key: 'homepage.value_props.icon_1',
    image_name: 'Tailor-Made Journeys Icon',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'Value Propositions',
    image_url: '/assets/images/icon-img-1.png',
    original_image_url: '/assets/images/icon-img-1.png',
    alt_text: 'Tailor-Made Journeys Compass Icon',
    dimensions: '80x80',
    aspect_ratio: '1:1',
    publication_status: 'published'
  },
  {
    image_key: 'homepage.value_props.icon_2',
    image_name: 'Exceptional Experiences Icon',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'Value Propositions',
    image_url: '/assets/images/icon-img-2.png',
    original_image_url: '/assets/images/icon-img-2.png',
    alt_text: 'Exceptional Experiences Mountain Icon',
    dimensions: '80x80',
    aspect_ratio: '1:1',
    publication_status: 'published'
  },
  {
    image_key: 'homepage.value_props.icon_3',
    image_name: 'Expert Travel Design Icon',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'Value Propositions',
    image_url: '/assets/images/icon-img-3.png',
    original_image_url: '/assets/images/icon-img-3.png',
    alt_text: 'Expert Travel Design Luggage Icon',
    dimensions: '80x80',
    aspect_ratio: '1:1',
    publication_status: 'published'
  },
  {
    image_key: 'homepage.value_props.icon_4',
    image_name: 'Journeys For Every Story Icon',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'Value Propositions',
    image_url: '/assets/images/icon-img-4.png',
    original_image_url: '/assets/images/icon-img-4.png',
    alt_text: 'Journeys For Every Story Tent Icon',
    dimensions: '80x80',
    aspect_ratio: '1:1',
    publication_status: 'published'
  },
  {
    image_key: 'homepage.value_props.icon_5',
    image_name: 'Personalised Itineraries Icon',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'Value Propositions',
    image_url: '/assets/images/icon-img-5.png',
    original_image_url: '/assets/images/icon-img-5.png',
    alt_text: 'Personalised Itineraries Map Icon',
    dimensions: '80x80',
    aspect_ratio: '1:1',
    publication_status: 'published'
  },
  {
    image_key: 'homepage.value_props.icon_6',
    image_name: 'Seamless Travel Support Icon',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'Value Propositions',
    image_url: '/assets/images/icon-img-6.png',
    original_image_url: '/assets/images/icon-img-6.png',
    alt_text: 'Seamless Travel Support Headset Icon',
    dimensions: '80x80',
    aspect_ratio: '1:1',
    publication_status: 'published'
  },
  {
    image_key: 'homepage.stats.bg',
    image_name: 'Statistics Mountain Background',
    category: 'Homepage',
    page_name: 'Home',
    section_name: 'Stats Section',
    image_url: '/assets/images/number-counter-bg.png',
    original_image_url: '/assets/images/number-counter-bg.png',
    alt_text: 'Mountain Silhouette Graphic',
    dimensions: '1920x400',
    aspect_ratio: '24:5',
    publication_status: 'published'
  },

  // ── 2. HEADER & NAVIGATION ──
  {
    image_key: 'header.brand_logo',
    image_name: 'Header Main Brand Logo (White)',
    category: 'Header & Navigation',
    page_name: 'Global Header',
    section_name: 'Navigation Bar',
    image_url: '/assets/site/white_logo.png',
    original_image_url: '/assets/site/white_logo.png',
    alt_text: 'Blackforest Holidays Brand Logo',
    dimensions: '180x48',
    aspect_ratio: '15:4',
    publication_status: 'published'
  },
  {
    image_key: 'header.mobile_logo',
    image_name: 'Header Mobile Drawer Brand Logo',
    category: 'Header & Navigation',
    page_name: 'Global Header',
    section_name: 'Mobile Drawer',
    image_url: '/assets/site/white_logo.png',
    original_image_url: '/assets/site/white_logo.png',
    alt_text: 'Blackforest Holidays Mobile Logo',
    dimensions: '180x48',
    aspect_ratio: '15:4',
    publication_status: 'published'
  },

  // ── 3. HERO BANNERS & SLIDERS ──
  {
    image_key: 'hero.about',
    image_name: 'About Page Hero Banner',
    category: 'Hero Banners & Sliders',
    page_name: 'About Us',
    section_name: 'Page Hero Banner',
    image_url: '/assets/images/about_hero_map.jpg',
    original_image_url: '/assets/images/about_hero_map.jpg',
    alt_text: 'About Blackforest Holidays - Antique Map & Currency',
    dimensions: '1920x600',
    aspect_ratio: '16:5',
    publication_status: 'published'
  },
  {
    image_key: 'hero.contact',
    image_name: 'Contact Page Hero Banner',
    category: 'Hero Banners & Sliders',
    page_name: 'Contact Us',
    section_name: 'Page Hero Banner',
    image_url: '/assets/images/buddhist-prayer-flags-himalaya-mountains-annapurna-base-camp-area-nepal-scaled.jpg',
    original_image_url: '/assets/images/buddhist-prayer-flags-himalaya-mountains-annapurna-base-camp-area-nepal-scaled.jpg',
    alt_text: 'Contact Us - Himalayan Mountain Prayer Flags',
    dimensions: '1920x600',
    aspect_ratio: '16:5',
    publication_status: 'published'
  },
  {
    image_key: 'hero.cruises',
    image_name: 'Cruises Page Hero Banner',
    category: 'Hero Banners & Sliders',
    page_name: 'Cruises',
    section_name: 'Page Hero Banner',
    image_url: '/assets/images/pexels-g-isle-px-210751289-11820070-scaled.jpg',
    original_image_url: '/assets/images/pexels-g-isle-px-210751289-11820070-scaled.jpg',
    alt_text: 'Luxury Ocean Cruises Banner',
    dimensions: '1920x600',
    aspect_ratio: '16:5',
    publication_status: 'published'
  },
  {
    image_key: 'hero.corporate',
    image_name: 'Corporate Travel Hero Banner',
    category: 'Hero Banners & Sliders',
    page_name: 'Corporate Travel',
    section_name: 'Page Hero Banner',
    image_url: '/assets/images/how-corporate-travel-can-sail-through-uncertain-times-1920x1274-1.jpg',
    original_image_url: '/assets/images/how-corporate-travel-can-sail-through-uncertain-times-1920x1274-1.jpg',
    alt_text: 'Corporate & Executive Travel Services',
    dimensions: '1920x600',
    aspect_ratio: '16:5',
    publication_status: 'published'
  },
  {
    image_key: 'hero.experiences',
    image_name: 'Experiences Page Hero Banner',
    category: 'Hero Banners & Sliders',
    page_name: 'Experiences',
    section_name: 'Page Hero Banner',
    image_url: '/assets/images/dino-reichmuth-A5rCN8626Ck-unsplash-scaled.jpg',
    original_image_url: '/assets/images/dino-reichmuth-A5rCN8626Ck-unsplash-scaled.jpg',
    alt_text: 'Bespoke Travel Experiences Banner',
    dimensions: '1920x600',
    aspect_ratio: '16:5',
    publication_status: 'published'
  },
  {
    image_key: 'hero.destinations',
    image_name: 'Destinations Overview Hero Banner',
    category: 'Hero Banners & Sliders',
    page_name: 'Destinations',
    section_name: 'Page Hero Banner',
    image_url: '/assets/images/sean-robertson-5ftxFgXLtkI-unsplash-scaled.jpg',
    original_image_url: '/assets/images/sean-robertson-5ftxFgXLtkI-unsplash-scaled.jpg',
    alt_text: 'Explore World Destinations Banner',
    dimensions: '1920x600',
    aspect_ratio: '16:5',
    publication_status: 'published'
  },

  // ── 4. PROMOTIONAL BANNERS ──
  {
    image_key: 'promo.adventure_banner',
    image_name: 'Adventure & Nature Promo Banner',
    category: 'Promotional Banners',
    page_name: 'Experiences',
    section_name: 'Promotional Banners',
    image_url: '/assets/images/hero-home.jpg',
    original_image_url: '/assets/images/hero-home.jpg',
    alt_text: 'Adventure and Wilderness Travel Experiences',
    dimensions: '1920x700',
    aspect_ratio: '16:6',
    publication_status: 'published'
  },
  {
    image_key: 'promo.honeymoon_banner',
    image_name: 'Romantic Honeymoon Escapes Banner',
    category: 'Promotional Banners',
    page_name: 'Experiences',
    section_name: 'Promotional Banners',
    image_url: '/assets/images/destination-bg-1.jpg',
    original_image_url: '/assets/images/destination-bg-1.jpg',
    alt_text: 'Romantic Honeymoon Getaway Experiences',
    dimensions: '1920x700',
    aspect_ratio: '16:6',
    publication_status: 'published'
  },

  // ── 5. PRODUCT IMAGES ──
  {
    image_key: 'tours.international.switzerland',
    image_name: 'Switzerland Scenic Alps Tour Card',
    category: 'Product Images',
    page_name: 'Tours',
    section_name: 'International Tours',
    image_url: '/assets/images/switzerland.jpg',
    original_image_url: '/assets/images/switzerland.jpg',
    alt_text: 'Scenic Swiss Alps Tour Package',
    dimensions: '800x600',
    aspect_ratio: '4:3',
    publication_status: 'published'
  },
  {
    image_key: 'tours.international.paris',
    image_name: 'Paris Romantic Getaway Tour Card',
    category: 'Product Images',
    page_name: 'Tours',
    section_name: 'International Tours',
    image_url: '/assets/images/paris.jpg',
    original_image_url: '/assets/images/paris.jpg',
    alt_text: 'Romantic Paris City Tour Package',
    dimensions: '800x600',
    aspect_ratio: '4:3',
    publication_status: 'published'
  },
  {
    image_key: 'tours.india.kashmir',
    image_name: 'Kashmir Paradise Tour Card',
    category: 'Product Images',
    page_name: 'Tours',
    section_name: 'India Tours',
    image_url: '/assets/images/kashmir.jpg',
    original_image_url: '/assets/images/kashmir.jpg',
    alt_text: 'Kashmir Valley Paradise Tour Package',
    dimensions: '800x600',
    aspect_ratio: '4:3',
    publication_status: 'published'
  },
  {
    image_key: 'tours.india.kerala',
    image_name: 'Kerala Backwaters Tour Card',
    category: 'Product Images',
    page_name: 'Tours',
    section_name: 'India Tours',
    image_url: '/assets/images/kerala.jpg',
    original_image_url: '/assets/images/kerala.jpg',
    alt_text: 'Kerala Backwaters Houseboat Tour Package',
    dimensions: '800x600',
    aspect_ratio: '4:3',
    publication_status: 'published'
  },

  // ── 6. CATEGORY IMAGES ──
  {
    image_key: 'category.asia',
    image_name: 'Asian Countries Category Thumbnail',
    category: 'Category Images',
    page_name: 'Destinations',
    section_name: 'Destination Categories',
    image_url: '/assets/images/singapore.jpg',
    original_image_url: '/assets/images/singapore.jpg',
    alt_text: 'Explore Asian Countries & Cultures',
    dimensions: '800x600',
    aspect_ratio: '4:3',
    publication_status: 'published'
  },
  {
    image_key: 'category.europe',
    image_name: 'Europe Category Thumbnail',
    category: 'Category Images',
    page_name: 'Destinations',
    section_name: 'Destination Categories',
    image_url: '/assets/images/europe.jpg',
    original_image_url: '/assets/images/europe.jpg',
    alt_text: 'Explore Europe Historic Cities & Alps',
    dimensions: '800x600',
    aspect_ratio: '4:3',
    publication_status: 'published'
  },
  {
    image_key: 'category.africa',
    image_name: 'Africa Wildlife Category Thumbnail',
    category: 'Category Images',
    page_name: 'Destinations',
    section_name: 'Destination Categories',
    image_url: '/assets/images/africa.jpg',
    original_image_url: '/assets/images/africa.jpg',
    alt_text: 'Explore African Safaris & Wilderness',
    dimensions: '800x600',
    aspect_ratio: '4:3',
    publication_status: 'published'
  },
  {
    image_key: 'category.america',
    image_name: 'America Category Thumbnail',
    category: 'Category Images',
    page_name: 'Destinations',
    section_name: 'Destination Categories',
    image_url: '/assets/images/america.jpg',
    original_image_url: '/assets/images/america.jpg',
    alt_text: 'Explore the Americas & Iconic Landscapes',
    dimensions: '800x600',
    aspect_ratio: '4:3',
    publication_status: 'published'
  },

  // ── 7. COLLECTION SECTIONS ──
  {
    image_key: 'collection.luxury',
    image_name: 'Luxury Escapes Collection Feature',
    category: 'Collection Sections',
    page_name: 'Home',
    section_name: 'Curated Collections',
    image_url: '/2nd3.webp',
    original_image_url: '/2nd3.webp',
    alt_text: 'Luxury Escapes Curated Collection',
    dimensions: '600x800',
    aspect_ratio: '3:4',
    publication_status: 'published'
  },
  {
    image_key: 'collection.family',
    image_name: 'Family Vacations Collection Feature',
    category: 'Collection Sections',
    page_name: 'Home',
    section_name: 'Curated Collections',
    image_url: '/2nd2.webp',
    original_image_url: '/2nd2.webp',
    alt_text: 'Family Vacation Curated Collection',
    dimensions: '600x800',
    aspect_ratio: '3:4',
    publication_status: 'published'
  },
  {
    image_key: 'collection.honeymoon',
    image_name: 'Honeymoon Escapes Collection Feature',
    category: 'Collection Sections',
    page_name: 'Home',
    section_name: 'Curated Collections',
    image_url: '/2nd4.webp',
    original_image_url: '/2nd4.webp',
    alt_text: 'Honeymoon Romantic Escapes Collection',
    dimensions: '600x800',
    aspect_ratio: '3:4',
    publication_status: 'published'
  },

  // ── 8. ABOUT US ──
  {
    image_key: 'about.story.image',
    image_name: 'About Us Story Main Photo',
    category: 'About Us',
    page_name: 'About Us',
    section_name: 'Our Story Section',
    image_url: '/assets/images/ABOUT-US.png',
    original_image_url: '/assets/images/ABOUT-US.png',
    alt_text: 'Our Story - Black Forest Holidays Journey',
    dimensions: '800x600',
    aspect_ratio: '4:3',
    publication_status: 'published'
  },
  {
    image_key: 'about.philosophy.image_1',
    image_name: 'About Philosophy Travel Image 1',
    category: 'About Us',
    page_name: 'About Us',
    section_name: 'Philosophy Section',
    image_url: '/assets/images/about-img-3.png',
    original_image_url: '/assets/images/about-img-3.png',
    alt_text: 'Travel Philosophy - Creating Memories',
    dimensions: '600x400',
    aspect_ratio: '3:2',
    publication_status: 'published'
  },
  {
    image_key: 'about.philosophy.image_2',
    image_name: 'About Philosophy Travel Image 2',
    category: 'About Us',
    page_name: 'About Us',
    section_name: 'Philosophy Section',
    image_url: '/assets/images/Untitled-design.png',
    original_image_url: '/assets/images/Untitled-design.png',
    alt_text: 'Travel Philosophy - World Destinations',
    dimensions: '600x400',
    aspect_ratio: '3:2',
    publication_status: 'published'
  },
  {
    image_key: 'about.expertise.feature',
    image_name: 'About Us Expertise Feature Badge',
    category: 'About Us',
    page_name: 'About Us',
    section_name: 'Expertise Highlight',
    image_url: '/assets/images/Blackforest-about-1.png',
    original_image_url: '/assets/images/Blackforest-about-1.png',
    alt_text: 'Expertise Behind Every Journey Badge',
    dimensions: '600x500',
    aspect_ratio: '6:5',
    publication_status: 'published'
  },
  {
    image_key: 'about.milestone.image',
    image_name: 'About Us Milestone Image',
    category: 'About Us',
    page_name: 'About Us',
    section_name: 'Milestones Section',
    image_url: '/assets/images/Untitled-design-1.png',
    original_image_url: '/assets/images/Untitled-design-1.png',
    alt_text: 'Blackforest Holidays Travel Milestones',
    dimensions: '600x500',
    aspect_ratio: '6:5',
    publication_status: 'published'
  },

  // ── 9. SERVICES ──
  {
    image_key: 'services.concierge.intro',
    image_name: 'Concierge Travel Specialist Feature',
    category: 'Services',
    page_name: 'Concierge',
    section_name: 'Intro Section',
    image_url: '/assets/images/ChatGPT-Image-Aug-8-2026-06_20_36-PM.png',
    original_image_url: '/assets/images/ChatGPT-Image-Aug-8-2026-06_20_36-PM.png',
    alt_text: 'Bespoke Travel Concierge Services',
    dimensions: '700x500',
    aspect_ratio: '7:5',
    publication_status: 'published'
  },
  {
    image_key: 'services.cruises.feature',
    image_name: 'Luxury Cruise Liner Lounge Feature',
    category: 'Services',
    page_name: 'Cruises',
    section_name: 'Cruise Experience',
    image_url: '/assets/images/Horizon-Lounge-Dining-Venue-copy-scaled.avif',
    original_image_url: '/assets/images/Horizon-Lounge-Dining-Venue-copy-scaled.avif',
    alt_text: 'Horizon Luxury Lounge Dining Venue',
    dimensions: '800x600',
    aspect_ratio: '4:3',
    publication_status: 'published'
  },
  {
    image_key: 'services.cruises.island',
    image_name: 'Cruise Tropical Island Destination',
    category: 'Services',
    page_name: 'Cruises',
    section_name: 'Cruise Destinations',
    image_url: '/assets/images/pngtree-cruise-ship-that-is-sitting-on-a-tropical-island-image_2615573.jpg',
    original_image_url: '/assets/images/pngtree-cruise-ship-that-is-sitting-on-a-tropical-island-image_2615573.jpg',
    alt_text: 'Cruise Ship at Tropical Island Paradise',
    dimensions: '800x500',
    aspect_ratio: '8:5',
    publication_status: 'published'
  },
  {
    image_key: 'services.corporate.lounge',
    image_name: 'Corporate Executive Travel Feature',
    category: 'Services',
    page_name: 'Corporate Travel',
    section_name: 'Corporate Overview',
    image_url: '/assets/images/corporate-travel.jpg',
    original_image_url: '/assets/images/corporate-travel.jpg',
    alt_text: 'Corporate Travel Management and Services',
    dimensions: '800x600',
    aspect_ratio: '4:3',
    publication_status: 'published'
  },
  {
    image_key: 'services.corporate.meeting',
    image_name: 'Executive Business Meeting Feature',
    category: 'Services',
    page_name: 'Corporate Travel',
    section_name: 'Corporate Solutions',
    image_url: '/assets/images/Untitled-design-23.png',
    original_image_url: '/assets/images/Untitled-design-23.png',
    alt_text: 'Executive Business Travel Solutions',
    dimensions: '800x600',
    aspect_ratio: '4:3',
    publication_status: 'published'
  },

  // ── 10. TESTIMONIALS ──
  {
    image_key: 'testimonials.avatar_1',
    image_name: 'Client Avatar: Siddharth Dhar',
    category: 'Testimonials',
    page_name: 'Home',
    section_name: 'Testimonials Section',
    image_url: '/assets/site/avatar_siddharth.jpg',
    original_image_url: '/assets/site/avatar_siddharth.jpg',
    alt_text: 'Siddharth Dhar Client Photo',
    dimensions: '120x120',
    aspect_ratio: '1:1',
    publication_status: 'published'
  },
  {
    image_key: 'testimonials.avatar_2',
    image_name: 'Client Avatar: Harish Kongara',
    category: 'Testimonials',
    page_name: 'Home',
    section_name: 'Testimonials Section',
    image_url: '/assets/site/avatar_harish.jpg',
    original_image_url: '/assets/site/avatar_harish.jpg',
    alt_text: 'Harish Kongara Client Photo',
    dimensions: '120x120',
    aspect_ratio: '1:1',
    publication_status: 'published'
  },
  {
    image_key: 'testimonials.avatar_3',
    image_name: 'Client Avatar: Revathi P',
    category: 'Testimonials',
    page_name: 'Home',
    section_name: 'Testimonials Section',
    image_url: '/assets/site/avatar_revathi.jpg',
    original_image_url: '/assets/site/avatar_revathi.jpg',
    alt_text: 'Revathi P Client Photo',
    dimensions: '120x120',
    aspect_ratio: '1:1',
    publication_status: 'published'
  },
  {
    image_key: 'testimonials.avatar_4',
    image_name: 'Client Avatar: Shashank S Thakur',
    category: 'Testimonials',
    page_name: 'Home',
    section_name: 'Testimonials Section',
    image_url: '/assets/site/avatar_shashank.jpg',
    original_image_url: '/assets/site/avatar_shashank.jpg',
    alt_text: 'Shashank S Thakur Client Photo',
    dimensions: '120x120',
    aspect_ratio: '1:1',
    publication_status: 'published'
  },
  {
    image_key: 'testimonials.avatar_5',
    image_name: 'Client Avatar: Sendhil Kumar V',
    category: 'Testimonials',
    page_name: 'Home',
    section_name: 'Testimonials Section',
    image_url: '/assets/site/avatar_sendhil.jpg',
    original_image_url: '/assets/site/avatar_sendhil.jpg',
    alt_text: 'Sendhil Kumar V Client Photo',
    dimensions: '120x120',
    aspect_ratio: '1:1',
    publication_status: 'published'
  },
  {
    image_key: 'testimonials.avatar_6',
    image_name: 'Client Avatar: Rohan Sharma',
    category: 'Testimonials',
    page_name: 'Home',
    section_name: 'Testimonials Section',
    image_url: '/assets/site/avatar_rohan.jpg',
    original_image_url: '/assets/site/avatar_rohan.jpg',
    alt_text: 'Rohan Sharma Client Photo',
    dimensions: '120x120',
    aspect_ratio: '1:1',
    publication_status: 'published'
  },
  {
    image_key: 'testimonials.avatar_7',
    image_name: 'Client Avatar: Shanthi Shanmuga',
    category: 'Testimonials',
    page_name: 'Home',
    section_name: 'Testimonials Section',
    image_url: '/assets/site/avatar_shanthi.jpg',
    original_image_url: '/assets/site/avatar_shanthi.jpg',
    alt_text: 'Shanthi Shanmuga Client Photo',
    dimensions: '120x120',
    aspect_ratio: '1:1',
    publication_status: 'published'
  },

  // ── 11. BLOG & ARTICLES ──
  {
    image_key: 'blog.waterfall_trekking.cover',
    image_name: 'Waterfall Trekking Safety Article Cover',
    category: 'Blog & Articles',
    page_name: 'Journal',
    section_name: 'Curated Stories',
    image_url: '/assets/images/blog-010.webp',
    original_image_url: '/assets/images/blog-010.webp',
    alt_text: 'Safety measures for safe trekking in waterfalls',
    dimensions: '800x600',
    aspect_ratio: '4:3',
    publication_status: 'published'
  },
  {
    image_key: 'blog.winter_hiking.cover',
    image_name: 'Winter Hiking Experience Article Cover',
    category: 'Blog & Articles',
    page_name: 'Journal',
    section_name: 'Curated Stories',
    image_url: '/assets/images/blog-007.webp',
    original_image_url: '/assets/images/blog-007.webp',
    alt_text: '10 Tips for best winter hiking experience',
    dimensions: '800x600',
    aspect_ratio: '4:3',
    publication_status: 'published'
  },
  {
    image_key: 'blog.camping_tent.cover',
    image_name: 'Camping Tent Selection Article Cover',
    category: 'Blog & Articles',
    page_name: 'Journal',
    section_name: 'Curated Stories',
    image_url: '/assets/images/blog-006.webp',
    original_image_url: '/assets/images/blog-006.webp',
    alt_text: 'How to select perfect quality camping tent',
    dimensions: '800x600',
    aspect_ratio: '4:3',
    publication_status: 'published'
  },

  // ── 12. FOOTER ──
  {
    image_key: 'footer.bg',
    image_name: 'Footer Pine Forest Silhouette Background',
    category: 'Footer',
    page_name: 'Global Footer',
    section_name: 'Footer Section',
    image_url: '/assets/images/footer-img.png',
    original_image_url: '/assets/images/footer-img.png',
    alt_text: 'Footer Pine Forest Graphic Texture',
    dimensions: '1920x600',
    aspect_ratio: '16:5',
    publication_status: 'published'
  },
  {
    image_key: 'footer.brand_logo',
    image_name: 'Footer Brand Logo (White)',
    category: 'Footer',
    page_name: 'Global Footer',
    section_name: 'Footer Section',
    image_url: '/assets/site/white_logo.png',
    original_image_url: '/assets/site/white_logo.png',
    alt_text: 'Blackforest Holidays Footer Logo',
    dimensions: '180x48',
    aspect_ratio: '15:4',
    publication_status: 'published'
  },

  // ── 13. OTHER PAGES ──
  {
    image_key: 'other.coach_tour.banner',
    image_name: 'Coach Tour Page Banner',
    category: 'Other Pages',
    page_name: 'Coach Tour',
    section_name: 'Hero Banner',
    image_url: '/assets/images/hero-home.jpg',
    original_image_url: '/assets/images/hero-home.jpg',
    alt_text: 'Luxury Guided Coach Tours Banner',
    dimensions: '1920x600',
    aspect_ratio: '16:5',
    publication_status: 'published'
  },
  {
    image_key: 'other.concierge.banner',
    image_name: 'Flight & Visa Concierge Banner',
    category: 'Other Pages',
    page_name: 'Concierge',
    section_name: 'Service Banner',
    image_url: '/assets/images/contact-pine-bg-2.jpg',
    original_image_url: '/assets/images/contact-pine-bg-2.jpg',
    alt_text: 'Flight and Visa Concierge Assistance',
    dimensions: '1920x600',
    aspect_ratio: '16:5',
    publication_status: 'published'
  },

  // ── 14. OTHER WEBSITE IMAGES ──
  {
    image_key: 'other.pine_forest_divider',
    image_name: 'Pine Forest Section Divider Silhouette',
    category: 'Other Website Images',
    page_name: 'Global',
    section_name: 'Section Divider',
    image_url: '/pine-forest.webp',
    original_image_url: '/pine-forest.webp',
    alt_text: 'Pine Forest Horizontal Divider Pattern',
    dimensions: '1920x300',
    aspect_ratio: '32:5',
    publication_status: 'published'
  }
];

const seedWebsiteImages = async () => {
  try {
    for (const item of defaultWebsiteImages) {
      const existing = await WebsiteImage.findOne({ where: { image_key: item.image_key } });
      if (!existing) {
        await WebsiteImage.create(item);
      }
    }
    console.log(`✅ WebsiteImages seeded/verified successfully (${defaultWebsiteImages.length} keys)`);
  } catch (error) {
    console.error('❌ Failed to seed WebsiteImages:', error.message);
  }
};

module.exports = {
  defaultWebsiteImages,
  seedWebsiteImages
};
