import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Plane, ShieldCheck, Car } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';
import HeroWave from '../../components/common/HeroWave';


export default function ConciergePage() {
  const location = useLocation();
  const path = location.pathname;
  const { openEnquiryModal } = useSettings();

  let serviceKey = 'flights';
  if (path.includes('visa-assistance')) serviceKey = 'visas';
  else if (path.includes('cruises')) serviceKey = 'cruises';
  else if (path.includes('flight-booking')) serviceKey = 'flights';

  const details = {
    flights: {
      title: 'Flight Booking',
      cursiveSubtitle: 'Flight Booking, Airport Transfers & Travel Insurance',
      heroImage: '/assets/images/Pngtree-worldwide-flight-adventure-a-3d_5773140-scaled.jpg',

      intro: {
        heading: 'Everything You Need for a Seamless Journey',
        paragraphs: [
          'From international flight booking to arranging smooth airport transfers and suitable travel insurance, BlackForest Holidays provides essential travel services under one roof. We make every journey simple, convenient, and hassle-free, helping you travel with confidence from departure to arrival.',
        ],
        image: '/assets/images/alexey-starki-91ykdj2WQeg-unsplash-scaled.jpg',
      },

      extraBlocks: [
        {
          cursiveSubtitle: 'Flight Booking',
          icon: 'plane',
          heading: 'Flights Made Simple',
          text: 'Find the right flight for your journey with personalised assistance for domestic and international travel. We help you compare suitable flight options, schedules, fares, and travel requirements based on your preferences.',
        },
      ],

      servicesList: {
        heading: 'Our Flight Booking Services',
        type: 'two-column',
        items: [
          'Domestic & International Flights',
          'One-Way & Return Tickets',
          'Multi-City & Connecting Flights',
          'Business & Premium Class',
          'Group Flight Bookings',
          'Corporate Flight Reservations',
          'Family & Honeymoon Travel',
          'Flight Changes & Cancellation Assistance',
          'Special Meal & Seat Requests',
          'Frequent Flyer Assistance',
        ],
      },

      destinations: {
        heading: 'Explore Extraordinary Destinations',
        text: 'Discover the dramatic landscapes of Switzerland and Iceland, the wilderness of Africa, the rainforests of Southeast Asia, the mountains of Nepal and Bhutan, the natural wonders of Australia and New Zealand, and spectacular destinations across the world.',
      },

      carouselImages: [
        '/assets/images/Untitled-design-48.png',
        '/assets/images/Untitled-design-47.png',
        '/assets/images/Untitled-design-50.png',
        '/assets/images/Untitled-design-49.png',
      ],

      whyChooseUs: {
        cursiveSubtitle: 'Why Choose Us',
        heading: 'Why Choose BlackForest Holidays?',
        bgImage: '/assets/images/contact-pine-bg-2.jpg',
        features: [
          { title: 'Tailor-Made Adventures', desc: 'Every journey is designed around your interests, comfort level, and sense of adventure.' },
          { title: 'Authentic Experiences', desc: 'Go beyond the typical sightseeing itinerary and discover destinations through meaningful experiences.' },
          { title: 'Expertly Planned Journeys', desc: 'We carefully coordinate accommodation, guides, activities, transportation, and experiences.' },
          { title: 'Comfort Meets Adventure', desc: 'Enjoy exciting adventures without compromising on comfort, quality, or seamless travel.' },
        ],
      },

      midSection: {
        cursiveSubtitle: 'Fly Further',
        heading: 'Explore The World With Peace Of Mind',
        text: "Whether you're seeking the thrill of a mountain expedition, the serenity of a rainforest, the excitement of a safari, or simply a deeper connection with nature, BlackForest Holidays creates journeys that inspire you to explore further.",
        ctaLabel: 'Go Further and Explore More.',
        buttonText: 'Book your Flights',
        image: '/assets/images/global-residence-index-wOj5HTw2YMc-unsplash-scaled.jpg',
      },

      secondaryFeature: {
        cursiveSubtitle: 'Airport Transfers',
        icon: 'car',
        heading: 'Arrive Smoothly. Travel Comfortably.',
        text: 'Start and finish your journey with reliable airport transportation. We arrange airport transfers tailored to your destination, schedule, group size, and travel requirements.',
        listHeading: 'Our Airport Transfer Services',
        itemsLeft: ['Airport Pickup & Drop', 'Private Transfers', 'Luxury Transfers', 'Hotel Transfers', 'Corporate Transfers'],
        itemsRight: ['Group & Family Transfers', 'Meet & Greet Services', 'Intercity Transfers', 'Chauffeur Services', '24/7 Transfer Assistance'],
      },

      tertiaryFeature: {
        cursiveSubtitle: 'Travel Insurance',
        icon: 'shield',
        heading: 'Travel With Confidence',
        paragraphs: [
          'Unexpected situations can happen while travelling. The right travel insurance can provide valuable protection against eligible medical emergencies, trip cancellations, baggage-related issues, and other travel disruptions.',
          'We help you understand available travel insurance options based on your destination, journey, and travel requirements.',
        ],
      },

      finalSection: {
        cursiveSubtitle: 'Travel Assistance',
        heading: 'Travel With Confidence, Travel With Protection',
        text: "Don't let complicated paperwork stand between you and your next destination. Let BlackForest Holidays help you prepare your visa application with greater clarity, confidence, and peace of mind.",
        ctaLabel: 'Need Travel Assistance?',
        buttonText: 'Talk to Our Travel Experts',
        collageImages: [
          '/assets/images/Visitor-Visa-new-zealand.jpg',
          '/assets/images/ChatGPT-Image-Aug-8-2026-06_30_11-PM.png',
          '/assets/images/sacha-verheij-5bwgW8_9OPs-unsplash-scaled.jpg',
        ],
        watermark: '/assets/images/about-compass.jpg',
        quote: 'A Vision created for the activities to make sure you enjoy & get thrilled.',
      },
    },

    visas: {
      title: 'Visa Assistance',
      cursiveSubtitle: 'Visa Assistance',
      heroImage: '/assets/images/ChatGPT-Image-Aug-8-2026-06_30_11-PM-2.png',

      intro: {
        heading: 'Visa Assistance Made Simple',
        paragraphs: [
          'Planning an international journey should be exciting, not stressful. At BlackForest Holidays, we provide personalised visa assistance services to help you understand visa requirements, prepare the necessary documents, and navigate the application process with confidence.',
          'From tourist and business visas to family visits and other travel purposes, our experienced team provides practical guidance based on your destination and travel requirements.',
        ],
        image: '/assets/images/freepik__make-an-image-on-visitor-visa-add-a-flight-a-passp__37353.jpeg.webp',
      },

      extraBlocks: [
        {
          heading: 'Your Journey Starts With the Right Documentation',
          text: 'Visa requirements vary by destination, nationality, travel purpose, and individual circumstances. We help you understand what is required before you submit your application.',
        },
      ],

      servicesList: {
        heading: 'Our Visa Assistance Services',
        type: 'numbered-dash',
        items: [
          { title: 'Tourist Visa Assistance', desc: 'Guidance for holidays, vacations, sightseeing, and leisure travel.' },
          { title: 'Business Visa Assistance', desc: 'Professional support for business trips, meetings, conferences, exhibitions, and corporate travel.' },
          { title: 'Family & Visit Visa Assistance', desc: 'Guidance for visiting family, friends, or relatives overseas.' },
          { title: 'eVisa Assistance', desc: 'Support with eligible online visa applications, documentation, and submission requirements.' },
          { title: 'Visa Documentation Support', desc: 'We help you organise and review the required documents, forms, photographs, financial documents, travel details, and supporting paperwork.' },
          { title: 'Visa Application Review', desc: 'A careful review of your application and supporting documents before submission to help identify missing or inconsistent information.' },
          { title: 'Appointment Assistance', desc: 'Guidance with visa appointment scheduling and preparation for the relevant visa application centre or embassy process.' },
          { title: 'Visa Status Guidance', desc: 'Assistance with understanding application status updates and the next steps during the processing period.' },
        ],
      },

      popularDestinations: {
        heading: 'Popular Visa Destinations',
        intro: 'We assist travellers with visa applications for destinations across:',
        list: ['Europe', 'UK', 'USA & Canada', 'Australia & New Zealand', 'Middle East', 'Southeast Asia', 'Asia', 'Africa'],
        outro: 'Visa requirements and processing procedures can change, so we provide destination-specific guidance based on the latest available requirements.',
      },

      carouselImages: [
        '/assets/images/Untitled-design-55.png',
        '/assets/images/Untitled-design-56.png',
        '/assets/images/Untitled-design-58.png',
        '/assets/images/Untitled-design-57.png',
        '/assets/images/WhatsApp-Image-2026-08-06-at-16.30.00.jpeg',
      ],

      whyChooseUs: {
        cursiveSubtitle: 'Why Choose Us',
        heading: 'Why Choose BlackForest Holidays?',
        bgImage: '/assets/images/contact-pine-bg-2.jpg',
        features: [
          { title: 'Expert Visa Guidance', desc: 'We provide clear, structured guidance to help you navigate specific visa requirements with confidence.' },
          { title: 'Document Verification', desc: 'Thorough review of your paperwork to help identify missing details or inconsistencies before submission.' },
          { title: 'End-to-End Support', desc: 'From initial consultation to appointment scheduling and status updates, we support you at every stage.' },
          { title: 'Global Reach', desc: 'Assisting travellers with tourist, business, and visit visas for popular destinations worldwide.' },
        ],
      },

      finalSection: {
        cursiveSubtitle: 'Visa Support',
        heading: 'Start Your Visa Journey With Confidence',
        text: "Don't let complicated paperwork stand between you and your next destination. Let BlackForest Holidays help you prepare your visa application with greater clarity, confidence, and peace of mind.",
        ctaLabel: 'Need Visa Assistance?',
        buttonText: 'Talk to Our Visa Experts',
        collageImages: [
          '/assets/images/Visitor-Visa-new-zealand.jpg',
          '/assets/images/ChatGPT-Image-Aug-8-2026-06_30_11-PM.png',
          '/assets/images/sacha-verheij-5bwgW8_9OPs-unsplash-scaled.jpg',
        ],
        watermark: '/assets/images/about-compass.jpg',
        quote: 'A Vision created for the activities to make sure you enjoy & get thrilled.',
      },
    },

    cruises: {
      title: 'Cruises',
      cursiveSubtitle: 'Cruises',
      heroImage: '/assets/images/pexels-g-isle-px-210751289-11820070-scaled.jpg',

      intro: {
        heading: 'Discover the World, One Extraordinary Journey at a Time',
        paragraphs: [
          "Set sail on unforgettable journeys across the world's most spectacular coastlines and destinations with our cruise ticket booking services. BlackForest Holidays creates personalised cruise holidays that combine exceptional accommodation, fine dining, entertainment, and extraordinary experiences, allowing you to explore multiple destinations in one seamless and memorable journey.",
        ],
        image: '/assets/images/ChatGPT-Image-Aug-8-2026-06_20_36-PM.png',
      },

      extraBlocks: [
        {
          heading: 'Cruising, Curated Around You',
          text: "Whether you're looking for a romantic escape, a family adventure, a luxury voyage, or a group holiday, we help you choose the right cruise, itinerary, cabin, and experiences to match your travel style.",
        },
      ],

      servicesList: {
        heading: 'Our Cruise Experiences',
        type: 'dash',
        items: [
          { title: 'Luxury Cruises', desc: 'Experience world-class service, elegant accommodation, exceptional dining, and unforgettable destinations.' },
          { title: 'Family Cruises', desc: 'Enjoy family-friendly entertainment, activities, facilities, and itineraries designed for every generation.' },
          { title: 'Honeymoon Cruises', desc: 'Celebrate your new beginning with romantic destinations, ocean views, private experiences, and unforgettable moments.' },
          { title: 'River Cruises', desc: "Discover Europe's iconic rivers and historic cities through relaxed, scenic journeys." },
          { title: 'Ocean Cruises', desc: "Explore spectacular coastlines, islands, and international destinations aboard some of the world's finest cruise ships." },
          { title: 'Expedition Cruises', desc: 'Go beyond the ordinary with extraordinary journeys to remote landscapes and remarkable destinations.' },
        ],
      },

      destinations: {
        heading: 'Explore Extraordinary Destinations',
        text: 'Discover the Mediterranean, Northern Europe, Alaska, the Caribbean, Southeast Asia, the Middle East, Australia & New Zealand, and destinations across the world. From island-hopping through the Mediterranean to exploring the fjords of Norway or relaxing among the turquoise waters of the Caribbean, we help you find the cruise that fits your journey.',
      },

      carouselImages: [
        '/assets/images/Untitled-design-54.png',
        '/assets/images/Untitled-design-52.png',
        '/assets/images/Untitled-design-51.png',
        '/assets/images/Untitled-design-53.png',
      ],

      whyChooseUs: {
        cursiveSubtitle: 'Why Choose Us',
        heading: 'Why Choose BlackForest Holidays?',
        bgImage: '/assets/images/contact-pine-bg-2.jpg',
        features: [
          { title: 'Expert Cruise Selection', desc: 'We help you choose the right cruise line, ship, itinerary, and cabin based on your preferences.' },
          { title: 'Personalised Planning', desc: 'Every cruise journey can be tailored with flights, hotels, transfers, excursions, and pre- or post-cruise stays.' },
          { title: 'Complete Travel Support', desc: 'From booking to boarding, our team helps coordinate the essential details of your journey.' },
          { title: 'Curated Experiences', desc: 'Make the most of every destination with carefully selected shore excursions and travel experiences.' },
        ],
      },

      midSection: {
        cursiveSubtitle: 'Begin Your Voyage',
        heading: 'Your Journey Begins at Sea',
        text: "Whether you're dreaming of a romantic Mediterranean voyage, a family cruise through the Caribbean, a luxury river journey through Europe, or an expedition to the world's remote corners, BlackForest Holidays helps turn your cruise dreams into an extraordinary journey.",
        ctaLabel: 'Sail Further. Discover More.',
        buttonText: 'Explore Cruise Holidays',
        image: '/assets/images/Horizon-Lounge-Dining-Venue-copy-scaled.avif',
      },

      trailingCollage: {
        images: [
          '/assets/images/pngtree-cruise-ship-that-is-sitting-on-a-tropical-island-image_2615573.jpg',
          '/assets/images/ChatGPT-Image-Aug-8-2026-06_49_29-PM.png',
        ],
        watermark: '/assets/images/about-compass.jpg',
        quote: 'A Vision created for the activities to make sure you enjoy & get thrilled.',
      },
    },
  };

  const data = details[serviceKey];

  // ------------------------------
  // Carousel logic
  // ------------------------------
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const carouselImages = data.carouselImages || [];

  React.useEffect(() => {
    setCurrentSlide(0);
    if (carouselImages.length < 2) return undefined;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [serviceKey, carouselImages.length]);

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  const getVisibleImages = () => {
    if (!carouselImages.length) return [];
    return [
      carouselImages[currentSlide],
      carouselImages[(currentSlide + 1) % carouselImages.length],
      carouselImages[(currentSlide + 2) % carouselImages.length],
    ];
  };

  const IconFor = ({ icon }) => {
    if (icon === 'car') return <Car className="w-4 h-4" />;
    if (icon === 'shield') return <ShieldCheck className="w-4 h-4" />;
    return <Plane className="w-4 h-4" />;
  };

  return (
    <div className="animate-fadeIn bg-white font-sans text-gray-800 overflow-x-hidden">

      {/* 1. Hero */}
      <section className="relative h-[65vh] min-h-[500px] flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src={data.heroImage} alt={data.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/35 z-0" />
        </div>

        <div className="relative z-10 text-white flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold tracking-tight mb-4 drop-shadow-xl font-sans">
            {data.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-light drop-shadow-md tracking-wider">
            <Link to="/" className="hover:text-gray-200 transition-colors">Home</Link>
            <span className="text-[10px] opacity-80">▾</span>
            <span className="text-white">{data.title}</span>
          </div>
        </div>

        {/* Hero Wave Divider */}
        <HeroWave />
      </section>

      {/* 2. Intro */}
      <section className="bg-white -mt-2 pb-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">

            <div className="space-y-8 lg:pr-4">
              <div>
                <span
                  className="text-2xl sm:text-3xl block mb-2 text-[#27B8B1] tracking-wide font-cursive"
                  style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
                >
                  {data.cursiveSubtitle}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#7cb342] leading-tight font-sans mb-6">
                  {data.intro.heading}
                </h2>
                <div className="w-16 h-[3px] bg-[#27B8B1] mb-8 rounded-full" />
              </div>

              <div className="space-y-6">
                {data.intro.paragraphs.map((p, i) => (
                  <p key={i} className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="relative pl-6 pt-6 mt-8 lg:mt-0 w-full max-w-lg mx-auto lg:ml-auto">
              <div className="absolute top-0 left-0 w-[95%] h-[95%] border-[3px] border-[#18c4c7] z-0" />
              <img
                src={data.intro.image}
                alt={data.title}
                className="relative z-10 w-full h-auto object-cover shadow-sm bg-white p-2 aspect-[4/3]"
              />
            </div>

          </div>

          {/* Extra sub-blocks */}
          {(data.extraBlocks || []).map((block, i) => (
            <div key={i} className="max-w-7xl pt-10">
              {block.cursiveSubtitle ? (
                <div>
                  <span
                    className="text-2xl sm:text-3xl block mb-1 text-[#27B8B1] tracking-wide font-cursive"
                    style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
                  >
                    {block.cursiveSubtitle}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#7cb342] leading-tight font-sans mb-4">
                    {block.heading}
                  </h2>
                  <div className="w-16 h-[3px] bg-[#27B8B1] mb-6 rounded-full" />
                </div>
              ) : (
                <h3 className="text-xl sm:text-2xl font-bold text-[#10221b] font-sans mb-3">
                  {block.icon ? `${block.icon} ` : ''}{block.heading}
                </h3>
              )}
              <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                {block.text}
              </p>
            </div>
          ))}

          {/* Services list — two-column / numbered / numbered-dash / dash */}
          {data.servicesList && (
            <div className="max-w-7xl pt-10">
              <h3 className="text-xl sm:text-2xl font-bold text-[#10221b] font-sans mb-4">
                {data.servicesList.heading}
              </h3>

              {(data.servicesList.type === 'two-column' || data.servicesList.type === 'numbered') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
                  <ul className="space-y-3">
                    {data.servicesList.items.slice(0, Math.ceil(data.servicesList.items.length / 2)).map((item, idx) => (
                      <li key={idx} className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                        • {item}
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-3">
                    {data.servicesList.items.slice(Math.ceil(data.servicesList.items.length / 2)).map((item, idx) => (
                      <li key={idx} className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {data.servicesList.type === 'numbered-dash' && (
                <ul className="space-y-3">
                  {data.servicesList.items.map((item, idx) => (
                    <li key={idx} className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                      {idx + 1}. <span className="text-gray-900 font-bold">{item.title}</span> – {item.desc}
                    </li>
                  ))}
                </ul>
              )}

              {data.servicesList.type === 'dash' && (
                <ul className="space-y-3">
                  {data.servicesList.items.map((item, idx) => (
                    <li key={idx} className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                      <span className="text-gray-900 font-bold">{item.title}</span> – {item.desc}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Popular Visa Destinations */}
          {data.popularDestinations && (
            <div className="max-w-7xl pt-10">
              <h3 className="text-xl sm:text-2xl font-bold text-[#10221b] font-sans mb-3">
                {data.popularDestinations.heading}
              </h3>
              <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans mb-3">
                {data.popularDestinations.intro}
              </p>
              <p className="text-[#10221b] font-bold text-[20px] font-sans mb-3">
                {data.popularDestinations.list.join(' | ')}
              </p>
              <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                {data.popularDestinations.outro}
              </p>
            </div>
          )}

          {/* Destinations paragraph block */}
          {data.destinations && (
            <div className="max-w-7xl pt-10 pb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-[#10221b] font-sans mb-3">
                {data.destinations.heading}
              </h3>
              <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                {data.destinations.text}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Carousel */}
      {carouselImages.length > 0 && (
        <section className="relative py-20 overflow-hidden group">
          <div className="absolute inset-0 w-full h-full flex z-0 pointer-events-none">
            <div className="w-[30%] h-full bg-[#f6f6f6]" />
            <div className="w-[70%] h-full bg-white" />
          </div>

          <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 relative z-10 flex items-center justify-between gap-4 md:gap-8">
            <button
              onClick={handlePrev}
              aria-label="Previous"
              className="z-20 flex items-center justify-center text-[#10221b] hover:text-[#5e963b] transition-all transform hover:scale-110 hover:-translate-x-2 shrink-0 cursor-pointer"
            >
              <svg viewBox="0 0 100 40" className="w-16 h-16 sm:w-24 sm:h-24 stroke-current fill-none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M90 20 Q 55 18 10 20" />
                <path d="M 12 20 Q 25 12 30 7" />
                <path d="M 12 20 Q 25 28 30 33" />
              </svg>
            </button>

            <div className="flex-1 overflow-hidden px-2">
              <div className="flex justify-center gap-4 sm:gap-6 md:gap-10 transition-all duration-700 ease-in-out">
                {getVisibleImages().map((img, idx) => (
                  <div key={`${currentSlide}-${idx}`} className="w-1/3 max-w-[400px] aspect-square overflow-hidden shadow-lg animate-fadeIn flex-shrink-0">
                    <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              aria-label="Next"
              className="z-20 flex items-center justify-center text-[#10221b] hover:text-[#5e963b] transition-all transform hover:scale-110 hover:translate-x-2 shrink-0 cursor-pointer"
            >
              <svg viewBox="0 0 100 40" className="w-16 h-16 sm:w-24 sm:h-24 stroke-current fill-none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 20 Q 45 22 90 20" />
                <path d="M 88 20 Q 75 12 70 7" />
                <path d="M 88 20 Q 75 28 70 33" />
              </svg>
            </button>
          </div>
        </section>
      )}

      {/* 4. Why Choose Us */}
      {data.whyChooseUs && (
        <section className="py-7 bg-white relative z-10 overflow-hidden">
          {data.whyChooseUs.bgImage && (
            <div className="absolute right-0 top-0 bottom-0 w-72 md:w-96 pointer-events-none opacity-25 z-0 overflow-hidden">
              <img
                src={data.whyChooseUs.bgImage}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-left"
              />
            </div>
          )}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <span
              className="text-2xl sm:text-3xl block mb-2 text-[#27B8B1] tracking-wide font-cursive"
              style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
            >
              {data.whyChooseUs.cursiveSubtitle || 'Why Choose Us'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#7cb342] leading-tight font-sans mb-4">
              {data.whyChooseUs.heading}
            </h2>
            <div className="w-16 h-[3px] bg-[#27B8B1] mb-12 rounded-full" />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10 max-w-full">
              {data.whyChooseUs.features.map((f, idx) => (
                <div key={idx}>
                  <h4 className="text-[19px] sm:text-[20px] font-bold text-[#10221b] mb-2 font-sans">
                    {f.title}
                  </h4>
                  <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Mid section: heading + text + CTA button + single image */}
      {data.midSection && (
        <section className="py-24 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div>
                  {data.midSection.cursiveSubtitle && (
                    <span
                      className="text-2xl sm:text-3xl block mb-1 text-[#27B8B1] tracking-wide font-cursive"
                      style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
                    >
                      {data.midSection.cursiveSubtitle}
                    </span>
                  )}
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#7cb342] leading-tight font-sans mb-4">
                    {data.midSection.heading}
                  </h2>
                  <div className="w-16 h-[3px] bg-[#27B8B1] mb-6 rounded-full" />
                </div>
                <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans max-w-md">
                  {data.midSection.text}
                </p>
                <div className="pt-4">
                  <h4 className="text-sm font-bold text-[#10221b] uppercase tracking-[0.15em] mb-4 font-sans">
                    {data.midSection.ctaLabel}
                  </h4>
                  <button
                    onClick={() => openEnquiryModal({ title: `${data.title} Enquiry` })}
                    className="bg-[#10221b] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#7cb342] transition-colors shadow-md rounded-sm cursor-pointer"
                  >
                    {data.midSection.buttonText} &rarr;
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-sm shadow-md">
                <img
                  src={data.midSection.image}
                  alt={data.title}
                  className="w-full h-[380px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Secondary feature block with two-column list (Airport Transfers) */}
      {data.secondaryFeature && (
        <section className="py-20 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span
              className="text-2xl sm:text-3xl block mb-1 text-[#27B8B1] tracking-wide font-cursive"
              style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
            >
              {data.secondaryFeature.cursiveSubtitle || 'Airport Transfers'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#7cb342] leading-tight font-sans mb-4">
              {data.secondaryFeature.heading}
            </h2>
            <div className="w-16 h-[3px] bg-[#27B8B1] mb-6 rounded-full" />
            <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans mb-8">
              {data.secondaryFeature.text}
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-[#10221b] font-sans mb-4">
              {data.secondaryFeature.listHeading}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
              <ul className="space-y-3">
                {data.secondaryFeature.itemsLeft.map((item, idx) => (
                  <li key={idx} className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">• {item}</li>
                ))}
              </ul>
              <ul className="space-y-3">
                {data.secondaryFeature.itemsRight.map((item, idx) => (
                  <li key={idx} className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 7. Tertiary feature block, text only (Travel Insurance) */}
      {data.tertiaryFeature && (
        <section className="py-20 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span
              className="text-2xl sm:text-3xl block mb-1 text-[#27B8B1] tracking-wide font-cursive"
              style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
            >
              {data.tertiaryFeature.cursiveSubtitle || 'Travel Insurance'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#7cb342] leading-tight font-sans mb-4">
              {data.tertiaryFeature.heading}
            </h2>
            <div className="w-16 h-[3px] bg-[#27B8B1] mb-6 rounded-full" />
            <div className="space-y-4">
              {data.tertiaryFeature.paragraphs.map((p, i) => (
                <p key={i} className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Final section — heading, text, CTA button, collage + watermark + quote */}
      {data.finalSection && (
        <section className="py-24 bg-white relative z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <div className="space-y-8">
                <div>
                  <span
                    className="text-2xl sm:text-3xl block mb-1 text-[#27B8B1] tracking-wide font-cursive"
                    style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
                  >
                    {data.finalSection.cursiveSubtitle || 'Travel Assistance'}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-bold text-[#7cb342] leading-tight font-sans mb-4">
                    {data.finalSection.heading}
                  </h3>
                  <div className="w-16 h-[3px] bg-[#27B8B1] mb-6 rounded-full" />
                </div>

                <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans max-w-md">
                  {data.finalSection.text}
                </p>

                <div className="pt-2">
                  <h4 className="text-sm font-bold text-[#10221b] uppercase tracking-[0.15em] mb-4 font-sans">
                    {data.finalSection.ctaLabel}
                  </h4>
                  <button
                    onClick={() => openEnquiryModal({ title: `${data.title} Enquiry` })}
                    className="bg-[#10221b] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#7cb342] transition-colors shadow-md rounded-sm cursor-pointer"
                  >
                    {data.finalSection.buttonText} &rarr;
                  </button>
                </div>
              </div>

              <div className="relative">
                {data.finalSection.watermark && (
                  <div
                    className="absolute top-[-8%] right-[-8%] w-[120%] h-[120%] opacity-15 pointer-events-none bg-contain bg-no-repeat z-0"
                    style={{ backgroundImage: `url('${data.finalSection.watermark}')` }}
                  />
                )}
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="space-y-4 pt-12">
                    <div className="overflow-hidden rounded-sm shadow-sm">
                      <img src={data.finalSection.collageImages[0]} alt="Collage 1" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="overflow-hidden rounded-sm shadow-sm">
                      <img src={data.finalSection.collageImages[1]} alt="Collage 2" className="w-full h-56 object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                  </div>
                  <div>
                    <div className="overflow-hidden rounded-sm shadow-md">
                      <img src={data.finalSection.collageImages[2]} alt="Collage 3" className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="mt-8">
                      <h4 className="text-[#7cb342] text-2xl sm:text-[28px] font-bold leading-tight font-sans">
                        {data.finalSection.quote}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 9. Trailing collage (cruises) — two photos + watermark + quote, no CTA */}
      {data.trailingCollage && (
        <section className="pb-24 bg-white relative z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              {data.trailingCollage.watermark && (
                <div
                  className="absolute top-[-8%] right-[-8%] w-[60%] h-[120%] opacity-15 pointer-events-none bg-contain bg-no-repeat z-0"
                  style={{ backgroundImage: `url('${data.trailingCollage.watermark}')` }}
                />
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center relative z-10">
                <div className="overflow-hidden rounded-sm shadow-md">
                  <img src={data.trailingCollage.images[0]} alt="Cruise" className="w-full h-[320px] object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="space-y-6">
                  <div className="overflow-hidden rounded-sm shadow-md">
                    <img src={data.trailingCollage.images[1]} alt="Cruise" className="w-full h-[220px] object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <h4 className="text-[#7cb342] text-2xl sm:text-[28px] font-bold leading-tight font-sans">
                    {data.trailingCollage.quote}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}