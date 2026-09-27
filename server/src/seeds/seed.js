const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const {
  sequelize,
  User,
  Destination,
  TourPackage,
  Experience,
  Service,
  Testimonial,
  Article,
  Expertise,
  Enquiry,
  Settings,
  Navigation
} = require('../models');

const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MySQL and synchronizing tables...');
    await sequelize.authenticate();
    await sequelize.sync({ force: true }); // Clean slate for fresh seeding
    console.log('✅ Tables synchronized with clean schema');

    // 1. Seed Users
    console.log('👤 Seeding Users...');
    const superAdmin = await User.create({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: 'admin@123',
      role: 'superadmin',
      avatar: '/assets/images/shop-09.jpg',
      status: 'active'
    });

    // 2. Seed Settings
    console.log('⚙️ Seeding Website Settings...');
    await Settings.create({
      siteName: 'Black Forest Holidays',
      logo: '/assets/images/white_logo.png',
      darkLogo: '/assets/images/white_logo.png',
      favicon: '/assets/images/cropped-cropped-Logo-02-1-1-32x32.png',
      phone: '+91 94470 12345',
      email: 'info@blackforestholidays.com',
      whatsapp: '+919447012345',
      address: 'Black Forest Holidays, Premium Travel Lounge, Panampilly Nagar, Cochin, Kerala 682036, India',
      socialLinks: {
        facebook: 'https://facebook.com/blackforestholidays',
        instagram: 'https://instagram.com/blackforestholidays',
        youtube: 'https://youtube.com/@blackforestholidays',
        linkedin: 'https://linkedin.com/company/blackforestholidays',
        twitter: 'https://twitter.com/blackforesttour'
      },
      footerText: 'BLACKFOREST HOLIDAYS is your trusted partner in creating unforgettable travel experiences. We believe that every journey should be more than just a trip—it should be a collection of wonderful memories, new discoveries, and meaningful experiences.',
      copyright: '© 2026 Black Forest Holidays. All Rights Reserved.',
      googleMapsUrl: 'https://maps.google.com/?q=Cochin,Kerala',
      analyticsId: 'G-HVE7N8BQ63',
      defaultSeoTitle: 'Black Forest Holidays – Discover Unforgettable Travel Experiences',
      defaultSeoDescription: 'Discover unforgettable travel experiences with customized holiday packages, honeymoon tours, family vacations, adventure trips, and international travel at the best prices.'
    });

    // 3. Seed Destinations
    console.log('🗺️ Seeding Destinations...');
    const destinationsData = [
      {
        name: 'Switzerland & Alpine Wonderland',
        slug: 'europe',
        country: 'Switzerland',
        region: 'europe',
        shortDescription: 'Snow-capped peaks, azure lakes, scenic train rides, and enchanting Swiss mountain hamlets.',
        description: 'Experience the magic of the Swiss Alps, from the towering heights of Jungfraujoch to the pristine shores of Lake Lucerne and the tranquil meadows of Interlaken.',
        heroImage: '/assets/images/adventure-activity-detail-04.jpg',
        thumbnail: '/assets/images/asset_ada9439396.jpg',
        gallery: [
          '/assets/images/Untitled-design-25.png',
          '/assets/images/Untitled-design-19.png'
        ],
        featured: true,
        orderIndex: 1
      },
      {
        name: 'Kenya & Serengeti Wildlife Safari',
        slug: 'africa',
        country: 'Kenya',
        region: 'africa',
        shortDescription: 'Witness the Great Migration, majestic savannahs, and luxury tented safari camps under the African sky.',
        description: 'Immerse yourself in Maasai Mara, Amboseli National Park with Mount Kilimanjaro views, and exclusive game drives led by veteran safari naturalists.',
        heroImage: '/assets/images/asset_c4664aba08.jpg',
        thumbnail: '/assets/images/france-and-swiss-alps.webp',
        gallery: [
          '/assets/images/asset_c4664aba08.jpg'
        ],
        featured: true,
        orderIndex: 2
      },
      {
        name: 'United States & California Coast',
        slug: 'america',
        country: 'United States',
        region: 'america',
        shortDescription: 'From the Pacific Coast Highway to the breathtaking Grand Canyon and vibrant cosmopolitan skylines.',
        description: 'Explore the iconic sights of San Francisco, Los Angeles, Las Vegas, and Yosemite National Park on a meticulously curated American journey.',
        heroImage: '/assets/images/activity-single-img-1.jpg',
        thumbnail: '/assets/images/WhatsApp-Image-2026-07-30-at-12.52.36.jpeg',
        featured: true,
        orderIndex: 3
      },
      {
        name: 'Japan & Southeast Asia Odyssey',
        slug: 'asian-countries',
        country: 'Japan',
        region: 'asian-countries',
        shortDescription: 'Cherry blossoms, ancient Kyoto shrines, hyper-modern Tokyo, and exotic Thai island sanctuaries.',
        description: 'Experience the harmonious contrast between time-honored traditions, tranquil zen gardens, and world-class culinary excellence across Asia.',
        heroImage: '/assets/images/asset_c31e54fcbe.jpg',
        thumbnail: '/assets/images/home-adventures-01.jpg',
        featured: true,
        orderIndex: 4
      },
      {
        name: 'Australia & New Zealand Wonders',
        slug: 'australia',
        country: 'Australia',
        region: 'australia',
        shortDescription: 'Sydney Harbour, Great Barrier Reef coral gardens, and New Zealand’s dramatic fjords.',
        description: 'A captivating expedition across Australia and New Zealand, combining metropolitan glamour with untouched wilderness and aboriginal heritage.',
        heroImage: '/assets/images/asset_ada9439396.jpg',
        thumbnail: '/assets/images/blog-detail-006.jpg',
        featured: true,
        orderIndex: 5
      },
      {
        name: 'Maldives & Indian Ocean Atolls',
        slug: 'indian-ocean',
        country: 'Maldives',
        region: 'indian-ocean',
        shortDescription: 'Turquoise overwater villas, crystal lagoons, coral reefs, and sublime tropical seclusion.',
        description: 'Indulge in private island luxury in the Maldives, Mauritius, and Seychelles with sunset catamaran cruises and world-renowned underwater dining.',
        heroImage: '/assets/images/asset_b0a606c90b.jpg',
        thumbnail: '/assets/images/blog-detail-004.jpg',
        featured: true,
        orderIndex: 6
      },
      {
        name: 'Dubai & Arabian Desert Highlights',
        slug: 'middle-east',
        country: 'United Arab Emirates',
        region: 'middle-east',
        shortDescription: 'Futuristic architectural wonders, luxury desert retreats, and rich Arabian hospitality.',
        description: 'Discover the soaring Burj Khalifa, palm-fringed private beaches, thrilling red dune safaris, and historic spice souks of the Middle East.',
        heroImage: '/assets/images/asset_1a06b03190.jpg',
        thumbnail: '/assets/images/contact-breadcrumb.jpg',
        featured: true,
        orderIndex: 7
      },
      {
        name: 'Sri Lanka & South Asian Heritage',
        slug: 'south-asia',
        country: 'Sri Lanka',
        region: 'south-asia',
        shortDescription: 'Emerald tea plantations, Sigiriya lion rock, golden beaches, and sacred Buddhist shrines.',
        description: 'Explore the tear-drop island of Sri Lanka and mystical Bhutan with scenic hill country train journeys and world-renowned heritage sanctuaries.',
        heroImage: '/assets/images/blog-007-300x222.jpg',
        thumbnail: '/assets/images/client-logo-3.png',
        featured: true,
        orderIndex: 8
      },
      {
        name: 'Kerala – God’s Own Country',
        slug: 'kerala',
        country: 'India',
        region: 'india',
        shortDescription: 'Tranquil backwaters, Munnar misty tea gardens, spice plantations, and Arabian Sea beaches.',
        description: 'Journey through Alleppey on a private luxury houseboat, rejuvenate with authentic Ayurvedic therapies, and explore Dutch heritage palaces in Fort Kochi.',
        heroImage: '/assets/images/asset_e9bf19bf84.jpg',
        thumbnail: '/assets/images/asset_e9bf19bf84.jpg',
        featured: true,
        orderIndex: 9
      },
      {
        name: 'Andaman & Nicobar Islands',
        slug: 'andaman',
        country: 'India',
        region: 'india',
        shortDescription: 'Radhanagar blue waters, coral diving at Elephant Beach, and historic Cellular Jail.',
        description: 'A tropical paradise offering some of the world’s finest secluded beaches, mangrove kayaking, and rich marine biodiversity.',
        heroImage: '/assets/images/classical-spain.webp',
        thumbnail: '/assets/images/asian-woman-wearing-chinese-traditional-dress-boat-ban-rak-thai-village-mae-hong-son-province-scaled.jpg',
        featured: true,
        orderIndex: 10
      }
    ];

    const createdDestinations = {};
    for (const dest of destinationsData) {
      const created = await Destination.create(dest);
      createdDestinations[dest.slug] = created;
    }

    // 4. Seed Tour Packages (Matching reference website)
    console.log('✈️ Seeding Tour Packages...');
    const tourPackagesData = [
      // International
      {
        title: 'Grand European Highlights',
        slug: 'grand-european-highlights',
        destinationId: createdDestinations['europe']?.id,
        category: 'international',
        type: 'Luxury Escorted Tour',
        duration: '10 Days / 9 Nights',
        location: 'Paris, Lucerne, Interlaken, Venice, Rome',
        shortDescription: 'An awe-inspiring journey through iconic European capitals, Swiss Alpine peaks, and historic Italian romance.',
        description: 'Immerse yourself in the timeless grandeur of Western Europe. Stroll the Champs-Élysées, ride the world-famous cogwheel railway to Mt. Titlis, glide through Venetian canals on a private gondola, and marvel at the historic Colosseum in Rome.',
        price: 3499.00,
        currency: 'USD',
        discountPrice: 3199.00,
        rating: 4.9,
        reviewCount: 38,
        featured: true,
        coverImage: '/assets/images/asset_fd072b807d.jpg',
        gallery: [
          '/assets/images/Untitled-design-25.png',
          '/assets/images/WhatsApp-Image-2026-08-17-at-20.35.20-2.jpeg',
          '/assets/images/client-logo-1.png'
        ],
        highlights: [
          'Eiffel Tower 2nd Floor & Seine River Evening Cruise',
          'Full Day Excursion to Mt. Titlis with Ice Flyer & Cable Car',
          'Private Gondola Ride in Venice through Grand Canal',
          'Guided Vatican Museums & Colosseum Historic Tour',
          '5-Star Handpicked Central Hotels with Daily Gourmet Breakfast'
        ],
        itinerary: [
          {
            day: 1,
            title: 'Arrival in Paris – City of Lights',
            description: 'Arrive at Charles de Gaulle Airport and meet your private chauffeur for transfer to your luxury hotel. Evening Seine River cruise with champagne.',
            activities: ['Airport VIP Meet & Greet', 'Seine River Cruise', 'Welcome Dinner'],
            image: '/assets/images/asset_fd072b807d.jpg'
          },
          {
            day: 2,
            title: 'Parisian Grandeur & Louvre Treasures',
            description: 'Guided tour of the Louvre Museum, Arc de Triomphe, and Eiffel Tower summit. Afternoon high tea at a historic Parisian salon.',
            activities: ['Louvre Guided Access', 'Eiffel Tower Access', 'Champs-Élysées Walk'],
            image: '/assets/images/Untitled-design-30.png'
          },
          {
            day: 3,
            title: 'TGV High-Speed Train to Swiss Lucerne',
            description: 'Board the scenic first-class TGV into Switzerland. Check into your lakefront hotel and enjoy an evening stroll across the historic Chapel Bridge.',
            activities: ['Scenic First Class Train', 'Lucerne Lake Promenade', 'Swiss Fondue Experience'],
            image: '/assets/images/Untitled-design-31.png'
          },
          {
            day: 4,
            title: 'Mt. Titlis Glacier & Rotair Cable Car',
            description: 'Ascend to 10,000 feet on the world’s first revolving cable car. Cross the Cliff Walk suspension bridge and explore the glacier cave.',
            activities: ['Titlis Rotair Cable Car', 'Glacier Cave Walk', 'Snow Tube Adventure'],
            image: '/assets/images/WhatsApp-Image-2026-08-17-at-20.35.20.jpeg'
          },
          {
            day: 5,
            title: 'Venetian Serenade & Canal Sunset',
            description: 'Cross the scenic Alps into northern Italy. Arrive in Venice via private water taxi to your grand canal palazzo.',
            activities: ['Water Taxi Transfer', 'St. Mark Square Tour', 'Gondola Ride'],
            image: '/assets/images/WhatsApp-Image-2026-08-17-at-20.35.25-1.jpeg'
          }
        ],
        inclusions: [
          '9 Nights in premium 4 and 5 star handpicked hotels',
          'Daily European breakfast and 4 multi-course fine dining experiences',
          'First-class rail transfers between European capitals',
          'All sightseeing entries, permits, and private local guides',
          '24/7 dedicated Blackforest Holidays concierge hotline'
        ],
        exclusions: [
          'International transatlantic airfares',
          'Personal travel insurance',
          'Meals not mentioned in the itinerary',
          'City tourist taxes payable directly to hotels'
        ],
        terms: [
          'Valid passport with at least 6 months validity required',
          '25% non-refundable deposit upon booking confirmation',
          'Complimentary date modifications up to 30 days prior to departure'
        ],
        faq: [
          {
            question: 'What visas are required for this tour?',
            answer: 'A single Schengen Visa covers all countries on this itinerary (France, Switzerland, and Italy). Our concierge assists with paperwork.'
          },
          {
            question: 'Can this itinerary be tailored for private families?',
            answer: 'Yes, all Blackforest tour packages can be upgraded to private Mercedes van touring with bespoke pacing.'
          }
        ],
        status: 'published'
      },
      {
        title: 'Majestic Africa Safari',
        slug: 'majestic-africa-safari',
        destinationId: createdDestinations['africa']?.id,
        category: 'international',
        type: 'Wildlife & Nature Safari',
        duration: '8 Days / 7 Nights',
        location: 'Nairobi, Maasai Mara, Lake Nakuru, Amboseli',
        shortDescription: 'Witness the legendary Big Five and the Great Migration across Kenya’s golden savannahs.',
        description: 'Immerse yourself in authentic luxury under canvas. Track lions, leopards, cheetahs, and elephants with Maasai spotters in open-top 4x4 Land Cruisers.',
        price: 4299.00,
        currency: 'USD',
        discountPrice: 3899.00,
        rating: 5.0,
        reviewCount: 26,
        featured: true,
        coverImage: '/assets/images/asset_c4664aba08.jpg',
        gallery: [
          '/assets/images/slider-11.webp',
          '/assets/images/ChatGPT-Image-Aug-8-2026-09_18_57-PM-768x526.png'
        ],
        highlights: [
          'Guaranteed Big Five game tracking in Maasai Mara',
          'Sunrise hot air balloon safari over the plains with champagne breakfast',
          'Visit authentic traditional Maasai warrior village',
          'Spectacular views of Mount Kilimanjaro from Amboseli'
        ],
        itinerary: [
          {
            day: 1,
            title: 'Nairobi Welcome & Giraffe Manor Sanctuary',
            description: 'Arrive in Nairobi, meet our safari director and visit the endangered Rothschild Giraffe Center.',
            activities: ['Airport Welcome', 'Giraffe Centre Visit', 'Safari Briefing'],
            image: '/assets/images/mask-pine-1000x668.jpg'
          },
          {
            day: 2,
            title: 'Fly into the Heart of Maasai Mara',
            description: 'Scenic bush flight into the Mara. Afternoon game drive tracking pride of lions and grazing zebra herds.',
            activities: ['Bush Flight', 'Afternoon 4x4 Game Drive', 'Campfire Bush Dinner'],
            image: '/assets/images/asset_c4664aba08.jpg'
          }
        ],
        inclusions: [
          'All national park conservation fees and safari permits',
          'Luxury tented lodge accommodation with all inclusive meals',
          'Dedicated open-roof 4x4 safari cruiser with guaranteed window seat',
          'Professional English-speaking safari guide & tracker'
        ],
        exclusions: ['International flights', 'Gratuities for safari guide'],
        status: 'published'
      },
      {
        title: 'Tropical Island Paradise – Maldives & Mauritius',
        slug: 'tropical-island-paradise',
        destinationId: createdDestinations['indian-ocean']?.id,
        category: 'international',
        type: 'Honeymoon & Luxury Escape',
        duration: '6 Days / 5 Nights',
        location: 'North Malé Atoll, Maldives',
        shortDescription: 'Pure barefoot bliss in overwater luxury villas surrounded by vibrant coral reefs and turquoise lagoons.',
        description: 'Indulge in the ultimate romantic getaway. Step directly from your private sun deck into crystal warm waters, experience underwater dining, and sail on sunset dolphin cruises.',
        price: 2899.00,
        currency: 'USD',
        discountPrice: 2599.00,
        rating: 5.0,
        reviewCount: 42,
        featured: true,
        coverImage: '/assets/images/asset_b0a606c90b.jpg',
        gallery: [
          '/assets/images/pexels-asadphoto-9149367-scaled.jpg'
        ],
        highlights: [
          '5 Nights in Luxury Overwater Sunset Pool Villa',
          'Complimentary Speedboat or Seaplane Island Transfers',
          'Private Sunset Cruise with Wild Dolphin Watching',
          'Couples Ayurvedic Spa Treatment overlooking the ocean'
        ],
        itinerary: [
          {
            day: 1,
            title: 'Seaplane Arrival & Overwater Villa Check-in',
            description: 'Board your scenic seaplane flight over sparkling atolls and check into your secluded overwater retreat.',
            activities: ['Seaplane Transfer', 'Champagne Welcome', 'Sunset Villa Relaxation'],
            image: '/assets/images/asset_b0a606c90b.jpg'
          }
        ],
        inclusions: [
          'All inclusive dining plan (Breakfast, Lunch, Dinner & Select Premium Beverages)',
          'Roundtrip seaplane airport transfers',
          'Complimentary snorkeling equipment and non-motorized watersports'
        ],
        exclusions: ['Scuba diving certification courses', 'Spa treatments not specified'],
        status: 'published'
      },
      {
        title: 'Wonders of Middle East – Dubai & Abu Dhabi',
        slug: 'wonders-of-middle-east',
        destinationId: createdDestinations['middle-east']?.id,
        category: 'international',
        type: 'City & Desert Explorer',
        duration: '6 Days / 5 Nights',
        location: 'Dubai & Abu Dhabi, UAE',
        shortDescription: 'Gleaming skyscrapers, royal palace mosques, and enchanting Arabian red sand desert camps.',
        description: 'Discover the pinnacle of modern luxury combined with Bedouin heritage. Experience Burj Khalifa At The Top, the Sheikh Zayed Grand Mosque, and a VIP desert safari.',
        price: 1899.00,
        currency: 'USD',
        discountPrice: 1699.00,
        rating: 4.8,
        reviewCount: 29,
        featured: true,
        coverImage: '/assets/images/asset_1a06b03190.jpg',
        highlights: [
          'Burj Khalifa 124th Floor Observation Deck VIP Access',
          'Desert Safari with 4x4 Dune Bashing, Camel Trekking & BBQ Dinner',
          'Full Day Abu Dhabi Tour with Sheikh Zayed Grand Mosque & Louvre',
          'Luxury Marina Dinner Cruise on a Glass Dhow'
        ],
        itinerary: [
          {
            day: 1,
            title: 'Arrival in Dubai & Marina Dhow Cruise',
            description: 'Chauffeur arrival transfer to hotel. Evening romantic marina dinner cruise with live Tanoura show.',
            activities: ['VIP Arrival', 'Marina Dhow Cruise Dinner'],
            image: '/assets/images/asset_1a06b03190.jpg'
          }
        ],
        inclusions: [
          '5 Nights in 5-star Dubai downtown hotel',
          'Daily buffet breakfast',
          'Private air-conditioned transfers throughout'
        ],
        exclusions: ['UAE Tourism Dirham fee'],
        status: 'published'
      },
      {
        title: 'Exotic Asia & Far East – Japan & Thailand',
        slug: 'exotic-asia-and-far-east',
        destinationId: createdDestinations['asian-countries']?.id,
        category: 'international',
        type: 'Cultural & Heritage Odyssey',
        duration: '9 Days / 8 Nights',
        location: 'Tokyo, Kyoto, Bangkok, Phuket',
        shortDescription: 'Shinkansen bullet trains, golden Buddha temples, and private tropical island hopping in Phuket.',
        description: 'Immerse yourself in neon-lit Tokyo, peaceful Kyoto bamboo groves, bustling floating markets in Bangkok, and azure waters in Phang Nga Bay.',
        price: 2999.00,
        currency: 'USD',
        discountPrice: 2799.00,
        rating: 4.9,
        reviewCount: 31,
        featured: true,
        coverImage: '/assets/images/asset_c31e54fcbe.jpg',
        status: 'published'
      },
      {
        title: 'Magical Australia Tour',
        slug: 'magical-australia-tour',
        destinationId: createdDestinations['australia']?.id,
        category: 'international',
        type: 'Coastal & Coral Discovery',
        duration: '8 Days / 7 Nights',
        location: 'Sydney, Melbourne, Cairns',
        shortDescription: 'Sydney Opera House, Great Ocean Road koala spotting, and outer Great Barrier Reef snorkeling.',
        description: 'Explore Australia’s most celebrated coastal cities, ancient Daintree rainforests, and marine sanctuaries with experienced Blackforest guides.',
        price: 3699.00,
        currency: 'USD',
        discountPrice: 3399.00,
        rating: 4.8,
        reviewCount: 19,
        featured: true,
        coverImage: '/assets/images/asset_ada9439396.jpg',
        status: 'published'
      },
      {
        title: 'Grand America Explorer',
        slug: 'grand-america-explorer',
        destinationId: createdDestinations['america']?.id,
        category: 'international',
        type: 'Scenic Road & City Tour',
        duration: '11 Days / 10 Nights',
        location: 'San Francisco, Las Vegas, Grand Canyon, Los Angeles',
        shortDescription: 'Golden Gate Bridge, helicopter over the Grand Canyon, and celebrity mansions in Beverly Hills.',
        description: 'The definitive American adventure through California’s coastal wonders, the Nevada desert neon, and ancient red rock canyons.',
        price: 3899.00,
        currency: 'USD',
        discountPrice: 3599.00,
        rating: 4.9,
        reviewCount: 22,
        featured: true,
        coverImage: '/assets/images/tourists-take-boat-ban-rak-thai-village-mae-hong-son-province-thailand-scaled.jpg',
        status: 'published'
      },
      {
        title: 'Enchanting South Asia – Sri Lanka Discovery',
        slug: 'enchanting-south-asia',
        destinationId: createdDestinations['south-asia']?.id,
        category: 'international',
        type: 'Heritage & Tea Trails',
        duration: '7 Days / 6 Nights',
        location: 'Colombo, Kandy, Nuwara Eliya, Galle',
        shortDescription: 'Sigiriya Rock Fortress, scenic blue train through tea hills, and historic Dutch Galle Fort.',
        description: 'A deeply rewarding discovery of Sri Lanka’s lush highlands, spice gardens, wild elephant national parks, and golden southern coastlines.',
        price: 1499.00,
        currency: 'USD',
        discountPrice: 1299.00,
        rating: 4.9,
        reviewCount: 27,
        featured: true,
        coverImage: '/assets/images/ahmed-shabana-ADa9bb3tqR4-unsplash-scaled.jpg',
        status: 'published'
      },

      // Indian Tour Packages (Matching reference homepage)
      {
        title: 'From Coastlines to Palaces: A Kerala Journey',
        slug: 'from-coastlines-to-palaces-a-kerala-journey',
        destinationId: createdDestinations['kerala']?.id,
        category: 'india',
        type: 'Bespoke Heritage & Backwaters',
        duration: '6 Days / 5 Nights',
        location: 'Cochin, Munnar, Thekkady, Alleppey',
        shortDescription: 'Misty tea plantations, spice wildlife sanctuaries, and a private luxury houseboat cruise on the backwaters.',
        description: 'Experience the soul of Kerala. Explore Chinese fishing nets in historic Fort Kochi, wake up above the clouds in Munnar tea hills, encounter wild elephants in Periyar, and glide through serene palm-fringed canals in Alleppey.',
        price: 899.00,
        currency: 'USD',
        discountPrice: 749.00,
        rating: 5.0,
        reviewCount: 54,
        featured: true,
        coverImage: '/assets/images/asset_e9bf19bf84.jpg',
        gallery: [
          '/assets/images/asset_e9bf19bf84.jpg',
          '/assets/images/Things-to-do-in-Tanzania_Zanzibar.jpeg'
        ],
        highlights: [
          'Overnight stay in private luxury A/C Kerala Houseboat with private chef',
          'Guided trek through Munnar tea gardens & visit to Lockhart Tea Factory',
          'Bamboo rafting and spice plantation walk in Thekkady',
          'Sunset cruise by Dutch Palace and Jewish Synagogue in Fort Kochi'
        ],
        itinerary: [
          {
            day: 1,
            title: 'Arrival in Cochin – Heritage Fort Kochi Tour',
            description: 'Arrive at Cochin International Airport, meet our representative and transfer to your heritage hotel in Fort Kochi. Evening Kathakali dance performance.',
            activities: ['Airport Meet & Greet', 'Fort Kochi Heritage Walk', 'Kathakali Show'],
            image: '/assets/images/contact-pine-bg-1.jpg'
          },
          {
            day: 2,
            title: 'Scenic Drive to Munnar Hills & Waterfalls',
            description: 'Drive past Cheeyappara and Valara cascading waterfalls into Munnar’s lush rolling green tea hills. Check into your mountain resort.',
            activities: ['Waterfall Photo Stops', 'Tea Estate Check-in', 'Evening Mist Walk'],
            image: '/assets/images/asset_e9bf19bf84.jpg'
          },
          {
            day: 3,
            title: 'Munnar Sightseeing & Eravikulam National Park',
            description: 'Visit the home of the endangered Nilgiri Tahr at Rajamalai, explore Mattupetty Dam, Echo Point, and the Tea Museum.',
            activities: ['Eravikulam Safari', 'Mattupetty Speedboating', 'Tea Tasting'],
            image: '/assets/images/blog-010-1000x741.jpg'
          },
          {
            day: 4,
            title: 'Thekkady Spice Plantations & Periyar Lake',
            description: 'Drive through cardamom and pepper plantations. Enjoy a boat ride on Periyar Lake observing wild elephants and sambar deer.',
            activities: ['Periyar Lake Cruise', 'Spice Garden Guided Walk', 'Martial Arts Show'],
            image: '/assets/images/asset_c4664aba08.jpg'
          },
          {
            day: 5,
            title: 'Alleppey Backwaters Private Houseboat Cruise',
            description: 'Board your traditional thatched Kettuvallam houseboat. Cruise through narrow canals, enjoy fresh Karimeen fish prepared onboard, and anchor overnight.',
            activities: ['Backwater Cruising', 'Traditional Kerala Meals', 'Village Life Interaction'],
            image: '/assets/images/asset_e9bf19bf84.jpg'
          }
        ],
        inclusions: [
          '5 Nights accommodation in premium boutique hotels & private luxury houseboat',
          'All meals on houseboat (Breakfast, Lunch, Dinner, Evening snacks)',
          'Daily buffet breakfast in all hotels',
          'Private air-conditioned chauffeur-driven vehicle for entire tour',
          'Toll, parking, and driver allowances included'
        ],
        exclusions: ['Airfare / train tickets', 'Camera entry fees'],
        status: 'published'
      },
      {
        title: 'Gems of the Nilgiris: Ooty & Coonoor',
        slug: 'gems-of-the-nilgiris-ooty-coonoor',
        destinationId: createdDestinations['kerala']?.id,
        category: 'india',
        type: 'Colonial Hill Station Retreat',
        duration: '4 Days / 3 Nights',
        location: 'Ooty & Coonoor, Tamil Nadu',
        shortDescription: 'UNESCO toy train ride, botanical rose gardens, and panoramic views from Doddabetta Peak.',
        description: 'Escape to the Queen of Hill Stations. Breathe in pine-scented mountain air, ride the heritage steam train through tunnels and bridges, and sip fresh Nilgiri tea at Sims Park.',
        price: 599.00,
        currency: 'USD',
        discountPrice: 499.00,
        rating: 4.8,
        reviewCount: 33,
        featured: true,
        coverImage: '/assets/images/nilgiris-ooty-coonoor.jpg',
        status: 'published'
      },
      {
        title: 'Romantic Andaman Tour Package',
        slug: 'romantic-andaman-tour-package',
        destinationId: createdDestinations['andaman']?.id,
        category: 'india',
        type: 'Island Romance & Honeymoon',
        duration: '5 Days / 4 Nights',
        location: 'Port Blair, Havelock Island, Neil Island',
        shortDescription: 'Candlelight beach dining, scuba diving, and white sandy shores at Radhanagar Beach.',
        description: 'Experience one of Asia’s most celebrated island escapes. Crystal clear turquoise lagoons, vibrant coral reefs at Elephant Beach, and peaceful beachside luxury resorts.',
        price: 999.00,
        currency: 'USD',
        discountPrice: 849.00,
        rating: 5.0,
        reviewCount: 46,
        featured: true,
        coverImage: '/assets/images/activity-single-img-2.jpg',
        status: 'published'
      },
      {
        title: 'Kodaikanal: Enchantress of the Hills',
        slug: 'kodaikanal-enchantress-of-the-hills',
        destinationId: createdDestinations['kerala']?.id,
        category: 'india',
        type: 'Misty Lake & Forest Sanctuary',
        duration: '3 Days / 2 Nights',
        location: 'Kodaikanal, Tamil Nadu',
        shortDescription: 'Star-shaped lake boating, Coakers walk cliff panoramas, and pine forest nature trails.',
        description: 'Unwind in the tranquil princess of hill stations, famous for its cool climate, eucalyptus-lined pathways, and serene boating experiences.',
        price: 449.00,
        currency: 'USD',
        discountPrice: 389.00,
        rating: 4.7,
        reviewCount: 21,
        featured: true,
        coverImage: '/assets/images/contact-pine-bg-2.jpg',
        status: 'published'
      },
      {
        title: "Wayanad: Retreat into Nature's Paradise",
        slug: 'wayanad-retreat-into-natures-paradise',
        destinationId: createdDestinations['kerala']?.id,
        category: 'india',
        type: 'Eco-Luxury Rainforest Escapes',
        duration: '4 Days / 3 Nights',
        location: 'Wayanad, Kerala',
        shortDescription: 'Ancient Edakkal Caves, Banasura Sagar dam, bamboo forests, and treehouse canopy stays.',
        description: 'Wake up to misty green rainforest canopies, discover prehistoric cave carvings, and kayak on pristine highland reservoirs with Blackforest naturalists.',
        price: 549.00,
        currency: 'USD',
        discountPrice: 479.00,
        rating: 4.9,
        reviewCount: 28,
        featured: true,
        coverImage: '/assets/images/ChatGPT-Image-Jul-31-2026-04_21_01-PM.png',
        status: 'published'
      },
      {
        title: 'Andaman Complete Tour Package',
        slug: 'andaman-complete-tour-package',
        destinationId: createdDestinations['andaman']?.id,
        category: 'india',
        type: 'Island & Marine Adventure',
        duration: '6 Days / 5 Nights',
        location: 'Port Blair, Havelock Island, Neil Island, Ross Island',
        shortDescription: 'The comprehensive island adventure with underwater sea walk, glass bottom boats, and Cellular Jail light show.',
        description: 'Explore every jewel of the Andaman archipelago. Includes private luxury catamaran transfers (Makruzz/Nautika) between tropical islands.',
        price: 1199.00,
        currency: 'USD',
        discountPrice: 1049.00,
        rating: 4.9,
        reviewCount: 37,
        featured: true,
        coverImage: '/assets/images/asset_e33b83aa7a.jpg',
        status: 'published'
      }
    ];

    for (const pkg of tourPackagesData) {
      await TourPackage.create(pkg);
    }

    // 5. Seed Experiences
    console.log('🌿 Seeding Experiences...');
    const experiencesData = [
      {
        name: 'Adventure & Nature',
        slug: 'adventure-nature',
        category: 'adventure-nature',
        description: 'Thrilling treks through misty mountain ranges, wildlife tracking in national reserves, white water rafting, and outdoor camping.',
        content: 'For travelers seeking an adrenaline rush amidst raw wilderness. From hiking the rugged Western Ghats to African savannah expeditions, our nature specialists craft unforgettable expeditions.',
        heroImage: '/assets/images/asset_a4a423a58d.jpg',
        thumbnail: '/assets/images/bhargava-marripati-7LDBKPWAHJ4-unsplash-scaled.jpg',
        featured: true,
        orderIndex: 1
      },
      {
        name: 'Island Holidays',
        slug: 'island-holidays',
        category: 'island-holidays',
        description: 'Sun-drenched atolls, crystal turquoise waters, private overwater villas, and barefoot tropical relaxation.',
        content: 'Escape to the world’s most pristine island retreats in the Maldives, Mauritius, Seychelles, and Andaman. Indulge in sunset yacht cruises and colorful coral reefs.',
        heroImage: '/assets/images/asset_b0a606c90b.jpg',
        thumbnail: '/assets/images/asset_e33b83aa7a.jpg',
        featured: true,
        orderIndex: 2
      },
      {
        name: 'Family Holidays',
        slug: 'family-holidays',
        category: 'family-holidays',
        description: 'Curated multi-generational vacation itineraries with comfortable pacing, kid-friendly adventures, and interconnecting luxury suites.',
        content: 'Create lifelong shared memories. Our family specialists ensure seamless logistics, private transport, engaging cultural discoveries, and leisure time for everyone.',
        heroImage: '/assets/images/mg-cthu-1h_NN3nqzI-unsplash-scaled.jpg',
        thumbnail: '/assets/images/asset_fd072b807d.jpg',
        featured: true,
        orderIndex: 3
      },
      {
        name: 'Honeymoon Escapes',
        slug: 'honeymoon-escapes',
        category: 'honeymoon-escapes',
        description: 'Romantic secluded hideaways, private beach candlelight dinners, couple spa therapies, and bespoke anniversary journeys.',
        content: 'Celebrate your love in breathtaking destinations. From Swiss Alpine chalets with roaring fires to secluded Maldivian bungalows and tranquil Kerala houseboats.',
        heroImage: '/assets/images/sean-robertson-5ftxFgXLtkI-unsplash-scaled.jpg',
        thumbnail: '/assets/images/asset_b0a606c90b.jpg',
        featured: true,
        orderIndex: 4
      },
      {
        name: 'Luxury Escapes',
        slug: 'luxury-escapes',
        category: 'luxury-escapes',
        description: 'Five-star heritage palatial stays, private helicopter transfers, Michelin-starred gastronomy, and dedicated 24/7 personal concierge.',
        content: 'The ultimate standard in bespoke international travel. Enjoy privileged access, VIP lounge services, and private chauffeur-driven Mercedes touring.',
        heroImage: '/assets/images/Untitled-design-33.png',
        thumbnail: '/assets/images/sergi-ferrete-YXwt-vJ3szA-unsplash-scaled.jpg',
        featured: true,
        orderIndex: 5
      }
    ];

    for (const exp of experiencesData) {
      await Experience.create(exp);
    }

    // 6. Seed Services (Matching reference website)
    console.log('🛎️ Seeding Services...');
    const servicesData = [
      {
        title: 'Tailor-Made Journeys',
        slug: 'tailor-made-journeys',
        description: 'Bespoke itineraries meticulously crafted around your distinct preferences, travel style, and schedule.',
        icon: 'Compass',
        orderIndex: 1
      },
      {
        title: 'Expert Travel Design',
        slug: 'expert-travel-design',
        description: 'Decades of combined destination knowledge ensuring you discover hidden gems beyond standard tourist routes.',
        icon: 'MapPin',
        orderIndex: 2
      },
      {
        title: 'Personalised Itineraries',
        slug: 'personalised-itineraries',
        description: 'Every detail planned with precision, from private chauffeur logistics to unique cultural experiences.',
        icon: 'Calendar',
        orderIndex: 3
      },
      {
        title: 'Exceptional Experiences',
        slug: 'exceptional-experiences',
        description: 'Privileged access, private yacht charters, hot air balloon flights, and authentic culinary masterclasses.',
        icon: 'Sparkles',
        orderIndex: 4
      },
      {
        title: 'Journeys for Every Story',
        slug: 'journeys-for-every-story',
        description: 'Whether celebrating a honeymoon, milestone anniversary, or family gathering, we craft journeys with soul.',
        icon: 'HeartHandshake',
        orderIndex: 5
      },
      {
        title: 'Seamless Travel Support',
        slug: 'seamless-travel-support',
        description: 'Round-the-clock dedicated assistance from departure to return so you can travel with complete peace of mind.',
        icon: 'ShieldCheck',
        orderIndex: 6
      }
    ];

    for (const s of servicesData) {
      await Service.create(s);
    }

    // 7. Seed Testimonials
    console.log('💬 Seeding Testimonials...');
    const testimonialsData = [
      {
        name: 'David & Sarah Jenkins',
        designation: 'Honeymoon Couple',
        location: 'London, United Kingdom',
        photo: '/assets/images/cropped-Logo-02-1.png',
        rating: 5.0,
        message: 'Our European honeymoon was nothing short of perfection! Blackforest Holidays planned every single transfer, mountain train, and hotel seamlessly. The overwater view in Lucerne and the private gondola serenade in Venice will stay in our hearts forever.',
        featured: true,
        orderIndex: 1
      },
      {
        name: 'Rajesh & Meera Nair',
        designation: 'Family Vacationers',
        location: 'Bangalore, India',
        photo: '/assets/images/olivier_d-elephants-6254556-scaled.jpg',
        rating: 5.0,
        message: 'We took our parents and two children on the Kerala Backwaters & Munnar journey. The luxury houseboat was spotless, the chef cooked delicious authentic Karimeen, and our chauffeur was courteous and safe. Absolutely world-class service!',
        featured: true,
        orderIndex: 2
      },
      {
        name: 'Elena Rostova',
        designation: 'Solo Nature Explorer',
        location: 'Zurich, Switzerland',
        photo: '/assets/images/Untitled-design-24.png',
        rating: 5.0,
        message: 'The Kenya wildlife safari exceeded all my wild dreams. Seeing a pride of lions up close in the Mara and witnessing the sunset against Kilimanjaro was unforgettable. Blackforest is truly the premier specialist in curated travel.',
        featured: true,
        orderIndex: 3
      },
      {
        name: 'Marcus & Jessica Vance',
        designation: 'Anniversary Travelers',
        location: 'Sydney, Australia',
        photo: '/assets/images/Untitled-design-18.png',
        rating: 5.0,
        message: 'From the initial consultation to our return flight from the Maldives, everything felt effortless. The private dinner on the sandbank was pure magic. We will never book luxury holidays anywhere else.',
        featured: true,
        orderIndex: 4
      }
    ];

    for (const t of testimonialsData) {
      await Testimonial.create(t);
    }

    // 8. Seed Travel Journal / Articles (Matching reference website)
    console.log('📰 Seeding Travel Journal Articles...');
    const articlesData = [
      {
        title: 'Safety measures for safe trekking in waterfalls',
        slug: 'safety-measures-for-safe-trekking-in-waterfalls',
        excerpt: 'Essential precautions, grip equipment, footwear guidelines, and situational awareness tips when exploring cascading waterfalls.',
        content: `
          <h2>Respecting the Power of Falling Waters</h2>
          <p>Waterfall trekking is one of the most exhilarating nature adventures you can experience. However, wet stone surfaces, moss layers, and sudden flash currents demand proper preparation.</p>
          <h3>1. Choose High-Traction Footwear</h3>
          <p>Never attempt waterfall treks in ordinary running shoes or flip-flops. Invest in specialized amphibian footwear with vibram or sticky rubber outsoles designed to grip wet rock faces.</p>
          <h3>2. Understand Flow Dynamics</h3>
          <p>Water currents are deceptively strong near plunge pools. Always check seasonal water release advisories and never attempt to swim directly under the cascade impact zone.</p>
          <h3>3. Keep Electronics in Dry-Bags</h3>
          <p>Use IPX8 certified roll-top dry bags for passports, mobile phones, and medical supplies.</p>
        `,
        coverImage: '/assets/images/asset_652f40bc47.jpg',
        authorId: editor.id,
        category: 'Trekking & Safety',
        tags: ['Adventure', 'Trekking', 'Waterfalls', 'Safety Tips'],
        featured: true,
        status: 'published'
      },
      {
        title: '10 Tips for best winter hiking experience',
        slug: '10-tips-for-best-winter-hiking-experience',
        excerpt: 'How to conquer sub-zero trails, layer your technical apparel, prevent hydration freezing, and stay warm in snow-clad wilderness.',
        content: `
          <h2>Conquering Alpine Snowtrails with Confidence</h2>
          <p>Winter transforms landscapes into quiet, pristine wonderlands. But cold weather hiking introduces unique physiological demands.</p>
          <h3>1. The Three-Layer Rule</h3>
          <p>A moisture-wicking merino wool base, insulating fleece or down mid-layer, and a waterproof wind-breaking outer shell are non-negotiable.</p>
          <h3>2. Prevent Water Freezing</h3>
          <p>Store your water bottles upside down inside insulated sleeves—ice forms from the top down, keeping the drinking valve clear.</p>
          <h3>3. Microspikes and Snowshoes</h3>
          <p>Carry microspikes for icy hard-pack trails to eliminate slip hazards.</p>
        `,
        coverImage: '/assets/images/adv-activity-detail-new-2-4.jpg',
        authorId: editor.id,
        category: 'Mountain Expeditions',
        tags: ['Winter', 'Hiking', 'Alps', 'Gear'],
        featured: true,
        status: 'published'
      },
      {
        title: 'How to select perfect quality camping tent',
        slug: 'how-to-select-perfect-quality-camping-tent',
        excerpt: 'A comprehensive guide on tent architecture, hydrostatic head ratings, pole materials, and weight optimization for expeditions.',
        content: `
          <h2>Your Sanctuary in the Wild</h2>
          <p>Your tent is your home when miles away from civilization. Choosing the right shelter depends on seasonality, terrain, and weather intensity.</p>
          <h3>1. Three-Season vs. Four-Season</h3>
          <p>Three-season tents prioritize ventilation with mesh panels, while four-season expedition tents feature robust geodesic dome geometry built to withstand heavy snowfall and gale-force winds.</p>
          <h3>2. Hydrostatic Head Rating</h3>
          <p>Look for flysheet fabric with a minimum of 3,000mm hydrostatic head rating to guarantee dry comfort through torrential downpours.</p>
        `,
        coverImage: '/assets/images/ChatGPT-Image-Aug-8-2026-06_49_29-PM.png',
        authorId: editor.id,
        category: 'Gear & Equipment',
        tags: ['Camping', 'Equipment', 'Tents', 'Outdoor'],
        featured: true,
        status: 'published'
      }
    ];

    for (const a of articlesData) {
      await Article.create(a);
    }

    // 9. Seed Expertise (Certified tourism boards matching reference site)
    console.log('🏆 Seeding Expertise Partners...');
    const expertiseData = [
      {
        name: 'Peru Specialist',
        logo: '/assets/images/placeholder-2.png',
        description: 'Certified Specialist in Inca Heritage & Machu Picchu Expeditions',
        link: 'https://www.peru.travel',
        orderIndex: 1
      },
      {
        name: 'Korea Tourism Board',
        logo: '/assets/images/louise-smith-_n3uNLUh6hU-unsplash-scaled.jpg',
        description: 'Accredited South Korea Culture & Destination Planner',
        link: 'https://english.visitkorea.or.kr',
        orderIndex: 2
      },
      {
        name: 'Greece Tourism Organisation',
        logo: '/assets/images/WhatsApp-Image-2026-07-24-at-09.58.14-removebg-preview.png',
        description: 'Official Hellenic Islands & Classical Greece Specialist',
        link: 'https://www.visitgreece.gr',
        orderIndex: 3
      },
      {
        name: 'Japan National Tourism Organization',
        logo: '/assets/images/day-city-view-scaled.jpg',
        description: 'Certified Japan Travel Consultant',
        link: 'https://www.japan.travel',
        orderIndex: 4
      },
      {
        name: 'IATA Certified',
        logo: '/assets/images/robin-noguier-sydwCr54rf0-unsplash-scaled.jpg',
        description: 'Accredited International Air Transport Association Partner',
        link: 'https://www.iata.org',
        orderIndex: 5
      },
      {
        name: 'Visit Portugal',
        logo: '/assets/images/ChatGPT-Image-Aug-8-2026-09_18_57-PM-1000x685.png',
        description: 'Certified Portuguese Wine & Heritage Planner',
        link: 'https://www.visitportugal.com',
        orderIndex: 6
      },
      {
        name: 'Algarve Tourism',
        logo: '/assets/images/asset_e33b83aa7a.jpg',
        description: 'Southern Coastal Portugal Luxury Specialist',
        link: 'https://www.visitalgarve.pt',
        orderIndex: 7
      },
      {
        name: 'Turespaña – Spain Specialist',
        logo: '/assets/images/joss-woodhead-3wFRlwS91yk-unsplash-scaled.jpg',
        description: 'Official Spain Tourism Qualified Specialist',
        link: 'https://www.spain.info',
        orderIndex: 8
      }
    ];

    for (const exp of expertiseData) {
      await Expertise.create(exp);
    }

    // 10. Seed Navigation
    console.log('🧭 Seeding Navigation Menus...');
    const navItems = [
      { label: 'Destinations', url: '/destinations', type: 'header', orderIndex: 1 },
      { label: 'Experiences', url: '/experiences', type: 'header', orderIndex: 2 },
      { label: 'Concierge', url: '/concierge', type: 'header', orderIndex: 3 },
      { label: 'Corporate Travel', url: '/corporate-travel', type: 'header', orderIndex: 4 },
      { label: 'Coach Tour', url: '/coach-tour', type: 'header', orderIndex: 5 },
      { label: 'About', url: '/about', type: 'header', orderIndex: 6 },
      { label: 'Contact', url: '/contact', type: 'header', orderIndex: 7 }
    ];

    for (const n of navItems) {
      await Navigation.create(n);
    }

    // 11. Enquiries - Clean state (no dummy records)
    console.log('📬 Enquiries table ready for real submissions.');

    console.log('🎉 Database seeding completed successfully in MySQL!');
    console.log('----------------------------------------------------');
    console.log('Admin Credentials for Login:');
    console.log('Email: admin@blackforestholidays.com');
    console.log('Password: Admin@123456');
    console.log('----------------------------------------------------');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};

seedDatabase();
