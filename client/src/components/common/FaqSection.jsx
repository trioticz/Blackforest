import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const { openEnquiryModal } = useSettings();

  const faqs = [
    {
      question: 'How do I book a tour package with BlackForest Holidays?',
      answer: 'You can easily request a booking or quote by clicking "Enquire Now" or "Plan My Trip" on any tour page, sending us a message via WhatsApp, or calling our helpline at +91 9742877700 / 9742977700. Our travel specialists will promptly assist you with custom quotes and bookings.'
    },
    {
      question: 'Can I fully customize my travel itinerary?',
      answer: 'Yes! All our international and domestic holiday packages are fully customizable. Whether you want to change hotel categories, extend your stay, add private tours, or choose specific flights, our travel experts design every itinerary around your preferences.'
    },
    {
      question: 'Do you assist with Visas, Flight Bookings, and Travel Insurance?',
      answer: 'Absolutely. We provide comprehensive end-to-end travel services including international and domestic flight bookings, complete visa guidance and processing support, luxury hotel reservations, and comprehensive travel insurance coverage.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods including credit/debit cards, Net Banking, UPI (GPay, PhonePe, Paytm), and direct bank transfers. We also offer flexible partial payment schedules for advance tour bookings.'
    },
    {
      question: 'What is your cancellation and refund policy?',
      answer: 'Our cancellation policies depend on flight ticket terms and hotel supplier guidelines. In general, cancellations made well in advance receive maximum eligible refunds. Detailed terms are shared prior to booking confirmation, and refund processing is handled swiftly.'
    },
    {
      question: 'Will I have 24/7 support during my trip?',
      answer: 'Yes! From the moment your journey begins until you return home, you will have access to a dedicated travel concierge and 24/7 emergency support hotline for seamless assistance anytime during your trip.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#f6f8f6] text-[#10221b] border-t border-gray-200/60 relative overflow-hidden render-defer">
      {/* Decorative subtle background accents */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none bg-bottom bg-cover"
        style={{ backgroundImage: "url('/assets/images/number-counter-bg.png')" }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10221b]/5 text-[#10221b] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4 text-[#27B8B1]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-[#10221b] tracking-tight font-sans">
            Frequently Asked <span className="text-[#27B8B1]">Questions</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 font-light leading-relaxed">
            Find answers to common questions about our customized holiday packages, bookings, visas, and travel support.
          </p>
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#27B8B1]/40 shadow-lg ring-1 ring-[#27B8B1]/20'
                    : 'bg-white/80 border-gray-200 hover:border-gray-300 hover:bg-white shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg text-[#10221b] leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-[#10221b] text-white rotate-180' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-gray-600 leading-relaxed font-light border-t border-gray-100 pt-3 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 text-center p-6 sm:p-8 rounded-2xl bg-[#10221b] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide">
              Have More Questions?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-light mt-1">
              Our travel specialists are here 24/7 to help tailor your perfect holiday.
            </p>
          </div>
          <button
            onClick={() => openEnquiryModal({ title: 'General FAQ Inquiry' })}
            className="shrink-0 px-6 py-3 rounded-lg bg-[#27B8B1] hover:bg-[#1fa19b] text-[#10221b] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Us Now</span>
          </button>
        </div>

      </div>
    </section>
  );
}
