import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, Phone, Mail, MessageCircle, MapPin, Globe } from 'lucide-react';
import { settingsService } from '../../services/allServices';
import { useSettings } from '../../context/SiteSettingsContext';
import { useToast } from '../../context/ToastContext';
import ImageUploadField from '../../components/admin/ImageUploadField';

export default function AdminSettingsPage() {
  const { settings, refreshSettings } = useSettings();
  const { showToast } = useToast();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    siteName: '',
    logo: '',
    darkLogo: '',
    phone: '',
    email: '',
    whatsapp: '',
    address: '',
    footerText: '',
    copyright: '',
    socialLinks: {
      facebook: '',
      instagram: '',
      youtube: '',
      linkedin: '',
      twitter: ''
    }
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        siteName: settings.siteName || '',
        logo: settings.logo || '',
        darkLogo: settings.darkLogo || '',
        phone: settings.phone || '',
        email: settings.email || '',
        whatsapp: settings.whatsapp || '',
        address: settings.address || '',
        footerText: settings.footerText || '',
        copyright: settings.copyright || '',
        socialLinks: settings.socialLinks || {
          facebook: '',
          instagram: '',
          youtube: '',
          linkedin: '',
          twitter: ''
        }
      });
    }
  }, [settings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await settingsService.update(formData);
      if (res.success) {
        showToast('Website settings saved successfully!', 'success');
        refreshSettings();
      }
    } catch {
      showToast('Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn pb-12">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Website Global Settings</h2>
          <p className="text-xs text-gray-500">Branding logos, direct phone lines, WhatsApp concierge, and office address.</p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-[#10221b] hover:bg-[#1c382e] text-white text-xs font-bold uppercase rounded-xl flex items-center gap-1.5 shadow"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Brand Information */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-[#10221b] border-b pb-2">Branding & Identity</h3>
          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">Site Title</label>
            <input type="text" value={formData.siteName} onChange={(e) => setFormData({ ...formData, siteName: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" />
          </div>
          <ImageUploadField
            label="Main Brand Logo (Header & Footer)"
            value={formData.logo}
            onChange={(url) => setFormData({ ...formData, logo: url })}
            objectFit="contain"
            helperText="Upload transparent PNG or SVG logo for navigation and footer"
          />
          <ImageUploadField
            label="Dark Mode / Inverted Logo"
            value={formData.darkLogo}
            onChange={(url) => setFormData({ ...formData, darkLogo: url })}
            objectFit="contain"
            helperText="White/inverted logo variant for dark backgrounds"
          />
          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">Footer Bio Description</label>
            <textarea rows={3} value={formData.footerText} onChange={(e) => setFormData({ ...formData, footerText: e.target.value })} className="w-full p-2.5 bg-gray-50 border rounded-lg text-sm" />
          </div>
          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">Copyright Line</label>
            <input type="text" value={formData.copyright} onChange={(e) => setFormData({ ...formData, copyright: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" />
          </div>
        </div>

        {/* Contact & Socials */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-[#10221b] border-b pb-2">Direct Contact Lines</h3>
          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">Phone Number (Concierge)</label>
            <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" />
          </div>
          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">WhatsApp Desk Number</label>
            <input type="text" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" />
          </div>
          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">Email Address</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" />
          </div>
          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">Physical Office Address</label>
            <textarea rows={2} value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full p-2.5 bg-gray-50 border rounded-lg text-sm" />
          </div>

          <div className="pt-2 border-t">
            <h4 className="font-bold text-gray-700 uppercase mb-2">Social Channels</h4>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Facebook URL"
                value={formData.socialLinks?.facebook || ''}
                onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, facebook: e.target.value } })}
                className="w-full px-3 py-1.5 bg-gray-50 border rounded-lg text-xs"
              />
              <input
                type="text"
                placeholder="Instagram URL"
                value={formData.socialLinks?.instagram || ''}
                onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, instagram: e.target.value } })}
                className="w-full px-3 py-1.5 bg-gray-50 border rounded-lg text-xs"
              />
              <input
                type="text"
                placeholder="LinkedIn URL"
                value={formData.socialLinks?.linkedin || ''}
                onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, linkedin: e.target.value } })}
                className="w-full px-3 py-1.5 bg-gray-50 border rounded-lg text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
