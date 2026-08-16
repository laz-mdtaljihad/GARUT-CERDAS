import React, { useState } from 'react';
import { 
  Home, 
  School as SchoolIcon, 
  MapPin, 
  Award, 
  Wrench, 
  Compass, 
  CalendarDays, 
  MessageSquare, 
  Bell, 
  User,
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LayoutTemplate,
  Search,
  AlertCircle,
  Layers,
  Heart,
  SlidersHorizontal,
  BookOpen
} from 'lucide-react';
import { UserProfile, Announcement } from '../types';

interface SidebarNavProps {
  userProfile: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenAIAssistant: () => void;
  announcements: Announcement[];
  navPosition: 'top' | 'sidebar';
  onToggleNavPosition: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  userProfile,
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenAIAssistant,
  announcements,
  navPosition,
  onToggleNavPosition,
  isCollapsed,
  setIsCollapsed,
  isOpenMobile,
  onCloseMobile
}) => {
  const totalFavorites = (userProfile.favoritSekolah?.length || 0) + (userProfile.favoritBeasiswa?.length || 0);

  const mainNavItems = [
    { id: 'beranda', label: 'Beranda', icon: Home, badge: null },
    { id: 'sekolah', label: 'Direktori Sekolah', icon: SchoolIcon, badge: null },
    { id: 'zonasi', label: 'Zonasi PPDB', icon: MapPin, badge: 'PPDB 2026' },
    { id: 'modul-ajar', label: 'Modul Ajar', icon: BookOpen, badge: 'Baru' },
    { id: 'beasiswa', label: 'Beasiswa Garut', icon: Award, badge: 'Terbuka' },
    { id: 'pelatihan', label: 'Pelatihan Kerja', icon: Wrench, badge: 'BLK' },
  ];

  const secondaryNavItems = [
    { id: 'karir', label: 'Panduan Karir & Bakat', icon: Compass, badge: 'Tes AI' },
    { id: 'kalender', label: 'Kalender Pendidikan', icon: CalendarDays, badge: null },
    { id: 'tanya', label: 'Tanya Sekolah', icon: MessageSquare, badge: null },
    { id: 'pengumuman', label: 'Pengumuman Disdik', icon: AlertCircle, badge: announcements.length > 0 ? `${announcements.length}` : null },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (isOpenMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 lg:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-slate-200/90 shadow-sm flex flex-col justify-between transition-all duration-300 ease-in-out ${
          navPosition === 'sidebar' 
            ? isCollapsed ? 'lg:w-20' : 'lg:w-68'
            : 'hidden'
        } ${
          isOpenMobile 
            ? 'w-72 translate-x-0' 
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* TOP: Brand Header & Collapse Toggle */}
        <div>
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100">
            <div 
              onClick={() => handleTabClick('beranda')}
              className="flex items-center gap-3 cursor-pointer group overflow-hidden"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              
              {(!isCollapsed || isOpenMobile) && (
                <div className="truncate animate-in fade-in duration-150">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-base tracking-tight text-slate-900 font-['Outfit',sans-serif]">
                      GARUT<span className="text-blue-600">CERDAS</span>
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-semibold truncate">
                    Portal Edukasi Kab. Garut
                  </p>
                </div>
              )}
            </div>

            {/* Desktop Collapse / Expand Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title={isCollapsed ? 'Perluas Menu' : 'Perkecil Menu'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Quick Search Action */}
          <div className="p-3 border-b border-slate-100">
            <button
              onClick={onOpenSearch}
              className={`w-full flex items-center gap-2.5 px-3 py-2 bg-slate-100/90 hover:bg-blue-50 text-slate-600 hover:text-blue-700 rounded-2xl border border-slate-200/80 transition-all text-xs font-medium cursor-pointer ${
                isCollapsed && !isOpenMobile ? 'justify-center px-0' : ''
              }`}
              title="Cari Sekolah & Beasiswa (⌘K)"
            >
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              {(!isCollapsed || isOpenMobile) && (
                <div className="flex-1 flex items-center justify-between">
                  <span className="truncate">Cari data edukasi...</span>
                  <kbd className="text-[9px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400">⌘K</kbd>
                </div>
              )}
            </button>
          </div>

          {/* NAV ITEMS SCROLLABLE LIST */}
          <div className="px-3 py-3 overflow-y-auto max-h-[calc(100vh-270px)] space-y-4 no-scrollbar">
            
            {/* Primary Category: Menu Pokok */}
            <div>
              {(!isCollapsed || isOpenMobile) && (
                <span className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Menu Pokok
                </span>
              )}

              <div className="space-y-1">
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`sidebar-nav-${item.id}`}
                      onClick={() => handleTabClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all group cursor-pointer ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                      } ${isCollapsed && !isOpenMobile ? 'justify-center px-0' : ''}`}
                      title={item.label}
                    >
                      <div className={`p-1 rounded-xl transition-colors ${
                        isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      {(!isCollapsed || isOpenMobile) && (
                        <div className="flex-1 flex items-center justify-between truncate text-left">
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-extrabold ${
                              isActive 
                                ? 'bg-white/20 text-white' 
                                : 'bg-blue-50 text-blue-700 border border-blue-200/60'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Secondary Category: Fitur Edukasi & Pengumuman */}
            <div>
              {(!isCollapsed || isOpenMobile) && (
                <span className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Fitur Tambahan
                </span>
              )}

              <div className="space-y-1">
                {secondaryNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`sidebar-nav-${item.id}`}
                      onClick={() => handleTabClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-xs font-bold transition-all group cursor-pointer ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                      } ${isCollapsed && !isOpenMobile ? 'justify-center px-0' : ''}`}
                      title={item.label}
                    >
                      <div className={`p-1 rounded-xl transition-colors ${
                        isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      {(!isCollapsed || isOpenMobile) && (
                        <div className="flex-1 flex items-center justify-between truncate text-left">
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-extrabold ${
                              isActive 
                                ? 'bg-white/20 text-white' 
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI Assistant Banner */}
            {(!isCollapsed || isOpenMobile) && (
              <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white shadow-xs relative overflow-hidden">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span className="text-xs font-extrabold">Kang Cerdas AI</span>
                </div>
                <p className="text-[11px] text-blue-200 leading-tight">
                  Tanya seputar PPDB zonasi atau beasiswa langsung ke AI.
                </p>
                <button
                  onClick={onOpenAIAssistant}
                  className="mt-2.5 w-full py-1.5 px-3 bg-white hover:bg-blue-50 text-blue-900 rounded-xl text-xs font-bold transition-all text-center cursor-pointer shadow-xs"
                >
                  Mulai Konsultasi
                </button>
              </div>
            )}

          </div>
        </div>

        {/* BOTTOM: Akun User Card & Layout Switcher */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50 space-y-2">
          
          {/* Akun / Profile Button */}
          <button
            id="sidebar-user-profile-btn"
            onClick={() => handleTabClick('profil')}
            className={`w-full flex items-center gap-3 p-2 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'profil'
                ? 'bg-blue-50 border-blue-300 text-blue-900 ring-2 ring-blue-400/20'
                : 'bg-white hover:bg-slate-100 border-slate-200/80 text-slate-800'
            } ${isCollapsed && !isOpenMobile ? 'justify-center p-1.5' : ''}`}
            title="Akun & Profil Pengguna"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0 relative">
              {userProfile.nama.charAt(0)}
              {totalFavorites > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center border border-white">
                  {totalFavorites}
                </span>
              )}
            </div>

            {(!isCollapsed || isOpenMobile) && (
              <div className="flex-1 text-left truncate">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900 truncate">{userProfile.nama}</p>
                  <span className="text-[10px] text-blue-600 font-extrabold bg-blue-100/80 px-1.5 py-0.2 rounded">
                    Akun
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 truncate">{userProfile.role} • {userProfile.kecamatanDomisili}</p>
              </div>
            )}
          </button>

          {/* Layout Toggle: Switch to Top Navbar */}
          {(!isCollapsed || isOpenMobile) && (
            <button
              onClick={onToggleNavPosition}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/80 rounded-xl text-[11px] font-bold transition-all cursor-pointer"
              title="Pindah posisi menu navigasi ke bagian Atas (Header)"
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-blue-600" />
              <span>Ganti ke Menu Atas (Header)</span>
            </button>
          )}

        </div>
      </aside>
    </>
  );
};
