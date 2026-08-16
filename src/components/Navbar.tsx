import React, { useState, useRef, useEffect } from 'react';
import { 
  GraduationCap, 
  Search, 
  Bell, 
  MapPin, 
  Sparkles, 
  X,
  Calendar,
  Award,
  BookOpen,
  Home,
  School as SchoolIcon,
  Wrench,
  Compass,
  CalendarDays,
  MessageSquare,
  AlertCircle,
  User,
  ChevronDown,
  LayoutTemplate,
  Menu,
  SlidersHorizontal,
  Sidebar as SidebarIcon
} from 'lucide-react';
import { UserProfile, Announcement } from '../types';

interface NavbarProps {
  userProfile: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenAIAssistant: () => void;
  onOpenAuthModal: () => void;
  announcements: Announcement[];
  navPosition: 'top' | 'sidebar';
  onToggleNavPosition: () => void;
  onOpenMobileSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userProfile,
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenAIAssistant,
  onOpenAuthModal,
  announcements,
  navPosition,
  onToggleNavPosition,
  onOpenMobileSidebar
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);

  const totalFavorites = (userProfile.favoritSekolah?.length || 0) + (userProfile.favoritBeasiswa?.length || 0);

  // Close popups on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary navigation tabs in Top Bar Mode
  const primaryTabs = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'sekolah', label: 'Sekolah', icon: SchoolIcon },
    { id: 'zonasi', label: 'Zonasi PPDB', icon: MapPin, badge: 'PPDB' },
    { id: 'modul-ajar', label: 'Modul Ajar', icon: BookOpen, badge: 'Baru' },
    { id: 'beasiswa', label: 'Beasiswa', icon: Award },
    { id: 'pelatihan', label: 'Pelatihan', icon: Wrench },
  ];

  // Secondary tools in More Dropdown
  const secondaryTabs = [
    { id: 'modul-ajar', label: 'Modul Ajar Semua Jenjang', icon: BookOpen, desc: 'Kurikulum Merdeka PAUD s.d SLB Garut' },
    { id: 'karir', label: 'Panduan Karir & Tes Bakat', icon: Compass, desc: 'Eksplorasi minat anak & prospek Garut' },
    { id: 'kalender', label: 'Kalender Pendidikan', icon: CalendarDays, desc: 'Jadwal ujian, libur, dan PPDB' },
    { id: 'tanya', label: 'Tanya Sekolah', icon: MessageSquare, desc: 'Tanya jawab langsung panitia sekolah' },
    { id: 'pengumuman', label: 'Pengumuman Disdik', icon: AlertCircle, desc: 'Informasi resmi & juknis Kadisdik Garut' },
  ];

  const isSecondaryActive = secondaryTabs.some(t => t.id === activeTab);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* LEFT: Mobile Menu Trigger + Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Mobile Sidebar Hamburger */}
            <button
              id="mobile-sidebar-toggle-btn"
              onClick={onOpenMobileSidebar}
              className="lg:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Buka Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Brand Logo & District Seal */}
            <div 
              id="brand-header-logo"
              onClick={() => setActiveTab('beranda')}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="hidden min-[380px]:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 font-['Outfit',sans-serif]">
                    GARUT<span className="text-blue-600">CERDAS</span>
                  </span>
                  <span className="hidden xl:inline-flex items-center px-1.5 py-0.2 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Kab. Garut
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 hidden sm:block font-medium leading-none">
                  Portal Resmi Edukasi & PPDB
                </p>
              </div>
            </div>

          </div>

          {/* CENTER: Primary Nav Pill Tabs (When navPosition === 'top') */}
          {navPosition === 'top' && (
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/70 shadow-2xs">
              {primaryTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`top-nav-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 scale-[1.02]'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-extrabold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* "Lainnya" Dropdown Button */}
              <div className="relative" ref={moreMenuRef}>
                <button
                  id="top-nav-more-btn"
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSecondaryActive
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <span>Lainnya</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showMoreMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* More Dropdown Menu */}
                {showMoreMenu && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-2 py-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      Fitur Pendidikan Tambahan
                    </div>
                    <div className="space-y-1 mt-1">
                      {secondaryTabs.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setActiveTab(item.id);
                              setShowMoreMenu(false);
                            }}
                            className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors cursor-pointer ${
                              isActive ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className={`p-1.5 rounded-lg mt-0.5 ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-bold leading-tight">{item.label}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{item.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>
          )}

          {/* RIGHT CONTROLS: Search, AI Button, Position Switcher, Notif, Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Quick Search Button */}
            <button
              id="header-search-trigger-btn"
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-slate-100 hover:bg-slate-200/90 text-slate-600 rounded-xl text-xs font-semibold border border-slate-200/80 transition-colors cursor-pointer"
              title="Cari Sekolah, Zonasi, & Beasiswa (⌘K)"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden md:inline text-slate-500">Cari Data</span>
              <kbd className="hidden sm:inline-block text-[9px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400">⌘K</kbd>
            </button>

            {/* AI Assistant "Kang Cerdas" Button */}
            <button
              id="ai-assistant-header-btn"
              onClick={onOpenAIAssistant}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
              title="Tanya AI Kang Cerdas"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
              <span className="hidden sm:inline">Kang Cerdas</span>
              <span className="sm:hidden">AI</span>
            </button>

            {/* Layout Position Toggle (Top vs Sidebar) */}
            <button
              id="layout-toggle-btn"
              onClick={onToggleNavPosition}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-blue-600 text-xs font-bold transition-all cursor-pointer"
              title={navPosition === 'top' ? 'Pindah ke Menu Samping (Sidebar)' : 'Pindah ke Menu Atas (Header)'}
            >
              {navPosition === 'top' ? (
                <>
                  <SidebarIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-[11px]">Menu Samping</span>
                </>
              ) : (
                <>
                  <LayoutTemplate className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[11px]">Menu Atas</span>
                </>
              )}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative" ref={notifMenuRef}>
              <button
                id="notif-toggle-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
                title="Pemberitahuan & Pengumuman"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-blue-600" />
                      <h4 className="font-bold text-sm text-slate-900">Pengumuman & Pengingat</h4>
                    </div>
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    <div 
                      onClick={() => { setShowNotifications(false); setActiveTab('zonasi'); }}
                      className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 hover:bg-blue-100/60 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-600 text-white rounded-full">PPDB 2026</span>
                        <span className="text-[10px] text-slate-500">20 Agu</span>
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-1">PPDB SMP & SMA Tahap 2 Dibuka</p>
                      <p className="text-[11px] text-slate-600 line-clamp-1">Jalur Prestasi dan Afirmasi resmi dibuka panitia Disdik Garut.</p>
                    </div>

                    <div 
                      onClick={() => { setShowNotifications(false); setActiveTab('beasiswa'); }}
                      className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-100 hover:bg-amber-100/60 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-600 text-white rounded-full">Beasiswa</span>
                        <span className="text-[10px] text-slate-500">30 Agu</span>
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-1">Batas Beasiswa Garut Cerdas Tahap 1</p>
                      <p className="text-[11px] text-slate-600 line-clamp-1">Unggah berkas rapor & SKTM sebelum tanggal 30 Agustus.</p>
                    </div>

                    <div 
                      onClick={() => { setShowNotifications(false); setActiveTab('pengumuman'); }}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-600 text-white rounded-full">Disdik</span>
                        <span className="text-[10px] text-slate-500">15 Agu</span>
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-1">SK Juknis & Zonasi Garut 2026</p>
                      <p className="text-[11px] text-slate-600 line-clamp-1">Cek wilayah zonasi resmi terbaru di 42 kecamatan Garut.</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-100 mt-2 text-center">
                    <button
                      onClick={() => { setShowNotifications(false); setActiveTab('pengumuman'); }}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      Lihat Semua Pengumuman Resmi Disdik &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* TOMBOL MASUK / GANTI AKUN & STATUS AUTH */}
            <div className="flex items-center gap-1.5">
              {/* TOMBOL LOGIN EXPLICIT */}
              <button
                id="navbar-auth-btn"
                onClick={onOpenAuthModal}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                  userProfile.isAdmin
                    ? 'bg-gradient-to-r from-emerald-800 to-teal-800 text-white hover:from-emerald-900 hover:to-teal-900 ring-2 ring-emerald-400/30'
                    : userProfile.loginProvider === 'google'
                    ? 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 ring-1 ring-blue-500/20'
                    : 'bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white'
                }`}
                title={userProfile.isAdmin ? 'Mode Admin Disdik Aktif - Klik untuk kelola sesi' : 'Masuk dengan Gmail / Portal Admin'}
              >
                {userProfile.isAdmin ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                    <span className="hidden sm:inline font-black">ADMIN DISDIK</span>
                    <span className="sm:hidden font-black">ADMIN</span>
                  </>
                ) : userProfile.loginProvider === 'google' ? (
                  <>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span className="hidden sm:inline font-bold">Google Akun</span>
                  </>
                ) : (
                  <>
                    <User className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Masuk</span>
                  </>
                )}
              </button>

              {/* AKUN / PROFIL BUTTON */}
              <button
                id="profile-nav-btn"
                onClick={() => setActiveTab('profil')}
                className={`flex items-center gap-2 pl-2 pr-2 sm:pr-3 py-1 rounded-2xl border transition-all cursor-pointer ${
                  activeTab === 'profil' 
                    ? 'border-blue-500 bg-blue-50/90 text-blue-800 ring-2 ring-blue-400/20' 
                    : 'border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs'
                }`}
                title="Buka Profil & Pengaturan"
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shadow-xs relative text-white ${
                  userProfile.isAdmin ? 'bg-emerald-700' : 'bg-blue-600'
                }`}>
                  {userProfile.nama.charAt(0)}
                  {totalFavorites > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 text-white rounded-full text-[8px] font-bold flex items-center justify-center">
                      {totalFavorites}
                    </span>
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[85px] lg:max-w-[110px]">
                    {userProfile.nama}
                  </p>
                  <p className="text-[9px] text-slate-400 font-semibold leading-tight">
                    {userProfile.isAdmin ? 'Admin Disdik' : userProfile.role}
                  </p>
                </div>
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
