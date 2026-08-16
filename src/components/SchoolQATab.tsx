import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Send, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  School as SchoolIcon, 
  User, 
  Filter,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { School, SchoolQuestion, UserProfile } from '../types';

interface SchoolQATabProps {
  schools: School[];
  questions: SchoolQuestion[];
  userProfile: UserProfile;
  onAddQuestion: (q: Omit<SchoolQuestion, 'id' | 'tanggalTanya' | 'status'>) => void;
  onOpenAIAssistant: () => void;
  selectedSchoolForQA?: School | null;
}

export const SchoolQATab: React.FC<SchoolQATabProps> = ({
  schools,
  questions,
  userProfile,
  onAddQuestion,
  onOpenAIAssistant,
  selectedSchoolForQA
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchoolFilter, setSelectedSchoolFilter] = useState<string>(selectedSchoolForQA ? selectedSchoolForQA.id : 'Semua');
  const [selectedKategoriFilter, setSelectedKategoriFilter] = useState<string>('Semua');

  // Form State
  const [showAskForm, setShowAskForm] = useState<boolean>(!!selectedSchoolForQA);
  const [targetSchoolId, setTargetSchoolId] = useState<string>(selectedSchoolForQA ? selectedSchoolForQA.id : schools[0]?.id || '');
  const [pengirimNama, setPengirimNama] = useState<string>(userProfile.nama);
  const [pengirimRole, setPengirimRole] = useState<'Orang Tua' | 'Siswa' | 'Guru' | 'Masyarakat'>(userProfile.role as any || 'Orang Tua');
  const [kategoriTanya, setKategoriTanya] = useState<string>('Syarat & PPDB');
  const [isiPertanyaan, setIsiPertanyaan] = useState<string>('');
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isiPertanyaan.trim() || !targetSchoolId) return;

    const targetSchool = schools.find(s => s.id === targetSchoolId);
    if (!targetSchool) return;

    onAddQuestion({
      schoolId: targetSchool.id,
      schoolName: targetSchool.nama,
      namaPengirim: pengirimNama || 'Warga Garut',
      rolePengirim: pengirimRole,
      pertanyaan: isiPertanyaan.trim(),
      kategori: kategoriTanya
    });

    setIsiPertanyaan('');
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowAskForm(false);
    }, 2500);
  };

  const filteredQuestions = questions.filter(q => {
    const matchSearch = 
      q.pertanyaan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.jawaban && q.jawaban.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchSearch) return false;

    if (selectedSchoolFilter !== 'Semua' && q.schoolId !== selectedSchoolFilter) return false;
    if (selectedKategoriFilter !== 'Semua' && q.kategori !== selectedKategoriFilter) return false;

    return true;
  });

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold border border-cyan-200 mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Modul 7 • Tanya Jawab & Layanan Informasi Sekolah</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
              Tanya Jawab Langsung ke Pihak Sekolah
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Ajukan pertanyaan langsung kepada panitia PPDB dan operator sekolah se-Garut, atau tanyakan jawaban instan kepada Kang Cerdas AI.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="tanya-ai-btn"
              onClick={onOpenAIAssistant}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Tanya Instan Kang Cerdas AI</span>
            </button>

            <button
              id="buat-pertanyaan-btn"
              onClick={() => setShowAskForm(!showAskForm)}
              className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{showAskForm ? 'Tutup Form' : 'Kirim Pertanyaan Baru'}</span>
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-5 pt-4 border-t border-slate-100">
          <div className="relative sm:col-span-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari topik pertanyaan atau jawaban..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <select
              value={selectedSchoolFilter}
              onChange={(e) => setSelectedSchoolFilter(e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
            >
              <option value="Semua">Semua Sekolah di Garut</option>
              {schools.map(s => (
                <option key={s.id} value={s.id}>{s.nama}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedKategoriFilter}
              onChange={(e) => setSelectedKategoriFilter(e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
            >
              <option value="Semua">Semua Kategori</option>
              <option value="Syarat & PPDB">Syarat & PPDB</option>
              <option value="Biaya & Beasiswa">Biaya & Beasiswa</option>
              <option value="Kurikulum">Kurikulum & Jurusan</option>
              <option value="Fasilitas & Asrama">Fasilitas & Asrama</option>
            </select>
          </div>
        </div>
      </div>

      {/* FORM AJUKAN PERTANYAAN BARU */}
      {showAskForm && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-cyan-200 shadow-md animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif] flex items-center gap-2">
              <Send className="w-4 h-4 text-cyan-600" />
              <span>Formulir Pertanyaan Resmi ke Sekolah</span>
            </h3>
            <span className="text-xs text-slate-400">Pertanyaan akan diteruskan ke Humas Sekolah</span>
          </div>

          {submittedSuccess ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
              <h4 className="font-bold text-sm">Pertanyaan Berhasil Dikirimkan!</h4>
              <p className="text-xs text-emerald-800 mt-0.5">
                Pihak sekolah akan memverifikasi dan memberikan tanggapan resmi di forum ini.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sekolah Tujuan:</label>
                  <select
                    id="qa-target-school"
                    value={targetSchoolId}
                    onChange={(e) => setTargetSchoolId(e.target.value)}
                    required
                    className="w-full font-semibold p-2.5 bg-slate-50 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                  >
                    {schools.map(s => (
                      <option key={s.id} value={s.id}>{s.nama} ({s.kecamatan})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Lengkap Pengirim:</label>
                  <input
                    type="text"
                    required
                    value={pengirimNama}
                    onChange={(e) => setPengirimNama(e.target.value)}
                    placeholder="Contoh: Bp. Hendra / Siti Nurhaliza"
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Topik:</label>
                  <select
                    value={kategoriTanya}
                    onChange={(e) => setKategoriTanya(e.target.value)}
                    className="w-full font-semibold p-2.5 bg-slate-50 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Syarat & PPDB">Syarat & Jalur PPDB</option>
                    <option value="Biaya & Beasiswa">Biaya SPP & Beasiswa</option>
                    <option value="Kurikulum">Jurusan & Kurikulum</option>
                    <option value="Fasilitas & Asrama">Fasilitas, Ekstra & Asrama</option>
                  </select>
                </div>

              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tuliskan Pertanyaan Anda Secara Jelas:</label>
                <textarea
                  required
                  rows={3}
                  value={isiPertanyaan}
                  onChange={(e) => setIsiPertanyaan(e.target.value)}
                  placeholder="Contoh: Apakah untuk siswa dari luar kecamatan bisa mendaftar lewat jalur prestasi rapor? Dan berapa rata-rata nilai minimal yang aman?..."
                  className="w-full p-3 bg-slate-50 rounded-2xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 text-slate-900"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAskForm(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pertanyaan Resmi</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* QUESTIONS & ANSWERS FEED */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3"
          >
            {/* Question Header */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[10px] font-extrabold">
                  {q.schoolName}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
                  {q.kategori}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">{q.tanggalTanya}</span>
            </div>

            {/* Question Content */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                {q.namaPengirim.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  {q.namaPengirim} <span className="text-[11px] font-normal text-slate-400">({q.rolePengirim})</span>
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-1 leading-relaxed">
                  "{q.pertanyaan}"
                </p>
              </div>
            </div>

            {/* Official Answer Box */}
            {q.jawaban ? (
              <div className="mt-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Jawaban Resmi dari {q.dijawabOleh || 'Pihak Sekolah'}</span>
                  </div>
                  {q.tanggalJawab && (
                    <span className="text-[10px] text-slate-400">{q.tanggalJawab}</span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {q.jawaban}
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-amber-50 text-amber-800 text-xs flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Pertanyaan sedang dalam proses verifikasi & tanggapan oleh pihak sekolah.</span>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
