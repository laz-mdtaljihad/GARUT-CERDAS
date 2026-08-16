import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Search, 
  Filter, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Bookmark, 
  ChevronRight, 
  DollarSign, 
  Sparkles,
  ExternalLink,
  Users
} from 'lucide-react';
import { Scholarship, UserProfile } from '../types';

interface ScholarshipsTabProps {
  scholarships: Scholarship[];
  userProfile: UserProfile;
  onSelectScholarship: (scholarship: Scholarship) => void;
  onToggleFavorit: (id: string) => void;
}

export const ScholarshipsTab: React.FC<ScholarshipsTabProps> = ({
  scholarships,
  userProfile,
  onSelectScholarship,
  onToggleFavorit
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState<string>('Semua');
  const [selectedJenjang, setSelectedJenjang] = useState<string>('Semua');
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua');

  // Filter scholarships
  const filteredScholarships = useMemo(() => {
    return scholarships.filter(sch => {
      // Search
      const matchesSearch = 
        sch.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sch.pemberi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sch.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sch.kategori.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Kategori
      if (selectedKategori !== 'Semua' && sch.kategori !== selectedKategori) return false;

      // Status
      if (selectedStatus !== 'Semua' && sch.status !== selectedStatus) return false;

      // Jenjang
      if (selectedJenjang !== 'Semua') {
        const hasJenjang = sch.jenjang.some(j => j.toLowerCase().includes(selectedJenjang.toLowerCase()));
        if (!hasJenjang) return false;
      }

      return true;
    });
  }, [scholarships, searchQuery, selectedKategori, selectedJenjang, selectedStatus]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedKategori('Semua');
    setSelectedJenjang('Semua');
    setSelectedStatus('Semua');
  };

  const isFiltered = searchQuery !== '' || selectedKategori !== 'Semua' || selectedJenjang !== 'Semua' || selectedStatus !== 'Semua';

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200 mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>Modul 3 • Direktori Beasiswa & Bantuan Biaya Pendidikan</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
          Daftar Beasiswa Kabupaten Garut & Nasional
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Temukan peluang beasiswa Pemkab Garut Cerdas, KIP Kuliah, beasiswa tahfidz, Baznas Garut, dan CSR pendidikan untuk siswa SD, SMP, SMA/SMK hingga jenjang kuliah.
        </p>

        {/* Search Bar */}
        <div className="mt-5 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="scholarships-search-input"
            type="text"
            placeholder="Cari nama beasiswa, pemberi dana (cth: Pemkab Garut, Baznas, Djarum, KIP Kuliah)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 text-sm font-medium rounded-2xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Multi-Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-3 pt-3 border-t border-slate-100">
          
          {/* Status Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Status Pendaftaran:</label>
            <select
              id="filter-scholarship-status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="Semua">Semua Status</option>
              <option value="Buka">🟢 Sedang Buka</option>
              <option value="Segera">🔵 Segera Dibuka</option>
              <option value="Tutup">🔴 Sudah Ditutup</option>
            </select>
          </div>

          {/* Jenjang Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Sasaran Jenjang:</label>
            <select
              id="filter-scholarship-jenjang"
              value={selectedJenjang}
              onChange={(e) => setSelectedJenjang(e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="Semua">Semua Jenjang</option>
              <option value="TK">PAUD & TK</option>
              <option value="SD">SD / MI</option>
              <option value="SMP">SMP / MTs</option>
              <option value="SMA">SMA / SMK / MA</option>
              <option value="SLB">SLB / Disabilitas</option>
              <option value="S1">D3 / S1 (Kuliah)</option>
              <option value="S2">S2 / Pascasarjana</option>
            </select>
          </div>

          {/* Kategori Filter */}
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Kategori Beasiswa:</label>
            <select
              id="filter-scholarship-kategori"
              value={selectedKategori}
              onChange={(e) => setSelectedKategori(e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="Semua">Semua Kategori</option>
              <option value="Pemerintah Garut">Pemerintah Garut (Garut Cerdas)</option>
              <option value="KIP / Kemdikbud">KIP / Kemdikbud PIP</option>
              <option value="Prestasi">Prestasi Akademik / Olahraga</option>
              <option value="Keagamaan">Tahfidz & Keagamaan / Baznas</option>
              <option value="Swasta / CSR">Swasta & Yayasan / CSR</option>
            </select>
          </div>

        </div>

        {/* Counter & Reset */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs">
          <span className="font-bold text-slate-700">
            Ditemukan <span className="text-amber-600">{filteredScholarships.length}</span> peluang beasiswa
          </span>
          {isFiltered && (
            <button
              onClick={resetFilters}
              className="text-[11px] font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Scholarships Card List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredScholarships.map((sch) => {
          const isFavorited = userProfile.favoritBeasiswa.includes(sch.id);
          return (
            <div
              key={sch.id}
              onClick={() => onSelectScholarship(sch)}
              className="flex flex-col justify-between bg-white hover:bg-amber-50/20 rounded-3xl border border-slate-200/90 hover:border-amber-400 shadow-xs hover:shadow-lg transition-all p-5 cursor-pointer group"
            >
              <div>
                {/* Top Tags & Bookmark */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold shadow-2xs ${
                      sch.status === 'Buka' ? 'bg-emerald-600 text-white' :
                      sch.status === 'Segera' ? 'bg-blue-600 text-white' :
                      'bg-slate-700 text-slate-200'
                    }`}>
                      {sch.status === 'Buka' ? '🟢 DIBUKA' : sch.status === 'Segera' ? '🔵 SEGERA' : '🔴 DITUTUP'}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold">
                      {sch.kategori}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorit(sch.id);
                    }}
                    className={`p-1.5 rounded-xl transition-all ${
                      isFavorited ? 'bg-rose-500 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                    title="Favoritkan"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>

                {/* Title & Organization */}
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-amber-600 transition-colors mt-3 line-clamp-2">
                  {sch.nama}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Penyelenggara: <strong className="text-slate-800">{sch.pemberi}</strong>
                </p>

                {/* Benefit Box */}
                <div className="mt-3 p-3 rounded-2xl bg-amber-50/80 border border-amber-200/70">
                  <span className="text-[10px] text-amber-800 font-bold block uppercase">BANTUAN YANG DIBERIKAN</span>
                  <p className="text-sm font-extrabold text-amber-950 mt-0.5">{sch.besarBantuan}</p>
                </div>

                {/* Target Jenjang */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {sch.jenjang.map((j, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-bold">
                      {j}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deadline & Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-[10px] text-slate-400 block font-medium">BATAS WAKTU</span>
                  <span className="font-bold text-rose-700">
                    {new Date(sch.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <button
                  onClick={() => onSelectScholarship(sch)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-2xs group-hover:shadow"
                >
                  <span>Syarat & Daftar</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
