import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MailQuestion,
  MapPin,
  BookOpen,
  Award,
  Globe,
  Users,
  LogOut,
  ExternalLink,
  Menu as MenuIcon,
  X,
  Compass
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function AdminLayout() {
  const { user, isAuthenticated, loading, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="w-8 h-8 border-4 border-[#27B8B1] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
    navigate('/admin/login');
  };

  const navGroups = [
    {
      group: 'Overview',
      items: [
        { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Leads & Enquiries', path: '/admin/enquiries', icon: MailQuestion, badge: 'Active' },
      ]
    },
    {
      group: 'Content & CMS',
      items: [
        { label: 'Destinations', path: '/admin/destinations', icon: MapPin },
        { label: 'Blog Posts', path: '/admin/journal', icon: BookOpen },
        { label: 'Partner Expertise', path: '/admin/expertise', icon: Award },
      ]
    },
    {
      group: 'Settings',
      items: [
        { label: 'SEO Management', path: '/admin/seo', icon: Globe },
        ...(isAdmin ? [{ label: 'Administrators', path: '/admin/users', icon: Users }] : [])
      ]
    }
  ];

  return (
    <div className="min-h-screen flex bg-[#f8f9fa] text-zinc-800 font-sans antialiased selection:bg-[#10221b] selection:text-white">
      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Modern Minimalist Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0d1210] text-white flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 border-r border-white/[0.08] ${
          mobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header Brand */}
          <div className="h-16 px-6 border-b border-white/[0.08] flex items-center justify-between">
            <Link to="/admin/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#0d1210] font-bold text-sm shadow-sm transition-transform group-hover:scale-105">
                BF
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-sm tracking-wider text-white leading-tight">
                  BLACKFOREST
                </span>
                <span className="text-[10px] text-zinc-400 font-medium tracking-wide">
                  Admin Console
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Groups */}
          <nav className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-170px)] no-scrollbar">
            {navGroups.map((grp, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <h4 className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-2">
                  {grp.group}
                </h4>
                {grp.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    location.pathname === item.path ||
                    (item.path !== '/admin/dashboard' && location.pathname.startsWith(`${item.path}/`));

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-white/[0.12] text-white shadow-xs font-semibold'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? 'text-white' : 'text-zinc-400'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-white/15 text-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Minimalist User & Action Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-[#090d0b]">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="truncate">
                <p className="text-xs font-medium text-white truncate">{user?.name || 'Administrator'}</p>
                <p className="text-[10px] text-zinc-400 truncate">{user?.email || 'admin@gmail.com'}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/"
              target="_blank"
              className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300 hover:text-white text-[11px] font-medium transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Live Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-[11px] font-medium transition-colors cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Sleek Minimalist Topbar */}
        <header className="h-16 bg-white border-b border-zinc-200/80 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 lg:hidden"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
              <span className="hidden sm:inline">Admin</span>
              <span className="hidden sm:inline">/</span>
              <span className="text-zinc-900 font-semibold capitalize">
                {location.pathname.replace('/admin/', '').replace(/-/g, ' ') || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Sync Active</span>
            </div>

            <Link
              to="/"
              target="_blank"
              className="px-3.5 py-1.5 bg-zinc-900 hover:bg-black text-white text-xs font-medium rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <span>View Public Portal</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
