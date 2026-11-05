import React, { useState, useEffect, useCallback } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Share2,
  Save,
  Send,
  Eye,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { pageSectionService, settingsService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';

export default function AdminFooterPage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastPublished, setLastPublished] = useState(null);

  const [footerForm, setFooterForm] = useState({
    column_1_title: 'Reach Us',
    address_bangalore:
      '737, 3rd Floor, Kheny Plaza CMH Main Road, 2nd Cross Rd, Binnamangala, Indiranagar, Bengaluru, Karnataka 560038',
    column_2_title: 'Head Office',
    address_coimbatore:
      '76, 1st floor, 8th Street, Crosscut Road, Gandhipuram, Coimbatore – 641012',
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

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await pageSectionService.getByKey('global.footer', { preview: 'true' });
      if (res?.success && res.data) {
        let c = res.data.active_content || res.data.content || {};
        if (typeof c === 'string') {
          try {
            c = JSON.parse(c);
          } catch (_) {}
        }
        let social = c.social_links || {};
        if (typeof social === 'string') {
          try {
            social = JSON.parse(social);
          } catch (_) {}
        }

        setFooterForm({
          column_1_title: c.column_1_title || 'Reach Us',
          address_bangalore:
            c.address_bangalore !== undefined
              ? c.address_bangalore
              : '737, 3rd Floor, Kheny Plaza CMH Main Road, 2nd Cross Rd, Binnamangala, Indiranagar, Bengaluru, Karnataka 560038',
          column_2_title: c.column_2_title || 'Head Office',
          address_coimbatore:
            c.address_coimbatore !== undefined
              ? c.address_coimbatore
              : '76, 1st floor, 8th Street, Crosscut Road, Gandhipuram, Coimbatore – 641012',
          phone_numbers:
            c.phone_numbers !== undefined
              ? c.phone_numbers
              : '+91 90432 02008 / +91 90432 02009',
          emails:
            c.emails !== undefined
              ? c.emails
              : 'info@blackforestholidays.com / booking@blackforestholidays.com',
          copyright:
            c.copyright !== undefined
              ? c.copyright
              : '© 2026 Black Forest Holidays Pvt. Ltd. All rights reserved.',
          social_links: {
            facebook: social.facebook || 'https://facebook.com',
            twitter: social.twitter || 'https://twitter.com',
            linkedin: social.linkedin || 'https://linkedin.com',
            instagram: social.instagram || 'https://instagram.com'
          }
        });

        if (res.data.updatedAt) {
          setLastPublished(new Date(res.data.updatedAt).toLocaleTimeString());
        }
      }
      setHasUnsavedChanges(false);
    } catch (err) {
      console.error('Failed to load footer data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateField = (field, value) => {
    setFooterForm((prev) => ({
      ...prev,
      [field]: value
    }));
    setHasUnsavedChanges(true);
  };

  const updateSocial = (network, value) => {
    setFooterForm((prev) => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        [network]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveDraft = async () => {
    try {
      setSaving(true);
      await pageSectionService.saveDraft('global.footer', { content: footerForm });
      showToast('Footer draft saved! Visible in Preview Mode.', 'success');
      setHasUnsavedChanges(false);
    } catch (err) {
      showToast('Failed to save draft', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      setSaving(true);

      // 1. Publish to pageSectionService (MySQL DB + local cache + broadcast event)
      await pageSectionService.publish('global.footer', { content: footerForm });

      // 2. Also update global settings for unified consistency
      try {
        await settingsService.update({
          address: footerForm.address_coimbatore,
          phone: footerForm.phone_numbers,
          email: footerForm.emails,
          copyright: footerForm.copyright,
          socialLinks: footerForm.social_links
        });
      } catch (_) {}

      // 3. Dispatch broadcast event for instantaneous in-memory sync across open tabs
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('bf_content_updated', {
            detail: { key: 'global.footer', action: 'publish', content: footerForm }
          })
        );
      }

      setHasUnsavedChanges(false);
      setLastPublished(new Date().toLocaleTimeString());
      showToast('Footer published live! Synced across all frontend pages.', 'success');
    } catch (err) {
      showToast('Failed to publish footer: ' + (err.message || 'Error'), 'error');
    } finally {
      setSaving(false);
    }
  };

  // Keyboard shortcut: Cmd+S / Ctrl+S to Publish
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handlePublish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePublish]);

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl pb-24">
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
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight flex items-center gap-3">
            <span>Footer Manager</span>
            {hasUnsavedChanges ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Unsaved Changes
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Synced & Live
              </span>
            )}
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage footer branches, addresses, phone hotlines, official emails, social media handles, and legal notice.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            disabled={loading || saving}
            title="Reload from Database"
            className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-600 text-xs font-medium transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleSaveDraft}
            disabled={saving}
            className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>
          <button
            onClick={handlePublish}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{saving ? 'Publishing...' : 'Publish Live'}</span>
          </button>
        </div>
      </div>

      {/* Sync Status Banner */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider font-mono">
              Live Frontend Synchronization
            </h4>
            <p className="text-xs text-emerald-800/90 mt-0.5">
              Click <strong className="font-semibold text-emerald-950">Publish Live</strong> to immediately update the footer across all public pages on blackforestholidays.com.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-emerald-100/50 text-emerald-800 text-xs font-semibold border border-emerald-200 flex items-center gap-1.5 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3 h-3 text-emerald-600" />
          </a>
        </div>
      </div>

      {/* Column 1: Reach Us (Bengaluru) */}
      <div className="bg-white rounded-xl border border-zinc-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-zinc-900">Column 1: Branch Office (Reach Us)</h2>
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">Key: global.footer.col1</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-700 block mb-1">Column Title</label>
            <input
              type="text"
              value={footerForm.column_1_title}
              onChange={(e) => updateField('column_1_title', e.target.value)}
              placeholder="Reach Us"
              className="w-full px-3.5 py-2 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 block mb-1">
              Bengaluru Office Address
            </label>
            <textarea
              rows={3}
              value={footerForm.address_bangalore}
              onChange={(e) => updateField('address_bangalore', e.target.value)}
              placeholder="Enter full Bengaluru branch address..."
              className="w-full px-3.5 py-2 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Column 2: Head Office (Coimbatore) & Contact */}
      <div className="bg-white rounded-xl border border-zinc-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-zinc-900">Column 2: Head Office & Contact Details</h2>
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">Key: global.footer.col2</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-700 block mb-1">Column Title</label>
            <input
              type="text"
              value={footerForm.column_2_title}
              onChange={(e) => updateField('column_2_title', e.target.value)}
              placeholder="Head Office"
              className="w-full px-3.5 py-2 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 block mb-1">
              Head Office Address (Coimbatore)
            </label>
            <textarea
              rows={2}
              value={footerForm.address_coimbatore}
              onChange={(e) => updateField('address_coimbatore', e.target.value)}
              placeholder="Enter full Head Office address..."
              className="w-full px-3.5 py-2 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-700 block mb-1">Phone Numbers</label>
              <input
                type="text"
                value={footerForm.phone_numbers}
                onChange={(e) => updateField('phone_numbers', e.target.value)}
                placeholder="e.g. 9742877700 or +91 90432 02008"
                className="w-full px-3.5 py-2 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-700 block mb-1">Email Addresses</label>
              <input
                type="text"
                value={footerForm.emails}
                onChange={(e) => updateField('emails', e.target.value)}
                placeholder="info@blackforestholidays.com / booking@blackforestholidays.com"
                className="w-full px-3.5 py-2 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Profiles & Copyright */}
      <div className="bg-white rounded-xl border border-zinc-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-zinc-900">Social Profiles & Legal Notice</h2>
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">Key: global.footer.social</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-zinc-700 block mb-1">Facebook URL</label>
            <input
              type="text"
              value={footerForm.social_links?.facebook || ''}
              onChange={(e) => updateSocial('facebook', e.target.value)}
              placeholder="https://facebook.com/..."
              className="w-full px-3.5 py-2 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 block mb-1">Instagram URL</label>
            <input
              type="text"
              value={footerForm.social_links?.instagram || ''}
              onChange={(e) => updateSocial('instagram', e.target.value)}
              placeholder="https://instagram.com/..."
              className="w-full px-3.5 py-2 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 block mb-1">LinkedIn URL</label>
            <input
              type="text"
              value={footerForm.social_links?.linkedin || ''}
              onChange={(e) => updateSocial('linkedin', e.target.value)}
              placeholder="https://linkedin.com/..."
              className="w-full px-3.5 py-2 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 block mb-1">Twitter / X URL</label>
            <input
              type="text"
              value={footerForm.social_links?.twitter || ''}
              onChange={(e) => updateSocial('twitter', e.target.value)}
              placeholder="https://twitter.com/..."
              className="w-full px-3.5 py-2 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-zinc-700 block mb-1">
              Footer Copyright Notice
            </label>
            <input
              type="text"
              value={footerForm.copyright}
              onChange={(e) => updateField('copyright', e.target.value)}
              placeholder="© 2026 Black Forest Holidays Pvt. Ltd. All rights reserved."
              className="w-full px-3.5 py-2 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Action button row at bottom of card */}
        <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-zinc-400">
            {lastPublished ? (
              <span>Last published at <strong className="text-zinc-600">{lastPublished}</strong></span>
            ) : (
              <span>Press <kbd className="px-1.5 py-0.5 bg-zinc-100 border border-zinc-200 rounded text-[11px] font-mono">Ctrl+S</kbd> or <kbd className="px-1.5 py-0.5 bg-zinc-100 border border-zinc-200 rounded text-[11px] font-mono">⌘+S</kbd> to publish anytime</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveDraft}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Draft</span>
            </button>
            <button
              onClick={handlePublish}
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{saving ? 'Publishing...' : 'Publish Live to Website'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Sticky Bottom Bar for Instant Visibility */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 px-4 sm:px-8 py-3.5 shadow-lg flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          {hasUnsavedChanges ? (
            <span className="flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Unsaved changes (Click 'Publish Live' to sync to website)</span>
            </span>
          ) : (
            <span className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>All footer changes are live on frontend</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSaveDraft}
            disabled={saving}
            className="px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save Draft</span>
          </button>
          <button
            onClick={handlePublish}
            disabled={saving}
            className={`px-5 py-2 rounded-lg text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
              hasUnsavedChanges
                ? 'bg-emerald-600 hover:bg-emerald-700 ring-2 ring-emerald-500/40 animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{saving ? 'Publishing...' : 'Publish Live to Website'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
