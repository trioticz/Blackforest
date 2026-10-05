import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialSlider() {
  const testimonials = [
    {
      id: 1,
      name: "Siddharth Dhar",
      time: "1 month ago",
      image: "/assets/site/avatar_siddharth.jpg",
      review: "Managing travel logistics for an entire organisation is no small feat, but Leela from Black Forest Holidays makes it look effortless... Beyond her stellar booking management, her recent support with my US Visa applications was an absolute lifesaver. She walked me through the entire process step-by-step with crystal clear guidance."
    },
    {
      id: 2,
      name: "harish kongara",
      time: "2 months ago",
      image: "/assets/site/avatar_harish.jpg",
      review: "Thank you Leela for your assistance in processing our Schengen visa. The whole process was clearly communicated and all our doubts were cleared upfront. Your guidance helped us in smooth navigation. Highly recommended!"
    },
    {
      id: 3,
      name: "revathi P",
      time: "3 months ago",
      image: "/assets/site/avatar_revathi.jpg",
      review: "I am a Veterinary doctor living in Nilgiris, myself and my daughter had a trip to Germany in April 2026 to visit our German friend and family. Leela mam and Blackforest holidays helped me a lot from the time of Visa processing, ticket booking, and money exchange. We had a wonderful memorable trip!"
    },
    {
      id: 4,
      name: "Shashank S Thakur",
      time: "5 months ago",
      image: "/assets/site/avatar_shashank.jpg",
      review: "Very prompt service. No hassle all the activities were handled smoothly. Cheers and thanks to Leela 👍 for the entire VISA process and seamless coordination."
    },
    {
      id: 5,
      name: "SENDHIL KUMAR V",
      time: "6 months ago",
      image: "/assets/site/avatar_sendhil.jpg",
      review: "Absolutely wonderful and professional service! They confirmed trip bookings, helped in getting visa appointments during peak season in short time. Mrs. Leela clearly explained documents & financials statements needed for Visa. Top notch and dynamic agency!"
    },
    {
      id: 6,
      name: "rohan sharma",
      time: "7 months ago",
      image: "/assets/site/avatar_rohan.jpg",
      review: "I had a great experience with Black Forest Travels for my Singapore visa. The entire process was incredibly smooth and hassle-free. What truly stood out was that everything was handled remotely, efficiently, and with complete clarity."
    },
    {
      id: 7,
      name: "shanthi shanmuga",
      time: "8 months ago",
      image: "/assets/site/avatar_shanthi.jpg",
      review: "Our 7-day trip to Kashmir in the month of October with Black Forest Holidays was absolutely magical and truly unforgettable. From the moment we arrived until the end of the journey, everything was perfectly planned and executed. Truly a 5-star experience!"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // For responsive carousel display: show 4 on desktop (lg), 2 on tablet (sm), 1 on mobile
  const maxIndex = testimonials.length - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section id="testimonials" className="py-20 bg-white relative render-defer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title matching Image 1 */}
        <div className="text-center mb-12 sm:mb-14">
          <span 
            className="text-2xl sm:text-3xl md:text-[34px] block mb-2 text-[#27B8B1] tracking-wide"
            style={{ fontFamily: "'Mansalva', cursive, sans-serif" }}
          >
            Client Testimonial
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#7cb342] leading-tight font-sans">
            Savoring your Taste Buds
          </h2>
        </div>

        {/* Carousel Container with Arrow Controls */}
        <div className="relative group">
          {/* Previous Arrow */}
          <button
            onClick={prevSlide}
            aria-label="Previous review"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-[#5e963b] hover:scale-105 transition-all focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={nextSlide}
            aria-label="Next review"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-[#5e963b] hover:scale-105 transition-all focus:outline-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Carousel View */}
          <div className="overflow-hidden py-2 px-1">
            <div 
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * 280}px)`
              }}
            >
              {testimonials.map((t) => (
                <div 
                  key={t.id} 
                  className="w-[280px] sm:w-[300px] lg:w-[275px] shrink-0 bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Profile Image with Google Platform Icon */}
                  <div className="relative mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                      <img 
                        src={t.image} 
                        alt={t.name} 
                        loading="lazy"
                        decoding="async"
                        width="64"
                        height="64"
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/assets/images/white_logo.png';
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md border border-gray-100 flex items-center justify-center">
                      <img 
                        src="/assets/site/google_icon.svg" 
                        alt="Google" 
                        loading="lazy"
                        decoding="async"
                        width="16"
                        height="16"
                        className="w-4 h-4"
                      />
                    </div>
                  </div>
                  
                  {/* Name & Time */}
                  <h4 className="text-gray-900 font-bold text-sm mb-0.5">{t.name}</h4>
                  <span className="text-gray-400 text-xs mb-3">{t.time}</span>
                  
                  {/* Stars & Verified badge */}
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <img 
                        key={star}
                        src="/assets/site/google_star.svg" 
                        alt="Star"
                        loading="lazy"
                        decoding="async"
                        width="16"
                        height="16"
                        className="w-4 h-4"
                      />
                    ))}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                      <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z" fill="#1877F2"/>
                      <path d="M8 12.5L10.5 15L16 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  
                  {/* Review Text */}
                  <p className="text-gray-600 text-[13px] leading-relaxed line-clamp-4 font-light">
                    {t.review}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx ? 'w-6 bg-[#5e963b]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
