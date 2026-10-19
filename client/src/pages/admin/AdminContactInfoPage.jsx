import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Save,
  Send,
  Building,
  CheckCircle2
} from 'lucide-react';
import { pageSectionService, settingsService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';

export default function AdminContactInfoPage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    headline: "Let's Plan Your Next Journey",
    subheadline: 'Get in touch with our travel advisors to start designing your bespoke itinerary',
    office_hours: 'Monday – Saturday: 9:30 AM – 7:00 PM (IST)',
    bengaluru_title: 'Bengaluru Office',
    bengaluru_address: '737, 3rd Floor, Kheny Plaza CMH Main Road, 2nd Cross Rd, Indiranagar, Bengaluru 560038',
    bengaluru_phone: '+91 90432 02008',
    bengaluru_email: 'info@blackforestholidays.com',
    coimbatore_title: 'Coimbatore Head Office',
    coimbatore_address: '76, 1st Floor, 8th Street, Crosscut Road, Gandhipuram, Coimbatore 641012',
    coimbatore_phone: '+91 90432 02009',
    coimbatore_email: 'booking@blackforestholidays.com',
    whatsapp: '+91 90432 02008'
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [heroRes, officesRes, settingsRes] = await Promise.allSettled([
        pageSectionService.getByKey('contact.hero', { preview: 'true' }),
        pageSectionService.getByKey('contact.offices', { preview: 'true' }),
        settingsService.get()
      ]);

      let nextForm = { ...form };

      if (heroRes.status === 'fulfilled' && heroRes.value?.data) {
        const c = heroRes.value.data.active_content || heroRes.value.data.content || {};
        nextForm.headline = c.headline || nextForm.headline;
        nextForm.subheadline = c.subheadline || nextForm.subheadline;
        nextForm.office_hours = c.office_hours || nextForm.office_hours;
      }

      if (officesRes.status === 'fulfilled' && officesRes.value?.data) {
        const c = officesRes.value.data.active_content || officesRes.value.data.content || {};
        nextForm.bengaluru_title = c.bengaluru_title || nextForm.bengaluru_title;
        nextForm.bengaluru_address = c.bengaluru_address || nextForm.bengaluru_address;
        nextForm.bengaluru_phone = c.bengaluru_phone || nextForm.bengaluru_phone;
        nextForm.bengaluru_email = c.bengaluru_email || nextForm.bengaluru_email;
        nextForm.coimbatore_title = c.coimbatore_title || nextForm.coimbatore_title;
        nextForm.coimbatore_address = c.coimbatore_address || nextForm.coimbatore_address;
        nextForm.coimbatore_phone = c.coimbatore_phone || nextForm.coimbatore_phone;
        nextForm.coimbatore_email = c.coimbatore_email || nextForm.coimbatore_email;
      }

      if (settingsRes.status === 'fulfilled' && settingsRes.value?.data) {
        const s = settingsRes.value.data;
        if (s.whatsapp) nextForm.whatsapp = s.whatsapp;
      }

      setForm(nextForm);
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
      await Promise.allSettled([
        pageSectionService.saveDraft('contact.hero', {
          content: {
            headline: form.headline,
            subheadline: form.subheadline,
            office_hours: form.office_hours
          }
        }),
        pageSectionService.saveDraft('contact.offices', {
          content: {
            bengaluru_title: form.bengaluru_title,
            bengaluru_address: form.bengaluru_address,
            bengaluru_phone: form.bengaluru_phone,
            bengaluru_email: form.bengaluru_email,
            coimbatore_title: form.coimbatore_title,
            coimbatore_address: form.coimbatore_address,
            coimbatore_phone: form.coimbatore_phone,
            coimbatore_email: form.coimbatore_email
          }
        })
      ]);
      showToast('Contact info drafts saved!', 'success');
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
      await Promise.allSettled([
        pageSectionService.publish('contact.hero', {
          content: {
            headline: form.headline,
            subheadline: form.subheadline,
            office_hours: form.office_hours
          }
        }),
        pageSectionService.publish('contact.offices', {
          content: {
            bengaluru_title: form.bengaluru_title,
            bengaluru_address: form.bengaluru_address,
            bengaluru_phone: form.bengaluru_phone,
            bengaluru_email: form.bengaluru_email,
            coimbatore_title: form.coimbatore_title,
            coimbatore_address: form.coimbatore_address,
            coimbatore_phone: form.coimbatore_phone,
            coimbatore_email: form.coimbatore_email
          }
        }),
        settingsService.update({
          phone: form.bengaluru_phone,
          whatsapp: form.whatsapp,
          email: form.bengaluru_email,
          address: form.coimbatore_address
        })
      ]);
      showToast('Contact information published live!', 'success');
      fetchData();
    } catch (err) {
      showToast('Failed to publish', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold tracking-widest text-emerald-600 uppercase font-mono">
              Website CMS
            </span>
            <span className="text-zinc-300">•</span>
            <span className="text-xs font-medium text-zinc-500">Contact & Locations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
            Contact Information & Branches
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage telephone lines, WhatsApp number, official email addresses, office locations, and working hours.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveDraft}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold cursor-pointer"
          >
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
          >
            Publish Live
          </button>
        </div>
      </div>

      {/* Main Info */}
      <div className="bg-white rounded-xl border border-zinc-200/80 p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-zinc-900 border-b border-zinc-100 pb-2">
          General Contact & Working Hours
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-zinc-700">Contact Page Main Heading</label>
            <input
              type="text"
              value={form.headline}
              onChange={(e) => setForm({ ...form, headline: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700">Official WhatsApp Number</label>
            <input
              type="text"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-zinc-700">Business Operating Hours</label>
            <input
              type="text"
              value={form.office_hours}
              onChange={(e) => setForm({ ...form, office_hours: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Branch 1: Bengaluru */}
      <div className="bg-white rounded-xl border border-zinc-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
          <Building className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm font-bold text-zinc-900">Branch Office 1: Bengaluru</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-zinc-700">Branch Title</label>
            <input
              type="text"
              value={form.bengaluru_title}
              onChange={(e) => setForm({ ...form, bengaluru_title: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-zinc-700">Phone</label>
            <input
              type="text"
              value={form.bengaluru_phone}
              onChange={(e) => setForm({ ...form, bengaluru_phone: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-zinc-700">Email</label>
            <input
              type="text"
              value={form.bengaluru_email}
              onChange={(e) => setForm({ ...form, bengaluru_email: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-zinc-700">Full Address</label>
            <textarea
              rows={2}
              value={form.bengaluru_address}
              onChange={(e) => setForm({ ...form, bengaluru_address: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Branch 2: Coimbatore */}
      <div className="bg-white rounded-xl border border-zinc-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
          <Building className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm font-bold text-zinc-900">Head Office 2: Coimbatore</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-zinc-700">Branch Title</label>
            <input
              type="text"
              value={form.coimbatore_title}
              onChange={(e) => setForm({ ...form, coimbatore_title: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-zinc-700">Phone</label>
            <input
              type="text"
              value={form.coimbatore_phone}
              onChange={(e) => setForm({ ...form, coimbatore_phone: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-zinc-700">Email</label>
            <input
              type="text"
              value={form.coimbatore_email}
              onChange={(e) => setForm({ ...form, coimbatore_email: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-zinc-700">Full Address</label>
            <textarea
              rows={2}
              value={form.coimbatore_address}
              onChange={(e) => setForm({ ...form, coimbatore_address: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
