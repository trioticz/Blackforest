import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapPin, ArrowRight, Compass, Search } from 'lucide-react';
import { destinationService } from '../../services/allServices';
import { useSettings } from '../../context/SiteSettingsContext';
import { isDestinationPublished, DESTINATIONS_EVENT } from '../../utils/destinationsManager';

export default function DestinationsPage() {
  const { region: routeRegion } = useParams();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState(routeRegion || 'all');
  const [search, setSearch] = useState('');
  const { openEnquiryModal } = useSettings();

  const regions = [
    { id: 'all', label: 'All Regions' },
    { id: 'europe', label: 'Europe' },
    { id: 'africa', label: 'Africa' },
    { id: 'america', label: 'America' },
    { id: 'asian-countries', label: 'Asian Countries' },
    { id: 'australia', label: 'Australia' },
    { id: 'indian-ocean', label: 'Indian Ocean' },
    { id: 'middle-east', label: 'Middle East' },
    { id: 'south-asia', label: 'South Asia' },
    { id: 'india', label: 'India' }
  ];

  useEffect(() => {
    if (routeRegion) {
      setSelectedRegion(routeRegion);
    }
  }, [routeRegion]);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const params = { status: 'published' };
      if (selectedRegion !== 'all') {
        params.region = selectedRegion;
      }
      if (search.trim()) {
        params.search = search.trim();
      }
      const res = await destinationService.getAll(params);
      if (res.success && res.data) {
        const list = res.data.destinations || [];
        // Only show destinations that are published in admin controls
        setDestinations(list.filter(d => isDestinationPublished(d.slug)));
      }
    } catch (err) {
      console.error('Error fetching destinations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [selectedRegion, search]);

  useEffect(() => {
    const handleUpdate = () => {
      fetchDestinations();
    };
    window.addEventListener(DESTINATIONS_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(DESTINATIONS_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [selectedRegion, search]);

  return (
    <div className="pt-24 pb-20 bg-[#fbfaf8] animate-fadeIn">
      {/* Page Header */}
      <div className="bg-[#10221b] text-white py-16 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-[#f29727] block mb-2">
            Global Destinations Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-sans font-bold text-white mb-4">
            Discover Your Next Horizon
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            From the snow-crowned summits of the Swiss Alps to the secluded overwater atolls of the Maldives and the sacred temples of India.
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto mt-8 relative">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter destinations by country or name..."
              className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#f29727] backdrop-blur-md"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Region Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {regions.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all ${
                selectedRegion === r.id
                  ? 'bg-[#10221b] text-[#f29727] shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Destination Cards Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24 text-gray-400 gap-2">
            <span className="w-6 h-6 border-2 border-[#f29727] border-t-transparent rounded-full animate-spin"></span>
            Loading destinations...
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <Compass className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-sans font-bold text-gray-700">No destinations found</h3>
            <p className="text-xs text-gray-500 mt-1">Try resetting your filter or search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#f29727]/50 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={d.thumbnail || d.heroImage || '/assets/images/sean-robertson-5ftxFgXLtkI-unsplash-scaled.jpg'}
                    alt={d.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/images/corporate-travel.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#10221b]/80 backdrop-blur-md text-[#f29727] text-[11px] font-bold uppercase tracking-wider rounded-full">
                    {d.region.replace('-', ' ')}
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#f29727]" />
                    <span>{d.country || d.name}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-sans font-bold text-[#10221b] group-hover:text-[#f29727] transition-colors mb-2">
                      {d.name}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-6">
                      {d.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      to={`/destinations/${d.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#10221b] group-hover:text-[#f29727] transition-colors"
                    >
                      <span>Explore Region</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => openEnquiryModal({ destination: d.name })}
                      className="text-xs text-gray-400 hover:text-[#10221b] font-medium"
                    >
                      Inquire
                    </button>
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
