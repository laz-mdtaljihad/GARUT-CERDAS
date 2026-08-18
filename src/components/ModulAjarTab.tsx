import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Download, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Star, 
  FileText, 
  Award, 
  Compass, 
  Clock, 
  Eye, 
  UserCheck, 
  Share2, 
  ChevronRight, 
  SlidersHorizontal, 
  GraduationCap, 
  Wand2, 
  Send, 
  Loader2, 
  Check, 
  Tag,
  ShieldCheck,
  FileDown,
  Plus,
  Edit3,
  Trash2
} from 'lucide-react';
import { ModulAjar, UserProfile } from '../types';
import { exportModulAjarToDoc } from '../utils/exportModulAjarDoc';

interface ModulAjarTabProps {
  modulList: ModulAjar[];
  onSelectModul: (modul: ModulAjar) => void;
  userProfile: UserProfile;
  onOpenAddModul?: () => void;
  onEditModul?: (modul: ModulAjar) => void;
  onDeleteModul?: (modulId: string) => void;
}

export const ModulAjarTab: React.FC<ModulAjarTabProps> = ({
  modulList,
  onSelectModul,
  userProfile,
  onOpenAddModul,
  onEditModul,
  onDeleteModul
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJenjang, setSelectedJenjang] = useState<string>('Semua');
  const [selectedKategori, setSelectedKategori] = useState<string>('Semua');
  const [selectedMapel, setSelectedMapel] = useState<string>('Semua');
  const [sortBy, setSortBy] = useState<'populer' | 'rating' | 'terbaru'>('populer');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // AI Generator Drawer / Interactive Tool State
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [aiJenjang, setAiJenjang] = useState('SMP');
  const [aiMapel, setAiMapel] = useState('IPA');
  const [aiTopik, setAiTopik] = useState('Ekosistem dan Konservasi Alam Garut');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState<any>(null);

  // List of unique Mata Pelajaran
  const mapelOptions = useMemo(() => {
    const set = new Set<string>();
    modulList.forEach(m => set.add(m.mataPelajaran));
    return ['Semua', ...Array.from(set)];
  }, [modulList]);

  // Filtered Modul
  const filteredModul = useMemo(() => {
    return modulList.filter(item => {
      // Search text
      const q = searchQuery.toLowerCase();
      const matchQuery = !q || (
        item.judul.toLowerCase().includes(q) ||
        item.mataPelajaran.toLowerCase().includes(q) ||
        item.penyusun.toLowerCase().includes(q) ||
        item.ringkasanMateri.toLowerCase().includes(q) ||
        (item.kodeDapodik && item.kodeDapodik.toLowerCase().includes(q)) ||
        (item.idPMM && item.idPMM.toLowerCase().includes(q)) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      );

      // Jenjang Filter
      let matchJenjang = true;
      if (selectedJenjang === 'PAUD/TK') matchJenjang = item.jenjang === 'PAUD' || item.jenjang === 'TK';
      else if (selectedJenjang === 'SD') matchJenjang = item.jenjang === 'SD' || item.jenjang === 'MI';
      else if (selectedJenjang === 'SMP') matchJenjang = item.jenjang === 'SMP' || item.jenjang === 'MTs';
      else if (selectedJenjang === 'SMA') matchJenjang = item.jenjang === 'SMA' || item.jenjang === 'MA';
      else if (selectedJenjang === 'SMK') matchJenjang = item.jenjang === 'SMK';
      else if (selectedJenjang === 'SLB') matchJenjang = item.jenjang === 'SLB';

      // Kategori Filter
      let matchKategori = true;
      if (selectedKategori === 'P5') matchKategori = item.kategoriModul === 'P5' || item.judul.includes('P5');
      else if (selectedKategori === 'Kejuruan Vokasi') matchKategori = item.kategoriModul === 'Kejuruan Vokasi' || item.jenjang === 'SMK';
      else if (selectedKategori === 'Inklusi') matchKategori = item.kategoriModul === 'Inklusi' || item.jenjang === 'SLB';
      else if (selectedKategori === 'Dapodik Valid') matchKategori = !!item.kodeDapodik;

      // Mapel Filter
      const matchMapel = selectedMapel === 'Semua' || item.mataPelajaran === selectedMapel;

      return matchQuery && matchJenjang && matchKategori && matchMapel;
    }).sort((a, b) => {
      if (sortBy === 'populer') return b.unduhanCount - a.unduhanCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [modulList, searchQuery, selectedJenjang, selectedKategori, selectedMapel, sortBy]);

  const handleDownloadDirect = (e: React.MouseEvent, modul: ModulAjar) => {
    e.stopPropagation();
    exportModulAjarToDoc(modul);
    setToastMessage(`Dokumen Word "${modul.judul}" berhasil diunduh!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleGenerateAI = () => {
    if (!aiTopik.trim()) return;
    setIsGenerating(true);
    setGeneratedDraft(null);

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedDraft({
        judul: `Modul Ajar: ${aiTopik}`,
        jenjang: aiJenjang,
        mataPelajaran: aiMapel,
        tp: [
          `Peserta didik mampu mengidentifikasi konsep esensial mengenai ${aiTopik} dengan rasa ingin tahu tinggi.`,
          `Peserta didik mampu menganalisis hubungan kontekstual ${aiTopik} dalam kehidupan masyarakat Kabupaten Garut.`,
          `Peserta didik mampu membuat karya / laporan pemecahan masalah secara kolaboratif.`
        ],
        pemahamanBermakna: `Mempelajari ${aiTopik} membekali peserta didik dengan kecakapan berpikir kritis dan kepedulian terhadap kemajuan potensi lokal Garut.`,
        pemantik: [
          `Bagaimana ${aiTopik} berdampak langsung pada kehidupan kita sehari-hari?`,
          `Apa inovasi sederhana yang bisa kita buat untuk menyelesaikan tantangan terkait topik ini?`
        ],
        aktivitas: [
          'Tahap 1: Eksplorasi fenomena kontekstual & orientasi masalah.',
          'Tahap 2: Diskusi kelompok terarah & studi literatur terpadu.',
          'Tahap 3: Pembuatan artefak karya / simulasi pemecahan masalah.',
          'Tahap 4: Presentasi hasil dan refleksi bersama.'
        ],
        lkpdTitle: `LKPD Eksplorasi: ${aiTopik}`
      });
    }, 1000);
  };

  const handleDownloadGeneratedDraft = () => {
    if (!generatedDraft) return;
    const syntheticModul: ModulAjar = {
      id: 'modul-ai-draft-' + Date.now(),
      judul: generatedDraft.judul,
      mataPelajaran: generatedDraft.mataPelajaran,
      jenjang: (generatedDraft.jenjang === 'PAUD/TK' ? 'TK' : generatedDraft.jenjang) as any,
      fase: 'Fase D (SMP Kelas 7-9)',
      kelas: 'Kelas Terpilih',
      semester: '1 (Ganjil)',
      alokasiWaktu: '6 JP (3 Pertemuan)',
      penyusun: userProfile.nama || 'Guru Kabupaten Garut',
      instansiPenyusun: userProfile.sekolahAsal || 'Dinas Pendidikan Kab. Garut',
      tahunAjaran: '2026/2027',
      kurikulum: 'Kurikulum Merdeka BSKAP Kemendikdasmen',
      nomorSKKemendikdasmen: 'Keputusan Kepala BSKAP No. 032/H/KR/2024',
      kodeDapodik: 'DPK-AI-GEN-2026-GRT',
      idPMM: 'PMM-GEN-AI-2026',
      fileSize: '3.0 MB',
      formatFile: 'DOCX & PDF',
      profilPelajarPancasila: ['Bernalar Kritis', 'Kreatif', 'Gotong Royong'],
      saranaPrasarana: ['Chromebook/Laptop', 'Media Interaktif', 'LKPD Berbasis Konteks Garut'],
      targetPesertaDidik: 'Peserta didik reguler',
      modelPembelajaran: 'Problem-Based Learning & Inkuiri Terbimbing',
      capaianPembelajaran: `Peserta didik mampu memahami secara holistik konsep ${aiTopik} dan menerapkannya dalam menyelesaikan permasalahan kontekstual di lingkungan sekitar.`,
      tujuanPembelajaran: generatedDraft.tp,
      pemahamanBermakna: generatedDraft.pemahamanBermakna,
      pertanyaanPemantik: generatedDraft.pemantik,
      kegiatanPembelajaran: {
        pendahuluan: [
          'Guru membuka pembelajaran dengan salam, doa, dan ice breaking kontekstual Garut.',
          'Apersepsi dan orientasi masalah terkait topik.'
        ],
        intiBerdiferensiasi: {
          diferensiasiProses: 'Pembelajaran berkelompok dengan pendampingan bertingkat (scaffolding).',
          langkahLangkah: generatedDraft.aktivitas
        },
        penutupRefleksi: [
          'Siswa menyimpulkan materi dan melakukan refleksi bersama guru.',
          'Pemberian apresiasi dan doa penutup.'
        ]
      },
      asesmen: {
        awalDiagnostik: 'Kuis pemetaan pemahaman awal peserta didik.',
        formatif: 'Observasi keaktifan diskusi dan unjuk kerja LKPD.',
        sumatif: 'Ujian akhir pemahaman konsep dan penilaian produk karya.',
        rubrik: [
          {
            kriteria: 'Penguasaan Konsep',
            perluBimbingan: 'Belum memahami konsep dasar.',
            cukup: 'Memahami konsep dengan bantuan arahan.',
            baik: 'Memahami konsep secara mandiri dengan tepat.',
            sangatBaik: 'Sangat menguasai konsep dan mampu mengaitkan dengan konteks nyata.'
          }
        ]
      },
      lkpd: {
        judul: generatedDraft.lkpdTitle,
        petunjuk: ['Bekerjalah dengan kelompokmu.', 'Jawab pertanyaan dengan teliti.'],
        soalAktivitas: [
          `Analisis kasus kontekstual mengenai ${aiTopik} di daerah Garut!`,
          `Rancang solusi kreatif yang dapat diimplementasikan!`
        ]
      },
      ringkasanMateri: `Materi esensial tentang ${aiTopik} diselaraskan dengan standar Capaian Pembelajaran Kurikulum Merdeka Kemendikdasmen RI.`,
      glosarium: [`${aiTopik}: Konsep esensial yang dipelajari`],
      daftarPustaka: ['BSKAP Kemendikdasmen RI (2024)', 'Panduan Pembelajaran & Asesmen Kurikulum Merdeka'],
      tags: ['Kurikulum Merdeka', 'Garut Cerdas', aiTopik],
      unduhanCount: 1,
      rating: 5.0
    };

    exportModulAjarToDoc(syntheticModul);
    setToastMessage(`Draf Modul Ajar Word "${syntheticModul.judul}" berhasil diunduh!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 🌟 HERO BANNER: MODUL AJAR SEMUA JENJANG GARUT CERDAS */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-800 via-emerald-800 to-teal-900 text-white p-6 sm:p-8 shadow-xl border border-teal-700/50">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/30 border border-teal-300/30 backdrop-blur-md text-teal-200 text-xs font-extrabold uppercase tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Bank Perangkat Ajar Kurikulum Merdeka Kab. Garut
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-black font-['Outfit',sans-serif] tracking-tight leading-tight">
            Modul Ajar & RPP Semua Jenjang
          </h1>
          
          <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed">
            Kumpulan perangkat ajar resmi berbasis kearifan lokal Kabupaten Garut untuk pendidik, orang tua, dan siswa. 
            Mencakup jenjang <span className="font-bold text-amber-300">PAUD/TK, SD/MI, SMP/MTs, SMA/MA, SMK Vokasi, hingga SLB Inklusi</span>.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            {userProfile.isAdmin && onOpenAddModul && (
              <button
                id="btn-admin-publish-modul-hero"
                onClick={onOpenAddModul}
                className="px-4 py-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-slate-950" />
                <span>+ Terbitkan Modul Ajar Resmi</span>
              </button>
            )}

            <button
              id="btn-open-ai-generator"
              onClick={() => setShowAIGenerator(!showAIGenerator)}
              className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Wand2 className="w-4 h-4 text-slate-950" />
              <span>{showAIGenerator ? 'Tutup Generator AI' : 'Buat Draf Modul Ajar Cepat (AI)'}</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-teal-200 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Sesuai Standar BSKAP Kemendikdasmen 2026/2027
            </div>
          </div>
        </div>

        {/* Decorative Background Icons */}
        <div className="absolute -right-8 -bottom-8 opacity-10 text-white pointer-events-none hidden md:block">
          <BookOpen className="w-64 h-64" />
        </div>
      </div>

      {/* 🤖 INTERACTIVE AI GENERATOR DRAWER */}
      {showAIGenerator && (
        <div className="bg-white border-2 border-teal-500/40 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-teal-100 text-teal-800">
                <Wand2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 font-['Outfit',sans-serif]">
                  AI Generator Draf Modul Ajar Garut
                </h3>
                <p className="text-xs text-slate-500">
                  Susun draf Capaian Pembelajaran, TP, dan LKPD otomatis berbasis tema lokal Garut
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAIGenerator(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              Tutup
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Jenjang:</label>
              <select
                id="ai-select-jenjang"
                value={aiJenjang}
                onChange={(e) => setAiJenjang(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              >
                <option value="PAUD/TK">PAUD & TK (Fase Fondasi)</option>
                <option value="SD">SD / MI (Fase A-C)</option>
                <option value="SMP">SMP / MTs (Fase D)</option>
                <option value="SMA">SMA / MA (Fase E-F)</option>
                <option value="SMK">SMK Vokasi (Fase F)</option>
                <option value="SLB">SLB / Inklusi (Fase Khusus)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mata Pelajaran:</label>
              <input
                id="ai-input-mapel"
                type="text"
                value={aiMapel}
                onChange={(e) => setAiMapel(e.target.value)}
                placeholder="Contoh: Matematika, IPAS, B. Sunda"
                className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Topik / Materi Pembelajaran:</label>
              <input
                id="ai-input-topik"
                type="text"
                value={aiTopik}
                onChange={(e) => setAiTopik(e.target.value)}
                placeholder="Contoh: Energi Terbarukan Kamojang Garut"
                className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              id="btn-run-generate-modul"
              onClick={handleGenerateAI}
              disabled={isGenerating || !aiTopik.trim()}
              className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyusun Struktur Modul...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Susun Draf Modul Ajar</span>
                </>
              )}
            </button>
          </div>

          {/* Result Preview */}
          {generatedDraft && (
            <div className="mt-4 bg-teal-50/70 border border-teal-200 rounded-2xl p-4 sm:p-5 space-y-3 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-700 text-white text-[10px] font-black uppercase">
                  Draf Berhasil Disusun
                </span>
                <span className="text-xs text-teal-800 font-semibold">{generatedDraft.jenjang} • {generatedDraft.mataPelajaran}</span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-teal-950 font-['Outfit',sans-serif]">
                {generatedDraft.judul}
              </h4>

              <div className="space-y-2 text-xs text-slate-800">
                <div>
                  <strong className="text-teal-900 block font-bold">🎯 Tujuan Pembelajaran (TP):</strong>
                  <ul className="list-disc list-inside space-y-1 mt-0.5 text-slate-700">
                    {generatedDraft.tp.map((t: string, i: number) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <strong className="text-teal-900 block font-bold">💡 Pemahaman Bermakna:</strong>
                  <p className="text-slate-700">{generatedDraft.pemahamanBermakna}</p>
                </div>

                <div>
                  <strong className="text-teal-900 block font-bold">❓ Pertanyaan Pemantik:</strong>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                    {generatedDraft.pemantik.map((q: string, i: number) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-teal-200">
                <button
                  id="btn-download-ai-draft"
                  onClick={handleDownloadGeneratedDraft}
                  className="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Draf Lengkap (.DOC)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="p-3 bg-emerald-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 🔍 SEARCH & FILTER BAR */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs space-y-4">
        
        {/* Row 1: Search Input & Sort */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="search-modul-ajar"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari modul ajar, kode Dapodik (DPK-...), ID PMM, topik kearifan lokal..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <select
              id="sort-modul-ajar"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full sm:w-auto text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            >
              <option value="populer">Paling Banyak Diunduh</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Row 2: Jenjang Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-bold text-slate-500 shrink-0 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" />
            Jenjang:
          </span>
          {[
            { id: 'Semua', label: 'Semua Jenjang' },
            { id: 'PAUD/TK', label: 'PAUD / TK' },
            { id: 'SD', label: 'SD / MI' },
            { id: 'SMP', label: 'SMP / MTs' },
            { id: 'SMA', label: 'SMA / MA' },
            { id: 'SMK', label: 'SMK Vokasi' },
            { id: 'SLB', label: 'SLB / Inklusi' },
          ].map((chip) => (
            <button
              key={chip.id}
              id={`filter-modul-jenjang-${chip.id.replace('/', '-')}`}
              onClick={() => setSelectedJenjang(chip.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedJenjang === chip.id
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Row 3: Kategori Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 border-t border-slate-100 pt-2">
          <span className="text-[11px] font-bold text-slate-500 shrink-0 mr-1 flex items-center gap-1">
            <Tag className="w-3 h-3" />
            Kategori:
          </span>
          {[
            { id: 'Semua', label: 'Semua Kategori' },
            { id: 'Dapodik Valid', label: 'Terverifikasi Kemendikdasmen' },
            { id: 'P5', label: 'P5 Kearifan Lokal' },
            { id: 'Kejuruan Vokasi', label: 'SMK Kejuruan' },
            { id: 'Inklusi', label: 'SLB & Inklusi' },
          ].map((k) => (
            <button
              key={k.id}
              id={`filter-modul-kategori-${k.id.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedKategori(k.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedKategori === k.id
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              {k.label}
            </button>
          ))}
        </div>

        {/* Row 4: Mata Pelajaran Filter */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 shrink-0">Mapel:</span>
          {mapelOptions.slice(0, 10).map((m) => (
            <button
              key={m}
              id={`filter-modul-mapel-${m.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedMapel(m)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedMapel === m
                  ? 'bg-teal-100 text-teal-900 font-bold'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

      </div>

      {/* 📋 MODUL AJAR CARDS GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-slate-500">
            Menampilkan <strong className="text-slate-900">{filteredModul.length}</strong> perangkat modul ajar Kurikulum Merdeka
          </p>
        </div>

        {filteredModul.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-2xs space-y-3">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">Modul Ajar Tidak Ditemukan</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Tidak ada perangkat modul ajar yang cocok dengan kata kunci atau filter yang Anda pilih.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedJenjang('Semua');
                setSelectedKategori('Semua');
                setSelectedMapel('Semua');
              }}
              className="px-4 py-2 bg-teal-50 text-teal-700 rounded-xl text-xs font-bold hover:bg-teal-100 transition-colors cursor-pointer"
            >
              Reset Filter Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {filteredModul.map((modul) => (
              <div
                key={modul.id}
                id={`modul-card-${modul.id}`}
                className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-teal-400"
              >
                <div>
                  {/* Card Header Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-black tracking-wide uppercase">
                        {modul.jenjang}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                        {modul.fase}
                      </span>
                      {modul.kodeDapodik && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[9px] font-extrabold flex items-center gap-1">
                          <ShieldCheck className="w-2.5 h-2.5 text-emerald-700" />
                          Dapodik
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {modul.rating} ({modul.unduhanCount.toLocaleString('id-ID')} unduhan)
                    </div>
                  </div>

                  {/* Title & Subject */}
                  <h3 className="text-base sm:text-lg font-black text-slate-900 font-['Outfit',sans-serif] group-hover:text-teal-700 transition-colors leading-snug mb-1">
                    {modul.judul}
                  </h3>

                  <p className="text-xs font-bold text-teal-600 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    {modul.mataPelajaran} • {modul.kelas}
                  </p>

                  {/* Brief Material & Learning Goal */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {modul.ringkasanMateri}
                  </p>

                  {/* TP Preview */}
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 mb-3 text-[11px] text-slate-700">
                    <strong className="text-slate-900 block mb-1">🎯 Tujuan Pembelajaran:</strong>
                    <p className="line-clamp-2">{modul.tujuanPembelajaran[0]}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {modul.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer & Action */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-400">
                    Oleh <span className="font-semibold text-slate-700">{modul.instansiPenyusun}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {userProfile.isAdmin && onEditModul && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditModul(modul);
                        }}
                        className="p-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold transition-all cursor-pointer"
                        title="Edit Modul Ajar (Admin Disdik)"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {userProfile.isAdmin && onDeleteModul && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Hapus modul "${modul.judul}"?`)) {
                            onDeleteModul(modul.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-all cursor-pointer"
                        title="Hapus Modul Ajar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      id={`btn-quick-download-${modul.id}`}
                      onClick={(e) => handleDownloadDirect(e, modul)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                      title="Unduh Dokumen Word (.doc)"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline text-[11px]">.DOC</span>
                    </button>
                    <button
                      id={`btn-view-modul-${modul.id}`}
                      onClick={() => onSelectModul(modul)}
                      className="px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Detail & LKPD</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
