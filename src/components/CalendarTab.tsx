import React, { useState, useMemo } from 'react';
import { 
  CalendarDays, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Bell, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Share2,
  Sparkles
} from 'lucide-react';
import { EduEvent } from '../types';

interface CalendarTabProps {
  events: EduEvent[];
}

export const CalendarTab: React.FC<CalendarTabProps> = ({ events }) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(6); // 6 = July (0-indexed)
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedKategori, setSelectedKategori] = useState<string>('Semua');
  const [selectedJenjang, setSelectedJenjang] = useState<string>('Semua');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  // Month navigation
  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter(ev => {
      // Category
      if (selectedKategori !== 'Semua' && ev.kategori !== selectedKategori) return false;

      // Jenjang
      if (selectedJenjang !== 'Semua' && !ev.jenjangTerkait.includes(selectedJenjang) && ev.jenjangTerkait !== 'Semua Jenjang') return false;

      return true;
    });
  }, [events, selectedKategori, selectedJenjang]);

  // Current month specific events
  const currentMonthEvents = useMemo(() => {
    return filteredEvents.filter(ev => {
      const d = new Date(ev.tanggal);
      return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
    });
  }, [filteredEvents, selectedMonth, selectedYear]);

  // Generate .ICS file download for device calendar sync
  const exportICS = () => {
    let icsContent = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Garut Cerdas//Kalender Pendidikan Garut//ID\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\n";
    
    events.forEach(ev => {
      const dateStr = ev.tanggal.replace(/-/g, '');
      icsContent += `BEGIN:VEVENT\r\nSUMMARY:${ev.judul}\r\nDESCRIPTION:${ev.deskripsi} (${ev.jenjangTerkait})\r\nDTSTART;VALUE=DATE:${dateStr}\r\nDTEND;VALUE=DATE:${dateStr}\r\nSTATUS:CONFIRMED\r\nCATEGORIES:${ev.kategori}\r\nEND:VEVENT\r\n`;
    });

    icsContent += "END:VCALENDAR\r\n";

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Kalender_Pendidikan_Garut_${selectedYear}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 mb-2">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Modul 4 • Kalender Pendidikan Resmi Garut 2026/2027</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
              Kalender Pendidikan Kabupaten Garut
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Jadwal lengkap masuk sekolah, libur semester, asesmen nasional/ujian, tahapan PPDB, dan batas beasiswa.
            </p>
          </div>

          <button
            onClick={exportICS}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{downloadSuccess ? '✓ Kalender .ICS Terunduh!' : 'Sinkronkan ke Google/HP (.ics)'}</span>
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mt-5 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Kategori Agenda:</label>
            <select
              value={selectedKategori}
              onChange={(e) => setSelectedKategori(e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            >
              <option value="Semua">Semua Kategori</option>
              <option value="PPDB">PPDB & Pendaftaran</option>
              <option value="Akademik">Akademik & Ujian (PTS/PAS)</option>
              <option value="Libur">Libur Semester & Hari Libur</option>
              <option value="Beasiswa">Batas Beasiswa</option>
              <option value="Kegiatan">Kegiatan Sekolah</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Jenjang Pendidikan:</label>
            <select
              value={selectedJenjang}
              onChange={(e) => setSelectedJenjang(e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            >
              <option value="Semua">Semua Jenjang</option>
              <option value="SD">SD / MI</option>
              <option value="SMP">SMP / MTs</option>
              <option value="SMA">SMA / SMK / MA</option>
            </select>
          </div>
        </div>
      </div>

      {/* Month Navigator & Calendar Grid */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        
        {/* Month Selector Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <button
            onClick={prevMonth}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              {months[selectedMonth]} {selectedYear}
            </h2>
            <span className="text-xs text-purple-600 font-bold">
              {currentMonthEvents.length} Agenda di Bulan Ini
            </span>
          </div>

          <button
            onClick={nextMonth}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Current Month Events List */}
        <div className="mt-5 space-y-3">
          {currentMonthEvents.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
              <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-600">Tidak ada agenda khusus di bulan {months[selectedMonth]} {selectedYear}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Silakan pilih bulan lain menggunakan tombol navigasi di atas.</p>
            </div>
          ) : (
            currentMonthEvents.map((ev) => (
              <div
                key={ev.id}
                className="p-4 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-purple-300 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3.5">
                  <div className="flex flex-col items-center justify-center px-3 py-2 rounded-2xl bg-purple-600 text-white font-extrabold shadow-xs min-w-[55px] text-center">
                    <span className="text-[10px] uppercase font-bold tracking-wider">
                      {new Date(ev.tanggal).toLocaleString('id-ID', { month: 'short' })}
                    </span>
                    <span className="text-lg leading-none mt-0.5">
                      {new Date(ev.tanggal).getDate()}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        ev.kategori === 'PPDB' ? 'bg-blue-100 text-blue-800' :
                        ev.kategori === 'Libur' ? 'bg-rose-100 text-rose-800' :
                        ev.kategori === 'Beasiswa' ? 'bg-amber-100 text-amber-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {ev.kategori}
                      </span>
                      <span className="text-[11px] text-slate-500 font-semibold">{ev.jenjangTerkait}</span>
                    </div>

                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mt-1">
                      {ev.judul}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">{ev.deskripsi}</p>
                  </div>
                </div>

                {ev.penting && (
                  <div className="shrink-0 self-end sm:self-center">
                    <span className="px-3 py-1 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-extrabold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Agenda Penting
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>

      {/* ALL SEMESTER EVENTS BREAKDOWN */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Outfit',sans-serif] mb-4">
          Seluruh Rangkaian Agenda Tahun Ajaran 2026/2027
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs"
            >
              <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0 mt-1.5"></span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{ev.tanggal}</span>
                  <span className="text-[10px] text-purple-700 font-semibold px-2 py-0.2 bg-purple-100 rounded-md">
                    {ev.kategori}
                  </span>
                </div>
                <h4 className="font-bold text-slate-800 mt-0.5">{ev.judul}</h4>
                <p className="text-slate-500 text-[11px] mt-0.5">{ev.deskripsi}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
