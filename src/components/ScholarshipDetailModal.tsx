import React, { useState } from 'react';
import { 
  X, 
  Award, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  ExternalLink, 
  Bookmark, 
  Share2, 
  DollarSign, 
  Users, 
  Clock,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Scholarship, UserProfile } from '../types';

interface ScholarshipDetailModalProps {
  scholarship: Scholarship | null;
  onClose: () => void;
  userProfile: UserProfile;
  onToggleFavorit: (id: string) => void;
}

export const ScholarshipDetailModal: React.FC<ScholarshipDetailModalProps> = ({
  scholarship,
  onClose,
  userProfile,
  onToggleFavorit
}) => {
  const [reminderSet, setReminderSet] = useState(false);

  if (!scholarship) return null;

  const isFavorited = userProfile.favoritBeasiswa.includes(scholarship.id);

  const handleSetReminder = () => {
    setReminderSet(true);
    setTimeout(() => setReminderSet(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        id="scholarship-detail-modal"
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-5 sm:p-6 text-white shrink-0 relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold shadow-sm ${
                scholarship.status === 'Buka' ? 'bg-emerald-500 text-white' :
                scholarship.status === 'Segera' ? 'bg-blue-500 text-white' :
                'bg-slate-700 text-slate-300'
              }`}>
                {scholarship.status === 'Buka' ? '🟢 SEDANG DIBUKA' : scholarship.status === 'Segera' ? '🔵 SEGERA DIBUKA' : '🔴 DITUTUP'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md">
                {scholarship.kategori}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleFavorit(scholarship.id)}
                className={`p-2 rounded-full backdrop-blur-md transition-all ${
                  isFavorited ? 'bg-rose-500 text-white' : 'bg-white/20 hover:bg-white text-white hover:text-slate-900'
                }`}
                title="Favoritkan"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md transition-all"
                title="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold mt-3 font-['Outfit',sans-serif] leading-snug">
            {scholarship.nama}
          </h2>
          <p className="text-xs text-amber-100 mt-1">
            Penyelenggara / Pemberi: <strong className="text-white">{scholarship.pemberi}</strong>
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 text-slate-800 text-xs">
          
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-[11px] text-amber-900 font-semibold block">Besar Bantuan</span>
              <p className="text-base font-extrabold text-amber-900 mt-0.5">{scholarship.besarBantuan}</p>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200">
              <span className="text-[11px] text-blue-900 font-semibold block">Sasaran Jenjang</span>
              <p className="text-sm font-extrabold text-blue-900 mt-0.5">{scholarship.jenjang.join(', ')}</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 font-semibold block">Batas Pendaftaran</span>
              <p className="text-sm font-extrabold text-rose-700 mt-0.5">
                {new Date(scholarship.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-1">Tentang Beasiswa Ini</h4>
            <p className="text-slate-600 leading-relaxed">{scholarship.deskripsi}</p>
            {scholarship.kuota && (
              <p className="text-blue-700 font-bold mt-2">
                👥 Kuota Tersedia: ~{scholarship.kuota} Penerima
              </p>
            )}
          </div>

          {/* Syarat Penerima */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 mb-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Persyaratan Kelayakan Pelamar</span>
            </h4>
            <ul className="space-y-2">
              {scholarship.syarat.map((syr, i) => (
                <li key={i} className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-slate-700 font-medium">{syr}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dokumen yang Harus Disiapkan */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 mb-2.5">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Berkas & Dokumen yang Diperlukan</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scholarship.dokumen.map((dok, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span className="text-slate-800 font-medium">{dok}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Pendaftaran */}
          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-amber-950">Tips Khusus untuk Siswa & Mahasiswa Garut</h5>
              <p className="text-amber-900 text-[11px] mt-0.5 leading-relaxed">
                Pastikan dokumen KTP/KK sudah berdomisili Garut. Untuk berkas SKTM (Surat Keterangan Tidak Mampu), urus di kantor Desa/Kelurahan setempat terlebih dahulu. Legalisir rapor dan sertifikat prestasi paling lambat 1 minggu sebelum batas deadline.
              </p>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={handleSetReminder}
            className="w-full sm:w-auto px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <Clock className="w-4 h-4 text-blue-600" />
            <span>{reminderSet ? '✓ Pengingat Disimpan!' : 'Set Pengingat Deadline'}</span>
          </button>

          <a
            href={scholarship.linkDaftar}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Daftar / Akses Portal Resmi</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
