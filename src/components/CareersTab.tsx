import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Briefcase, 
  BookOpen, 
  School as SchoolIcon,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import { garutCareerPathways, quizQuestions } from '../data/careersData';
import { School } from '../types';

interface CareersTabProps {
  schools: School[];
  onSelectSchool: (school: School) => void;
}

export const CareersTab: React.FC<CareersTabProps> = ({ schools, onSelectSchool }) => {
  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [activeCareerCategory, setActiveCareerCategory] = useState<string>('Semua');

  const handleSelectOption = (category: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: category
    }));

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizSubmitted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  // Calculate dominant category from quiz
  const getDominantCategory = () => {
    const counts: Record<string, number> = {};
    (Object.values(selectedAnswers) as string[]).forEach((cat: string) => {
      counts[cat] = (counts[cat] || 0) + 1;
    });

    let topCategory = 'Teknologi';
    let maxCount = 0;
    Object.entries(counts).forEach(([cat, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topCategory = cat;
      }
    });

    return topCategory;
  };

  const dominant = quizSubmitted ? getDominantCategory() : null;

  // Sektor Unggulan Garut
  const sektorUnggulanGarut = [
    {
      nama: 'Industri Kreatif & Kerajinan Kulit Ekspor Sukaregang',
      deskripsi: 'Garut adalah sentra kerajinan kulit nomor 1 di Indonesia dengan potensi ekspor jaket, tas, sepatu, dan aksesoris ke pasar Asia & Eropa.',
      jurusan: ['Desain Produk / Kriya Kulit', 'Kewirausahaan', 'Digital Marketing'],
      sekolahGarut: ['SMKN 1 Garut', 'SMKN 2 Garut', 'BLK Garut']
    },
    {
      nama: 'Agribisnis Modern & Pengolahan Hasil Tani (Cikajang/Bayongbong)',
      deskripsi: 'Sentra sayuran dataran tinggi, Kopi Arabika Garut (Preanger), Jeruk Garut, dan teh dengan penerapan smart agriculture & ekspor.',
      jurusan: ['Agribisnis Tanaman', 'Teknologi Pangan', 'Manajemen Agribisnis'],
      sekolahGarut: ['SMKN 3 Garut', 'SMKN 1 Cilawu', 'Faperta Universitas Garut']
    },
    {
      nama: 'Pariwisata Alam, Geowisata & Perhotelan (Cipanas, Papandayan)',
      deskripsi: 'Pembangunan pesat resor pemandian air panas Cipanas, wisata gunung Papandayan, dan wisata bahari Santolo/Sayang Heulang.',
      jurusan: ['Perhotelan & Akomodasi', 'Usaha Layanan Wisata', 'Tata Boga / Kuliner'],
      sekolahGarut: ['SMK Wikrama 1 Garut', 'SMKN 1 Garut', 'Politeknik Pariwisata']
    },
    {
      nama: 'Teknologi Informasi & Software Development',
      deskripsi: 'Kebutuhan tenaga IT remote-working, digitalisasi UMKM dodol/kulit Garut, startup lokal, dan administrasi smart city.',
      jurusan: ['Rekayasa Perangkat Lunak (RPL)', 'Teknik Komputer Jaringan (TKJ)', 'Desain Komunikasi Visual (DKV)'],
      sekolahGarut: ['SMKN 1 Garut', 'SMK Wikrama 1 Garut', 'ITG Garut']
    }
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 mb-2">
          <Compass className="w-3.5 h-3.5" />
          <span>Modul 6 • Panduan Jurusan & Masa Depan Karir Garut</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
          Pemetaan Minat Bakat & Prospek Karir Garut
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Bantu anak dan siswa menemukan potensi terbaiknya dengan tes minat bakat interaktif, rekomendasi jurusan sekolah, dan peta peluang kerja 5–10 tahun ke depan.
        </p>
      </div>

      {/* 🧠 TES MINAT & BAKAT INTERAKTIF */}
      <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <h2 className="text-base sm:text-lg font-bold font-['Outfit',sans-serif]">
              Tes Eksplorasi Minat & Bakat (6 Soal Cepat)
            </h2>
          </div>
          {!quizSubmitted && (
            <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
              Soal {currentQuestionIndex + 1} dari {quizQuestions.length}
            </span>
          )}
        </div>

        {!quizSubmitted ? (
          <div className="mt-5 space-y-4">
            
            {/* Progress Bar */}
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-amber-400 h-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>

            <h3 className="text-base sm:text-lg font-extrabold text-white mt-3 leading-snug">
              {quizQuestions[currentQuestionIndex].soal}
            </h3>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {quizQuestions[currentQuestionIndex].pilihan.map((pil, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(pil.dimensi)}
                  className="p-4 rounded-2xl bg-white/10 hover:bg-white/25 border border-white/15 hover:border-amber-300 transition-all text-left group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white group-hover:text-amber-200">
                      {pil.text}
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-amber-300 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 text-xs text-blue-200">
              <span>Pilih jawaban yang paling menggambarkan dirimu atau anakmu.</span>
              {currentQuestionIndex > 0 && (
                <button
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                  className="hover:underline text-white font-semibold"
                >
                  &larr; Soal Sebelumnya
                </button>
              )}
            </div>

          </div>
        ) : (
          
          /* QUIZ RESULT DISPLAY */
          <div className="mt-5 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="p-5 rounded-2xl bg-white/15 backdrop-blur-md border border-amber-300/40 text-center">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-extrabold text-xs">
                HASIL ANALISIS BAKAT KAMU
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-2">
                Tipe Dominan: <span className="text-amber-300">{dominant}</span>
              </h3>
              <p className="text-xs text-blue-100 mt-1 max-w-lg mx-auto leading-relaxed">
                Kamu memiliki kecenderungan pemecahan masalah yang analitis, ketertarikan tinggi pada praktek terapan, dan inovasi yang relevan dengan perkembangan ekonomi modern Garut.
              </p>

              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi Tes</span>
                </button>
              </div>
            </div>

            {/* Rekomendasi Sekolah & Jurusan di Garut */}
            <div className="p-4 rounded-2xl bg-white text-slate-900 space-y-3">
              <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Rekomendasi Jurusan & Sekolah di Kabupaten Garut untuk Tipe {dominant}:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="text-[10px] font-bold text-blue-700 block">JALUR SMK (VOKASI)</span>
                  <p className="font-bold text-slate-800 mt-0.5">RPL / TKJ / DKV / Otomotif</p>
                  <span className="text-[10px] text-slate-500">Sekolah: SMKN 1 Garut, SMKN 2 Garut, SMK Wikrama</span>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] font-bold text-emerald-700 block">JALUR SMA (AKADEMIK)</span>
                  <p className="font-bold text-slate-800 mt-0.5">MIPA / Peminatan Sains & Teknologi</p>
                  <span className="text-[10px] text-slate-500">Sekolah: SMAN 1 Garut, SMAN 11 Garut</span>
                </div>

                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                  <span className="text-[10px] font-bold text-purple-700 block">KULIAH / TINGGI</span>
                  <p className="font-bold text-slate-800 mt-0.5">Teknik Informatika / Sistem Informasi</p>
                  <span className="text-[10px] text-slate-500">Kampus: ITG Garut, UNIGA Garut</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* 🗺️ SEKTOR UNGGULAN EKONOMI GARUT 5-10 TAHUN KE DEPAN */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
          <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
              Peta Sektor Unggulan Karir di Kabupaten Garut (2026–2035)
            </h2>
            <p className="text-xs text-slate-500">Kebutuhan tenaga kerja dan wirausaha potensial daerah</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {sektorUnggulanGarut.map((sek, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-indigo-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-extrabold">
                  Sektor #{idx + 1} Garut
                </span>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 mt-2">
                  {sek.nama}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {sek.deskripsi}
                </p>

                <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-xs">
                  <span className="font-semibold text-slate-700 block mb-1">Jurusan Terkait:</span>
                  <div className="flex flex-wrap gap-1">
                    {sek.jurusan.map((j, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-slate-800">
                        {j}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 text-[11px] text-blue-700 font-medium">
                📍 Pilihan Sekolah di Garut: {sek.sekolahGarut.join(' • ')}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
