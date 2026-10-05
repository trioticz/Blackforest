import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Phone,
  CalendarCheck,
  Compass,
  MapPin,
  Palmtree,
  ShieldCheck,
  Plane
} from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';
import { getPublishedDestinations, DESTINATIONS_EVENT } from '../../utils/destinationsManager';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileAccordions, setMobileAccordions] = useState({
    destinations: false,
    experiences: false,
    concierge: false
  });
  const [destinationsList, setDestinationsList] = useState(() => getPublishedDestinations());

  const { settings, openEnquiryModal, openSearchModal } = useSettings();
  const location = useLocation();

  // Listen for destination publish/unpublish changes
  useEffect(() => {
    const updateList = () => {
      setDestinationsList(getPublishedDestinations());
    };
    window.addEventListener(DESTINATIONS_EVENT, updateList);
    window.addEventListener('storage', updateList);
    return () => {
      window.removeEventListener(DESTINATIONS_EVENT, updateList);
      window.removeEventListener('storage', updateList);
    };
  }, []);

  // Handle sticky header on scroll (passive listener for high FPS and smooth scrolling)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleMobileAccordion = (key) => {
    setMobileAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const experiencesList = [
    { name: 'Adventure & Nature', slug: 'adventure-nature' },
    { name: 'Island Holidays', slug: 'island-holidays' },
    { name: 'Family Holidays', slug: 'family-holidays' },
    { name: 'Honeymoon Escapes', slug: 'honeymoon-escapes' },
    { name: 'Luxury Escapes', slug: 'luxury-escapes' }
  ];

  const conciergeList = [
    { name: 'Flight Booking', slug: 'flight-booking' },
    { name: 'Visa Assistance', slug: 'visa-assistance' },
    { name: 'Cruises', slug: 'cruises' }
  ];

  const isHomePage = location.pathname === '/';
  const isDestinationsActive =
    location.pathname.startsWith('/destinations') ||
    destinationsList.some((d) => location.pathname === `/${d.slug}`);
  const isExperiencesActive = location.pathname.startsWith('/experiences');
  const isConciergeActive = location.pathname.startsWith('/concierge');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-[#10221b] text-white py-4 ${
        isScrolled ? 'shadow-xl' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/assets/site/white_logo.png"
              alt={settings.siteName || 'Blackforest Holidays'}
              width="180"
              height="48"
              fetchpriority="high"
              decoding="async"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-4 lg:space-x-8 xl:space-x-10 text-[15px] font-medium tracking-wide font-sans">
            {/* Destinations Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setActiveDropdown('destinations')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to="/destinations"
                className={`flex items-center gap-1 transition-colors py-1 ${
                  isDestinationsActive
                    ? 'text-[#f29727] border-b-2 border-[#f29727]'
                    : 'text-white hover:text-[#f29727]'
                }`}
              >
                Destinations
                <ChevronDown className="w-3.5 h-3.5 opacity-80 group-hover:rotate-180 transition-transform" />
              </Link>

              {activeDropdown === 'destinations' && (
                <div className="absolute top-full left-0 w-[210px] pt-1.5 z-50 animate-fadeIn">
                  <div className="flex flex-col space-y-1.5">
                    {destinationsList.map((d) => {
                      const isActive =
                        location.pathname === `/${d.slug}` ||
                        location.pathname === `/destinations/${d.slug}`;
                      return (
                        <Link
                          key={d.slug}
                          to={`/destinations/${d.slug}`}
                          className={`block px-5 py-3 text-[14px] transition-all duration-200 shadow-md ${
                            isActive
                              ? 'bg-[#10221b] text-white font-medium border-l-4 border-[#f29727]'
                              : 'bg-white text-[#10221b] hover:bg-[#10221b] hover:text-white'
                          }`}
                        >
                          {d.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Experiences Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setActiveDropdown('experiences')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to="/experiences"
                className={`flex items-center gap-1 transition-colors py-1 ${
                  isExperiencesActive
                    ? 'text-[#f29727] border-b-2 border-[#f29727]'
                    : 'text-white hover:text-[#f29727]'
                }`}
              >
                Experiences
                <ChevronDown className="w-3.5 h-3.5 opacity-80 group-hover:rotate-180 transition-transform" />
              </Link>

              {activeDropdown === 'experiences' && (
                <div className="absolute top-full left-0 w-[210px] pt-1.5 z-50 animate-fadeIn">
                  <div className="flex flex-col space-y-1.5">
                    {experiencesList.map((exp) => {
                      const isActive = location.pathname.includes(exp.slug);
                      return (
                        <Link
                          key={exp.slug}
                          to={`/experiences/${exp.slug}`}
                          className={`block px-5 py-3 text-[14px] transition-all duration-200 shadow-md ${
                            isActive
                              ? 'bg-[#10221b] text-white font-medium border-l-4 border-[#f29727]'
                              : 'bg-white text-[#10221b] hover:bg-[#10221b] hover:text-white'
                          }`}
                        >
                          {exp.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Concierge Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setActiveDropdown('concierge')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to="/concierge"
                className={`flex items-center gap-1 transition-colors py-1 ${
                  isConciergeActive
                    ? 'text-[#f29727] border-b-2 border-[#f29727]'
                    : 'text-white hover:text-[#f29727]'
                }`}
              >
                Concierge
                <ChevronDown className="w-3.5 h-3.5 opacity-80 group-hover:rotate-180 transition-transform" />
              </Link>

              {activeDropdown === 'concierge' && (
                <div className="absolute top-full left-0 w-[210px] pt-1.5 z-50 animate-fadeIn">
                  <div className="flex flex-col space-y-1.5">
                    {conciergeList.map((c) => {
                      const isActive = location.pathname.includes(c.slug);
                      return (
                        <Link
                          key={c.slug}
                          to={`/concierge/${c.slug}`}
                          className={`block px-5 py-3 text-[14px] transition-all duration-200 shadow-md ${
                            isActive
                              ? 'bg-[#10221b] text-white font-medium border-l-4 border-[#f29727]'
                              : 'bg-white text-[#10221b] hover:bg-[#10221b] hover:text-white'
                          }`}
                        >
                          {c.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link to="/corporate-travel" className="hover:text-[#f29727] transition-colors py-1">
              Corporate Travel
            </Link>

            <Link to="/coach-tour" className="hover:text-[#f29727] transition-colors py-1">
              Coach Tour
            </Link>

            <Link to="/about" className="hover:text-[#f29727] transition-colors py-1">
              About
            </Link>

            <Link to="/contact" className="hover:text-[#f29727] transition-colors py-1">
              Contact
            </Link>
          </nav>

         

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={openSearchModal}
              aria-label="Search"
              className="p-2 text-white/90 hover:text-[#f29727]"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="p-2 text-white hover:text-[#f29727]"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#10221b] text-white p-6 overflow-y-auto shadow-2xl flex flex-col justify-between border-l border-white/10 animate-slideInRight">
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <img
                  src={settings.logo || '/assets/images/white_logo.png'}
                  alt={settings.siteName}
                  className="h-9 w-auto"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Links with Accordions */}
              <div className="space-y-4 text-sm font-semibold tracking-wider uppercase">
                {/* Destinations Accordion */}
                <div className="border-b border-white/10 pb-3">
                  <button
                    onClick={() => toggleMobileAccordion('destinations')}
                    className="flex items-center justify-between w-full py-2 text-left hover:text-[#f29727]"
                  >
                    <span>Destinations</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileAccordions.destinations ? 'rotate-180 text-[#f29727]' : ''
                      }`}
                    />
                  </button>
                  {mobileAccordions.destinations && (
                    <div className="pl-4 pt-2 space-y-2 normal-case tracking-normal text-gray-300">
                      {destinationsList.map((d) => (
                        <Link
                          key={d.slug}
                          to={`/destinations/${d.slug}`}
                          className="block py-1 hover:text-[#f29727] text-sm"
                        >
                          {d.name}
                        </Link>
                      ))}
                      <Link
                        to="/destinations"
                        className="block py-1 text-xs text-[#f29727] font-semibold uppercase tracking-wider"
                      >
                        All Destinations Overview →
                      </Link>
                    </div>
                  )}
                </div>

                {/* Experiences Accordion */}
                <div className="border-b border-white/10 pb-3">
                  <button
                    onClick={() => toggleMobileAccordion('experiences')}
                    className="flex items-center justify-between w-full py-2 text-left hover:text-[#f29727]"
                  >
                    <span>Experiences</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileAccordions.experiences ? 'rotate-180 text-[#f29727]' : ''
                      }`}
                    />
                  </button>
                  {mobileAccordions.experiences && (
                    <div className="pl-4 pt-2 space-y-2 normal-case tracking-normal text-gray-300">
                      {experiencesList.map((exp) => (
                        <Link
                          key={exp.slug}
                          to={`/experiences/${exp.slug}`}
                          className="block py-1 hover:text-[#f29727] text-sm"
                        >
                          {exp.name}
                        </Link>
                      ))}
                      <Link
                        to="/experiences"
                        className="block py-1 text-xs text-[#f29727] font-semibold uppercase tracking-wider"
                      >
                        All Experiences →
                      </Link>
                    </div>
                  )}
                </div>

                {/* Concierge Accordion */}
                <div className="border-b border-white/10 pb-3">
                  <button
                    onClick={() => toggleMobileAccordion('concierge')}
                    className="flex items-center justify-between w-full py-2 text-left hover:text-[#f29727]"
                  >
                    <span>Concierge</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileAccordions.concierge ? 'rotate-180 text-[#f29727]' : ''
                      }`}
                    />
                  </button>
                  {mobileAccordions.concierge && (
                    <div className="pl-4 pt-2 space-y-2 normal-case tracking-normal text-gray-300">
                      {conciergeList.map((c) => (
                        <Link
                          key={c.slug}
                          to={`/concierge/${c.slug}`}
                          className="block py-1 hover:text-[#f29727] text-sm"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link to="/international-tours" className="block py-2 border-b border-white/10 hover:text-[#f29727]">
                  International Tours
                </Link>

                <Link to="/india-tours" className="block py-2 border-b border-white/10 hover:text-[#f29727]">
                  India Tours
                </Link>

                <Link to="/corporate-travel" className="block py-2 border-b border-white/10 hover:text-[#f29727]">
                  Corporate Travel
                </Link>

                <Link to="/coach-tour" className="block py-2 border-b border-white/10 hover:text-[#f29727]">
                  Coach Tour
                </Link>

                <Link to="/journal" className="block py-2 border-b border-white/10 hover:text-[#f29727]">
                  Travel Journal
                </Link>

                <Link to="/about" className="block py-2 border-b border-white/10 hover:text-[#f29727]">
                  About Us
                </Link>

                <Link to="/contact" className="block py-2 border-b border-white/10 hover:text-[#f29727]">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Mobile Drawer Bottom Actions */}
            <div className="pt-8 space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEnquiryModal({ source: 'Mobile Drawer CTA' });
                }}
                className="w-full py-3.5 bg-[#f29727] text-[#10221b] font-bold text-xs uppercase tracking-widest rounded-full shadow-lg"
              >
                Plan Your Trip
              </button>

              {settings.phone && (
                <div className="text-center">
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                    className="text-xs text-gray-300 hover:text-[#f29727] flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#f29727]" />
                    <span>Direct Concierge: {settings.phone}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
