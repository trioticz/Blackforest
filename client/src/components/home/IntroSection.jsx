import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

/**
 * Card order matches the reference site exactly (from screenshots):
 * Visible set 1: [Corporate] [Luxury★] [Honeymoon]
 * Visible set 2: [Inbond]    [Cruise★] [Visa]
 *
 * ★ = highlighted centre card (golden/orange title)
 *
 * Images: user downloaded 2nd1‥2nd6 from the reference site.
 * Mapping assumes reference-site DOM order = Luxury, Honeymoon, Inbond, Cruise, Visa, Corporate
 * The CAROUSEL starts with Corporate on the left so the first centre is Luxury.
 */
const CARDS = [
  {
    id: 'visa',
    title: 'Visa &\nAir Tickets',
    description: 'Hassle-free visa processing and international flight bookings for a smooth, seamless journey.',
    image: '/2nd1.webp',
    titleColor: '#1c2b25',
  },
  {
    id: 'corporate',
    title: 'Corporate &\nGroup Packages',
    description: 'Effortless journeys for corporate teams, MICE groups, and private gatherings.',
    image: '/2nd2.webp',
    titleColor: '#c8860b',
  },
  {
    id: 'luxury',
    title: 'Luxury\nHolidays',
    description: 'Curated luxury experiences and bespoke escapes, personalised to every single detail.',
    image: '/2nd3.webp',
    titleColor: '#1c2b25',
  },
  {
    id: 'honeymoon',
    title: 'Honeymoon\nPackages',
    description: 'Romantic journeys and intimate getaways designed around your most unforgettable moments.',
    image: '/2nd4.webp',
    titleColor: '#1c2b25',
  },
  {
    id: 'inbound',
    title: 'Inbound &\nOutbound Travels',
    description: 'Curated international journeys from India and exceptional inbound travel experiences across India.',
    image: '/2nd5.webp',
    titleColor: '#c8860b',
  },
  {
    id: 'cruise',
    title: 'Cruise &\nGroup Trip',
    description: "Explore the world's most beautiful oceans and destinations with luxury cruises and guided group trips.",
    image: '/2nd6.webp',
    titleColor: '#1c2b25',
  },
];

const PER_VIEW = 3;
const MAX_INDEX = CARDS.length - PER_VIEW;   // 3
const AUTO_MS = 3500;
const DRAG_THRESH = 60;

export default function IntroSection() {
  const [idx, setIdx] = useState(0);
  const [delta, setDelta] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const isDown = useRef(false);
  const timer = useRef(null);

  /* ── auto-slide ── */
  const startAuto = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setIdx(p => (p >= MAX_INDEX ? 0 : p + 1));
    }, AUTO_MS);
  }, []);

  useEffect(() => { startAuto(); return () => clearInterval(timer.current); }, [startAuto]);

  const goTo = (i) => {
    setIdx(Math.max(0, Math.min(i, MAX_INDEX)));
    startAuto();
  };

  /* ── drag ── */
  const down = (x) => { isDown.current = true; startX.current = x; setDelta(0); clearInterval(timer.current); };
  const move = (x) => { if (!isDown.current) return; const d = x - startX.current; if (Math.abs(d) > 6) setDragging(true); setDelta(d); };
  const up = (x) => {
    if (!isDown.current) return;
    isDown.current = false;
    const d = x - startX.current;
    setDelta(0);
    setTimeout(() => setDragging(false), 0);
    if (Math.abs(d) > DRAG_THRESH) goTo(d < 0 ? idx + 1 : idx - 1);
    else startAuto();
  };

  const centreIdx = idx + 1; // which CARDS[] entry is currently in the centre slot

  return (
    <section className="relative py-14 sm:py-18 lg:py-24 overflow-hidden z-10 bg-white render-defer">
      {/* Slowly rotating compass watermark on top of cards in right side corner */}
      <div className="absolute -right-20 sm:-right-12 md:right-0 lg:right-2 top-4 sm:top-8 md:top-12 z-(-1) pointer-events-none select-none overflow-visible">
        <img
          src="/assets/images/carousel-compass.jpg"
          alt="Compass Rose"
          loading="lazy"
          decoding="async"
          width="480"
          height="480"
          className="w-[340px] sm:w-[420px] md:w-[480px] lg:w-[540px] h-auto object-contain animate-spin-slow mix-blend-multiply opacity-80"
          draggable={false}
        />
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#62a146] leading-tight">
            Travel is the only thing you buy that makes you richer
          </h2>
        </div>

        {/* ── Slider ── */}
        <div
          className="overflow-hidden"
          style={{ cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none' }}
          onMouseDown={(e) => down(e.clientX)}
          onMouseMove={(e) => move(e.clientX)}
          onMouseUp={(e) => up(e.clientX)}
          onMouseLeave={(e) => { if (isDown.current) up(e.clientX); }}
          onTouchStart={(e) => down(e.touches[0].clientX)}
          onTouchMove={(e) => { e.preventDefault(); move(e.touches[0].clientX); }}
          onTouchEnd={(e) => up(e.changedTouches[0].clientX)}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(calc(${-(idx * (100 / PER_VIEW))}% + ${delta}px))`,
              transition: dragging ? 'none' : 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)',
              willChange: 'transform',
            }}
          >
            {CARDS.map((card, i) => {
              const isCentre = i === centreIdx;
              return (
                <div
                  key={card.id}
                  className="shrink-0 px-2.5"
                  style={{ width: `${100 / PER_VIEW}%` }}
                >
                  <div
                    className="bg-white flex flex-col items-center pt-8 pb-9 px-6 transition-all duration-500"
                    style={{
                      borderRadius: '16px',
                      border: `1.5px solid ${isCentre ? '#d0d0d0' : '#e8e8e8'}`,
                      boxShadow: isCentre ? '0 10px 40px rgba(0,0,0,0.13)' : '0 2px 10px rgba(0,0,0,0.05)',
                      transform: isCentre ? 'scale(1.03)' : 'scale(0.97)',
                      minHeight: '500px',          // taller cards
                      pointerEvents: dragging ? 'none' : 'auto',
                    }}
                  >
                    {/* Circular image */}
                    <div
                      className="rounded-full overflow-hidden mb-7 shrink-0"
                      style={{
                        width: '195px',
                        height: '195px',
                        minWidth: '195px',
                        border: '2.5px solid #eeeeee',
                      }}
                    >
                      <img
                        src={card.image}
                        alt={card.title.replace('\n', ' ')}
                        loading="lazy"
                        decoding="async"
                        width="195"
                        height="195"
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>

                    {/* Text */}
                    <div className="text-center flex flex-col items-center flex-grow w-full">
                      <h3
                        className="text-[19px] font-bold mb-4 whitespace-pre-line leading-snug"
                        style={{ color: card.titleColor }}
                      >
                        {card.title}
                      </h3>
                      <p className="text-[13.5px] text-gray-500 leading-[1.7] mb-8 font-light max-w-[215px] mx-auto flex-grow">
                        {card.description}
                      </p>

                      {/* Enquire → /contact */}
                      <Link
                        to="/contact"
                        className="inline-block px-8 py-2.5 text-white text-[13px] font-medium transition-all duration-200 shadow hover:shadow-md hover:brightness-110"
                        style={{ backgroundColor: '#142921', borderRadius: '3px' }}
                        onClick={(e) => { if (dragging) e.preventDefault(); }}
                      >
                        Enquire
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Dots ── */}
        <div className="flex justify-center items-center gap-[9px] mt-10">
          {CARDS.map((_, i) => {
            const active = i === centreIdx;
            return (
              <button
                key={i}
                onClick={() => goTo(Math.max(0, Math.min(i - 1, MAX_INDEX)))}
                className="rounded-full transition-all duration-300 focus:outline-none"
                style={{
                  width: active ? '11px' : '8px',
                  height: active ? '11px' : '8px',
                  backgroundColor: active ? '#18b5c9' : '#5a5a5a',
                  opacity: active ? 1 : 0.6,
                }}
                aria-label={`Slide ${i + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
