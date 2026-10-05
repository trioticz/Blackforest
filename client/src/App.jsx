import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { SiteSettingsProvider } from './context/SiteSettingsContext';
import { ToastProvider } from './context/ToastContext';
import ScrollToTop from './components/common/ScrollToTop';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';

// Primary landing page loaded directly for instant FCP/LCP
import HomePage from './pages/public/HomePage';

// Public Pages (code-split via dynamic import)
const AsianCountriesPage = lazy(() => import('./pages/public/AsianCountriesPage'));
const DestinationsPage = lazy(() => import('./pages/public/DestinationsPage'));
const DestinationDetailPage = lazy(() => import('./pages/public/DestinationDetailPage'));
const ToursPage = lazy(() => import('./pages/public/ToursPage'));
const TourDetailPage = lazy(() => import('./pages/public/TourDetailPage'));
const ExperiencesPage = lazy(() => import('./pages/public/ExperiencesPage'));
const ConciergePage = lazy(() => import('./pages/public/ConciergePage'));
const CruisesPage = lazy(() => import('./pages/public/CruisesPage'));
const CorporateTravelPage = lazy(() => import('./pages/public/CorporateTravelPage'));
const CoachTourPage = lazy(() => import('./pages/public/CoachTourPage'));
const CoachTourDetailPage = lazy(() => import('./pages/public/CoachTourDetailPage'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const JournalPage = lazy(() => import('./pages/public/JournalPage'));
const ArticleDetailPage = lazy(() => import('./pages/public/ArticleDetailPage'));
const PolicyPage = lazy(() => import('./pages/public/PolicyPage'));
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage'));

// Admin Pages (code-split via dynamic import)
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminEnquiriesPage = lazy(() => import('./pages/admin/AdminEnquiriesPage'));
const AdminDestinationsPage = lazy(() => import('./pages/admin/AdminDestinationsPage'));
const AdminJournalPage = lazy(() => import('./pages/admin/AdminJournalPage'));
const AdminExpertisePage = lazy(() => import('./pages/admin/AdminExpertisePage'));
const AdminSEOPage = lazy(() => import('./pages/admin/AdminSEOPage'));
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage'));

function PageFallback() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center bg-[#f7f9f8] py-16" aria-busy="true" aria-label="Loading page">
      <div className="w-9 h-9 border-3 border-gray-200 border-t-[#27B8B1] rounded-full animate-spin"></div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SiteSettingsProvider>
          <ToastProvider>
            <ScrollToTop />
            <Suspense fallback={<PageFallback />}>
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
            </Suspense>
          </ToastProvider>
        </SiteSettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
