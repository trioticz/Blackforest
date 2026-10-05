import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import HeroWave from '../../components/common/HeroWave';
import { ShieldCheck, FileText, RefreshCw, Mail, Phone, MapPin } from 'lucide-react';

const policies = {
  'cancellation-refund-policy': {
    slug: 'cancellation-refund-policy',
    title: 'Cancellation & Refund Policy',
    cursiveSubtitle: 'Policies & Guidelines',
    heroImage: '/assets/images/ChatGPT-Image-Aug-8-2026-06_30_11-PM-2.png',
    intro: 'At BlackForest Holidays Private Limited, we understand that travel plans may change. Our cancellation and refund terms are subject to the policies of the airline, hotel, tour operator, cruise line, visa service provider, insurance company or other supplier involved in your booking.',
    sections: [
      {
        number: '1',
        title: 'Cancellation Requests',
        content: [
          'All cancellation requests must be submitted to BlackForest Holidays in writing through our official email or other approved communication channel.',
          'The cancellation date will be considered based on the date and time the request is received by us.',
        ],
      },
      {
        number: '2',
        title: 'Cancellation Charges',
        content: [
          'Cancellation charges depend on the terms and conditions of the respective travel supplier and the type of booking.',
          'Charges may include:',
        ],
        list: [
          'Airline cancellation or fare penalties',
          'Hotel cancellation charges',
          'Tour/package cancellation charges',
          'Cruise cancellation charges',
          'Visa and application fees',
          'Supplier or service-provider charges',
          'BlackForest Holidays service or administrative charges',
        ],
        note: 'Some bookings may be partially refundable or completely non-refundable.',
      },
      {
        number: '3',
        title: 'Refunds',
        content: [
          'Where a refund is applicable, the refundable amount will be processed after the relevant supplier confirms and releases the refund to BlackForest Holidays.',
          'Refund processing time depends on the airline, hotel, tour operator, cruise company, payment provider or other supplier and may vary from booking to booking.',
        ],
      },
      {
        number: '4',
        title: 'Airline & Flight Cancellations',
        content: [
          "Flight tickets are subject to the airline's fare rules. Refunds, cancellations, rebooking and no-show conditions will be determined by the applicable airline fare rules.",
          'If an airline cancels or significantly changes a flight, BlackForest Holidays will assist the customer with the options made available by the airline.',
        ],
      },
      {
        number: '5',
        title: 'Hotel & Holiday Package Cancellations',
        content: [
          'Hotel and holiday package cancellations are subject to the cancellation policy mentioned in the booking confirmation or quotation.',
          'Special promotional, discounted or advance-purchase bookings may have stricter cancellation conditions and may be non-refundable.',
        ],
      },
      {
        number: '6',
        title: 'Visa Fees',
        content: [
          'Visa fees, embassy fees, application-centre charges and service fees are generally non-refundable, even if the visa application is refused, withdrawn or the customer chooses not to travel.',
          'Visa approval is solely at the discretion of the relevant embassy or immigration authority.',
        ],
      },
      {
        number: '7',
        title: 'No-Show',
        content: [
          'Failure to use a confirmed flight, hotel, tour, transfer, cruise or other travel service without prior cancellation may be treated as a No-Show.',
          "No-show bookings may be completely non-refundable and are subject to the supplier's applicable policy.",
        ],
      },
      {
        number: '8',
        title: 'Refund Method',
        content: [
          'Approved refunds will normally be made to the original payment method used for the booking, unless otherwise agreed or required by the applicable payment process.',
          'Applicable bank, payment gateway, currency conversion or administrative charges may be deducted where permitted.',
        ],
      },
      {
        number: '9',
        title: 'Changes Instead of Cancellation',
        content: [
          'Customers may request changes to their booking instead of cancellation. Changes are subject to availability and may involve fare differences, supplier penalties and service charges.',
        ],
      },
      {
        number: '10',
        title: 'Force Majeure',
        content: [
          'In cases involving events beyond reasonable control, such as natural disasters, severe weather, government restrictions, strikes, pandemics, war, civil unrest, airport closures or major operational disruptions, refunds or alternative arrangements will be subject to the policies and decisions of the relevant suppliers.',
        ],
      },
      {
        number: '11',
        title: 'Important Notice',
        content: [
          "BlackForest Holidays acts as a travel agent/intermediary for various travel service providers. The final cancellation and refund amount is determined by the applicable supplier's terms and conditions.",
          'Customers are advised to carefully review the cancellation conditions provided with their quotation, invoice or booking confirmation before making payment.',
        ],
      },
    ],
  },

  'terms-conditions': {
    slug: 'terms-conditions',
    title: 'Terms & Conditions',
    cursiveSubtitle: 'Terms of Service & Agreement',
    heroImage: '/assets/images/Pngtree-worldwide-flight-adventure-a-3d_5773140-scaled.jpg',
    intro: 'By making a booking or using the services of BlackForest Holidays Private Limited, you agree to the following Terms & Conditions.',
    sections: [
      {
        number: '1',
        title: 'Booking & Payment',
        content: [
          'All bookings are subject to availability and confirmation by the respective airline, hotel, tour operator, cruise line or service provider. A booking is confirmed only after the required payment is received and confirmation is issued. Prices may change until the booking is confirmed.',
        ],
      },
      {
        number: '2',
        title: 'Travel Documents',
        content: [
          "Customers are responsible for providing accurate passenger details and ensuring that their passport, visa and other travel documents are valid and meet the destination's requirements. BlackForest Holidays is not responsible for incorrect information or inadequate travel documentation provided by the customer.",
        ],
      },
      {
        number: '3',
        title: 'Flights & Travel Services',
        content: [
          'Airline tickets and other travel services are subject to the terms, conditions and fare rules of the respective service provider. Flight schedules, timings and routes may change. Any airline or supplier penalties, fare differences or additional charges will be payable by the customer.',
        ],
      },
      {
        number: '4',
        title: 'Cancellation & Refunds',
        content: [
          "Cancellation charges depend on the applicable airline, hotel, tour operator, cruise line or other supplier's policy. Some bookings may be partially or completely non-refundable. Refunds, where applicable, will be processed after the relevant supplier releases the refund. Processing times may vary.",
        ],
      },
      {
        number: '5',
        title: 'Holiday Packages',
        content: [
          'Package inclusions and exclusions will be specified in the quotation or booking confirmation. Itineraries may be modified due to weather, operational requirements, local conditions or circumstances beyond our control.',
        ],
      },
      {
        number: '6',
        title: 'Visa Assistance',
        content: [
          'BlackForest Holidays may assist with visa documentation and application procedures; however, visa approval is solely at the discretion of the relevant embassy, consulate or immigration authority. Visa fees and service charges may be non-refundable.',
        ],
      },
      {
        number: '7',
        title: 'Travel Insurance',
        content: [
          'Travel insurance is recommended for all travellers. Insurance coverage and claims are subject to the terms and conditions of the respective insurance provider.',
        ],
      },
      {
        number: '8',
        title: 'Third-Party Suppliers',
        content: [
          'BlackForest Holidays works with independent airlines, hotels, tour operators, transport companies, cruise lines, insurance providers and other suppliers. Their services are subject to their own terms and conditions. We will provide reasonable assistance in case of service-related issues.',
        ],
      },
      {
        number: '9',
        title: 'Force Majeure',
        content: [
          'BlackForest Holidays shall not be responsible for delays, cancellations, losses or additional expenses caused by circumstances beyond our reasonable control, including severe weather, natural disasters, strikes, government restrictions, pandemics, war, civil unrest, airline disruptions or other unforeseen events.',
        ],
      },
      {
        number: '10',
        title: 'Customer Responsibility',
        content: [
          "Customers must comply with airline, hotel, immigration, visa, tour and local laws and regulations. Any additional costs resulting from the customer's actions, missed services, incorrect information or failure to follow travel requirements will be the customer's responsibility.",
        ],
      },
      {
        number: '11',
        title: 'Personal Information',
        content: [
          'Customer information may be shared with airlines, hotels, embassies, visa centres, insurers and other relevant service providers when necessary to arrange and deliver the requested travel services. Personal information will be handled in accordance with applicable privacy laws.',
        ],
      },
      {
        number: '12',
        title: 'Acceptance',
        content: [
          'By confirming a booking or making payment, the customer confirms that they have read, understood and accepted these Terms & Conditions.',
        ],
      },
    ],
  },

  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    cursiveSubtitle: 'Privacy & Data Protection',
    heroImage: '/assets/images/alexey-starki-91ykdj2WQeg-unsplash-scaled.jpg',
    intro: 'At BlackForest Holidays Private Limited, we are committed to safeguarding your privacy and ensuring the security of your personal data. This Privacy Policy describes how we collect, use, process, and protect your information when you visit our website, enquire about our luxury packages, or utilize our travel booking and concierge services.',
    sections: [
      {
        number: '1',
        title: 'Information We Collect',
        content: [
          'We collect information necessary to provide seamless travel planning, concierge services, and booking confirmations. This includes:',
        ],
        list: [
          'Personal details: Full name, title, date of birth, nationality, and passport numbers for travel reservations and visa filing.',
          'Contact details: Email address, telephone numbers, and residential or billing address.',
          'Booking preferences: Flight seating, dietary requirements, cabin preferences, hotel selections, and medical assistance requests.',
          'Transaction details: Payment history, transaction identifiers, and invoicing data (we do not store sensitive payment card credentials).',
          'Digital browsing data: IP address, device specifications, browser type, and interaction metrics gathered through essential cookies.',
        ],
      },
      {
        number: '2',
        title: 'How We Use Your Information',
        content: [
          'Your personal information is used exclusively to facilitate your journeys and ensure high-touch concierge support, including:',
        ],
        list: [
          'Reserving domestic and international flights, luxury hotels, cruise itineraries, and private airport transfers.',
          'Reviewing documents, verifying paperwork, and scheduling consular appointments for visa assistance.',
          'Issuing eligible travel insurance coverage and managing itinerary adjustments.',
          'Sending booking confirmations, e-tickets, tax invoices, and urgent travel advisories.',
          'Responding promptly to customer enquiries, feedback, and tailor-made itinerary requests.',
        ],
      },
      {
        number: '3',
        title: 'Information Sharing with Travel Suppliers',
        content: [
          'In order to deliver your travel arrangements, relevant information must be shared with authorized third-party service providers:',
        ],
        list: [
          'Airlines, railway operators, and cruise liners for passenger ticketing and seat allocation.',
          'Hotels, luxury resorts, and villas for room reservation confirmations.',
          'Embassies, consulates, and authorized visa application centres (such as VFS Global / BLS) for visa applications.',
          'Licensed travel insurance providers for coverage issuance.',
          'Local ground transportation and tour guides at your destination.',
        ],
        note: 'We do not sell, rent, or lease your personal information to third parties for marketing purposes.',
      },
      {
        number: '4',
        title: 'Data Security & Storage',
        content: [
          'We implement robust technical, organizational, and physical safeguards to prevent unauthorized access, disclosure, alteration, or destruction of your personal data.',
          'All communication transmitted through our website is secured with industry-standard SSL/TLS encryption. Access to customer records is strictly limited to authorized personnel handling your booking.',
        ],
      },
      {
        number: '5',
        title: 'Data Retention',
        content: [
          'We retain personal information only for as long as required to deliver your booked travel services, resolve customer queries, and comply with mandatory legal, taxation, and accounting regulations in India.',
        ],
      },
      {
        number: '6',
        title: 'Cookies & Tracking',
        content: [
          'Our website uses essential and performance cookies to maintain session security, remember user preferences, and analyze anonymized site traffic.',
          'You may modify your browser settings to decline cookies; however, some interactive features of our website may function with limited performance.',
        ],
      },
      {
        number: '7',
        title: 'Your Privacy Rights',
        content: [
          'You have the right to request access to the personal data we hold about you, request corrections to inaccurate or outdated records, or request deletion of your information, subject to statutory record-keeping and active travel obligations.',
        ],
      },
      {
        number: '8',
        title: 'Updates to This Privacy Policy',
        content: [
          'We may update this Privacy Policy from time to time to reflect operational, technological, or legal developments. Any revisions will be published on this page with an updated modification timestamp.',
        ],
      },
    ],
  },
};

export default function PolicyPage({ policyKey }) {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  // Determine active policy from prop or URL
  let currentKey = policyKey;
  if (!currentKey) {
    if (path.includes('cancel') || path.includes('refund')) {
      currentKey = 'cancellation-refund-policy';
    } else if (path.includes('terms')) {
      currentKey = 'terms-conditions';
    } else {
      currentKey = 'privacy-policy';
    }
  }

  const policy = policies[currentKey] || policies['privacy-policy'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentKey]);

  return (
    <div className="animate-fadeIn bg-white font-sans text-gray-800 overflow-x-hidden">
      
      {/* 1. Hero Header */}
      <section className="relative h-[55vh] min-h-[460px] flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src={policy.heroImage}
            alt={policy.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45 z-0" />
        </div>

        <div className="relative z-10 text-white flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight mb-4 drop-shadow-xl font-sans">
            {policy.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-light drop-shadow-md tracking-wider">
            <Link to="/" className="hover:text-gray-200 transition-colors">Home</Link>
            <span className="text-[10px] opacity-80">▾</span>
            <span className="text-white">{policy.title}</span>
          </div>
        </div>

        {/* Hero Wave Divider */}
        <HeroWave />
      </section>

      {/* 2. Policy Switcher Tabs */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 sm:gap-6 overflow-x-auto py-3">
            <Link
              to="/privacy-policy"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                currentKey === 'privacy-policy'
                  ? 'bg-[#10221b] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#7cb342] hover:bg-gray-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Privacy Policy
            </Link>

            <Link
              to="/cancellation-refund-policy"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                currentKey === 'cancellation-refund-policy'
                  ? 'bg-[#10221b] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#7cb342] hover:bg-gray-50'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              Cancellation & Refund
            </Link>

            <Link
              to="/terms-conditions"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                currentKey === 'terms-conditions'
                  ? 'bg-[#10221b] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#7cb342] hover:bg-gray-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              Terms & Conditions
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Main Policy Content */}
      <section className="py-16 md:py-24 bg-white relative z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Eyebrow, Heading & Underline */}
          <div className="mb-12">
            <span
              className="text-2xl sm:text-3xl block mb-2 text-[#27B8B1] tracking-wide font-cursive"
              style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
            >
              {policy.cursiveSubtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#7cb342] leading-tight font-sans mb-4">
              {policy.title}
            </h2>
            <div className="w-16 h-[3px] bg-[#27B8B1] mb-8 rounded-full" />
            
            <p className="text-[#555555] font-light leading-relaxed text-[20px] font-sans">
              {policy.intro}
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-12">
            {policy.sections.map((section, idx) => (
              <div
                key={idx}
                className="bg-[#fafbfc] border border-gray-100 rounded-lg p-6 sm:p-8 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#10221b] text-white text-sm font-bold shrink-0 mt-0.5 font-sans">
                    {section.number}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#10221b] font-sans leading-snug">
                    {section.title}
                  </h3>
                </div>

                <div className="space-y-4 pl-12">
                  {section.content.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-[#555555] font-light leading-relaxed text-[20px] font-sans"
                    >
                      {p}
                    </p>
                  ))}

                  {/* Bulleted List if present */}
                  {section.list && (
                    <ul className="space-y-2.5 pt-2">
                      {section.list.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="flex items-start gap-2.5 text-[#555555] font-light leading-relaxed text-[20px] font-sans"
                        >
                          <span className="text-[#27B8B1] font-bold text-xl leading-none mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Note if present */}
                  {section.note && (
                    <p className="text-[#10221b] font-medium text-[20px] font-sans pt-2 italic">
                      {section.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 4. Company Signature & Address Block */}
          <div className="mt-16 pt-10 border-t border-gray-200">
            <div className="bg-[#0c1c16] text-white rounded-lg p-8 sm:p-10 space-y-6">
              <div>
                <span
                  className="text-2xl block mb-1 text-[#27B8B1] tracking-wide font-cursive"
                  style={{ fontFamily: "var(--font-cursive, 'Mansalva', cursive)" }}
                >
                  Need Clarification?
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                  BlackForest Holidays Private Limited
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-sm sm:text-base font-light text-gray-200">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#27B8B1] shrink-0 mt-1" />
                  <p className="leading-relaxed">
                    737, 3rd Floor, Kheny Plaza, CMH Main Road, 2nd Cross Rd, Binnamangala, Indiranagar, Bengaluru, Karnataka 560038
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#27B8B1] shrink-0" />
                    <a
                      href="mailto:info@blackforestholidays.com"
                      className="hover:text-[#27B8B1] transition-colors"
                    >
                      info@blackforestholidays.com
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#27B8B1] shrink-0" />
                    <a
                      href="tel:+919742877700"
                      className="hover:text-[#27B8B1] transition-colors"
                    >
                      +91 9742877700 / 9742977700
                    </a>
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
