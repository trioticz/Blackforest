const STORAGE_KEY = 'bf_blogs_v2';
export const BLOGS_EVENT = 'bf_blogs_updated';

export const initialBlogs = [
  {
    id: 1,
    title: 'Safety measures for safe trekking in waterfalls',
    slug: 'safety-measures-for-safe-trekking-in-waterfalls',
    category: 'Travel tips',
    author: 'Blackforest',
    authorAvatar: '/assets/images/cropped-cropped-Logo-02-1-1-180x180.png',
    date: 'July 10, 2021',
    coverImage: '/assets/images/blog-010.jpg',
    detailImage1: '/assets/images/blog-detail-001.jpg',
    detailImage2: '/assets/images/blog-detail-002.jpg',
    excerpt: 'Est culpa architecto cum perferendis quasi in nihil aliquam ut temporibus porro. In repellendus similique sit ipsum recusandae At velit doloribus et temporibus dolorem.',
    content: `Waterfalls are some of the most captivating natural wonders on Earth, drawing millions of adventurers, hikers, and landscape photographers each year. The thunderous roar of plunging cascades, the cool mist floating through verdant canyons, and the thrill of climbing rocky trails make waterfall trekking an incomparable outdoor pursuit. However, the unique convergence of wet stone, sudden depth changes, and powerful water currents demands rigorous safety discipline.

Before you embark on your trail, always verify local weather forecasts and ranger advisories. Mountain watersheds can experience flash floods triggered by rainstorms miles upstream, causing riverbeds to surge violently without immediate warning. Wear dedicated trail shoes with aggressive Vibram or rubberized treads that grip slick river boulders, and avoid stepping on dark green algae-covered rocks which are as slippery as black ice.

Always keep a minimum safe distance of 15 to 20 feet from the slippery precipice of the waterfall crest. When crossing riverbeds or stream tributaries, unbuckle the hip belt and chest strap of your backpack; in the rare event of slipping into deep rapids, this allows you to jettison heavy gear instantly instead of being weighed down. Carry a compact waterproof dry bag for communication devices, dry warmth layers, and a whistle to signal trail companions across roaring waterfalls.`,
    quote: 'Vel saepe possimus sit corporis ipsa et quia fugit vel magnam iure rem voluptate voluptas ut earum tempora.',
    quoteAuthor: 'Barry Hilligan, Co Founder of Houzy',
    tags: ['Trekking', 'Waterfalls', 'Safety', 'Adventure', 'Travel Tips'],
    commentsCount: 1,
    comments: [
      {
        id: 1,
        author: 'adventor',
        date: 'July 21, 2021 at 3:11 pm',
        text: 'Sit amet consectetur adipiscing elit pellentesque habitant morbi. Vulputate mi sit amet mauris commodo quis imperdiet. Dui vivamus arcu felis bibendum ut.'
      }
    ],
    status: 'published'
  },
  {
    id: 2,
    title: '10 Tips for best winter hiking experience',
    slug: '10-tips-for-best-winter-hiking-experience',
    category: 'Travel tips',
    author: 'Blackforest Alpine Specialist',
    authorAvatar: '/assets/images/cropped-cropped-Logo-02-1-1-180x180.png',
    date: 'July 9, 2021',
    coverImage: '/assets/images/blog-007.jpg',
    detailImage1: '/assets/images/blog-detail-001.jpg',
    detailImage2: '/assets/images/blog-detail-002.jpg',
    excerpt: 'Essential insulation layering, snow avalanche awareness, and hydration strategies for unforgettable winter alpine trails.',
    content: `Winter hiking transforms familiar trails into breathtaking snowscapes of silent beauty and crystalline wonder. However, sub-zero temperatures, early sunsets, and frozen terrain require thoughtful preparation and specialized techniques.

Master the three-layer clothing system: a moisture-wicking synthetic or merino wool base layer to keep sweat off your skin, an insulating fleece or down mid-layer for warmth, and a windproof waterproof outer shell. Never wear cotton, as it absorbs moisture and accelerates hypothermia. Pack microspikes or crampons for icy slopes, trekking poles with snow baskets, and an insulated thermos filled with hot herbal tea to stay hydrated throughout your ascent.`,
    quote: 'In the depth of winter, I finally learned that within me there lay an invincible summer.',
    quoteAuthor: 'Albert Camus',
    tags: ['Winter Hiking', 'Snow', 'Mountains', 'Alpine', 'Travel Tips'],
    commentsCount: 0,
    comments: [],
    status: 'published'
  },
  {
    id: 3,
    title: 'How to select perfect quality camping tent',
    slug: 'how-to-select-perfect-quality-camping-tent',
    category: 'Travel tips',
    author: 'Outdoor Expedition Lead',
    authorAvatar: '/assets/images/cropped-cropped-Logo-02-1-1-180x180.png',
    date: 'July 8, 2021',
    coverImage: '/assets/images/blog-006.jpg',
    detailImage1: '/assets/images/blog-detail-001.jpg',
    detailImage2: '/assets/images/blog-detail-006.jpg',
    excerpt: 'Selecting the right tent weight, hydrostatic head ratings, aerodynamic geometry, and vestibule storage for extreme weather.',
    content: `A reliable camping tent is your sanctuary against howling alpine gales, relentless downpours, and freezing mountain nights. When evaluating shelters, your choice comes down to balancing liveable interior space against pack weight and storm resilience.

For three-season backpacking, prioritize double-wall dome or semi-geodesic designs with a ripstop nylon or silicone-treated fly boasting a minimum 3,000mm hydrostatic head rating. Check for aluminum alloy poles rather than brittle fiberglass, fully seam-taped bathtub floors, and ample dual vestibules to stow wet boots and packs outside your sleeping compartment.`,
    quote: 'A tent beneath alpine stars is worth more than a thousand luxury rooms.',
    quoteAuthor: 'John Muir',
    tags: ['Camping', 'Tents', 'Backpacking', 'Gear', 'Travel Tips'],
    commentsCount: 0,
    comments: [],
    status: 'published'
  },
  {
    id: 4,
    title: 'Top 10 must-see spots for nature lovers',
    slug: 'top-10-must-see-spots',
    category: 'Trekking',
    author: 'Blackforest Specialist',
    authorAvatar: '/assets/images/cropped-cropped-Logo-02-1-1-180x180.png',
    date: 'August 15, 2024',
    coverImage: '/assets/images/blog-waterfall-trekking.jpg',
    detailImage1: '/assets/images/blog-detail-001.jpg',
    detailImage2: '/assets/images/blog-detail-002.jpg',
    excerpt: 'From misty alpine peaks in the Swiss Alps to untamed African wildlife reserves and pristine tropical fjords, explore our premier nature trails.',
    content: `For travelers seeking tranquility and raw natural grandeur, few experiences rival venturing into the world's most pristine wilderness landscapes. Whether you are trekking along secluded mountain ridges or discovering hidden valleys, these destinations offer unmatched biodiversity and awe-inspiring vistas.

Our top curated spots encompass the serene glacial lakes of the Bernese Oberland, the sun-drenched savannahs of the Serengeti, and the ancient rainforests of New Zealand. Each destination features carefully maintained trail networks, sustainable eco-lodges, and knowledgeable local guides who ensure your trek leaves no trace while enriching your soul.`,
    quote: 'In every walk with nature one receives far more than he seeks.',
    quoteAuthor: 'John Muir, Naturalist',
    tags: ['Trekking', 'Nature', 'Wilderness', 'Mountains'],
    commentsCount: 0,
    comments: [],
    status: 'published'
  },
  {
    id: 5,
    title: 'Unforgettable cultural experiences in Kyoto',
    slug: 'kyoto-culture',
    category: 'Culture',
    author: 'Kyoto Cultural Concierge',
    authorAvatar: '/assets/images/cropped-cropped-Logo-02-1-1-180x180.png',
    date: 'September 2, 2024',
    coverImage: '/assets/images/himeji-castle-with-beautiful-cherry-blossom-spring-season-hyogo-near-osaka-japan-scaled.jpg',
    detailImage1: '/assets/images/blog-detail-001.jpg',
    detailImage2: '/assets/images/blog-detail-004.jpg',
    excerpt: 'Wander through thousand-year-old cedar shrines, savor authentic Kaiseki dining, and experience Zen tranquility in historic Japanese gardens.',
    content: `Kyoto stands as the eternal cultural heart of Japan, preserving centuries of artistic mastery, spiritual devotion, and architectural wonder. Walking the narrow lantern-lit stone alleys of Gion in the twilight hours reveals glimpses of geiko and maiko gracefully traversing between wooden machiya tea houses.

A curated visit to Kyoto is incomplete without participating in a private Chado (tea ceremony) overseen by a master practitioner in a secluded garden pavilion. From the serene raked gravel of Ryoan-ji to the thousands of vermilion torii gates winding up the wooded sacred slopes of Fushimi Inari, Kyoto provides a profound respite from the bustling modern world.`,
    quote: 'To understand Japan, one must first feel the stillness of Kyoto in the dawn mist.',
    quoteAuthor: 'Kenji Takahashi, Kyoto Artisan',
    tags: ['Culture', 'Kyoto', 'Japan', 'Heritage'],
    commentsCount: 0,
    comments: [],
    status: 'published'
  }
];

export function getStoredBlogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBlogs));
      return initialBlogs;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Ensure the waterfall article always exists
      const hasWaterfall = parsed.some(b => b.slug === 'safety-measures-for-safe-trekking-in-waterfalls');
      if (!hasWaterfall) {
        const merged = [initialBlogs[0], ...parsed];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        return merged;
      }
      return parsed;
    }
  } catch (err) {
    console.error('Error reading blogs from storage', err);
  }
  return initialBlogs;
}

export function saveStoredBlogs(blogs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    window.dispatchEvent(new Event(BLOGS_EVENT));
  } catch (err) {
    console.error('Error saving blogs to storage', err);
  }
}

export function getPublishedBlogs() {
  const list = getStoredBlogs();
  return list.filter(b => b.status === 'published');
}

export function getBlogBySlug(slug) {
  const clean = (slug || '').toLowerCase().replace(/^\//, '').replace(/\/$/, '');
  const list = getStoredBlogs();
  return list.find(b => b.slug === clean) || null;
}

export function createBlog(data) {
  const list = getStoredBlogs();
  const slug = (data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
  const newBlog = {
    id: Date.now(),
    title: data.title,
    slug,
    category: data.category || 'Travel Guides',
    author: data.author || 'Blackforest',
    authorAvatar: data.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    date: data.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    coverImage: data.coverImage || '/assets/images/blog-010.jpg',
    detailImage1: data.detailImage1 || '',
    detailImage2: data.detailImage2 || '',
    excerpt: data.excerpt || '',
    content: data.content || '',
    quote: data.quote || '',
    quoteAuthor: data.quoteAuthor || '',
    tags: Array.isArray(data.tags) ? data.tags : (data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : []),
    commentsCount: 0,
    comments: [],
    status: data.status || 'published'
  };

  const updated = [newBlog, ...list];
  saveStoredBlogs(updated);
  return newBlog;
}

export function updateBlog(id, data) {
  const list = getStoredBlogs();
  const updated = list.map(b => {
    if (b.id === id || String(b.id) === String(id)) {
      return {
        ...b,
        ...data,
        tags: Array.isArray(data.tags) ? data.tags : (data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : b.tags)
      };
    }
    return b;
  });
  saveStoredBlogs(updated);
  return updated.find(b => b.id === id || String(b.id) === String(id));
}

export function deleteBlog(id) {
  const list = getStoredBlogs();
  const updated = list.filter(b => b.id !== id && String(b.id) !== String(id));
  saveStoredBlogs(updated);
  return true;
}

export function toggleBlogPublish(id) {
  const list = getStoredBlogs();
  const updated = list.map(b => {
    if (b.id === id || String(b.id) === String(id)) {
      const nextStatus = b.status === 'published' ? 'draft' : 'published';
      return { ...b, status: nextStatus };
    }
    return b;
  });
  saveStoredBlogs(updated);
  return updated.find(b => b.id === id || String(b.id) === String(id));
}
