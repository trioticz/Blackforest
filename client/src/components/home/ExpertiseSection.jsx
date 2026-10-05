import React, { useState, useEffect } from 'react';
import { getPublishedExpertiseCards, EXPERTISE_EVENT, initialTenPartners } from '../../utils/expertiseManager';

export const expertisePartners = initialTenPartners;

export default function ExpertiseSection() {
  const [partnerCards, setPartnerCards] = useState(() => getPublishedExpertiseCards());

  useEffect(() => {
    const handleUpdate = () => {
      setPartnerCards(getPublishedExpertiseCards());
    };
    window.addEventListener(EXPERTISE_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(EXPERTISE_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  if (!partnerCards || partnerCards.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-[#fbfaf8] text-center border-t border-gray-100 render-defer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title Area matching Image 2 */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 text-[#c59b27] font-bold text-xs sm:text-sm uppercase tracking-[0.25em] mb-3">
            <span>◆</span>
            <span>OUR EXPERTISE</span>
            <span>◆</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#10221b] mb-4 tracking-tight font-sans">
            Knowledge Behind Every Journey
          </h2>
          <p className="text-[#555555] text-sm sm:text-[15px] max-w-2xl mx-auto font-normal leading-relaxed">
            Our destination specialists continually expand their knowledge through tourism-board programmes, industry training and global certifications to design journeys you can trust.
          </p>

          {/* Golden Infinity Loop Ornament matching Image 2 */}
          <div className="flex justify-center mt-5">
            <svg width="44" height="22" viewBox="0 0 44 22" fill="none" stroke="#c59b27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11C18 3 6 3 6 11C6 19 18 19 22 11C26 3 38 3 38 11C38 19 26 19 22 11Z" />
            </svg>
          </div>
        </div>

        {/* 10 Expertise Partner Cards Grid (5x2) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          {partnerCards.map((partner) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl border border-[#ece8df] p-5 sm:p-6 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#c59b27] group min-h-[220px]"
            >
              {/* Logo container */}
              <div className="w-full h-24 flex items-center justify-center p-1 mb-2">
                <img
                  src={partner.image}
                  alt={partner.name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-20 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/site/white_logo.png';
                  }}
                />
              </div>

              {/* Decorative Divider with Diamond */}
              <div className="w-full flex items-center justify-center my-3">
                <div className="flex-1 h-[1px] bg-[#e4ddd0] group-hover:bg-[#c59b27]/40 transition-colors"></div>
                <span className="mx-2.5 w-1.5 h-1.5 bg-[#c59b27] rotate-45 transform"></span>
                <div className="flex-1 h-[1px] bg-[#e4ddd0] group-hover:bg-[#c59b27]/40 transition-colors"></div>
              </div>

              {/* Text Info */}
              <div className="w-full pt-1">
                <h4 className="font-bold text-[#10221b] text-sm sm:text-[15px] uppercase tracking-wider font-sans group-hover:text-[#c59b27] transition-colors">
                  {partner.name}
                </h4>
                <p className="text-gray-500 text-xs mt-1 font-normal leading-tight">
                  {partner.subtitle}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Dark Green Pill Bar with 4 Benefits matching Image 2 */}
        <div className="mt-14 bg-[#0a1e16] text-white rounded-[22px] p-6 sm:p-8 lg:p-9 shadow-2xl max-w-7xl mx-auto border-[1.5px] border-[#9b7b38]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-[#9b7b38]/40 text-left">

            {/* Item 1 */}
            <div className="flex items-center gap-4 py-4 sm:py-2 lg:py-0 lg:px-6 first:lg:pl-2">
              <div className="w-12 h-12 rounded-full border-[1.5px] border-[#9b7b38] flex items-center justify-center text-[#c59b27] flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#c59b27]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                  <path d="M9.5 9.5h5" />
                  <path d="M10 9.5l-1.5 8h7l-1.5-8" />
                  <path d="M7 19.5h10" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-[15px] sm:text-[15px] uppercase tracking-wider text-white font-sans leading-tight">
                  EXPERT<br className="hidden sm:inline" /> KNOWLEDGE
                </h4>
                <span className="text-[12px] sm:text-[13px] text-[#cfc9be] font-light leading-snug mt-1 font-sans">
                  Destination training and global insights
                </span>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-4 py-4 sm:py-2 lg:py-0 lg:px-6">
              <div className="w-12 h-12 rounded-full border-[1.5px] border-[#9b7b38] flex items-center justify-center text-[#c59b27] flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#c59b27]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 4.5l-7 5.5v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8l-7-5.5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-[15px] sm:text-[15px] uppercase tracking-wider text-white font-sans leading-tight">
                  TRUSTED<br className="hidden sm:inline" /> EXPERTISE
                </h4>
                <span className="text-[12px] sm:text-[13px] text-[#cfc9be] font-light leading-snug mt-1 font-sans">
                  Certified by leading tourism boards and industry bodies
                </span >
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-4 py-4 sm:py-2 lg:py-0 lg:px-6">
              <div className="w-12 h-12 rounded-full border-[1.5px] border-[#9b7b38] flex items-center justify-center text-[#c59b27] flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#c59b27]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="7.5" />
                  <circle cx="12" cy="12" r="3.5" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-[15px] sm:text-[15px] uppercase tracking-wider text-white font-sans leading-tight">
                  BETTER JOURNEYS
                </h4>
                <span className="text-[12px] sm:text-[13px] text-[#cfc9be] font-light leading-snug mt-1 font-sans">
                  Knowledge that creates meaningful and enriching experiences
                </span >
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-center gap-4 py-4 sm:py-2 lg:py-0 lg:px-6 last:lg:pr-2">
              <div className="w-12 h-12 rounded-full border-[1.5px] border-[#9b7b38] flex items-center justify-center text-[#c59b27] flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#c59b27]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20.25S4.5 15.5 4.5 9.75A4.75 4.75 0 0 1 12 6.2a4.75 4.75 0 0 1 7.5 3.55c0 5.75-7.5 10.5-7.5 10.5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-[15px] sm:text-[15px] uppercase tracking-wider text-white font-sans leading-tight">
                  COMMITTED TO YOU
                </h4>
                <span className="text-[12px] sm:text-[13px] text-[#cfc9be] font-light leading-snug mt-1 font-sans">
                  Continuous learning for travellers, always
                </span >
              </div>
            </div>

          </div>
        </div>

        {/* Footer Commitment Note flanked by golden horizontal lines */}
        <div className="mt-10 flex items-center justify-center gap-3 sm:gap-6 max-w-4xl mx-auto px-4">
          <div className="flex-1 max-w-[80px] sm:max-w-[140px] h-[1.5px] bg-[#c59b27]/60" />

          <div className="flex items-center gap-2.5 text-xs sm:text-[13.5px] text-gray-600 font-sans text-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 7.5a2.5 2.5 0 1 0-2.5-2.5A2.5 2.5 0 0 0 12 7.5zm0 9a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0-2.5-2.5zm-4.5-4.5a2.5 2.5 0 1 0-2.5 2.5 2.5 2.5 0 0 0 2.5-2.5zm9 0a2.5 2.5 0 1 0 2.5-2.5 2.5 2.5 0 0 0-2.5 2.5z" />
            </svg>
            <span>Our partnerships reflect our commitment to providing authentic experiences and exceptional journeys worldwide.</span>
          </div>

          <div className="flex-1 max-w-[80px] sm:max-w-[140px] h-[1.5px] bg-[#c59b27]/60" />
        </div>

      </div>
    </section>
  );
}
