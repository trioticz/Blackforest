import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import HeroWave from '../../components/common/HeroWave';
import { useSettings } from '../../context/SiteSettingsContext';

// Animated Counter Component for Stats Section
function AnimatedCounter({ end, duration = 1800, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let startTime = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [started, end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function AsianCountriesPage() {
  const { openEnquiryModal } = useSettings();
  const [activeTab, setActiveTab] = useState(1);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // The 7 East Asia Countries (Tab 1)
  const eastAsiaCountries = [
    {
      name: 'JAPAN',
      desc: 'Where timeless traditions meet refined modern elegance. From serene temples to futuristic cities, every moment feels perfectly curated.'
    },
    {
      name: 'SOUTH KOREA',
      desc: 'A vibrant blend of innovation, culture, and dynamic city life. Experience trendsetting cities alongside rich heritage and scenic landscapes.'
    },
    {
      name: 'CHINA',
      desc: 'A land of ancient wonders and grand imperial legacy. From the Great Wall to modern marvels, history and progress coexist beautifully.'
    },
    {
      name: 'HONG KONG',
      desc: 'Where dazzling skylines meet world-class luxury. A fast-paced city offering iconic views, fine dining, and endless energy.'
    },
    {
      name: 'TAIWAN',
      desc: 'A hidden gem of scenic beauty and rich cultural charm. Discover lush mountains, night markets, and warm local traditions.'
    },
    {
      name: 'BHUTAN',
      desc: 'Discover serenity in the world’s last Himalayan kingdom. Peaceful monasteries, untouched nature, and happiness define every journey.'
    },
    {
      name: 'NEPAL',
      desc: 'Where majestic peaks and spiritual journeys come alive. From Everest views to sacred temples, every path inspires awe.'
    }
  ];

  // The 7 South East Asia Countries (Tab 2)
  const southEastAsiaCountries = [
    {
      name: 'BALI',
      desc: 'A tropical paradise of lush rice terraces, serene temples, and luxury resorts—perfect for relaxation, culture, and scenic beauty.'
    },
    {
      name: 'THAILAND',
      desc: 'A vibrant blend of golden temples, bustling cities, and exotic islands, offering the perfect mix of culture, nightlife, and beach escapes.'
    },
    {
      name: 'SINGAPORE',
      desc: 'A dynamic city of modern elegance, iconic skylines, and world-class experiences, where luxury meets innovation and culture. From the futuristic Gardens by the Bay to the vibrant streets of Chinatown and Little India, every corner tells a unique story.'
    },
    {
      name: 'MALAYSIA',
      desc: 'A diverse destination of vibrant cities, rainforests, and pristine beaches, combining cultural richness with contemporary charm.'
    },
    {
      name: 'VIETNAM',
      desc: 'A land of timeless beauty, from limestone karsts and lush landscapes to rich history and vibrant street culture.'
    },
    {
      name: 'CAMBODIA',
      desc: 'Home to the majestic Angkor Wat, Cambodia offers ancient wonders, cultural depth, and a journey into history and heritage.'
    },
    {
      name: 'PHILIPPINES',
      desc: 'An island paradise of crystal-clear waters, white-sand beaches, and hidden lagoons—perfect for tropical escapes and adventure.'
    }
  ];

  // Highlights (Tab 3)
  const highlights = [
    '1. Seamless blend of ancient traditions & futuristic cityscapes',
    '2. Trendsetting culture, vibrant nightlife & modern experiences',
    '3. Iconic landmarks, rich heritage & imperial history',
    '4. Dazzling skylines, luxury shopping & harbour views',
    '5. Scenic landscapes, night markets & cultural charm',
    '6. Peaceful monasteries, Himalayan beauty & spiritual journeys',
    '7. Majestic mountains, sacred temples & adventure experiences'
  ];

  // The 7 Destinations Flip Cards
  const destinationCards = [
    {
      name: 'Japan',
      image: '/assets/images/cherry-blossoms-castle-himeji-japan-scaled.jpg'
    },
    {
      name: 'South Korea',
      image: '/assets/images/gyeongbukgung-maple-tree-autumn-korea-scaled.jpg'
    },
    {
      name: 'China',
      image: '/assets/images/travelling-china-scaled.jpg'
    },
    {
      name: 'Hong Kong',
      image: '/assets/images/junk-boat-hong-kong-victoria-harbour-scaled.jpg'
    },
    {
      name: 'Macau',
      image: '/assets/images/beautiful-architecture-building-scaled.jpg'
    },
    {
      name: 'Taiwan',
      image: '/assets/images/tourist-boat-ban-rak-thai-village-mae-hong-son-province-scaled.jpg'
    },
    {
      name: 'Mongolia',
      image: '/assets/images/yang-v4It5Tvnet8-unsplash-scaled.jpg'
    }
  ];

  // Quick Questions (FAQs)
  const faqs = [
    {
      q: '1. Are all adventures safe & monitored?',
      a: 'Adventure is an essential form of exercise we need in our life. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore. Et dolore magna aliqua.'
    },
    {
      q: '2. Custom plans for adventure available?',
      a: 'Essential form of exercise we need in our life. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore. Et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.'
    },
    {
      q: '3. Can activities be arranged with the trip?',
      a: 'If you need trip adventure is an essential form of exercise we need in our life. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore. Et dolore magna aliqua.'
    },
    {
      q: '4. Recommended activities for beginners?',
      a: 'Beginners can walk first essential form of exercise we need in our life. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore. Et dolore magna aliqua.'
    }
  ];

  return (
    <div className="bg-white font-sans text-gray-800 animate-fadeIn w-full overflow-x-hidden min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[460px] flex flex-col justify-end overflow-hidden">
        {/* Background Image with Fixed Effect */}
        <div className="absolute inset-0 z-0 bg-[#0a1712]">
          <img
            src="/assets/images/ChatGPT-Image-Aug-1-2026-11_13_45-PM.png"
            alt="Asian Countries"
            fetchpriority="high"
            decoding="async"
            className="w-full h-full object-cover opacity-85 transform scale-105"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 mb-20 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold text-white mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)] tracking-tight">
            Asian Countries
          </h1>
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-light tracking-wide text-white/95 drop-shadow-md">
            <Link to="/" className="hover:text-gray-200 transition-colors">Home</Link>
            <span className="text-gray-300">»</span>
            <span className="text-white font-normal">Asian Countries</span>
          </div>
        </div>

        {/* Hero Wave Divider */}
        <HeroWave />
      </section>

      {/* 2. Intro Section: Where Every Horizon Tells a Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading, Eyebrow & Paragraphs */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span
                className="text-2xl sm:text-3xl block mb-2 text-[#27B8B1] tracking-wide font-cursive"
                style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
              >
                Where Every Horizon Tells a Story
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-sans font-bold text-[#7cb342] leading-[1.15] mb-4">
                Where Every Horizon Tells a Story
              </h2>

              <div className="w-16 h-[3px] bg-[#27B8B1] mb-8 rounded-full"></div>
            </div>

            <div className="space-y-6 text-[#555555] font-light leading-relaxed text-[20px] font-sans">
              <p>
                We fell in love with East Asia somewhere between the timeless traditions of Japan and the vibrant energy of South Korea.
              </p>
              <p>
                From the neon-lit streets of Tokyo to the serene temples of Kyoto, from Seoul’s cutting-edge culture to the ancient wonders of China, Asia offers a captivating blend of heritage, innovation, and elegance. Discover the dynamic charm of Hong Kong, the hidden beauty of Taiwan, and the spiritual tranquility of Bhutan and Nepal. With our Asia tour packages from India, you can explore these extraordinary destinations with carefully crafted itineraries and personalized experiences. As the Best travel agency for Asia, we make planning your perfect Asian journey simple, seamless, and unforgettable.
              </p>
            </div>
          </div>

          {/* Right Column: Staggered Framed Images matching live site */}
          <div className="lg:col-span-5 relative pt-4 pb-8">
            <div className="relative w-full max-w-[460px] mx-auto lg:ml-auto">
              {/* Back Image (Himeji Castle Cherry Blossom) with teal border */}
              <div className="w-[88%] ml-auto aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-[8px] sm:border-[10px] border-[#27B8B1] relative z-10">
                <img
                  src="/assets/images/himeji-castle-with-beautiful-cherry-blossom-spring-season-hyogo-near-osaka-japan-scaled.jpg"
                  alt="Himeji Castle cherry blossom Japan"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Front Overlapping Image */}
              <div className="w-[74%] -mt-24 sm:-mt-28 relative z-20 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/assets/images/Untitled-design-17.png"
                  alt="Asian travel destination"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover block"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Jet-Tabs Navigation Bar (Sticky with Soft Sage Background) */}
      <section className="relative w-full bg-[#e6eee5] sticky top-20 z-30 shadow-[0_2px_8px_rgba(0,0,0,0.03)] border-y border-emerald-900/10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-center">
            {[
              { id: 1, label: 'Why Blackforest Holidays?' },
              { id: 2, label: 'Destinations' },
              { id: 3, label: 'Highlights' }
            ].map((tab, idx, arr) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex-1 relative py-5 sm:py-6 px-3 sm:px-6 text-center cursor-pointer transition-colors duration-200 group focus:outline-none"
                >
                  <span
                    className={`block text-base sm:text-lg md:text-[20px] transition-colors leading-tight ${
                      isActive
                        ? 'text-[#10221b] font-bold drop-shadow-sm'
                        : 'text-[#10221b]/80 hover:text-[#10221b] font-semibold'
                    }`}
                  >
                    {tab.label}
                  </span>

                  {/* Vertical Divider */}
                  {idx < arr.length - 1 && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 h-8 sm:h-9 w-[2px] bg-white pointer-events-none" />
                  )}

                  {/* Active Triangle Arrow */}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 pointer-events-none transition-all duration-300"
                      style={{
                        borderLeft: '14px solid transparent',
                        borderRight: '14px solid transparent',
                        borderBottom: '14px solid #ffffff'
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Jet-Tabs Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Tab 1: Why Blackforest Holidays? (Serene landscapes, pristine escapes) */}
        {activeTab === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start animate-fadeIn">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span
                  className="text-2xl sm:text-3xl block mb-2 text-[#27B8B1] tracking-wide font-cursive"
                  style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
                >
                  East Asia Escapes
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-sans font-bold text-[#7cb342] leading-tight mb-4">
                  Serene landscapes, pristine escapes, and refined natural beauty
                </h2>
                <div className="w-16 h-[3px] bg-[#27B8B1] mb-8 rounded-full"></div>
              </div>

              <div className="space-y-6 max-h-[580px] overflow-y-auto pr-3 no-scrollbar">
                {eastAsiaCountries.map((c, idx) => (
                  <div key={idx} className="border-b border-gray-200/80 pb-4">
                    <h5 className="font-bold text-[#10221b] text-lg sm:text-xl uppercase tracking-wider font-sans mb-1.5">
                      {c.name}
                    </h5>
                    <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                      {c.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => openEnquiryModal({ destination: 'Asian Countries' })}
                  className="px-8 py-3.5 bg-[#10221b] hover:bg-[#7cb342] text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-lg transition-all flex items-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Customize Itinerary</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="w-full h-[460px] sm:h-[560px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 sticky top-32">
                <img
                  src="/assets/images/3d-rendering-chinese-great-wall-scaled.jpg"
                  alt="Chinese Great Wall"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Destinations (Our Destinations in South East Asia) */}
        {activeTab === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start animate-fadeIn">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span
                  className="text-2xl sm:text-3xl block mb-2 text-[#27B8B1] tracking-wide font-cursive"
                  style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
                >
                  Tropical Escapes
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-sans font-bold text-[#7cb342] leading-tight mb-4">
                  Our Destinations in South East Asia
                </h2>
                <div className="w-16 h-[3px] bg-[#27B8B1] mb-8 rounded-full"></div>
              </div>

              <div className="space-y-6 max-h-[580px] overflow-y-auto pr-3 no-scrollbar">
                {southEastAsiaCountries.map((c, idx) => (
                  <div key={idx} className="border-b border-gray-200/80 pb-4">
                    <h5 className="font-bold text-[#10221b] text-lg sm:text-xl uppercase tracking-wider font-sans mb-1.5">
                      {c.name}
                    </h5>
                    <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                      {c.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => openEnquiryModal({ destination: 'South East Asia' })}
                  className="px-8 py-3.5 bg-[#10221b] hover:bg-[#7cb342] text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-lg transition-all flex items-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Customize Itinerary</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="w-full h-[460px] sm:h-[560px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 sticky top-32">
                <img
                  src="/assets/images/Untitled-design-11.png"
                  alt="South East Asia destinations"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Highlights */}
        {activeTab === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start animate-fadeIn">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span
                  className="text-2xl sm:text-3xl block mb-2 text-[#27B8B1] tracking-wide font-cursive"
                  style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
                >
                  Curated Encounters
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-sans font-bold text-[#7cb342] leading-tight mb-4">
                  Highlights
                </h2>
                <div className="w-16 h-[3px] bg-[#27B8B1] mb-8 rounded-full"></div>
              </div>

              <div className="space-y-4 pt-2">
                {highlights.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <CheckCircle2 className="w-5 h-5 text-[#27B8B1] shrink-0 mt-1" />
                    <span className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <button
                  onClick={() => openEnquiryModal({ destination: 'Asian Highlights' })}
                  className="px-8 py-3.5 bg-[#10221b] hover:bg-[#7cb342] text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-lg transition-all flex items-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Plan Your Journey</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="w-full h-[460px] sm:h-[560px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 sticky top-32">
                <img
                  src="/assets/images/picturesque-view-monastery-perched-cliff-with-prayer-flags-birds-flying-sky-scaled.jpg"
                  alt="Monastery perched cliff"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        )}

      </section>

      {/* 5. Parallax Promotional Banner: Start a trip now */}
      <section
        className="relative w-full h-[60vh] min-h-[460px] flex items-center justify-center overflow-hidden bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url('/assets/images/4.png')`
        }}
      >
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-[#27B8B1] font-bold text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 block font-sans">
            START A TRIP NOW
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-bold text-white mb-4 leading-tight drop-shadow-md">
            Lush mountains, night markets, and warm traditions.
          </h2>
          <p className="text-base sm:text-lg text-gray-200 mb-8 font-sans italic tracking-wide">
            Everything you need for an adventure.
          </p>
          <Link
            to="/contact"
            className="px-10 py-3.5 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#10221b] transition-all duration-300 text-xs font-bold uppercase tracking-[0.25em] shadow-lg rounded-sm"
          >
            CONTACT US
          </Link>
        </div>

        {/* Top Wave Mask */}
        <div className="absolute top-[-1px] left-0 w-full overflow-hidden leading-none z-20">
          <svg
            className="relative block w-full h-[40px] sm:h-[70px]"
            style={{ transform: 'rotate(180deg)' }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120H1200V81.334C1147.2 46.108 1083.74 38.649 1017.3 64.673 950.849 90.697 881.084 105.151 814.945 92.42 748.807 79.689 676.843 38.077 609.914 26.684 542.985 15.291 482.029 27.535 417.893 54.767 353.757 81.999 283.435 99.789 216.591 97.491 149.747 95.193 83.181 57.062 0 17.5V120Z"
              fill="#ffffff"
            />
          </svg>
        </div>

        {/* Bottom Wave Mask */}
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20">
          <svg
            className="relative block w-full h-[40px] sm:h-[70px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120H1200V81.334C1147.2 46.108 1083.74 38.649 1017.3 64.673 950.849 90.697 881.084 105.151 814.945 92.42 748.807 79.689 676.843 38.077 609.914 26.684 542.985 15.291 482.029 27.535 417.893 54.767 353.757 81.999 283.435 99.789 216.591 97.491 149.747 95.193 83.181 57.062 0 17.5V120Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* 6. "Our Destinations" Section with 7 Flip Cards (Exact elementor layout: 3 on top, 4 on bottom) */}
      <section id="our-destinations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-24">
        <div className="text-center mb-14">
          <span
            className="text-2xl sm:text-3xl block mb-2 text-[#27B8B1] tracking-wide font-cursive"
            style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
          >
            Signature Journeys
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-sans font-bold text-[#7cb342] mb-3">
            Our Destinations
          </h2>
          <div className="w-16 h-[3px] bg-[#27B8B1] mb-6 rounded-full mx-auto"></div>
          <p className="text-[#555555] font-light text-[20px] max-w-2xl mx-auto font-sans">
            Hover or click to explore signature retreats and personalized itineraries across Asian Countries.
          </p>
        </div>

        {/* Row 1: 3 Flip Cards (Japan, South Korea, China) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {destinationCards.slice(0, 3).map((c, i) => (
            <div
              key={i}
              className="group perspective-1000 h-[240px] sm:h-[260px] lg:h-[280px] cursor-pointer select-none"
              onClick={() => openEnquiryModal({ destination: `${c.name} (Asian Countries)` })}
            >
              <div className="flip-card-inner relative w-full h-full rounded-2xl shadow-sm group-hover:shadow-2xl transition-all duration-700">
                {/* Front Side: Pure Photograph */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden bg-gray-100 shadow-md">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Back Side: Dark Forest Tint Overlay & Centered Country Title */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transform scale-105"
                  />
                  <div className="absolute inset-0 bg-[#10221b]/70" />
                  <div className="absolute inset-0 flex items-center justify-center p-4 text-center z-10">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight drop-shadow-md font-sans">
                      {c.name}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: 4 Flip Cards (Hong Kong, Macau, Taiwan, Mongolia) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {destinationCards.slice(3).map((c, i) => (
            <div
              key={i}
              className="group perspective-1000 h-[240px] sm:h-[260px] lg:h-[280px] cursor-pointer select-none"
              onClick={() => openEnquiryModal({ destination: `${c.name} (Asian Countries)` })}
            >
              <div className="flip-card-inner relative w-full h-full rounded-2xl shadow-sm group-hover:shadow-2xl transition-all duration-700">
                {/* Front Side */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden bg-gray-100 shadow-md">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transform scale-105"
                  />
                  <div className="absolute inset-0 bg-[#10221b]/70" />
                  <div className="absolute inset-0 flex items-center justify-center p-4 text-center z-10">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight drop-shadow-md font-sans">
                      {c.name}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Quick Questions (FAQ Section matching live site with faq-img.jpg background) */}
      <section
        className="relative w-full py-20 bg-fixed bg-cover bg-center border-t border-gray-100"
        style={{
          backgroundImage: `url('/assets/images/faq-img.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <span
              className="text-2xl sm:text-3xl block mb-2 text-[#27B8B1] tracking-wide font-cursive"
              style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
            >
              Anything you need to know
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-sans font-bold text-[#7cb342] mb-3">
              Quick Questions
            </h2>
            <div className="w-16 h-[3px] bg-[#27B8B1] mb-6 rounded-full mx-auto"></div>
          </div>

          {/* 2-Column FAQ Layout matching elementor dt-sc-custom-faq */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none hover:bg-gray-50/60 transition-colors"
                  >
                    <h5 className="font-bold text-base sm:text-[18px] text-[#10221b] font-sans">
                      {faq.q}
                    </h5>
                    <div className="text-[#27B8B1] flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-6 pt-1 sm:px-6 text-[#555555] font-light leading-relaxed text-[17px] sm:text-[18px] border-t border-gray-100/70 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Island Story / Stats Counters Section matching live site with number-counter-bg.png */}
      <section
        className="w-full py-20 relative bg-cover bg-center border-t border-gray-100"
        style={{
          backgroundImage: `url('/assets/images/number-counter-bg.png')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Side: Cursive Tagline, Heading, Paragraph */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <span
                className="text-2xl sm:text-3xl lg:text-[32px] block font-medium tracking-wide font-cursive text-[#27B8B1]"
                style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
              >
                Your Island Story Begins Here
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#10221b] leading-[1.15] font-sans">
                Escape to extraordinary islands
              </h2>

              <p className="text-[#555555] font-light text-[20px] leading-relaxed max-w-md pt-2 font-sans">
                From secluded beaches to unforgettable adventures, discover island journeys designed around you.
              </p>
            </div>

            {/* Right Side: Clean Stat Numbers */}
            <div className="lg:col-span-6 space-y-6 pt-2">
              <div className="grid grid-cols-3 gap-4 sm:gap-6 items-start">
                
                {/* Stat 1: 50+ */}
                <div className="text-left space-y-1">
                  <span className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#10221b] leading-none block font-sans">
                    <AnimatedCounter end={50} suffix="+" />
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#10221b] leading-snug block font-sans">
                    Island <br />
                    Destinations
                  </span>
                </div>

                {/* Stat 2: 25 */}
                <div className="text-left space-y-1">
                  <span className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#10221b] leading-none block font-sans">
                    <AnimatedCounter end={25} />
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#10221b] leading-snug block font-sans">
                    Countries
                  </span>
                </div>

                {/* Stat 3: 150+ */}
                <div className="text-left space-y-1">
                  <span className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#10221b] leading-none block font-sans">
                    <AnimatedCounter end={150} suffix="+" />
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#10221b] leading-snug block font-sans">
                    Tailor-Made <br />
                    Journeys
                  </span>
                </div>

              </div>

              {/* Testimonial Quote */}
              <p className="text-xs sm:text-[14px] text-gray-600 font-light leading-relaxed pt-5 border-t border-gray-200/80 italic max-w-lg font-sans">
                For BlackForest Holidays, I recommend &ldquo;Curated Journeys&rdquo; instead of &ldquo;Tours&rdquo; because it sounds more premium and luxurious.
              </p>

              {/* Tag #ventura */}
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#27B8B1]">
                  #ventura
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
