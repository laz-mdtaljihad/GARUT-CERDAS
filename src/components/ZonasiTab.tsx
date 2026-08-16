import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Search, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  HelpCircle, 
  Phone, 
  ExternalLink, 
  CheckSquare, 
  Square,
  Compass,
  ArrowRight,
  ShieldAlert,
  School as SchoolIcon,
  Layers,
  ChevronRight
} from 'lucide-react';
import { garutZonasiData, garutPPDBRules } from '../data/zonasiData';
import { School, UserProfile } from '../types';

interface ZonasiTabProps {
  schools: School[];
  userProfile: UserProfile;
  onSelectSchool: (school: School) => void;
}

export const ZonasiTab: React.FC<ZonasiTabProps> = ({
  schools,
  userProfile,
  onSelectSchool
}) => {
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>(userProfile.kecamatanDomisili || 'Garut Kota');
  const [selectedKelurahan, setSelectedKelurahan] = useState<string>('');
  const [addressInput, setAddressInput] = useState<string>('');
  const [activeJenjangTab, setActiveJenjangTab] = useState<'PAUD/TK' | 'SD/MI' | 'SMP/MTs' | 'SMA/MA' | 'SMK' | 'SLB'>('SMP/MTs');
  
  // Document checklist state
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    'Akta Kelahiran / Surat Keterangan Lahir': true,
    'Kartu Keluarga (KK) Kabupaten Garut': true,
    'KTP Asli Kedua Orang Tua / Wali': true
  });

  const toggleDocCheck = (docName: string) => {
    setCheckedDocs(prev => ({
      ...prev,
      [docName]: !prev[docName]
    }));
  };

  // Find subdistrict data
  const currentSubdistrict = garutZonasiData.find(z => z.kecamatan === selectedKecamatan) || garutZonasiData[0];

  // Helper distance function (Haversine)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Number((R * c).toFixed(1));
  };

  // Match schools in this subdistrict
  const matchedSchools = useMemo(() => {
    return schools
      .filter(s => {
        if (activeJenjangTab === 'PAUD/TK' && !(s.jenjang === 'PAUD' || s.jenjang === 'TK')) return false;
        if (activeJenjangTab === 'SD/MI' && !(s.jenjang === 'SD' || s.jenjang === 'MI')) return false;
        if (activeJenjangTab === 'SMP/MTs' && !(s.jenjang === 'SMP' || s.jenjang === 'MTs')) return false;
        if (activeJenjangTab === 'SMA/MA' && !(s.jenjang === 'SMA' || s.jenjang === 'MA')) return false;
        if (activeJenjangTab === 'SMK' && s.jenjang !== 'SMK') return false;
        if (activeJenjangTab === 'SLB' && s.jenjang !== 'SLB') return false;

        const dist = s.koordinat
          ? calculateDistance(
              currentSubdistrict.koordinatPusat.lat,
              currentSubdistrict.koordinatPusat.lng,
              s.koordinat.lat,
              s.koordinat.lng
            )
          : (s.jarakKm || 5.0);

        // School is in selected subdistrict or close within zonasi boundary radius
        return s.kecamatan === selectedKecamatan || dist <= 6.0;
      })
      .map(s => {
        const computedDist = s.koordinat
          ? calculateDistance(
              currentSubdistrict.koordinatPusat.lat,
              currentSubdistrict.koordinatPusat.lng,
              s.koordinat.lat,
              s.koordinat.lng
            )
          : (s.jarakKm || 2.0);

        return {
          ...s,
          jarakKm: s.kecamatan === selectedKecamatan ? Math.min(computedDist, 3.5) : computedDist
        };
      })
      .sort((a, b) => {
        // Priority to schools within exact subdistrict first
        if (a.kecamatan === selectedKecamatan && b.kecamatan !== selectedKecamatan) return -1;
        if (a.kecamatan !== selectedKecamatan && b.kecamatan === selectedKecamatan) return 1;
        return (a.jarakKm || 0) - (b.jarakKm || 0);
      });
  }, [schools, activeJenjangTab, selectedKecamatan, currentSubdistrict]);

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200 mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>Modul 2 • Sistem Zonasi & PPDB Garut 2026</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
          Panduan Pendaftaran & Peta Zonasi Garut
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Simulasikan kelayakan zonasi dari alamat tempat tinggalmu, cek kuota resmi, jadwal pendaftaran, dan daftar berkas wajib PPDB Dinas Pendidikan Kabupaten Garut.
        </p>
      </div>

      {/* 🗺️ INTERACTIVE ZONASI SIMULATOR & CALCULATOR */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-2xl bg-rose-100 text-rose-700">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                Simulasi Kelayakan Zonasi Tempat Tinggal
              </h2>
              <p className="text-xs text-slate-500">Pilih kecamatan & desa tempat tinggal pada Kartu Keluarga (KK)</p>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-5">
          
          {/* 1. Kecamatan */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              1. Kecamatan Domisili KK:
            </label>
            <select
              id="zonasi-kecamatan-select"
              value={selectedKecamatan}
              onChange={(e) => {
                setSelectedKecamatan(e.target.value);
                setSelectedKelurahan('');
              }}
              className="w-full text-xs font-bold p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
            >
              {garutZonasiData.map(z => (
                <option key={z.kecamatan} value={z.kecamatan}>
                  Kecamatan {z.kecamatan}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Kelurahan / Desa */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              2. Kelurahan / Desa:
            </label>
            <select
              id="zonasi-kelurahan-select"
              value={selectedKelurahan}
              onChange={(e) => setSelectedKelurahan(e.target.value)}
              className="w-full text-xs font-bold p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
            >
              <option value="">-- Pilih Desa/Kelurahan --</option>
              {currentSubdistrict.kelurahanDesa.map(desa => (
                <option key={desa} value={desa}>
                  Desa / Kel. {desa}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Alamat Lengkap / Jalan */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              3. Alamat Lengkap / Nama Jalan (Opsional):
            </label>
            <input
              type="text"
              placeholder="Contoh: Jl. Cimanuk No. 45 / Kp. Sukamaju..."
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              className="w-full text-xs font-medium p-3 bg-slate-50 rounded-2xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-500 placeholder:text-slate-400"
            />
          </div>

        </div>

        {/* Jenjang Switcher for Zonasi Results */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-bold text-slate-700">Pilih Jenjang Sekolah Target:</span>
          
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 flex-wrap">
            {(['PAUD/TK', 'SD/MI', 'SMP/MTs', 'SMA/MA', 'SMK', 'SLB'] as const).map((jenjang) => (
              <button
                key={jenjang}
                id={`zonasi-tab-jenjang-${jenjang.replace('/', '-')}`}
                onClick={() => setActiveJenjangTab(jenjang)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeJenjangTab === jenjang
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {jenjang}
              </button>
            ))}
          </div>
        </div>

        {/* Zonasi Matched Results */}
        <div className="mt-5 space-y-3">
          <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-rose-950 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-rose-600" />
              <span>
                Menampilkan sekolah yang berada dalam <strong>Zona Wilayah {selectedKecamatan}</strong> {selectedKelurahan ? `(${selectedKelurahan})` : ''}
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[11px] font-extrabold">
              {matchedSchools.length} Sekolah Terdekat
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {matchedSchools.map((school) => (
              <div
                key={school.id}
                onClick={() => onSelectSchool(school)}
                className="p-4 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-rose-300 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-extrabold">
                      Dalam Zona Resmi
                    </span>
                    <span className="text-[11px] text-slate-500 font-bold">
                      ~{school.jarakKm || '1.5'} km
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors mt-2">
                    {school.nama}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{school.alamat}</p>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Kuota Zonasi:</span>
                    <span className="font-extrabold text-rose-700">{school.kuotaPPDB.zonasi} Kursi ({school.jenjang === 'SD' ? '70%' : '50%'})</span>
                  </div>
                </div>

                <div className="mt-3 pt-2">
                  <span className="text-xs font-bold text-blue-600 group-hover:underline flex items-center gap-1">
                    <span>Lihat Rincian Kuota & Syarat</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 📋 JADWAL LENGKAP & JALUR PENDAFTARAN PPDB 2026 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Left: Jadwal Tahap PPDB */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
              Jadwal Resmi Seluruh Tahap PPDB Garut 2026
            </h3>
          </div>

          <div className="mt-4 space-y-4">
            {garutPPDBRules.tahapPPDB.map((t, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-blue-900 uppercase tracking-wide">
                    {t.tahap}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold">
                    Disdik Garut
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2 bg-white rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-semibold">PENDAFTARAN</span>
                    <span className="font-bold text-slate-800">{t.pendaftaran}</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-semibold">VERIFIKASI DATA</span>
                    <span className="font-bold text-slate-800">{t.verifikasi}</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-semibold">PENGUMUMAN HASIL</span>
                    <span className="font-bold text-blue-700">{t.pengumuman}</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-semibold">DAFTAR ULANG</span>
                    <span className="font-bold text-emerald-700">{t.daftarUlang}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Jalur & Kuota Pendaftaran */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
              4 Jalur Pendaftaran & Pembagian Kuota
            </h3>
          </div>

          <div className="mt-4 space-y-3">
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-blue-900">1. Jalur Zonasi (Jarak Domisili)</span>
                <span className="text-xs font-extrabold bg-blue-600 text-white px-2 py-0.5 rounded-md">SD 70% | SMP/SMA 50%</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Diperuntukkan bagi peserta didik yang berdomisili di dalam wilayah zonasi yang ditetapkan Pemkab Garut berdasarkan alamat pada Kartu Keluarga (KK).
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-emerald-900">2. Jalur Prestasi</span>
                <span className="text-xs font-extrabold bg-emerald-600 text-white px-2 py-0.5 rounded-md">SMP 30% | SMA 25%</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Berdasarkan nilai akumulasi rapor 5 semester dan/atau sertifikat prestasi kejuaraan akademik (OSN), olahraga (O2SN), seni (FLS2N), dan Tahfidz Quran.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-amber-900">3. Jalur Afirmasi (KETM & Disabilitas)</span>
                <span className="text-xs font-extrabold bg-amber-600 text-white px-2 py-0.5 rounded-md">Kuota 15% – 20%</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Dikhususkan untuk keluarga ekonomi tidak mampu pemegang kartu KIP/PKH/DTKS dan peserta didik berkebutuhan khusus (PDBK).
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-purple-900">4. Perpindahan Tugas Orang Tua & GTK</span>
                <span className="text-xs font-extrabold bg-purple-600 text-white px-2 py-0.5 rounded-md">Kuota 5%</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Bagi orang tua/wali yang mengalami mutasi kerja instansi resmi ke Garut dan kuota anak pendidik/tenaga kependidikan.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 📑 SYARAT DOKUMEN CHECKLIST INTERAKTIF */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Outfit',sans-serif] flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Checklist Dokumen Wajib Persiapan PPDB 2026</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Centang dokumen yang sudah siap agar tidak ada berkas yang tertinggal saat pendaftaran.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">
              Kesiapan: {Object.values(checkedDocs).filter(Boolean).length} / {garutPPDBRules.dokumenWajib.length} Dokumen
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
          {garutPPDBRules.dokumenWajib.map((doc, idx) => {
            const isChecked = !!checkedDocs[doc.nama];
            return (
              <div
                key={idx}
                onClick={() => toggleDocCheck(doc.nama)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                  isChecked 
                    ? 'bg-blue-50/70 border-blue-300 text-blue-950' 
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="mt-0.5 text-blue-600">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isChecked ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {doc.nama}
                    </span>
                    {doc.wajib && (
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-rose-100 text-rose-800">
                        WAJIB
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{doc.deskripsi}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🧭 LANGKAH DEMI LANGKAH DAFTAR & HELPDESK DISDIK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Alur Pendaftaran 5 Langkah */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
          <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif] mb-4">
            Alur 5 Langkah Pendaftaran PPDB Garut (Online & Loket)
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">1</span>
              <div>
                <h4 className="font-bold text-slate-800">Pembuatan Akun & Registrasi Data</h4>
                <p className="text-slate-500 mt-0.5">Siswa/Orang tua mendaftar di portal resmi PPDB Disdik Garut menggunakan NISN dan NIK KK.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <h4 className="font-bold text-slate-800">Pemilihan Jalur & Sekolah Tujuan</h4>
                <p className="text-slate-500 mt-0.5">Pilih jalur pendaftaran (Zonasi/Prestasi/Afirmasi/Perpindahan) dan pilih maksimal 2 sekolah negeri tujuan.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <h4 className="font-bold text-slate-800">Unggah Dokumen / Verifikasi Loket</h4>
                <p className="text-slate-500 mt-0.5">Unggah scan KK, Akta, Rapor, atau serahkan berkas ke operator sekolah jika mendaftar langsung di loket.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <h4 className="font-bold text-slate-800">Pemantauan Skor Real-Time & Pengumuman</h4>
                <p className="text-slate-500 mt-0.5">Pantau posisi ranking jarak atau nilai rapor di portal hingga hari pengumuman hasil seleksi resmi.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0">5</span>
              <div>
                <h4 className="font-bold text-emerald-950">Daftar Ulang di Sekolah Penerima</h4>
                <p className="text-emerald-800 mt-0.5">Siswa yang dinyatakan lolos wajib melakukan daftar ulang fisik sesuai jadwal yang ditentukan.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Helpdesk Call Center Card */}
        <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-3xl p-5 text-white shadow-md flex flex-col justify-between">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider">
              Layanan Bantuan Resmi
            </span>
            <h3 className="text-lg font-extrabold mt-2 font-['Outfit',sans-serif]">
              Posko & Helpdesk PPDB Disdik Garut
            </h3>
            <p className="text-xs text-blue-100 mt-1 leading-relaxed">
              Jika mengalami kendala data kependudukan (KK perbatasan), perbedaan titik koordinat, atau sertifikat prestasi:
            </p>

            <div className="mt-4 space-y-2 text-xs">
              <div className="p-2.5 bg-white/10 rounded-xl border border-white/15">
                <span className="text-[10px] text-blue-200 block">KANTOR RESMI DISDIK GARUT</span>
                <span className="font-bold">Jl. Pembangunan No. 179, Garut</span>
              </div>
              <div className="p-2.5 bg-white/10 rounded-xl border border-white/15">
                <span className="text-[10px] text-blue-200 block">CALL CENTER / WHATSAPP PPDB</span>
                <span className="font-bold">0812-2026-9999 / (0262) 233140</span>
              </div>
              <div className="p-2.5 bg-white/10 rounded-xl border border-white/15">
                <span className="text-[10px] text-blue-200 block">JAM OPERASIONAL</span>
                <span className="font-bold">Senin – Jumat: 08.00 – 16.00 WIB</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/20">
            <a
              href="https://ppdb.garutkab.go.id"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 bg-white text-blue-900 hover:bg-blue-50 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow transition-all"
            >
              <span>Buka Portal Resmi PPDB Garut</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};
