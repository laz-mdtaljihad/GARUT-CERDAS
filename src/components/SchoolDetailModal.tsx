import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Award, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Building2, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  ExternalLink,
  Layers,
  Sparkles,
  Compass,
  DollarSign
} from 'lucide-react';
import { School, UserProfile } from '../types';

interface SchoolDetailModalProps {
  school: School | null;
  onClose: () => void;
  userProfile: UserProfile;
  onToggleFavorit: (schoolId: string) => void;
  onOpenCompare: (school: School) => void;
  onAskSchool: (school: School) => void;
}

export const SchoolDetailModal: React.FC<SchoolDetailModalProps> = ({
  school,
  onClose,
  userProfile,
  onToggleFavorit,
  onOpenCompare,
  onAskSchool
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'profil' | 'fasilitas' | 'kuota' | 'prestasi' | 'biaya'>('profil');
  const [copied, setCopied] = useState(false);

  if (!school) return null;

  const isFavorited = userProfile.favoritSekolah.includes(school.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${school.nama} - Garut Cerdas`,
        text: `Lihat profil lengkap dan zonasi PPDB ${school.nama} di Garut Cerdas`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(school.nama + ' ' + school.alamat)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        id="school-detail-modal-container"
        className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
      >
        {/* Modal Header & Hero Image */}
        <div className="relative h-48 sm:h-56 w-full shrink-0 overflow-hidden bg-slate-900">
          <img 
            src={school.bannerImg} 
            alt={school.nama} 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>

          {/* Top Controls */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5">
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-extrabold text-xs shadow-md">
                {school.jenjang} • {school.status}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-extrabold text-xs shadow-md flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Akreditasi {school.akreditasi}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 backdrop-blur-md transition-all shadow-md"
                title="Bagikan"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggleFavorit(school.id)}
                className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                  isFavorited ? 'bg-rose-500 text-white' : 'bg-white/80 hover:bg-white text-slate-800'
                }`}
                title="Favoritkan"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 backdrop-blur-md transition-all shadow-md"
                title="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* School Name & NPSN Title in Hero */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <p className="text-xs text-blue-300 font-semibold tracking-wider">
              NPSN: {school.npsn} • {school.kecamatan}, Kabupaten Garut
            </p>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-['Outfit',sans-serif]">
              {school.nama}
            </h2>
          </div>
        </div>

        {/* Modal Navigation Sub-Tabs */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'profil', label: 'Profil & Visi Misi' },
            { id: 'kuota', label: 'Kuota PPDB & Zonasi' },
            { id: 'fasilitas', label: 'Fasilitas & Ekstra' },
            { id: 'prestasi', label: 'Daftar Prestasi' },
            { id: 'biaya', label: 'Biaya & Kurikulum' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeSubTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 text-slate-800">
          
          {/* Quick Contact & Address Bar */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
            <div className="flex items-start gap-2 text-slate-700">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold">{school.alamat}</span>
                <span className="text-slate-400 ml-1">({school.kodePos})</span>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
              >
                <span>Peta Google</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-200/60 text-slate-600">
              <div className="flex items-center gap-1.5 truncate">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{school.phone}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{school.email}</span>
              </div>
              {school.website && (
                <div className="flex items-center gap-1.5 truncate text-blue-600 font-medium">
                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a href={school.website} target="_blank" rel="noreferrer" className="hover:underline truncate">
                    Web Resmi
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* TAB 1: PROFIL & VISI MISI */}
          {activeSubTab === 'profil' && (
            <div className="space-y-4 animate-in fade-in duration-100">
              
              {/* Visi Misi */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">Visi Sekolah</h4>
                <p className="text-sm font-semibold text-slate-800 mt-1 italic leading-relaxed">
                  "{school.visi}"
                </p>
                
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mt-3.5">Misi Utama</h4>
                <ul className="mt-1 space-y-1.5 text-xs text-slate-700">
                  {school.misi.map((m, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-blue-200 text-blue-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Keunggulan Sekolah */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Keunggulan & Karakter Khusus</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {school.keunggulan.map((kg, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{kg}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Jurusan SMK jika ada */}
              {school.jurusanSMK && school.jurusanSMK.length > 0 && (
                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-purple-600" />
                    <span>Program Keahlian & Jurusan (Vokasi SMK)</span>
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {school.jurusanSMK.map((jur, i) => (
                      <span key={i} className="px-3 py-1 bg-white border border-purple-200 text-purple-900 rounded-xl text-xs font-bold shadow-2xs">
                        🎓 {jur}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Statistik Umum */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500">Rombongan Belajar</span>
                  <p className="text-lg font-extrabold text-blue-700">{school.rombel} Kelas</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500">Kapasitas Siswa</span>
                  <p className="text-lg font-extrabold text-blue-700">{school.kapasitasTotal}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500">Akreditasi Terakhir</span>
                  <p className="text-lg font-extrabold text-emerald-700">{school.akreditasi} ({school.akreditasiTahun})</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500">Pendaftar Thn Lalu</span>
                  <p className="text-lg font-extrabold text-slate-800">~{school.estimasiPendaftarTahunLalu}</p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: KUOTA PPDB & ZONASI */}
          {activeSubTab === 'kuota' && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div className="p-4 rounded-2xl bg-slate-900 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-blue-300 font-bold uppercase">Estimasi Daya Tampung PPDB 2026</span>
                    <h3 className="text-2xl font-extrabold font-['Outfit',sans-serif] mt-0.5">
                      {school.kuotaPPDB.total} Kuota Siswa Baru
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">
                    Tahun Ajaran 2026/2027
                  </span>
                </div>

                {/* Quota Distribution Bar */}
                <div className="mt-4 space-y-1.5">
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
                    <div 
                      style={{ width: `${(school.kuotaPPDB.zonasi / school.kuotaPPDB.total) * 100}%` }} 
                      className="bg-blue-500" 
                      title="Zonasi"
                    ></div>
                    <div 
                      style={{ width: `${(school.kuotaPPDB.prestasi / school.kuotaPPDB.total) * 100}%` }} 
                      className="bg-emerald-500" 
                      title="Prestasi"
                    ></div>
                    <div 
                      style={{ width: `${(school.kuotaPPDB.afirmasi / school.kuotaPPDB.total) * 100}%` }} 
                      className="bg-amber-500" 
                      title="Afirmasi"
                    ></div>
                    <div 
                      style={{ width: `${(school.kuotaPPDB.perpindahan / school.kuotaPPDB.total) * 100}%` }} 
                      className="bg-purple-500" 
                      title="Perpindahan"
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium pt-1">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span> Zonasi: {school.kuotaPPDB.zonasi}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> Prestasi: {school.kuotaPPDB.prestasi}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span> Afirmasi: {school.kuotaPPDB.afirmasi}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500 inline-block"></span> Mutasi: {school.kuotaPPDB.perpindahan}</span>
                  </div>
                </div>
              </div>

              {/* Rincian Tiap Jalur */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900">Jalur Zonasi Terdekat</span>
                    <span className="text-sm font-extrabold text-blue-700">{school.kuotaPPDB.zonasi} Kursi</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Berdasarkan jarak titik tempat tinggal (KK Garut minimal terbit 1 tahun) ke gerbang sekolah.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900">Jalur Prestasi</span>
                    <span className="text-sm font-extrabold text-emerald-700">{school.kuotaPPDB.prestasi} Kursi</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Nilai rapor 5 semester terakhir dan sertifikat juara OSN, FLS2N, O2SN, atau Tahfidz Quran.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900">Jalur Afirmasi (KETM)</span>
                    <span className="text-sm font-extrabold text-amber-700">{school.kuotaPPDB.afirmasi} Kursi</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Keluarga pemegang KIP/PKH atau terdaftar di Data Terpadu Kesejahteraan Sosial (DTKS).
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-900">Perpindahan Tugas / Anak Guru</span>
                    <span className="text-sm font-extrabold text-purple-700">{school.kuotaPPDB.perpindahan} Kursi</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Surat mutasi penugasan instansi resmi orang tua dan kuota pendidik/tenaga kependidikan.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FASILITAS & EKSTRA */}
          {activeSubTab === 'fasilitas' && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>Sarana & Fasilitas Sekolah</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {school.fasilitas.map((fas, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      <span>{fas}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Kegiatan Ekstrakurikuler</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {school.ekstrakurikuler.map((eks, i) => (
                    <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-xl text-xs font-semibold">
                      ⚽ {eks}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DAFTAR PRESTASI */}
          {activeSubTab === 'prestasi' && (
            <div className="space-y-3 animate-in fade-in duration-100">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Prestasi Terbaru & Rekam Jejak Juara</span>
              </h4>
              
              {school.prestasiList.map((pres, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-amber-50/50 border border-amber-200/80 flex items-start gap-3">
                  <div className="px-2.5 py-1 rounded-xl bg-amber-500 text-white font-extrabold text-xs shrink-0">
                    {pres.tahun}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.2 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                        Tingkat {pres.tingkat}
                      </span>
                      <span className="text-[11px] text-slate-500">{pres.kategori}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1">{pres.nama}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: BIAYA & KURIKULUM */}
          {activeSubTab === 'biaya' && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-700" />
                  <h4 className="text-sm font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
                    Informasi Biaya Pendidikan & SPP
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                  <div className="p-3 bg-white rounded-xl border border-emerald-100">
                    <span className="text-[11px] text-slate-500">Biaya Pendaftaran</span>
                    <p className="text-base font-extrabold text-emerald-700">
                      {school.biaya.pendaftaran === 0 ? 'GRATIS' : `Rp ${school.biaya.pendaftaran.toLocaleString('id-ID')}`}
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-emerald-100">
                    <span className="text-[11px] text-slate-500">SPP Bulanan</span>
                    <p className="text-base font-extrabold text-emerald-700">
                      {school.biaya.sppBulanan === 0 ? 'GRATIS (BOS)' : `Rp ${school.biaya.sppBulanan.toLocaleString('id-ID')}`}
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-emerald-100">
                    <span className="text-[11px] text-slate-500">Uang Gedung / Sarana</span>
                    <p className="text-base font-extrabold text-emerald-700">
                      {school.biaya.uangGedung === 0 ? 'GRATIS' : `Rp ${school.biaya.uangGedung.toLocaleString('id-ID')}`}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-emerald-900 mt-2 font-medium">
                  ℹ️ {school.biaya.keterangan}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Kurikulum yang Diterapkan</h4>
                <p className="text-sm font-bold text-slate-900 mt-1">{school.kurikulum}</p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Menerapkan pembelajaran berpusat pada peserta didik, penguatan literasi numerasi, dan Proyek Penguatan Profil Pelajar Pancasila (P5) berbasis keunggulan lokal Kabupaten Garut.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onOpenCompare(school);
                onClose();
              }}
              className="flex-1 sm:flex-initial px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Layers className="w-4 h-4" />
              <span>Bandingkan Sekolah</span>
            </button>

            <button
              onClick={() => {
                onAskSchool(school);
                onClose();
              }}
              className="flex-1 sm:flex-initial px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Tanya Sekolah</span>
            </button>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <MapPin className="w-4 h-4" />
            <span>Buka Navigasi Rute Maps</span>
          </a>
        </div>

      </div>
    </div>
  );
};
