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
  Sparkles
} from 'lucide-react';
import { UserProfile, School, Scholarship, ChildData } from '../types';
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
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  userProfile,
  onUpdateProfile,
  schools,
  scholarships,
  onSelectSchool,
  onSelectScholarship,
  onToggleFavoritSekolah,
  onToggleFavoritBeasiswa
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'profil' | 'favorit' | 'anak' | 'notifikasi'>('profil');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [nama, setNama] = useState(userProfile.nama);
  const [role, setRole] = useState(userProfile.role);
  const [kecamatan, setKecamatan] = useState(userProfile.kecamatanDomisili);
  const [notifPPDB, setNotifPPDB] = useState(userProfile.notifikasiAktif.ppdb);
  const [notifBeasiswa, setNotifBeasiswa] = useState(userProfile.notifikasiAktif.beasiswa);
  const [notifPengumuman, setNotifPengumuman] = useState(userProfile.notifikasiAktif.pengumuman);

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
  const favoritedSchools = schools.filter(s => userProfile.favoritSekolah.includes(s.id));
  const favoritedScholarships = scholarships.filter(s => userProfile.favoritBeasiswa.includes(s.id));

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-200">
      
      {/* Header Profile Card */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-2xl font-extrabold text-white shadow-md">
              {userProfile.nama.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold shadow-xs">
                  {userProfile.role}
                </span>
                <span className="text-xs text-blue-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  Kec. {userProfile.kecamatanDomisili}, Garut
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold mt-1 font-['Outfit',sans-serif]">
                {userProfile.nama}
              </h2>
              <p className="text-xs text-blue-100 mt-0.5">
                Pengguna Terdaftar • Portal Pendidikan Garut Cerdas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <div className="px-3 py-2 bg-white/10 rounded-2xl border border-white/20 text-center">
              <span className="text-[10px] text-blue-200 block">Favorit Tersimpan</span>
              <span className="text-sm font-extrabold text-white">
                {userProfile.favoritSekolah.length + userProfile.favoritBeasiswa.length} Item
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="bg-white rounded-2xl p-1.5 border border-slate-200/80 shadow-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {[
          { id: 'profil', label: 'Pengaturan Profil', icon: Settings },
          { id: 'favorit', label: `Tersimpan (${userProfile.favoritSekolah.length + userProfile.favoritBeasiswa.length})`, icon: Bookmark },
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

      {/* TAB 1: PENGATURAN PROFIL */}
      {activeSubTab === 'profil' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
              Data Identitas Pengguna & Domisili Garut
            </h3>
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
                <label className="block font-bold text-slate-700 mb-1">Peran / Status:</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full p-3 bg-slate-50 rounded-2xl border border-slate-200 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  <option value="Orang Tua">Orang Tua / Wali Murid</option>
                  <option value="Siswa">Siswa SD / SMP / SMA / SMK</option>
                  <option value="Guru">Guru / Tenaga Pendidik</option>
                  <option value="Mahasiswa">Mahasiswa / Calon Pendaftar Kerja</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kecamatan Domisili (Sesuai Kartu Keluarga):</label>
                <select
                  value={kecamatan}
                  onChange={(e) => setKecamatan(e.target.value)}
                  className="w-full p-3 bg-slate-50 rounded-2xl border border-slate-200 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  {garutZonasiData.map(z => (
                    <option key={z.kecamatan} value={z.kecamatan}>
                      Kecamatan {z.kecamatan}
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Kecamatan ini akan digunakan secara otomatis saat menghitung jarak & zonasi sekolah.
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xs transition-all"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: TERSIMPAN (FAVORIT) */}
      {activeSubTab === 'favorit' && (
        <div className="space-y-5">
          {/* Sekolah Tersimpan */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
            <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif] flex items-center gap-2 mb-4">
              <SchoolIcon className="w-5 h-5 text-blue-600" />
              <span>Sekolah yang Disimpan ({favoritedSchools.length})</span>
            </h3>

            {favoritedSchools.length === 0 ? (
              <p className="text-xs text-slate-500 p-4 bg-slate-50 rounded-2xl text-center">
                Belum ada sekolah yang difavoritkan. Klik ikon bookmark pada sekolah pilihanmu untuk menyimpannya di sini.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {favoritedSchools.map((school) => (
                  <div
                    key={school.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-bold">
                          {school.jenjang} • {school.status}
                        </span>
                        <button
                          onClick={() => onToggleFavoritSekolah(school.id)}
                          className="text-[11px] font-bold text-rose-600 hover:text-rose-700"
                        >
                          Hapus
                        </button>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 mt-2">{school.nama}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{school.kecamatan}, Garut</p>
                    </div>

                    <button
                      onClick={() => onSelectSchool(school)}
                      className="mt-3 w-full py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
                    >
                      Buka Detail
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Beasiswa Tersimpan */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
            <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif] flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-amber-600" />
              <span>Beasiswa yang Disimpan ({favoritedScholarships.length})</span>
            </h3>

            {favoritedScholarships.length === 0 ? (
              <p className="text-xs text-slate-500 p-4 bg-slate-50 rounded-2xl text-center">
                Belum ada beasiswa yang difavoritkan.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {favoritedScholarships.map((sch) => (
                  <div
                    key={sch.id}
                    className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                          {sch.status}
                        </span>
                        <button
                          onClick={() => onToggleFavoritBeasiswa(sch.id)}
                          className="text-[11px] font-bold text-rose-600 hover:text-rose-700"
                        >
                          Hapus
                        </button>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 mt-2">{sch.nama}</h4>
                      <p className="text-[11px] text-amber-900 font-bold mt-1">{sch.besarBantuan}</p>
                    </div>

                    <button
                      onClick={() => onSelectScholarship(sch)}
                      className="mt-3 w-full py-1.5 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700"
                    >
                      Buka Syarat
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
                Manajemen Jenjang Pendidikan Anak
              </h3>
              <p className="text-xs text-slate-500">Membantu memberikan rekomendasi zonasi dan beasiswa yang dipersonalisasi.</p>
            </div>
            <button
              onClick={() => setShowAddChild(!showAddChild)}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Anak</span>
            </button>
          </div>

          {/* Form Tambah Anak */}
          {showAddChild && (
            <form onSubmit={handleAddChild} className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3 text-xs">
              <h4 className="font-bold text-blue-950">Formulir Tambah Data Anak:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Anak:</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Muhammad Farhan"
                    value={newChildName}
                    onChange={(e) => setNewChildName(e.target.value)}
                    className="w-full p-2.5 bg-white rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Minat Utama / Cita-cita:</label>
                  <input
                    type="text"
                    placeholder="Contoh: Komputer & Robotik / Dokter"
                    value={newChildMinat}
                    onChange={(e) => setNewChildMinat(e.target.value)}
                    className="w-full p-2.5 bg-white rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jenjang Saat Ini:</label>
                  <select
                    value={newChildJenjang}
                    onChange={(e) => setNewChildJenjang(e.target.value as any)}
                    className="w-full p-2.5 bg-white rounded-xl border border-slate-300 font-bold"
                  >
                    <option value="SD">SD / MI (Tingkat Dasar)</option>
                    <option value="SMP">SMP / MTs (Tingkat Pertama)</option>
                    <option value="SMA">SMA / MA</option>
                    <option value="SMK">SMK</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Jenjang Berikutnya:</label>
                  <select
                    value={newChildTarget}
                    onChange={(e) => setNewChildTarget(e.target.value as any)}
                    className="w-full p-2.5 bg-white rounded-xl border border-slate-300 font-bold"
                  >
                    <option value="SMP">Masuk SMP Negeri / Swasta Garut</option>
                    <option value="SMA">Masuk SMA Negeri Garut</option>
                    <option value="SMK">Masuk SMK Vokasi Garut</option>
                    <option value="Kuliah">Kuliah Perguruan Tinggi</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddChild(false)}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-bold"
                >
                  Simpan Data Anak
                </button>
              </div>
            </form>
          )}

          {/* Children Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {children.map((ch) => (
              <div key={ch.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between">
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
