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
  HelpCircle,
  Edit3,
  Trash2,
  ShieldCheck
} from 'lucide-react';
import { School, SchoolQuestion, UserProfile } from '../types';

interface SchoolQATabProps {
  schools: School[];
  questions: SchoolQuestion[];
  userProfile: UserProfile;
  onAddQuestion: (q: Omit<SchoolQuestion, 'id' | 'tanggalTanya' | 'status'>) => void;
  onOpenAIAssistant: () => void;
  selectedSchoolForQA?: School | null;
  onAnswerQuestion?: (questionId: string, answerText: string, responderName: string) => void;
  onDeleteQuestion?: (questionId: string) => void;
}

export const SchoolQATab: React.FC<SchoolQATabProps> = ({
  schools,
  questions,
  userProfile,
  onAddQuestion,
  onOpenAIAssistant,
  selectedSchoolForQA,
  onAnswerQuestion,
  onDeleteQuestion
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

  // Admin Answering State
  const [answeringQuestionId, setAnsweringQuestionId] = useState<string | null>(null);
  const [answerInput, setAnswerInput] = useState<string>('');

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

  const handleSendAnswer = (qId: string) => {
    if (!answerInput.trim() || !onAnswerQuestion) return;
    const responder = userProfile.isAdmin ? 'Admin Dinas Pendidikan Kab. Garut' : userProfile.nama;
    onAnswerQuestion(qId, answerInput.trim(), responder);
    setAnsweringQuestionId(null);
    setAnswerInput('');
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

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenAIAssistant}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Tanya AI Garut (Instan)</span>
            </button>

            <button
              onClick={() => setShowAskForm(!showAskForm)}
              className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{showAskForm ? 'Tutup Formulir' : '+ Ajukan Pertanyaan'}</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-5 pt-4 border-t border-slate-100">
          <div className="relative sm:col-span-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kata kunci pertanyaan..."
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
              <option value="Semua">Semua Sekolah Tujuan</option>
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
              <option value="Biaya & SPP">Biaya & SPP</option>
              <option value="Jurusan & Minat">Jurusan & Minat</option>
              <option value="Fasilitas & Asrama">Fasilitas & Asrama</option>
              <option value="Beasiswa & Bantuan">Beasiswa & Bantuan</option>
            </select>
          </div>
        </div>
      </div>

      {/* FORM AJUKAN PERTANYAAN (COLLAPSIBLE) */}
      {showAskForm && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-cyan-500/40 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <h2 className="text-base font-extrabold text-slate-900 mb-1">
            Kirim Pertanyaan Terbuka ke Sekolah
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Pertanyaan dan jawaban resmi dari operator sekolah akan ditampilkan di portal untuk membantu warga lainnya.
          </p>

          {submittedSuccess ? (
            <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-bold text-xs">Pertanyaan Berhasil Dikirim!</h4>
                <p className="text-[11px]">Pertanyaan Anda telah diteruskan ke panitia sekolah terkait.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pilih Sekolah Tujuan</label>
                  <select
                    value={targetSchoolId}
                    onChange={(e) => setTargetSchoolId(e.target.value)}
                    required
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-semibold focus:ring-2 focus:ring-cyan-500"
                  >
                    {schools.map(s => (
                      <option key={s.id} value={s.id}>{s.nama} ({s.kecamatan})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Pertanyaan</label>
                  <select
                    value={kategoriTanya}
                    onChange={(e) => setKategoriTanya(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-semibold focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Syarat & PPDB">Syarat & PPDB</option>
                    <option value="Biaya & SPP">Biaya & SPP</option>
                    <option value="Jurusan & Minat">Jurusan & Minat</option>
                    <option value="Fasilitas & Asrama">Fasilitas & Asrama</option>
                    <option value="Beasiswa & Bantuan">Beasiswa & Bantuan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Pengirim</label>
                  <input
                    type="text"
                    value={pengirimNama}
                    onChange={(e) => setPengirimNama(e.target.value)}
                    required
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Peran Pengirim</label>
                  <select
                    value={pengirimRole}
                    onChange={(e) => setPengirimRole(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-semibold"
                  >
                    <option value="Orang Tua">Orang Tua Calon Siswa</option>
                    <option value="Siswa">Siswa / Calon Siswa</option>
                    <option value="Guru">Guru / Pendidik</option>
                    <option value="Masyarakat">Masyarakat Umum</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Isi Pertanyaan Anda</label>
                <textarea
                  rows={3}
                  value={isiPertanyaan}
                  onChange={(e) => setIsiPertanyaan(e.target.value)}
                  placeholder="Contoh: Apakah untuk jalur zonasi SMPN 1 Garut memerlukan surat domisili RT/RW atau cukup Kartu Keluarga resmi?"
                  required
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-normal focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAskForm(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
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
              
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-medium">{q.tanggalTanya}</span>
                {userProfile.isAdmin && onDeleteQuestion && (
                  <button
                    onClick={() => {
                      if (window.confirm(`Hapus pertanyaan dari ${q.namaPengirim}?`)) {
                        onDeleteQuestion(q.id);
                      }
                    }}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded-md transition-colors cursor-pointer"
                    title="Hapus Pertanyaan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Question Content */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                {q.namaPengirim.charAt(0)}
              </div>
              <div className="flex-1">
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
                {userProfile.isAdmin && onAnswerQuestion && (
                  <div className="pt-1 flex justify-end">
                    <button
                      onClick={() => {
                        setAnsweringQuestionId(q.id);
                        setAnswerInput(q.jawaban || '');
                      }}
                      className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Ubah Jawaban Resmi</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-amber-50 text-amber-800 text-xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Pertanyaan sedang dalam proses verifikasi & tanggapan oleh pihak sekolah.</span>
                </div>
                {userProfile.isAdmin && onAnswerQuestion && (
                  <button
                    onClick={() => {
                      setAnsweringQuestionId(q.id);
                      setAnswerInput('');
                    }}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer shrink-0"
                  >
                    Beri Jawaban
                  </button>
                )}
              </div>
            )}

            {/* Answer Input Modal / Inline Form for Admin */}
            {answeringQuestionId === q.id && (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Tulis Jawaban Resmi Dinas / Sekolah</span>
                </div>
                <textarea
                  rows={3}
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  placeholder="Tuliskan jawaban resmi, regulasi PPDB, atau panduan teknis yang valid..."
                  className="w-full p-2.5 bg-white rounded-xl border border-emerald-300 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
                <div className="flex items-center justify-end gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setAnsweringQuestionId(null);
                      setAnswerInput('');
                    }}
                    className="px-3 py-1.5 bg-white text-slate-600 rounded-lg font-bold border border-slate-200 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSendAnswer(q.id)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold cursor-pointer shadow-xs"
                  >
                    Simpan & Publikasikan Jawaban
                  </button>
                </div>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};
