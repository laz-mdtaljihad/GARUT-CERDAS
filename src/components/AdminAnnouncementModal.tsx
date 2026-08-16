import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Trash2, 
  AlertCircle, 
  FileText, 
  Pin,
  Calendar,
  Building2
} from 'lucide-react';
import { Announcement } from '../types';

interface AdminAnnouncementModalProps {
  isOpen: boolean;
  announcementToEdit: Announcement | null;
  onClose: () => void;
  onSave: (data: Announcement) => void;
  onDelete?: (id: string) => void;
}

export const AdminAnnouncementModal: React.FC<AdminAnnouncementModalProps> = ({
  isOpen,
  announcementToEdit,
  onClose,
  onSave,
  onDelete
}) => {
  const isEditing = !!announcementToEdit;

  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState<'Resmi Disdik' | 'BOS & PIP' | 'Prestasi & Lomba' | 'PPDB Garut' | 'Edaran Libur'>('Resmi Disdik');
  const [nomorSurat, setNomorSurat] = useState(`400.3.1/${Math.floor(100 + Math.random() * 900)}/Disdik/${new Date().getFullYear()}`);
  const [sumber, setSumber] = useState('Dinas Pendidikan Kabupaten Garut');
  const [ringkasan, setRingkasan] = useState('');
  const [isiLengkap, setIsiLengkap] = useState('');
  const [penting, setPenting] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (announcementToEdit) {
      setJudul(announcementToEdit.judul);
      setKategori(announcementToEdit.kategori);
      setNomorSurat(announcementToEdit.nomorSurat || '');
      setSumber(announcementToEdit.sumber);
      setRingkasan(announcementToEdit.ringkasan);
      setIsiLengkap(announcementToEdit.isiLengkap);
      setPenting(announcementToEdit.penting);
    } else {
      setJudul('');
      setKategori('Resmi Disdik');
      setNomorSurat(`400.3.1/${Math.floor(100 + Math.random() * 900)}/Disdik/${new Date().getFullYear()}`);
      setSumber('Dinas Pendidikan Kabupaten Garut');
      setRingkasan('');
      setIsiLengkap('');
      setPenting(true);
    }
  }, [announcementToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!judul.trim() || !ringkasan.trim() || !isiLengkap.trim()) {
      setErrorMsg('Judul, ringkasan, dan isi lengkap pengumuman wajib diisi.');
      return;
    }

    const updatedAnnouncement: Announcement = {
      id: announcementToEdit?.id || `announcement-${Date.now()}`,
      judul: judul.trim(),
      tanggal: announcementToEdit?.tanggal || new Date().toISOString().split('T')[0],
      kategori,
      nomorSurat: nomorSurat.trim() || undefined,
      sumber: sumber.trim(),
      ringkasan: ringkasan.trim(),
      isiLengkap: isiLengkap.trim(),
      penting
    };

    onSave(updatedAnnouncement);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                  Dinas Pendidikan
                </span>
                <span className="text-xs text-blue-200">
                  {isEditing ? 'Sunting Edaran / Pengumuman' : 'Terbitkan Pengumuman Baru'}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black font-['Outfit',sans-serif]">
                {isEditing ? `Edit: ${announcementToEdit.judul}` : 'Formulir Siaran Resmi Dinas Pendidikan Kab. Garut'}
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

        {errorMsg && (
          <div className="m-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* FORM BODY */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-800">
          
          <div>
            <label className="block font-bold text-slate-700 mb-1">Judul Surat / Siaran Edaran *</label>
            <input
              type="text"
              required
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Contoh: Petunjuk Teknis Pelaksanaan PPDB Tahun Pelajaran 2026/2027"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Kategori Pengumuman</label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
              >
                <option value="Resmi Disdik">Resmi Disdik</option>
                <option value="PPDB Garut">PPDB Garut</option>
                <option value="BOS & PIP">BOS & PIP</option>
                <option value="Prestasi & Lomba">Prestasi & Lomba</option>
                <option value="Edaran Libur">Edaran Libur</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Nomor Surat Dinas</label>
              <input
                type="text"
                value={nomorSurat}
                onChange={(e) => setNomorSurat(e.target.value)}
                placeholder="400.3.1/123/Disdik/2026"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Sumber / Instansi Penerbit</label>
            <input
              type="text"
              value={sumber}
              onChange={(e) => setSumber(e.target.value)}
              placeholder="Dinas Pendidikan Kabupaten Garut"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Ringkasan Singkat (Lead Text) *</label>
            <textarea
              rows={2}
              required
              value={ringkasan}
              onChange={(e) => setRingkasan(e.target.value)}
              placeholder="Ikhtisar utama pengumuman dalam 1-2 kalimat..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs resize-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Isi Lengkap / Keputusan Surat Edaran *</label>
            <textarea
              rows={5}
              required
              value={isiLengkap}
              onChange={(e) => setIsiLengkap(e.target.value)}
              placeholder="Tuliskan isi surat edaran lengkap, pasal-pasal, atau petunjuk operasional..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs resize-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="checkbox-penting"
              checked={penting}
              onChange={(e) => setPenting(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded-md"
            />
            <label htmlFor="checkbox-penting" className="text-xs font-bold text-slate-700 cursor-pointer">
              Tandai sebagai Pengumuman PENTING (Sematkan di Beranda & Banner Utama)
            </label>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
            {isEditing && onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Apakah Anda yakin ingin menghapus pengumuman ini?`)) {
                    onDelete(announcementToEdit.id);
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus Pengumuman</span>
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
                id="btn-save-admin-announcement"
                className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isEditing ? 'Simpan Perubahan' : 'Terbitkan Pengumuman'}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
