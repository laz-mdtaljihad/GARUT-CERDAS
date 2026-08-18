/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { garutSchools } from './data/schoolsData';
import { garutScholarships } from './data/scholarshipsData';
import { garutTrainings } from './data/trainingsData';
import { garutEduEvents } from './data/calendarData';
import { garutAnnouncements } from './data/announcementsData';
import { initialSchoolQuestions } from './data/qaData';
import { garutModulAjar } from './data/modulAjarData';
import { 
  School, 
  Scholarship, 
  TrainingCourse, 
  EduEvent, 
  Announcement, 
  SchoolQuestion, 
  UserProfile,
  ModulAjar
} from './types';

// Components
import { Navbar } from './components/Navbar';
import { SidebarNav } from './components/SidebarNav';
import { BottomNav } from './components/BottomNav';
import { HomeTab } from './components/HomeTab';
import { SchoolsTab } from './components/SchoolsTab';
import { SchoolDetailModal } from './components/SchoolDetailModal';
import { CompareSchoolsModal } from './components/CompareSchoolsModal';
import { ZonasiTab } from './components/ZonasiTab';
import { ScholarshipsTab } from './components/ScholarshipsTab';
import { ScholarshipDetailModal } from './components/ScholarshipDetailModal';
import { ModulAjarTab } from './components/ModulAjarTab';
import { ModulAjarDetailModal } from './components/ModulAjarDetailModal';
import { CalendarTab } from './components/CalendarTab';
import { TrainingsTab } from './components/TrainingsTab';
import { CareersTab } from './components/CareersTab';
import { SchoolQATab } from './components/SchoolQATab';
import { AnnouncementsTab } from './components/AnnouncementsTab';
import { ProfileTab } from './components/ProfileTab';
import { AIAssistantModal } from './components/AIAssistantModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { AuthModal } from './components/AuthModal';
import { AdminSchoolModal } from './components/AdminSchoolModal';
import { AdminModulModal } from './components/AdminModulModal';
import { AdminAnnouncementModal } from './components/AdminAnnouncementModal';

const DEFAULT_PROFILE: UserProfile = {
  nama: 'Keluarga Bp. Panji Wafa',
  role: 'Orang Tua',
  email: 'panji.wafa@gmail.com',
  kecamatanDomisili: 'Tarogong Kidul',
  isAdmin: false,
  favoritSekolah: ['sman-1-garut', 'smkn-1-garut', 'smpn-1-garut'],
  favoritBeasiswa: ['beasiswa-garut-cerdas-2026', 'beasiswa-kip-kuliah-2026'],
  dataAnak: [
    {
      id: 'anak-1',
      nama: 'Rizky Pratama Wafa',
      jenjangSekarang: 'Kelas 9 SMP',
      targetJenjang: 'SMA/SMK',
      minatUtama: 'Teknologi Informasi & Rekayasa Perangkat Lunak'
    }
  ],
  notifikasiAktif: {
    ppdb: true,
    beasiswa: true,
    pengumuman: true
  }
};

export default function App() {
  // Navigation State & Layout Mode ('top' or 'sidebar')
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [navPosition, setNavPosition] = useState<'top' | 'sidebar'>(() => {
    const saved = localStorage.getItem('gc_nav_position');
    return (saved === 'sidebar' || saved === 'top') ? saved : 'top';
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Datasets State with Local Storage fallback
  const [schools, setSchools] = useState<School[]>(() => {
    const saved = localStorage.getItem('gc_schools');
    return saved ? JSON.parse(saved) : garutSchools;
  });

  const [scholarships, setScholarships] = useState<Scholarship[]>(() => {
    const saved = localStorage.getItem('gc_scholarships');
    return saved ? JSON.parse(saved) : garutScholarships;
  });

  const [trainings, setTrainings] = useState<TrainingCourse[]>(() => {
    const saved = localStorage.getItem('gc_trainings');
    return saved ? JSON.parse(saved) : garutTrainings;
  });

  const [events, setEvents] = useState<EduEvent[]>(() => {
    const saved = localStorage.getItem('gc_events');
    return saved ? JSON.parse(saved) : garutEduEvents;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('gc_announcements');
    return saved ? JSON.parse(saved) : garutAnnouncements;
  });

  const [questions, setQuestions] = useState<SchoolQuestion[]>(() => {
    const saved = localStorage.getItem('gc_questions');
    return saved ? JSON.parse(saved) : initialSchoolQuestions;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('gc_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.nama === 'Keluarga Bp. Dadan') {
          parsed.nama = 'Keluarga Bp. Panji Wafa';
        }
        return parsed;
      } catch (e) {
        return DEFAULT_PROFILE;
      }
    }
    return DEFAULT_PROFILE;
  });

  const [modulList, setModulList] = useState<ModulAjar[]>(() => {
    const saved = localStorage.getItem('gc_modul_ajar');
    return saved ? JSON.parse(saved) : garutModulAjar;
  });

  // Modal States
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [selectedModul, setSelectedModul] = useState<ModulAjar | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [compareInitialSchool, setCompareInitialSchool] = useState<School | null>(null);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState<boolean>(false);
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState<boolean>(false);
  const [selectedSchoolForQA, setSelectedSchoolForQA] = useState<School | null>(null);

  // Authentication & Admin CRUD Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAddSchoolModalOpen, setIsAddSchoolModalOpen] = useState<boolean>(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [isAddModulModalOpen, setIsAddModulModalOpen] = useState<boolean>(false);
  const [editingModul, setEditingModul] = useState<ModulAjar | null>(null);
  const [isAddAnnouncementModalOpen, setIsAddAnnouncementModalOpen] = useState<boolean>(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  // Sync datasets to local storage
  useEffect(() => {
    localStorage.setItem('gc_nav_position', navPosition);
  }, [navPosition]);

  useEffect(() => {
    localStorage.setItem('gc_schools', JSON.stringify(schools));
  }, [schools]);

  useEffect(() => {
    localStorage.setItem('gc_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('gc_modul_ajar', JSON.stringify(modulList));
  }, [modulList]);

  useEffect(() => {
    localStorage.setItem('gc_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('gc_questions', JSON.stringify(questions));
  }, [questions]);

  // Keyboard shortcut ⌘K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsQuickSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleNavPosition = () => {
    setNavPosition(prev => prev === 'top' ? 'sidebar' : 'top');
  };

  // Handlers for authentication
  const handleLoginSuccess = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const handleLogout = () => {
    setUserProfile(DEFAULT_PROFILE);
    localStorage.setItem('gc_profile', JSON.stringify(DEFAULT_PROFILE));
  };

  // Handlers for favorites
  const toggleFavoritSekolah = (schoolId: string) => {
    setUserProfile(prev => {
      const exists = prev.favoritSekolah.includes(schoolId);
      return {
        ...prev,
        favoritSekolah: exists
          ? prev.favoritSekolah.filter(id => id !== schoolId)
          : [...prev.favoritSekolah, schoolId]
      };
    });
  };

  const toggleFavoritBeasiswa = (scholarshipId: string) => {
    setUserProfile(prev => {
      const exists = prev.favoritBeasiswa.includes(scholarshipId);
      return {
        ...prev,
        favoritBeasiswa: exists
          ? prev.favoritBeasiswa.filter(id => id !== scholarshipId)
          : [...prev.favoritBeasiswa, scholarshipId]
      };
    });
  };

  const handleOpenCompare = (school?: School) => {
    setCompareInitialSchool(school || null);
    setIsCompareOpen(true);
  };

  const handleAskSchool = (school: School) => {
    setSelectedSchoolForQA(school);
    setActiveTab('tanya');
  };

  // ===================== CRUD HANDLERS (ADMIN DISDIK & OPERATOR) =====================
  
  // 1. Schools CRUD
  const handleSaveSchool = (savedSchool: School) => {
    setSchools(prev => {
      const index = prev.findIndex(s => s.id === savedSchool.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = savedSchool;
        return updated;
      }
      return [savedSchool, ...prev];
    });
    setEditingSchool(null);
  };

  const handleDeleteSchool = (schoolId: string) => {
    setSchools(prev => prev.filter(s => s.id !== schoolId));
  };

  const handleOpenEditSchool = (school: School) => {
    setEditingSchool(school);
    setIsAddSchoolModalOpen(true);
  };

  // 2. Modul Ajar CRUD
  const handleSaveModul = (savedModul: ModulAjar) => {
    setModulList(prev => {
      const index = prev.findIndex(m => m.id === savedModul.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = savedModul;
        return updated;
      }
      return [savedModul, ...prev];
    });
    setEditingModul(null);
  };

  const handleDeleteModul = (modulId: string) => {
    setModulList(prev => prev.filter(m => m.id !== modulId));
  };

  const handleOpenEditModul = (modul: ModulAjar) => {
    setEditingModul(modul);
    setIsAddModulModalOpen(true);
  };

  // 3. Announcements CRUD
  const handleSaveAnnouncement = (savedAnn: Announcement) => {
    setAnnouncements(prev => {
      const index = prev.findIndex(a => a.id === savedAnn.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = savedAnn;
        return updated;
      }
      return [savedAnn, ...prev];
    });
    setEditingAnnouncement(null);
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const handleOpenEditAnnouncement = (ann: Announcement) => {
    setEditingAnnouncement(ann);
    setIsAddAnnouncementModalOpen(true);
  };

  // 4. Questions & Answers CRUD
  const handleAddQuestion = (qData: Omit<SchoolQuestion, 'id' | 'tanggalTanya' | 'status'>) => {
    const newQ: SchoolQuestion = {
      ...qData,
      id: 'q-' + Date.now(),
      tanggalTanya: 'Hari ini',
      status: 'Menunggu',
      jawaban: 'Pertanyaan Anda telah diterima oleh panitia/operator sekolah dan sedang menunggu jawaban resmi dari bagian kesiswaan.',
      dijawabOleh: 'Operator Sekolah Terkait',
      tanggalJawab: 'Dalam proses verifikasi'
    };
    setQuestions(prev => [newQ, ...prev]);
  };

  const handleAnswerQuestion = (questionId: string, answerText: string, responderName: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          jawaban: answerText,
          dijawabOleh: responderName,
          status: 'Dijawab',
          tanggalJawab: 'Hari ini'
        };
      }
      return q;
    }));
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  return (
    <div className="min-h-screen bg-slate-100/60 font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Side Navigation (Active when navPosition === 'sidebar' or on mobile slide-over) */}
      <SidebarNav
        userProfile={userProfile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsQuickSearchOpen(true)}
        onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        announcements={announcements}
        navPosition={navPosition}
        onToggleNavPosition={toggleNavPosition}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Layout Wrapper */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        navPosition === 'sidebar' 
          ? isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-68'
          : ''
      }`}>
        
        {/* Top Navbar */}
        <Navbar
          userProfile={userProfile}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenSearch={() => setIsQuickSearchOpen(true)}
          onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          announcements={announcements}
          navPosition={navPosition}
          onToggleNavPosition={toggleNavPosition}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Main Content Area & Tab Router */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6 pb-20 lg:pb-8">
          
          {/* TAB 1: BERANDA */}
          {activeTab === 'beranda' && (
            <HomeTab
              schools={schools}
              scholarships={scholarships}
              events={events}
              announcements={announcements}
              userProfile={userProfile}
              onSelectSchool={(s) => setSelectedSchool(s)}
              onSelectScholarship={(sch) => setSelectedScholarship(sch)}
              setActiveTab={setActiveTab}
              onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
              onOpenSearch={() => setIsQuickSearchOpen(true)}
              onToggleFavoritSekolah={toggleFavoritSekolah}
              onToggleFavoritBeasiswa={toggleFavoritBeasiswa}
            />
          )}

          {/* TAB 2: DIREKTORI SEKOLAH */}
          {activeTab === 'sekolah' && (
            <SchoolsTab
              schools={schools}
              userProfile={userProfile}
              onSelectSchool={(s) => setSelectedSchool(s)}
              onToggleFavorit={toggleFavoritSekolah}
              onOpenCompare={handleOpenCompare}
              onOpenAddSchool={() => {
                setEditingSchool(null);
                setIsAddSchoolModalOpen(true);
              }}
              onEditSchool={handleOpenEditSchool}
              onDeleteSchool={handleDeleteSchool}
            />
          )}

          {/* TAB 3: ZONASI & PENDAFTARAN PPDB */}
          {activeTab === 'zonasi' && (
            <ZonasiTab
              schools={schools}
              userProfile={userProfile}
              onSelectSchool={(s) => setSelectedSchool(s)}
            />
          )}

          {/* TAB: MODUL AJAR KURIKULUM MERDEKA */}
          {activeTab === 'modul-ajar' && (
            <ModulAjarTab
              modulList={modulList}
              onSelectModul={(m) => setSelectedModul(m)}
              userProfile={userProfile}
              onOpenAddModul={() => {
                setEditingModul(null);
                setIsAddModulModalOpen(true);
              }}
              onEditModul={handleOpenEditModul}
              onDeleteModul={handleDeleteModul}
            />
          )}

          {/* TAB 4: BEASISWA */}
          {activeTab === 'beasiswa' && (
            <ScholarshipsTab
              scholarships={scholarships}
              userProfile={userProfile}
              onSelectScholarship={(sch) => setSelectedScholarship(sch)}
              onToggleFavorit={toggleFavoritBeasiswa}
            />
          )}

          {/* TAB 5: PELATIHAN KERJA & BLK */}
          {activeTab === 'pelatihan' && (
            <TrainingsTab trainings={trainings} />
          )}

          {/* TAB 6: PANDUAN JURUSAN & MASA DEPAN */}
          {activeTab === 'karir' && (
            <CareersTab
              schools={schools}
              onSelectSchool={(s) => setSelectedSchool(s)}
            />
          )}

          {/* TAB 7: KALENDER PENDIDIKAN */}
          {activeTab === 'kalender' && (
            <CalendarTab events={events} />
          )}

          {/* TAB 8: TANYA JAWAB SEKOLAH */}
          {activeTab === 'tanya' && (
            <SchoolQATab
              schools={schools}
              questions={questions}
              userProfile={userProfile}
              onAddQuestion={handleAddQuestion}
              onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
              selectedSchoolForQA={selectedSchoolForQA}
              onAnswerQuestion={handleAnswerQuestion}
              onDeleteQuestion={handleDeleteQuestion}
            />
          )}

          {/* TAB 9: PENGUMUMAN & BERITA */}
          {activeTab === 'pengumuman' && (
            <AnnouncementsTab
              announcements={announcements}
              userProfile={userProfile}
              onOpenAddAnnouncement={() => {
                setEditingAnnouncement(null);
                setIsAddAnnouncementModalOpen(true);
              }}
              onEditAnnouncement={handleOpenEditAnnouncement}
              onDeleteAnnouncement={handleDeleteAnnouncement}
            />
          )}

          {/* TAB 10: PROFIL PENGGUNA */}
          {activeTab === 'profil' && (
            <ProfileTab
              userProfile={userProfile}
              onUpdateProfile={setUserProfile}
              schools={schools}
              scholarships={scholarships}
              onSelectSchool={(s) => setSelectedSchool(s)}
              onSelectScholarship={(sch) => setSelectedScholarship(sch)}
              onToggleFavoritSekolah={toggleFavoritSekolah}
              onToggleFavoritBeasiswa={toggleFavoritBeasiswa}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
              onOpenAddSchool={() => {
                setEditingSchool(null);
                setIsAddSchoolModalOpen(true);
              }}
              onOpenAddModul={() => {
                setEditingModul(null);
                setIsAddModulModalOpen(true);
              }}
              onOpenAddAnnouncement={() => {
                setEditingAnnouncement(null);
                setIsAddAnnouncementModalOpen(true);
              }}
            />
          )}

        </main>

        {/* Footer info banner */}
        <footer className="hidden md:block bg-white border-t border-slate-200/80 py-8 text-center text-xs text-slate-500 mt-auto">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-800 font-['Outfit',sans-serif]">GARUT CERDAS</span>
              <span>•</span>
              <span>Portal Edukasi & Masa Depan Kabupaten Garut</span>
            </div>
            <p className="text-slate-400">
              Dikelola bersama Dinas Pendidikan Kab. Garut • Disnakertrans Garut • Terverifikasi Dapodik & Kemendikdasmen RI (2026/2027)
            </p>
          </div>
        </footer>

      </div>

      {/* Floating Bottom Navigation Bar (Mobile only) */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritCount={(userProfile.favoritSekolah?.length || 0) + (userProfile.favoritBeasiswa?.length || 0)}
      />

      {/* MODAL 1: DETAIL SEKOLAH */}
      <SchoolDetailModal
        school={selectedSchool}
        onClose={() => setSelectedSchool(null)}
        userProfile={userProfile}
        onToggleFavorit={toggleFavoritSekolah}
        onOpenCompare={handleOpenCompare}
        onAskSchool={handleAskSchool}
      />

      {/* MODAL 2: DETAIL BEASISWA */}
      <ScholarshipDetailModal
        scholarship={selectedScholarship}
        onClose={() => setSelectedScholarship(null)}
        userProfile={userProfile}
        onToggleFavorit={toggleFavoritBeasiswa}
      />

      {/* MODAL 3: KOMPARASI SEKOLAH */}
      {isCompareOpen && (
        <CompareSchoolsModal
          schools={schools}
          initialSchool={compareInitialSchool}
          onClose={() => {
            setIsCompareOpen(false);
            setCompareInitialSchool(null);
          }}
          onSelectSchool={(s) => setSelectedSchool(s)}
        />
      )}

      {/* MODAL 4: KANG CERDAS AI ASSISTANT */}
      <AIAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        schools={schools}
        scholarships={scholarships}
        onSelectSchool={(s) => setSelectedSchool(s)}
        onSelectScholarship={(sch) => setSelectedScholarship(sch)}
      />

      {/* MODAL 5: QUICK SEARCH ⌘K */}
      <QuickSearchModal
        isOpen={isQuickSearchOpen}
        onClose={() => setIsQuickSearchOpen(false)}
        schools={schools}
        scholarships={scholarships}
        trainings={trainings}
        announcements={announcements}
        onSelectSchool={(s) => setSelectedSchool(s)}
        onSelectScholarship={(sch) => setSelectedScholarship(sch)}
        setActiveTab={setActiveTab}
      />

      {/* MODAL 6: DETAIL MODUL AJAR */}
      <ModulAjarDetailModal
        modul={selectedModul}
        onClose={() => setSelectedModul(null)}
        userProfile={userProfile}
      />

      {/* MODAL 7: AUTHENTICATION (ADMIN DISDIK & GOOGLE GMAIL SIGN-IN) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        userProfile={userProfile}
        onLogout={handleLogout}
      />

      {/* MODAL 8: ADMIN ADD / EDIT SCHOOL */}
      <AdminSchoolModal
        isOpen={isAddSchoolModalOpen}
        onClose={() => {
          setIsAddSchoolModalOpen(false);
          setEditingSchool(null);
        }}
        onSaveSchool={handleSaveSchool}
        schoolToEdit={editingSchool}
      />

      {/* MODAL 9: ADMIN ADD / EDIT MODUL AJAR */}
      <AdminModulModal
        isOpen={isAddModulModalOpen}
        onClose={() => {
          setIsAddModulModalOpen(false);
          setEditingModul(null);
        }}
        onSaveModul={handleSaveModul}
        modulToEdit={editingModul}
      />

      {/* MODAL 10: ADMIN ADD / EDIT ANNOUNCEMENT */}
      <AdminAnnouncementModal
        isOpen={isAddAnnouncementModalOpen}
        onClose={() => {
          setIsAddAnnouncementModalOpen(false);
          setEditingAnnouncement(null);
        }}
        onSaveAnnouncement={handleSaveAnnouncement}
        announcementToEdit={editingAnnouncement}
      />

    </div>
  );
}
