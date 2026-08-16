import React from 'react';
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
  User 
} from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  favoritCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  favoritCount
}) => {
  const primaryNavItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'sekolah', label: 'Sekolah', icon: SchoolIcon },
    { id: 'zonasi', label: 'Zonasi', icon: MapPin },
    { id: 'beasiswa', label: 'Beasiswa', icon: Award },
    { id: 'pelatihan', label: 'Pelatihan', icon: Wrench },
    { id: 'profil', label: 'Akun', icon: User, badge: favoritCount > 0 ? favoritCount : undefined }
  ];

  return (
    <>
      {/* Sleek Floating Bottom Nav for Mobile */}
      <nav 
        id="mobile-bottom-navigation" 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-1.5 shadow-lg safe-area-inset-bottom"
      >
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'profil' && ['karir', 'kalender', 'tanya', 'pengumuman'].includes(activeTab));
            return (
              <button
                key={item.id}
                id={`mobile-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
                  isActive 
                    ? 'text-blue-600 font-extrabold scale-105' 
                    : 'text-slate-500 hover:text-slate-700 font-medium'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-colors relative ${isActive ? 'bg-blue-100/80 text-blue-700' : ''}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 text-white rounded-full text-[8px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight font-semibold">{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 w-4 h-1 bg-blue-600 rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
