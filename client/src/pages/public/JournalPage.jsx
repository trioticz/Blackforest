import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Search, ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import { useWebsiteContent } from '../../context/WebsiteContentContext';
import { getPublishedBlogs, BLOGS_EVENT } from '../../utils/blogsManager';

export default function JournalPage() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { content: journalHeroContent } = useWebsiteContent('journal.hero', null);

  const categories = [
    { id: 'all', label: 'All Dispatches' },
    { id: 'Trekking & Safety', label: 'Trekking & Safety' },
    { id: 'Trekking', label: 'Trekking' },
    { id: 'Culture', label: 'Culture' },
    { id: 'Camping', label: 'Camping' },
    { id: 'Travel Guides', label: 'Travel Guides' }
  ];

  const loadBlogs = () => {
    const list = getPublishedBlogs();
    setArticles(list);
  };

  useEffect(() => {
    loadBlogs();
    window.addEventListener(BLOGS_EVENT, loadBlogs);
    return () => window.removeEventListener(BLOGS_EVENT, loadBlogs);
  }, []);

  const filtered = articles.filter((art) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      art.category?.toLowerCase() === selectedCategory.toLowerCase() ||
      (selectedCategory === 'Trekking' && (art.category || '').toLowerCase().includes('trekking'));
    const matchesSearch =
      !search.trim() ||
      art.title?.toLowerCase().includes(search.toLowerCase()) ||
      art.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
      (art.tags && art.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-20 pb-20 bg-[#ffffff] animate-fadeIn">
      {/* Authentic Title & Header Banner */}
      <section className="relative overflow-hidden bg-[#10221b] text-white py-16 sm:py-24 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity"
          style={{
            backgroundImage:
              'url("/assets/images/home-intro-bg.jpg"), url("/assets/images/about-pine-bg.jpg")'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#10221b]/95 via-[#10221b]/90 to-[#10221b]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase font-bold tracking-widest text-[#f29727] block mb-3">
            {journalHeroContent?.badge || 'The Blackforest Journal'}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white mb-4">
            {journalHeroContent?.headline || 'Curated Stories For Curious Travelers'}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {journalHeroContent?.subheadline || 'Practical packing guides, mountain safety protocols, and insider chronicles from our private travel specialists.'}
          </p>

          <div className="max-w-md mx-auto mt-8 relative">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guides, safety tips, culture..."
              className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#f29727] backdrop-blur-md transition-all"
            />
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#10221b] text-[#f29727] shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-[#fbfaf8] rounded-2xl border border-gray-200">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-sans font-bold text-gray-700">No articles found</h3>
            <p className="text-xs text-gray-500 mt-1">Try another search query or select all dispatches.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((art) => (
              <article
                key={art.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#f29727]/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  <img
                    src={art.coverImage || '/assets/images/blog-010.jpg'}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#10221b]/80 backdrop-blur-md text-[#f29727] text-[11px] font-bold uppercase tracking-wider rounded-full">
                    {art.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-[#f29727]" />
                      <span>{art.date || 'July 10, 2021'}</span>
                    </div>

                    <h3 className="text-xl font-sans font-bold text-[#10221b] group-hover:text-[#f29727] transition-colors line-clamp-2 mb-3">
                      <Link to={`/journal/${art.slug}`}>{art.title}</Link>
                    </h3>

                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-6">
                      {art.excerpt || art.content?.slice(0, 130)}
                    </p>
                  </div>

                  <Link
                    to={`/journal/${art.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#10221b] group-hover:text-[#f29727] transition-colors pt-4 border-t border-gray-100"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
