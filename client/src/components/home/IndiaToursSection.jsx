import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function IndiaToursSection() {
  const indianTours = [
    {
      id: 1,
      slug: 'kerala-journey',
      title: 'From Coastlines to Palaces: A Kerala Journey',
      destinationLink: '/destinations/south-asia',
      destinationName: 'Kerala',
      duration: '6 Days',
      rating: 'Rated 4.89 / 5 by past travellers',
      description: "A curated route through Kerala's backwaters, coastline and heritage palaces, blending relaxation with royal history.",
      coverImage: '/assets/images/asset_e9bf19bf84.jpg'
    },
    {
      id: 2,
      slug: 'ooty-coonoor',
      title: 'Gems of the Nilgiris: Ooty & Coonoor',
      destinationLink: '/destinations/south-asia',
      destinationName: 'Tamil Nadu',
      duration: '4 Days',
      rating: 'Rated 4.82 / 5 by past travellers',
      description: "Tea gardens, misty hill roads and colonial charm across two of the Nilgiris' most loved hill towns.",
      coverImage: '/assets/images/nilgiris-ooty-coonoor.jpg'
    },
    {
      id: 3,
      slug: 'romantic-andaman',
      title: 'Romantic Andaman Tour Package',
      destinationLink: '/destinations/south-asia',
      destinationName: 'Andaman & Nicobar',
      duration: '6 Days',
      rating: 'Rated 4.93 / 5 by past travellers',
      description: 'White-sand beaches and turquoise waters designed as an intimate island escape for couples.',
      coverImage: '/assets/images/asset_e33b83aa7a.jpg'
    },
    {
      id: 4,
      slug: 'kodaikanal-hills',
      title: 'Kodaikanal: Enchantress of the Hills',
      destinationLink: '/destinations/south-asia',
      destinationName: 'Tamil Nadu',
      duration: '3 Days',
      rating: 'Rated 4.75 / 5 by past travellers',
      description: 'Lakeside walks, pine forests and cool hill-station air on a short, scenic escape to Kodaikanal.',
      coverImage: '/assets/images/asset_900c3d2c3a.jpg'
    },
    {
      id: 5,
      slug: 'wayanad-nature',
      title: "Wayanad: Retreat into Nature's Paradise",
      destinationLink: '/destinations/south-asia',
      destinationName: 'Kerala',
      duration: '4 Days',
      rating: 'Rated 4.88 / 5 by past travellers',
      description: "Misty plantations, wildlife trails and waterfalls through Kerala's green, unhurried Western Ghats district.",
      coverImage: '/assets/images/asset_652f40bc47.jpg'
    },
    {
      id: 6,
      slug: 'andaman-complete',
      title: 'Andaman Complete Tour Package',
      destinationLink: '/destinations/south-asia',
      destinationName: 'Andaman & Nicobar',
      duration: '10 Days',
      rating: 'Rated 4.91 / 5 by past travellers',
      description: 'The full island circuit — Port Blair, Havelock and Neil Island — for travellers who want to see it all.',
      coverImage: '/assets/images/asset_782ddf32ee.jpg'
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

  const maxIndex = Math.max(0, indianTours.length - itemsPerView);

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
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-[#181818] render-defer">
      {/* Background Image overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-bottom pointer-events-none"
        style={{ backgroundImage: "url('/assets/images/aditya-siva-6rDbvXzIVpQ-unsplash-1-scaled.jpg')" }}
      />
      {/* Dark overlay: ensures readable text while preserving the vibrant colors of Hawa Mahal and Jaipur street */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/45 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Side: Title */}
          <div className="lg:col-span-4 text-white text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold uppercase leading-[1.15] mb-3 sm:mb-4 tracking-wider font-sans">
              EXPLORE <br className="hidden lg:block" />
              INDIAN <br className="hidden lg:block" />
              TOUR <br className="hidden lg:block" />
              PACKAGES
            </h2>
            <p className="text-[#dcd6cd] text-[13.5px] sm:text-[14px] max-w-sm mx-auto lg:mx-0 mb-6 leading-relaxed font-light">
              Handpicked domestic getaways from BlackForest Holidays.
            </p>
            <div className="hidden lg:block">
              <Link
                to="/destinations/south-asia"
                className="inline-block px-6 py-2.5 border border-white/40 hover:border-white text-white hover:bg-white hover:text-[#10221b] text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-300"
              >
                Explore All Packages
              </Link>
            </div>
          </div>

          {/* Right Side: Slider (3 Full Cards, No Cut Off) */}
          <div 
            className="lg:col-span-8 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Slider Navigation Controls */}
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

            {/* Slider Track */}
            <div className="overflow-hidden py-4 px-1 rounded-lg">
              <div
                className="flex transition-transform duration-600 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                }}
              >
                {indianTours.map((tour) => (
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
