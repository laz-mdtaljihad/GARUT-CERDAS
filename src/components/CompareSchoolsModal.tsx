import React, { useState } from 'react';
import { X, Check, CheckCircle2, XCircle, Plus, Sparkles, Building2, MapPin, Award } from 'lucide-react';
import { School } from '../types';

interface CompareSchoolsModalProps {
  schools: School[];
  initialSchool?: School | null;
  onClose: () => void;
  onSelectSchool: (school: School) => void;
}

export const CompareSchoolsModal: React.FC<CompareSchoolsModalProps> = ({
  schools,
  initialSchool,
  onClose,
  onSelectSchool
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    initialSchool ? [initialSchool.id] : [schools[0]?.id, schools[1]?.id].filter(Boolean)
  );

  const selectedSchools = selectedIds.map(id => schools.find(s => s.id === id)).filter(Boolean) as School[];

  const handleAddSchool = (id: string) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRemoveSchool = (id: string) => {
    setSelectedIds(selectedIds.filter(item => item !== id));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        id="compare-schools-modal"
        className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
              Fitur Komparasi Edukasi
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 font-['Outfit',sans-serif] mt-1">
              Bandingkan 2–3 Sekolah di Garut
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Lihat perbedaan akreditasi, kuota PPDB, fasilitas, dan kurikulum secara berdampingan.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* School Selector Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[0, 1, 2].map((idx) => {
              const currentSchool = selectedSchools[idx];
              return (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-500">Sekolah #{idx + 1}</span>
                    {currentSchool && selectedSchools.length > 1 && (
                      <button
                        onClick={() => handleRemoveSchool(currentSchool.id)}
                        className="text-[10px] font-bold text-rose-600 hover:text-rose-700"
                      >
                        Hapus
                      </button>
                    )}
                  </div>

                  <select
                    value={currentSchool ? currentSchool.id : ''}
                    onChange={(e) => {
                      const newId = e.target.value;
                      if (!newId) return;
                      const next = [...selectedIds];
                      next[idx] = newId;
                      setSelectedIds(next.filter(Boolean));
                    }}
                    className="w-full text-xs font-bold p-2 bg-white rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Pilih Sekolah --</option>
                    {schools.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.nama} ({s.jenjang} - {s.kecamatan})
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>

          {/* Comparison Table */}
          {selectedSchools.length > 0 && (
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200">
                    <th className="p-3 font-bold text-slate-600 w-1/4">Kriteria Perbandingan</th>
                    {selectedSchools.map(s => (
                      <th key={s.id} className="p-3 font-extrabold text-blue-900 border-l border-slate-200">
                        {s.nama}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800">
                  <tr>
                    <td className="p-3 font-semibold bg-slate-50 text-slate-600">Jenjang & Status</td>
                    {selectedSchools.map(s => (
                      <td key={s.id} className="p-3 border-l border-slate-200 font-bold">
                        <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">{s.jenjang}</span> • {s.status}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold bg-slate-50 text-slate-600">Nilai Akreditasi</td>
                    {selectedSchools.map(s => (
                      <td key={s.id} className="p-3 border-l border-slate-200">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">
                          Akreditasi {s.akreditasi} ({s.akreditasiTahun})
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold bg-slate-50 text-slate-600">Lokasi Kecamatan</td>
                    {selectedSchools.map(s => (
                      <td key={s.id} className="p-3 border-l border-slate-200 flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>{s.kecamatan}</span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold bg-slate-50 text-slate-600">Total Kuota PPDB 2026</td>
                    {selectedSchools.map(s => (
                      <td key={s.id} className="p-3 border-l border-slate-200 font-extrabold text-blue-700">
                        {s.kuotaPPDB.total} Kursi
                        <span className="block text-[10px] text-slate-500 font-normal">
                          Zonasi: {s.kuotaPPDB.zonasi} | Prestasi: {s.kuotaPPDB.prestasi}
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold bg-slate-50 text-slate-600">Kurikulum</td>
                    {selectedSchools.map(s => (
                      <td key={s.id} className="p-3 border-l border-slate-200 font-medium">
                        {s.kurikulum}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold bg-slate-50 text-slate-600">Biaya SPP Bulanan</td>
                    {selectedSchools.map(s => (
                      <td key={s.id} className="p-3 border-l border-slate-200 font-bold text-emerald-700">
                        {s.biaya.sppBulanan === 0 ? 'Gratis Bebas SPP' : `Rp ${s.biaya.sppBulanan.toLocaleString('id-ID')}/bln`}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold bg-slate-50 text-slate-600">Keunggulan Utama</td>
                    {selectedSchools.map(s => (
                      <td key={s.id} className="p-3 border-l border-slate-200">
                        <ul className="space-y-1 text-[11px] list-disc list-inside text-slate-700">
                          {s.keunggulan.slice(0, 2).map((kg, i) => (
                            <li key={i}>{kg}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold bg-slate-50 text-slate-600">Fasilitas Unggulan</td>
                    {selectedSchools.map(s => (
                      <td key={s.id} className="p-3 border-l border-slate-200">
                        <div className="flex flex-wrap gap-1">
                          {s.fasilitas.slice(0, 3).map((f, i) => (
                            <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px]">
                              {f}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Pilih hingga 3 sekolah untuk komparasi optimal.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
