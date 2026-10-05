import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { SiteSettingsProvider } from './context/SiteSettingsContext';
import { ToastProvider } from './context/ToastContext';
import ScrollToTop from './components/common/ScrollToTop';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import AsianCountriesPage from './pages/public/AsianCountriesPage';
import DestinationsPage from './pages/public/DestinationsPage';
import DestinationDetailPage from './pages/public/DestinationDetailPage';
import ToursPage from './pages/public/ToursPage';
import TourDetailPage from './pages/public/TourDetailPage';
import ExperiencesPage from './pages/public/ExperiencesPage';
import ConciergePage from './pages/public/ConciergePage';
import CruisesPage from './pages/public/CruisesPage';
import CorporateTravelPage from './pages/public/CorporateTravelPage';
import CoachTourPage from './pages/public/CoachTourPage';
import CoachTourDetailPage from './pages/public/CoachTourDetailPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import JournalPage from './pages/public/JournalPage';
import ArticleDetailPage from './pages/public/ArticleDetailPage';
import PolicyPage from './pages/public/PolicyPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminEnquiriesPage from './pages/admin/AdminEnquiriesPage';
import AdminDestinationsPage from './pages/admin/AdminDestinationsPage';
import AdminJournalPage from './pages/admin/AdminJournalPage';
import AdminExpertisePage from './pages/admin/AdminExpertisePage';
import AdminSEOPage from './pages/admin/AdminSEOPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SiteSettingsProvider>
          <ToastProvider>
            <ScrollToTop />
            <Routes>
              {/* Public Website Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />

                {/* Destinations */}
                <Route path="/destinations" element={<DestinationsPage />} />
                <Route path="/destinations/asian-countries" element={<AsianCountriesPage />} />
                <Route path="/destinations/indian_ocean" element={<DestinationDetailPage forcedSlug="indian-ocean" />} />
                <Route path="/destinations/middle_east_countries" element={<DestinationDetailPage forcedSlug="middle-east" />} />
                <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
                <Route path="/africa" element={<DestinationDetailPage forcedSlug="africa" />} />
                <Route path="/america" element={<DestinationDetailPage forcedSlug="america" />} />
                <Route path="/asian-countries" element={<AsianCountriesPage />} />
                <Route path="/australia" element={<DestinationDetailPage forcedSlug="australia" />} />
                <Route path="/europe" element={<DestinationDetailPage forcedSlug="europe" />} />
                <Route path="/indian-ocean" element={<DestinationDetailPage forcedSlug="indian-ocean" />} />
                <Route path="/indian_ocean" element={<DestinationDetailPage forcedSlug="indian-ocean" />} />
                <Route path="/middle-east" element={<DestinationDetailPage forcedSlug="middle-east" />} />
                <Route path="/middle_east_countries" element={<DestinationDetailPage forcedSlug="middle-east" />} />
                <Route path="/south-asia" element={<DestinationDetailPage forcedSlug="south-asia" />} />

                {/* Tours */}
                <Route path="/international-tours" element={<ToursPage defaultCategory="international" />} />
                <Route path="/india-tours" element={<ToursPage defaultCategory="india" />} />
                <Route path="/tours/:slug" element={<TourDetailPage />} />

                {/* Experiences */}
                <Route path="/experiences" element={<ExperiencesPage />} />
                <Route path="/experiences/:slug" element={<ExperiencesPage />} />
                <Route path="/adventure-nature" element={<ExperiencesPage forcedSlug="adventure-nature" />} />
                <Route path="/island-holidays" element={<ExperiencesPage forcedSlug="island-holidays" />} />
                <Route path="/family-holidays" element={<ExperiencesPage forcedSlug="family-holidays" />} />
                <Route path="/honeymoon-escapes" element={<ExperiencesPage forcedSlug="honeymoon-escapes" />} />
                <Route path="/luxury-escapes" element={<ExperiencesPage forcedSlug="luxury-escapes" />} />

                {/* Concierge & Specialized Services */}
                <Route path="/concierge" element={<ConciergePage />} />
                <Route path="/concierge/flight-booking" element={<ConciergePage />} />
                <Route path="/concierge/visa-assistance" element={<ConciergePage />} />
                <Route path="/concierge/cruises" element={<CruisesPage />} />
                <Route path="/cruises" element={<CruisesPage />} />

                {/* Group & Corporate */}
                <Route path="/corporate-travel" element={<CorporateTravelPage />} />
                <Route path="/coach-tour" element={<CoachTourPage />} />
                <Route path="/coach-tour/coach-tour-details" element={<CoachTourDetailPage />} />
                <Route path="/coach-tour-details" element={<CoachTourDetailPage />} />
                <Route path="/coach-tour/:id" element={<CoachTourDetailPage />} />

                {/* Blog & Journal Pages */}
                <Route path="/blog" element={<ArticleDetailPage forcedSlug="safety-measures-for-safe-trekking-in-waterfalls" />} />
                <Route path="/blogs" element={<ArticleDetailPage forcedSlug="safety-measures-for-safe-trekking-in-waterfalls" />} />
                <Route path="/journal" element={<ArticleDetailPage forcedSlug="safety-measures-for-safe-trekking-in-waterfalls" />} />
                <Route path="/travel-journal" element={<ArticleDetailPage forcedSlug="safety-measures-for-safe-trekking-in-waterfalls" />} />
                <Route path="/journal/:slug" element={<ArticleDetailPage />} />
                <Route path="/blog/:slug" element={<ArticleDetailPage />} />
                <Route path="/safety-measures-for-safe-trekking-in-waterfalls" element={<ArticleDetailPage forcedSlug="safety-measures-for-safe-trekking-in-waterfalls" />} />

                {/* Company Pages */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/work-with-us" element={<ContactPage />} />

                {/* Legal & Policy Pages */}
                <Route path="/privacy-policy" element={<PolicyPage policyKey="privacy-policy" />} />
                <Route path="/cancellation-refund-policy" element={<PolicyPage policyKey="cancellation-refund-policy" />} />
                <Route path="/refund-policy" element={<PolicyPage policyKey="cancellation-refund-policy" />} />
                <Route path="/cancellation-&-refund-policy" element={<PolicyPage policyKey="cancellation-refund-policy" />} />
                <Route path="/terms-conditions" element={<PolicyPage policyKey="terms-conditions" />} />
                <Route path="/terms" element={<PolicyPage policyKey="terms-conditions" />} />
                <Route path="/terms-&-conditions" element={<PolicyPage policyKey="terms-conditions" />} />
                <Route path="/terms-and-conditions" element={<PolicyPage policyKey="terms-conditions" />} />

                {/* Catch-all 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Admin Portal Authentication */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Admin Protected Dashboard Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="enquiries" element={<AdminEnquiriesPage />} />
                <Route path="destinations" element={<AdminDestinationsPage />} />
                <Route path="journal" element={<AdminJournalPage />} />
                <Route path="expertise" element={<AdminExpertisePage />} />
                <Route path="seo" element={<AdminSEOPage />} />
                <Route path="users" element={<AdminUsersPage />} />

                {/* Removed Admin Modules redirected */}
                <Route path="tours/*" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="experiences/*" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="services/*" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="testimonials/*" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="media/*" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="navigation/*" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="settings/*" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="audit-logs/*" element={<Navigate to="/admin/dashboard" replace />} />
              </Route>
            </Routes>
          </ToastProvider>
        </SiteSettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
