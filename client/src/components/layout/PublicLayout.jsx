import React, { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingActions from '../common/FloatingActions';
import { useSettings } from '../../context/SiteSettingsContext';

const EnquiryModal = lazy(() => import('../forms/EnquiryModal'));
const SearchModal = lazy(() => import('../forms/SearchModal'));

export default function PublicLayout() {
  const { isEnquiryModalOpen, isSearchModalOpen } = useSettings();

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfaf8] text-[#10221b] selection:bg-[#f29727] selection:text-white">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      {isEnquiryModalOpen && (
        <Suspense fallback={null}>
          <EnquiryModal />
        </Suspense>
      )}
      {isSearchModalOpen && (
        <Suspense fallback={null}>
          <SearchModal />
        </Suspense>
      )}
      <FloatingActions />
    </div>
  );
}
