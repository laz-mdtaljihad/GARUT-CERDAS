import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Bookmark, 
  Users, 
  MapPin, 
  Bell, 
  ShieldCheck, 
  Download, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  School as SchoolIcon, 
  Award,
  ChevronRight,
  Sparkles,
  BookOpen,
  FileText,
  MessageSquare,
  Building2,
  Lock,
  LogOut,
  Mail,
  RefreshCw
} from 'lucide-react';
import { UserProfile, School, Scholarship, ChildData, UserRole } from '../types';
import { garutZonasiData } from '../data/zonasiData';

interface ProfileTabProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  schools: School[];
  scholarships: Scholarship[];
  onSelectSchool: (school: School) => void;
  onSelectScholarship: (scholarship: Scholarship) => void;
  onToggleFavoritSekolah: (id: string) => void;
  onToggleFavoritBeasiswa: (id: string) => void;
  onOpenAuthModal: () => void;
  onOpenAddSchool: () => void;
  onOpenAddModul: () => void;
  onOpenAddAnnouncement: () => void;
  modulCount?: number;
  announcementCount?: number;
  questionCount?: number;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  userProfile,
  onUpdateProfile,
  schools,
  scholarships,
  onSelectSchool,
  onSelectScholarship,
  onToggleFavoritSekolah,
  onToggleFavoritBeasiswa,
  onOpenAuthModal,
  onOpenAddSchool,
  onOpenAddModul,
  onOpenAddAnnouncement,
  modulCount = 0,
  announcementCount = 0,
  questionCount = 0
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'profil' | 'admin' | 'favorit' | 'anak' | 'notifikasi'>(
    userProfile.isAdmin ? 'admin' : 'profil'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [nama, setNama] = useState(userProfile.nama);
  const [role, setRole] = useState(userProfile.role);
  const [email, setEmail] = useState(userProfile.email || '');
  const [kecamatan, setKecamatan] = useState(userProfile.kecamatanDomisili);
  const [notifPPDB, setNotifPPDB] = useState(
    typeof userProfile.notifikasiAktif === 'object' ? userProfile.notifikasiAktif.ppdb : true
  );
  const [notifBeasiswa, setNotifBeasiswa] = useState(
    typeof userProfile.notifikasiAktif === 'object' ? userProfile.notifikasiAktif.beasiswa : true
  );
  const [notifPengumuman, setNotifPengumuman] = useState(
    typeof userProfile.notifikasiAktif === 'object' ? userProfile.notifikasiAktif.pengumuman : true
  );

  // Child data states
  const [children, setChildren] = useState<ChildData[]>(userProfile.dataAnak || []);
  const [showAddChild, setShowAddChild] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildJenjang, setNewChildJenjang] = useState<'SD' | 'SMP' | 'SMA' | 'SMK'>('SD');
  const [newChildTarget, setNewChildTarget] = useState<'SMP' | 'SMA' | 'SMK' | 'Kuliah'>('SMP');
  const [newChildMinat, setNewChildMinat] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...userProfile,
      nama,
      role,
      email,
      kecamatanDomisili: kecamatan,
      dataAnak: children,
      notifikasiAktif: {
        ppdb: notifPPDB,
        beasiswa: notifBeasiswa,
        pengumuman: notifPengumuman
      }
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName.trim()) return;

    const newChild: ChildData = {
      id: 'child-' + Date.now(),
      nama: newChildName.trim(),
      jenjangSekarang: newChildJenjang,
      targetJenjang: newChildTarget,
      minatUtama: newChildMinat.trim() || 'Teknologi & Sains'
    };

    const updatedChildren = [...children, newChild];
    setChildren(updatedChildren);
    onUpdateProfile({
      ...userProfile,
      dataAnak: updatedChildren
    });

    setNewChildName('');
    setNewChildMinat('');
    setShowAddChild(false);
  };

  const handleRemoveChild = (id: string) => {
    const updated = children.filter(c => c.id !== id);
    setChildren(updated);
    onUpdateProfile({
      ...userProfile,
      dataAnak: updated
    });
  };

  // Favorited entities
  const favoritedSchools = schools.filter(s => userProfile.favoritSekolah?.includes(s.id));
  const favoritedScholarships = scholarships.filter(s => userProfile.favoritBeasiswa?.includes(s.id));

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-200">
      
      {/* Header Profile Card */}
      <div className={`rounded-3xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden ${
        userProfile.isAdmin 
          ? 'bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 border border-emerald-500/30' 
          : 'bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl backdrop-blur-md border flex items-center justify-center text-2xl font-extrabold text-white shadow-md ${
              userProfile.isAdmin ? 'bg-emerald-500/30 border-emerald-300/40' : 'bg-white/20 border-white/30'
            }`}>
              {userProfile.isAdmin ? <ShieldCheck className="w-8 h-8 text-emerald-300" /> : userProfile.nama.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold shadow-xs ${
                  userProfile.isAdmin 
                    ? 'bg-amber-400 text-slate-950 font-black' 
                    : 'bg-emerald-500 text-white'
                }`}>
                  {userProfile.isAdmin ? 'ADMIN / OPERATOR DISDIK' : userProfile.role}
                </span>

                {userProfile.loginProvider === 'google' && (
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-blue-100 text-[10px] font-bold flex items-center gap-1">
                    <svg className="w-3 h-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Terverifikasi Gmail</span>
                  </span>
                )}

                <span className="text-xs text-blue-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  Kec. {userProfile.kecamatanDomisili}, Garut
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold mt-1 font-['Outfit',sans-serif]">
                {userProfile.nama}
              </h2>

              <p className="text-xs text-blue-100 mt-0.5 flex items-center gap-2">
                {userProfile.email && <span>{userProfile.email}</span>}
                {userProfile.nip && <span>• NIP: {userProfile.nip}</span>}
                {!userProfile.email && !userProfile.nip && <span>Pengguna Terdaftar • Portal Pendidikan Garut Cerdas</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {/* Tombol Ganti / Masuk Akun */}
            <button
              onClick={onOpenAuthModal}
              className="px-3.5 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl border border-white/30 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{userProfile.isAdmin ? 'Kelola Sesi Admin' : 'Ganti / Masuk Akun'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="bg-white rounded-2xl p-1.5 border border-slate-200/80 shadow-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {userProfile.isAdmin && (
          <button
            onClick={() => setActiveSubTab('admin')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeSubTab === 'admin'
                ? 'bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-xs'
                : 'text-emerald-800 hover:bg-emerald-50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Panel Kontrol Admin Disdik</span>
          </button>
        )}

        {[
          { id: 'profil', label: 'Pengaturan Profil', icon: Settings },
          { id: 'favorit', label: `Tersimpan (${(userProfile.favoritSekolah?.length || 0) + (userProfile.favoritBeasiswa?.length || 0)})`, icon: Bookmark },
          { id: 'anak', label: `Data Anak & Jenjang (${children.length})`, icon: Users },
          { id: 'notifikasi', label: 'Notifikasi & Pengingat', icon: Bell }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB ADMIN: PANEL KONTROL ADMIN DISDIK */}
      {activeSubTab === 'admin' && userProfile.isAdmin && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          {/* BANNER STATUS HAK AKSES */}
          <div className="p-5 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl shadow-md border border-emerald-500/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase">
                    Kewenangan Operator Aktif
                  </span>
                  <span className="text-xs text-emerald-200">{userProfile.instansiDinas || 'Dinas Pendidikan Kab. Garut'}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black font-['Outfit',sans-serif]">
                  Pusat Manajemen & Kontrol Data Pendidikan Garut
                </h3>
                <p className="text-xs text-emerald-100 mt-1 max-w-2xl leading-relaxed">
                  Anda memiliki otorisasi penuh untuk menerbitkan, mengubah kuota PPDB, memvalidasi modul ajar resmi BSKAP, memposting pengumuman dinas, dan menjawab pertanyaan masyarakat.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={onOpenAuthModal}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 cursor-pointer"
                >
                  Keluar dari Mode Admin
                </button>
              </div>
            </div>

            {/* RINGKASAN METRIK SISTEM */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-emerald-800/80">
              <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                <span className="text-[10px] text-emerald-200 uppercase font-bold block">Total Sekolah Terdata</span>
                <span className="text-xl font-black text-white">{schools.length} Sekolah</span>
              </div>

              <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                <span className="text-[10px] text-teal-200 uppercase font-bold block">Modul Ajar Terbit</span>
                <span className="text-xl font-black text-white">{modulCount} Modul</span>
              </div>

              <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                <span className="text-[10px] text-amber-200 uppercase font-bold block">Pengumuman Resmi</span>
                <span className="text-xl font-black text-white">{announcementCount} Siaran</span>
              </div>

              <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                <span className="text-[10px] text-rose-200 uppercase font-bold block">Tanya Jawab Masyarakat</span>
                <span className="text-xl font-black text-white">{questionCount} Pertanyaan</span>
              </div>
            </div>
          </div>

          {/* AKSI CEPAT ADMIN */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Aksi Cepat Pengelolaan Data (Admin Quick Actions):</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                id="btn-admin-add-school-profile"
                onClick={onOpenAddSchool}
                className="p-4 rounded-2xl bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200 text-left transition-all group cursor-pointer shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="font-extrabold text-xs sm:text-sm text-slate-900">Tambah Sekolah Baru</div>
                <p className="text-[11px] text-slate-600 mt-0.5">Daftarkan sekolah baru di 42 kecamatan Garut & atur kuota PPDB.</p>
              </button>

              <button
                id="btn-admin-add-modul-profile"
                onClick={onOpenAddModul}
                className="p-4 rounded-2xl bg-teal-50/80 hover:bg-teal-100/80 border border-teal-200 text-left transition-all group cursor-pointer shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="font-extrabold text-xs sm:text-sm text-slate-900">Terbitkan Modul Ajar</div>
                <p className="text-[11px] text-slate-600 mt-0.5">Unggah perangkat pembelajaran resmi BSKAP & Dapodik Garut.</p>
              </button>

              <button
                id="btn-admin-add-announcement-profile"
                onClick={onOpenAddAnnouncement}
                className="p-4 rounded-2xl bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200 text-left transition-all group cursor-pointer shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="font-extrabold text-xs sm:text-sm text-slate-900">Buat Pengumuman Disdik</div>
                <p className="text-[11px] text-slate-600 mt-0.5">Terbitkan surat edaran kadisdik, info juknis, atau libur.</p>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* TAB 1: PENGATURAN PROFIL */}
      {activeSubTab === 'profil' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
                Data Identitas Pengguna & Domisili Garut
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {userProfile.loginProvider === 'google' 
                  ? 'Akun tersinkronisasi dengan akun Google Gmail Anda.' 
                  : userProfile.isAdmin 
                  ? 'Akun terautentikasi sebagai Administrator Dinas Pendidikan.' 
                  : 'Atur identitas akun personal Anda.'}
              </p>
            </div>
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Data Berhasil Disimpan!
              </span>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap:</label>
                <input
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full p-3 bg-slate-50 rounded-2xl border border-slate-200 font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Alamat Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@gmail.com"
                  className="w-full p-3 bg-slate-50 rounded-2xl border border-slate-200 font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Peran / Status:</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full p-3 bg-slate-50 rounded-2xl border border-slate-200 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  <option value="Orang Tua">Orang Tua / Wali Murid</option>
                  <option value="Siswa">Siswa / Pelajar</option>
                  <option value="Calon Mahasiswa">Calon Mahasiswa / Alumni</option>
                  <option value="Pendidik">Guru / Pendidik</option>
                  <option value="Umum">Masyarakat Umum</option>
                  {userProfile.isAdmin && (
                    <>
                      <option value="Admin Disdik">Admin Utama Dinas Pendidikan</option>
                      <option value="Operator Sekolah">Operator Sekolah & SIMPPDB</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kecamatan Domisili (Garut):</label>
                <select
                  value={kecamatan}
                  onChange={(e) => setKecamatan(e.target.value)}
                  className="w-full p-3 bg-slate-50 rounded-2xl border border-slate-200 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  {garutZonasiData.map(z => (
                    <option key={z.kecamatan} value={z.kecamatan}>Kec. {z.kecamatan}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={onOpenAuthModal}
                className="px-4 py-2.5 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Masuk / Ganti Akun Google / Dinas</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: FAVORIT */}
      {activeSubTab === 'favorit' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
              Sekolah Tersimpan ({favoritedSchools.length})
            </h3>
            {favoritedSchools.length === 0 ? (
              <p className="text-xs text-slate-500 italic">Belum ada sekolah yang Anda simpan sebagai favorit.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {favoritedSchools.map(s => (
                  <div 
                    key={s.id}
                    onClick={() => onSelectSchool(s)}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 bg-slate-50/60 hover:bg-blue-50/40 cursor-pointer transition-all flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-bold">
                        {s.jenjang} • Akreditasi {s.akreditasi}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900 mt-1">{s.nama}</h4>
                      <p className="text-[11px] text-slate-500">Kec. {s.kecamatan}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavoritSekolah(s.id);
                      }}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl"
                      title="Hapus dari favorit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
              Beasiswa Tersimpan ({favoritedScholarships.length})
            </h3>
            {favoritedScholarships.length === 0 ? (
              <p className="text-xs text-slate-500 italic">Belum ada beasiswa yang Anda simpan sebagai favorit.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {favoritedScholarships.map(b => (
                  <div 
                    key={b.id}
                    onClick={() => onSelectScholarship(b)}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-amber-300 bg-slate-50/60 hover:bg-amber-50/40 cursor-pointer transition-all flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold">
                        {b.kategori}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900 mt-1">{b.nama}</h4>
                      <p className="text-[11px] text-slate-500">{b.penyelenggara}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavoritBeasiswa(b.id);
                      }}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl"
                      title="Hapus dari favorit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: DATA ANAK */}
      {activeSubTab === 'anak' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
                Data Anak & Rencana Kelanjutan Studi
              </h3>
              <p className="text-xs text-slate-500">Membantu sistem merekomendasikan sekolah zonasi dan jurusan yang tepat.</p>
            </div>
            <button
              onClick={() => setShowAddChild(!showAddChild)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Anak</span>
            </button>
          </div>

          {showAddChild && (
            <form onSubmit={handleAddChild} className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-3 text-xs">
              <h4 className="font-bold text-blue-900">Tambah Profil Anak Baru:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Lengkap Anak:</label>
                  <input
                    type="text"
                    required
                    value={newChildName}
                    onChange={(e) => setNewChildName(e.target.value)}
                    placeholder="Contoh: Rizky Pratama"
                    className="w-full p-2.5 bg-white rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jenjang Saat Ini:</label>
                  <select
                    value={newChildJenjang}
                    onChange={(e) => setNewChildJenjang(e.target.value as any)}
                    className="w-full p-2.5 bg-white rounded-xl border border-slate-300 text-xs font-bold"
                  >
                    <option value="SD">SD / MI</option>
                    <option value="SMP">SMP / MTs</option>
                    <option value="SMA">SMA / MA</option>
                    <option value="SMK">SMK</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Jenjang Berikutnya:</label>
                  <select
                    value={newChildTarget}
                    onChange={(e) => setNewChildTarget(e.target.value as any)}
                    className="w-full p-2.5 bg-white rounded-xl border border-slate-300 text-xs font-bold"
                  >
                    <option value="SMP">Masuk SMP</option>
                    <option value="SMA">Masuk SMA</option>
                    <option value="SMK">Masuk SMK (Kejuruan)</option>
                    <option value="Kuliah">Perguruan Tinggi / Vokasi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Minat / Cita-cita Utama:</label>
                <input
                  type="text"
                  value={newChildMinat}
                  onChange={(e) => setNewChildMinat(e.target.value)}
                  placeholder="Contoh: Teknologi Komputer, Pertanian Modern, Seni Desain, Kedokteran"
                  className="w-full p-2.5 bg-white rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddChild(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-blue-600 text-white font-bold"
                >
                  Simpan Profil Anak
                </button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {children.map(ch => (
              <div 
                key={ch.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-bold">
                      {ch.jenjangSekarang} &rarr; Target {ch.targetJenjang}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mt-1">{ch.nama}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Minat: {ch.minatUtama}</p>
                </div>
                <button
                  onClick={() => handleRemoveChild(ch.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: NOTIFIKASI */}
      {activeSubTab === 'notifikasi' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif] pb-3 border-b border-slate-100">
            Setelan Pengingat & Pemberitahuan
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block text-xs">Pengingat Jadwal PPDB & Zonasi</span>
                <span className="text-[11px] text-slate-500">Dapatkan notifikasi sebelum pendaftaran tahap 1 dan tahap 2 dibuka.</span>
              </div>
              <input
                type="checkbox"
                checked={notifPPDB}
                onChange={(e) => setNotifPPDB(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block text-xs">Pemberitahuan Beasiswa Garut Cerdas</span>
                <span className="text-[11px] text-slate-500">Notifikasi 7 hari sebelum batas akhir pengumpulan berkas beasiswa.</span>
              </div>
              <input
                type="checkbox"
                checked={notifBeasiswa}
                onChange={(e) => setNotifBeasiswa(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block text-xs">Surat Edaran Resmi Disdik Garut</span>
                <span className="text-[11px] text-slate-500">Informasi libur sekolah, pencairan BOS/PIP, dan edaran bupati.</span>
              </div>
              <input
                type="checkbox"
                checked={notifPengumuman}
                onChange={(e) => setNotifPengumuman(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>
          </div>
        </div>
      )}

    </div>
  );
};
