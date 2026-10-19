import React, { useState } from 'react';
import { useSettings } from '../../context/SiteSettingsContext';
import { useWebsiteContent } from '../../context/WebsiteContentContext';
import HeroWave from '../../components/common/HeroWave';
import { ChevronRight, ChevronLeft, MapPin, Calendar, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CoachTourPage() {
  const { settings, openEnquiryModal } = useSettings();
  const siteName = settings?.siteName || 'Blackforest Holidays';
  const { content: coachContent } = useWebsiteContent('coach_tour.hero', {
    headline: 'Coach Tours',
    badge: 'Escorted Group Journeys',
    subheadline: 'Travel in luxury and comfort across the world’s most picturesque panoramic routes.'
  });
  const packages = [
    {
      id: 1,
      title: "France and Swiss Alps",
      duration: "10 nights / 11 days",
      image: "/assets/images/yuxin-chen-598Ah85XPiY-unsplash-scaled.jpg",
      route: "Paris • Geneva • Interlaken • Zermatt • Zurich",
      tag: "Best Seller"
    },
    {
      id: 2,
      title: "France & Switzerland with Enchanted Alsace",
      duration: "6 nights / 7 days",
      image: "/assets/images/xavier-coiffic-ByAHlRiTQjo-unsplash-scaled.jpg",
      route: "Strasbourg • Colmar • Lucerne • Rhine Falls",
      tag: "Scenic Route"
    },
    {
      id: 3,
      title: "Swiss and Italian Spotlight & Venice",
      duration: "8 nights / 9 days",
      image: "/assets/images/willian-justen-de-vasconcellos-4hMET7vYTAQ-unsplash-scaled.jpg",
      route: "Milan • Lake Como • Venice • Dolomites • Verona",
      tag: "Cultural Classic"
    },
    {
      id: 4,
      title: "Imperial Europe & Romantic Castles",
      duration: "9 nights / 10 days",
      image: "/assets/images/willdwind-william-martret-lRrklMtueBg-unsplash-scaled.jpg",
      route: "Vienna • Prague • Budapest • Salzburg • Munich",
      tag: "Heritage"
    },
    {
      id: 5,
      title: "Aegean Dream",
      duration: "12 nights / 13 days",
      image: "/assets/images/sergi-ferrete-YXwt-vJ3szA-unsplash-scaled.jpg",
      route: "Athens • Mykonos • Santorini",
      tag: "Island Hopping"
    },
    {
      id: 6,
      title: "Classical Spain",
      duration: "7 nights / 8 days",
      image: "/assets/images/sutirta-budiman-kjOBqwMUnWw-unsplash-scaled.jpg",
      route: "Madrid • Seville • Granada • Barcelona",
      tag: "Cultural Classic"
    },
    {
      id: 7,
      title: "Roaming the United Kingdom",
      duration: "6 nights / 7 days",
      image: "/assets/images/sean-robertson-5ftxFgXLtkI-unsplash-scaled.jpg",
      route: "London • Edinburgh • Highlands",
      tag: "Explorer"
    },
    {
      id: 8,
      title: "Majestic Scandinavia",
      duration: "11 nights / 12 days",
      image: "/assets/images/hendrik-cornelissen-qs4E9t0hJc0-unsplash-scaled.jpg",
      route: "Copenhagen • Oslo • Stockholm • Fjords",
      tag: "Nordic Wonders"
    },
    {
      id: 9,
      title: "Wonders of Italy",
      duration: "8 nights / 9 days",
      image: "/assets/images/ahmed-shabana-ADa9bb3tqR4-unsplash-scaled.jpg",
      route: "Rome • Florence • Venice • Amalfi",
      tag: "Best Seller"
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  const nextPackage = () => {
    setActiveIdx((prev) => (prev >= packages.length - 1 ? 0 : prev + 1));
  };

  const prevPackage = () => {
    setActiveIdx((prev) => (prev <= 0 ? packages.length - 1 : prev - 1));
  };

  return (
    <div className="animate-fadeIn bg-[#fbfaf8] font-sans text-gray-800 overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] flex flex-col justify-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-[#0a1712]">
          <img
            src="/assets/images/backpacker_bg.jpg"
            alt="Coach Tour"
            className="w-full h-full object-cover opacity-80"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/images/corporate-travel.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10221b] via-[#10221b]/40 to-black/60"></div>
        </div>
        
        {/* Content with breadcrumb */}
        <div className="relative z-10 text-white mt-16 flex flex-col items-center pb-32 text-center">
          <span className="text-[#f29727] text-xs uppercase font-bold tracking-[0.25em] mb-2">
            {coachContent?.badge || 'Escorted Group Journeys'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold tracking-tight mb-4 drop-shadow-xl font-sans">
            {coachContent?.headline || 'Coach Tours'}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-light drop-shadow-md tracking-wider">
            <Link to="/" className="hover:text-gray-200 transition-colors">Home</Link>
            <span className="text-gray-300">&gt;</span>
            <span className="text-[#f29727]">Coach Tour</span>
          </div>
        </div>

        {/* Wavy Top SVG Mask */}
        <HeroWave />
      </section>

      {/* 2. Popular Packages */}
      <section className="py-20 relative z-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl shadow-lg p-8 sm:p-12 lg:p-16 relative border border-gray-100">
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-start">
            
            {/* Left Title & Intro */}
            <div className="lg:col-span-1 space-y-5">
              <span className="text-2xl sm:text-[26px] block mb-1 font-cursive text-[#27B8B1]">
                European Panorama
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#5e963b] leading-tight font-sans">
                Popular Coach Tour Packages
              </h2>
              <div className="w-12 h-[2px] bg-[#f29727]"></div>
              <p className="text-gray-600 text-sm font-light leading-relaxed pt-2">
                Handcrafted escorted coach tours across Europe and iconic world destinations. Enjoy luxury air-conditioned coaches, expert local tour directors, and reserved hotel accommodations.
              </p>
            </div>

            {/* Right Packages Grid / Carousel */}
            <div className="lg:col-span-3 relative">
              {/* Left Arrow */}
              <button 
                onClick={prevPackage}
                aria-label="Previous package"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-[#27B8B1] hover:border-[#27B8B1] transition-all cursor-pointer hidden sm:flex"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {packages.slice(activeIdx, activeIdx + 3).map((pkg, idx) => (
                  <Link 
                    key={pkg.id} 
                    to="/coach-tour/coach-tour-details"
                    className="relative rounded-3xl overflow-hidden shadow-lg group cursor-pointer bg-[#10221b] h-[400px] sm:h-[480px] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 block"
                  >
                    {/* Full Card Image */}
                    <img 
                      src={pkg.image} 
                      alt={pkg.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Bottom Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Centered Content at Bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center text-center">
                      <h3 className="font-bold text-white text-xl sm:text-2xl font-sans mb-1.5 drop-shadow-md group-hover:-translate-y-1 transition-transform duration-300">
                        {pkg.title}
                      </h3>
                      <p className="text-gray-300 text-xs sm:text-sm font-light tracking-wider group-hover:-translate-y-1 transition-transform duration-300 delay-75 mb-3">
                        {pkg.duration}
                      </p>
                      {/* Explore Tour Button matching Image 1 */}
                      <span className="transform transition-all duration-300 px-5 py-2 rounded-full bg-[#10221b]/80 border border-[#27B8B1] text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center gap-2 backdrop-blur-md group-hover:bg-[#27B8B1] group-hover:border-[#27B8B1] shadow-lg">
                        <span>Explore Tour</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Right Arrow */}
              <button 
                onClick={nextPackage}
                aria-label="Next package"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-[#27B8B1] hover:border-[#27B8B1] transition-all cursor-pointer hidden sm:flex"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

          </div>

          {/* Bottom Callout to Multi-Search Details */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h4 className="text-xl font-bold text-[#10221b] font-sans">Looking for a specific route or departure date?</h4>
              <p className="text-gray-500 text-sm font-light">Use our interactive Multi-Search tool to explore over 1,000+ guided coach itineraries across Europe and worldwide.</p>
            </div>
            <Link
              to="/coach-tour/coach-tour-details"
              className="px-8 py-3.5 rounded-full bg-[#5e963b] hover:bg-[#10221b] text-white text-xs uppercase font-bold tracking-widest transition-all duration-300 shadow-md hover:shadow-xl shrink-0 flex items-center gap-2"
            >
              <span>Explore All Coach Tours</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
