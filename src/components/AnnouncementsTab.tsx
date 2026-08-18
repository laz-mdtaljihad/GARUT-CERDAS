import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  FileText, 
  Download, 
  Calendar, 
  ShieldCheck, 
  ExternalLink, 
  Tag, 
  ChevronRight, 
  Share2, 
  AlertCircle,
  Plus,
  Edit3,
  Trash2
} from 'lucide-react';
import { Announcement, UserProfile } from '../types';

interface AnnouncementsTabProps {
  announcements: Announcement[];
  userProfile?: UserProfile;
  onOpenAddAnnouncement?: () => void;
  onEditAnnouncement?: (announcement: Announcement) => void;
  onDeleteAnnouncement?: (id: string) => void;
}

export const AnnouncementsTab: React.FC<AnnouncementsTabProps> = ({ 
  announcements,
  userProfile,
  onOpenAddAnnouncement,
  onEditAnnouncement,
  onDeleteAnnouncement
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState<string>('Semua');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const filteredAnnouncements = announcements.filter(a => {
    const matchSearch = 
      a.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.ringkasan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.isiLengkap.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchSearch) return false;

    if (selectedKategori !== 'Semua' && a.kategori !== selectedKategori) return false;

    return true;
  });

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-200">
      
      {/* Admin Disdik Quick Action Banner */}
      {userProfile?.isAdmin && onOpenAddAnnouncement && (
        <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-4 sm:p-5 border border-emerald-500/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-500 text-white">
                  Akses Admin Disdik
                </span>
                <span className="text-xs text-emerald-200">Publikasi Surat Edaran & Siaran Resmi</span>
              </div>
              <p className="text-xs text-slate-200 mt-0.5">
                Terbitkan juknis PPDB, pencairan BOS/PIP, kalender libur daerah, dan pengumuman bupati ke seluruh masyarakat.
              </p>
            </div>
          </div>

          <button
            id="btn-admin-add-announcement-top"
            onClick={onOpenAddAnnouncement}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs sm:text-sm shadow-md transition-all shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>+ Buat Pengumuman Disdik</span>
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-2">
              <Bell className="w-3.5 h-3.5" />
              <span>Modul 8 • Pengumuman & Berita Resmi Disdik Garut</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
              Pusat Informasi & Surat Edaran Resmi
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Dokumen petunjuk teknis (Juknis), SK Bupati, pencairan dana BOS/PIP, pengumuman seleksi, dan berita pendidikan Kabupaten Garut terverifikasi.
            </p>
          </div>

          {userProfile?.isAdmin && onOpenAddAnnouncement && (
            <button
              onClick={onOpenAddAnnouncement}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>+ Buat Pengumuman</span>
            </button>
          )}
        </div>

        {/* Search & Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-5 pt-4 border-t border-slate-100">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari judul surat edaran, SK, atau berita resmi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <select
              value={selectedKategori}
              onChange={(e) => setSelectedKategori(e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="Semua">Semua Kategori</option>
              <option value="PPDB">PPDB & Zonasi</option>
              <option value="Beasiswa">Beasiswa & Bantuan</option>
              <option value="Kebijakan">Surat Edaran & Juknis</option>
              <option value="Prestasi">Prestasi & Kejuaraan</option>
              <option value="BOS / PIP">Dana BOS / PIP</option>
            </select>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedAnnouncement(item)}
            className="p-5 bg-white hover:bg-slate-50 rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  item.kategori === 'PPDB' ? 'bg-blue-100 text-blue-800' :
                  item.kategori === 'Beasiswa' ? 'bg-amber-100 text-amber-800' :
                  item.kategori === 'Kebijakan' ? 'bg-purple-100 text-purple-800' :
                  'bg-emerald-100 text-emerald-800'
                }`}>
                  {item.kategori}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {item.sumber || 'Dinas Pendidikan Garut'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.tanggal}</span>
              </div>
            </div>

            <div>
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                {item.judul}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                {item.ringkasan}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              {item.lampiranPdf ? (
                <span className="inline-flex items-center gap-1 text-slate-500 text-[11px] font-medium">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>Lampiran PDF: {item.lampiranPdf}</span>
                </span>
              ) : (
                <span></span>
              )}

              <div className="flex items-center gap-2">
                {userProfile?.isAdmin && onEditAnnouncement && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditAnnouncement(item);
                    }}
                    className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-all cursor-pointer"
                    title="Edit Pengumuman"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                )}

                {userProfile?.isAdmin && onDeleteAnnouncement && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Hapus pengumuman "${item.judul}"?`)) {
                        onDeleteAnnouncement(item.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-all cursor-pointer"
                    title="Hapus Pengumuman"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Baca Selengkapnya</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail Announcement */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50 shrink-0">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-extrabold text-xs">
                  {selectedAnnouncement.kategori}
                </span>
                <button
                  onClick={() => setSelectedAnnouncement(null)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-2xs cursor-pointer"
                >
                  Tutup
                </button>
              </div>

              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-2 font-['Outfit',sans-serif] leading-snug">
                {selectedAnnouncement.judul}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <span>Diterbitkan: {selectedAnnouncement.tanggal}</span>
                <span>•</span>
                <span>Sumber: {selectedAnnouncement.sumber}</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs text-slate-800 leading-relaxed">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
                <p className="font-semibold text-slate-800">{selectedAnnouncement.ringkasan}</p>
              </div>

              <div className="space-y-3 whitespace-pre-line text-slate-700">
                {selectedAnnouncement.isiLengkap}
              </div>

              {selectedAnnouncement.lampiranPdf && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                      PDF
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{selectedAnnouncement.lampiranPdf}</h4>
                      <p className="text-[11px] text-slate-500">Berkas Resmi Dokumen Keputusan / Juknis</p>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Mengunduh berkas: ${selectedAnnouncement.lampiranPdf}`)}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh PDF</span>
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500 shrink-0">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Dokumen Resmi Disdik Kab. Garut</span>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl cursor-pointer"
              >
                Selesai Membaca
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
