import React, { useState, useEffect, useRef } from 'react';

// Custom hook for animated counting
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return { count, ref };
};

export default function StatsSection() {
  const { count: countIsland, ref: refIsland } = useCounter(50);
  const { count: countCountries, ref: refCountries } = useCounter(25);
  const { count: countTailor, ref: refTailor } = useCounter(150);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-[#f4f7f4] text-[#10221b] overflow-hidden render-defer">
      {/* Mountain silhouette background graphic at bottom */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-bottom bg-cover"
        style={{ backgroundImage: "url('/assets/images/number-counter-bg.png')" }}
      />

      {/* Flying Birds Silhouette (Exact match to Image 4 top center) */}
      <div className="relative z-10 flex justify-center mb-6">
        <svg width="240" height="45" viewBox="0 0 240 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-44 sm:w-60 h-auto opacity-75">
          <path d="M20 22 Q 28 10, 36 22 Q 44 10, 52 22" stroke="#2b3b33" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M75 16 Q 84 5, 93 16 Q 102 5, 111 16" stroke="#2b3b33" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M135 12 Q 143 3, 151 12 Q 159 3, 167 12" stroke="#2b3b33" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M188 20 Q 195 10, 202 20 Q 209 10, 216 20" stroke="#2b3b33" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left Column (Exact match to Image 4 font size and layout) */}
          <div className="lg:col-span-6 space-y-4 text-left">
            {/* Cursive Subtitle */}
            <span
              className="text-2xl sm:text-3xl lg:text-[32px] block font-medium tracking-wide"
              style={{
                fontFamily: "var(--font-cursive, 'Caveat', 'Dancing Script', cursive, serif)",
                color: "#27B8B1"
              }}
            >
              Your Island Story Begins Here
            </span>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#10221b] leading-[1.15] font-sans">
              Escape to extraordinary <br className="hidden sm:block" />
              islands
            </h2>

            {/* Description */}
            <p className="text-[#555555] font-light text-sm sm:text-base leading-relaxed max-w-md pt-2">
              Experience the world in extraordinary style with our only luxuary tours.
            </p>
          </div>

          {/* Right Column (Exact match to Image 4: Clean numbers without dark circle badges) */}
          <div className="lg:col-span-6 space-y-6 pt-2">
            <div className="grid grid-cols-3 gap-4 sm:gap-6 items-start">

              {/* Stat 1: 50+ Island Destinations */}
              <div ref={refIsland} className="text-left space-y-1">
                <span className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#10221b] leading-none block">
                  {countIsland}+
                </span>
                <span className="text-sm sm:text-base font-bold text-[#10221b] leading-snug block">
                  Island <br />
                  Destinations
                </span>
              </div>

              {/* Stat 2: 25 Countries */}
              <div ref={refCountries} className="text-left space-y-1">
                <span className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#10221b] leading-none block">
                  {countCountries}
                </span>
                <span className="text-sm sm:text-base font-bold text-[#10221b] leading-snug block">
                  Countries
                </span>
              </div>

              {/* Stat 3: 150+ Tailor-Made Journeys */}
              <div ref={refTailor} className="text-left space-y-1">
                <span className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#10221b] leading-none block">
                  {countTailor}+
                </span>
                <span className="text-sm sm:text-base font-bold text-[#10221b] leading-snug block">
                  Tailor-Made <br />
                  Journeys
                </span>
              </div>

            </div>

            {/* Sub-text Note (Exact match to Image 4 bottom right note) */}
            <p className="text-xs sm:text-[13px] text-gray-500 font-light leading-relaxed pt-4 border-t border-gray-200/80 italic max-w-lg">
              For BlackForest Holidays, I recommend “Curated Journeys” instead of “Tours” because it sounds more premium and luxurious.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
