import React, { useState } from 'react';
import HeroWave from '../../components/common/HeroWave';
import { useSettings } from '../../context/SiteSettingsContext';
import { useWebsiteImage } from '../../context/WebsiteImagesContext';
import { useWebsiteContent } from '../../context/WebsiteContentContext';
import { Link } from 'react-router-dom';

function HandDrawnLeftArrow({ className = "w-12 h-6" }) {
  return (
    <svg
      viewBox="0 0 54 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Hand-drawn shaft */}
      <path
        d="M50 11C35 10.5 20 11.2 3 11"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Top angled barb stroke */}
      <path
        d="M17 3.5C12 6.5 7 9 2.5 11"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Bottom angled barb stroke */}
      <path
        d="M17 18.5C12 15.5 7 13 2.5 11"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Subtle sketchy double stroke */}
      <path
        d="M46 12C32 11.6 18 12.1 6 11.8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

function HandDrawnRightArrow({ className = "w-12 h-6" }) {
  return (
    <svg
      viewBox="0 0 54 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Hand-drawn shaft */}
      <path
        d="M4 11C19 10.5 34 11.2 51 11"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Top angled barb stroke */}
      <path
        d="M37 3.5C42 6.5 47 9 51.5 11"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Bottom angled barb stroke */}
      <path
        d="M37 18.5C42 15.5 47 13 51.5 11"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Subtle sketchy double stroke */}
      <path
        d="M8 12C22 11.6 36 12.1 48 11.8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export default function CorporateTravelPage() {
  const corporateHero = useWebsiteImage('hero.corporate', '/assets/images/how-corporate-travel-can-sail-through-uncertain-times-1920x1274-1.jpg');
  const corporateLounge = useWebsiteImage('services.corporate.lounge', '/assets/images/corporate-travel.jpg');
  const corporateMeeting = useWebsiteImage('services.corporate.meeting', '/assets/images/Untitled-design-23.png');
  const { settings } = useSettings();
  const { content: corporateContent } = useWebsiteContent('corporate.hero', {
    headline: 'Corporate & Group Travel',
    subheadline: 'World-class corporate travel management, incentive tours, conferences, and executive retreats.'
  });

  const carouselImages = [
    { src: '/assets/images/Untitled-design-26.png', alt: 'Corporate business traveler at terminal' },
    { src: '/assets/images/Untitled-design-23.png', alt: 'Visa application on laptop with documentation' },
    { src: '/assets/images/Untitled-design-24.png', alt: 'Corporate luxury retreat and hotel resort' },
    { src: '/assets/images/Untitled-design-25.png', alt: 'Executive board meeting' }
  ];

  const [startIndex, setStartIndex] = useState(0);

  const prevSlide = () => {
    setStartIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const visibleImages = [
    carouselImages[startIndex],
    carouselImages[(startIndex + 1) % carouselImages.length],
    carouselImages[(startIndex + 2) % carouselImages.length]
  ];

  return (
    <div className="bg-white font-sans text-gray-800 animate-fadeIn overflow-x-hidden">

      {/* 1. Hero Section */}
      <section className="relative h-[55vh] min-h-[460px] flex flex-col justify-end">
        <div className="absolute inset-0 z-0 bg-[#0a1712]">
          <img
            src={corporateHero}
            alt="Corporate Travel"
            className="w-full h-full object-cover opacity-70"
          />
        </div>

        <div className="relative z-10 text-white mt-16 flex flex-col items-center pb-28">
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-sans font-bold tracking-tight mb-4 drop-shadow-xl text-center">
            {corporateContent?.headline || 'Corporate & Group Travel'}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-light drop-shadow-md tracking-wider">
            <Link to="/" className="hover:text-gray-200 transition-colors">Home</Link>
            <span className="text-gray-300">»</span>
            <span>Corporate Travel</span>
          </div>
        </div>
        <HeroWave />
      </section>

      {/* 2. Main Content Section - Two columns: Left 60%, Right 40% with overlapping framed images */}
      <section className="py-16 sm:py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

            {/* Left Column (60%) - Typography and Services List */}
            <div className="w-full lg:w-[60%] space-y-6">
              <div>
                <span
                  className="text-2xl sm:text-3xl block mb-2 text-[#27B8B1] tracking-wide font-cursive"
                  style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
                >
                  Corporate Travel
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-sans font-bold text-[#7cb342] leading-[1.15] mb-4">
                  Seamless Travel Solutions for Teams & Businesses
                </h2>

                <div className="w-16 h-[3px] bg-[#27B8B1] mb-8 rounded-full"></div>
              </div>

              <div className="space-y-6 text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                <p>
                  At BlackForest Holidays, we understand that corporate travel is more than simply booking flights and hotels. Our corporate tour packages are designed to keep your people moving efficiently, comfortably, and confidently while giving your organisation complete control over every journey.
                </p>
                <p>
                  From business trips and executive travel to corporate meetings, conferences, incentives, and group movements, our dedicated travel solutions are designed to make every business journey seamless.
                </p>

                <div className="pt-4">
                  <h3 className="font-bold text-[#10221b] text-xl sm:text-2xl mb-3 font-sans">
                    Your Business. Our Expertise.
                  </h3>
                  <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                    We combine personalised service, travel expertise, and efficient coordination to create corporate travel programmes that work around your organisation's requirements.
                  </p>
                </div>

                <div className="pt-4">
                  <h3 className="font-bold text-[#10221b] text-xl sm:text-2xl mb-5 font-sans">
                    Our Corporate Travel Services
                  </h3>
                  <ol className="space-y-4 text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                    <li><strong className="font-bold text-[#10221b]">1. Business Travel Management</strong> – Efficient flight, hotel, and transportation arrangements for business travellers.</li>
                    <li><strong className="font-bold text-[#10221b]">2. Executive Travel</strong> – Premium travel solutions designed for senior executives and VIP travellers.</li>
                    <li><strong className="font-bold text-[#10221b]">3. Corporate Hotel Bookings</strong> – Carefully selected business hotels and premium accommodation worldwide.</li>
                    <li><strong className="font-bold text-[#10221b]">4. Flight Reservations</strong> – Domestic and international flight bookings with flexible options to suit business schedules.</li>
                    <li><strong className="font-bold text-[#10221b]">5. Visa Assistance</strong> – Professional visa guidance and documentation support for international business travel.</li>
                    <li><strong className="font-bold text-[#10221b]">6. Airport Transfers</strong> – Reliable airport transfers and ground transportation for stress-free journeys.</li>
                    <li><strong className="font-bold text-[#10221b]">7. Meetings & Conferences</strong> – End-to-end travel coordination for meetings, conferences, exhibitions, and corporate events.</li>
                    <li><strong className="font-bold text-[#10221b]">8. Corporate Group Travel</strong> – Seamless travel arrangements for teams, delegations, and large corporate groups.</li>
                    <li><strong className="font-bold text-[#10221b]">9. Incentive Travel</strong> – Inspiring incentive trips designed to reward, motivate, and bring teams together.</li>
                    <li><strong className="font-bold text-[#10221b]">10. Travel Policy Support</strong> – Travel solutions aligned with your company's policies, budgets, and approval processes.</li>
                    <li><strong className="font-bold text-[#10221b]">11. 24/7 Travel Assistance</strong> – Dedicated support to help manage changes, disruptions, and urgent travel requirements.</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Right Column (40%) - Overlapping Images matching Image 1 */}
            <div className="w-full lg:w-[40%] lg:sticky lg:top-28 pt-4 pb-8">
              <div className="relative w-full max-w-[480px] mx-auto lg:ml-auto">
                {/* Back image - Two business women with luggage and teal border */}
                <div className="w-[88%] ml-auto aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-[8px] sm:border-[10px] border-[#27B8B1] relative z-10">
                  <img
                    src={corporateLounge}
                    alt="Corporate business travel executives walking in airport"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Front overlapping image - Laptop visa application form */}
                <div className="w-[74%] -mt-24 sm:-mt-28 lg:-mt-32 relative z-20 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src={corporateMeeting}
                    alt="Visa application form on laptop"
                    className="w-full h-auto object-cover block"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Corporate Travel Across The World Carousel Section with Hand-Drawn Arrows - matching Image 5 */}
      <section className="py-16 sm:py-24 bg-[#faf9f6] border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-10 sm:mb-14">
            <span
              className="text-2xl sm:text-3xl block mb-2 text-[#27B8B1] tracking-wide font-cursive"
              style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
            >
              Global Hubs
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-[#7cb342] leading-tight font-sans mb-4">
              Corporate Travel Across The World
            </h3>
            <div className="w-16 h-[3px] bg-[#27B8B1] mb-6 rounded-full"></div>
            <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans max-w-4xl">
              Whether your team is travelling within India or across international business hubs in Asia, Europe, the Middle East, Africa, Australia, and the Americas, we coordinate every element of the journey with precision.
            </p>
          </div>

        </div>
      </section>



      <section className="flex items-center justify-center">

        {/* Carousel Slider with Hand-Drawn Arrows */}
        <div className="relative flex items-center justify-between gap-3 sm:gap-6 lg:gap-8 max-w-9xl">
          {/* Left Hand-Drawn Arrow */}
          <button
            onClick={prevSlide}
            aria-label="Previous image"
            className="text-[#182c20] hover:text-[#5e963b] transition-transform hover:scale-110 p-1 sm:p-2 cursor-pointer focus:outline-none flex-shrink-0"
          >
            <HandDrawnLeftArrow className="w-10 sm:w-14 h-5 sm:h-7" />
          </button>

          {/* 3 Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {visibleImages.map((img, idx) => (
              <div
                key={idx}
                className="aspect-[4/5] overflow-hidden rounded-sm shadow-md bg-white group transition-all duration-300"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Right Hand-Drawn Arrow */}
          <button
            onClick={nextSlide}
            aria-label="Next image"
            className="text-[#182c20] hover:text-[#5e963b] transition-transform hover:scale-110 p-1 sm:p-2 cursor-pointer focus:outline-none flex-shrink-0"
          >
            <HandDrawnRightArrow className="w-10 sm:w-14 h-5 sm:h-7" />
          </button>
        </div>

      </section>


      {/* 4. Why Choose Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-14 max-w-3xl">
            <span
              className="text-2xl sm:text-3xl block mb-2 text-[#27B8B1] tracking-wide font-cursive"
              style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
            >
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#7cb342] leading-tight font-sans mb-4">
              Why Choose BlackForest Holidays?
            </h2>
            <div className="w-16 h-[3px] bg-[#27B8B1] mb-10 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">

            <div className="space-y-3">
              <h3 className="font-bold text-[#10221b] text-xl sm:text-2xl leading-snug font-sans">Dedicated Travel Management</h3>
              <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">Our focused strategy provides you the best routing and the most efficient fares.</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-[#10221b] text-xl sm:text-2xl leading-snug font-sans">Cost-Conscious Solutions</h3>
              <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">We leverage extensive supplier relationships and technology to optimize costs without compromising quality.</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-[#10221b] text-xl sm:text-2xl leading-snug font-sans">Seamless Coordination</h3>
              <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">Flight bookings, ground transfers, hotel stays and meetings—we coordinate everything seamlessly from start to finish.</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-[#10221b] text-xl sm:text-2xl leading-snug font-sans">24/7 Global Support</h3>
              <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">Our dedicated consultants are available around the clock to support you with changes, cancellations, or emergencies wherever you are.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Travel Smarter Section */}
      <section className="py-20 md:py-32 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <span
                  className="text-2xl sm:text-3xl block mb-2 text-[#27B8B1] tracking-wide font-cursive"
                  style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
                >
                  Elevate Your Business
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#7cb342] leading-tight font-sans">
                  Travel Smarter.
                  <br />
                  Move Further.
                </h2>
                <div className="w-16 h-[3px] bg-[#27B8B1] mt-6 mb-8 rounded-full"></div>
              </div>

              <div className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">
                <p>Let Blackforest Holidays elevate your business travel experience. To partner with us and leverage our strategic travel management solutions to achieve better control over your travel expenditures, enhance traveler satisfaction, and drive overall business success.</p>
              </div>

              <div className="bg-white border border-gray-100 p-8 shadow-xl mt-12 rounded max-w-sm">
                <h3 className="text-xl sm:text-2xl font-bold text-[#10221b] mb-8 leading-tight font-sans">
                  Your Business Stays
                  <br />
                  Further Ahead.
                  <br />
                  Your Travel Support.
                </h3>
                <Link to="/contact" className="inline-block bg-[#10221b] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#7cb342] transition-colors shadow-md rounded-sm">
                  Start Your Journey
                </Link>
              </div>
            </div>

            {/* Right Images Collage */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-12">
                  <div className="aspect-[4/5] rounded overflow-hidden shadow-lg">
                    <img src="/assets/images/Untitled-design-59.png" alt="Airport terminal" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-[4/5] rounded overflow-hidden shadow-lg">
                    <img src="/assets/images/WhatsApp-Image-2026-08-06-at-16.30.00.jpeg" alt="Business travel" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="aspect-[3/4] rounded overflow-hidden shadow-lg">
                    <img src="/assets/images/how-corporate-travel-can-sail-through-uncertain-times-1920x1274-1.jpg" alt="Airport lounge" className="w-full h-full object-cover" />
                  </div>
                  <div className="pt-8 pl-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#7cb342] leading-tight font-sans">
                      A Vision
                      <br />Created For
                      <br />The Activities
                      <br />To Make Sure
                      <br />You Enjoy &
                      <br />Get Thrilled.
                    </h3>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
