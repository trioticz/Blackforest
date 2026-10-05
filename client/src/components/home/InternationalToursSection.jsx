import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function InternationalToursSection() {
  const tours = [
    {
      id: 1,
      slug: 'indian-ocean',
      title: 'Tropical Island Paradise',
      destinationLink: '/destinations/indian-ocean',
      destinationName: 'Indian Ocean',
      duration: '6 Days',
      rating: 'Rated 4.95 / 5 by past travellers',
      description: 'Crystal turquoise waters, overwater bungalows, white sand beaches, and luxury tropical escapes.',
      coverImage: '/assets/images/idyllic-tropical-island-resort-with-turquoise-waters-wooden-jetty-scaled.jpg'
    },
    {
      id: 2,
      slug: 'middle-east',
      title: 'Wonders of Middle East',
      destinationLink: '/destinations/middle-east',
      destinationName: 'Middle East',
      duration: '7 Days',
      rating: 'Rated 4.81 / 5 by past travellers',
      description: 'Desert safaris, futuristic architectural marvels, historic souks, and Arabian luxury getaways.',
      coverImage: '/assets/images/metro-railway-glass-skyscrapers-dubai-traffic-street-dubai-museum-future-dubai-cityscape-skyline-urban-background-scaled.jpg'
    },
    {
      id: 3,
      slug: 'south-asia',
      title: 'Enchanting South Asia',
      destinationLink: '/destinations/south-asia',
      destinationName: 'South Asia',
      duration: '7 Days',
      rating: 'Rated 4.78 / 5 by past travellers',
      description: 'Lush tea plantations, ancient heritage temples, mountain peaks, and warm coastal hospitality.',
      coverImage: '/assets/images/swayambhunath-stupa-with-prayer-flags-kathmandu-nepal-scaled.jpg'
    },
    {
      id: 4,
      slug: 'africa',
      title: 'Majestic Africa Safari',
      destinationLink: '/destinations/africa',
      destinationName: 'Africa',
      duration: '8 Days',
      rating: 'Rated 4.85 / 5 by past travellers',
      description: 'Experience wilderness, wild safaris, Great Migration, and sunset savannas across East Africa.',
      coverImage: '/assets/images/olivier_d-elephants-6254556-scaled.jpg'
    },
    {
      id: 5,
      slug: 'america',
      title: 'Grand America Explorer',
      destinationLink: '/destinations/america',
      destinationName: 'America',
      duration: '10 Days',
      rating: 'Rated 4.68 / 5 by past travellers',
      description: "From New York's iconic skyline to Yosemite National Park and the majestic Canadian Rockies.",
      coverImage: '/assets/images/snow-dusts-teton-range-peaks-scaled.jpg'
    },
    {
      id: 6,
      slug: 'asian-countries',
      title: 'Exotic Asia & Far East',
      destinationLink: '/destinations/asian-countries',
      destinationName: 'Asian Countries',
      duration: '9 Days',
      rating: 'Rated 4.90 / 5 by past travellers',
      description: 'Immerse in ancient temples, vibrant street markets, serene landscapes, and rich cultures.',
      coverImage: '/assets/images/cherry-blossoms-castle-himeji-japan-scaled.jpg'
    },
    {
      id: 7,
      slug: 'australia',
      title: 'Magical Australia Tour',
      destinationLink: '/destinations/australia',
      destinationName: 'Australia',
      duration: '8 Days',
      rating: 'Rated 4.72 / 5 by past travellers',
      description: "Sydney's harbour skyline, Great Ocean Road, and unforgettable wildlife encounters.",
      coverImage: '/assets/images/family-holidays-nsw-main.jpg'
    },
    {
      id: 8,
      slug: 'europe',
      title: 'Grand European Highlights',
      destinationLink: '/destinations/europe',
      destinationName: 'Europe',
      duration: '9 Days',
      rating: 'Rated 4.92 / 5 by past travellers',
      description: 'Glide past snow-capped Swiss Alps, alpine lakes, romantic Paris boulevards, and fairytale castles.',
      coverImage: '/assets/images/village-zermatt-with-matterhorn-mountain-background-sunset-switzerland-scaled.jpg'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Update visible items count according to viewport width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, tours.length - itemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto slide effect
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 3800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isPaused]);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-[#10221b] render-defer">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none"
        style={{ backgroundImage: "url('/assets/images/aditya-siva-6rDbvXzIVpQ-unsplash-1-scaled.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#10221b]/95 via-[#10221b]/85 to-[#10221b]/65 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Side: Title */}
          <div className="lg:col-span-4 text-white text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold uppercase leading-[1.15] mb-3 sm:mb-4 tracking-wider font-sans">
              EXPLORE <br className="hidden lg:block" />
              INTERNATIONAL <br className="hidden lg:block" />
              TOUR <br className="hidden lg:block" />
              PACKAGES
            </h2>
            <p className="text-[#dcd6cd] text-[13.5px] sm:text-[14px] max-w-sm mx-auto lg:mx-0 mb-6 leading-relaxed font-light">
              World is big and I want to have a good look at it before it gets dark.
            </p>
            <div className="hidden lg:block">
              <Link
                to="/destinations"
                className="inline-block px-6 py-2.5 border border-white/40 hover:border-white text-white hover:bg-white hover:text-[#10221b] text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-300"
              >
                View All Destinations
              </Link>
            </div>
          </div>

          {/* Right Side: Slider (3 Full Cards, No Cut Off) */}
          <div 
            className="lg:col-span-8 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Slider Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-[-16px] top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-black/80 hover:bg-[#27B8B1] text-white rounded-full flex items-center justify-center transition-all shadow-xl border border-white/20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-[-16px] top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-black/80 hover:bg-[#27B8B1] text-white rounded-full flex items-center justify-center transition-all shadow-xl border border-white/20"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slider Container - Masking overflow */}
            <div className="overflow-hidden py-4 px-1 rounded-lg">
              <div
                className="flex transition-transform duration-600 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                }}
              >
                {tours.map((tour) => (
                  <div
                    key={tour.id}
                    className="shrink-0 px-2 sm:px-2.5"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <div className="h-[420px] sm:h-[450px] relative rounded-lg overflow-hidden group shadow-2xl border border-white/15 transition-all duration-300">
                      {/* Background Cover Photo */}
                      <img
                        src={tour.coverImage}
                        alt={tour.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />

                      {/* Top Right Duration Badge */}
                      <div className="absolute top-4 right-4 bg-[#10221b]/80 backdrop-blur-sm border border-white/25 px-2.5 py-1 rounded text-white text-[11px] font-semibold uppercase tracking-wider shadow z-20">
                        {tour.duration}
                      </div>

                      {/* Normal State */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-5 sm:p-6 flex flex-col justify-end transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                        <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#27B8B1] mb-1 block">
                          {tour.destinationName}
                        </span>
                        <h3 className="text-white font-bold text-base sm:text-lg uppercase tracking-wide leading-tight">
                          {tour.title}
                        </h3>
                      </div>

                      {/* Hover State */}
                      <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px] p-5 sm:p-6 flex flex-col justify-end text-left opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                        <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#27B8B1] mb-1.5 block">
                          {tour.destinationName}
                        </span>

                        <h3 className="text-lg sm:text-xl font-bold uppercase text-white leading-tight mb-2 tracking-wide">
                          {tour.title}
                        </h3>

                        <p className="text-xs text-gray-200 leading-relaxed mb-3 line-clamp-3">
                          {tour.description}
                        </p>

                        <span className="italic text-xs text-[#cfc9be] mb-4 block">
                          {tour.rating}
                        </span>

                        <Link
                          to={tour.destinationLink}
                          className="w-full py-2.5 px-4 text-center uppercase tracking-[0.15em] font-semibold text-xs border border-white/80 text-white hover:bg-[#27B8B1] hover:border-[#27B8B1] hover:text-[#10221b] transition-all duration-300 shadow-md block rounded-sm"
                        >
                          EXPLORE {tour.destinationName}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Position Indicator Dots */}
            <div className="flex justify-center items-center gap-2 mt-4">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`rounded-full transition-all duration-300 ${
                    currentIndex === i
                      ? 'w-7 h-2 bg-[#27B8B1]'
                      : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
