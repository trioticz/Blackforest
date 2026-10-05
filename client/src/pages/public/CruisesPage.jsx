import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../../context/SiteSettingsContext';
import HeroWave from '../../components/common/HeroWave';

const cruiseUploadImages = [
  '/assets/uploads/Cruise_images/1912240620312026.jpg',
  '/assets/uploads/Cruise_images/2002260756529264.jpg',
  '/assets/uploads/Cruise_images/2002260804071560.jpg',
  '/assets/uploads/Cruise_images/2002260815352706.jpg',
  '/assets/uploads/Cruise_images/2009180841458359.jpg',
  '/assets/uploads/Cruise_images/20120304414770.jpg',
  '/assets/uploads/Cruise_images/2012030441483467.jpg',
  '/assets/uploads/Cruise_images/2012030441484284.jpg',
  '/assets/uploads/Cruise_images/2012250605258841.jpg',
  '/assets/uploads/Cruise_images/2012250625472923.jpg',
  '/assets/uploads/Cruise_images/20170303171617.png',
  '/assets/uploads/Cruise_images/20170314130600.png',
  '/assets/uploads/Cruise_images/20170503184757.png',
  '/assets/uploads/Cruise_images/20170504112032.png'
];

export default function CruisesPage() {
  const { openEnquiryModal } = useSettings();
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = cruiseUploadImages;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!carouselImages.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

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

  return (
    <div className="animate-fadeIn bg-white font-sans text-gray-800 overflow-x-hidden">

      {/* 1. Hero Section (Matching Screenshot) */}
      <section className="relative h-[65vh] min-h-[500px] flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src={'/assets/images/pexels-g-isle-px-210751289-11820070-scaled.jpg'}
            alt="Cruises"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35 z-0" />
        </div>

        <div className="relative z-10 text-white flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold tracking-tight mb-4 drop-shadow-xl font-sans">
            Cruises
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-light drop-shadow-md tracking-wider">
            <Link to="/" className="hover:text-gray-200 transition-colors">Home</Link>
            <span className="text-[10px] opacity-80">▾</span>
            <span className="text-white">Cruises</span>
          </div>
        </div>

        {/* Hero Wave Divider */}
        <HeroWave />
      </section>

      {/* 2. Intro Section (Matching Screenshot) */}
      <section className="bg-white -mt-2 pb-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">

          {/* Row 1: Intro Text and Image with cyan border */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
            <div className="space-y-8 lg:pr-4">
              <div>
                <span
                  className="text-2xl sm:text-3xl block mb-2 text-[#27B8B1] tracking-wide font-cursive"
                  style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
                >
                  Luxury Ocean Journeys
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#7cb342] leading-tight font-sans mb-6">
                  Discover the World, One Extraordinary Journey at a Time
                </h2>
                <div className="w-16 h-[3px] bg-[#27B8B1] mb-8 rounded-full" />
              </div>

              <div className="space-y-6 text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                <p>
                  Set sail on unforgettable journeys across the world’s most spectacular coastlines and destinations with our cruise ticket booking services. BlackForest Holidays creates personalised cruise holidays that combine exceptional accommodation, fine dining, entertainment, and extraordinary experiences, allowing you to explore multiple destinations in one seamless and memorable journey.
                </p>
              </div>
            </div>

            <div className="relative pl-6 pt-6 mt-8 lg:mt-0 w-full max-w-lg mx-auto lg:ml-auto">
              <div className="absolute top-0 left-0 w-[95%] h-[95%] border-[3px] border-[#18c4c7] z-0" />
              <img
                src={'/assets/images/ChatGPT-Image-Aug-8-2026-06_20_36-PM.png'}
                alt="Discover the World on Cruises"
                className="relative z-10 w-full h-auto object-cover shadow-sm bg-white p-2 aspect-[4/3]"
              />
            </div>
          </div>

          {/* Row 2: Subsequent Content */}
          <div className="space-y-10">
            <div>
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#10221b] mb-3">
                Cruising, Curated Around You
              </h3>
              <p className="text-gray-600 font-light leading-relaxed text-[20px]">
                Whether you’re looking for a romantic escape, a family adventure, a luxury voyage, or a group holiday, we help you choose the right cruise, itinerary, cabin, and experiences to match your travel style.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#10221b] mb-4">
                Our Cruise Experiences
              </h3>
              <ul className="space-y-3">
                <li className="text-gray-600 font-light leading-relaxed text-[20px]">
                  <span className="text-gray-800 font-bold">1. Luxury Cruises</span> — Experience world-class service, elegant accommodation, exceptional dining, and unforgettable destinations.
                </li>
                <li className="text-gray-600 font-light leading-relaxed text-[20px]">
                  <span className="text-gray-800 font-bold">2. Family Cruises</span> — Enjoy family-friendly entertainment, activities, facilities, and itineraries designed for every generation.
                </li>
                <li className="text-gray-600 font-light leading-relaxed text-[20px]">
                  <span className="text-gray-800 font-bold">3. Honeymoon Cruises</span> — Celebrate your new beginning with romantic destinations, ocean views, private experiences, and unforgettable moments.
                </li>
                <li className="text-gray-600 font-light leading-relaxed text-[20px]">
                  <span className="text-gray-800 font-bold">4. River Cruises</span> — Discover Europe’s iconic rivers and historic cities through relaxed, scenic journeys.
                </li>
                <li className="text-gray-600 font-light leading-relaxed text-[20px]">
                  <span className="text-gray-800 font-bold">5. Ocean Cruises</span> — Explore spectacular coastlines, islands, and international destinations aboard some of the world’s finest cruise ships.
                </li>
                <li className="text-gray-600 font-light leading-relaxed text-[20px]">
                  <span className="text-gray-800 font-bold">6. Expedition Cruises</span> — Go beyond the ordinary with extraordinary journeys to remote landscapes and remarkable destinations.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#10221b] mb-3">
                Explore Extraordinary Destinations
              </h3>
              <p className="text-gray-600 font-light leading-relaxed text-[20px]">
                Discover the Mediterranean, Northern Europe, Alaska, the Caribbean, Southeast Asia, the Middle East, Australia &amp; New Zealand, and destinations across the world. From island-hopping through the Mediterranean to exploring the fjords of Norway or relaxing among the turquoise waters of the Caribbean, we help you find the cruise that fits your journey.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Carousel Section (Matching Screenshot) */}
      <section className="relative py-8 sm:py-12 bg-white group">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <button
            onClick={handlePrev}
            className="absolute -left-3 sm:-left-8 md:-left-12 lg:-left-16 xl:-left-20 top-1/2 -translate-y-1/2 z-20 text-[#10221b] hover:text-[#5e963b] transition-all transform hover:scale-110 hover:-translate-x-1 cursor-pointer p-1 sm:p-2"
            aria-label="Previous image"
          >
            <svg viewBox="0 0 100 40" className="w-10 sm:w-14 lg:w-16 h-5 sm:h-7 lg:h-8 stroke-current fill-none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M90 20 Q 55 18 10 20" />
              <path d="M 12 20 Q 25 12 30 7" />
              <path d="M 12 20 Q 25 28 30 33" />
            </svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full">
            {getVisibleImages().map((img, idx) => (
              <div
                key={`${currentSlide}-${idx}`}
                className="w-full aspect-square overflow-hidden shadow-md bg-white group transition-all duration-300"
              >
                <img
                  src={img}
                  alt={`Cruise experience ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="absolute -right-3 sm:-right-8 md:-right-12 lg:-right-16 xl:-right-20 top-1/2 -translate-y-1/2 z-20 text-[#10221b] hover:text-[#5e963b] transition-all transform hover:scale-110 hover:translate-x-1 cursor-pointer p-1 sm:p-2"
            aria-label="Next image"
          >
            <svg viewBox="0 0 100 40" className="w-10 sm:w-14 lg:w-16 h-5 sm:h-7 lg:h-8 stroke-current fill-none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 20 Q 45 22 90 20" />
              <path d="M 88 20 Q 75 12 70 7" />
              <path d="M 88 20 Q 75 28 70 33" />
            </svg>
          </button>
        </div>
      </section>

      {/* 4. Why Choose Us Section (Matching Screenshot) */}
      <section className="py-24 bg-white relative z-10 overflow-hidden">
        {/* Pine Tree Background Silhouette on Right Edge */}
        <div className="absolute right-0 top-0 bottom-0 w-72 md:w-96 pointer-events-none opacity-25 z-0 overflow-hidden">
          <img
            src={'/assets/images/contact-pine-bg-2.jpg'}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-left"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span
            className="text-2xl sm:text-3xl block mb-2 text-[#27B8B1] tracking-wide font-cursive"
            style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
          >
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#7cb342] leading-tight font-sans mb-4">
            Why Choose BlackForest Holidays?
          </h2>
          <div className="w-16 h-[3px] bg-[#27B8B1] mb-12 rounded-full" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 max-w-full">
            <div>
              <h4 className="text-[19px] sm:text-[20px] font-bold text-[#10221b] mb-2 font-sans">
                Expert Cruise Selection
              </h4>
              <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                We help you choose the right cruise line, ship, itinerary, and cabin based on your preferences.
              </p>
            </div>

            <div>
              <h4 className="text-[19px] sm:text-[20px] font-bold text-[#10221b] mb-2 font-sans">
                Personalised Planning
              </h4>
              <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                Every cruise journey can be tailored with flights, hotels, transfers, excursions, and pre- or post-cruise stays.
              </p>
            </div>

            <div>
              <h4 className="text-[19px] sm:text-[20px] font-bold text-[#10221b] mb-2 font-sans">
                Complete Travel Support
              </h4>
              <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                From booking to boarding, our team helps coordinate the essential details of your journey.
              </p>
            </div>

            <div>
              <h4 className="text-[19px] sm:text-[20px] font-bold text-[#10221b] mb-2 font-sans">
                Curated Experiences
              </h4>
              <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                Make the most of every destination with carefully selected shore excursions and travel experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom Section: 3-Column Layout Matching Screenshot */}
      <section className="py-24 bg-white relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

            {/* Column 1: Left - Heading, Text, CTA (Span 4) */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <span
                  className="text-2xl sm:text-3xl block mb-1 text-[#27B8B1] tracking-wide font-cursive"
                  style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
                >
                  Ocean Voyages
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold text-[#7cb342] leading-tight font-sans mb-4">
                  Your Journey Begins at Sea
                </h3>
                <div className="w-16 h-[3px] bg-[#27B8B1] mb-6 rounded-full" />
              </div>

              <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                Whether you’re dreaming of a romantic Mediterranean voyage, a family cruise through the Caribbean, a luxury river journey through Europe, or an expedition to the world’s remote corners, BlackForest Holidays helps turn your cruise dreams into an extraordinary journey.
              </p>

              <div className="pt-4">
                <h4 className="text-sm font-bold text-[#10221b] uppercase tracking-[0.15em] mb-4 font-sans">
                  Sail Further, Discover More.
                </h4>
                <button
                  onClick={() => openEnquiryModal({ title: 'Cruise Holidays Enquiry' })}
                  className="bg-[#10221b] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#7cb342] transition-colors shadow-md rounded-sm cursor-pointer"
                >
                  Explore Cruise Holidays &rarr;
                </button>
              </div>
            </div>

            {/* Column 2: Center - Two stacked horizontal images (Span 4) */}
            <div className="lg:col-span-4 space-y-6 pt-4 lg:pt-16">
              <div className="overflow-hidden rounded-sm shadow-md">
                <img
                  src={'/assets/images/Horizon-Lounge-Dining-Venue-copy-scaled.avif'}
                  alt="Horizon Lounge Dining Venue"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden rounded-sm shadow-md">
                <img
                  src={'/assets/images/pngtree-cruise-ship-that-is-sitting-on-a-tropical-island-image_2615573.jpg'}
                  alt="Cruise Ship Tropical Island"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Column 3: Right - Tall cruise ship + Compass watermark + Vision Heading (Span 4) */}
            <div className="lg:col-span-4 relative space-y-6">
              {/* Compass Watermark */}
              <div
                className="absolute -top-10 -right-10 w-64 h-64 opacity-15 pointer-events-none bg-contain bg-no-repeat z-0"
                style={{ backgroundImage: `url('/assets/images/about-compass.jpg')` }}
              />
              <div className="relative z-10 overflow-hidden rounded-sm shadow-md">
                <img
                  src={'/assets/images/ChatGPT-Image-Aug-8-2026-06_49_29-PM.png'}
                  alt="Cruise Ship Voyage"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative z-10 pt-2">
                <h4 className="text-[#7cb342] text-2xl sm:text-[28px] font-bold leading-tight font-sans">
                  A Vision Created For The Activities To Make Sure You Enjoy &amp; Get Thrilled.
                </h4>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
