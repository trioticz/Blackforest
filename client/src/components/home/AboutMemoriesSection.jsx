import React from 'react';

export default function AboutMemoriesSection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden z-10 render-defer">
      {/* ── Background Mountain / Forest Silhouettes matching Image 3 ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Mountain contour outline across the section */}
        <img 
          src="/assets/images/home-intro-bg_d266ed.jpg" 
          alt="" 
          aria-hidden="true" 
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-35"
        />

        {/* Mountain silhouette with pine trees on the left */}
        <div 
          className="absolute bottom-0 -left-10 sm:-left-6 w-[340px] sm:w-[480px] lg:w-[560px] h-[380px] sm:h-[480px] opacity-25 hidden sm:block"
          style={{
            clipPath: "polygon(0% 100%, 0% 32%, 12% 28%, 22% 16%, 32% 12%, 46% 22%, 58% 24%, 72% 38%, 88% 44%, 100% 100%)"
          }}
        >
          <img 
            src="/assets/images/mask-pine.jpg" 
            alt="" 
            aria-hidden="true" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content: Card on Left + Map Image on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: White Elevated Content Card */}
          <div className="lg:col-span-6 xl:col-span-6 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.07)] p-8 sm:p-10 md:p-12 border border-gray-100/90 transition-all duration-300 hover:shadow-[0_14px_50px_rgba(0,0,0,0.1)]">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#44802c] leading-tight mb-4 tracking-tight">
              Let us plan your journey,<br />
              You create the memories.
            </h3>
            
            {/* Teal/cyan underline matching Image 3 */}
            <div className="w-16 h-[3px] bg-[#27B8B1] mb-6 rounded-full" />

            <div className="space-y-4 text-[#555555] text-[14.5px] sm:text-[15px] leading-[1.75] font-normal">
              <p>
                Welcome to <strong className="font-semibold text-[#1c2b25]">BLACK FOREST HOLIDAYS</strong>, your trusted partner in creating unforgettable travel experiences. We believe that every journey should be more than just a trip—it should be a collection of wonderful memories, new discoveries, and meaningful experiences.
              </p>
              <p>
                With our expertise in travel planning, we help individuals, families, couples, and groups plan their perfect getaway. From flights and hotels to customized holiday packages, sightseeing, transportation, and travel assistance, we take care of the details so you can enjoy your journey with confidence.
              </p>
            </div>
          </div>

          {/* Right: Map & Travel Gear Image */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center items-center">
            <div className="w-full overflow-hidden rounded-2xl shadow-[0_12px_45px_rgba(0,0,0,0.12)] border border-gray-100/80 group">
              <img
                src="/map-intro.webp"
                alt="Let us plan your journey - Black Forest Holidays"
                loading="lazy"
                decoding="async"
                width="600"
                height="480"
                className="w-full h-auto max-h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
