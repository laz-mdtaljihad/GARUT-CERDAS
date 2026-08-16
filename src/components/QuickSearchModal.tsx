import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  School as SchoolIcon, 
  Award, 
  Wrench, 
  FileText, 
  MapPin, 
  ChevronRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { School, Scholarship, TrainingCourse, Announcement } from '../types';
import { garutModulAjar } from '../data/modulAjarData';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: School[];
  scholarships: Scholarship[];
  trainings: TrainingCourse[];
  announcements: Announcement[];
  onSelectSchool: (school: School) => void;
  onSelectScholarship: (scholarship: Scholarship) => void;
  setActiveTab: (tab: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  schools,
  scholarships,
  trainings,
  announcements,
  onSelectSchool,
  onSelectScholarship,
  setActiveTab
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();
  const normalizedQuery = cleanQuery
    .replace(/\bsd\s+n\s+/g, 'sdn ')
    .replace(/\bsd\s+negeri\s+/g, 'sdn ')
    .replace(/\bsmp\s+n\s+/g, 'smpn ')
    .replace(/\bsmp\s+negeri\s+/g, 'smpn ')
    .replace(/\bsma\s+n\s+/g, 'sman ')
    .replace(/\bsma\s+negeri\s+/g, 'sman ')
    .replace(/\bsmk\s+n\s+/g, 'smkn ')
    .replace(/\bsmk\s+negeri\s+/g, 'smkn ')
    .replace(/\s+/g, ' ');

  const matchedSchools = schools.filter(s => {
    const namaNorm = s.nama.toLowerCase().replace(/\s+/g, ' ');
    const kecNorm = s.kecamatan.toLowerCase();
    const alamatNorm = s.alamat.toLowerCase();
    const tagsNorm = s.tags.join(' ').toLowerCase();

    return (
      !cleanQuery ||
      namaNorm.includes(cleanQuery) ||
      namaNorm.includes(normalizedQuery) ||
      kecNorm.includes(cleanQuery) ||
      kecNorm.includes(normalizedQuery) ||
      alamatNorm.includes(cleanQuery) ||
      alamatNorm.includes(normalizedQuery) ||
      tagsNorm.includes(cleanQuery) ||
      tagsNorm.includes(normalizedQuery) ||
      s.npsn.includes(cleanQuery)
    );
  }).slice(0, 4);

  const matchedScholarships = scholarships.filter(s =>
    s.nama.toLowerCase().includes(query.toLowerCase()) ||
    s.pemberi.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 2);

  const matchedModul = garutModulAjar.filter(m =>
    m.judul.toLowerCase().includes(query.toLowerCase()) ||
    m.mataPelajaran.toLowerCase().includes(query.toLowerCase()) ||
    m.jenjang.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 2);

  const matchedTrainings = trainings.filter(t =>
    t.nama.toLowerCase().includes(query.toLowerCase()) ||
    t.bidang.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 2);

  const matchedAnnouncements = announcements.filter(a =>
    a.judul.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-20 animate-in fade-in duration-150">
      <div 
        id="quick-search-modal-box"
        className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-200"
      >
        {/* Search Header */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0 ml-1" />
          <input
            autoFocus
            type="text"
            placeholder="Cari sekolah, zonasi kecamatan, beasiswa, pelatihan..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm font-semibold bg-transparent focus:outline-hidden text-slate-900 placeholder:text-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4 text-xs">
          
          {query.trim() === '' ? (
            <div className="space-y-3 py-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Paling Sering Dicari:</span>
              <div className="flex flex-wrap gap-2">
                {['SMAN 1 Garut', 'SMKN 1 Garut', 'Zonasi Tarogong Kidul', 'Beasiswa Garut Cerdas', 'Pelatihan BLK', 'KIP Kuliah'].map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 rounded-xl text-slate-700 font-medium transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Sekolah */}
              {matchedSchools.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wide block mb-1.5">
                    Direktori Sekolah ({matchedSchools.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedSchools.map(s => (
                      <div
                        key={s.id}
                        onClick={() => {
                          onSelectSchool(s);
                          onClose();
                        }}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-2">
                          <SchoolIcon className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="font-bold text-slate-800 group-hover:text-blue-700">{s.nama}</span>
                          <span className="text-[10px] text-slate-400">({s.kecamatan})</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Beasiswa */}
              {matchedScholarships.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wide block mb-1.5">
                    Beasiswa ({matchedScholarships.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedScholarships.map(b => (
                      <div
                        key={b.id}
                        onClick={() => {
                          onSelectScholarship(b);
                          onClose();
                        }}
                        className="p-2.5 rounded-xl bg-amber-50/50 hover:bg-amber-100 border border-amber-200 flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-amber-600 shrink-0" />
                          <span className="font-bold text-slate-800 group-hover:text-amber-800">{b.nama}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-amber-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modul Ajar */}
              {matchedModul.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wide block mb-1.5">
                    Modul Ajar ({matchedModul.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedModul.map(m => (
                      <div
                        key={m.id}
                        onClick={() => {
                          setActiveTab('modul-ajar');
                          onClose();
                        }}
                        className="p-2.5 rounded-xl bg-teal-50/50 hover:bg-teal-100 border border-teal-200 flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-teal-700 shrink-0" />
                          <span className="font-bold text-slate-800 group-hover:text-teal-900">{m.judul}</span>
                          <span className="text-[10px] text-teal-600 font-semibold">({m.jenjang} • {m.mataPelajaran})</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-teal-700" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pelatihan */}
              {matchedTrainings.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide block mb-1.5">
                    Pelatihan Kerja ({matchedTrainings.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedTrainings.map(t => (
                      <div
                        key={t.id}
                        onClick={() => {
                          setActiveTab('pelatihan');
                          onClose();
                        }}
                        className="p-2.5 rounded-xl bg-emerald-50/50 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-2">
                          <Wrench className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-bold text-slate-800 group-hover:text-emerald-800">{t.nama}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No results */}
              {matchedSchools.length === 0 && matchedScholarships.length === 0 && matchedModul.length === 0 && matchedTrainings.length === 0 && (
                <p className="text-center py-6 text-slate-400">
                  Tidak ditemukan hasil untuk "{query}".
                </p>
              )}
            </>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-400">
          Tekan ESC atau klik area luar untuk menutup pencarian.
        </div>
      </div>
    </div>
  );
};
