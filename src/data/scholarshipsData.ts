import { Scholarship } from '../types';

export const garutScholarships: Scholarship[] = [
  {
    id: 'beasiswa-garut-cerdas-2026',
    nama: 'Beasiswa Garut Cerdas (BGC) 2026',
    pemberi: 'Pemerintah Kabupaten Garut & Dinas Pendidikan',
    kategori: 'Pemkab Garut',
    jenjang: ['SD', 'SMP', 'SMA', 'SMK', 'S1'],
    besarBantuan: 'Rp 500.000 – Rp 4.500.000 / semester',
    status: 'Buka',
    periode: 'Semester Ganjil 2026/2027',
    deadline: '2026-09-15',
    deskripsi: 'Program bantuan biaya pendidikan prioritas dari Bupati Garut untuk siswa berprestasi dan siswa dari keluarga kurang mampu ber-KTP/KK Kabupaten Garut.',
    syarat: [
      'Memiliki Kartu Keluarga (KK) dan berdomisili sah di Kabupaten Garut minimal 1 tahun',
      'Terdaftar aktif di sekolah/madrasah atau perguruan tinggi di Kabupaten Garut',
      'Untuk Jalur Prestasi: Nilai rata-rata rapor minimal 80,00 atau memiliki sertifikat juara lomba min. tingkat Kabupaten',
      'Untuk Jalur Afirmasi: Terdaftar di DTKS Kementerian Sosial atau memiliki Surat Keterangan Tidak Mampu (SKTM) resmi dari Desa/Kelurahan',
      'Tidak sedang menerima beasiswa penuh dari sumber pemerintah lain (double funding)'
    ],
    dokumen: [
      'Salinan Kartu Keluarga (KK) Garut & KTP Orang Tua/Wali',
      'Surat Keterangan Aktif Sekolah / KRS Aktif Mahasiswa',
      'Salinan Rapor 2 Semester Terakhir yang dilegalisir',
      'Surat Keterangan Tidak Mampu (SKTM) atau Kartu KIP/PKH (Jalur Afirmasi)',
      'Sertifikat / Piagam Kejuaraan (Jalur Prestasi)',
      'Buku Rekening Bank bjb aktif atas nama siswa/orang tua'
    ],
    linkResmi: 'https://beasiswa.garutkab.go.id',
    kuotaPenerima: '3.500 Siswa & Mahasiswa',
    kontak: 'Sekretariat Beasiswa Disdik Garut: (0262) 233140 / WA 0812-2026-9999',
    highlight: true,
    tags: ['Pemkab Garut', 'Prioritas', 'Bebas SPP', 'Keluarga Garut']
  },
  {
    id: 'kip-kuliah-merdeka-2026',
    nama: 'KIP Kuliah Merdeka (Jalur Garut & Nasional)',
    pemberi: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi',
    kategori: 'Pemerintah Pusat',
    jenjang: ['D3', 'S1'],
    besarBantuan: 'Gratis Uang Kuliah (UKT 100%) + Biaya Hidup Rp 800.000 – Rp 1.400.000 / bulan',
    status: 'Buka',
    periode: 'Tahun Akademik 2026/2027',
    deadline: '2026-09-30',
    deskripsi: 'Jaminan pembiayaan kuliah penuh bagi lulusan SMA/SMK/MA di Garut yang berprestasi namun terkendala ekonomi untuk melanjutkan ke perguruan tinggi negeri maupun swasta.',
    syarat: [
      'Siswa SMA/SMK/MA/sederajat lulusan tahun 2026, 2025, atau 2024',
      'Memiliki Nomor Induk Siswa Nasional (NISN), NPSN, dan NIK yang valid',
      'Lolos seleksi masuk PTN (SNBP, SNBT, Mandiri) atau PTS mitra terakreditasi di Garut/Jabar',
      'Keluarga pemegang KIP / peserta Program Keluarga Harapan (PKH) / Kartu Sembako'
    ],
    dokumen: [
      'Bukti Pendaftaran Akun KIP Kuliah di Portal Kemdikbud',
      'Slip Gaji Orang Tua atau Surat Keterangan Penghasilan dari Desa',
      'Foto Rumah Tampak Depan dan Ruang Keluarga',
      'Ijazah / Surat Keterangan Lulus (SKL)'
    ],
    linkResmi: 'https://kip-kuliah.kemdikbud.go.id',
    kuotaPenerima: '200.000 Mahasiswa Nasional (Garut: ~1.200 Kuota)',
    kontak: 'Helpdesk KIP Kuliah Kemdikbud: 177',
    highlight: true,
    tags: ['Kuliah Gratis', 'Uang Saku Bulanan', 'Nasional', 'Kemdikbud']
  },
  {
    id: 'jfls-jabar-future-leaders-2026',
    nama: 'Jabar Future Leaders Scholarship (JFLS)',
    pemberi: 'Pemerintah Provinsi Jawa Barat',
    kategori: 'Pemerintah Pusat',
    jenjang: ['D3', 'S1', 'S2'],
    besarBantuan: 'Biaya Pendidikan Penuh + Pelatihan Kepemimpinan Muda',
    status: 'Segera',
    periode: 'Pendaftaran Dibuka 1 Oktober 2026',
    deadline: '2026-10-31',
    deskripsi: 'Program bantuan biaya pendidikan tinggi dari Pemprov Jawa Barat bagi pemuda-pemudi ber-KTP Jawa Barat (termasuk Garut) yang memiliki prestasi di bidang akademik, olahraga, seni, dan kepemimpinan sosial.',
    syarat: [
      'Warga Jawa Barat dibuktikan dengan KTP dan KK',
      'Berusia maksimal 25 tahun untuk jenjang D3/S1',
      'Diterima di Perguruan Tinggi mitra JFLS (UNIGA Garut, ITG Garut, ITB, UNPAD, UPI, IPB, dll)',
      'IPK minimal 3.00 (bagi mahasiswa ongoing) atau nilai ijazah rata-rata 80.00 (bagi lulusan baru)'
    ],
    dokumen: [
      'Scan KTP & KK Jawa Barat',
      'Esai motivasi kontribusi pembangunan Jawa Barat',
      'Surat Rekomendasi Tokoh / Kepala Sekolah',
      'Portofolio prestasi atau kepemimpinan'
    ],
    linkResmi: 'https://jfls.jabarprov.go.id',
    kuotaPenerima: '1.500 Mahasiswa se-Jabar',
    kontak: 'Email: jfls.disdik@jabarprov.go.id',
    tags: ['Provinsi Jabar', 'Kepemimpinan', 'Prestasi Akademik']
  },
  {
    id: 'pip-sd-smp-sma-kemdikbud',
    nama: 'Program Indonesia Pintar (PIP) Kemdikbudristek',
    pemberi: 'Pemerintah Republik Indonesia',
    kategori: 'Pemerintah Pusat',
    jenjang: ['SD', 'SMP', 'SMA', 'SMK'],
    besarBantuan: 'SD: Rp 450.000 | SMP: Rp 750.000 | SMA/SMK: Rp 1.800.000 / tahun',
    status: 'Buka',
    periode: 'Penyaluran Termin 2 & 3 Tahun 2026',
    deadline: '2026-08-31',
    deskripsi: 'Bantuan uang tunai untuk perluasan akses dan kesempatan belajar bagi peserta didik yang berasal dari keluarga miskin atau rentan miskin untuk mencegah putus sekolah.',
    syarat: [
      'Peserta didik pemegang Kartu Indonesia Pintar (KIP)',
      'Peserta didik dari keluarga miskin/rentan miskin yang diusulkan oleh Dinas Pendidikan Garut / Pihak Sekolah melalui Dapodik'
    ],
    dokumen: [
      'Buku Tabungan SimPel (Simpanan Pelajar) BRI / BNI / BSI',
      'Surat Keterangan Kepala Sekolah',
      'Fotokopi KTP Orang Tua & KK'
    ],
    linkResmi: 'https://pip.kemdikbud.go.id',
    kuotaPenerima: 'Garut: > 75.000 Siswa Terfasilitasi',
    kontak: 'Pihak Tata Usaha Sekolah Masing-Masing',
    tags: ['Dana Tunai', 'Cegah Putus Sekolah', 'KIP']
  },
  {
    id: 'beasiswa-baznas-garut-mandiri',
    nama: 'Beasiswa Satu Keluarga Satu Sarjana (SKSS) Baznas Garut',
    pemberi: 'Badan Amil Zakat Nasional (BAZNAS) Kabupaten Garut',
    kategori: 'Baznas Garut',
    jenjang: ['S1'],
    besarBantuan: 'SPP Kampus Penuh s/d Lulus + Uang Saku Pembinaan Rp 400.000/bln',
    status: 'Buka',
    periode: 'Tahun 2026',
    deadline: '2026-09-20',
    deskripsi: 'Program pengentasan kemiskinan berbasis pendidikan di Kabupaten Garut, memastikan setidaknya ada 1 sarjana dalam satu keluarga dhuafa/mustahik.',
    syarat: [
      'Berasal dari keluarga mustahik (asnaf fakir/miskin) di Kabupaten Garut',
      'Dalam 1 kartu keluarga belum pernah ada anggota keluarga yang bergelar sarjana (S1)',
      'Hafal Al-Quran minimal 1 Juz (Juz 30 diutamakan) dan bersedia aktif kegiatan dakwah sosial Baznas',
      'Diterima di kampus Garut (UNIGA, ITG, STIE Yasa Anggana, STAIDA, STIKes Karsa Husada, dll)'
    ],
    dokumen: [
      'Surat Rekomendasi UPZ (Unit Pengumpul Zakat) Kecamatan setempat',
      'Surat Keterangan Tidak Mampu dari Desa',
      'Surat Pernyataan Belum Ada Sarjana dalam Keluarga bermaterai'
    ],
    linkResmi: 'https://baznas.garutkab.go.id/beasiswa',
    kuotaPenerima: '100 Mahasiswa Baru Garut',
    kontak: 'Kantor BAZNAS Garut: Jl. Pramuka No. 20 Garut / WA 0821-2000-8811',
    tags: ['Baznas Garut', 'Kuliah Gratis', 'Keluarga Dhuafa', 'Agamis']
  },
  {
    id: 'beasiswa-santri-berprestasi-garut',
    nama: 'Beasiswa Santri Berprestasi Garut (BSBG)',
    pemberi: 'Kemenag Garut & Yayasan Pesantren Garut',
    kategori: 'Khusus Santri',
    jenjang: ['SMP', 'SMA', 'MA', 'S1'],
    besarBantuan: 'Bantuan Kitab, Living Cost Asrama, dan SPP Rp 1.200.000/semester',
    status: 'Segera',
    periode: 'Pendaftaran Dibuka 5 September 2026',
    deadline: '2026-10-10',
    deskripsi: 'Apresiasi bagi santri pondok pesantren di 42 kecamatan Kabupaten Garut yang memiliki hafalan Al-Quran (Tahfidz) atau menguasai Kitab Kuning (Qiraatul Kutub).',
    syarat: [
      'Santri aktif di Pondok Pesantren terdaftar di Kemenag Garut minimal 1 tahun',
      'Hafal minimal 5 Juz Al-Quran atau menguasai dasar Nahwu Shorof & Fathul Qarib',
      'Rekomendasi dari Pimpinan Pondok Pesantren'
    ],
    dokumen: [
      'Syahadah / Piagam Tahfidz dari Pesantren',
      'Surat Pengantar Pimpinan Ponpes',
      'Fotokopi Kartu Santri & KK'
    ],
    linkResmi: 'https://kemenag-garut.go.id/santri',
    kuotaPenerima: '500 Santri Garut',
    kontak: 'Seksi Pendidikan Diniyah & Pontren Kemenag Garut: (0262) 231301',
    tags: ['Santri', 'Tahfidz Quran', 'Kitab Kuning', 'Kemenag']
  },
  {
    id: 'beasiswa-uniga-itg-prestasi',
    nama: 'Beasiswa Kemitraan Kampus Garut (UNIGA & ITG)',
    pemberi: 'Universitas Garut (UNIGA) & Institut Teknologi Garut (ITG)',
    kategori: 'Perguruan Tinggi',
    jenjang: ['S1'],
    besarBantuan: 'Potongan Uang Kuliah 50% - 100% Selama 8 Semester',
    status: 'Buka',
    periode: 'Gelombang III Tahun Akademik 2026',
    deadline: '2026-08-28',
    deskripsi: 'Beasiswa jalur prestasi akademik, kejuaraan olahraga, dan tahfidz bagi putra-putri daerah Garut yang ingin menempuh pendidikan tinggi berkualitas di tanah kelahiran.',
    syarat: [
      'Nilai rata-rata rapor SMA/SMK/MA minimal 82.00 atau peringkat 1-5 di kelas',
      'Atau Juara 1-3 lomba tingkat Kabupaten/Provinsi',
      'Mendaftar di Program Studi Unggulan UNIGA / ITG'
    ],
    dokumen: [
      'Rapor Semester 1-5 terlegalisir',
      'Sertifikat Prestasi / Rekomendasi Sekolah',
      'Formulir Pendaftaran PMB Online'
    ],
    linkResmi: 'https://pmb.uniga.ac.id',
    kuotaPenerima: '250 Mahasiswa',
    kontak: 'PMB UNIGA: 0811-200-1998 | PMB ITG: 0812-2111-9988',
    tags: ['Kampus Garut', 'UNIGA', 'ITG', 'Potongan SPP']
  },
  {
    id: 'bantuan-stimulan-paud-inklusi-garut',
    nama: 'Bantuan Stimulan PAUD & Inklusi Garut Hebat',
    pemberi: 'Dinas Pendidikan Kab. Garut & Bunda PAUD Garut',
    kategori: 'Pemkab Garut',
    jenjang: ['PAUD', 'TK', 'SLB'],
    besarBantuan: 'Rp 600.000 / anak / semester + Perlengkapan Edukatif APE',
    status: 'Buka',
    periode: 'Tahun Ajaran 2026/2027',
    deadline: '2026-09-20',
    deskripsi: 'Program stimulan dari Bunda PAUD Kabupaten Garut untuk anak usia dini dan anak berkebutuhan khusus (inklusi) dari keluarga pra-sejahtera agar mendapatkan layanan pendidikan tumbuh kembang optimal.',
    syarat: [
      'Anak berusia 3 - 6 tahun terdaftar di TK/PAUD/SLB di Kabupaten Garut',
      'Memiliki Kartu Identitas Anak (KIA) & Kartu Keluarga (KK) Garut',
      'Diutamakan dari keluarga penerima PKH/KIP atau terdata di Data Terpadu Kesejahteraan Sosial (DTKS)'
    ],
    dokumen: [
      'Fotokopi Akta Kelahiran & Kartu Keluarga',
      'Surat Keterangan Terdaftar dari Kepala Sekolah TK/PAUD/SLB',
      'Fotokopi Kartu PKH / KIP / Surat Keterangan Tidak Mampu (SKTM)'
    ],
    linkResmi: 'https://disdik.garutkab.go.id/paud-inklusi',
    kuotaPenerima: '2.000 Siswa Usia Dini & Inklusi',
    kontak: 'Bidang PAUD & Dikmas Disdik Garut: (0262) 233140 ext. 104',
    tags: ['PAUD', 'TK', 'SLB Inklusi', 'Bunda PAUD Garut']
  }
];
