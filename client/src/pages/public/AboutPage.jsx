import React from 'react';
import HeroWave from '../../components/common/HeroWave';
import { useSettings } from '../../context/SiteSettingsContext';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const { settings, openEnquiryModal } = useSettings();
  const siteName = settings?.siteName || 'Blackforest Holidays';

  const testimonials = [
    {
      id: 1,
      name: "harish kongara",
      time: "2 months ago",
      image: "/assets/site/avatar_harish.jpg",
      review: "Thank you Leela for your assistance in processing our Schengen visa. The whole process was clearly communicated and all our doubts were cleared upfront. Your guidance helped us in smooth navigation. Highly recommended!"
    },
    {
      id: 2,
      name: "revathi P",
      time: "3 months ago",
      image: "/assets/site/avatar_revathi.jpg",
      review: "I am a Veterinary doctor living in Nilgiris, myself and my daughter had a trip to Germany in April 2026 to visit our German friend and family. Leela mam and Blackforest holidays helped me a lot from the time of Visa processing, ticket booking, and money exchange. We had a wonderful memorable trip!"
    },
    {
      id: 3,
      name: "SENDHIL KUMAR V",
      time: "6 months ago",
      image: "/assets/site/avatar_sendhil.jpg",
      review: "Upcoming trip in April 2026: After our trip to Spain & Switzerland, we wanted to plan exclusive trip visiting only Italy. They confirmed trip bookings, helped in getting visa appointments during peak season in short time. Mrs. Leela clearly explained documents needed for Visa. Top notch agency!"
    },
    {
      id: 4,
      name: "rohan sharma",
      time: "7 months ago",
      image: "/assets/site/avatar_rohan.jpg",
      review: "I had a great experience with Black Forest Travels for my Singapore visa. The entire process was incredibly smooth and hassle-free. What truly stood out was that everything was handled remotely, efficiently, and with complete clarity. Highly recommend!"
    }
  ];
  return (
    <div className="bg-white font-sans text-gray-800 animate-fadeIn overflow-x-hidden">
      
      {/* =========================================================================
          1. HERO BREADCRUMB BANNER
          ========================================================================= */}
      <section className="relative h-[55vh] min-h-[460px] md:min-h-[520px] flex flex-col justify-between overflow-hidden">
        {/* Background Image with warm antique map & currency notes matching reference */}
        <div className="absolute inset-0 z-0 bg-[#0a1712]">
          <img
            src="/assets/images/about_hero_map.jpg"
            alt={`About ${siteName}`}
            fetchpriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center opacity-85 scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/images/about-filler-2-bg.jpg';
            }}
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>
        
        {/* Title & Breadcrumb Centered */}
        <div className="relative z-10 text-white flex flex-col items-center justify-center text-center mt-auto mb-auto pt-16">
          <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-bold tracking-tight mb-3 drop-shadow-lg font-sans">
            About Us
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-light tracking-wide text-gray-100">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-gray-300">»</span>
            <span className="text-white font-normal">About</span>
          </div>
        </div>

        {/* Bottom Pine Wave Divider */}
        <div className="relative z-10 w-full">
          <HeroWave />
        </div>
      </section>

      {/* =========================================================================
          2. WHERE LUXURY MEETS EXTRAORDINARY JOURNEYS
          ========================================================================= */}
      <section className="pt-16 pb-20 relative bg-white overflow-hidden">
        {/* Faint Watermarks Matching Reference Design */}
        {/* Left: World Map Routes Watermark */}
        <div 
          className="absolute -left-16 top-24 w-[480px] h-[480px] pointer-events-none opacity-20 z-0 bg-contain bg-no-repeat"
          style={{ backgroundImage: "url('/assets/images/WhatsApp-Image-2026-07-30-at-12.52.36-3.jpeg')" }}
        />
        {/* Right: Compass Rose Watermark */}
        <div 
          className="absolute -right-16 top-16 w-[420px] h-[420px] pointer-events-none opacity-20 z-0 bg-contain bg-no-repeat"
          style={{ backgroundImage: "url('/assets/images/WhatsApp-Image-2026-07-30-at-12.52.36-2.jpeg')" }}
        />
        {/* Center Bottom: Pine Silhouette Watermark */}
        <div 
          className="absolute right-10 bottom-4 w-[520px] h-[340px] pointer-events-none opacity-15 z-0 bg-contain bg-no-repeat"
          style={{ backgroundImage: "url('/assets/images/WhatsApp-Image-2026-07-30-at-12.52.36-1.jpeg')" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Centered Top Headings */}
          <div className="text-center mb-14 md:mb-16">
            <span 
              className="text-2xl sm:text-3xl block mb-1 font-cursive"
              style={{ color: "#27B8B1" }}
            >
              Travel Dream Begins
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#7cb342] leading-tight font-sans">
              Redefining the Way You Explore the World
            </h2>
          </div>

          {/* 3-Column Content & Image Collage Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Story & Philosophy (Span 4) */}
            <div className="md:col-span-4 space-y-6 pt-2">
              <h3 className="text-3xl lg:text-[38px] font-bold text-[#7cb342] leading-[1.18] tracking-tight">
                Where<br />
                Luxury Meets<br />
                Extraordinary<br />
                Journeys
              </h3>
              
              <div className="text-gray-600 text-[14.5px] leading-[1.8] font-light space-y-4">
                <p>
                  BlackForest Holidays Pvt Ltd is premier travel partner for bespoke and unforgettable experiences. Since 2017, we have been crafting elegant, tailor-made journeys with seamless planning and exceptional attention to detail.
                </p>
                <p>
                  Every trip we design is a perfect blend of comfort, exclusivity, and personalized service — creating travel experiences that are truly exceptional.
                </p>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => openEnquiryModal({ destination: 'Bespoke Travel' })}
                  className="bg-[#10221b] text-white px-7 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#7cb342] transition-colors shadow-md rounded-sm cursor-pointer"
                >
                  Our Services
                </button>
              </div>
            </div>

            {/* Middle Column: Bali Temple + Safari Jeep (Span 4) */}
            <div className="md:col-span-4 space-y-6">
              {/* Bali Water Temple (ABOUT-US.png) */}
              <div className="w-full aspect-[4/5] rounded-sm overflow-hidden shadow-sm bg-gray-50">
                <img 
                  src="/assets/images/ABOUT-US.png" 
                  alt="Ulun Danu Beratan Bali Water Temple" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/images/ABOUT-US.png';
                  }}
                />
              </div>

              {/* Safari Jeep Map Reading (about-img-3.png) */}
              <div className="w-full aspect-[16/10] rounded-sm overflow-hidden shadow-sm bg-gray-50">
                <img 
                  src="/assets/images/about-img-3.png" 
                  alt="Couple with Safari Jeep Planning Adventure" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/images/about-img-3.png';
                  }}
                />
              </div>
            </div>

            {/* Right Column: Mountain Peak + Activity Motto (Span 4) */}
            <div className="md:col-span-4 space-y-8">
              {/* Mountain Cliff Peak (Untitled-design.png) */}
              <div className="w-full aspect-square rounded-sm overflow-hidden shadow-sm bg-gray-50">
                <img 
                  src="/assets/images/Untitled-design.png" 
                  alt="Mountain Peak and Pine Forest" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/images/Untitled-design.png';
                  }}
                />
              </div>

              {/* Green Activity Heading directly beneath mountain */}
              <div className="pt-2">
                <h3 className="text-2xl lg:text-[28px] font-bold text-[#7cb342] leading-[1.35] tracking-tight">
                  A Journey<br />
                  Designed For<br />
                  Activities To<br />
                  Make Sure You<br />
                  Enjoy & Stay<br />
                  Thrilled.
                </h3>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          3. BEYOND TRAVEL – WE CREATE EXPERIENCES
          ========================================================================= */}
      <section className="pt-8 pb-20 relative z-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10">
            <h2 className="text-3xl md:text-[38px] font-bold text-[#7cb342] leading-tight mb-3">
              Beyond Travel – We Create Experiences
            </h2>
            <div className="h-[2.5px] w-16 bg-[#27B8B1]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            
            {/* Left Block: Wellness & Exclusive Escapes */}
            <div className="space-y-4">
              <div>
                <span className="text-[#27B8B1] text-xs font-semibold tracking-widest uppercase block mb-1">
                  Wellness
                </span>
                <p className="text-gray-500 text-[14px] leading-relaxed font-light">
                  an urban escapes rich in culture, world-class entertainment, fine dining and unparalleled experiences.
                </p>
              </div>
              <div className="w-full aspect-[4/3] rounded-sm overflow-hidden shadow-sm bg-gray-50">
                <img 
                  src="/assets/images/Blackforest-about-1.png" 
                  alt="Exclusive Escapes James Bond Island" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/images/Blackforest-about-1.png';
                  }}
                />
              </div>
              <h3 className="font-bold text-[#10221b] text-2xl lg:text-[26px] leading-snug pt-1">
                Exclusive Escapes For Discerning Travelers
              </h3>
            </div>
            
            {/* Right Block: Picnics & Curated Journeys */}
            <div className="space-y-4">
              <div>
                <span className="text-[#27B8B1] text-xs font-semibold tracking-widest uppercase block mb-1">
                  Picnics
                </span>
                <p className="text-gray-500 text-[14px] leading-relaxed font-light">
                  Where stunning coastlines meet vibrant culture, offering unforgettable island adventures and luxurious getaways.
                </p>
              </div>
              <div className="w-full aspect-[4/3] rounded-sm overflow-hidden shadow-sm bg-gray-50">
                <img 
                  src="/assets/images/Untitled-design-1.png" 
                  alt="Curated Journeys Alpine Hikers" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/images/Untitled-design-1.png';
                  }}
                />
              </div>
              <h3 className="font-bold text-[#10221b] text-2xl lg:text-[26px] leading-snug pt-1">
                Curated Journeys For The Elite Traveler
              </h3>
            </div>
            
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CLIENT TESTIMONIALS – SAVORING YOUR TASTE BUDS
          ========================================================================= */}
      <section className="py-20 relative bg-[#fbfaf8] overflow-hidden">
        {/* Snowy Mountain Panoramic Background Overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none bg-cover bg-bottom" 
          style={{ 
            backgroundImage: 'url("/assets/images/about-testimonial-bg.png")'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Centered Heading */}
          <div className="text-center mb-14">
            <span 
              className="text-2xl sm:text-3xl block mb-1 font-cursive"
              style={{ color: "#27B8B1" }}
            >
              Client Testimonial
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#7cb342] leading-tight font-sans">
              Savoring your Taste Buds
            </h2>
          </div>

          {/* 4 Authentic Google Review Cards in a Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div 
                key={t.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl p-6 flex flex-col justify-between text-left transition-all duration-300 hover:-translate-y-1 relative group"
              >
                <div>
                  {/* Avatar & Google Badge */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                        <img 
                          src={t.image} 
                          alt={t.name} 
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/assets/images/white_logo.png';
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow border border-gray-100">
                        <img src="/assets/site/google_icon.svg" alt="Google" loading="lazy" decoding="async" className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 leading-snug">{t.name}</h4>
                      <span className="text-[11px] text-gray-400 block">{t.time}</span>
                    </div>
                  </div>

                  {/* 5 Google Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <img key={star} src="/assets/site/google_star.svg" alt="★" loading="lazy" decoding="async" className="w-3.5 h-3.5" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-600 text-[13px] leading-relaxed font-light line-clamp-5">
                    {t.review}
                  </p>
                </div>

                {/* Verified Footer Link */}
                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400">
                  <span>Google Review</span>
                  <span className="text-blue-500 font-medium">Verified</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
      
    </div>
  );
}
