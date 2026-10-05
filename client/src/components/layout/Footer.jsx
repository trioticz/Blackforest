import { Link, useLocation } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';
import ExpertiseSection from '../home/ExpertiseSection';
import FaqSection from '../common/FaqSection';

export default function Footer() {
  const { settings } = useSettings();
  const location = useLocation();

  const isDestinationPage =
    location.pathname.startsWith('/destinations') ||
    location.pathname === '/asian-countries' ||
    ['/africa', '/america', '/australia', '/europe', '/indian-ocean', '/indian_ocean', '/middle-east', '/middle_east_countries', '/south-asia'].includes(location.pathname);

  const logo = settings?.logo || '/assets/images/white_logo.png';
  const siteName = settings?.siteName || 'BlackForest Holidays';

  return (
    <>
      {/* Global FAQ Section for all pages (suppressed on destination pages which have their own dedicated Quick Questions section) */}
      {!isDestinationPage && <FaqSection />}

      {/* Global Expertise Section (Knowledge Behind Every Journey) */}
      <ExpertiseSection />

      {/* Dark Green Main Footer with Pine Forest Background */}
      <footer
        className="bg-[#0c1c16] text-white pt-16 pb-8 relative border-t border-[#1a382b]/40 bg-cover bg-top render-defer-lg"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(12, 28, 22, 0.85) 0%, rgba(12, 28, 22, 0.96) 45%, #0c1c16 100%), url('/assets/images/footer-img.png')`,
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Brand Header Logo (With slight indent matching Reach Us column) */}
          {/* <div className="mb-12 md:pl-6 lg:pl-10">
            <Link to="/" className="inline-block group">
              <img
                src={logo}
                alt={`${siteName} - We are the artist of Travel`}
                className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div> */}

          {/* 3 Balanced Columns Layout (Reach Us shifted slightly right for perfect alignment) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16">

            {/* Column 1: Reach Us (4 cols with left padding so it's not stuck on the extreme left edge) */}
            <div className="md:col-span-5 lg:col-span-5 md:pl-6 lg:pl-10 space-y-5">
              <h3 className="text-2xl sm:text-[26px] font-bold text-white font-sans tracking-wide">
                Reach Us
              </h3>

              {/* Address (Formatted exactly like reference) */}
              <div className="flex items-start gap-3.5 text-sm sm:text-[15px] text-gray-200 leading-relaxed max-w-md">
                <MapPin className="w-5 h-5 text-white shrink-0 mt-1" />
                <div className="space-y-0.5 font-light">
                  <p>737, 3rd Floor, Kheny Plaza
                    CMH Main Road, 2nd Cross
                    Rd, Binnamangala, Indiranagar,
                    Bengaluru, Karnataka 560038</p>
                </div>
              </div>


              {/* 4 Social Icon Buttons in White Rounded Squares */}
              <div className="flex items-center gap-3 pt-3">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-md bg-white text-[#0c1c16] flex items-center justify-center font-bold text-base hover:bg-[#27B8B1] hover:text-white transition-all shadow-md font-sans"
                >
                  f
                </a>

                {/* Twitter / X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-9 h-9 rounded-md bg-white text-[#0c1c16] flex items-center justify-center hover:bg-[#27B8B1] hover:text-white transition-all shadow-md group"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-md bg-white text-[#0c1c16] flex items-center justify-center hover:bg-[#27B8B1] hover:text-white transition-all shadow-md group"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-md bg-white text-[#0c1c16] flex items-center justify-center hover:bg-[#27B8B1] hover:text-white transition-all shadow-md group"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Head Office */}
            <div className="md:col-span-4 lg:col-span-4 space-y-5 md:pl-2">
              <h3 className="text-2xl sm:text-[26px] font-bold text-white font-sans tracking-wide">
                Head Office
              </h3>
              <div className="flex items-start gap-3.5 text-sm sm:text-[15px] text-gray-200 leading-relaxed max-w-sm">
                <MapPin className="w-5 h-5 text-white shrink-0 mt-1" />
                <div className="space-y-0.5 font-light">
                  <p className='text-[16px]'>76, 1st floor, 8th Street, Crosscut Road, Gandhipuram, Coimbatore – 641012</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3.5 text-sm sm:text-[15px] text-gray-200 pt-1">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <p>
                  <a
                    href="mailto:info@blackforestholidays.com"
                    className="hover:text-[#27B8B1] transition-colors font-light"
                  >
                    info@blackforestholidays.com
                  </a>
                </p>
              </div>

              {/* Phone (Formatted on two lines) */}
              <div className="flex items-start gap-3.5 text-sm sm:text-[15px] text-gray-200 pt-1">
                <Phone className="w-4 h-4 text-white shrink-0 mt-1" />
                <div className="font-light flex">
                  <p>
                    <a href="tel:+919742877700" className="hover:text-[#27B8B1] transition-colors block">
                      +91 9742877700 /
                    </a>
                    <a href="tel:9742977700" className="hover:text-[#27B8B1] transition-colors block">
                      9742977700
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3: Useful Links */}
            <div className="md:col-span-3 lg:col-span-3 space-y-4">
              <h3 className="text-2xl sm:text-[26px] font-bold text-white font-sans tracking-wide">
                Useful Links
              </h3>
              <ul className="space-y-2.5 text-sm sm:text-[15px] text-gray-300 font-light">


                <li><p>
                  <Link to="/work-with-us" className="hover:text-[#27B8B1] transition-colors">
                    Work With Us
                  </Link></p>
                </li>
                <li><p>
                  <Link to="/privacy-policy" className="hover:text-[#27B8B1] transition-colors">
                    Privacy Policy
                  </Link></p>
                </li>
                <li><p>
                  <Link to="/cancellation-refund-policy" className="hover:text-[#27B8B1] transition-colors">
                    Cancellation & Refund Policy
                  </Link>
                </p>
                </li>
                <li><p>
                  <Link to="/terms-conditions" className="hover:text-[#27B8B1] transition-colors">
                    Terms & Conditions
                  </Link></p>
                </li>
                <li><p>
                  <Link to="/contact" className="hover:text-[#27B8B1] transition-colors">
                    Contact Us
                  </Link></p>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Dotted Rule and Centered Copyright */}
          <div className="border-t border-dotted border-gray-600/70 pt-6 text-center text-xs sm:text-sm text-gray-400 font-light">
            <p>
              {settings?.copyright || '© 2026 BlackForest Holidays. All rights reserved.'}
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}
