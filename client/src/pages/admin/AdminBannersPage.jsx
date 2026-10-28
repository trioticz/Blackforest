import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Film,
  SlidersHorizontal,
  Image as ImageIcon,
  Save,
  Send,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { pageSectionService, contentBlockService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';
import ImageUploadField from '../../components/admin/ImageUploadField';

export default function AdminBannersPage() {
  const { showToast } = useToast();
  const [heroSection, setHeroSection] = useState(null);
  const [announcementBlock, setAnnouncementBlock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [heroForm, setHeroForm] = useState({
    headline: '',
    subheadline: '',
    description: '',
    primary_button_label: '',
    primary_button_url: '',
    secondary_button_label: '',
    secondary_button_url: '',
    video_url: '',
    desktop_poster: '',
    mobile_poster: '',
    fallback_poster: '',
    show_sound_toggle: true
  });

  const [announcementForm, setAnnouncementForm] = useState({
    text: '',
    link_url: '',
    link_text: '',
    is_active: true
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [secRes, blkRes] = await Promise.allSettled([
        pageSectionService.getByKey('home.hero', { preview: 'true' }),
        contentBlockService.getByKey('banner.announcement', { preview: 'true' })
      ]);

      if (secRes.status === 'fulfilled' && secRes.value?.success && secRes.value?.data) {
        const sec = secRes.value.data;
        setHeroSection(sec);
        const c = sec.active_content || sec.content || {};
        setHeroForm({
          headline: c.headline || '',
          subheadline: c.subheadline || '',
          description: c.description || '',
          primary_button_label: c.primary_button_label || '',
          primary_button_url: c.primary_button_url || '',
          secondary_button_label: c.secondary_button_label || '',
          secondary_button_url: c.secondary_button_url || '',
          video_url: c.video_url || '',
          desktop_poster: c.desktop_poster || '',
          mobile_poster: c.mobile_poster || '',
          fallback_poster: c.fallback_poster || '',
          show_sound_toggle: c.show_sound_toggle !== false
        });
      }

      if (blkRes.status === 'fulfilled' && blkRes.value?.success && blkRes.value?.data) {
        const blk = blkRes.value.data;
        setAnnouncementBlock(blk);
        const c = blk.active_content || blk.content || {};
        setAnnouncementForm({
          text: c.text || '',
          link_url: c.link_url || '',
          link_text: c.link_text || '',
          is_active: c.is_active !== false
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

  const handleSaveHeroDraft = async () => {
    try {
      setSaving(true);
      await pageSectionService.saveDraft('home.hero', { content: heroForm });
      showToast('Hero banner draft saved! Check Live Preview.', 'success');
      fetchData();
    } catch (err) {
      showToast('Failed to save draft', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handlePublishHero = async () => {
    try {
      setSaving(true);
      await pageSectionService.publish('home.hero', { content: heroForm });
      showToast('Hero banner published live to website!', 'success');
      fetchData();
    } catch (err) {
      showToast('Failed to publish', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAnnouncementDraft = async () => {
    try {
      setSaving(true);
      await contentBlockService.saveDraft('banner.announcement', { content: announcementForm });
      showToast('Announcement banner draft saved!', 'success');
      fetchData();
    } catch (err) {
      showToast('Failed to save draft', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handlePublishAnnouncement = async () => {
    try {
      setSaving(true);
      await contentBlockService.publish('banner.announcement', { content: announcementForm });
      showToast('Announcement banner published live!', 'success');
      fetchData();
    } catch (err) {
      showToast('Failed to publish', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold tracking-widest text-emerald-600 uppercase font-mono">
              Website CMS
            </span>
            <span className="text-zinc-300">•</span>
            <span className="text-xs font-medium text-zinc-500">Visual Banners</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
            Banners & Sliders Manager
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Configure homepage hero video banner, desktop/mobile posters, and top announcement bars.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/?preview=true"
            target="_blank"
            className="px-3.5 py-2 bg-zinc-900 hover:bg-black text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Preview</span>
          </Link>
        </div>
      </div>

      {/* 1. Announcement Bar Card */}
      <div className="bg-white rounded-xl border border-zinc-200/80 p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900">Top Header Announcement Bar</h2>
              <p className="text-xs text-zinc-500">Appears at the very top of all public pages</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-zinc-600">Active</label>
            <input
              type="checkbox"
              checked={announcementForm.is_active}
              onChange={(e) =>
                setAnnouncementForm({ ...announcementForm, is_active: e.target.checked })
              }
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-700">Announcement Message</label>
            <input
              type="text"
              value={announcementForm.text}
              onChange={(e) => setAnnouncementForm({ ...announcementForm, text: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-700">Call to Action Link Text</label>
              <input
                type="text"
                value={announcementForm.link_text}
                onChange={(e) =>
                  setAnnouncementForm({ ...announcementForm, link_text: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-700">Destination URL</label>
              <input
                type="text"
                value={announcementForm.link_url}
                onChange={(e) =>
                  setAnnouncementForm({ ...announcementForm, link_url: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
          <button
            onClick={handleSaveAnnouncementDraft}
            disabled={saving}
            className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Save Draft
          </button>
          <button
            onClick={handlePublishAnnouncement}
            disabled={saving}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Publish Live
          </button>
        </div>
      </div>

      {/* 2. Homepage Hero Banner Card */}
      <div className="bg-white rounded-xl border border-zinc-200/80 p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-800 flex items-center justify-center">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900">Homepage Hero Video Banner</h2>
              <p className="text-xs text-zinc-500">Video background with responsive mobile and desktop WebP poster layers</p>
            </div>
          </div>

          <Link
            to="/admin/website-images"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>Replace Posters in Image Manager</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-zinc-700">Main Headline</label>
            <input
              type="text"
              value={heroForm.headline}
              onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700">Subheadline / Tagline</label>
            <input
              type="text"
              value={heroForm.subheadline}
              onChange={(e) => setHeroForm({ ...heroForm, subheadline: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-zinc-700">Description</label>
            <textarea
              rows={2}
              value={heroForm.description}
              onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700">Primary Button Label</label>
            <input
              type="text"
              value={heroForm.primary_button_label}
              onChange={(e) => setHeroForm({ ...heroForm, primary_button_label: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700">Primary Button URL</label>
            <input
              type="text"
              value={heroForm.primary_button_url}
              onChange={(e) => setHeroForm({ ...heroForm, primary_button_url: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700">Secondary Button Label</label>
            <input
              type="text"
              value={heroForm.secondary_button_label}
              onChange={(e) => setHeroForm({ ...heroForm, secondary_button_label: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700">Secondary Button URL</label>
            <input
              type="text"
              value={heroForm.secondary_button_url}
              onChange={(e) => setHeroForm({ ...heroForm, secondary_button_url: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>

          <div className="sm:col-span-2 pt-2 border-t border-zinc-100">
            <ImageUploadField
              label="Hero Background Video"
              value={heroForm.video_url}
              onChange={(url) => setHeroForm({ ...heroForm, video_url: url })}
              mediaType="video"
              helperText="Upload background video (MP4, WEBM, MOV up to 100MB) or enter URL"
            />
          </div>

          <div className="sm:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <ImageUploadField
              label="Desktop Poster Image"
              value={heroForm.desktop_poster}
              onChange={(url) => setHeroForm({ ...heroForm, desktop_poster: url })}
              compact
              helperText="Desktop fallback poster"
            />
            <ImageUploadField
              label="Mobile Poster Image"
              value={heroForm.mobile_poster}
              onChange={(url) => setHeroForm({ ...heroForm, mobile_poster: url })}
              compact
              helperText="Mobile fallback poster"
            />
            <ImageUploadField
              label="Fallback Poster Image"
              value={heroForm.fallback_poster}
              onChange={(url) => setHeroForm({ ...heroForm, fallback_poster: url })}
              compact
              helperText="Standard fallback image"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
          <button
            onClick={handleSaveHeroDraft}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Save as Draft
          </button>
          <button
            onClick={handlePublishHero}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Publish Live
          </button>
        </div>
      </div>
    </div>
  );
}
