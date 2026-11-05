import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { settingsService, navigationService } from '../services/allServices';

const SiteSettingsContext = createContext(null);

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    siteName: 'Black Forest Holidays',
    logo: '/assets/images/white_logo.png',
    darkLogo: '/assets/images/white_logo.png',
    phone: '+91 94470 12345',
    email: 'info@blackforestholidays.com',
    whatsapp: '+919447012345',
    address: 'Black Forest Holidays, Premium Travel Lounge, Cochin, Kerala, India',
    socialLinks: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    },
    footerText: 'Blackforest Holidays is your trusted partner in creating unforgettable travel experiences. We believe that every journey should be more than just a trip—it should be a collection of wonderful memories.',
    copyright: '© 2026 Black Forest Holidays. All Rights Reserved.',
    defaultSeoTitle: 'Black Forest Holidays – Luxury Travel & Customized Holidays',
    defaultSeoDescription: 'Discover unforgettable travel experiences with customized holiday packages, honeymoon tours, family vacations, and international travel.'
  });

  const [navigation, setNavigation] = useState([]);
  const [loading, setLoading] = useState(true);

  // Global Enquiry Modal State
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryPrefill, setEnquiryPrefill] = useState({});

  // Global Search Modal State
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const fetchSettingsAndNav = useCallback(async () => {
    try {
      const res = await settingsService.get();
      if (res?.data) {
        setSettings((prev) => ({
          ...prev,
          ...res.data,
          socialLinks: res.data.socialLinks || prev.socialLinks
        }));
      }
    } catch (_) {}

    try {
      const dummyNav = [
        { id: 1, title: 'Destinations', path: '/destinations', hasDropdown: true },
        { id: 2, title: 'Experiences', path: '/experiences', hasDropdown: true },
        { id: 3, title: 'Concierge', path: '/concierge', hasDropdown: true },
        { id: 4, title: 'Corporate Travel', path: '/corporate-travel', hasDropdown: false },
        { id: 5, title: 'Coach Tour', path: '/coach-tour', hasDropdown: false },
        { id: 6, title: 'About', path: '/about', hasDropdown: false },
        { id: 7, title: 'Contact', path: '/contact', hasDropdown: false },
      ];
      setNavigation(dummyNav);
    } catch (err) {
      console.warn('Could not fetch dynamic settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettingsAndNav();

    const handleSync = () => {
      fetchSettingsAndNav();
    };

    window.addEventListener('bf_content_updated', handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      window.removeEventListener('bf_content_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [fetchSettingsAndNav]);

  const openEnquiryModal = (prefill = {}) => {
    setEnquiryPrefill(prefill);
    setIsEnquiryModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryModalOpen(false);
    setEnquiryPrefill({});
  };

  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        navigation,
        loading,
        refreshSettings: fetchSettingsAndNav,
        isEnquiryModalOpen,
        enquiryPrefill,
        openEnquiryModal,
        closeEnquiryModal,
        isSearchModalOpen,
        openSearchModal,
        closeSearchModal
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
