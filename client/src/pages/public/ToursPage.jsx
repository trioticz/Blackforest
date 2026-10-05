import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, Star, MapPin, Search, ArrowRight, Compass } from 'lucide-react';
import { tourService } from '../../services/allServices';
import { useSettings } from '../../context/SiteSettingsContext';

export default function ToursPage({ defaultCategory = 'international' }) {
  const location = useLocation();
  const isIndia = location.pathname.includes('india') || defaultCategory === 'india';

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const { openEnquiryModal } = useSettings();

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const params = {
          category: isIndia ? 'india' : 'international',
          status: 'published'
        };
        if (search.trim()) params.search = search.trim();

        const res = await tourService.getAll(params);
        if (res.success && res.data) {
          setTours(res.data.tours || []);
        }
      } catch (err) {
        console.error('Error fetching tours catalog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [isIndia, search]);

  return (
    <div className="pt-24 pb-20 bg-[#fbfaf8] animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#10221b] text-white py-16 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-[#f29727] block mb-2">
            {isIndia ? 'Incredible India Escapes' : 'International Expeditions'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-sans font-bold text-white mb-4">
            {isIndia ? 'Indian Tour Packages' : 'International Tour Packages'}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            {isIndia
              ? 'From the backwaters of Kerala and misty Nilgiri hills to Andaman turquoise lagoons and Rajasthan palaces.'
              : 'Handcrafted luxury tours across Europe, Africa, America, Far East Asia, Australia, and Indian Ocean atolls.'}
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto mt-8 relative">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tours by city, title, or highlights..."
              className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#f29727] backdrop-blur-md"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Switcher Tabs */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <Link
            to="/international-tours"
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              !isIndia
                ? 'bg-[#10221b] text-[#f29727] shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            International Tours
          </Link>
          <Link
            to="/india-tours"
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              isIndia
                ? 'bg-[#10221b] text-[#f29727] shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            India Tour Packages
          </Link>
        </div>

        {/* Tour Package Cards Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24 text-gray-400 gap-2">
            <span className="w-6 h-6 border-2 border-[#f29727] border-t-transparent rounded-full animate-spin"></span>
            Loading tours catalog...
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <Compass className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-sans font-bold text-gray-700">No tour packages found</h3>
            <p className="text-xs text-gray-500 mt-1">Try modifying your search keywords</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#f29727]/50 transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Card Cover */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tour.coverImage || '/assets/images/1-scaled.jpg'}
                    alt={tour.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#10221b]/80 backdrop-blur-md text-[#f29727] text-[11px] font-bold uppercase tracking-wider rounded-full">
                    {tour.destination?.name || tour.type || 'Custom Tour'}
                  </div>

                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-md text-[#10221b] text-xs font-bold rounded-full flex items-center gap-1 shadow">
                    <Star className="w-3.5 h-3.5 text-[#f29727] fill-[#f29727]" />
                    <span>{tour.rating || 4.9}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 text-xs text-white flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#f29727]" />
                    <span>{tour.duration}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {tour.location && (
                      <div className="flex items-center gap-1 text-xs text-gray-400 font-medium mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#f29727]" />
                        <span className="truncate">{tour.location}</span>
                      </div>
                    )}
                    <h3 className="text-xl font-sans font-bold text-[#10221b] group-hover:text-[#f29727] transition-colors line-clamp-2 mb-2">
                      {tour.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                      {tour.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 block">From</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-bold text-[#10221b]">${tour.price}</span>
                        {tour.discountPrice && (
                          <span className="text-xs text-gray-400 line-through">${tour.discountPrice}</span>
                        )}
                        <span className="text-[10px] text-gray-400">/ person</span>
                      </div>
                    </div>

                    <Link
                      to={`/tours/${tour.slug}`}
                      className="px-4 py-2 bg-[#10221b] hover:bg-[#1c382e] text-[#f29727] text-xs font-semibold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
