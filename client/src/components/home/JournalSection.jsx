import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedBlogs, BLOGS_EVENT } from '../../utils/blogsManager';
import { useWebsiteImage } from '../../context/WebsiteImagesContext';

const DEFAULT_ARTICLES = [
  {
    id: 1,
    slug: 'safety-measures-for-safe-trekking-in-waterfalls',
    title: 'Safety measures for safe trekking in waterfalls',
    category: 'Travel tips',
    date: 'July 10, 2021',
    coverImage: '/assets/images/blog-010.webp',
    imageKey: 'blog.waterfall_trekking.cover'
  },
  {
    id: 2,
    slug: '10-tips-for-best-winter-hiking-experience',
    title: '10 Tips for best winter hiking experience',
    category: 'Travel tips',
    date: 'July 9, 2021',
    coverImage: '/assets/images/blog-007.webp',
    imageKey: 'blog.winter_hiking.cover'
  },
  {
    id: 3,
    slug: 'how-to-select-perfect-quality-camping-tent',
    title: 'How to select perfect quality camping tent',
    category: 'Travel tips',
    date: 'July 8, 2021',
    coverImage: '/assets/images/blog-006.webp',
    imageKey: 'blog.camping_tent.cover'
  }
];

export default function JournalSection() {
  const blogCover1 = useWebsiteImage('blog.waterfall_trekking.cover', '/assets/images/blog-010.webp');
  const blogCover2 = useWebsiteImage('blog.winter_hiking.cover', '/assets/images/blog-007.webp');
  const blogCover3 = useWebsiteImage('blog.camping_tent.cover', '/assets/images/blog-006.webp');

  const coverMap = useMemo(() => ({
    'safety-measures-for-safe-trekking-in-waterfalls': blogCover1,
    '10-tips-for-best-winter-hiking-experience': blogCover2,
    'how-to-select-perfect-quality-camping-tent': blogCover3
  }), [blogCover1, blogCover2, blogCover3]);

  const [articles, setArticles] = useState(() => {
    const published = getPublishedBlogs();
    return published && published.length >= 3 ? published.slice(0, 3) : DEFAULT_ARTICLES;
  });


  useEffect(() => {
    const updateArticles = () => {
      const published = getPublishedBlogs();
      if (published && published.length >= 3) {
        setArticles(published.slice(0, 3));
      }
    };
    window.addEventListener(BLOGS_EVENT, updateArticles);
    window.addEventListener('storage', updateArticles);
    return () => {
      window.removeEventListener(BLOGS_EVENT, updateArticles);
      window.removeEventListener('storage', updateArticles);
    };
  }, []);

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
          {articles.map((article) => {
            const resolvedCover = coverMap[article.slug] || article.coverImage;
            return (
              <Link
                key={article.id}
                to={`/blog/${article.slug}`}
                className="bg-white rounded-lg overflow-hidden group block transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-60 sm:h-64 overflow-hidden rounded-md mb-4 bg-gray-100 shadow-sm border border-gray-100">
                  <picture>
                    {resolvedCover && resolvedCover.endsWith('.jpg') && (
                      <source srcSet={resolvedCover.replace('.jpg', '.webp')} type="image/webp" />
                    )}
                    <img 
                      src={resolvedCover} 
                      alt={article.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </picture>
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
          );
        })}
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
