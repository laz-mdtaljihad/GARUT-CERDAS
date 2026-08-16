import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  Star, 
  Sparkles, 
  Layers, 
  FileText, 
  Target, 
  Clock, 
  School as SchoolIcon, 
  UserCheck, 
  Compass, 
  CheckCircle2, 
  Share2, 
  Bookmark, 
  BookmarkCheck,
  ChevronRight,
  HelpCircle,
  Award,
  Calendar,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { ModulAjar, UserProfile } from '../types';
import { exportModulAjarToDoc } from '../utils/exportModulAjarDoc';

interface ModulAjarDetailModalProps {
  modul: ModulAjar | null;
  onClose: () => void;
  userProfile?: UserProfile;
}

export const ModulAjarDetailModal: React.FC<ModulAjarDetailModalProps> = ({
  modul,
  onClose,
  userProfile
}) => {
  const [activeSection, setActiveSection] = useState<'info' | 'langkah' | 'asesmen' | 'lkpd' | 'glosarium'>('info');
  const [isCopied, setIsCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!modul) return null;

  const handleCopyModul = () => {
    const textContent = `
MODUL AJAR KURIKULUM MERDEKA - GARUT CERDAS
===========================================
Judul: ${modul.judul}
Mata Pelajaran: ${modul.mataPelajaran}
Jenjang / Fase: ${modul.jenjang} / ${modul.fase}
Kelas / Semester: ${modul.kelas} / ${modul.semester}
Alokasi Waktu: ${modul.alokasiWaktu}
Penyusun: ${modul.penyusun} (${modul.instansiPenyusun})
SK BSKAP: ${modul.nomorSKKemendikdasmen || 'No. 032/H/KR/2024'}
Kode Dapodik: ${modul.kodeDapodik || 'DPK-AJAR-2026-GRT'}
ID PMM: ${modul.idPMM || 'PMM-VERIFIED-2026'}

A. CAPAIAN PEMBELAJARAN (CP)
${modul.capaianPembelajaran}

B. TUJUAN PEMBELAJARAN (TP)
${modul.tujuanPembelajaran.map((tp, i) => `${i + 1}. ${tp}`).join('\n')}

C. PEMAHAMAN BERMAKNA & PERTANYAAN PEMANTIK
- Pemahaman Bermakna: ${modul.pemahamanBermakna}
- Pertanyaan Pemantik:
${modul.pertanyaanPemantik.map((q, i) => `  * ${q}`).join('\n')}

D. KEGIATAN PEMBELAJARAN BERDIFERENSIASI
1. Pendahuluan:
${modul.kegiatanPembelajaran.pendahuluan.map(p => `  - ${p}`).join('\n')}
2. Kegiatan Inti:
${modul.kegiatanPembelajaran.intiBerdiferensiasi.langkahLangkah.map(l => `  - ${l}`).join('\n')}
3. Penutup & Refleksi:
${modul.kegiatanPembelajaran.penutupRefleksi.map(r => `  - ${r}`).join('\n')}

E. LEMBAR KERJA PESERTA DIDIK (LKPD)
Judul: ${modul.lkpd.judul}
${modul.lkpd.soalAktivitas.map((s, i) => `${i + 1}. ${s}`).join('\n')}

Sumber: Portal Pendidikan Terpadu GARUT CERDAS & Kemendikdasmen RI
    `.trim();

    navigator.clipboard.writeText(textContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    exportModulAjarToDoc(modul);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <div 
      id="modul-ajar-detail-modal" 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER MODAL */}
        <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 text-white p-5 sm:p-6 shrink-0 relative">
          <button
            id="close-modul-modal"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-teal-100 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Tutup Detail Modul"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-teal-50 text-[11px] font-extrabold tracking-wide uppercase">
              {modul.jenjang} • {modul.fase}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[11px] font-black">
              {modul.kurikulum}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-extrabold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
              Dapodik & PMM Terverifikasi
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/40 text-emerald-100 text-[10px] font-semibold flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
              {modul.rating} ({modul.unduhanCount.toLocaleString('id-ID')} Diunduh)
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit',sans-serif] leading-snug max-w-2xl">
            {modul.judul}
          </h2>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-teal-100 mt-2 font-medium">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-teal-300" />
              {modul.mataPelajaran}
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-300" />
              {modul.kelas} • Sem. {modul.semester}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-300" />
              {modul.alokasiWaktu}
            </span>
          </div>

          {/* Official Reference Subbar */}
          <div className="mt-3 pt-3 border-t border-teal-600/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-teal-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-teal-900/50 px-2 py-0.5 rounded-md font-mono text-[10px] text-teal-200">
                Kode Dapodik: {modul.kodeDapodik || 'DPK-AJAR-2026-GRT'}
              </span>
              <span className="bg-teal-900/50 px-2 py-0.5 rounded-md font-mono text-[10px] text-teal-200">
                ID PMM: {modul.idPMM || 'PMM-VERIFIED-2026'}
              </span>
            </div>
            {modul.linkResmiKemendikbud && (
              <a
                href={modul.linkResmiKemendikbud}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-bold underline cursor-pointer"
              >
                <span>Lihat di Portal PMM / Kemendikbud</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* ACTION BUTTONS TOOLBAR */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'info', label: 'Identitas & CP/TP', icon: Target },
              { id: 'langkah', label: 'Langkah Pembelajaran', icon: FileText },
              { id: 'asesmen', label: 'Rubrik & Asesmen', icon: UserCheck },
              { id: 'lkpd', label: 'LKPD Siswa', icon: Sparkles },
              { id: 'glosarium', label: 'Glosarium & Ref.', icon: BookOpen },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-modul-section-${tab.id}`}
                  onClick={() => setActiveSection(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Quick Action Tools */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              id="btn-copy-modul-content"
              onClick={handleCopyModul}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                isCopied 
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
              title="Salin Rangkuman Modul"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Tersalin!' : 'Salin'}</span>
            </button>

            <button
              id="btn-print-modul"
              onClick={handlePrint}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer"
              title="Cetak Dokumen Modul"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cetak</span>
            </button>

            <button
              id="btn-download-modul"
              onClick={handleDownload}
              className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadSuccess ? 'Tersimpan!' : 'Unduh Modul'}</span>
            </button>
          </div>
        </div>

        {/* NOTIFICATION TOAST */}
        {downloadSuccess && (
          <div className="bg-emerald-600 text-white text-xs px-4 py-2 text-center font-bold animate-in slide-in-from-top duration-200 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Dokumen Modul Ajar "{modul.judul}" berhasil diunduh ke perangkat Anda!
          </div>
        )}

        {/* MODAL BODY CONTENT */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-slate-800">
          
          {/* TAB 1: IDENTITAS & CP/TP */}
          {activeSection === 'info' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Profil Penyusun & Identitas */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Informasi Penyusun</h4>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    <p><strong className="text-slate-900">Penyusun:</strong> {modul.penyusun}</p>
                    <p><strong className="text-slate-900">Instansi:</strong> {modul.instansiPenyusun}</p>
                    <p><strong className="text-slate-900">Tahun Ajaran:</strong> {modul.tahunAjaran}</p>
                    <p><strong className="text-slate-900">Model Pembelajaran:</strong> {modul.modelPembelajaran}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Target & Sarana</h4>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    <p><strong className="text-slate-900">Target Siswa:</strong> {modul.targetPesertaDidik}</p>
                    <div>
                      <strong className="text-slate-900 block mb-1">Sarana & Media:</strong>
                      <div className="flex flex-wrap gap-1">
                        {modul.saranaPrasarana.map((s, i) => (
                          <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-[11px] text-slate-600">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profil Pelajar Pancasila Badges */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  Dimensi Profil Pelajar Pancasila
                </h3>
                <div className="flex flex-wrap gap-2">
                  {modul.profilPelajarPancasila.map((dim, i) => (
                    <span key={i} className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-bold">
                      ✨ {dim}
                    </span>
                  ))}
                </div>
              </div>

              {/* Capaian Pembelajaran (CP) */}
              <div className="bg-teal-50/60 border border-teal-200/80 rounded-2xl p-4">
                <h3 className="text-sm font-extrabold text-teal-950 mb-1.5 flex items-center gap-2">
                  <Target className="w-4 h-4 text-teal-700" />
                  Capaian Pembelajaran (CP)
                </h3>
                <p className="text-xs sm:text-sm text-teal-900 leading-relaxed font-normal">
                  {modul.capaianPembelajaran}
                </p>
              </div>

              {/* Tujuan Pembelajaran (TP) */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Tujuan Pembelajaran (TP)
                </h3>
                <div className="space-y-2">
                  {modul.tujuanPembelajaran.map((tp, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-slate-50 border border-slate-200/70 p-3 rounded-xl">
                      <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-normal">{tp}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pemahaman Bermakna & Pertanyaan Pemantik */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
                  <h4 className="text-xs font-extrabold uppercase text-amber-900 mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Pemahaman Bermakna
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                    {modul.pemahamanBermakna}
                  </p>
                </div>

                <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4">
                  <h4 className="text-xs font-extrabold uppercase text-sky-900 mb-1.5 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
                    Pertanyaan Pemantik
                  </h4>
                  <ul className="space-y-1.5 text-xs text-sky-950 list-disc list-inside">
                    {modul.pertanyaanPemantik.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: LANGKAH PEMBELAJARAN BERDIFERENSIASI */}
          {activeSection === 'langkah' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Diferensiasi Konten, Proses, Produk Banner */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-4 sm:p-5">
                <h3 className="text-sm font-bold text-amber-400 mb-3 flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  Strategi Pembelajaran Berdiferensiasi
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {modul.kegiatanPembelajaran.intiBerdiferensiasi.diferensiasiKonten && (
                    <div className="bg-white/10 p-3 rounded-xl">
                      <strong className="text-amber-300 block mb-1">Diferensiasi Konten:</strong>
                      <p className="text-slate-200">{modul.kegiatanPembelajaran.intiBerdiferensiasi.diferensiasiKonten}</p>
                    </div>
                  )}
                  <div className="bg-white/10 p-3 rounded-xl">
                    <strong className="text-emerald-300 block mb-1">Diferensiasi Proses:</strong>
                    <p className="text-slate-200">{modul.kegiatanPembelajaran.intiBerdiferensiasi.diferensiasiProses}</p>
                  </div>
                  {modul.kegiatanPembelajaran.intiBerdiferensiasi.diferensiasiProduk && (
                    <div className="bg-white/10 p-3 rounded-xl">
                      <strong className="text-sky-300 block mb-1">Diferensiasi Produk:</strong>
                      <p className="text-slate-200">{modul.kegiatanPembelajaran.intiBerdiferensiasi.diferensiasiProduk}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Tahapan Rinci Kegiatan */}
              <div className="space-y-4">
                {/* 1. Pendahuluan */}
                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                  <h4 className="text-xs font-black uppercase text-teal-800 mb-2 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px]">1</span>
                    Kegiatan Pendahuluan (Awal Pembelajaran)
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {modul.kegiatanPembelajaran.pendahuluan.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Kegiatan Inti */}
                <div className="border-2 border-teal-500/40 rounded-2xl p-4 sm:p-5 bg-teal-50/20">
                  <h4 className="text-xs font-black uppercase text-teal-900 mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-teal-700 text-white flex items-center justify-center text-[10px]">2</span>
                    Kegiatan Inti (Langkah Eksplorasi, Kolaborasi & Refleksi)
                  </h4>
                  <div className="space-y-3">
                    {modul.kegiatanPembelajaran.intiBerdiferensiasi.langkahLangkah.map((step, idx) => (
                      <div key={idx} className="bg-white border border-teal-100 p-3 rounded-xl shadow-2xs flex items-start gap-3">
                        <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 text-xs font-black shrink-0 mt-0.5">
                          Tahap {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-slate-800 leading-normal">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Penutup */}
                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                  <h4 className="text-xs font-black uppercase text-slate-700 mb-2 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px]">3</span>
                    Kegiatan Penutup & Refleksi
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {modul.kegiatanPembelajaran.penutupRefleksi.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-slate-500 font-bold">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: RUBRIK & ASESMEN */}
          {activeSection === 'asesmen' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Asesmen Diagnostik, Formatif, Sumatif Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-2xl">
                  <strong className="text-sky-900 block font-bold mb-1">1. Asesmen Diagnostik Awal:</strong>
                  <p className="text-sky-800">{modul.asesmen.awalDiagnostik}</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl">
                  <strong className="text-emerald-900 block font-bold mb-1">2. Asesmen Formatif (Proses):</strong>
                  <p className="text-emerald-800">{modul.asesmen.formatif}</p>
                </div>
                <div className="bg-indigo-50 border border-indigo-200 p-3.5 rounded-2xl">
                  <strong className="text-indigo-900 block font-bold mb-1">3. Asesmen Sumatif (Akhir):</strong>
                  <p className="text-indigo-800">{modul.asesmen.sumatif}</p>
                </div>
              </div>

              {/* Tabel Rubrik Penilaian KKTP */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-teal-700" />
                  Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) & Rubrik
                </h3>
                <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-2xs">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-slate-100 text-slate-800 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-3">Kriteria Penilaian</th>
                        <th className="p-3 bg-rose-50 text-rose-900">Perlu Bimbingan (0-60)</th>
                        <th className="p-3 bg-amber-50 text-amber-900">Cukup (61-75)</th>
                        <th className="p-3 bg-emerald-50 text-emerald-900">Baik (76-88)</th>
                        <th className="p-3 bg-teal-50 text-teal-900">Sangat Baik (89-100)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {modul.asesmen.rubrik.map((rubrik, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80">
                          <td className="p-3 font-bold text-slate-900 bg-slate-50/50 max-w-[180px]">
                            {rubrik.kriteria}
                          </td>
                          <td className="p-3 text-slate-600 bg-rose-50/30">{rubrik.perluBimbingan}</td>
                          <td className="p-3 text-slate-600 bg-amber-50/30">{rubrik.cukup}</td>
                          <td className="p-3 text-slate-700 bg-emerald-50/30">{rubrik.baik}</td>
                          <td className="p-3 font-semibold text-slate-900 bg-teal-50/40">{rubrik.sangatBaik}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: LKPD SISWA */}
          {activeSection === 'lkpd' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-2 border-amber-300 rounded-3xl p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-amber-200">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider">
                      Lembar Kerja Peserta Didik (LKPD)
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-1 font-['Outfit',sans-serif]">
                      {modul.lkpd.judul}
                    </h3>
                  </div>
                  <button 
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-50 transition-colors shadow-2xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Cetak LKPD
                  </button>
                </div>

                {/* Petunjuk Pengerjaan */}
                <div className="mb-5 bg-white/80 rounded-2xl p-4 border border-amber-200/80">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                    📋 Petunjuk Pengerjaan:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {modul.lkpd.petunjuk.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold text-amber-600">{i + 1}.</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Soal & Lembar Aktivitas */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    📝 Tugas & Soal Aktivitas Siswa:
                  </h4>
                  {modul.lkpd.soalAktivitas.map((soal, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 mb-2">
                        {soal}
                      </p>
                      <div className="h-16 border border-dashed border-slate-300 rounded-xl bg-slate-50/50 flex items-center justify-center text-xs text-slate-400">
                        [ Area Jawaban / Pengerjaan Siswa ]
                      </div>
                    </div>
                  ))}
                </div>

                {/* Refleksi Siswa */}
                {modul.lkpd.refleksiSiswa && (
                  <div className="mt-5 bg-white rounded-2xl p-4 border border-amber-200">
                    <h4 className="text-xs font-bold text-amber-900 uppercase mb-2">
                      🌟 Refleksi Diri Siswa:
                    </h4>
                    <div className="space-y-1 text-xs text-slate-700">
                      {modul.lkpd.refleksiSiswa.map((r, i) => (
                        <p key={i}>{r}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: GLOSARIUM & REFERENSI */}
          {activeSection === 'glosarium' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Ringkasan Materi */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-teal-700" />
                  Ringkasan Materi Esensial
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {modul.ringkasanMateri}
                </p>
              </div>

              {/* Glosarium Istilah */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2.5">📖 Glosarium Istilah Penting</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {modul.glosarium.map((item, idx) => (
                    <div key={idx} className="bg-teal-50/50 border border-teal-100 p-3 rounded-xl text-xs text-teal-950 font-medium">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Daftar Pustaka */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2.5">📚 Daftar Pustaka & Rujukan Kurikulum</h3>
                <ul className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {modul.daftarPustaka.map((pustaka, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>{pustaka}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {modul.tags.map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="bg-slate-100 border-t border-slate-200 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="font-bold text-slate-700">GARUT CERDAS</span>
            <span>•</span>
            <span>Standar BSKAP Kemendikdasmen RI 2026/2027</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Tutup
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Unduh Perangkat Lengkap
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
