import React, { useState, useMemo } from 'react';
import { 
  Wrench, 
  Search, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  ExternalLink, 
  Award, 
  Phone, 
  Users, 
  X,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { TrainingCourse } from '../types';

interface TrainingsTabProps {
  trainings: TrainingCourse[];
}

export const TrainingsTab: React.FC<TrainingsTabProps> = ({ trainings }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBidang, setSelectedBidang] = useState<string>('Semua');
  const [selectedBiaya, setSelectedBiaya] = useState<string>('Semua');
  const [selectedTrainingModal, setSelectedTrainingModal] = useState<TrainingCourse | null>(null);

  const filteredTrainings = useMemo(() => {
    return trainings.filter(t => {
      // Search
      const matches = 
        t.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.penyelenggara.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.bidang.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matches) return false;

      // Bidang
      if (selectedBidang !== 'Semua' && t.bidang !== selectedBidang) return false;

      // Biaya
      if (selectedBiaya !== 'Semua') {
        if (selectedBiaya === 'Gratis' && t.tipeBiaya !== 'Gratis') return false;
        if (selectedBiaya === 'Berbayar' && t.tipeBiaya === 'Gratis') return false;
      }

      return true;
    });
  }, [trainings, searchQuery, selectedBidang, selectedBiaya]);

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
          <Wrench className="w-3.5 h-3.5" />
          <span>Modul 5 • Pelatihan Kerja & Vokasi BLK Garut</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
          Pusat Pelatihan Keterampilan & Kesiapan Kerja Garut
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Program kursus vokasi gratis Disnakertrans Garut, sertifikasi BNSP resmi, kerajinan kulit Sukaregang, barista kopi Garut, digital marketing, dan otomotif.
        </p>

        {/* Search */}
        <div className="mt-5 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari program pelatihan (cth: Digital Marketing, Kerajinan Kulit, Barista, Las Mesin)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 text-sm font-medium rounded-2xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-100">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Bidang Keahlian:</label>
            <select
              value={selectedBidang}
              onChange={(e) => setSelectedBidang(e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Semua">Semua Bidang</option>
              <option value="Teknologi & Digital">Teknologi & Digital</option>
              <option value="Kerajinan & Khas Garut">Kerajinan & Khas Garut (Kulit Sukaregang)</option>
              <option value="Kuliner & Pariwisata">Kuliner, Kopi Garut & Pariwisata</option>
              <option value="Teknik & Manufaktur">Teknik Otomotif & Manufaktur</option>
              <option value="Tata Busana">Tata Busana & Tekstil</option>
              <option value="Bahasa Asing">Bahasa Asing (Jepang/Inggris)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Tipe Pembiayaan:</label>
            <select
              value={selectedBiaya}
              onChange={(e) => setSelectedBiaya(e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Semua">Semua Tipe</option>
              <option value="Gratis">🟢 100% Gratis (Subsidi Pemkab Garut / Kemnaker)</option>
              <option value="Berbayar">🟡 Berbayar / Lembaga Swasta</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredTrainings.map((tr) => (
          <div
            key={tr.id}
            onClick={() => setSelectedTrainingModal(tr)}
            className="flex flex-col justify-between bg-white hover:bg-emerald-50/20 rounded-3xl border border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-lg transition-all p-5 cursor-pointer group"
          >
            <div>
              {/* Badges */}
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold shadow-2xs ${
                  tr.tipeBiaya === 'Gratis' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                }`}>
                  {tr.tipeBiaya === 'Gratis' ? '✓ GRATIS SUBSIDI' : 'BERBAYAR TERJANGKAU'}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                  {tr.bidang}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition-colors mt-3 line-clamp-2">
                {tr.nama}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Penyelenggara: <strong className="text-slate-800">{tr.penyelenggara}</strong>
              </p>

              {/* Specs */}
              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span className="truncate">{tr.lokasi}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>Durasi: <strong>{tr.durasi}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="font-semibold text-emerald-800">{tr.sertifikasi}</span>
                </div>
              </div>

              {/* Fasilitas pills */}
              <div className="flex flex-wrap gap-1 mt-3">
                {tr.fasilitas.slice(0, 2).map((fas, i) => (
                  <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-md text-[10px] font-medium">
                    ✨ {fas}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">BIAYA PELATIHAN</span>
                <span className="font-extrabold text-xs text-emerald-700">{tr.biaya}</span>
              </div>

              <button
                onClick={() => setSelectedTrainingModal(tr)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-2xs"
              >
                Lihat Detail & Daftar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Training Modal */}
      {selectedTrainingModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-900 p-5 sm:p-6 text-white shrink-0">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold">
                  {selectedTrainingModal.bidang}
                </span>
                <button
                  onClick={() => setSelectedTrainingModal(null)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold mt-2 font-['Outfit',sans-serif]">
                {selectedTrainingModal.nama}
              </h2>
              <p className="text-xs text-emerald-200 mt-1">
                Penyelenggara: {selectedTrainingModal.penyelenggara} • {selectedTrainingModal.lokasi}
              </p>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs text-slate-800">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <h4 className="font-bold text-sm text-emerald-950 mb-1">Tentang Pelatihan Ini</h4>
                <p className="text-slate-700 leading-relaxed">{selectedTrainingModal.deskripsi}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold block">DURASI KURSUS</span>
                  <span className="font-extrabold text-sm text-slate-900">{selectedTrainingModal.durasi}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold block">BIAYA PENDAFTARAN</span>
                  <span className="font-extrabold text-sm text-emerald-700">{selectedTrainingModal.biaya}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-500 font-semibold block">SERTIFIKAT</span>
                  <span className="font-extrabold text-xs text-blue-700">{selectedTrainingModal.sertifikasi}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Fasilitas yang Didapat:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedTrainingModal.fasilitas.map((f, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Syarat Calon Peserta:</h4>
                <ul className="space-y-1.5">
                  {selectedTrainingModal.syarat.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 p-2 rounded-xl bg-blue-50/50 border border-blue-100">
                      <span className="w-4 h-4 rounded-full bg-blue-200 text-blue-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
              <a
                href={selectedTrainingModal.linkDaftar}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Daftar Sekarang Melalui Penyelenggara</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
