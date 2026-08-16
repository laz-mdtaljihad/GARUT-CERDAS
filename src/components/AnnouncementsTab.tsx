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
  AlertCircle
} from 'lucide-react';
import { Announcement } from '../types';

interface AnnouncementsTabProps {
  announcements: Announcement[];
}

export const AnnouncementsTab: React.FC<AnnouncementsTabProps> = ({ announcements }) => {
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
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
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

              <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>Baca Selengkapnya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
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
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-2xs"
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
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-rose-600" />
                    <div>
                      <span className="font-bold text-slate-900 block">{selectedAnnouncement.lampiranPdf}</span>
                      <span className="text-[10px] text-slate-400">Dokumen PDF Resmi Terverifikasi</span>
                    </div>
                  </div>

                  <a
                    href={`#download-${selectedAnnouncement.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Mengunduh berkas resmi ${selectedAnnouncement.lampiranPdf}...`);
                    }}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh PDF</span>
                  </a>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end shrink-0">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all"
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
