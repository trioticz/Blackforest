import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { experiencesData } from '../../data/experiencesData';
import { useSettings } from '../../context/SiteSettingsContext';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

const ALL_EXPERIENCES = [
  {
    slug: 'adventure-nature',
    title: 'Adventure & Nature',
    tagline: 'Where the Journey Becomes the Adventure',
    description: 'Step beyond the ordinary and experience the world at its most spectacular. From mountain trails and tropical forests to thrilling outdoor adventures and remote wilderness escapes.',
    heroImage: '/assets/images/ChatGPT-Image-Aug-8-2026-05_59_39-PM.png',
    highlights: ['Mountain & Trekking', 'Wildlife Encounters', 'Jungle Expeditions', 'Water Adventures'],
  },
  {
    slug: 'island-holidays',
    title: 'Island Holidays',
    tagline: 'Escape to Paradise, Discover Your Perfect Island',
    description: 'Leave the everyday behind and discover pristine beaches, luxurious resorts, turquoise lagoons, and private beachfront villas across the Maldives, Mauritius, Seychelles, and beyond.',
    heroImage: '/assets/images/pexels-asadphoto-9394652-scaled.jpg',
    highlights: ['Luxury Island Resorts', 'Private Island Escapes', 'Beach & Relaxation', 'Island Hopping'],
  },
  {
    slug: 'family-holidays',
    title: 'Family Holidays',
    tagline: 'Create Memories That Last a Lifetime',
    description: 'Personalised family holiday packages combining comfort, adventure, and relaxation for every generation, from exciting theme parks to unforgettable cultural explorations.',
    heroImage: '/assets/images/family-holidays-nsw-main.jpg',
    highlights: ['Family Beach Escapes', 'Wildlife & Safari', 'Theme Parks & Attractions', 'Multi-Generational'],
  },
  {
    slug: 'honeymoon-escapes',
    title: 'Honeymoon Escapes',
    tagline: 'Begin Your Forever With an Unforgettable Journey',
    description: 'Romantic international honeymoon packages designed around your love story, featuring candlelit dining, private villas, sunset cruises, and secluded tropical retreats.',
    heroImage: '/assets/images/pexels-asadphoto-1024967.jpg',
    highlights: ['Luxury Beach Escapes', 'Private Island Retreats', 'Candlelight Dining', 'Couples Experiences'],
  },
  {
    slug: 'luxury-escapes',
    title: 'Luxury Escapes',
    tagline: 'Bespoke Journeys. Exceptional Places. Unforgettable Moments.',
    description: 'The pinnacle of bespoke travel featuring private villas, iconic 5-star resorts, fine dining, private charters, and dedicated VIP concierge services.',
    heroImage: '/assets/images/dino-reichmuth-A5rCN8626Ck-unsplash-scaled.jpg',
    highlights: ['Exclusive Resorts & Villas', 'Private Experiences', 'Luxury Safaris', 'VIP Concierge'],
  },
];

export default function ExperiencesPage({ forcedSlug }) {
  const { slug: routeSlug } = useParams();
  const location = useLocation();
  const { openEnquiryModal } = useSettings();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Determine slug from props, route params, or pathname (/adventure-nature, etc.)
  const pathSlug = location.pathname.replace(/^\/(experiences\/)?/, '').replace(/\/$/, '');
  const slug = forcedSlug || routeSlug || (experiencesData[pathSlug] ? pathSlug : null);

  // Scroll to top on mount/slug change
  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentSlide(0);
  }, [slug]);

  const isOverview = !slug;
  const data = slug ? experiencesData[slug] : null;

  const carouselImages =
    data?.experiencesList?.images?.length > 0
      ? data.experiencesList.images
      : [data?.heroImage, data?.heroImage, data?.heroImage].filter(Boolean);

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
    if (!carouselImages || carouselImages.length === 0) return [];
    return [
      carouselImages[currentSlide],
      carouselImages[(currentSlide + 1) % carouselImages.length],
      carouselImages[(currentSlide + 2) % carouselImages.length],
    ];
  };

  // ------------------------------------------------------------------
  // 1. OVERVIEW PAGE: When visiting /experiences (All Inner Pages Showcase)
  // ------------------------------------------------------------------
  if (isOverview) {
    return (
      <div className="animate-fadeIn bg-white font-sans text-gray-800 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative h-[65vh] min-h-[500px] flex flex-col items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/images/dino-reichmuth-A5rCN8626Ck-unsplash-scaled.jpg"
              alt="Curated Travel Experiences"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45 z-0" />
          </div>

          <div className="relative z-10 text-white flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
            <span className="text-[#f29727] text-xs uppercase font-bold tracking-[0.25em] mb-3">
              Bespoke Journey Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold tracking-tight mb-4 drop-shadow-xl font-sans">
              Curated Experiences
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm md:text-base font-light drop-shadow-md tracking-wider">
              <Link to="/" className="hover:text-gray-200 transition-colors">Home</Link>
              <span className="text-[10px] opacity-80">▾</span>
              <span className="text-white">Experiences</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full z-10 text-white">
            <svg viewBox="0 0 1920 120" fill="currentColor" preserveAspectRatio="none" className="w-full h-auto max-h-[120px] block">
              <path d="M0,120 L1920,120 L1920,80 C1700,140 1400,20 1000,80 C600,140 300,20 0,80 Z" />
            </svg>
          </div>
        </section>

        {/* Intro Section */}
        <section className="bg-white py-16 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-2xl sm:text-3xl block mb-2 font-cursive text-[#27B8B1]">
            Bespoke Travel Styles
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-[#10221b] leading-[1.15] mb-6">
            Crafted for Every Way You Wish to Explore
          </h2>
          <div className="w-24 h-[1.5px] bg-[#10221b] mx-auto mb-6"></div>
          <p className="text-gray-600 text-[15px] sm:text-[16px] leading-[1.75] font-light max-w-3xl mx-auto">
            At BlackForest Holidays, we believe no two journeys should ever be the same. Whether you seek the thrill of wild terrain, the serenity of an overwater villa, meaningful family adventures, or the ultimate in private luxury, explore our curated collection of tailor-made experience portfolios below.
          </p>
        </section>

        {/* All 5 Inner Pages in Experiences Grid */}
        <section className="py-12 pb-24 bg-[#fbfaf8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ALL_EXPERIENCES.map((exp) => (
                <div
                  key={exp.slug}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group border border-gray-100 flex flex-col justify-between"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={exp.heroImage}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 bg-[#10221b]/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {exp.title}
                    </span>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold font-sans text-[#10221b] mb-1 group-hover:text-[#5e963b] transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#27B8B1] mb-3">
                        {exp.tagline}
                      </p>
                      <p className="text-gray-600 text-[14.5px] font-light leading-[1.7] mb-6">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {exp.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="text-xs bg-[#f4f7f5] text-gray-700 px-2.5 py-1 rounded-md font-medium"
                          >
                            • {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      to={`/experiences/${exp.slug}`}
                      className="w-full py-3 bg-[#10221b] text-white hover:bg-[#5e963b] text-xs font-bold uppercase tracking-widest text-center rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Explore {exp.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-20 bg-white text-center border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#f29727] block mb-2">
              Start Planning Today
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-[#10221b] mb-4">
              Ready to Design Your Perfect Experience?
            </h2>
            <p className="text-gray-600 text-[15px] sm:text-[16px] font-light leading-relaxed max-w-xl mx-auto mb-8">
              Speak with our destination specialists to tailor every detail around your comfort, interests, and schedule.
            </p>
            <button
              onClick={() => openEnquiryModal({ title: 'Experiences Consultation' })}
              className="px-10 py-3.5 bg-[#10221b] text-white hover:bg-[#5e963b] text-xs font-bold uppercase tracking-widest rounded-sm transition-colors shadow-lg cursor-pointer"
            >
              Enquire Now &rarr;
            </button>
          </div>
        </section>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // 2. ERROR STATE: If unknown slug
  // ------------------------------------------------------------------
  if (!data) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[50vh]">
        <Compass className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h1 className="text-3xl font-bold font-sans text-[#10221b]">Experience not found</h1>
        <p className="text-gray-500 text-sm mt-2">Explore our full experiences portfolio below.</p>
        <Link to="/experiences" className="text-[#f29727] underline mt-4 inline-block font-semibold">
          View All Experiences
        </Link>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // 3. SINGLE INNER EXPERIENCE PAGE (/experiences/:slug)
  // ------------------------------------------------------------------
  const otherExperiences = ALL_EXPERIENCES.filter((e) => e.slug !== slug);

  return (
    <div className="animate-fadeIn bg-white font-sans text-gray-800 overflow-x-hidden">

      {/* 1. Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src={data.heroImage} alt={data.title} className="w-full h-full object-cover" />
          {/* Dark vignette overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 z-0" />
        </div>
        
        {/* Content with breadcrumb perfectly centered */}
        <div className="relative z-10 text-white flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold tracking-tight mb-4 drop-shadow-xl font-sans">
            {data.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-light drop-shadow-md tracking-wider">
            <Link to="/" className="hover:text-gray-200 transition-colors">Home</Link>
            <span className="text-[10px] opacity-80">▾</span>
            <Link to="/experiences" className="hover:text-gray-200 transition-colors">Experiences</Link>
            <span className="text-[10px] opacity-80">▾</span>
            <span className="text-white">{data.title}</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-10 text-white">
          <svg viewBox="0 0 1920 120" fill="currentColor" preserveAspectRatio="none" className="w-full h-auto max-h-[120px] block">
            <path d="M0,120 L1920,120 L1920,80 C1700,140 1400,20 1000,80 C600,140 300,20 0,80 Z" />
          </svg>
        </div>
      </section>

      {/* 2. Intro Section */}
      <section className="bg-white -mt-2 pb-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">

          {/* Row 1: Intro Text and Image (2 Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
            <div className="space-y-8 lg:pr-4">
              <div>
                <span className="text-2xl sm:text-3xl block mb-2 font-cursive text-[#27B8B1]">
                  {data.title}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-[#10221b] leading-[1.15] mb-6">
                  {data.intro?.title}
                </h2>
                <div className="w-24 h-[1.5px] bg-[#10221b] mb-8"></div>
              </div>

              <div className="space-y-6 text-gray-600 text-[15px] sm:text-[16px] leading-[1.75] font-light">
                <p>{data.intro?.text1}</p>
                <p>{data.intro?.text2}</p>
              </div>
            </div>

            <div className="relative pl-6 pt-6 mt-8 lg:mt-0 w-full max-w-lg mx-auto lg:ml-auto">
              <div className="absolute top-0 left-0 w-[95%] h-[95%] border-[3px] border-[#18c4c7] z-0"></div>
              <img
                src={data.intro?.image || data.heroImage}
                alt={data.title}
                className="relative z-10 w-full h-auto object-cover shadow-sm bg-white p-2 aspect-[4/3]"
              />
            </div>
          </div>

          {/* Row 2: Subsequent Content (Full Width) */}
          <div className="space-y-10">
            {data.section2?.title && (
              <div>
                <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#10221b] mb-3">{data.section2?.title}</h3>
                <p className="text-gray-600 text-[15px] sm:text-[16px] leading-[1.75] font-light">{data.section2?.text}</p>
              </div>
            )}

            {data.experiencesList?.items && (
              <div>
                <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#10221b] mb-4">
                  {data.experiencesList?.includesHeading || `Our ${data.title} Include:`}
                </h3>
                <ul className="space-y-3">
                  {data.experiencesList.items.map((item, idx) => (
                    <li key={idx} className="text-[15px] sm:text-[16px] text-gray-600 font-light leading-[1.75]">
                      <span className="text-gray-800 font-bold">{idx + 1}. {item.title}</span> — {item.desc}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(data.destinations?.heading || data.destinations?.text) && (
              <div>
                <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#10221b] mb-3">
                  {data.destinations?.heading}
                </h3>
                <p className="text-gray-600 text-[15px] sm:text-[16px] leading-[1.75] font-light">
                  {data.destinations?.text}
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 3. Carousel Section */}
      <section className="relative py-20 overflow-hidden group">
        <div className="absolute inset-0 w-full h-full flex z-0 pointer-events-none">
          <div className="w-[30%] h-full bg-[#f6f6f6]"></div>
          <div className="w-[70%] h-full bg-white"></div>
        </div>

        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 relative z-10 flex items-center justify-between gap-4 md:gap-8">

          <button onClick={handlePrev} className="z-20 flex items-center justify-center text-[#10221b] hover:text-[#5e963b] transition-all transform hover:scale-110 hover:-translate-x-2 shrink-0 cursor-pointer" aria-label="Previous image">
            <svg viewBox="0 0 100 40" className="w-16 h-16 sm:w-24 sm:h-24 stroke-current fill-none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M90 20 Q 55 18 10 20" />
              <path d="M 12 20 Q 25 12 30 7" />
              <path d="M 12 20 Q 25 28 30 33" />
            </svg>
          </button>

          <div className="flex-1 overflow-hidden px-2">
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-10 transition-all duration-700 ease-in-out">
              {getVisibleImages().map((img, idx) => (
                <div key={`${currentSlide}-${idx}`} className="w-1/3 max-w-[400px] aspect-square overflow-hidden shadow-lg animate-fadeIn flex-shrink-0">
                  <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>

          <button onClick={handleNext} className="z-20 flex items-center justify-center text-[#10221b] hover:text-[#5e963b] transition-all transform hover:scale-110 hover:translate-x-2 shrink-0 cursor-pointer" aria-label="Next image">
            <svg viewBox="0 0 100 40" className="w-16 h-16 sm:w-24 sm:h-24 stroke-current fill-none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 20 Q 45 22 90 20" />
              <path d="M 88 20 Q 75 12 70 7" />
              <path d="M 88 20 Q 75 28 70 33" />
            </svg>
          </button>

        </div>
      </section>

      {/* 4. Why Choose Us / Bottom Grid */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="text-3xl md:text-4xl font-sans font-bold text-[#5e963b] mb-12">
            {data.whyChooseUs?.heading || 'Why Choose BlackForest Holidays?'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {data.whyChooseUs?.features?.map((feature, idx) => (
              <div key={idx}>
                <h4 className="text-[17px] font-bold text-[#10221b] mb-2 font-sans">{feature.title}</h4>
                <p className="text-gray-600 text-[14px] sm:text-[14.5px] font-light leading-[1.7]">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="space-y-8">
              <div>
                <h3 className="text-3xl md:text-[38px] font-sans font-bold text-[#5e963b] leading-tight mb-4">
                  {data.cta?.heading}
                </h3>
                <div className="w-16 h-[2px] bg-[#f29727]"></div>
              </div>

              <p className="text-gray-600 text-[15px] sm:text-[16px] leading-[1.75] font-light max-w-md">
                {data.closing?.text}
              </p>

              <div>
                <h4 className="text-xs font-bold text-[#10221b] uppercase tracking-[0.2em] mb-4">
                  {data.closing?.heading}
                </h4>
                <button
                  onClick={() => openEnquiryModal({ title: `${data.title} Enquiry` })}
                  className="bg-[#10221b] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#5e963b] transition-colors shadow-md rounded-sm cursor-pointer"
                >
                  {data.cta?.buttonText || 'Enquire Now'} &rarr;
                </button>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute top-[-10%] right-[-10%] w-[120%] h-[120%] opacity-[0.05] z-0 pointer-events-none bg-no-repeat bg-right-top bg-contain"
                style={{ backgroundImage: `url('${data.bottomSection?.decorativeImage || ''}')` }}
              ></div>

              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="space-y-4 pt-12">
                  <img src={data.bottomSection?.collageImages?.[0]} alt="Collage 1" className="w-full h-48 object-cover rounded-md" />
                  <img src={data.bottomSection?.collageImages?.[1]} alt="Collage 2" className="w-full h-56 object-cover rounded-md" />
                </div>
                <div>
                  <img src={data.bottomSection?.collageImages?.[2]} alt="Collage 3" className="w-full h-[400px] object-cover rounded-md" />
                  <div className="mt-8">
                    <h4 className="text-[#5e963b] text-2xl font-bold leading-tight pr-4">
                      {data.bottomSection?.quote}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Explore Other Inner Experiences Section */}
      <section className="py-20 bg-[#fbfaf8] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#27B8B1] font-cursive text-2xl sm:text-3xl block mb-1">
              Explore More Journeys
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold text-[#10221b]">
              Other Experiences You Might Love
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherExperiences.map((exp) => (
              <Link
                key={exp.slug}
                to={`/experiences/${exp.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={exp.heroImage}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white font-bold text-lg font-sans drop-shadow-md">
                    {exp.title}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed mb-4 line-clamp-2">
                    {exp.description}
                  </p>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#10221b] group-hover:text-[#5e963b] flex items-center gap-1 transition-colors">
                    Explore Experience &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}