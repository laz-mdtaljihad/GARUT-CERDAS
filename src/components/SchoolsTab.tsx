import React, { useState, useMemo } from 'react';
import { 
  School as SchoolIcon, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  MapPin, 
  CheckCircle2, 
  Bookmark, 
  Layers, 
  ChevronRight, 
  Phone, 
  Building2, 
  Sparkles,
  ArrowUpDown,
  Grid,
  List,
  Plus,
  Edit3,
  Trash2,
  ShieldCheck
} from 'lucide-react';
import { School, UserProfile } from '../types';

interface SchoolsTabProps {
  schools: School[];
  userProfile: UserProfile;
  onSelectSchool: (school: School) => void;
  onToggleFavorit: (schoolId: string) => void;
  onOpenCompare: (school?: School) => void;
  onOpenAddSchool?: () => void;
  onEditSchool?: (school: School) => void;
  onDeleteSchool?: (schoolId: string) => void;
}

export const SchoolsTab: React.FC<SchoolsTabProps> = ({
  schools,
  userProfile,
  onSelectSchool,
  onToggleFavorit,
  onOpenCompare,
  onOpenAddSchool,
  onEditSchool,
  onDeleteSchool
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJenjang, setSelectedJenjang] = useState<string>('Semua');
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>('Semua');
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua');
  const [selectedAkreditasi, setSelectedAkreditasi] = useState<string>('Semua');
  const [sortBy, setSortBy] = useState<'akreditasi' | 'kuota' | 'nama' | 'jarak' | 'prestasi'>('akreditasi');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Extract unique Kecamatans from schools
  const kecamatans = useMemo(() => {
    const set = new Set(schools.map(s => s.kecamatan));
    return ['Semua', ...Array.from(set).sort()];
  }, [schools]);

  // Filtering logic
  const filteredSchools = useMemo(() => {
    const cleanQuery = searchQuery.toLowerCase().trim();
    const normalizedQuery = cleanQuery
      .replace(/\bsd\s+n\s+/g, 'sdn ')
      .replace(/\bsd\s+negeri\s+/g, 'sdn ')
      .replace(/\bsmp\s+n\s+/g, 'smpn ')
      .replace(/\bsmp\s+negeri\s+/g, 'smpn ')
      .replace(/\bsma\s+n\s+/g, 'sman ')
      .replace(/\bsma\s+negeri\s+/g, 'sman ')
      .replace(/\bsmk\s+n\s+/g, 'smkn ')
      .replace(/\bsmk\s+negeri\s+/g, 'smkn ')
      .replace(/\s+/g, ' ');

    return schools.filter(s => {
      // Search
      const namaNorm = s.nama.toLowerCase().replace(/\s+/g, ' ');
      const kecNorm = s.kecamatan.toLowerCase();
      const alamatNorm = s.alamat.toLowerCase();
      const tagsNorm = s.tags.join(' ').toLowerCase();

      const matchesSearch = 
        !cleanQuery ||
        namaNorm.includes(cleanQuery) ||
        namaNorm.includes(normalizedQuery) ||
        kecNorm.includes(cleanQuery) ||
        kecNorm.includes(normalizedQuery) ||
        alamatNorm.includes(cleanQuery) ||
        alamatNorm.includes(normalizedQuery) ||
        tagsNorm.includes(cleanQuery) ||
        tagsNorm.includes(normalizedQuery) ||
        s.npsn.includes(cleanQuery) ||
        (s.jurusanSMK && s.jurusanSMK.some(j => j.toLowerCase().includes(cleanQuery)));

      if (!matchesSearch) return false;

      // Jenjang
      if (selectedJenjang !== 'Semua') {
        if (selectedJenjang === 'PAUD_TK' && !(s.jenjang === 'PAUD' || s.jenjang === 'TK')) return false;
        if (selectedJenjang === 'SD_MI' && !(s.jenjang === 'SD' || s.jenjang === 'MI')) return false;
        if (selectedJenjang === 'SMP_MTS' && !(s.jenjang === 'SMP' || s.jenjang === 'MTs')) return false;
        if (selectedJenjang === 'SMA_MA' && !(s.jenjang === 'SMA' || s.jenjang === 'MA')) return false;
        if (selectedJenjang === 'SMK' && s.jenjang !== 'SMK') return false;
        if (selectedJenjang === 'SLB' && s.jenjang !== 'SLB') return false;
        if (selectedJenjang === 'TK' && s.jenjang !== 'TK') return false;
        if (selectedJenjang === 'PAUD' && s.jenjang !== 'PAUD') return false;
        if (selectedJenjang === 'SD' && s.jenjang !== 'SD') return false;
        if (selectedJenjang === 'MI' && s.jenjang !== 'MI') return false;
        if (selectedJenjang === 'SMP' && s.jenjang !== 'SMP') return false;
        if (selectedJenjang === 'MTs' && s.jenjang !== 'MTs') return false;
        if (selectedJenjang === 'SMA' && s.jenjang !== 'SMA') return false;
        if (selectedJenjang === 'MA' && s.jenjang !== 'MA') return false;
      }

      // Kecamatan
      if (selectedKecamatan !== 'Semua' && s.kecamatan !== selectedKecamatan) return false;

      // Status
      if (selectedStatus !== 'Semua' && s.status !== selectedStatus) return false;

      // Akreditasi
      if (selectedAkreditasi !== 'Semua' && s.akreditasi !== selectedAkreditasi) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'akreditasi') {
        return a.akreditasi.localeCompare(b.akreditasi);
      }
      if (sortBy === 'kuota') {
        return b.kuotaPPDB.total - a.kuotaPPDB.total;
      }
      if (sortBy === 'prestasi') {
        return b.prestasiList.length - a.prestasiList.length;
      }
      if (sortBy === 'jarak') {
        return (a.jarakKm || 99) - (b.jarakKm || 99);
      }
      return a.nama.localeCompare(b.nama);
    });
  }, [schools, searchQuery, selectedJenjang, selectedKecamatan, selectedStatus, selectedAkreditasi, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedJenjang('Semua');
    setSelectedKecamatan('Semua');
    setSelectedStatus('Semua');
    setSelectedAkreditasi('Semua');
  };

  const isFiltered = selectedJenjang !== 'Semua' || selectedKecamatan !== 'Semua' || selectedStatus !== 'Semua' || selectedAkreditasi !== 'Semua' || searchQuery !== '';

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-200">
      
      {/* Admin Disdik Quick Action Banner */}
      {userProfile.isAdmin && (
        <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-4 sm:p-5 border border-emerald-500/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-500 text-white">
                  Akses Admin Disdik
                </span>
                <span className="text-xs text-emerald-200">Pengelolaan Basis Data Sekolah & Kuota</span>
              </div>
              <p className="text-xs text-slate-200 mt-0.5">
                Anda dapat menambah sekolah baru di 42 kecamatan Garut, atau mengedit profil & kuota PPDB sekolah terdaftar.
              </p>
            </div>
          </div>

          <button
            id="btn-admin-add-school-top"
            onClick={onOpenAddSchool}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs sm:text-sm shadow-md transition-all shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>Tambah Sekolah Baru</span>
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-2">
              <SchoolIcon className="w-3.5 h-3.5" />
              <span>Modul 1 • Direktori Pendidikan Garut</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
              Direktori Sekolah Kabupaten Garut
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Cari dan bandingkan seluruh sekolah jenjang SD/MI, SMP/MTs, SMA/MA, dan SMK di seluruh kecamatan Kabupaten Garut.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {userProfile.isAdmin && (
              <button
                onClick={onOpenAddSchool}
                className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Sekolah</span>
              </button>
            )}

            <button
              id="compare-schools-header-btn"
              onClick={() => onOpenCompare()}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>Bandingkan Sekolah</span>
            </button>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="mt-5 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="schools-search-input"
            type="text"
            placeholder="Cari nama sekolah (cth: SMAN 1 Garut, SMPN 2, SMKN 1, SMK Wikrama), kecamatan, atau NPSN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 text-sm font-medium rounded-2xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              Bersihkan
            </button>
          )}
        </div>

        {/* Multi-Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 pt-3 border-t border-slate-100">
          
          {/* Jenjang Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Jenjang:</label>
            <select
              id="filter-school-jenjang"
              value={selectedJenjang}
              onChange={(e) => setSelectedJenjang(e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="Semua">Semua Jenjang</option>
              <option value="PAUD_TK">PAUD & TK (Usia Dini)</option>
              <option value="SD_MI">SD & MI (Dasar)</option>
              <option value="SMP_MTS">SMP & MTs (Menengah)</option>
              <option value="SMA_MA">SMA & MA (Atas)</option>
              <option value="SMK">SMK (Kejuruan/Vokasi)</option>
              <option value="SLB">SLB (Inklusi/Khusus)</option>
            </select>
          </div>

          {/* Kecamatan Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Kecamatan:</label>
            <select
              id="filter-school-kecamatan"
              value={selectedKecamatan}
              onChange={(e) => setSelectedKecamatan(e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              {kecamatans.map(kec => (
                <option key={kec} value={kec}>{kec === 'Semua' ? 'Semua Kecamatan' : `Kec. ${kec}`}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Status:</label>
            <select
              id="filter-school-status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="Semua">Semua Status</option>
              <option value="Negeri">Negeri</option>
              <option value="Swasta">Swasta</option>
            </select>
          </div>

          {/* Akreditasi Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Akreditasi:</label>
            <select
              id="filter-school-akreditasi"
              value={selectedAkreditasi}
              onChange={(e) => setSelectedAkreditasi(e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="Semua">Semua Akreditasi</option>
              <option value="A">Akreditasi A Unggul</option>
              <option value="B">Akreditasi B</option>
              <option value="C">Akreditasi C</option>
            </select>
          </div>

        </div>

        {/* Results Bar & Sorting Control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">
              Ditemukan <span className="text-blue-600">{filteredSchools.length}</span> sekolah
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

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 font-medium">Urutkan:</span>
              <select
                id="sort-school-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-bold bg-transparent text-slate-800 focus:outline-hidden cursor-pointer"
              >
                <option value="akreditasi">Nilai Akreditasi</option>
                <option value="kuota">Kapasitas Kuota PPDB</option>
                <option value="prestasi">Jumlah Prestasi Juara</option>
                <option value="jarak">Jarak Terdekat</option>
                <option value="nama">Nama (A–Z)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500'}`}
                title="Grid Tampilan"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500'}`}
                title="List Tampilan"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Schools Results Display */}
      {filteredSchools.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">Tidak ada sekolah yang cocok dengan filter</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Coba ubah kata kunci pencarian atau reset filter kecamatan / jenjang untuk melihat seluruh daftar sekolah.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredSchools.map((school) => {
            const isFavorited = userProfile.favoritSekolah.includes(school.id);
            return (
              <div
                key={school.id}
                onClick={() => onSelectSchool(school)}
                className="flex flex-col justify-between bg-white hover:bg-blue-50/20 rounded-3xl border border-slate-200/90 hover:border-blue-400 shadow-xs hover:shadow-lg transition-all overflow-hidden cursor-pointer group"
              >
                {/* Banner Header */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                  <img
                    src={school.bannerImg}
                    alt={school.nama}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white text-[10px] font-extrabold shadow-sm flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Akreditasi {school.akreditasi}
                      </span>
                      <span className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                        {school.status}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorit(school.id);
                      }}
                      className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                        isFavorited ? 'bg-rose-500 text-white' : 'bg-white/80 hover:bg-white text-slate-800'
                      }`}
                      title="Favoritkan"
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Bottom Jenjang Pill */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white text-xs font-extrabold shadow-sm">
                      {school.jenjang}
                    </span>
                  </div>
                </div>

                {/* Details Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {school.nama}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{school.kecamatan}, Garut</span>
                    </div>

                    {/* Vokasi / Keunggulan */}
                    {school.jurusanSMK && school.jurusanSMK.length > 0 ? (
                      <div className="mt-2 text-[11px] text-purple-800 bg-purple-50 p-2 rounded-xl border border-purple-100">
                        <span className="font-bold block mb-0.5">Program Keahlian:</span>
                        <span className="line-clamp-1">{school.jurusanSMK.slice(0, 2).join(', ')}...</span>
                      </div>
                    ) : (
                      <p className="mt-2 text-[11px] text-slate-600 line-clamp-2 italic">
                        "{school.visi}"
                      </p>
                    )}

                    {/* Quick Specs */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">KUOTA PPDB</span>
                        <span className="font-bold text-blue-700">{school.kuotaPPDB.total} Kursi</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">BIAYA SPP</span>
                        <span className="font-bold text-emerald-700">
                          {school.biaya.sppBulanan === 0 ? 'Gratis (BOS)' : `Rp ${school.biaya.sppBulanan.toLocaleString('id-ID')}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    {userProfile.isAdmin && onEditSchool && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditSchool(school);
                        }}
                        className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        title="Edit Data Sekolah (Admin Disdik)"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    )}

                    {userProfile.isAdmin && onDeleteSchool && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Apakah Anda yakin ingin menghapus data sekolah "${school.nama}"?`)) {
                            onDeleteSchool(school.id);
                          }
                        }}
                        className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        title="Hapus Sekolah"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenCompare(school);
                      }}
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      title="Bandingkan Sekolah Ini"
                    >
                      <Layers className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onSelectSchool(school)}
                      className="flex-1 py-2 px-3 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Lihat Detail Lengkap</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        
        /* LIST VIEW */
        <div className="space-y-3">
          {filteredSchools.map((school) => {
            const isFavorited = userProfile.favoritSekolah.includes(school.id);
            return (
              <div
                key={school.id}
                onClick={() => onSelectSchool(school)}
                className="p-4 bg-white hover:bg-blue-50/20 rounded-2xl border border-slate-200 hover:border-blue-400 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-extrabold text-sm flex flex-col items-center justify-center shrink-0 shadow-xs">
                    <span>{school.jenjang}</span>
                    <span className="text-[10px] font-normal">{school.status}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.2 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                        Akreditasi {school.akreditasi}
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-500" />
                        {school.kecamatan}, Garut
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors mt-1">
                      {school.nama}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{school.alamat}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-400 block font-medium">TOTAL KUOTA</span>
                    <span className="font-extrabold text-blue-700 text-xs sm:text-sm">{school.kuotaPPDB.total} Siswa</span>
                  </div>

                  {userProfile.isAdmin && onEditSchool && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditSchool(school);
                      }}
                      className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      title="Edit Data Sekolah (Admin Disdik)"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}

                  {userProfile.isAdmin && onDeleteSchool && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Apakah Anda yakin ingin menghapus data sekolah "${school.nama}"?`)) {
                          onDeleteSchool(school.id);
                        }
                      }}
                      className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      title="Hapus Sekolah"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorit(school.id);
                    }}
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                      isFavorited ? 'bg-rose-500 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  <button
                    onClick={() => onSelectSchool(school)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Detail</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
