export type JenjangSekolah = 'PAUD' | 'TK' | 'SD' | 'MI' | 'SMP' | 'MTs' | 'SMA' | 'MA' | 'SMK' | 'SLB';
export type StatusSekolah = 'Negeri' | 'Swasta';
export type Akreditasi = 'A' | 'B' | 'C' | 'Belum Terakreditasi';

export interface PrestasiItem {
  tahun: number;
  nama: string;
  tingkat: 'Kabupaten' | 'Provinsi' | 'Nasional' | 'Internasional';
  kategori: 'Akademik' | 'Olahraga' | 'Seni & Budaya' | 'Teknologi / Vokasi' | 'Keagamaan';
}

export interface School {
  id: string;
  npsn: string;
  nama: string;
  jenjang: JenjangSekolah;
  status: StatusSekolah;
  akreditasi: Akreditasi;
  akreditasiTahun: number;
  kecamatan: string;
  alamat: string;
  kodePos: string;
  koordinat: {
    lat: number;
    lng: number;
  };
  jarakKm?: number;
  phone: string;
  whatsapp?: string;
  email: string;
  website?: string;
  kurikulum: 'Kurikulum Merdeka' | 'Kurikulum 2013' | 'Kurikulum Berbasis Pesantren / Plus';
  rombel: number;
  kapasitasTotal: number;
  estimasiPendaftarTahunLalu: number;
  kuotaPPDB: {
    zonasi: number;
    prestasi: number;
    afirmasi: number;
    perpindahan: number;
    total: number;
  };
  fasilitas: string[];
  keunggulan: string[];
  visi: string;
  misi: string[];
  prestasiList: PrestasiItem[];
  biaya: {
    pendaftaran: number;
    sppBulanan: number;
    uangGedung: number;
    keterangan: string;
  };
  ekstrakurikuler: string[];
  jurusanSMK?: string[];
  bannerImg: string;
  logoImg: string;
  tags: string[];
}

export interface ZonasiSubdistrict {
  kecamatan: string;
  koordinatPusat: {
    lat: number;
    lng: number;
  };
  kelurahanDesa: string[];
  sekolahDalamZona: {
    tk?: string[];
    sd: string[];
    smp: string[];
    sma: string[];
    smk: string[];
    slb?: string[];
  };
}

export interface Scholarship {
  id: string;
  nama: string;
  pemberi: string;
  kategori: 'Pemkab Garut' | 'Pemerintah Pusat' | 'Swasta & Industri' | 'Perguruan Tinggi' | 'Baznas Garut' | 'Khusus Santri';
  jenjang: ('PAUD' | 'TK' | 'SD' | 'SMP' | 'SMA' | 'SMK' | 'MI' | 'MTs' | 'MA' | 'SLB' | 'D3' | 'S1' | 'S2')[];
  besarBantuan: string;
  status: 'Buka' | 'Segera' | 'Tutup';
  periode: string;
  deadline: string;
  deskripsi: string;
  syarat: string[];
  dokumen: string[];
  linkResmi: string;
  kuotaPenerima: string;
  kontak: string;
  highlight?: boolean;
  tags: string[];
}

export interface TrainingCourse {
  id: string;
  nama: string;
  lembaga: string;
  tipeLembaga: 'BLK Disnakertrans Garut' | 'LPK Swasta Terakreditasi' | 'Balai Pelatihan Vokasi' | 'Sentra Industri Kreatif';
  bidang: 'Teknologi & Digital' | 'Kewirausahaan & UMKM' | 'Kerajinan Kulit Sukaregang' | 'Otomotif & Mesin' | 'Pertanian & Kopi Garut' | 'Tata Busana & Garmen' | 'Kuliner & Hospitality' | 'Bahasa Asing';
  durasi: string;
  biaya: number;
  gratisPemerintah: boolean;
  bersertifikat: boolean;
  sertifikasi: string;
  jadwalDaftar: string;
  alamat: string;
  kecamatan: string;
  kontak: string;
  linkDaftar: string;
  peluangKerja: string[];
  fasilitas: string[];
  persyaratan: string[];
}

export interface CareerPathway {
  id: string;
  namaJurusan: string;
  jenjang: 'SMK' | 'SMA' | 'Perguruan Tinggi';
  kategori: string;
  peluangKerjaTingkat: 'Sangat Tinggi' | 'Tinggi' | 'Sedang';
  rataRataGaji: string;
  prospekGarut: string;
  prospekNasional: string;
  bidangKarir: string[];
  skillKunci: string[];
  rekomendasiSekolahGarut: string[];
  proyeksiGarut5Tahun: string;
  deskripsi: string;
}

export interface EduEvent {
  id: string;
  tanggal: string; // YYYY-MM-DD
  judul: string;
  kategori: 'PPDB' | 'Beasiswa' | 'Libur' | 'Ujian' | 'Kegiatan Kabupaten';
  jenjangTerkait: string;
  deskripsi: string;
  lokasi?: string;
  penting?: boolean;
}

export interface SchoolQuestion {
  id: string;
  schoolId: string;
  schoolName: string;
  namaPengirim: string;
  rolePengirim: 'Orang Tua' | 'Siswa' | 'Umum' | 'Guru' | 'Masyarakat';
  pertanyaan: string;
  kategori: string;
  tanggalTanya: string;
  jawaban?: string;
  dijawabOleh?: string;
  tanggalJawab?: string;
  status: 'Dijawab' | 'Menunggu Respon' | 'Menunggu';
}

export interface Announcement {
  id: string;
  judul: string;
  tanggal: string;
  kategori: 'Resmi Disdik' | 'BOS & PIP' | 'Prestasi & Lomba' | 'PPDB Garut' | 'Edaran Libur';
  ringkasan: string;
  isiLengkap: string;
  penting: boolean;
  sumber: string;
  nomorSurat?: string;
}

export type UserRole = 
  | 'Orang Tua' 
  | 'Siswa' 
  | 'Calon Mahasiswa' 
  | 'Pendidik' 
  | 'Umum' 
  | 'Admin Disdik' 
  | 'Operator Sekolah';

export interface ChildData {
  id: string;
  nama: string;
  tanggalLahir?: string;
  jenjangSekarang: string;
  kelasSekarang?: number;
  sekolahAsal?: string;
  targetJenjang: string;
  minatUtama?: string;
  minatBakat?: string[];
}

export interface UserProfile {
  id?: string;
  nama: string;
  role: UserRole;
  email?: string;
  loginProvider?: 'google' | 'disdik_admin' | 'guest';
  isAdmin?: boolean;
  isOperator?: boolean;
  nip?: string;
  jabatan?: string;
  instansiDinas?: string;
  avatarUrl?: string;
  sekolahAsal?: string;
  noHp?: string;
  kecamatanDomisili: string;
  kelurahanDesa?: string;
  dataAnak: ChildData[];
  favoritSekolah: string[];
  favoritBeasiswa: string[];
  favoritPelatihan?: string[];
  notifikasiAktif: boolean | {
    ppdb: boolean;
    beasiswa: boolean;
    pengumuman: boolean;
  };
  hasilTesBakat?: {
    tipe: string;
    skor: Record<string, number>;
    tanggal: string;
    rekomendasiJurusan: string[];
  };
}

export interface QuizQuestion {
  id: number;
  soal: string;
  deskripsi: string;
  pilihan: {
    text: string;
    dimensi: 'Teknologi' | 'Agribisnis' | 'Kreatif' | 'Kesehatan' | 'Industri' | 'Sosial';
    iconName: string;
  }[];
}

export interface SuccessStory {
  id: string;
  nama: string;
  asalKecamatan: string;
  alumniSekolah: string;
  profesiSekarang: string;
  prestasi: string;
  kutipan: string;
  ceritaSingkat: string;
  foto: string;
}

export type FaseModulAjar = 
  | 'Fondasi (PAUD/TK)' 
  | 'Fase A (SD Kelas 1-2)' 
  | 'Fase B (SD Kelas 3-4)' 
  | 'Fase C (SD Kelas 5-6)' 
  | 'Fase D (SMP Kelas 7-9)' 
  | 'Fase E (SMA/SMK Kelas 10)' 
  | 'Fase F (SMA Kelas 11-12)' 
  | 'Fase F Kejuruan (SMK Kelas 11-12)' 
  | 'Fase Khusus (SLB / Disabilitas)';

export interface AsesmenRubrikItem {
  kriteria: string;
  perluBimbingan: string;
  cukup: string;
  baik: string;
  sangatBaik: string;
}

export interface ModulAjar {
  id: string;
  judul: string;
  mataPelajaran: string;
  jenjang: JenjangSekolah;
  fase: FaseModulAjar;
  kelas: string;
  semester: '1 (Ganjil)' | '2 (Genap)' | 'Semester 1 & 2';
  alokasiWaktu: string;
  penyusun: string;
  instansiPenyusun: string;
  tahunAjaran: string;
  kurikulum: string;
  profilPelajarPancasila: string[];
  saranaPrasarana: string[];
  targetPesertaDidik: string;
  modelPembelajaran: string;
  capaianPembelajaran: string;
  tujuanPembelajaran: string[];
  pemahamanBermakna: string;
  pertanyaanPemantik: string[];
  kegiatanPembelajaran: {
    pendahuluan: string[];
    intiBerdiferensiasi: {
      diferensiasiKonten?: string;
      diferensiasiProses: string;
      diferensiasiProduk?: string;
      langkahLangkah: string[];
    };
    penutupRefleksi: string[];
  };
  asesmen: {
    awalDiagnostik: string;
    formatif: string;
    sumatif: string;
    rubrik: AsesmenRubrikItem[];
  };
  lkpd: {
    judul: string;
    petunjuk: string[];
    soalAktivitas: string[];
    refleksiSiswa?: string[];
  };
  ringkasanMateri: string;
  glosarium: string[];
  daftarPustaka: string[];
  tags: string[];
  unduhanCount: number;
  rating: number;
  nomorSKKemendikdasmen?: string;
  kodeDapodik?: string;
  idPMM?: string;
  linkResmiKemendikbud?: string;
  fileSize?: string;
  formatFile?: string;
  kategoriModul?: 'Reguler' | 'P5' | 'Kejuruan Vokasi' | 'Inklusi';
}
