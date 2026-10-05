import React from 'react';

export default function ValuePropsSection() {
  const colLeft = [
    {
      id: 1,
      icon: '/assets/images/icon-img-1.png',
      title: 'Tailor-Made Journeys',
      desc: 'Travel experiences thoughtfully designed around your interests, style, and dreams.'
    },
    {
      id: 2,
      icon: '/assets/images/icon-img-3.png',
      title: 'Expert Travel Design',
      desc: 'Our experienced travel specialists bring knowledge, care, and attention to every journey.'
    },
    {
      id: 3,
      icon: '/assets/images/icon-img-5.png',
      title: 'Personalised Itineraries',
      desc: 'Every detail is thoughtfully planned around the way you want to explore the world.'
    }
  ];

  const colRight = [
    {
      id: 4,
      icon: '/assets/images/icon-img-2.png',
      title: 'Exceptional Experiences',
      desc: 'Discover extraordinary places and unforgettable moments, curated just for you.'
    },
    {
      id: 5,
      icon: '/assets/images/icon-img-4.png',
      title: 'Journeys For Every Story',
      desc: 'From romantic escapes to family adventures, we create travel experiences that feel truly personal.'
    },
    {
      id: 6,
      icon: '/assets/images/icon-img-6.png',
      title: 'Seamless Travel Support',
      desc: "From your first enquiry to your return home, we're here to make your journey effortless."
    }
  ];

  return (
    <section 
      className="relative py-16 sm:py-20 lg:py-24 bg-[#fbfaf8] overflow-hidden bg-cover bg-center bg-no-repeat render-defer"
      style={{
        backgroundImage: "url('/assets/images/value-props-bg.jpg')"
      }}
    >
      {/* Subtle soft warm radial highlight for perfect text contrast without washing out the landscape */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at 55% 45%, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.45) 45%, rgba(255, 255, 255, 0.1) 75%)"
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-transparent p-4 sm:p-6 rounded-2xl">
          
          {/* Eyebrow & Title */}
          <div className="mb-12 sm:mb-16 text-center">
            <span 
              className="text-2xl sm:text-[30px] block mb-1"
              style={{
                fontFamily: "var(--font-cursive, 'Caveat', cursive, serif)",
                color: "#2cbcd6"
              }}
            >
              Value before business
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#5e963b] tracking-wide font-sans">
              We Offer the best
            </h2>
          </div>

          {/* 6 Features in 2 Columns with Row Dividers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-0 text-left">
            {/* Left Column with dividing lines */}
            <div className="divide-y divide-gray-200/60">
              {colLeft.map((item, idx) => (
                <div 
                  key={item.id} 
                  className={`flex items-start gap-4 sm:gap-5 group ${
                    idx === 0 ? 'pb-7 sm:pb-8' : idx === colLeft.length - 1 ? 'pt-7 sm:pt-8' : 'py-7 sm:py-8'
                  }`}
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-transparent border-none p-0 mt-0.5">
                    <img 
                      src={item.icon} 
                      alt={item.title} 
                      loading="lazy"
                      decoding="async"
                      width="40"
                      height="40"
                      className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <h3 className="text-[16.5px] sm:text-[17.5px] font-bold text-[#1f2937] font-sans mb-1.5 group-hover:text-[#5e963b] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[13.5px] sm:text-[14px] text-[#555555] leading-[1.65] font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column with dividing lines */}
            <div className="divide-y divide-gray-200/60">
              {colRight.map((item, idx) => (
                <div 
                  key={item.id} 
                  className={`flex items-start gap-4 sm:gap-5 group ${
                    idx === 0 ? 'pb-7 sm:pb-8' : idx === colRight.length - 1 ? 'pt-7 sm:pt-8' : 'py-7 sm:py-8'
                  }`}
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-transparent border-none p-0 mt-0.5">
                    <img 
                      src={item.icon} 
                      alt={item.title} 
                      loading="lazy"
                      decoding="async"
                      width="40"
                      height="40"
                      className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <h3 className="text-[16.5px] sm:text-[17.5px] font-bold text-[#1f2937] font-sans mb-1.5 group-hover:text-[#5e963b] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[13.5px] sm:text-[14px] text-[#555555] leading-[1.65] font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
