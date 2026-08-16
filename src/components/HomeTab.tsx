import React, { useState } from 'react';
import { 
  School as SchoolIcon, 
  MapPin, 
  Award, 
  CalendarDays, 
  MessageSquare, 
  Wrench, 
  Compass, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Bookmark, 
  ChevronRight, 
  ExternalLink,
  Users,
  Search,
  BookOpen,
  Map,
  ShieldCheck,
  TrendingUp,
  FileText,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { School, Scholarship, EduEvent, Announcement, UserProfile } from '../types';
import { HomeAnalyticsCharts } from './HomeAnalyticsCharts';

interface HomeTabProps {
  schools: School[];
  scholarships: Scholarship[];
  events: EduEvent[];
  announcements: Announcement[];
  userProfile: UserProfile;
  onSelectSchool: (school: School) => void;
  onSelectScholarship: (scholarship: Scholarship) => void;
  setActiveTab: (tab: string) => void;
  onOpenAIAssistant: () => void;
  onOpenSearch: () => void;
  onToggleFavoritSekolah: (schoolId: string) => void;
  onToggleFavoritBeasiswa: (scholarshipId: string) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  schools,
  scholarships,
  events,
  announcements,
  userProfile,
  onSelectSchool,
  onSelectScholarship,
  setActiveTab,
  onOpenAIAssistant,
  onOpenSearch,
  onToggleFavoritSekolah,
  onToggleFavoritBeasiswa
}) => {
  const [selectedFilterJenjang, setSelectedFilterJenjang] = useState<string>('Semua');

  // Filter schools based on selected jenjang
  const filteredSchools = schools.filter(s => {
    if (selectedFilterJenjang === 'Semua') return true;
    if (selectedFilterJenjang === 'PAUD/TK') return s.jenjang === 'PAUD' || s.jenjang === 'TK';
    if (selectedFilterJenjang === 'SD') return s.jenjang === 'SD' || s.jenjang === 'MI';
    if (selectedFilterJenjang === 'SMP') return s.jenjang === 'SMP' || s.jenjang === 'MTs';
    if (selectedFilterJenjang === 'SMA') return s.jenjang === 'SMA' || s.jenjang === 'MA';
    if (selectedFilterJenjang === 'SMK') return s.jenjang === 'SMK';
    if (selectedFilterJenjang === 'SLB') return s.jenjang === 'SLB';
    return true;
  });

  const featuredSchools = filteredSchools.slice(0, 4);
  const activeScholarships = scholarships.filter(s => s.status === 'Buka').slice(0, 3);
  const upcomingEvents = events.slice(0, 4);
  const latestAnnouncement = announcements[0];

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-200">
      
      {/* 🍱 BENTO HERO ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Main Bento Hero Tile: Welcome + Disdik Announcement (Col 8) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            {/* Top Badge & Verified Seal */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Portal Resmi Dinas Pendidikan Kab. Garut</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Tahun Ajaran 2025/2026</span>
            </div>

            {/* Greeting Headline */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
              Sampurasun, <span className="text-blue-600">{userProfile.nama}</span>! 👋
            </h1>
            <p className="text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
              Panduan terintegrasi sekolah, perhitungan jarak zonasi PPDB 2026, beasiswa berprestasi, dan arah karir masa depan anak Garut.
            </p>

            {/* Sub-Bento: Announcement Ribbon */}
            {latestAnnouncement && (
              <div 
                onClick={() => setActiveTab('pengumuman')}
                className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-blue-50/90 to-indigo-50/90 border border-blue-200/80 flex items-start sm:items-center justify-between gap-3 cursor-pointer hover:border-blue-300 transition-all group"
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-xl bg-blue-600 text-white shrink-0 mt-0.5">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-wider bg-blue-100/80 px-2 py-0.5 rounded-md">
                        Pengumuman Kadisdik
                      </span>
                      <span className="text-[11px] text-slate-400">{latestAnnouncement.tanggal}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition-colors line-clamp-1 mt-0.5">
                      {latestAnnouncement.judul}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-xs font-bold text-blue-600 shrink-0 group-hover:translate-x-0.5 transition-transform">
                  <span className="hidden sm:inline">Detail</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>

          {/* Quick Metrics Bar in Hero */}
          <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-3 gap-3 relative z-10">
            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="block text-[10px] text-slate-500 font-semibold uppercase">Sekolah Terdata</span>
              <span className="text-lg font-extrabold text-blue-600">{schools.length}</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="block text-[10px] text-slate-500 font-semibold uppercase">Beasiswa Aktif</span>
              <span className="text-lg font-extrabold text-amber-600">{activeScholarships.length}</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="block text-[10px] text-slate-500 font-semibold uppercase">Agenda PPDB</span>
              <span className="text-lg font-extrabold text-emerald-600">{events.length}</span>
            </div>
          </div>
        </div>

        {/* AI Assistant Bento Tile (Col 4) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-6 text-white shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>AI Kang Cerdas</span>
              </div>
              <span className="text-[10px] bg-emerald-500/30 text-emerald-300 font-bold px-2 py-0.5 rounded-md border border-emerald-400/30">
                Siap Bantu 24 Jam
              </span>
            </div>

            <h3 className="text-xl font-extrabold mt-3 font-['Outfit',sans-serif]">
              Tanya Seputar Sekolah & PPDB Garut
            </h3>
            <p className="text-xs text-blue-100/90 mt-1.5 leading-relaxed">
              Konsultasikan zonasi rumah, kalkulasi peluang nilai, persyaratan berkas, atau rekomendasi jurusan SMK.
            </p>

            {/* Suggestion prompt chips */}
            <div className="mt-3.5 space-y-1.5">
              <button 
                onClick={onOpenAIAssistant}
                className="w-full text-left px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-blue-100 transition-colors truncate"
              >
                💡 "Cara hitung jarak zonasi ke SMAN 1 Garut?"
              </button>
              <button 
                onClick={onOpenAIAssistant}
                className="w-full text-left px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-blue-100 transition-colors truncate"
              >
                🎓 "Rekomendasi beasiswa untuk anak SMP ke SMA"
              </button>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/15 relative z-10">
            <button
              id="bento-open-ai-chat-btn"
              onClick={onOpenAIAssistant}
              className="w-full py-2.5 px-4 bg-white hover:bg-blue-50 text-blue-900 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Mulai Diskusi dengan AI</span>
            </button>
          </div>
        </div>

      </div>

      {/* ⚡ 6 BENTO SHORTCUTS */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif] flex items-center gap-2">
            <span>⚡ Jalan Cepat Fitur Edukasi</span>
          </h2>
          <span className="text-xs text-slate-500">Navigasi langsung satu klik</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          
          {/* 1. Direktori Sekolah */}
          <button
            id="quick-shortcut-sekolah"
            onClick={() => setActiveTab('sekolah')}
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white hover:bg-blue-50/60 border border-slate-200/80 hover:border-blue-300 shadow-2xs hover:shadow-md transition-all group cursor-pointer text-center"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-1.5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <SchoolIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700">Sekolah</span>
            <span className="text-[10px] text-slate-500">PAUD - SLB</span>
          </button>

          {/* 2. Modul Ajar (NEW) */}
          <button
            id="quick-shortcut-modul-ajar"
            onClick={() => setActiveTab('modul-ajar')}
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-gradient-to-b from-teal-50/60 to-emerald-50/40 hover:from-teal-100 hover:to-emerald-100 border border-teal-200/80 hover:border-teal-400 shadow-2xs hover:shadow-md transition-all group cursor-pointer text-center relative"
          >
            <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 bg-teal-600 text-white rounded-full text-[9px] font-extrabold shadow-2xs">
              Baru
            </span>
            <div className="w-10 h-10 rounded-2xl bg-teal-600/10 text-teal-700 flex items-center justify-center mb-1.5 group-hover:scale-110 group-hover:bg-teal-700 group-hover:text-white transition-all">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-teal-900 group-hover:text-teal-700">Modul Ajar</span>
            <span className="text-[10px] text-teal-700">Semua Jenjang</span>
          </button>

          {/* 3. Pendaftaran PPDB */}
          <button
            id="quick-shortcut-ppdb"
            onClick={() => setActiveTab('zonasi')}
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white hover:bg-emerald-50/60 border border-slate-200/80 hover:border-emerald-300 shadow-2xs hover:shadow-md transition-all group cursor-pointer text-center"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-1.5 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">PPDB 2026</span>
            <span className="text-[10px] text-slate-500">Jalur & Syarat</span>
          </button>

          {/* 4. Peta Zonasi */}
          <button
            id="quick-shortcut-zonasi"
            onClick={() => setActiveTab('zonasi')}
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white hover:bg-rose-50/60 border border-slate-200/80 hover:border-rose-300 shadow-2xs hover:shadow-md transition-all group cursor-pointer text-center"
          >
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center mb-1.5 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 group-hover:text-rose-700">Peta Zonasi</span>
            <span className="text-[10px] text-slate-500">Cek Jarak Rumah</span>
          </button>

          {/* 5. Beasiswa */}
          <button
            id="quick-shortcut-beasiswa"
            onClick={() => setActiveTab('beasiswa')}
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white hover:bg-amber-50/60 border border-slate-200/80 hover:border-amber-300 shadow-2xs hover:shadow-md transition-all group cursor-pointer text-center"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-1.5 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 group-hover:text-amber-700">Beasiswa</span>
            <span className="text-[10px] text-slate-500">Garut & KIP-K</span>
          </button>

          {/* 6. Kalender */}
          <button
            id="quick-shortcut-kalender"
            onClick={() => setActiveTab('kalender')}
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white hover:bg-purple-50/60 border border-slate-200/80 hover:border-purple-300 shadow-2xs hover:shadow-md transition-all group cursor-pointer text-center"
          >
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-1.5 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
              <CalendarDays className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 group-hover:text-purple-700">Kalender</span>
            <span className="text-[10px] text-slate-500">Agenda & Ujian</span>
          </button>

          {/* 7. Tanya Sekolah */}
          <button
            id="quick-shortcut-tanya"
            onClick={() => setActiveTab('tanya')}
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white hover:bg-cyan-50/60 border border-slate-200/80 hover:border-cyan-300 shadow-2xs hover:shadow-md transition-all group cursor-pointer text-center"
          >
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center mb-1.5 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 group-hover:text-cyan-700">Tanya Sekolah</span>
            <span className="text-[10px] text-slate-500">Tanya Operator</span>
          </button>

        </div>
      </div>

      {/* 📊 RECHARTS DATA VISUALIZATION SECTION: STATISTIK SEKOLAH, ZONASI & BEASISWA */}
      <HomeAnalyticsCharts 
        onNavigateToSchools={() => setActiveTab('sekolah')}
        onNavigateToZonasi={() => setActiveTab('zonasi')}
        onNavigateToScholarships={() => setActiveTab('beasiswa')}
      />

      {/* 📅 BENTO SECOND ROW: JADWAL & ZONASI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Bento Col 7: Timeline Jadwal Penting */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                  <CalendarDays className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 font-['Outfit',sans-serif]">
                  Jadwal Pendidikan Terdekat di Garut
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('kalender')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {upcomingEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-start justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/70 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center justify-center px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs min-w-[48px] text-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {new Date(ev.tanggal).toLocaleString('id-ID', { month: 'short' })}
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-blue-700 leading-tight">
                        {new Date(ev.tanggal).getDate()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          ev.kategori === 'PPDB' ? 'bg-blue-100 text-blue-800' :
                          ev.kategori === 'Beasiswa' ? 'bg-amber-100 text-amber-800' :
                          ev.kategori === 'Libur' ? 'bg-rose-100 text-rose-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {ev.kategori}
                        </span>
                        <span className="text-[11px] text-slate-500">{ev.jenjangTerkait}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 mt-1">{ev.judul}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{ev.deskripsi}</p>
                    </div>
                  </div>

                  {ev.penting && (
                    <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-extrabold shrink-0">
                      Penting
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bento Col 5: Info Zonasi Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-800 rounded-3xl p-6 text-white shadow-md flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-3 border border-white/20">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>Sistem Zonasi Resmi 2026</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold leading-snug font-['Outfit',sans-serif]">
              Cek Sekolah Masuk Zonasi Alamatmu
            </h3>
            <p className="text-xs text-emerald-100 mt-2 leading-relaxed">
              Zonasi SD 70%, SMP 50%, SMA 50%. Masukkan kecamatan atau desa tempat tinggalmu untuk melihat daftar sekolah zonasi terdekat beserta radius jaraknya.
            </p>

            <div className="mt-4 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2 text-xs text-emerald-50">
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <span>Zonasi SD Negeri</span>
                <span className="font-bold text-white">Min. 70% Kuota</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <span>Zonasi SMP Negeri</span>
                <span className="font-bold text-white">Min. 50% Kuota</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Zonasi SMA Negeri</span>
                <span className="font-bold text-white">Min. 50% Kuota</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/20">
            <button
              id="home-check-zonasi-btn"
              onClick={() => setActiveTab('zonasi')}
              className="w-full py-2.5 px-4 bg-white hover:bg-emerald-50 text-emerald-900 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Cek Radius & Zonasi Saya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* 📊 BENTO THIRD ROW: DIREKTORI SEKOLAH TERPILIH */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-['Outfit',sans-serif] flex items-center gap-2">
              <SchoolIcon className="w-5 h-5 text-blue-600" />
              <span>Direktori Sekolah Terpilih Kabupaten Garut</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Menampilkan {filteredSchools.length} sekolah terakreditasi di Kabupaten Garut
            </p>
          </div>

          {/* Jenjang Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {['Semua', 'PAUD/TK', 'SD', 'SMP', 'SMA', 'SMK', 'SLB'].map((jenjang) => (
              <button
                key={jenjang}
                id={`home-filter-jenjang-${jenjang.replace('/', '-')}`}
                onClick={() => setSelectedFilterJenjang(jenjang)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedFilterJenjang === jenjang
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {jenjang}
              </button>
            ))}
          </div>
        </div>

        {/* Schools Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {featuredSchools.map((school) => {
            const isFavorited = userProfile.favoritSekolah.includes(school.id);
            return (
              <div
                key={school.id}
                className="flex flex-col justify-between bg-slate-50/80 hover:bg-white rounded-2xl border border-slate-200/80 hover:border-blue-300 shadow-2xs hover:shadow-md transition-all overflow-hidden group"
              >
                {/* Banner & Badges */}
                <div className="relative h-32 w-full overflow-hidden bg-slate-200">
                  <img
                    src={school.bannerImg}
                    alt={school.nama}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                  
                  {/* Akreditasi Badge */}
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-600 text-white text-[10px] font-extrabold shadow-sm flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Akreditasi {school.akreditasi}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                      {school.status}
                    </span>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavoritSekolah(school.id);
                    }}
                    className={`absolute top-2 right-2 p-1.5 rounded-xl backdrop-blur-md transition-all ${
                      isFavorited
                        ? 'bg-rose-500 text-white'
                        : 'bg-white/70 text-slate-700 hover:bg-white'
                    }`}
                    title="Simpan Favorit"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  {/* School Jenjang Chip */}
                  <div className="absolute bottom-2 left-2">
                    <span className="text-white font-extrabold text-xs px-2 py-0.5 rounded-md bg-blue-600/90 backdrop-blur-xs">
                      {school.jenjang}
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {school.nama}
                    </h3>
                    
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{school.kecamatan}, Garut</span>
                    </div>

                    <div className="mt-3 space-y-1 text-[11px] text-slate-600">
                      <div className="flex items-center justify-between py-0.5 border-b border-slate-200/60">
                        <span className="text-slate-500">Kurikulum:</span>
                        <span className="font-semibold">{school.kurikulum.replace('Kurikulum ', '')}</span>
                      </div>
                      <div className="flex items-center justify-between py-0.5 border-b border-slate-200/60">
                        <span className="text-slate-500">Total Kuota:</span>
                        <span className="font-bold text-blue-700">{school.kuotaPPDB.total} Kursi</span>
                      </div>
                    </div>

                    {/* Keunggulan 1 item */}
                    {school.keunggulan[0] && (
                      <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-xl mt-2 line-clamp-1 border border-emerald-100 font-medium">
                        ✨ {school.keunggulan[0]}
                      </p>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="mt-4 pt-2">
                    <button
                      onClick={() => onSelectSchool(school)}
                      className="w-full py-2 px-3 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Lihat Detail Sekolah</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Schools Button */}
        <div className="mt-5 pt-3 border-t border-slate-100 text-center">
          <button
            onClick={() => setActiveTab('sekolah')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
          >
            <span>Buka Direktori Lengkap ({schools.length} Sekolah di Garut)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 🎓 BENTO FOURTH ROW: BEASISWA & PELATIHAN KERJA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Beasiswa Terbuka Bento Tile */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 font-['Outfit',sans-serif]">
                  Beasiswa Sedang Dibuka
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('beasiswa')}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {activeScholarships.map((sch) => (
                <div
                  key={sch.id}
                  onClick={() => onSelectScholarship(sch)}
                  className="p-3.5 rounded-2xl bg-amber-50/40 hover:bg-amber-50/90 border border-amber-200/70 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white">
                      🟢 DIBUKA
                    </span>
                    <span className="text-[11px] text-amber-900 font-semibold">
                      Batas: {new Date(sch.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 mt-1.5 group-hover:text-blue-600 transition-colors">
                    {sch.nama}
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Pemberi: <span className="font-semibold text-slate-800">{sch.pemberi}</span>
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-amber-200/50 text-xs">
                    <span className="font-extrabold text-blue-700 text-xs">{sch.besarBantuan}</span>
                    <span className="text-[11px] text-blue-600 font-bold group-hover:underline flex items-center gap-0.5">
                      Syarat & Pendaftaran &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-600 font-medium">Bantuan kuliah KIP-K atau Baznas Garut?</span>
              <button
                onClick={() => setActiveTab('beasiswa')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                Cek Beasiswa &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Pelatihan Kesiapan Kerja & BLK Garut Bento Tile */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                  <Wrench className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 font-['Outfit',sans-serif]">
                  Pelatihan Keterampilan & BLK Garut
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('pelatihan')}
                className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {/* Highlight 1: BLK Garut IT */}
              <div 
                onClick={() => setActiveTab('pelatihan')}
                className="p-3.5 rounded-2xl bg-purple-50/40 hover:bg-purple-50/90 border border-purple-200/70 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-600 text-white">
                    GRATIS PEMKAB GARUT
                  </span>
                  <span className="text-[10px] text-purple-900 font-bold">Sertifikat BNSP</span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 mt-1.5">
                  Pelatihan Komputer Administrasi & Digital Office
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  UPTD BLK Disnakertrans Garut • Tarogong Kidul
                </p>
                <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                  ✓ Uang saku harian + makan siang + seragam gratis
                </p>
              </div>

              {/* Highlight 2: Sentra Kulit Sukaregang */}
              <div 
                onClick={() => setActiveTab('pelatihan')}
                className="p-3.5 rounded-2xl bg-purple-50/40 hover:bg-purple-50/90 border border-purple-200/70 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white">
                    KERAJINAN KHAS GARUT
                  </span>
                  <span className="text-[10px] text-purple-900 font-bold">1 Bulan Pelatihan</span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 mt-1.5">
                  Desain & Pembuatan Produk Kulit Sukaregang Premium
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Sentra Kulit Sukaregang • Garut Kota
                </p>
                <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                  ✓ Peluang langsung ekspor dan wirausaha mandiri
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('karir')}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Ikuti Tes Minat & Bakat Masa Depan Garut &rarr;</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
