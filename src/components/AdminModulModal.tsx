import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Trash2, 
  BookOpen, 
  ShieldCheck, 
  FileText, 
  Award,
  AlertCircle
} from 'lucide-react';
import { ModulAjar, FaseModulAjar } from '../types';

interface AdminModulModalProps {
  isOpen: boolean;
  modulToEdit: ModulAjar | null; // null means create new modul
  onClose: () => void;
  onSave: (modulData: ModulAjar) => void;
  onDelete?: (modulId: string) => void;
}

export const AdminModulModal: React.FC<AdminModulModalProps> = ({
  isOpen,
  modulToEdit,
  onClose,
  onSave,
  onDelete
}) => {
  const isEditing = !!modulToEdit;

  const [judul, setJudul] = useState('');
  const [mataPelajaran, setMataPelajaran] = useState('Bahasa Sunda');
  const [jenjang, setJenjang] = useState<'TK' | 'SD' | 'SMP' | 'SMA' | 'SMK' | 'SLB'>('SMP');
  const [fase, setFase] = useState<FaseModulAjar>('Fase D (SMP Kelas 7-9)');
  const [kelas, setKelas] = useState('Kelas 7');
  const [semester, setSemester] = useState('1 (Ganjil)');
  const [alokasiWaktu, setAlokasiWaktu] = useState('6 JP (3 Pertemuan)');
  const [penyusun, setPenyusun] = useState('Tim Pengembang Kurikulum Disdik Garut');
  const [instansiPenyusun, setInstansiPenyusun] = useState('Dinas Pendidikan Kab. Garut');
  const [skKemendikdasmen, setSkKemendikdasmen] = useState('Keputusan Kepala BSKAP No. 032/H/KR/2024');
  const [kodeDapodik, setKodeDapodik] = useState(`DPK-AJAR-${new Date().getFullYear()}-GRT`);
  const [idPMM, setIdPMM] = useState(`PMM-GRT-${Math.floor(1000 + Math.random() * 9000)}`);
  
  const [capaianPembelajaran, setCapaianPembelajaran] = useState('');
  const [tujuanPembelajaran, setTujuanPembelajaran] = useState('');
  const [pemahamanBermakna, setPemahamanBermakna] = useState('');
  const [ringkasanMateri, setRingkasanMateri] = useState('');
  const [lkpdJudul, setLkpdJudul] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (modulToEdit) {
      setJudul(modulToEdit.judul);
      setMataPelajaran(modulToEdit.mataPelajaran);
      setJenjang(modulToEdit.jenjang);
      setFase(modulToEdit.fase);
      setKelas(modulToEdit.kelas);
      setSemester(modulToEdit.semester);
      setAlokasiWaktu(modulToEdit.alokasiWaktu);
      setPenyusun(modulToEdit.penyusun);
      setInstansiPenyusun(modulToEdit.instansiPenyusun);
      setSkKemendikdasmen(modulToEdit.nomorSKKemendikdasmen || 'Keputusan Kepala BSKAP No. 032/H/KR/2024');
      setKodeDapodik(modulToEdit.kodeDapodik || `DPK-AJAR-${new Date().getFullYear()}-GRT`);
      setIdPMM(modulToEdit.idPMM || `PMM-GRT-${Math.floor(1000 + Math.random() * 9000)}`);
      setCapaianPembelajaran(modulToEdit.capaianPembelajaran);
      setTujuanPembelajaran(modulToEdit.tujuanPembelajaran.join('\n'));
      setPemahamanBermakna(modulToEdit.pemahamanBermakna);
      setRingkasanMateri(modulToEdit.ringkasanMateri);
      setLkpdJudul(modulToEdit.lkpd?.judul || `LKPD: ${modulToEdit.judul}`);
    } else {
      setJudul('');
      setMataPelajaran('Bahasa Sunda');
      setJenjang('SMP');
      setFase('Fase D (SMP Kelas 7-9)');
      setKelas('Kelas 7');
      setSemester('1 (Ganjil)');
      setAlokasiWaktu('6 JP (3 Pertemuan)');
      setPenyusun('Tim Pengembang Kurikulum Disdik Garut');
      setInstansiPenyusun('Dinas Pendidikan Kab. Garut');
      setSkKemendikdasmen('Keputusan Kepala BSKAP No. 032/H/KR/2024');
      setKodeDapodik(`DPK-AJAR-${new Date().getFullYear()}-GRT`);
      setIdPMM(`PMM-GRT-${Math.floor(1000 + Math.random() * 9000)}`);
      setCapaianPembelajaran('Peserta didik mampu memahami dan menerapkan konsep materi pembelajaran sesuai standar BSKAP Kemendikdasmen berbasis kearifan lokal Garut.');
      setTujuanPembelajaran('1. Mengidentifikasi konsep dasar dan karakteristik materi.\n2. Menganalisis contoh kontekstual di wilayah Garut.\n3. Mempresentasikan hasil karya peserta didik secara kolaboratif.');
      setPemahamanBermakna('Pembelajaran ini membekali peserta didik dengan kecakapan abad-21 dan kecintaan terhadap budaya Garut.');
      setRingkasanMateri('Ringkasan materi pembelajaran disesuaikan dengan Capaian Pembelajaran Kurikulum Merdeka.');
      setLkpdJudul('Lembar Kerja Peserta Didik (LKPD) Berdiferensiasi');
    }
  }, [modulToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!judul.trim() || !mataPelajaran.trim() || !capaianPembelajaran.trim()) {
      setErrorMessage('Judul modul, mata pelajaran, dan Capaian Pembelajaran wajib diisi.');
      return;
    }

    const tpList = tujuanPembelajaran
      .split('\n')
      .map(s => s.replace(/^\d+[\.\)]\s*/, '').trim())
      .filter(Boolean);

    const updatedModul: ModulAjar = {
      id: modulToEdit?.id || `modul-${Date.now()}`,
      judul: judul.trim(),
      mataPelajaran: mataPelajaran.trim(),
      jenjang,
      fase,
      kelas,
      semester,
      alokasiWaktu,
      penyusun: penyusun.trim(),
      instansiPenyusun: instansiPenyusun.trim(),
      tahunAjaran: '2026/2027',
      kurikulum: 'Kurikulum Merdeka BSKAP Kemendikdasmen',
      nomorSKKemendikdasmen: skKemendikdasmen.trim(),
      kodeDapodik: kodeDapodik.trim(),
      idPMM: idPMM.trim(),
      fileSize: modulToEdit?.fileSize || '3.2 MB',
      formatFile: 'DOCX & PDF',
      profilPelajarPancasila: modulToEdit?.profilPelajarPancasila || ['Bernalar Kritis', 'Kreatif', 'Gotong Royong', 'Berkebinekaan Global'],
      saranaPrasarana: modulToEdit?.saranaPrasarana || ['Chromebook/Laptop', 'Media Interaktif', 'Buku Teks Kemendikbud'],
      targetPesertaDidik: 'Peserta didik reguler / tipikal',
      modelPembelajaran: 'Problem-Based Learning & Pembelajaran Berdiferensiasi',
      capaianPembelajaran: capaianPembelajaran.trim(),
      tujuanPembelajaran: tpList.length ? tpList : ['Memahami materi secara terstruktur.', 'Mengaplikasikan konsep dalam kehidupan nyata.'],
      pemahamanBermakna: pemahamanBermakna.trim(),
      pertanyaanPemantik: modulToEdit?.pertanyaanPemantik || [
        'Bagaimana konsep ini berkaitan dengan kehidupan sehari-hari di Garut?',
        'Apa manfaat yang dapat kita ambil dari materi ini?'
      ],
      kegiatanPembelajaran: modulToEdit?.kegiatanPembelajaran || {
        pendahuluan: [
          'Guru menyapa dan memimpin doa pembuka.',
          'Apersepsi dan pemetaan kesiapan belajar.'
        ],
        intiBerdiferensiasi: {
          diferensiasiProses: 'Diskusi kelompok terarah dengan pendampingan bertingkat.',
          langkahLangkah: [
            'Orientasi peserta didik pada masalah.',
            'Penyelidikan mandiri dan kelompok.',
            'Presentasi karya dan refleksi.'
          ]
        },
        penutupRefleksi: [
          'Kesimpulan dan umpan balik bersama guru.',
          'Doa dan salam penutup.'
        ]
      },
      asesmen: modulToEdit?.asesmen || {
        awalDiagnostik: 'Kuis kesiapan belajar awal.',
        formatif: 'Observasi keaktifan diskusi dan LKPD.',
        sumatif: 'Ujian pemahaman konsep akhir modul.',
        rubrik: [
          {
            kriteria: 'Penguasaan Konsep',
            perluBimbingan: 'Belum memahami konsep.',
            cukup: 'Memahami sebagian konsep.',
            baik: 'Memahami konsep dengan baik.',
            sangatBaik: 'Sangat menguasai konsep dan mampu mengaitkan dengan konteks lokal.'
          }
        ]
      },
      lkpd: {
        judul: lkpdJudul || `LKPD: ${judul}`,
        petunjuk: ['Bekerjalah dengan tertib.', 'Diskusikan bersama kelompok.'],
        soalAktivitas: [
          `Analisis kasus kontekstual terkait topik ${judul}!`,
          `Rumuskan kesimpulan kelompok dan presentasikan di depan kelas!`
        ]
      },
      ringkasanMateri: ringkasanMateri.trim(),
      glosarium: modulToEdit?.glosarium || ['Kurikulum Merdeka: Kerangka kurikulum fleksibel berfokus pada materi esensial'],
      daftarPustaka: modulToEdit?.daftarPustaka || ['BSKAP Kemendikdasmen RI (2024)', 'Panduan Pembelajaran & Asesmen Kurikulum Merdeka'],
      tags: [mataPelajaran, jenjang, 'Kurikulum Merdeka', 'Dapodik Resmi', 'Garut'],
      unduhanCount: modulToEdit?.unduhanCount || 1,
      rating: modulToEdit?.rating || 5.0
    };

    onSave(updatedModul);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER MODAL */}
        <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                  Operator Modul Ajar
                </span>
                <span className="text-xs text-teal-200">
                  {isEditing ? 'Sunting Modul Ajar Terbit' : 'Terbitkan Modul Ajar Resmi Baru'}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black font-['Outfit',sans-serif]">
                {isEditing ? `Edit: ${modulToEdit.judul}` : 'Formulir Publikasi Modul Ajar Kemendikdasmen & Disdik Garut'}
              </h2>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ERROR FEEDBACK */}
        {errorMessage && (
          <div className="m-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* FORM BODY */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-800">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Judul Lengkap Modul Ajar *</label>
              <input
                type="text"
                required
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Contoh: Modul Ajar Bahasa Sunda: Tradisi Kampung Adat Garut"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-teal-600 font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Mata Pelajaran *</label>
              <input
                type="text"
                required
                value={mataPelajaran}
                onChange={(e) => setMataPelajaran(e.target.value)}
                placeholder="Bahasa Sunda / Matematika / IPA"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Jenjang</label>
              <select
                value={jenjang}
                onChange={(e) => setJenjang(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
              >
                <option value="TK">PAUD/TK</option>
                <option value="SD">SD/MI</option>
                <option value="SMP">SMP/MTs</option>
                <option value="SMA">SMA/MA</option>
                <option value="SMK">SMK</option>
                <option value="SLB">SLB/Inklusi</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Fase Kurikulum</label>
              <select
                value={fase}
                onChange={(e) => setFase(e.target.value as FaseModulAjar)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
              >
                <option value="Fondasi (PAUD/TK)">Fondasi (PAUD/TK)</option>
                <option value="Fase A (SD Kelas 1-2)">Fase A (SD 1-2)</option>
                <option value="Fase B (SD Kelas 3-4)">Fase B (SD 3-4)</option>
                <option value="Fase C (SD Kelas 5-6)">Fase C (SD 5-6)</option>
                <option value="Fase D (SMP Kelas 7-9)">Fase D (SMP 7-9)</option>
                <option value="Fase E (SMA/SMK Kelas 10)">Fase E (SMA/SMK 10)</option>
                <option value="Fase F (SMA Kelas 11-12)">Fase F (SMA 11-12)</option>
                <option value="Fase F Kejuruan (SMK Kelas 11-12)">Fase F Kejuruan (SMK)</option>
                <option value="Fase Khusus (SLB / Disabilitas)">Fase Khusus (SLB)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Kelas</label>
              <input
                type="text"
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                placeholder="Kelas 7 / Kelas 10"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Alokasi Waktu</label>
              <input
                type="text"
                value={alokasiWaktu}
                onChange={(e) => setAlokasiWaktu(e.target.value)}
                placeholder="6 JP (3 Pertemuan)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>
          </div>

          {/* LEGALITAS DAPODIK & SK BSKAP */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-teal-50/70 border border-teal-200 rounded-2xl">
            <div>
              <label className="block font-bold text-teal-950 mb-1">SK BSKAP Kemendikdasmen</label>
              <input
                type="text"
                value={skKemendikdasmen}
                onChange={(e) => setSkKemendikdasmen(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-teal-300 rounded-xl text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-teal-950 mb-1">Kode Verifikasi Dapodik</label>
              <input
                type="text"
                value={kodeDapodik}
                onChange={(e) => setKodeDapodik(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-teal-300 rounded-xl text-xs font-mono font-bold text-teal-900"
              />
            </div>

            <div>
              <label className="block font-bold text-teal-950 mb-1">ID Platform PMM</label>
              <input
                type="text"
                value={idPMM}
                onChange={(e) => setIdPMM(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-teal-300 rounded-xl text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Capaian Pembelajaran (CP) *</label>
            <textarea
              rows={2}
              required
              value={capaianPembelajaran}
              onChange={(e) => setCapaianPembelajaran(e.target.value)}
              placeholder="Peserta didik mampu..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs resize-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Tujuan Pembelajaran (ATP / TP - Tiap baris 1 poin)</label>
            <textarea
              rows={3}
              value={tujuanPembelajaran}
              onChange={(e) => setTujuanPembelajaran(e.target.value)}
              placeholder="1. Memahami konsep...&#10;2. Menerapkan analisis..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono resize-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Pemahaman Bermakna</label>
            <textarea
              rows={2}
              value={pemahamanBermakna}
              onChange={(e) => setPemahamanBermakna(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs resize-none"
            />
          </div>

          {/* FOOTER ACTIONS */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
            {isEditing && onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Apakah Anda yakin ingin menghapus modul ajar "${modulToEdit.judul}"?`)) {
                    onDelete(modulToEdit.id);
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus Modul</span>
              </button>
            )}

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                id="btn-save-admin-modul"
                className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isEditing ? 'Simpan Modul' : 'Terbitkan Modul Resmi'}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
