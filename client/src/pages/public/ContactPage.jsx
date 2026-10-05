import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { enquiryService } from '../../services/allServices';
import { useSettings } from '../../context/SiteSettingsContext';
import HeroWave from '../../components/common/HeroWave';
import OfficesMapSection from '../../components/contact/OfficesMapSection';

export default function ContactPage() {
  const { settings } = useSettings();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    source: '',
    destination: '',
    month: '',
    year: '',
    duration: '',
    travelers: '',
    budget: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        destination: formData.destination,
        travelDate: [formData.month, formData.year].filter(Boolean).join(' '),
        travellers: formData.travelers,
        budget: formData.budget,
        source: formData.source || 'Website Contact Page',
        message: formData.duration ? `Duration: ${formData.duration}\n\n${formData.message}` : formData.message,
      };
      
      const res = await enquiryService.create(payload);
      if (res.success) {
        showToast('Message sent successfully! Our team will contact you soon.', 'success');
        setFormData({
          firstName: '', lastName: '', email: '', phone: '', source: '',
          destination: '', month: '', year: '', duration: '', travelers: '', budget: '', message: ''
        });
      } else {
        showToast(res.message || 'Failed to send message', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('An error occurred. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white font-sans text-gray-800 animate-fadeIn overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative h-[50vh] min-h-[420px] flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 bg-[#0a1712]">
          <img
            src="https://blackforestholidays.com/wp-content/uploads/2026/08/buddhist-prayer-flags-himalaya-mountains-annapurna-base-camp-area-nepal-scaled.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto text-white">
          <div className="text-[#27B8B1] font-cursive text-2xl md:text-3xl mb-2">
            Reach Out to Our Specialists
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 font-sans">
            Contact Us
          </h1>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-300 font-light">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>•</span>
            <span className="text-[#27B8B1] font-medium">Contact</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-10 text-white">
          <HeroWave />
        </div>
      </section>

      {/* 2. Main Contact Section (Matching User Image 2 Design & Layout) */}
      <section className="bg-[#fbfcfa] relative z-20 pt-16 sm:pt-20 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Form Card (7 Cols) */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-gray-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="mb-8">
                <span className="text-[#27B8B1] font-cursive text-2xl block mb-1">
                  Talk to us
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10221b] tracking-tight font-sans">
                  Get in Touch
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* YOUR DETAILS */}
                <div className="space-y-5">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5ba14a]" />
                    <h3 className="text-base font-bold text-[#10221b] uppercase tracking-wider">
                      Your Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5">
                      <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="John"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Doe"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5">
                      <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">How did you hear about us? *</label>
                    <select
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all text-gray-700 cursor-pointer"
                    >
                      <option value="">— Please choose an option —</option>
                      <option value="Google Search">Google Search</option>
                      <option value="Social Media (Instagram/Facebook)">Social Media (Instagram/Facebook)</option>
                      <option value="Friend / Family Referral">Friend / Family Referral</option>
                      <option value="Corporate Partner">Corporate Partner</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* YOUR TRIP */}
                <div className="space-y-5">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27B8B1]" />
                    <h3 className="text-base font-bold text-[#10221b] uppercase tracking-wider">
                      Your Trip Preferences
                    </h3>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Where would you like to go? *</label>
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all text-gray-700 cursor-pointer"
                    >
                      <option value="">— Select Destination —</option>
                      <option value="Switzerland & Alpine Highlights">Switzerland & Alpine Highlights</option>
                      <option value="Maldives Tropical Island Paradise">Maldives Tropical Island Paradise</option>
                      <option value="Exotic Asia & Far East">Exotic Asia & Far East</option>
                      <option value="Wonders of Middle East (Dubai)">Wonders of Middle East (Dubai)</option>
                      <option value="Kerala – Coastlines & Palaces">Kerala – Coastlines & Palaces</option>
                      <option value="Majestic Africa Safari">Majestic Africa Safari</option>
                      <option value="Magical Australia Tour">Magical Australia Tour</option>
                      <option value="Romantic Andaman Tour Package">Romantic Andaman Tour Package</option>
                      <option value="Grand America Explorer">Grand America Explorer</option>
                      <option value="Enchanting South Asia">Enchanting South Asia</option>
                      <option value="Custom Location / Other">Custom Location / Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5">
                      <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Travel Month</label>
                      <select
                        name="month"
                        value={formData.month}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all text-gray-700 cursor-pointer"
                      >
                        <option value="">— Select Month —</option>
                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Travel Year</label>
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all text-gray-700 cursor-pointer"
                      >
                        <option value="">— Select Year —</option>
                        {Array.from({ length: 3 }, (_, i) => currentYear + i).map((yr) => (
                          <option key={yr} value={yr}>{yr}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5">
                      <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Duration of Trip</label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="e.g. 7 Days, 2 Weeks"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Number of Travelers *</label>
                      <select
                        name="travelers"
                        value={formData.travelers}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all text-gray-700 cursor-pointer"
                      >
                        <option value="">— Select Travelers —</option>
                        <option value="1 Solo Traveler">1 Solo Traveler</option>
                        <option value="2 Couple / Adults">2 Couple / Adults</option>
                        <option value="3-5 Small Group / Family">3-5 Small Group / Family</option>
                        <option value="6+ Large Group / Corporate">6+ Large Group / Corporate</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Budget Per Person *</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all text-gray-700 cursor-pointer"
                    >
                      <option value="">— Select Budget —</option>
                      <option value="Below ₹50,000">Below ₹50,000</option>
                      <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                      <option value="₹1,00,000 - ₹2,00,000">₹1,00,000 - ₹2,00,000</option>
                      <option value="₹2,00,000 - ₹3,00,000">₹2,00,000 - ₹3,00,000</option>
                      <option value="Above ₹3,00,000">Above ₹3,00,000</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1.5 pt-2">
                    <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Special Requests & Comments</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about special occasions, preferred hotels, sightseeing activities, or pacing..."
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#10221b] hover:bg-[#5ba14a] text-white text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting Enquiry...' : 'Send Travel Enquiry'}</span>
                </button>
              </form>
            </div>

            {/* Right Column: Contact Info & Business Hours (Exact match to User Image 2) */}
            <div className="lg:col-span-5 space-y-10 pt-2 lg:pt-4 pl-0 lg:pl-4">
              
              {/* 1. Contact Info Section */}
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-[42px] font-extrabold text-[#5ba14a] tracking-tight font-sans">
                  Contact Info
                </h2>

                <div className="space-y-5 text-gray-700 text-sm sm:text-base leading-relaxed">
                  
                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-[#1dc5ce] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <a
                      href="mailto:info@blackforestholidays.com"
                      className="hover:text-[#5ba14a] transition-colors font-normal text-gray-800"
                    >
                      info@blackforestholidays.com
                    </a>
                  </div>

                  {/* Phone Numbers */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-[#1dc5ce] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div className="font-normal text-gray-800">
                      <a href="tel:+919742877700" className="hover:text-[#5ba14a] transition-colors">
                        +91 9742877700
                      </a>
                      <span> / </span>
                      <a href="tel:9742977700" className="hover:text-[#5ba14a] transition-colors">
                        9742977700
                      </a>
                    </div>
                  </div>

                  {/* Bengaluru Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-[#1dc5ce] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-normal text-gray-800 leading-relaxed max-w-md">
                      737, 3rd Floor, Kheny Plaza CMH Main Road, 2nd Cross Rd, Binnamangala, Indiranagar, Bengaluru, Karnataka 560038
                    </span>
                  </div>

                  {/* Coimbatore Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-[#1dc5ce] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-normal text-gray-800 leading-relaxed max-w-md">
                      76, 1st floor, 8th Street, Crosscut Road, Gandhipuram, Coimbatore – 641012
                    </span>
                  </div>

                </div>
              </div>

              {/* 2. Business Hours Section (Exact match to User Image 2) */}
              <div className="space-y-6 pt-2">
                <h2 className="text-4xl sm:text-[42px] font-extrabold text-[#5ba14a] tracking-tight font-sans">
                  Business Hours:
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-gray-800 font-medium max-w-md">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span>Monday — Friday</span>
                    <span className="text-gray-600 font-normal">8am — 9pm</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span>Saturday — Sunday</span>
                    <span className="text-gray-600 font-normal">9am — 6pm</span>
                  </div>
                </div>
              </div>

              {/* 3. Note Paragraph (Exact match to User Image 2) */}
              <div className="pt-2">
                <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed max-w-lg">
                  <span className="font-medium text-gray-800">Note:</span> Our travel advisors are committed to responding promptly to all inquiries. Whether it&apos;s a last-minute booking, visa support, or itinerary customization, we&apos;re here to help you travel with confidence.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. New Custom Illustrated Regional Office Map Section (Matching User Image 2) */}
      <OfficesMapSection />

    </div>
  );
}
