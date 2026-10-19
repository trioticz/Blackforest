import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Share2,
  Save,
  Send,
  Eye,
  CheckCircle2,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { pageSectionService, settingsService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';

export default function AdminFooterPage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [footerForm, setFooterForm] = useState({
    column_1_title: 'Reach Us',
    address_bangalore: '737, 3rd Floor, Kheny Plaza CMH Main Road, 2nd Cross Rd, Binnamangala, Indiranagar, Bengaluru, Karnataka 560038',
    column_2_title: 'Head Office',
    address_coimbatore: '76, 1st floor, 8th Street, Crosscut Road, Gandhipuram, Coimbatore – 641012',
    phone_numbers: '+91 90432 02008 / +91 90432 02009',
    emails: 'info@blackforestholidays.com / booking@blackforestholidays.com',
    copyright: '© 2026 Black Forest Holidays Pvt. Ltd. All rights reserved.',
    social_links: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await pageSectionService.getByKey('global.footer', { preview: 'true' });
      if (res?.success && res.data) {
        const c = res.data.active_content || res.data.content || {};
        setFooterForm({
          column_1_title: c.column_1_title || 'Reach Us',
          address_bangalore: c.address_bangalore || '',
          column_2_title: c.column_2_title || 'Head Office',
          address_coimbatore: c.address_coimbatore || '',
          phone_numbers: c.phone_numbers || '',
          emails: c.emails || '',
          copyright: c.copyright || '',
          social_links: c.social_links || {
            facebook: 'https://facebook.com',
            twitter: 'https://twitter.com',
            linkedin: 'https://linkedin.com',
            instagram: 'https://instagram.com'
          }
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveDraft = async () => {
    try {
      setSaving(true);
      await pageSectionService.saveDraft('global.footer', { content: footerForm });
      showToast('Footer draft saved! Preview mode updated.', 'success');
      fetchData();
    } catch (err) {
      showToast('Failed to save draft', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      setSaving(true);
      await pageSectionService.publish('global.footer', { content: footerForm });
      // Also update site settings for global consistency
      try {
        await settingsService.update({
          address: footerForm.address_coimbatore,
          phone: footerForm.phone_numbers,
          email: footerForm.emails,
          copyright: footerForm.copyright,
          socialLinks: footerForm.social_links
        });
      } catch (_) {}
      showToast('Footer content published live to website!', 'success');
      fetchData();
    } catch (err) {
      showToast('Failed to publish', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold tracking-widest text-emerald-600 uppercase font-mono">
              Website CMS
            </span>
            <span className="text-zinc-300">•</span>
            <span className="text-xs font-medium text-zinc-500">Footer Manager</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
            Footer Manager
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage footer branches, addresses, phone hotlines, official emails, social media handles, and copyright notice.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveDraft}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>
          <button
            onClick={handlePublish}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Live</span>
          </button>
        </div>
      </div>

      {/* Column 1: Reach Us (Bengaluru) */}
      <div className="bg-white rounded-xl border border-zinc-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm font-bold text-zinc-900">Column 1: Branch Office (Reach Us)</h2>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-zinc-700">Column Title</label>
            <input
              type="text"
              value={footerForm.column_1_title}
              onChange={(e) => setFooterForm({ ...footerForm, column_1_title: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700">Bengaluru Office Address</label>
            <textarea
              rows={3}
              value={footerForm.address_bangalore}
              onChange={(e) => setFooterForm({ ...footerForm, address_bangalore: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Column 2: Head Office (Coimbatore) & Contact */}
      <div className="bg-white rounded-xl border border-zinc-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
          <Phone className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm font-bold text-zinc-900">Column 2: Head Office & Contact Details</h2>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-zinc-700">Column Title</label>
            <input
              type="text"
              value={footerForm.column_2_title}
              onChange={(e) => setFooterForm({ ...footerForm, column_2_title: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700">Head Office Address (Coimbatore)</label>
            <textarea
              rows={2}
              value={footerForm.address_coimbatore}
              onChange={(e) => setFooterForm({ ...footerForm, address_coimbatore: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-700">Phone Numbers</label>
              <input
                type="text"
                value={footerForm.phone_numbers}
                onChange={(e) => setFooterForm({ ...footerForm, phone_numbers: e.target.value })}
                className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-700">Email Addresses</label>
              <input
                type="text"
                value={footerForm.emails}
                onChange={(e) => setFooterForm({ ...footerForm, emails: e.target.value })}
                className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Profiles & Copyright */}
      <div className="bg-white rounded-xl border border-zinc-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
          <Share2 className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm font-bold text-zinc-900">Social Profiles & Legal Notice</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-zinc-700">Facebook URL</label>
            <input
              type="text"
              value={footerForm.social_links?.facebook || ''}
              onChange={(e) =>
                setFooterForm({
                  ...footerForm,
                  social_links: { ...footerForm.social_links, facebook: e.target.value }
                })
              }
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700">Instagram URL</label>
            <input
              type="text"
              value={footerForm.social_links?.instagram || ''}
              onChange={(e) =>
                setFooterForm({
                  ...footerForm,
                  social_links: { ...footerForm.social_links, instagram: e.target.value }
                })
              }
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700">LinkedIn URL</label>
            <input
              type="text"
              value={footerForm.social_links?.linkedin || ''}
              onChange={(e) =>
                setFooterForm({
                  ...footerForm,
                  social_links: { ...footerForm.social_links, linkedin: e.target.value }
                })
              }
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700">Twitter / X URL</label>
            <input
              type="text"
              value={footerForm.social_links?.twitter || ''}
              onChange={(e) =>
                setFooterForm({
                  ...footerForm,
                  social_links: { ...footerForm.social_links, twitter: e.target.value }
                })
              }
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-zinc-700">Footer Copyright Notice</label>
            <input
              type="text"
              value={footerForm.copyright}
              onChange={(e) => setFooterForm({ ...footerForm, copyright: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
