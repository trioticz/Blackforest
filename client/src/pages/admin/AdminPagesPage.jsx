import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  ExternalLink,
  Eye,
  SlidersHorizontal,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
  Globe,
  Image as ImageIcon,
  Search
} from 'lucide-react';
import { pageSectionService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';

const PUBLIC_PAGES = [
  {
    title: 'Homepage',
    slug: 'home',
    route: '/',
    description: 'Main landing page: hero video, services carousel, about memories, adventures, stats, testimonials, and journal.',
    badge: 'Core Landing',
    defaultSectionsCount: 11
  },
  {
    title: 'Global Header & Footer',
    slug: 'global',
    route: '/',
    description: 'Site-wide header announcement bar, global navigation menu, contact hotline, FAQ accordions, and footer branch details.',
    badge: 'Site-Wide',
    defaultSectionsCount: 3
  },
  {
    title: 'About Us',
    slug: 'about',
    route: '/about',
    description: 'Company story, philosophy, brand pillars, guiding values, and travel craftsmanship.',
    badge: 'Company',
    defaultSectionsCount: 3
  },
  {
    title: 'Contact Us & Branches',
    slug: 'contact',
    route: '/contact',
    description: 'Branch office locations (Bengaluru & Coimbatore), phone numbers, inquiry forms, and business hours.',
    badge: 'Contact',
    defaultSectionsCount: 2
  },
  {
    title: 'Corporate Travel & MICE',
    slug: 'corporate',
    route: '/corporate-travel',
    description: 'Corporate offsites, executive retreats, team incentives, and conference travel management.',
    badge: 'B2B',
    defaultSectionsCount: 1
  },
  {
    title: 'Cruises & Ocean Voyages',
    slug: 'cruises',
    route: '/cruises',
    description: 'Luxury ocean liners, European river cruises, and bespoke maritime itineraries.',
    badge: 'Niche',
    defaultSectionsCount: 1
  },
  {
    title: 'Bespoke Concierge',
    slug: 'concierge',
    route: '/concierge',
    description: 'VIP airport meet & greet, flight reservations, visa assistance, and private ground handling.',
    badge: 'Services',
    defaultSectionsCount: 1
  },
  {
    title: 'Guided Coach Tours',
    slug: 'coach_tour',
    route: '/coach-tour',
    description: 'Panoramic luxury coach tours and scenic guided group travel across breathtaking destinations.',
    badge: 'Tours',
    defaultSectionsCount: 1
  },
  {
    title: 'Destinations Catalog',
    slug: 'destinations',
    route: '/destinations',
    description: 'Continental categories: Asian Countries, Indian Ocean, Europe, Americas, Middle East, and Australia.',
    badge: 'Catalog',
    isDynamic: true,
    manageLink: '/admin/destinations'
  },
  {
    title: 'Tour Packages',
    slug: 'tours',
    route: '/international-tours',
    description: 'Curated international itineraries and luxury holidays across worldwide destinations.',
    badge: 'Catalog',
    isDynamic: true,
    manageLink: '/admin/tours'
  },
  {
    title: 'Travel Journal / Blog',
    slug: 'journal',
    route: '/journal',
    description: 'Editorial articles, destination guides, travel tips, and specialist field insights.',
    badge: 'Editorial',
    isDynamic: true,
    manageLink: '/admin/journal'
  },
  {
    title: 'Legal & Policies',
    slug: 'policy',
    route: '/privacy-policy',
    description: 'Privacy policy, booking terms, cancellation and refund policies.',
    badge: 'Legal',
    isDynamic: true
  }
];

export default function AdminPagesPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSections = async () => {
    try {
      setLoading(true);
      const res = await pageSectionService.getAll({ preview: 'true' });
      if (res?.success && res.data) {
        setSections(res.data.sections || []);
      }
    } catch (err) {
      console.error('Failed to load page sections:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const getPageStats = (pageSlug) => {
    const pageSecs = sections.filter((s) => s.page_slug === pageSlug);
    const hasDrafts = pageSecs.some((s) => s.has_draft);
    return {
      count: pageSecs.length,
      hasDrafts,
      draftCount: pageSecs.filter((s) => s.has_draft).length
    };
  };

  const filteredPages = PUBLIC_PAGES.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold tracking-widest text-emerald-600 uppercase font-mono">
              Website CMS
            </span>
            <span className="text-zinc-300">•</span>
            <span className="text-xs font-medium text-zinc-500">Page Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
            Pages & Section Layouts
          </h1>
          <p className="text-sm text-zinc-500 mt-1 max-w-2xl">
            Manage 100% of public page content, headings, section order, visibility, buttons, and layouts without editing code.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/sections"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Open Page Builder</span>
          </Link>

          <Link
            to="/?preview=true"
            target="_blank"
            className="px-3.5 py-2 bg-zinc-900 hover:bg-black text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Preview Mode</span>
          </Link>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-zinc-200/80 shadow-xs">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pages by title or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Showing {filteredPages.length} public website routes</span>
        </div>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPages.map((page) => {
          const stats = getPageStats(page.slug);
          const sectionsCount = stats.count || page.defaultSectionsCount || 1;

          return (
            <div
              key={page.slug}
              className="bg-white rounded-xl border border-zinc-200/85 hover:border-emerald-500/40 p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200 uppercase font-mono">
                    {page.badge}
                  </span>

                  {stats.hasDrafts ? (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 border border-amber-500/30 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>{stats.draftCount} Drafts</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Published</span>
                    </span>
                  )}
                </div>

                {/* Title & Slug */}
                <h3 className="text-base font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors flex items-center gap-2">
                  <span>{page.title}</span>
                </h3>
                <p className="text-[11px] font-mono text-zinc-400 mt-0.5 mb-2.5">
                  Route: {page.route}
                </p>

                {/* Description */}
                <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                  {page.description}
                </p>
              </div>

              {/* Bottom Metadata & Action Buttons */}
              <div className="pt-4 border-t border-zinc-100 space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{sectionsCount} Editable {sectionsCount === 1 ? 'Section' : 'Sections'}</span>
                  </div>
                  <Link
                    to={`${page.route}?preview=true`}
                    target="_blank"
                    className="text-xs font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <span>Preview</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  {page.manageLink ? (
                    <>
                      <Link
                        to={page.manageLink}
                        className="py-1.5 px-2 rounded-lg bg-zinc-900 hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <SlidersHorizontal className="w-3 h-3" />
                        <span>Manage Items</span>
                      </Link>

                      <Link
                        to={`/admin/sections?page=${page.slug}`}
                        className="py-1.5 px-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center justify-center gap-1.5 border border-emerald-200 transition-colors"
                      >
                        <Layers className="w-3 h-3" />
                        <span>Edit Banner</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to={`/admin/sections?page=${page.slug}`}
                        className="py-1.5 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center justify-center gap-1.5 border border-emerald-200 transition-colors"
                      >
                        <SlidersHorizontal className="w-3 h-3" />
                        <span>Edit Sections</span>
                      </Link>

                      <Link
                        to={`/admin/website-images?page=${page.title}`}
                        className="py-1.5 px-3 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-xs font-semibold flex items-center justify-center gap-1.5 border border-zinc-200 transition-colors"
                      >
                        <ImageIcon className="w-3 h-3 text-zinc-500" />
                        <span>Images</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
