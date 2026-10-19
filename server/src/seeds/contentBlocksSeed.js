/**
 * Reusable Content Blocks seed data for Black Forest Holidays CMS
 */

const defaultContentBlocks = [
  {
    block_key: 'banner.announcement',
    block_name: 'Top Header Announcement Banner',
    category: 'announcement',
    content: {
      text: 'Plan your 2026 holiday escape with Black Forest Holidays — Personalized travel experiences',
      link_url: '/destinations',
      link_text: 'Explore Now',
      is_active: true
    }
  },
  {
    block_key: 'cta.general_enquiry',
    block_name: 'Global Trip Planner CTA Card',
    category: 'cta',
    content: {
      heading: 'Let us plan your journey, You create the memories.',
      subheading: 'Connect with our luxury travel curators to design your personalized bespoke itinerary.',
      button_text: 'Plan My Trip',
      button_url: '#enquiry',
      phone_number: '+91 90432 02008'
    }
  },
  {
    block_key: 'badge.trust_guarantee',
    block_name: 'Trust & Excellence Guarantee Badge',
    category: 'badges',
    content: {
      title: '100% Curated Experiences',
      subtitle: 'Vetted by Destination Specialists Worldwide',
      rating: '4.9/5',
      reviews_count: '1,200+ Reviews'
    }
  },
  {
    block_key: 'footer.newsletter',
    block_name: 'Footer Newsletter Subscription',
    category: 'footer',
    content: {
      title: 'Curated Travel Inspiration',
      subtitle: 'Subscribe for private destination releases, secret retreats, and seasonal offers.',
      button_text: 'Subscribe',
      privacy_note: 'We respect your privacy. Unsubscribe anytime.'
    }
  }
];

const seedContentBlocks = async () => {
  try {
    const { ContentBlock } = require('../models');
    let created = 0;
    for (const item of defaultContentBlocks) {
      const existing = await ContentBlock.findOne({ where: { block_key: item.block_key } });
      if (!existing) {
        await ContentBlock.create({
          block_key: item.block_key,
          block_name: item.block_name,
          category: item.category,
          content: item.content,
          draft_content: null,
          is_active: true,
          publication_status: 'published',
          updated_by: 'System Seed'
        });
        created += 1;
      }
    }
    console.log(`✅ ContentBlocks seeded/verified successfully (${defaultContentBlocks.length} blocks, ${created} created)`);
  } catch (error) {
    console.error('❌ Failed to seed ContentBlocks:', error.message);
  }
};

module.exports = {
  defaultContentBlocks,
  seedContentBlocks
};
