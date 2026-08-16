import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area, 
  CartesianGrid
} from 'recharts';
import { 
  BarChart3, 
  PieChart as PieChartIcon, 
  MapPin, 
  Award, 
  Building2, 
  GraduationCap, 
  Users, 
  TrendingUp, 
  Layers
} from 'lucide-react';
import { garutDistrictEducationStats } from '../data/schoolsData';

interface HomeAnalyticsChartsProps {
  onNavigateToSchools?: () => void;
  onNavigateToZonasi?: () => void;
  onNavigateToScholarships?: () => void;
}

export const HomeAnalyticsCharts: React.FC<HomeAnalyticsChartsProps> = ({
  onNavigateToSchools,
  onNavigateToZonasi,
  onNavigateToScholarships
}) => {
  const [activeChartTab, setActiveChartTab] = useState<'sekolah' | 'zonasi' | 'beasiswa'>('sekolah');
  const [schoolMetricView, setSchoolMetricView] = useState<'lembaga' | 'siswa'>('lembaga');

  const stats = garutDistrictEducationStats;

  // Custom Chart Tooltips
  const CustomSchoolTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-2xl shadow-xl border border-slate-700 text-xs min-w-[200px]">
          <div className="font-extrabold text-sm text-blue-300 border-b border-slate-700/80 pb-1.5 mb-2 flex items-center justify-between">
            <span>{label}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
              {data.persentase}
            </span>
          </div>
          <div className="space-y-1 text-slate-200">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Lembaga:</span>
              <span className="font-bold text-white">{data.jumlah.toLocaleString()} Unit</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-400">● Negeri:</span>
              <span className="font-semibold text-white">{data.negeri.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-400">● Swasta:</span>
              <span className="font-semibold text-white">{data.swasta.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-700/60 mt-1">
              <span className="text-slate-400">Total Siswa Aktif:</span>
              <span className="font-bold text-emerald-300">{data.siswa.toLocaleString()} Siswa</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomZonasiTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-2xl shadow-xl border border-slate-700 text-xs min-w-[220px]">
          <div className="font-extrabold text-sm text-rose-300 border-b border-slate-700/80 pb-1.5 mb-2">
            {label}
          </div>
          <div className="space-y-1.5 text-slate-200">
            <div className="flex justify-between">
              <span className="text-slate-400">Kuota Zonasi:</span>
              <span className="font-bold text-emerald-400">{data.kuotaZonasi.toLocaleString()} Kursi</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Pendaftar:</span>
              <span className="font-bold text-rose-400">{data.pendaftar.toLocaleString()} Siswa</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-700/60">
              <span className="text-slate-300">Rasio Keketatan:</span>
              <span className="font-extrabold text-amber-300">{data.rasioKeketatan}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomBeasiswaTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-2xl shadow-xl border border-slate-700 text-xs min-w-[210px]">
          <div className="font-bold text-sm text-amber-300 border-b border-slate-700/80 pb-1.5 mb-2">
            {data.name}
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Alokasi Dana:</span>
              <span className="font-bold text-emerald-300">Rp {data.nilaiMiliar} Miliar</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Penerima:</span>
              <span className="font-bold text-blue-300">{data.penerima.toLocaleString()} Penerima</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-5">
      
      {/* Visual Header & Tab Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Dashboard Statistik Pendidikan Kabupaten Garut</span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Visualisasi Data Sekolah, Zonasi & Beasiswa
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Sumber: Integrasi Data Dinas Pendidikan & Kemenag Kabupaten Garut TA 2025/2026
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto overflow-x-auto max-w-full">
          <button
            id="analytics-tab-sekolah"
            onClick={() => setActiveChartTab('sekolah')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeChartTab === 'sekolah'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Semua Jenjang Sekolah</span>
          </button>

          <button
            id="analytics-tab-zonasi"
            onClick={() => setActiveChartTab('zonasi')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeChartTab === 'zonasi'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Zonasi PPDB</span>
          </button>

          <button
            id="analytics-tab-beasiswa"
            onClick={() => setActiveChartTab('beasiswa')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeChartTab === 'beasiswa'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Statistik Beasiswa</span>
          </button>
        </div>
      </div>

      {/* 📊 TAB 1: RINGKASAN SELURUH SEKOLAH SE-KABUPATEN GARUT (TK/PAUD, SD/MI, SMP/MTs, SMA/MA, SMK, SLB) */}
      {activeChartTab === 'sekolah' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          {/* Top Quick Stats Bento */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-blue-700 uppercase">Total Satuan Pendidikan</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-blue-950">2,145</span>
                <span className="text-[11px] text-blue-600 font-semibold">Lembaga</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-1">42 Kecamatan se-Garut</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-emerald-700 uppercase">Total Peserta Didik</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-emerald-950">324.4K</span>
                <span className="text-[11px] text-emerald-600 font-semibold">Siswa</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-1">Jenjang PAUD s.d. SMA/SMK</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-indigo-700 uppercase">Sekolah Negeri</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-indigo-950">1,074</span>
                <span className="text-[11px] text-indigo-600 font-semibold">Unit (50.1%)</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-1">Milik Pemerintah Daerah</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-amber-700 uppercase">Sekolah Swasta/Pesantren</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-amber-950">1,071</span>
                <span className="text-[11px] text-amber-600 font-semibold">Unit (49.9%)</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-1">Yayasan & Masyarakat</span>
            </div>
          </div>

          {/* Toggle View & Chart Title */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-slate-800">
                Grafik Komposisi Jenjang:
              </span>
              <span className="text-xs text-slate-500">
                PAUD/TK • SD/MI • SMP/MTs • SMA/MA • SMK • SLB
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setSchoolMetricView('lembaga')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  schoolMetricView === 'lembaga' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Jumlah Lembaga (Negeri vs Swasta)
              </button>
              <button
                onClick={() => setSchoolMetricView('siswa')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  schoolMetricView === 'siswa' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Populasi Siswa
              </button>
            </div>
          </div>

          {/* Recharts Bar Chart */}
          <div className="h-72 sm:h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              {schoolMetricView === 'lembaga' ? (
                <BarChart data={stats.jenjangSummary} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="jenjang" 
                    tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }} 
                    interval={0}
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip content={<CustomSchoolTooltip />} />
                  <Bar dataKey="negeri" name="Negeri" fill="#2563eb" radius={[6, 6, 0, 0]} stackId="a" />
                  <Bar dataKey="swasta" name="Swasta" fill="#f59e0b" radius={[6, 6, 0, 0]} stackId="a" />
                </BarChart>
              ) : (
                <BarChart data={stats.jenjangSummary} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="jenjang" 
                    tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }} 
                    interval={0}
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip content={<CustomSchoolTooltip />} />
                  <Bar dataKey="siswa" name="Jumlah Siswa" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Chart Legend & Explanation */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                <span className="font-semibold text-slate-700">Sekolah Negeri</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="font-semibold text-slate-700">Sekolah Swasta / Yayasan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="font-semibold text-slate-700">Populasi Siswa Aktif</span>
              </div>
            </div>

            {onNavigateToSchools && (
              <button
                onClick={onNavigateToSchools}
                className="text-blue-600 font-bold hover:text-blue-800 transition-colors flex items-center gap-1"
              >
                <span>Buka Direktori Lengkap ({stats.totalSekolah} Sekolah)</span>
                <span>→</span>
              </button>
            )}
          </div>

        </div>
      )}

      {/* 📊 TAB 2: KUOTA VS PENDAFTAR ZONASI PPDB GARUT PER WILAYAH */}
      {activeChartTab === 'zonasi' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {stats.wilayahZonasiPPDB.map((w, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-900">{w.wilayah}</span>
                    <span className="px-2 py-0.5 rounded-md bg-rose-200/80 text-rose-900 text-[10px] font-black">
                      Keketatan {w.rasioKeketatan}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Daya Tampung Zonasi:</span>
                      <span className="font-bold text-slate-900">{w.kuotaZonasi.toLocaleString()} Kursi</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Perkiraan Pendaftar:</span>
                      <span className="font-bold text-rose-600">{w.pendaftar.toLocaleString()} Siswa</span>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 line-clamp-1">Kecamatan: {w.kecamatan}</p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <span className="text-xs font-extrabold text-slate-800 block mb-1">
              Perbandingan Daya Tampung Kursi Zonasi vs Jumlah Pendaftar:
            </span>
            <div className="h-72 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.wilayahZonasiPPDB} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="wilayah" 
                    tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }} 
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip content={<CustomZonasiTooltip />} />
                  <Bar dataKey="kuotaZonasi" name="Daya Tampung Kursi" fill="#059669" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="pendaftar" name="Pendaftar Terverifikasi" fill="#e11d48" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                <span className="font-semibold text-slate-700">Daya Tampung Kuota Zonasi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-600"></span>
                <span className="font-semibold text-slate-700">Calon Pendaftar PPDB</span>
              </div>
            </div>

            {onNavigateToZonasi && (
              <button
                onClick={onNavigateToZonasi}
                className="text-rose-600 font-bold hover:text-rose-800 transition-colors flex items-center gap-1"
              >
                <span>Hitung Jarak Zonasi Rumahmu Sekarang</span>
                <span>→</span>
              </button>
            )}
          </div>

        </div>
      )}

      {/* 📊 TAB 3: ALOKASI DANA & PENERIMA BEASISWA KABUPATEN GARUT */}
      {activeChartTab === 'beasiswa' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-black text-xl shrink-0">
                Rp
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-800 uppercase block">Total Alokasi Beasiswa 2026</span>
                <span className="text-xl font-black text-amber-950">{stats.beasiswaStatsGarut.totalAlokasiTahun}</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Gabungan Pemkab, Kemenag, Baznas & CSR Industri</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-blue-800 uppercase block">Total Kuota Penerima Manfaat</span>
                <span className="text-xl font-black text-blue-950">{stats.beasiswaStatsGarut.totalPenerima.toLocaleString()} Siswa/Mahasiswa</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Mencakup jenjang SD, SMP, SMA, Santri & Kuliah S1</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center pt-2">
            
            {/* Donut Chart (Col 6) */}
            <div className="lg:col-span-6 h-64 sm:h-72 w-full flex flex-col items-center justify-center">
              <span className="text-xs font-extrabold text-slate-800 mb-1">
                Distribusi Anggaran (Miliar Rupiah):
              </span>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={stats.beasiswaStatsGarut.kategoriPemberi}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="nilaiMiliar"
                  >
                    {stats.beasiswaStatsGarut.kategoriPemberi.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomBeasiswaTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Breakdown List (Col 6) */}
            <div className="lg:col-span-6 space-y-2">
              <span className="text-xs font-extrabold text-slate-800 block mb-2">
                Rincian Sumber Beasiswa di Garut:
              </span>
              {stats.beasiswaStatsGarut.kategoriPemberi.map((cat, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }}></span>
                    <span className="font-bold text-slate-800">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-emerald-600">Rp {cat.nilaiMiliar} M</span>
                    <span className="text-slate-500 font-semibold">{cat.penerima} Siswa</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500">Program beasiswa diperbarui setiap awal semester akademik.</span>
            {onNavigateToScholarships && (
              <button
                onClick={onNavigateToScholarships}
                className="text-amber-600 font-bold hover:text-amber-800 transition-colors flex items-center gap-1"
              >
                <span>Cari & Ajukan Beasiswa</span>
                <span>→</span>
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
