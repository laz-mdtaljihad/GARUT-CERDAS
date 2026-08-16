import { School } from '../types';
import { garutAllKecamatanSchools } from './garutKecamatanSchools';
import { garutDetailedElementaryAndSecondarySchools } from './garutDetailedElementaryAndSecondarySchools';
import { generateComprehensiveGarutSchools } from './garutAllLevelsGenerator';

const initialDetailedSchools: School[] = [
  // ==========================================
  // 🎒 JENJANG TK & PAUD KABUPATEN GARUT
  // ==========================================
  {
    id: 'tk-pembina-negeri-garut',
    npsn: '20257001',
    nama: 'TK Negeri Pembina Tarogong Kidul',
    jenjang: 'TK',
    status: 'Negeri',
    akreditasi: 'A',
    akreditasiTahun: 2024,
    kecamatan: 'Tarogong Kidul',
    alamat: 'Jl. Pembangunan No. 120, Sukagalih, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat',
    kodePos: '44151',
    koordinat: { lat: -7.2185, lng: 107.8921 },
    jarakKm: 1.2,
    phone: '(0262) 234112',
    whatsapp: '081320987111',
    email: 'tknpembina.garut@gmail.com',
    website: 'https://tknpembinagarut.sch.id',
    kurikulum: 'Kurikulum Merdeka',
    rombel: 8,
    kapasitasTotal: 160,
    estimasiPendaftarTahunLalu: 190,
    kuotaPPDB: {
      zonasi: 96,
      prestasi: 16,
      afirmasi: 32,
      perpindahan: 16,
      total: 160
    },
    fasilitas: [
      'Taman Bermain Edukatif Outdoor & Indoor',
      'Ruang Sentra Bermain Peran & Kreativitas',
      'Pojok Literasi & Dongeng Anak',
      'Kolam Renang Mini & Area Sensomotorik',
      'UKS Anak dengan Tenaga Medis Siaga',
      'Kantin Makanan Sehat & Higienis',
      'CCTV Keamanan Terpadu'
    ],
    keunggulan: [
      'TK Pembina Rujukan Nasional Ramah Anak di Garut',
      'Metode Pembelajaran Sentra & Kurikulum Merdeka Terintegrasi',
      'Pemeriksaan Tumbuh Kembang Rutin dengan Puskesmas Tarogong Kidul',
      'Program Pembiasaan Karakter, Adab, dan Doa Harian'
    ],
    visi: 'Membentuk Anak Usia Dini yang Berakhlak Mulia, Sehat, Ceria, Kreatif, dan Mandiri Menuju Generasi Emas',
    misi: [
      'Menanamkan nilai-nilai keagamaan dan budi pekerti luhur sejak dini',
      'Mengembangkan potensi kecerdasan majemuk (multiple intelligences)',
      'Menciptakan lingkungan bermain yang aman, nyaman, dan inklusif'
    ],
    prestasiList: [
      { tahun: 2025, nama: 'Juara 1 Lomba Kreativitas Guru & Anak PAUD Se-Priangan Timur', tingkat: 'Provinsi', kategori: 'Seni & Budaya' },
      { tahun: 2024, nama: 'Sekolah Ramah Anak Terbaik Kategori PAUD/TK Kab. Garut', tingkat: 'Kabupaten', kategori: 'Akademik' }
    ],
    biaya: {
      pendaftaran: 100000,
      sppBulanan: 120000,
      uangGedung: 500000,
      keterangan: 'Gratis biaya bagi keluarga penerima KIP/PKH (Jalur Afirmasi)'
    },
    ekstrakurikuler: ['Melukis & Mewarnai', 'Angklung Cilik', 'Senam Ceria', 'Hafalan Surat Pendek & Doa', 'Tari Tradisional Sunda'],
    bannerImg: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80',
    logoImg: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=200&q=80',
    tags: ['TK Negeri', 'Ramah Anak', 'Terakreditasi A', 'Tarogong Kidul']
  },
  {
    id: 'tk-it-alfityan-garut',
    npsn: '20268102',
    nama: 'TK Islam Terpadu Al-Fityan Garut',
    jenjang: 'TK',
    status: 'Swasta',
    akreditasi: 'A',
    akreditasiTahun: 2023,
    kecamatan: 'Garut Kota',
    alamat: 'Jl. Pramuka No. 45, Pakuwon, Kec. Garut Kota, Kabupaten Garut, Jawa Barat',
    kodePos: '44118',
    koordinat: { lat: -7.2178, lng: 107.9042 },
    jarakKm: 1.5,
    phone: '(0262) 238910',
    whatsapp: '082119882200',
    email: 'tkit.alfityangarut@gmail.com',
    website: 'https://alfityangarut.sch.id/tk',
    kurikulum: 'Kurikulum Berbasis Pesantren / Plus',
    rombel: 6,
    kapasitasTotal: 120,
    estimasiPendaftarTahunLalu: 150,
    kuotaPPDB: {
      zonasi: 40,
      prestasi: 30,
      afirmasi: 30,
      perpindahan: 20,
      total: 120
    },
    fasilitas: [
      'Ruang Kelas Ber-AC Full Interactive Smart Screen',
      'Mini Playground & Wahana Edukasi Sensori',
      'Pojok Tahfidz Cilik',
      'Laboratorium Sains Mini Anak',
      'Musholla Ramah Anak'
    ],
    keunggulan: [
      'Target Hafalan Juz 30 (Surat Pendek) & Doa Harian',
      'Pembiasaan Bahasa Arab & Inggris Dasar Sehari-hari',
      'Metode Montessori Terpadu Islami'
    ],
    visi: 'Mencetak Generasi Qurani yang Cerdas, Mandiri, dan Berwawasan Global',
    misi: [
      'Mengembangkan fitrah keimanan dan akhlak karimah',
      'Melatih kecakapan motorik halus dan kasar secara seimbang'
    ],
    prestasiList: [
      { tahun: 2025, nama: 'Juara 1 Tahfidz Balita Festival Anak Sholeh Jabar', tingkat: 'Provinsi', kategori: 'Keagamaan' }
    ],
    biaya: {
      pendaftaran: 200000,
      sppBulanan: 250000,
      uangGedung: 1200000,
      keterangan: 'Tersedia beasiswa yatim & dhuafa dari Yayasan'
    },
    ekstrakurikuler: ['Tahfidz Balita', 'Pildacil', 'Robotika Lego Cilik', 'Drum Band Cilik', 'Berenang'],
    bannerImg: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
    logoImg: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=200&q=80',
    tags: ['TKIT', 'Tahfidz Cilik', 'Garut Kota', 'Islami']
  },
  {
    id: 'paud-kasih-bunda-cikajang',
    npsn: '20279931',
    nama: 'PAUD Terpadu Kasih Bunda Cikajang',
    jenjang: 'PAUD',
    status: 'Swasta',
    akreditasi: 'A',
    akreditasiTahun: 2023,
    kecamatan: 'Cikajang',
    alamat: 'Jl. Raya Cikajang No. 88, Girijaya, Kec. Cikajang, Kabupaten Garut, Jawa Barat',
    kodePos: '44171',
    koordinat: { lat: -7.3382, lng: 107.7885 },
    jarakKm: 18.5,
    phone: '(0262) 577123',
    whatsapp: '085223344556',
    email: 'paud.kasihbunda.cikajang@gmail.com',
    kurikulum: 'Kurikulum Merdeka',
    rombel: 4,
    kapasitasTotal: 80,
    estimasiPendaftarTahunLalu: 95,
    kuotaPPDB: {
      zonasi: 50,
      prestasi: 10,
      afirmasi: 15,
      perpindahan: 5,
      total: 80
    },
    fasilitas: ['Ruang Kelas Ceria', 'Taman Agrowisata Mini Anak', 'Area Bermain Pasir & Air', 'Perpustakaan Mini'],
    keunggulan: [
      'Pendidikan Karakter Berbasis Kearifan Lokal Pertanian Garut Selatan',
      'Pemberian Makanan Tambahan (PMT) Bergizi Gratis'
    ],
    visi: 'Mewujudkan Anak Usia Dini yang Sehat, Ceria, dan Berakhlak',
    misi: ['Menstimulasi seluruh aspek perkembangan anak sesuai tahapan usianya'],
    prestasiList: [
      { tahun: 2024, nama: 'Juara 2 Lomba Gerak & Lagu PAUD se-Kabupaten Garut', tingkat: 'Kabupaten', kategori: 'Seni & Budaya' }
    ],
    biaya: {
      pendaftaran: 50000,
      sppBulanan: 75000,
      uangGedung: 300000,
      keterangan: 'Subsidi penuh dari dana BOP PAUD'
    },
    ekstrakurikuler: ['Menari', 'Bermain Musik Angklung', 'Mendongeng'],
    bannerImg: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    logoImg: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=200&q=80',
    tags: ['PAUD', 'Cikajang', 'Ramah Lingkungan', 'Terakreditasi']
  },
  {
    id: 'tk-pembina-leles',
    npsn: '20261109',
    nama: 'TK Negeri Pembina Leles',
    jenjang: 'TK',
    status: 'Negeri',
    akreditasi: 'A',
    akreditasiTahun: 2023,
    kecamatan: 'Leles',
    alamat: 'Jl. Raya Leles No. 104, Leles, Kec. Leles, Kabupaten Garut, Jawa Barat',
    kodePos: '44152',
    koordinat: { lat: -7.1082, lng: 107.8995 },
    jarakKm: 14.2,
    phone: '(0262) 455201',
    whatsapp: '081234119900',
    email: 'tknpembinleles@garutkab.go.id',
    kurikulum: 'Kurikulum Merdeka',
    rombel: 6,
    kapasitasTotal: 120,
    estimasiPendaftarTahunLalu: 135,
    kuotaPPDB: {
      zonasi: 70,
      prestasi: 15,
      afirmasi: 25,
      perpindahan: 10,
      total: 120
    },
    fasilitas: ['Ruang Sentra Balok & Seni', 'Taman Bermain Ayunan & Luncuran', 'UKS', 'Ruang Audio Visual'],
    keunggulan: ['Pusat Kegiatan Gugus PAUD Wilayah Garut Utara', 'Fasilitas Belajar Lengkap Standar Nasional'],
    visi: 'Generasi Usia Dini yang Tangguh, Berkarakter, dan Berkebudayaan',
    misi: ['Membimbing anak dengan kasih sayang dan suasana belajar yang menyenangkan'],
    prestasiList: [
      { tahun: 2025, nama: 'Juara 1 Senam Irama Ceria Tingkat Kabupaten Garut', tingkat: 'Kabupaten', kategori: 'Olahraga' }
    ],
    biaya: {
      pendaftaran: 75000,
      sppBulanan: 100000,
      uangGedung: 400000,
      keterangan: 'Bantuan Biaya Operasional PAUD'
    },
    ekstrakurikuler: ['Pildacil', 'Mewarnai', 'Pencak Silat Usia Dini'],
    bannerImg: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    logoImg: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80',
    tags: ['TK Negeri', 'Leles', 'Garut Utara', 'Terakreditasi A']
  },

  // ==========================================
  // 🎒 JENJANG SD & MI KABUPATEN GARUT
  // ==========================================
  {
    id: 'sdn-1-jayaraga',
    npsn: '20201011',
    nama: 'SDN 1 Jayaraga Garut',
    jenjang: 'SD',
    status: 'Negeri',
    akreditasi: 'A',
    akreditasiTahun: 2024,
    kecamatan: 'Tarogong Kidul',
    alamat: 'Jl. Cimanuk No. 201, Jayaraga, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat',
    kodePos: '44151',
    koordinat: { lat: -7.2162, lng: 107.8988 },
    jarakKm: 1.6,
    phone: '(0262) 231456',
    whatsapp: '081322339900',
    email: 'sdn1jayaraga@gmail.com',
    kurikulum: 'Kurikulum Merdeka',
    rombel: 18,
    kapasitasTotal: 540,
    estimasiPendaftarTahunLalu: 180,
    kuotaPPDB: {
      zonasi: 65,
      prestasi: 15,
      afirmasi: 15,
      perpindahan: 5,
      total: 100
    },
    fasilitas: ['Laboratorium Komputer', 'Perpustakaan Ramah Anak', 'Lapangan Futsal & Badminton', 'Musholla', 'UKS'],
    keunggulan: [
      'Sekolah Penggerak Angkatan 2 Kemendikbudristek',
      'Prestasi Juara Bertahan OSN & FLS2N Tingkat Kecamatan & Kabupaten',
      'Program Pembiasaan Bahasa Sunda & Literasi 15 Menit'
    ],
    visi: 'Terwujudnya Siswa Beriman, Berakhlak Mulia, Cerdas, dan Terampil',
    misi: ['Melaksanakan pembelajaran aktif, kreatif, dan berpusat pada peserta didik'],
    prestasiList: [
      { tahun: 2025, nama: 'Juara 1 OSN Matematika SD Tingkat Kabupaten Garut', tingkat: 'Kabupaten', kategori: 'Akademik' },
      { tahun: 2024, nama: 'Juara 1 Lomba Tari Tradisional Sunda FLS2N', tingkat: 'Provinsi', kategori: 'Seni & Budaya' }
    ],
    biaya: {
      pendaftaran: 0,
      sppBulanan: 0,
      uangGedung: 0,
      keterangan: 'Gratis 100% didanai BOS APBN & BOSP Pemkab Garut'
    },
    ekstrakurikuler: ['Pramuka', 'Pencak Silat', 'Tahfidz Al-Quran', 'Dokter Kecil', 'Angklung'],
    bannerImg: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
    logoImg: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=200&q=80',
    tags: ['SD Negeri', 'Sekolah Penggerak', 'Tarogong Kidul', 'Gratis BOS']
  },
  {
    id: 'sdn-1-regol',
    npsn: '20201045',
    nama: 'SDN 1 Regol Garut Kota',
    jenjang: 'SD',
    status: 'Negeri',
    akreditasi: 'A',
    akreditasiTahun: 2023,
    kecamatan: 'Garut Kota',
    alamat: 'Jl. Veteran No. 18, Regol, Kec. Garut Kota, Kabupaten Garut, Jawa Barat',
    kodePos: '44114',
    koordinat: { lat: -7.2189, lng: 107.9035 },
    jarakKm: 1.9,
    phone: '(0262) 232104',
    whatsapp: '081299887711',
    email: 'sdn1regol@disdikgarut.id',
    kurikulum: 'Kurikulum Merdeka',
    rombel: 12,
    kapasitasTotal: 360,
    estimasiPendaftarTahunLalu: 120,
    kuotaPPDB: {
      zonasi: 55,
      prestasi: 15,
      afirmasi: 20,
      perpindahan: 10,
      total: 100
    },
    fasilitas: ['Ruang Kelas Representatif', 'Pojok Baca Literasi', 'Lab Komputer', 'Lapangan Serbaguna'],
    keunggulan: [
      'Sekolah Adiwiyata Tingkat Provinsi Jawa Barat',
      'Lokasi Strategis di Pusat Kota Garut dengan Keamanan Terjamin'
    ],
    visi: 'Membentuk Peserta Didik Unggul, Berwawasan Lingkungan, dan Berbudi Pekerti',
    misi: ['Membiasakan hidup bersih, sehat, dan ramah lingkungan hidup'],
    prestasiList: [
      { tahun: 2024, nama: 'Juara 1 Lomba Pidato Bahasa Sunda Pasanggiri SD', tingkat: 'Kabupaten', kategori: 'Seni & Budaya' }
    ],
    biaya: {
      pendaftaran: 0,
      sppBulanan: 0,
      uangGedung: 0,
      keterangan: 'Gratis 100% melalui BOS'
    },
    ekstrakurikuler: ['Pramuka', 'PMR Mula', 'Karate', 'Rebana & Marawis'],
    bannerImg: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    logoImg: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=200&q=80',
    tags: ['SD Negeri', 'Adiwiyata', 'Garut Kota', 'Gratis BOS']
  },
  {
    id: 'min-1-garut-wanaraja',
    npsn: '60707122',
    nama: 'MIN 1 Garut (Wanaraja)',
    jenjang: 'MI',
    status: 'Negeri',
    akreditasi: 'A',
    akreditasiTahun: 2024,
    kecamatan: 'Wanaraja',
    alamat: 'Jl. Raya Wanaraja No. 89, Wanaraja, Kec. Wanaraja, Kabupaten Garut, Jawa Barat',
    kodePos: '44183',
    koordinat: { lat: -7.1895, lng: 107.9782 },
    jarakKm: 8.5,
    phone: '(0262) 441098',
    whatsapp: '085320119933',
    email: 'min1garut@kemenag.go.id',
    kurikulum: 'Kurikulum Merdeka',
    rombel: 14,
    kapasitasTotal: 420,
    estimasiPendaftarTahunLalu: 140,
    kuotaPPDB: {
      zonasi: 60,
      prestasi: 20,
      afirmasi: 15,
      perpindahan: 5,
      total: 100
    },
    fasilitas: ['Gedung Madrasah 2 Lantai', 'Masjid Al-Ikhlas', 'Lab Komputer CBT', 'Perpustakaan Digital'],
    keunggulan: [
      'Madrasah Ibtidaiyah Negeri Unggulan Kemenag Kab. Garut',
      'Kurikulum Terintegrasi Agama Islam dan Sains Teknologi',
      'Program Tahfidz Juz 30 & Bahasa Arab Sehari-hari'
    ],
    visi: 'Terwujudnya Generasi Qurani, Cerdas, Terampil, dan Berakhlak Karimah',
    misi: ['Membina kecerdasan spiritual, intelektual, dan emosional siswa'],
    prestasiList: [
      { tahun: 2025, nama: 'Juara 1 KSM (Kompetisi Sains Madrasah) Matematika Terintegrasi MI', tingkat: 'Kabupaten', kategori: 'Akademik' }
    ],
    biaya: {
      pendaftaran: 0,
      sppBulanan: 0,
      uangGedung: 0,
      keterangan: 'Gratis didanai BOS Kemenag'
    },
    ekstrakurikuler: ['Pramuka Penggalang', 'Tahfidz Quran', 'Kaligrafi Islami', 'Pencak Silat'],
    bannerImg: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    logoImg: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80',
    tags: ['MIN', 'Madrasah', 'Wanaraja', 'Tahfidz', 'Gratis']
  },
  {
    id: 'sd-yos-sudarso-garut',
    npsn: '20201089',
    nama: 'SD Yos Sudarso Garut',
    jenjang: 'SD',
    status: 'Swasta',
    akreditasi: 'A',
    akreditasiTahun: 2023,
    kecamatan: 'Garut Kota',
    alamat: 'Jl. Bank No. 24, Pakuwon, Kec. Garut Kota, Kabupaten Garut, Jawa Barat',
    kodePos: '44117',
    koordinat: { lat: -7.2148, lng: 107.9022 },
    jarakKm: 1.4,
    phone: '(0262) 231589',
    whatsapp: '081223908811',
    email: 'sdyossudarsogarut@gmail.com',
    kurikulum: 'Kurikulum Merdeka',
    rombel: 12,
    kapasitasTotal: 360,
    estimasiPendaftarTahunLalu: 110,
    kuotaPPDB: {
      zonasi: 40,
      prestasi: 30,
      afirmasi: 20,
      perpindahan: 10,
      total: 100
    },
    fasilitas: ['Ruang Musik & Band', 'Lab Komputer & Coding', 'Lapangan Basket', 'UKS Lengkap', 'Aula Pertemuan'],
    keunggulan: [
      'Pendidikan Karakter Humanis, Disiplin, dan Berbudi Pekerti',
      'Pengajaran Bahasa Inggris & Komputer sejak Kelas 1',
      'Prestasi Seni Suara & Musik Tingkat Provinsi Jawa Barat'
    ],
    visi: 'Menjadi Lembaga Pendidikan Katolik yang Unggul, Berbela Rasa, dan Berkarakter',
    misi: ['Mengembangkan bakat siswa secara menyeluruh dalam suasana kasih dan persaudaraan'],
    prestasiList: [
      { tahun: 2024, nama: 'Juara 1 Lomba Paduan Suara Anak Tingkat Jawa Barat', tingkat: 'Provinsi', kategori: 'Seni & Budaya' }
    ],
    biaya: {
      pendaftaran: 150000,
      sppBulanan: 200000,
      uangGedung: 1500000,
      keterangan: 'Tersedia beasiswa bagi siswa berprestasi & kurang mampu'
    },
    ekstrakurikuler: ['Paduan Suara', 'Basket', 'Coding Cilik', 'Melukis', 'Catur'],
    bannerImg: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    logoImg: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=200&q=80',
    tags: ['SD Swasta', 'Garut Kota', 'Karakter Unggul', 'Musik & Bahasa']
  },

  // ==========================================
  // 🎒 JENJANG SMP & MTs KABUPATEN GARUT
  // ==========================================
  {
    id: 'smpn-1-garut',
    npsn: '20209211',
    nama: 'SMPN 1 Garut',
    jenjang: 'SMP',
    status: 'Negeri',
    akreditasi: 'A',
    akreditasiTahun: 2024,
    kecamatan: 'Garut Kota',
    alamat: 'Jl. Ahmad Yani No. 43, Pakuwon, Kec. Garut Kota, Kabupaten Garut, Jawa Barat',
    kodePos: '44117',
    koordinat: { lat: -7.2132, lng: 107.9015 },
    jarakKm: 1.1,
    phone: '(0262) 231478',
    whatsapp: '081223998811',
    email: 'info@smpn1garut.sch.id',
    website: 'https://smpn1garut.sch.id',
    kurikulum: 'Kurikulum Merdeka',
    rombel: 30,
    kapasitasTotal: 960,
    estimasiPendaftarTahunLalu: 820,
    kuotaPPDB: {
      zonasi: 160,
      prestasi: 96,
      afirmasi: 48,
      perpindahan: 16,
      total: 320
    },
    fasilitas: [
      'Laboratorium Komputer & Digital Class',
      'Laboratorium IPA Lengkap',
      'Perpustakaan Graha Pintar Terakreditasi A',
      'Lapangan Olahraga Multifungsi',
      'Masjid Al-Kautsar SMPN 1',
      'Studio Seni Musik & Gamelan Sunda'
    ],
    keunggulan: [
      'SMP Terbaik & Tertua di Garut dengan Segudang Prestasi Nasional',
      'Penyumbang Terbanyak Siswa Masuk SMA/SMK Unggulan Jawa Barat',
      'Program Kelas Digital & Olimpiade Sains Terpadu'
    ],
    visi: 'Unggul dalam Prestasi, Luhur dalam Budi Pekerti, dan Berwawasan Lingkungan Global',
    misi: [
      'Menyelenggarakan pembelajaran saintifik dan berbasis proyek',
      'Mengembangkan potensi sains, seni, dan bahasa siswa ke level nasional'
    ],
    prestasiList: [
      { tahun: 2025, nama: 'Juara 1 OSN IPA SMP Tingkat Jawa Barat', tingkat: 'Provinsi', kategori: 'Akademik' },
      { tahun: 2024, nama: 'Medali Perak FLS2N Desain Poster Nasional', tingkat: 'Nasional', kategori: 'Seni & Budaya' }
    ],
    biaya: {
      pendaftaran: 0,
      sppBulanan: 0,
      uangGedung: 0,
      keterangan: 'Bebas biaya pendidikan melalui BOS Pusat & Pemda Garut'
    },
    ekstrakurikuler: ['Pramuka Inti', 'PMR', 'English Club', 'Robotika', 'Basket', 'Degung Sunda'],
    bannerImg: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    logoImg: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=200&q=80',
    tags: ['SMP Favorit', 'Pusat Kota Garut', 'Akreditasi A', 'OSN']
  },
  {
    id: 'smpn-2-garut',
    npsn: '20209212',
    nama: 'SMPN 2 Garut',
    jenjang: 'SMP',
    status: 'Negeri',
    akreditasi: 'A',
    akreditasiTahun: 2023,
    kecamatan: 'Tarogong Kidul',
    alamat: 'Jl. Patriot No. 34, Sukagalih, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat',
    kodePos: '44151',
    koordinat: { lat: -7.2115, lng: 107.8931 },
    jarakKm: 1.4,
    phone: '(0262) 233189',
    whatsapp: '081394551122',
    email: 'kontak@smpn2garut.sch.id',
    kurikulum: 'Kurikulum Merdeka',
    rombel: 27,
    kapasitasTotal: 864,
    estimasiPendaftarTahunLalu: 710,
    kuotaPPDB: {
      zonasi: 144,
      prestasi: 86,
      afirmasi: 44,
      perpindahan: 14,
      total: 288
    },
    fasilitas: ['Lab Bahasa Digital', 'Lab Komputer', 'Perpustakaan Edukasi', 'Aula Serbaguna', 'Lapangan Basket'],
    keunggulan: [
      'Sekolah Adiwiyata Mandiri dengan Pengelolaan Sampah Modern',
      'Prestasi Ekstrakurikuler Paskibra & Olahraga Terkemuka di Garut'
    ],
    visi: 'Berprestasi, Berkarakter, Berbudaya Lingkungan, dan Berdaya Saing',
    misi: ['Mendorong inovasi pembelajaran dan kepedulian terhadap kelestarian lingkungan'],
    prestasiList: [
      { tahun: 2025, nama: 'Juara Umum LKBB Paskibra SMP se-Jawa Barat', tingkat: 'Provinsi', kategori: 'Olahraga' }
    ],
    biaya: {
      pendaftaran: 0,
      sppBulanan: 0,
      uangGedung: 0,
      keterangan: 'Gratis BOS'
    },
    ekstrakurikuler: ['Paskibra', 'Pramuka', 'Futsal', 'Seni Vokal', 'KIR Remaja'],
    bannerImg: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
    logoImg: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=200&q=80',
    tags: ['SMP Rujukan', 'Tarogong Kidul', 'Adiwiyata Mandiri', 'Paskibra']
  },
  {
    id: 'mtsn-1-garut',
    npsn: '20277912',
    nama: 'MTsN 1 Garut',
    jenjang: 'MTs',
    status: 'Negeri',
    akreditasi: 'A',
    akreditasiTahun: 2024,
    kecamatan: 'Tarogong Kidul',
    alamat: 'Jl. Merdeka No. 17, Haurpanggung, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat',
    kodePos: '44151',
    koordinat: { lat: -7.2155, lng: 107.8965 },
    jarakKm: 1.7,
    phone: '(0262) 234551',
    whatsapp: '082120334488',
    email: 'mtsn1garut@kemenag.go.id',
    website: 'https://mtsn1garut.sch.id',
    kurikulum: 'Kurikulum Merdeka',
    rombel: 24,
    kapasitasTotal: 768,
    estimasiPendaftarTahunLalu: 690,
    kuotaPPDB: {
      zonasi: 128,
      prestasi: 77,
      afirmasi: 38,
      perpindahan: 13,
      total: 256
    },
    fasilitas: ['Laboratorium IPA & Komputer', 'Masjid Al-Hikmah', 'Asrama Santri Pilihan', 'Perpustakaan Islam'],
    keunggulan: [
      'Madrasah Tsanawiyah Negeri Terbaik di Kabupaten Garut',
      'Program Khusus Kelas Bilingual & Tahfidz Quran',
      'Juara KSM (Kompetisi Sains Madrasah) Tingkat Nasional'
    ],
    visi: 'Mewujudkan Insan Madrasah yang Unggul dalam Imtak, Terdepan dalam Iptek',
    misi: ['Menumbuhkan penghayatan ajaran Islam dan penguasaan sains teknologi modern'],
    prestasiList: [
      { tahun: 2025, nama: 'Medali Emas KSM Nasional Bidang IPA Terpadu MTs', tingkat: 'Nasional', kategori: 'Akademik' }
    ],
    biaya: {
      pendaftaran: 0,
      sppBulanan: 0,
      uangGedung: 0,
      keterangan: 'Didanai BOS Kemenag'
    },
    ekstrakurikuler: ['Tahfidz Al-Quran', 'KIR Madrasah', 'Kaligrafi', 'Hadroh', 'Pramuka'],
    bannerImg: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    logoImg: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80',
    tags: ['MTs Negeri', 'Kemenag Garut', 'Tahfidz', 'KSM Juara']
  },
  {
    id: 'smpn-1-cikajang',
    npsn: '20209224',
    nama: 'SMPN 1 Cikajang',
    jenjang: 'SMP',
    status: 'Negeri',
    akreditasi: 'A',
    akreditasiTahun: 2023,
    kecamatan: 'Cikajang',
    alamat: 'Jl. Raya Cikajang No. 12, Padasuka, Kec. Cikajang, Kabupaten Garut, Jawa Barat',
    kodePos: '44171',
    koordinat: { lat: -7.3412, lng: 107.7915 },
    jarakKm: 19.1,
    phone: '(0262) 577019',
    whatsapp: '081395882244',
    email: 'smpn1cikajang@gmail.com',
    kurikulum: 'Kurikulum Merdeka',
    rombel: 24,
    kapasitasTotal: 768,
    estimasiPendaftarTahunLalu: 540,
    kuotaPPDB: {
      zonasi: 130,
      prestasi: 70,
      afirmasi: 38,
      perpindahan: 18,
      total: 256
    },
    fasilitas: ['Lab Komputer', 'Perpustakaan', 'Lapangan Futsal', 'Greenhouse Pertanian Sekolah', 'UKS'],
    keunggulan: ['Pusat Pendidikan Menengah Pertama Utama di Garut Selatan', 'Juara Bola Voli & Futsal Pelajar Garut'],
    visi: 'Berprestasi, Religius, Mandiri, dan Peduli Kelestarian Alam',
    misi: ['Membekali siswa dengan ilmu pengetahuan dan keterampilan hidup aplikatif'],
    prestasiList: [
      { tahun: 2024, nama: 'Juara 1 Turnamen Voli Pelajar SMP Se-Garut Selatan', tingkat: 'Kabupaten', kategori: 'Olahraga' }
    ],
    biaya: {
      pendaftaran: 0,
      sppBulanan: 0,
      uangGedung: 0,
      keterangan: 'Gratis BOS'
    },
    ekstrakurikuler: ['Pramuka', 'Voli', 'Pencak Silat', 'PMR', 'Sanggar Seni Sunda'],
    bannerImg: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    logoImg: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80',
    tags: ['SMP Negeri', 'Cikajang', 'Garut Selatan', 'Olahraga']
  },

  // ==========================================
  // 🎒 JENJANG SMA & MA KABUPATEN GARUT
  // ==========================================
  {
    id: 'sman-1-garut',
    npsn: '20209201',
    nama: 'SMAN 1 Garut',
    jenjang: 'SMA',
    status: 'Negeri',
    akreditasi: 'A',
    akreditasiTahun: 2023,
    kecamatan: 'Tarogong Kidul',
    alamat: 'Jl. Merdeka No. 91, Jayaraga, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat',
    kodePos: '44151',
    koordinat: { lat: -7.2144, lng: 107.8972 },
    jarakKm: 1.8,
    phone: '(0262) 233782',
    whatsapp: '081223458901',
    email: 'info@sman1garut.sch.id',
    website: 'https://sman1garut.sch.id',
    kurikulum: 'Kurikulum Merdeka',
    rombel: 36,
    kapasitasTotal: 1296,
    estimasiPendaftarTahunLalu: 940,
    kuotaPPDB: {
      zonasi: 216,
      prestasi: 108,
      afirmasi: 65,
      perpindahan: 43,
      total: 432
    },
    fasilitas: [
      'Laboratorium Komputer & AI Lab',
      'Laboratorium IPA Terpadu (Fisika, Kimia, Biologi)',
      'Perpustakaan Digital Ramah Literasi',
      'Masjid Baitul Ilmi Berlantai 2',
      'Lapangan Olahraga Multifungsi (Basket, Futsal, Voli)',
      'Auditorium Graha Cendekia Kapasitas 800 Orang',
      'Ruang Multimedia & Podcast Studio',
      'Kantin Sehat Higienis Terverifikasi Dinkes'
    ],
    keunggulan: [
      'Peringkat 1 UTBK & SNBP Terbaik di Kabupaten Garut',
      'Sekolah Penggerak Mandiri Berbagi Tingkat Nasional',
      'Program Kelas Unggulan Olimpiade Sains Terbina Intensif',
      'Kerjasama Pembinaan Karir dengan Top 10 PTN Indonesia'
    ],
    visi: 'Mewujudkan Generasi Unggul Berprestasi, Berakhlak Mulia, Berwawasan Lingkungan dan Berdaya Saing Global',
    misi: [
      'Menyelenggarakan pembelajaran berdiferensiasi yang menumbuhkan nalar kritis dan kreativitas',
      'Membina karakter profil pelajar Pancasila secara berkesinambungan',
      'Mengembangkan bakat siswa di bidang sains, riset ilmiah, seni, dan olahraga ke tingkat internasional'
    ],
    prestasiList: [
      { tahun: 2025, nama: 'Medali Emas Olimpiade Sains Nasional (OSN) Bidang Kimia', tingkat: 'Nasional', kategori: 'Akademik' },
      { tahun: 2025, nama: 'Juara 1 Lomba Karya Tulis Ilmiah Lingkungan Hidup Jabar', tingkat: 'Provinsi', kategori: 'Akademik' },
      { tahun: 2024, nama: 'Juara 1 DBL Basketball Championship Series West Java', tingkat: 'Provinsi', kategori: 'Olahraga' }
    ],
    biaya: {
      pendaftaran: 0,
      sppBulanan: 0,
      uangGedung: 0,
      keterangan: 'Bebas biaya iuran bulanan (BOPD Pemprov Jabar & BOS Pusat)'
    },
    ekstrakurikuler: ['KIR Sains', 'English Debating Society', 'Pramuka Ambalan', 'Paskibraka', 'Keluarga Paduan Suara', 'Basket', 'Robotika'],
    bannerImg: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
    logoImg: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=200&q=80',
    tags: ['SMA Favorit', 'Top UTBK Garut', 'Akreditasi A', 'Sekolah Penggerak']
  },
  {
    id: 'sman-11-garut',
    npsn: '20209204',
    nama: 'SMAN 11 Garut',
    jenjang: 'SMA',
    status: 'Negeri',
    akreditasi: 'A',
    akreditasiTahun: 2024,
    kecamatan: 'Garut Kota',
    alamat: 'Jl. Siliwangi No. 2, Pakuwon, Kec. Garut Kota, Kabupaten Garut, Jawa Barat',
    kodePos: '44117',
    koordinat: { lat: -7.2173, lng: 107.9058 },
    jarakKm: 1.2,
    phone: '(0262) 231502',
    whatsapp: '081299881122',
    email: 'info@sman11garut.sch.id',
    website: 'https://sman11garut.sch.id',
    kurikulum: 'Kurikulum Merdeka',
    rombel: 33,
    kapasitasTotal: 1188,
    estimasiPendaftarTahunLalu: 860,
    kuotaPPDB: {
      zonasi: 198,
      prestasi: 99,
      afirmasi: 59,
      perpindahan: 40,
      total: 396
    },
    fasilitas: ['Laboratorium Komputer CBT', 'Lab Fisika & Biologi', 'Perpustakaan Cerdas', 'Masjid Sekolah', 'Lapangan Basket & Futsal'],
    keunggulan: ['Lulusan Terbanyak Diterima di PTN Jalur SNBP & Kedinasan', 'Sekolah Ramah Anak Berprestasi'],
    visi: 'Unggul dalam Prestasi, Santun dalam Perilaku, Tangguh dalam Menghadapi Masa Depan',
    misi: ['Membentuk insan pembelajar sepanjang hayat berjiwa Pancasila'],
    prestasiList: [
      { tahun: 2025, nama: 'Juara 1 Lomba Cerdas Cermat 4 Pilar Kebangsaan MPR RI Jabar', tingkat: 'Provinsi', kategori: 'Akademik' }
    ],
    biaya: {
      pendaftaran: 0,
      sppBulanan: 0,
      uangGedung: 0,
      keterangan: 'Gratis BOS & BOPD Jabar'
    },
    ekstrakurikuler: ['Paskibra', 'Pramuka', 'Taekwondo', 'Seni Teater', 'Jurnalistik'],
    bannerImg: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    logoImg: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80',
    tags: ['SMA Negeri', 'Garut Kota', 'Top SNBP', 'Pusat Kota']
  },
  {
    id: 'man-1-garut',
    npsn: '20277908',
    nama: 'MAN 1 Garut',
    jenjang: 'MA',
    status: 'Negeri',
    akreditasi: 'A',
    akreditasiTahun: 2024,
    kecamatan: 'Tarogong Kidul',
    alamat: 'Jl. Merdeka No. 45, Jayawaras, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat',
    kodePos: '44151',
    koordinat: { lat: -7.2135, lng: 107.8951 },
    jarakKm: 1.5,
    phone: '(0262) 233910',
    whatsapp: '082199883344',
    email: 'info@man1garut.sch.id',
    website: 'https://man1garut.sch.id',
    kurikulum: 'Kurikulum Merdeka',
    rombel: 30,
    kapasitasTotal: 1080,
    estimasiPendaftarTahunLalu: 750,
    kuotaPPDB: {
      zonasi: 180,
      prestasi: 90,
      afirmasi: 54,
      perpindahan: 36,
      total: 360
    },
    fasilitas: ['Lab Bahasa Arab & Inggris', 'Lab Komputer CBT', 'Masjid Raya MAN 1', 'Asrama Boarding', 'Studio Multimedia'],
    keunggulan: [
      'Madrasah Aliyah Negeri Model Nasional di Priangan Timur',
      'Program Unggulan Keagamaan (Tahfidz 30 Juz) & Riset Madrasah (MYRES)',
      'Lulusan Kuliah di Al-Azhar Kairo & Top PTKIN / PTN Indonesia'
    ],
    visi: 'Terwujudnya Generasi Ulul Albab yang Cerdas, Mandiri, dan Berakhlak Mulia',
    misi: ['Menyiapkan calon pemimpin umat yang menguasai ilmu agama dan sains modern'],
    prestasiList: [
      { tahun: 2025, nama: 'Juara 1 Madrasah Young Researchers Supercamp (MYRES) Bidang Humaniora', tingkat: 'Nasional', kategori: 'Akademik' }
    ],
    biaya: {
      pendaftaran: 0,
      sppBulanan: 0,
      uangGedung: 0,
      keterangan: 'Gratis didanai BOS Kemenag'
    },
    ekstrakurikuler: ['Tahfidz Club', 'KIR MYRES', 'Debat Bahasa Arab', 'Hadroh', 'Pramuka'],
    bannerImg: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    logoImg: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=200&q=80',
    tags: ['MAN Model', 'Kemenag Garut', 'Tahfidz & Riset', 'Akreditasi A']
  },

  // ==========================================
  // 🎒 JENJANG SMK KABUPATEN GARUT
  // ==========================================
  {
    id: 'smkn-1-garut',
    npsn: '20209202',
    nama: 'SMKN 1 Garut',
    jenjang: 'SMK',
    status: 'Negeri',
    akreditasi: 'A',
    akreditasiTahun: 2024,
    kecamatan: 'Tarogong Kidul',
    alamat: 'Jl. Cimanuk No. 309A, Sukagalih, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat',
    kodePos: '44151',
    koordinat: { lat: -7.2188, lng: 107.8912 },
    jarakKm: 1.5,
    phone: '(0262) 233316',
    whatsapp: '081395678102',
    email: 'smkn1garut@yahoo.com',
    website: 'https://smkn1garut.sch.id',
    kurikulum: 'Kurikulum Merdeka',
    rombel: 48,
    kapasitasTotal: 1728,
    estimasiPendaftarTahunLalu: 1450,
    kuotaPPDB: {
      zonasi: 288,
      prestasi: 144,
      afirmasi: 86,
      perpindahan: 58,
      total: 576
    },
    fasilitas: [
      'Teaching Factory & Business Center Digital',
      'Laboratorium Rekayasa Perangkat Lunak & Jaringan Fiber Optic',
      'Studio Desain Komunikasi Visual (DKV) & Animasi 3D',
      'Lab Akuntansi & Mini Bank Berizin OJK',
      'Bursa Kerja Khusus (BKK) Mitra 100+ Industri Multinasional'
    ],
    keunggulan: [
      'SMK Pusat Keunggulan (SMK PK) Skema Pemadanan Industri Nasional',
      'Penyaluran Kerja 85%+ Langsung Diterima BUMN & Perusahaan Swasta Nasional',
      'Sertifikasi Kompetensi BNSP Berstandar Industri Internasional'
    ],
    visi: 'Menjadi SMK Pusat Keunggulan yang Menghasilkan Tamatan Berkarakter, Kompeten, Berjiwa Wirausaha dan Berdaya Saing Global',
    misi: [
      'Menyelenggarakan diklat vokasi selaras dengan tuntutan dunia usaha dan dunia industri (DUDI)',
      'Mengembangkan jiwa technopreneurship berbasis potensi kearifan lokal Garut'
    ],
    prestasiList: [
      { tahun: 2025, nama: 'Medali Perak Lomba Kompetensi Siswa (LKS) Nasional Bidang Cloud Computing', tingkat: 'Nasional', kategori: 'Teknologi / Vokasi' },
      { tahun: 2024, nama: 'Juara 1 LKS Tingkat Jawa Barat Bidang IT Software Solutions for Business', tingkat: 'Provinsi', kategori: 'Teknologi / Vokasi' }
    ],
    biaya: {
      pendaftaran: 0,
      sppBulanan: 0,
      uangGedung: 0,
      keterangan: 'Gratis biaya SPP (Didanai BOPD Pemprov Jabar & BOS Vokasi)'
    },
    ekstrakurikuler: ['Cyber Security Club', 'Multimedia & Sinematografi', 'Pramuka Vokasi', 'Robotics Garut', 'Futsal Club'],
    jurusanSMK: [
      'Rekayasa Perangkat Lunak (RPL)',
      'Teknik Komputer dan Jaringan (TKJ)',
      'Desain Komunikasi Visual (DKV)',
      'Akuntansi dan Keuangan Lembaga (AKL)',
      'Manajemen Perkantoran dan Layanan Bisnis (MPLB)',
      'Pemasaran Digital (Retail)'
    ],
    bannerImg: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
    logoImg: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=200&q=80',
    tags: ['SMK PK', 'Vokasi Unggulan', 'RPL & DKV', 'Bursa Kerja Khusus']
  },
  {
    id: 'smkn-2-garut',
    npsn: '20209203',
    nama: 'SMKN 2 Garut',
    jenjang: 'SMK',
    status: 'Negeri',
    akreditasi: 'A',
    akreditasiTahun: 2024,
    kecamatan: 'Tarogong Kidul',
    alamat: 'Jl. Suherman No. 90, Tarogong, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat',
    kodePos: '44151',
    koordinat: { lat: -7.2025, lng: 107.8895 },
    jarakKm: 2.1,
    phone: '(0262) 231458',
    whatsapp: '081234900112',
    email: 'info@smkn2garut.sch.id',
    website: 'https://smkn2garut.sch.id',
    kurikulum: 'Kurikulum Merdeka',
    rombel: 42,
    kapasitasTotal: 1512,
    estimasiPendaftarTahunLalu: 1200,
    kuotaPPDB: {
      zonasi: 252,
      prestasi: 126,
      afirmasi: 75,
      perpindahan: 51,
      total: 504
    },
    fasilitas: ['Bengkel Otomotif Modern Roda 4 & 2', 'Workshop Pemesinan & CNC', 'Lab Instalasi Tenaga Listrik', 'Lab Konstruksi & Gambar Arsitektur'],
    keunggulan: ['Mitra Resmi Industri Otomotif (Toyota, Astra Honda Motor, Daihatsu)', 'Penyaluran Magang Kerja ke Jepang'],
    visi: 'Mencetak Teknisi Profesional, Berdaya Saing Global, dan Berakhlak Mulia',
    misi: ['Membekali peserta didik dengan kompetensi teknik manufaktur dan otomotif terdepan'],
    prestasiList: [
      { tahun: 2025, nama: 'Juara 1 LKS Otomotif Automobile Technology Jawa Barat', tingkat: 'Provinsi', kategori: 'Teknologi / Vokasi' }
    ],
    biaya: {
      pendaftaran: 0,
      sppBulanan: 0,
      uangGedung: 0,
      keterangan: 'Gratis BOS & BOPD'
    },
    ekstrakurikuler: ['Klub Otomotif Modifikasi', 'Pramuka', 'Pencak Silat', 'Sepak Bola'],
    jurusanSMK: [
      'Teknik Kendaraan Ringan Otomotif (TKRO)',
      'Teknik dan Bisnis Sepeda Motor (TBSM)',
      'Teknik Pemesinan (TPM)',
      'Teknik Instalasi Tenaga Listrik (TITL)',
      'Desain Pemodelan dan Informasi Bangunan (DPIB)'
    ],
    bannerImg: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    logoImg: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=200&q=80',
    tags: ['SMK Teknik', 'Otomotif & Mesin', 'Magang Jepang', 'Akreditasi A']
  },
  {
    id: 'smk-wikrama-garut',
    npsn: '69758112',
    nama: 'SMK Wikrama 1 Garut',
    jenjang: 'SMK',
    status: 'Swasta',
    akreditasi: 'A',
    akreditasiTahun: 2024,
    kecamatan: 'Tarogong Kaler',
    alamat: 'Jl. Otto Iskandardinata No. 125, Pasawahan, Kec. Tarogong Kaler, Kabupaten Garut, Jawa Barat',
    kodePos: '44151',
    koordinat: { lat: -7.1982, lng: 107.8872 },
    jarakKm: 3.2,
    phone: '(0262) 241098',
    whatsapp: '081122334455',
    email: 'info@smkwikramagarut.sch.id',
    website: 'https://smkwikramagarut.sch.id',
    kurikulum: 'Kurikulum Merdeka',
    rombel: 24,
    kapasitasTotal: 864,
    estimasiPendaftarTahunLalu: 680,
    kuotaPPDB: {
      zonasi: 144,
      prestasi: 72,
      afirmasi: 43,
      perpindahan: 29,
      total: 288
    },
    fasilitas: ['Ruang Kelas Ber-AC & Paperless', 'Lab AI & Web Development', 'Teaching Restaurant & Hotel', 'Perpustakaan Smart Hub'],
    keunggulan: [
      'Pendidikan Karakter 7 Kebiasaan Efektif & Pembiasaan Akhlak Islami',
      'Kurikulum IT & Perhotelan Terakreditasi Standar Industri Nasional & Internasional',
      'Jaminan Lulusan Tersertifikasi Keahlian Kerja & Karir'
    ],
    visi: 'Menjadi SMK Unggulan Berwawasan Lingkungan, Teknologi Informasi, dan Berkarakter Akhlak Mulia',
    misi: ['Mempersiapkan tenaga terampil siap kerja dan wirausaha mandiri di era digital'],
    prestasiList: [
      { tahun: 2025, nama: 'Juara 1 Lomba Web Design & Coding Competition Jabar', tingkat: 'Provinsi', kategori: 'Teknologi / Vokasi' }
    ],
    biaya: {
      pendaftaran: 150000,
      sppBulanan: 275000,
      uangGedung: 1500000,
      keterangan: 'Tersedia Beasiswa Yayasan & Subsidi KIP Vokasi'
    },
    ekstrakurikuler: ['Web & Game Developer', 'English Club', 'Barista & Kuliner', 'Pramuka', 'Futsal'],
    jurusanSMK: [
      'Pengembangan Perangkat Lunak dan Gim (PPLG)',
      'Teknik Jaringan Komputer dan Telekomunikasi (TJKT)',
      'Perhotelan dan Hospitality',
      'Kuliner & Tata Boga'
    ],
    bannerImg: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    logoImg: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=200&q=80',
    tags: ['SMK IT', 'PPLG & Perhotelan', 'Tarogong Kaler', 'Karakter Unggul']
  },

  // ==========================================
  // 🎒 JENJANG SLB (INKLUSI) KABUPATEN GARUT
  // ==========================================
  {
    id: 'slbn-garut-kota',
    npsn: '20258101',
    nama: 'SLB Negeri Garut Kota',
    jenjang: 'SLB',
    status: 'Negeri',
    akreditasi: 'A',
    akreditasiTahun: 2023,
    kecamatan: 'Garut Kota',
    alamat: 'Jl. Bratayuda No. 82, Regol, Kec. Garut Kota, Kabupaten Garut, Jawa Barat',
    kodePos: '44114',
    koordinat: { lat: -7.2215, lng: 107.9062 },
    jarakKm: 2.2,
    phone: '(0262) 234889',
    whatsapp: '081320448899',
    email: 'slbngarutkota@gmail.com',
    kurikulum: 'Kurikulum Merdeka',
    rombel: 12,
    kapasitasTotal: 180,
    estimasiPendaftarTahunLalu: 80,
    kuotaPPDB: {
      zonasi: 40,
      prestasi: 10,
      afirmasi: 20,
      perpindahan: 10,
      total: 80
    },
    fasilitas: [
      'Ruang Terapi Sensori Integrasi & Wicara',
      'Bengkel Keterampilan Vokasi Disabilitas (Menjahit, Kerajinan, Salon)',
      'Ruang Braille & Komputer Aksesibilitas Khusus Tuna Netra',
      'Taman Olahraga Inklusif & Bocce'
    ],
    keunggulan: [
      'Pusat Rujukan Pendidikan Khusus & Inklusi Terbesar di Kabupaten Garut',
      'Tenaga Pengajar Ortopedagog & Terapis Bersertifikasi',
      'Pelatihan Kemandirian Usaha & Kriya Produk Khas Garut'
    ],
    visi: 'Membimbing Peserta Didik Berkebutuhan Khusus Menjadi Insan yang Mandiri, Terampil, dan Berkarakter Mulia',
    misi: [
      'Menyelenggarakan layanan pembelajaran ramah disabilitas yang optimal',
      'Melatih kemandirian hidup dan keterampilan kerja terapan'
    ],
    prestasiList: [
      { tahun: 2025, nama: 'Medali Emas Lomba Keterampilan Siswa Berkebutuhan Khusus (LKSN) Tata Busana', tingkat: 'Nasional', kategori: 'Teknologi / Vokasi' },
      { tahun: 2024, nama: 'Juara 1 Lari 100m Tuna Rungu O2SN Khusus Jawa Barat', tingkat: 'Provinsi', kategori: 'Olahraga' }
    ],
    biaya: {
      pendaftaran: 0,
      sppBulanan: 0,
      uangGedung: 0,
      keterangan: 'Gratis 100% didanai BOS Inklusi APBN & Pemprov Jawa Barat'
    },
    ekstrakurikuler: ['Tata Boga & Kue', 'Membatik & Kriya', 'Bocce & Atletik', 'Pramuka Luar Biasa', 'Seni Musik Angklung'],
    bannerImg: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
    logoImg: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=200&q=80',
    tags: ['SLB Negeri', 'Pendidikan Inklusi', 'Garut Kota', 'Gratis BOS']
  }
];

// Combine all primary, subdistrict, and generated dataset uniquely by ID
const generatedAll = generateComprehensiveGarutSchools();
const mergedSchoolMap = new Map<string, School>();

[...initialDetailedSchools, ...garutDetailedElementaryAndSecondarySchools, ...garutAllKecamatanSchools, ...generatedAll].forEach((sch) => {
  if (!mergedSchoolMap.has(sch.id)) {
    mergedSchoolMap.set(sch.id, sch);
  }
});

export const garutSchools: School[] = Array.from(mergedSchoolMap.values());

// District-wide Education Statistics for Kab. Garut (Disdik Data 2025/2026)
export const garutDistrictEducationStats = {
  totalSekolah: 2145,
  jenjangSummary: [
    { jenjang: 'PAUD / TK', jumlah: 680, negeri: 48, swasta: 632, siswa: 24500, pendaftarPPDB: 22100, persentase: '31.7%' },
    { jenjang: 'SD / MI', jumlah: 945, negeri: 820, swasta: 125, siswa: 142000, pendaftarPPDB: 28400, persentase: '44.1%' },
    { jenjang: 'SMP / MTs', jumlah: 285, negeri: 145, swasta: 140, siswa: 76500, pendaftarPPDB: 26800, persentase: '13.3%' },
    { jenjang: 'SMA / MA', jumlah: 120, negeri: 42, swasta: 78, siswa: 41200, pendaftarPPDB: 16200, persentase: '5.6%' },
    { jenjang: 'SMK', jumlah: 98, negeri: 15, swasta: 83, siswa: 38400, pendaftarPPDB: 15800, persentase: '4.6%' },
    { jenjang: 'SLB', jumlah: 17, negeri: 4, swasta: 13, siswa: 1850, pendaftarPPDB: 650, persentase: '0.8%' }
  ],
  wilayahZonasiPPDB: [
    { wilayah: 'Garut Utara (12 Kec)', kuotaZonasi: 12500, pendaftar: 14200, rasioKeketatan: '1.14x', kecamatan: 'Leles, Kadungora, Cibatu, Balubur Limbangan, Selaawi, Malangbong, Kersamanah, Leuwigoong, Banyuresmi, Cibiuk, Karangtengah, Sukawening' },
    { wilayah: 'Garut Tengah / Kota (14 Kec)', kuotaZonasi: 21400, pendaftar: 29800, rasioKeketatan: '1.39x', kecamatan: 'Garut Kota, Tarogong Kidul, Tarogong Kaler, Karangpawitan, Wanaraja, Samarang, Pasirwangi, Cilawu, Bayongbong, Sukaresmi, Cisurupan, Pangatikan, Sucinaraja, Cigedug' },
    { wilayah: 'Garut Selatan (16 Kec)', kuotaZonasi: 14800, pendaftar: 15300, rasioKeketatan: '1.03x', kecamatan: 'Cikajang, Singajaya, Peundeuy, Banjarwangi, Cisompet, Pameungpeuk, Cibalong, Cikelet, Caringin, Bungbulang, Mekarmukti, Pamulihan, Pakenjeng, Cisewu, Talegong, Cihurip' }
  ],
  beasiswaStatsGarut: {
    totalAlokasiTahun: 'Rp 28.5 Miliar',
    totalPenerima: 14250,
    kategoriPemberi: [
      { name: 'Pemkab Garut (APBD)', nilaiMiliar: 8.5, penerima: 4200, color: '#2563eb' },
      { name: 'Pusat (KIP / PIP / Kemendikbud)', nilaiMiliar: 12.0, penerima: 6800, color: '#10b981' },
      { name: 'Baznas Kab. Garut', nilaiMiliar: 3.2, penerima: 1850, color: '#f59e0b' },
      { name: 'Swasta & CSR Industri Garut', nilaiMiliar: 2.8, penerima: 950, color: '#8b5cf6' },
      { name: 'Beasiswa Khusus Santri Garut', nilaiMiliar: 2.0, penerima: 450, color: '#ec4899' }
    ]
  }
};
