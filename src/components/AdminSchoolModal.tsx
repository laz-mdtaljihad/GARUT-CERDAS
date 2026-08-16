import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Trash2, 
  Building2, 
  School as SchoolIcon, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Globe, 
  Award, 
  BookOpen,
  Plus,
  AlertCircle
} from 'lucide-react';
import { School, JenjangSekolah, StatusSekolah, Akreditasi } from '../types';
import { garutZonasiData } from '../data/zonasiData';

interface AdminSchoolModalProps {
  isOpen: boolean;
  schoolToEdit: School | null; // null means create new school
  onClose: () => void;
  onSave: (schoolData: School) => void;
  onDelete?: (schoolId: string) => void;
}

export const AdminSchoolModal: React.FC<AdminSchoolModalProps> = ({
  isOpen,
  schoolToEdit,
  onClose,
  onSave,
  onDelete
}) => {
  const isEditing = !!schoolToEdit;

  // Form states
  const [nama, setNama] = useState('');
  const [npsn, setNpsn] = useState('');
  const [jenjang, setJenjang] = useState<JenjangSekolah>('SMP');
  const [status, setStatus] = useState<StatusSekolah>('Negeri');
  const [akreditasi, setAkreditasi] = useState<Akreditasi>('A');
  const [akreditasiTahun, setAkreditasiTahun] = useState(2023);
  const [kecamatan, setKecamatan] = useState('Garut Kota');
  const [alamat, setAlamat] = useState('');
  const [kodePos, setKodePos] = useState('44111');
  const [lat, setLat] = useState(-7.2274);
  const [lng, setLng] = useState(107.9087);
  const [phone, setPhone] = useState('(0262) 231123');
  const [whatsapp, setWhatsapp] = useState('081234567890');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [kurikulum, setKurikulum] = useState<'Kurikulum Merdeka' | 'Kurikulum 2013' | 'Kurikulum Berbasis Pesantren / Plus'>('Kurikulum Merdeka');
  
  // PPDB Kuota
  const [kuotaZonasi, setKuotaZonasi] = useState(180);
  const [kuotaPrestasi, setKuotaPrestasi] = useState(60);
  const [kuotaAfirmasi, setKuotaAfirmasi] = useState(45);
  const [kuotaPerpindahan, setKuotaPerpindahan] = useState(15);
  const [kapasitasTotal, setKapasitasTotal] = useState(300);

  // Fasilitas & Keunggulan
  const [fasilitasInput, setFasilitasInput] = useState('');
  const [keunggulanInput, setKeunggulanInput] = useState('');
  const [jurusanInput, setJurusanInput] = useState('');
  const [visi, setVisi] = useState('');

  // Error feedback
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (schoolToEdit) {
      setNama(schoolToEdit.nama);
      setNpsn(schoolToEdit.npsn);
      setJenjang(schoolToEdit.jenjang);
      setStatus(schoolToEdit.status);
      setAkreditasi(schoolToEdit.akreditasi);
      setAkreditasiTahun(schoolToEdit.akreditasiTahun || 2023);
      setKecamatan(schoolToEdit.kecamatan);
      setAlamat(schoolToEdit.alamat);
      setKodePos(schoolToEdit.kodePos || '44111');
      setLat(schoolToEdit.koordinat.lat);
      setLng(schoolToEdit.koordinat.lng);
      setPhone(schoolToEdit.phone || '');
      setWhatsapp(schoolToEdit.whatsapp || '');
      setEmail(schoolToEdit.email || '');
      setWebsite(schoolToEdit.website || '');
      setKurikulum(schoolToEdit.kurikulum);
      setKuotaZonasi(schoolToEdit.kuotaPPDB?.zonasi || 180);
      setKuotaPrestasi(schoolToEdit.kuotaPPDB?.prestasi || 60);
      setKuotaAfirmasi(schoolToEdit.kuotaPPDB?.afirmasi || 45);
      setKuotaPerpindahan(schoolToEdit.kuotaPPDB?.perpindahan || 15);
      setKapasitasTotal(schoolToEdit.kapasitasTotal || 300);
      setFasilitasInput(schoolToEdit.fasilitas?.join(', ') || '');
      setKeunggulanInput(schoolToEdit.keunggulan?.join(', ') || '');
      setJurusanInput(schoolToEdit.jurusanSMK?.join(', ') || '');
      setVisi(schoolToEdit.visi || '');
    } else {
      // Default new school
      setNama('');
      setNpsn(`${Math.floor(10000000 + Math.random() * 90000000)}`);
      setJenjang('SMP');
      setStatus('Negeri');
      setAkreditasi('A');
      setAkreditasiTahun(2024);
      setKecamatan('Tarogong Kidul');
      setAlamat('Jl. Pendidikan No. 10, Garut');
      setKodePos('44151');
      setLat(-7.2150);
      setLng(107.9000);
      setPhone('(0262) 234567');
      setWhatsapp('081234567890');
      setEmail('info.sekolah@disdikgarut.sch.id');
      setWebsite('https://sekolah.disdik.garutkab.go.id');
      setKurikulum('Kurikulum Merdeka');
      setKuotaZonasi(180);
      setKuotaPrestasi(60);
      setKuotaAfirmasi(45);
      setKuotaPerpindahan(15);
      setKapasitasTotal(300);
      setFasilitasInput('Laboratorium Komputer, Perpustakaan Digital, Lapangan Olahraga, Mushola, Ruang Seni');
      setKeunggulanInput('Sekolah Adiwiyata, Pembinaan Olimpiade Sains, Ekstrakurikuler Aktif');
      setJurusanInput('');
      setVisi('Terwujudnya peserta didik yang berakhlak mulia, berprestasi unggul, dan berdaya saing global.');
    }
  }, [schoolToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!nama.trim() || !npsn.trim() || !alamat.trim()) {
      setErrorMessage('Nama sekolah, NPSN, dan alamat lengkap wajib diisi.');
      return;
    }

    const totalPPDB = kuotaZonasi + kuotaPrestasi + kuotaAfirmasi + kuotaPerpindahan;

    const fasilitasArray = fasilitasInput.split(',').map(s => s.trim()).filter(Boolean);
    const keunggulanArray = keunggulanInput.split(',').map(s => s.trim()).filter(Boolean);
    const jurusanArray = jenjang === 'SMK' ? jurusanInput.split(',').map(s => s.trim()).filter(Boolean) : undefined;

    const idToUse = schoolToEdit?.id || `school-${nama.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;

    const updatedSchool: School = {
      id: idToUse,
      npsn: npsn.trim(),
      nama: nama.trim(),
      jenjang,
      status,
      akreditasi,
      akreditasiTahun: Number(akreditasiTahun),
      kecamatan,
      alamat: alamat.trim(),
      kodePos: kodePos.trim(),
      koordinat: {
        lat: Number(lat),
        lng: Number(lng)
      },
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || undefined,
      email: email.trim(),
      website: website.trim() || undefined,
      kurikulum,
      rombel: Math.ceil(totalPPDB / 32) || 8,
      kapasitasTotal: Number(kapasitasTotal) || totalPPDB,
      estimasiPendaftarTahunLalu: Math.round(totalPPDB * 1.4),
      kuotaPPDB: {
        zonasi: Number(kuotaZonasi),
        prestasi: Number(kuotaPrestasi),
        afirmasi: Number(kuotaAfirmasi),
        perpindahan: Number(kuotaPerpindahan),
        total: totalPPDB
      },
      fasilitas: fasilitasArray.length ? fasilitasArray : ['Ruang Kelas Representatif', 'Perpustakaan', 'Laboratorium'],
      keunggulan: keunggulanArray.length ? keunggulanArray : ['Kurikulum Merdeka Unggulan', 'Pengembangan Karakter'],
      visi: visi || 'Mewujudkan insan yang bertakwa, cerdas, terampil, dan berwawasan lingkungan.',
      misi: [
        'Melaksanakan pembelajaran aktif, inovatif, dan berpusat pada peserta didik.',
        'Meningkatkan mutu pendidikan melalui penguatan literasi dan numerasi.',
        'Mengembangkan minat, bakat, dan potensi kearifan lokal Kabupaten Garut.'
      ],
      prestasiList: schoolToEdit?.prestasiList || [
        {
          tahun: 2024,
          nama: 'Juara 1 Lomba Cerdas Cermat Jenjang Kabupaten Garut',
          tingkat: 'Kabupaten',
          kategori: 'Akademik'
        }
      ],
      biaya: schoolToEdit?.biaya || {
        pendaftaran: 0,
        sppBulanan: 0,
        uangGedung: 0,
        keterangan: status === 'Negeri' ? 'Gratis (BOS & APBD Garut)' : 'Sesuai ketentuan yayasan'
      },
      ekstrakurikuler: schoolToEdit?.ekstrakurikuler || ['Pramuka', 'PMR', 'Paskibra', 'Futsal', 'Seni Sunda / Karawitan'],
      jurusanSMK: jurusanArray,
      bannerImg: schoolToEdit?.bannerImg || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80',
      logoImg: schoolToEdit?.logoImg || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=120&auto=format&fit=crop&q=80',
      tags: [jenjang, status, `Kecamatan ${kecamatan}`, `Akreditasi ${akreditasi}`, kurikulum]
    };

    onSave(updatedSchool);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER MODAL */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                  Operator Disdik
                </span>
                <span className="text-xs text-emerald-200">
                  {isEditing ? 'Mode Sunting Data Sekolah' : 'Registrasi Sekolah Baru'}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black font-['Outfit',sans-serif]">
                {isEditing ? `Edit: ${schoolToEdit.nama}` : 'Tambah Sekolah Baru se-Kabupaten Garut'}
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
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-800">
          
          {/* SECTION 1: IDENTITAS UTAMA */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <SchoolIcon className="w-4 h-4 text-emerald-700" />
              <span>1. Identitas & Legalitas Sekolah</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Nama Resmi Sekolah *</label>
                <input
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: SMPN 1 Tarogong Kidul"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">NPSN (8 Digit) *</label>
                <input
                  type="text"
                  required
                  value={npsn}
                  onChange={(e) => setNpsn(e.target.value)}
                  placeholder="20209123"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Jenjang</label>
                <select
                  value={jenjang}
                  onChange={(e) => setJenjang(e.target.value as JenjangSekolah)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                >
                  <option value="PAUD">PAUD</option>
                  <option value="TK">TK</option>
                  <option value="SD">SD</option>
                  <option value="MI">MI</option>
                  <option value="SMP">SMP</option>
                  <option value="MTs">MTs</option>
                  <option value="SMA">SMA</option>
                  <option value="MA">MA</option>
                  <option value="SMK">SMK</option>
                  <option value="SLB">SLB</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as StatusSekolah)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                >
                  <option value="Negeri">Negeri</option>
                  <option value="Swasta">Swasta</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Akreditasi BAN-S/M</label>
                <select
                  value={akreditasi}
                  onChange={(e) => setAkreditasi(e.target.value as Akreditasi)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                >
                  <option value="A">A (Unggul)</option>
                  <option value="B">B (Baik)</option>
                  <option value="C">C (Cukup)</option>
                  <option value="Belum Terakreditasi">Belum Terakreditasi</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kurikulum</label>
                <select
                  value={kurikulum}
                  onChange={(e) => setKurikulum(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                >
                  <option value="Kurikulum Merdeka">Kurikulum Merdeka</option>
                  <option value="Kurikulum 2013">Kurikulum 2013</option>
                  <option value="Kurikulum Berbasis Pesantren / Plus">Pesantren / Plus</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: LOKASI & ZONASI KECAMATAN */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>2. Lokasi Geografis & Zonasi Wilayah</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Kecamatan (Garut) *</label>
                <select
                  value={kecamatan}
                  onChange={(e) => setKecamatan(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                >
                  {garutZonasiData.map(z => (
                    <option key={z.kecamatan} value={z.kecamatan}>{z.kecamatan}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Alamat Lengkap *</label>
                <input
                  type="text"
                  required
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  placeholder="Jl. Cimanuk No. 12, Tarogong Kidul, Garut"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Latitude</label>
                <input
                  type="number"
                  step="0.000001"
                  value={lat}
                  onChange={(e) => setLat(parseFloat(e.target.value) || -7.22)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Longitude</label>
                <input
                  type="number"
                  step="0.000001"
                  value={lng}
                  onChange={(e) => setLng(parseFloat(e.target.value) || 107.90)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">No. Telp Sekolah</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(0262) 231xxx"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">WhatsApp PPDB</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="0812xxx"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: KUOTA PENERIMAAN PPDB 2026/2027 */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-700" />
                <span>3. Kuota PPDB Tahun Pelajaran 2026/2027</span>
              </span>
              <span className="text-emerald-700 font-black">
                Total Daya Tampung: {kuotaZonasi + kuotaPrestasi + kuotaAfirmasi + kuotaPerpindahan} Siswa
              </span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-emerald-50/60 p-3 rounded-2xl border border-emerald-200">
              <div>
                <label className="block font-bold text-emerald-950 mb-1">Zonasi (50%-70%)</label>
                <input
                  type="number"
                  min="0"
                  value={kuotaZonasi}
                  onChange={(e) => setKuotaZonasi(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-xl text-xs font-bold text-center"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-950 mb-1">Prestasi (20%-30%)</label>
                <input
                  type="number"
                  min="0"
                  value={kuotaPrestasi}
                  onChange={(e) => setKuotaPrestasi(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-xl text-xs font-bold text-center"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-950 mb-1">Afirmasi / KETM (15%)</label>
                <input
                  type="number"
                  min="0"
                  value={kuotaAfirmasi}
                  onChange={(e) => setKuotaAfirmasi(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-xl text-xs font-bold text-center"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-950 mb-1">Perpindahan Tugas (5%)</label>
                <input
                  type="number"
                  min="0"
                  value={kuotaPerpindahan}
                  onChange={(e) => setKuotaPerpindahan(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-xl text-xs font-bold text-center"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: FASILITAS, KEUNGGULAN & KHUSUS SMK */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>4. Fasilitas, Keunggulan & Visi Sekolah</span>
            </h3>

            {jenjang === 'SMK' && (
              <div>
                <label className="block font-bold text-slate-700 mb-1">Daftar Jurusan / Program Keahlian SMK (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={jurusanInput}
                  onChange={(e) => setJurusanInput(e.target.value)}
                  placeholder="Rekayasa Perangkat Lunak, Teknik Komputer & Jaringan, Akuntansi, Manajemen Perkantoran"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-700 mb-1">Fasilitas Utama (Pisahkan dengan koma)</label>
              <input
                type="text"
                value={fasilitasInput}
                onChange={(e) => setFasilitasInput(e.target.value)}
                placeholder="Lab Komputer, Perpustakaan Digital, Lapangan Basket, Mushola, Ruang OSIS"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Keunggulan & Program Khusus</label>
              <input
                type="text"
                value={keunggulanInput}
                onChange={(e) => setKeunggulanInput(e.target.value)}
                placeholder="Sekolah Adiwiyata, Pembinaan Olimpiade Sains, Bahasa Asing"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Visi Sekolah</label>
              <textarea
                rows={2}
                value={visi}
                onChange={(e) => setVisi(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs resize-none"
              />
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
            {isEditing && onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Apakah Anda yakin ingin menghapus data sekolah "${schoolToEdit.nama}" dari basis data Garut Cerdas?`)) {
                    onDelete(schoolToEdit.id);
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus Sekolah</span>
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
                id="btn-save-admin-school"
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isEditing ? 'Simpan Perubahan' : 'Terbitkan Sekolah Baru'}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
