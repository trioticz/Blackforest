import React from 'react';
import { Link } from 'react-router-dom';

export default function JournalSection() {
  const articles = [
    {
      id: 1,
      slug: 'safety-measures-for-safe-trekking-in-waterfalls',
      title: 'Safety measures for safe trekking in waterfalls',
      category: 'Travel tips',
      date: 'July 10, 2021',
      coverImage: '/assets/images/blog-010.jpg'
    },
    {
      id: 2,
      slug: '10-tips-for-best-winter-hiking-experience',
      title: '10 Tips for best winter hiking experience',
      category: 'Travel tips',
      date: 'July 9, 2021',
      coverImage: '/assets/images/blog-007.jpg'
    },
    {
      id: 3,
      slug: 'how-to-select-perfect-quality-camping-tent',
      title: 'How to select perfect quality camping tent',
      category: 'Travel tips',
      date: 'July 8, 2021',
      coverImage: '/assets/images/blog-006.jpg'
    }
  ];

  return (
    <section className="py-20 bg-white render-defer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title matching screenshot */}
        <div className="text-center mb-14">
          <span 
            className="text-2xl sm:text-[26px] block mb-1"
            style={{
              fontFamily: "var(--font-cursive, 'Caveat', cursive, serif)",
              color: "#27B8B1"
            }}
          >
            Recent news feed
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#5e963b] font-sans tracking-wide">
            Curated Stories For Curious Travelers
          </h2>
        </div>

        {/* 3 Blog Cards Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/blog/${article.slug}`}
              className="bg-white rounded-lg overflow-hidden group block transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-60 sm:h-64 overflow-hidden rounded-md mb-4 bg-gray-100 shadow-sm border border-gray-100">
                <img 
                  src={article.coverImage} 
                  alt={article.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div>
                <span className="text-[#f29727] text-xs font-bold uppercase tracking-wider mb-2 block font-sans">
                  • {article.category}
                </span>
                <h3 className="text-gray-900 font-bold text-base sm:text-lg leading-snug mb-2 group-hover:text-[#5e963b] transition-colors font-sans line-clamp-2">
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* View More Button matching screenshot */}
        <div className="text-center mt-12">
          <Link 
            to="/journal" 
            className="inline-block px-8 py-3 bg-[#f29727] hover:bg-[#db841a] text-white font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md hover:shadow-lg"
          >
            View More
          </Link>
        </div>

      </div>
    </section>
  );
}
