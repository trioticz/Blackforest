import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck, CheckCircle2, ChevronDown, ChevronUp, Compass, ArrowLeft } from 'lucide-react';
import { destinationService } from '../../services/allServices';
import { useSettings } from '../../context/SiteSettingsContext';
import { allDestinationsData } from '../../data/destinationsData';
import { isDestinationPublished, DESTINATIONS_EVENT } from '../../utils/destinationsManager';
import { getPublishedExpertiseCards, EXPERTISE_EVENT } from '../../utils/expertiseManager';
import { resolveImageUrl, handleImageError } from '../../utils/imageHelper';

// Dynamic Animated Counter for Stats
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

export default function DestinationDetailPage({ forcedSlug }) {
  const { slug: routeSlug } = useParams();
  const location = useLocation();
  const { openEnquiryModal } = useSettings();

  // Determine and clean slug from props, route params, or pathname
  const rawSlug = (
    forcedSlug ||
    routeSlug ||
    location.pathname.replace(/^\/(destinations\/)?/, '').replace(/\/$/, '') ||
    'africa'
  ).toLowerCase().replace(/_/g, '-');

  let cleanSlug = rawSlug;
  if (cleanSlug === 'middle-east-countries') cleanSlug = 'middle-east';
  if (cleanSlug === 'indian-ocean') cleanSlug = 'indian-ocean';

  const [activeTab, setActiveTab] = useState(1);
  const [openFaq, setOpenFaq] = useState(null);
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPublished, setIsPublished] = useState(() => isDestinationPublished(cleanSlug));
  const [partnerCards, setPartnerCards] = useState(() => getPublishedExpertiseCards());

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Fallback to our rich curated dataset extracted from live site
  const staticData = allDestinationsData[cleanSlug] || allDestinationsData[rawSlug] || allDestinationsData['africa'];

  useEffect(() => {
    const updatePublishStatus = () => {
      setIsPublished(isDestinationPublished(cleanSlug));
    };
    const updatePartners = () => {
      setPartnerCards(getPublishedExpertiseCards());
    };

    updatePublishStatus();
    updatePartners();

    window.addEventListener(DESTINATIONS_EVENT, updatePublishStatus);
    window.addEventListener(EXPERTISE_EVENT, updatePartners);
    window.addEventListener('storage', updatePublishStatus);
    window.addEventListener('storage', updatePartners);

    return () => {
      window.removeEventListener(DESTINATIONS_EVENT, updatePublishStatus);
      window.removeEventListener(EXPERTISE_EVENT, updatePartners);
      window.removeEventListener('storage', updatePublishStatus);
      window.removeEventListener('storage', updatePartners);
    };
  }, [cleanSlug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveTab(1);

    const fetchDestination = async () => {
      setLoading(true);
      try {
        const res = await destinationService.getBySlug(cleanSlug);
        if (res.success && res.data) {
          setDestination(res.data);
        }
      } catch (err) {
        // Fallback to rich staticData
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [cleanSlug]);

  const regionName = staticData.name;
  const name = destination?.name || staticData.name;
  const intro = staticData.intro;
  const tabs = staticData.tabs;
  const parallaxBanner = staticData.parallaxBanner;
  const countries = staticData.countries || [];
  const faqs = staticData.faqs || [];
  const stats = staticData.stats;
  const heroImage = staticData.heroImage || destination?.heroImage;

  // If unpublished by admin, do not show on website
  if (!isPublished) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-32 bg-[#fbfaf8]">
        <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-6 shadow-sm">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#f29727] mb-2 block">
          Destination Unavailable
        </span>
        <h1 className="text-3xl sm:text-4xl font-sans font-bold text-[#10221b] mb-4">
          {name} is Currently Unpublished
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
          This destination portfolio is currently inactive or undergoing seasonal curation. Please explore our other destinations or contact our concierge.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/destinations"
            className="px-7 py-3 bg-[#10221b] text-[#f29727] rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#1c382e] shadow-lg transition-all flex items-center gap-2"
          >
            <span>Explore Other Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/"
            className="px-7 py-3 bg-white text-gray-700 border border-gray-200 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gray-50 shadow-sm transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white animate-fadeIn w-full overflow-x-hidden min-h-screen">
      {/* 1. Hero Banner */}
      <section className="relative w-full h-[64vh] min-h-[480px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={resolveImageUrl(heroImage)}
            alt={regionName}
            onError={handleImageError}
            className="absolute inset-0 w-full h-full object-cover object-center transform scale-105"
          />
          {/* Dark vignette overlay */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 mt-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)] capitalize tracking-tight leading-tight">
            {regionName}
          </h1>
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide text-white/95 drop-shadow-md">
            <Link to="/" className="hover:text-[#f29727] transition-colors">Home</Link>
            <span className="text-[10px] opacity-80">▾</span>
            <span className="text-white font-semibold">{regionName}</span>
          </div>
        </div>

        {/* Pine Forest Silhouette & Organic Wave Cut */}
        <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none overflow-hidden leading-none">
          <img
            src="/pine-forest.webp"
            alt="Black Forest Pine Trees"
            className="w-full h-24 sm:h-36 md:h-44 object-cover object-bottom"
            style={{
              filter: 'drop-shadow(0 -3px 5px rgba(0,0,0,0.35))'
            }}
          />
          <svg
            className="absolute bottom-[-1px] left-0 w-full h-[45px] sm:h-[75px] md:h-[90px]"
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

      {/* 2. Intro Section with Cursive Tagline & Overlapping Staggered Imagery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Cursive Eyebrow, Heading, Paragraph, and Lower Image */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span
                className="block text-2xl sm:text-3xl md:text-4xl text-[#1dc5ce] mb-2 tracking-wide font-normal font-cursive"
                style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
              >
                {intro.eyebrow || staticData.tagline || 'Where Every Horizon Tells a Story'}
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-[#5ba14a] leading-[1.15] mb-4">
                {intro.title}
              </h2>
              <div className="w-16 h-[3px] bg-[#27B8B1] mb-6 rounded-full"></div>

              <div className="text-[#555555] font-light text-[20px] leading-relaxed space-y-4 font-sans">
                <p>{intro.description}</p>
              </div>
            </div>

            {/* Overlapping Lower Image */}
            {intro.img1 && (
              <div className="relative w-full max-w-lg h-[240px] sm:h-[300px] rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <img
                  src={resolveImageUrl(intro.img1)}
                  alt={`${name} feature`}
                  onError={handleImageError}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            )}
          </div>

          {/* Right Column: Tall Portrait Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            {intro.img2 && (
              <div className="w-full max-w-md h-[460px] sm:h-[580px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src={resolveImageUrl(intro.img2)}
                  alt={`${name} highlight portrait`}
                  onError={handleImageError}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Jet-Tabs Navigation Bar */}
      <section className="relative w-full bg-[#e6eee5] sticky top-20 z-30 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
        <div
          className="absolute -top-20 left-0 right-0 h-20 bg-repeat-x bg-bottom pointer-events-none opacity-40 select-none"
          style={{
            backgroundImage: "url('/assets/images/adventure-pine-bg.jpg')",
            backgroundSize: 'auto 80px',
          }}
        />

        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-center">
            {[
              { id: 1, label: tabs.tab1?.label || 'Why Blackforest Holidays?' },
              { id: 2, label: tabs.tab2?.label || 'Destinations' },
              { id: 3, label: tabs.tab3?.label || 'Highlights' },
            ].map((tab, idx, arr) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex-1 relative py-6 sm:py-7 px-3 sm:px-6 text-center cursor-pointer transition-colors duration-200 group focus:outline-none"
                >
                  <span
                    className={`block text-base sm:text-lg md:text-[20px] transition-colors leading-tight ${isActive
                      ? 'text-[#10221b] font-bold drop-shadow-sm'
                      : 'text-[#10221b]/90 hover:text-[#10221b] font-semibold'
                      }`}
                    style={{ fontFamily: "'Palanquin Dark', sans-serif" }}
                  >
                    {tab.label}
                  </span>

                  {idx < arr.length - 1 && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 h-8 sm:h-9 w-[2px] bg-white pointer-events-none" />
                  )}

                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 pointer-events-none transition-all duration-300"
                      style={{
                        borderLeft: '14px solid transparent',
                        borderRight: '14px solid transparent',
                        borderBottom: '14px solid #ffffff',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Jet-Tabs Dynamic Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Tab 1: Why Blackforest Holidays? */}
        {activeTab === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center animate-fadeIn">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#10221b] block font-sans">
                {tabs.tab1?.subtitle || 'Every Journey Feels Legendary'}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-[#5ba14a] leading-tight">
                {tabs.tab1?.title}
              </h2>
              <p className="text-[#555555] font-light text-[20px] leading-relaxed font-sans">
                {tabs.tab1?.description}
              </p>
              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => openEnquiryModal({ destination: name })}
                  className="px-8 py-3.5 bg-[#10221b] hover:bg-[#1c382e] text-[#f29727] font-bold text-xs uppercase tracking-widest rounded-full shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Customize Itinerary</span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="w-full h-[360px] sm:h-[440px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src={resolveImageUrl(tabs.tab1?.image)}
                  alt={tabs.tab1?.title}
                  onError={handleImageError}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Destinations */}
        {activeTab === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center animate-fadeIn">
            <div className="lg:col-span-6 space-y-6 max-h-[600px] overflow-y-auto pr-4 no-scrollbar">
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#10221b] block font-sans">
                {tabs.tab2?.subtitle || 'Our Curated Footprint'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-[#5ba14a] leading-tight">
                {tabs.tab2?.title}
              </h2>
              <div className="space-y-4 pt-2">
                {tabs.tab2?.items?.map((item, idx) => (
                  <div key={idx} className="border-b border-gray-200/80 pb-3.5">
                    <h4 className="text-[19px] font-bold text-[#10221b] mb-1 font-sans">
                      {item.name}
                    </h4>
                    <p className="text-[#555555] font-light text-[17px] leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 sticky top-32">
                <img
                  src={resolveImageUrl(tabs.tab2?.image)}
                  alt={tabs.tab2?.title}
                  onError={handleImageError}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Highlights */}
        {activeTab === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center animate-fadeIn">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#10221b] block font-sans">
                {tabs.tab3?.subtitle || 'Signature Experiences'}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-[#5ba14a] leading-tight">
                {tabs.tab3?.title}
              </h2>
              <div className="space-y-3 pt-2">
                {tabs.tab3?.highlights?.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-[18px] text-gray-700 leading-relaxed font-sans font-light">
                    <CheckCircle2 className="w-5 h-5 text-[#5ba14a] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="w-full h-[360px] sm:h-[440px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src={resolveImageUrl(tabs.tab3?.image)}
                  alt={tabs.tab3?.title}
                  onError={handleImageError}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 5. Parallax Promotional Luxury Banner */}
      <section
        className="relative w-full h-[60vh] min-h-[460px] flex items-center justify-center overflow-hidden bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url('${parallaxBanner?.bgImage || '/assets/images/4.png'}')`
        }}
      >
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-[#27B8B1] font-bold text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 block font-sans">
            {parallaxBanner?.eyebrow || 'START A TRIP NOW'}
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-bold text-white mb-4 leading-tight drop-shadow-md">
            {parallaxBanner?.title || 'Discover the World Through a Lens of Luxury'}
          </h2>
          <p className="text-base sm:text-lg text-gray-200 mb-8 font-sans italic tracking-wide">
            {parallaxBanner?.subtitle || 'Everything you need for an adventure.'}
          </p>
          <Link
            to={parallaxBanner?.buttonLink || '/contact'}
            className="px-10 py-3.5 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#10221b] transition-all duration-300 text-xs font-bold uppercase tracking-[0.25em] shadow-lg rounded-sm"
          >
            {parallaxBanner?.buttonText || 'CONTACT US'}
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

      {/* 6. "Our Destinations" Section with 3D Flip Cards Grid */}
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
            Hover or click to explore signature retreats and personalized itineraries across {name}.
          </p>
        </div>

        {/* 3D Flip Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {countries.map((c, i) => (
            <div
              key={i}
              className="group perspective-1000 h-[240px] sm:h-[260px] lg:h-[280px] cursor-pointer select-none"
              onClick={() => openEnquiryModal({ destination: `${c.name} (${name})` })}
            >
              <div className="flip-card-inner relative w-full h-full rounded-2xl shadow-sm group-hover:shadow-2xl transition-all duration-700">
                {/* Front Side: Pure Photograph */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden bg-gray-100 shadow-md">
                  <img
                    src={resolveImageUrl(c.image)}
                    alt={c.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Back Side: Dark Forest Tint Overlay & Centered Country Title */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={resolveImageUrl(c.image)}
                    alt={c.name}
                    onError={handleImageError}
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

          {/* 2-Column FAQ Layout matching Elementor dt-sc-custom-faq */}
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
                    <div className="px-5 pb-6 pt-1 sm:px-6 text-[#555555] font-light leading-relaxed text-[17px] sm:text-[18px] border-t border-gray-100/70 animate-fadeIn font-sans">
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
          backgroundImage: `url('${stats?.bgImage || '/assets/images/number-counter-bg.png'}')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* Left Side: Cursive Eyebrow, Heading, Paragraph */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <span
                className="text-2xl sm:text-3xl lg:text-[32px] block font-medium tracking-wide font-cursive text-[#27B8B1]"
                style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
              >
                {stats?.eyebrow || 'Your Island Story Begins Here'}
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#10221b] leading-[1.15] font-sans">
                {stats?.title || 'Escape to extraordinary islands'}
              </h2>

              <p className="text-[#555555] font-light text-[20px] leading-relaxed max-w-md pt-2 font-sans">
                {stats?.desc || 'From secluded beaches to unforgettable adventures, discover island journeys designed around you.'}
              </p>
            </div>

            {/* Right Side: Clean Stat Numbers */}
            <div className="lg:col-span-6 space-y-6 pt-2">
              <div className="grid grid-cols-3 gap-4 sm:gap-6 items-start">

                {/* Stat 1: 500+ */}
                <div className="text-left space-y-1">
                  <span className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#10221b] leading-none block font-sans">
                    <AnimatedCounter end={stats?.counters?.[0]?.value || 500} suffix={stats?.counters?.[0]?.suffix || '+'} />
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#10221b] leading-snug block font-sans">
                    Island <br />
                    Destinations
                  </span>
                </div>

                {/* Stat 2: 20+ */}
                <div className="text-left space-y-1">
                  <span className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#10221b] leading-none block font-sans">
                    <AnimatedCounter end={stats?.counters?.[1]?.value || 20} suffix={stats?.counters?.[1]?.suffix || '+'} />
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#10221b] leading-snug block font-sans">
                    Countries
                  </span>
                </div>

                {/* Stat 3: 1000+ */}
                <div className="text-left space-y-1">
                  <span className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#10221b] leading-none block font-sans">
                    <AnimatedCounter end={stats?.counters?.[2]?.value || 1000} suffix={stats?.counters?.[2]?.suffix || '+'} />
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

              {/* Tag #ventura
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#27B8B1]">
                  #ventura
                </span>
              </div> */}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
