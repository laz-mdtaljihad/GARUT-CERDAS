import { ZonasiSubdistrict } from '../types';

export const garutZonasiData: ZonasiSubdistrict[] = [
  // --- WILAYAH GARUT KOTA & TENGAH (14 KECAMATAN) ---
  {
    kecamatan: 'Garut Kota',
    koordinatPusat: { lat: -7.2173, lng: 107.9065 },
    kelurahanDesa: [
      'Pakuwon', 'Kota Kulon', 'Kota Wetan', 'Regol', 'Muara Sanding',
      'Paminggir', 'Sukanegla', 'Cimuncang', 'Margawati', 'Sukamentri', 'Ciwalen'
    ],
    sekolahDalamZona: {
      tk: ['tk-it-alfityan-garut', 'TK Kartika Siliwangi Garut', 'TK Al-Mashduqiah'],
      sd: ['sdn-1-regol', 'sd-yos-sudarso-garut', 'SDN 1 Pakuwon', 'SDN 2 Pakuwon', 'SDN 1 Kota Kulon'],
      smp: ['smpn-1-garut', 'smpn-2-garut', 'smpn-4-garut', 'mtsn-1-garut'],
      sma: ['sman-1-garut', 'sman-3-garut', 'sman-6-garut', 'sman-11-garut', 'man-1-garut', 'SMA PGRI 1 Garut'],
      smk: ['smkn-1-garut', 'smkn-2-garut', 'smkn-4-garut', 'smk-wikrama-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Tarogong Kidul',
    koordinatPusat: { lat: -7.2144, lng: 107.8972 },
    kelurahanDesa: [
      'Jayaraga', 'Pataruman', 'Haurpanggung', 'Sukagalih', 'Tarogong',
      'Jayawaras', 'Sukakarya', 'Kersamenak', 'Cibunar', 'Mekargalih'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-negeri-garut', 'TK Islam Terpadu Robbani', 'TK Al-Hikmah Tarogong'],
      sd: ['sdn-1-jayaraga', 'SDN 1 Haurpanggung', 'SDN 2 Jayaraga', 'SDN 1 Sukagalih'],
      smp: ['smpn-2-garut', 'smpn-1-tarogong-kidul', 'smpn-2-tarogong-kidul', 'mtsn-1-garut'],
      sma: ['sman-1-garut', 'sman-11-garut', 'man-1-garut', 'SMA Muhammadiyah Garut'],
      smk: ['smkn-1-garut', 'smkn-2-garut', 'smkn-3-garut', 'smk-wikrama-garut'],
      slb: ['slbn-garut-kota', 'SLB ABC Tarogong Kidul']
    }
  },
  {
    kecamatan: 'Tarogong Kaler',
    koordinatPusat: { lat: -7.1989, lng: 107.8921 },
    kelurahanDesa: [
      'Rancabango', 'Panjiwangi', 'Jati', 'Pasawahan', 'Cimanganten',
      'Sukajadi', 'Sukawangi', 'Sirnajaya', 'Tanjungkamuning'
    ],
    sekolahDalamZona: {
      tk: ['TK IT Insan Teladan Tarogong', 'TK Terpadu Rancabango', 'tk-pembina-tarogong-kaler'],
      sd: ['sdn-1-rancabango', 'SDN 2 Cimanganten', 'SDN 1 Panjiwangi', 'SDN 1 Pasawahan'],
      smp: ['smpn-1-tarogong-kaler', 'SMPN 2 Tarogong Kaler', 'smpn-1-garut'],
      sma: ['sman-11-garut', 'MA Persis Tarogong', 'sman-1-garut'],
      smk: ['smk-wikrama-garut', 'smkn-2-garut', 'smkn-1-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Karangpawitan',
    koordinatPusat: { lat: -7.2112, lng: 107.9254 },
    kelurahanDesa: [
      'Suci', 'Suci Kaler', 'Karangmulya', 'Lebakjaya', 'Sindangpalay',
      'Sindanglaya', 'Cimurah', 'Situsari', 'Godog', 'Mekarsari'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-karangpawitan', 'TK Al-Khoeriyah Suci'],
      sd: ['sdn-1-suci', 'SDN 2 Karangpawitan', 'SDN 1 Godog', 'SDN 1 Cimurah'],
      smp: ['smpn-1-karangpawitan', 'SMPN 2 Karangpawitan', 'smpn-1-garut'],
      sma: ['sman-4-garut', 'sman-15-garut', 'man-1-garut', 'sman-1-garut'],
      smk: ['smkn-1-garut', 'smkn-2-garut', 'SMK Al-Hikmah Karangpawitan'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Wanaraja',
    koordinatPusat: { lat: -7.1895, lng: 107.9782 },
    kelurahanDesa: [
      'Wanaraja', 'Wanasari', 'Wanamekar', 'Sindangprabu', 'Sindangratu',
      'Sindangmekar', 'Cinunuk', 'Sukamenak', 'Sindangsari'
    ],
    sekolahDalamZona: {
      tk: ['tk-asy-syifa-wanaraja', 'TK Al-Muhajirin Wanaraja'],
      sd: ['min-1-garut-wanaraja', 'sdn-1-wanaraja', 'SDN 2 Wanasari'],
      smp: ['smpn-1-wanaraja', 'SMPN 2 Wanaraja', 'MTs Maarif Wanaraja'],
      sma: ['sman-13-garut', 'MA Darul Arqam', 'sman-1-garut'],
      smk: ['smk-maarif-wanaraja', 'smkn-1-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Pangatikan',
    koordinatPusat: { lat: -7.1724, lng: 107.9942 },
    kelurahanDesa: [
      'Cihuni', 'Babakan Loa', 'Cimaragas', 'Citangtu', 'Karangsari',
      'Sukahurip', 'Sukamentri', 'Sukaranji'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-pangatikan', 'TK Melati Cihuni'],
      sd: ['sdn-1-cihuni', 'SDN 2 Babakan Loa', 'SDN 1 Cimaragas'],
      smp: ['smpn-1-pangatikan', 'SMPN 2 Pangatikan', 'MTs Pangatikan'],
      sma: ['sman-42-garut', 'MA Pangatikan', 'sman-13-garut'],
      smk: ['smk-pangatikan-terpadu', 'smkn-1-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Sucinaraja',
    koordinatPusat: { lat: -7.1712, lng: 107.9612 },
    kelurahanDesa: [
      'Tegalpanjang', 'Cigadog', 'Sadang', 'Sukaluyu', 'Sukamaju', 'Tenggerraharja'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-sucinaraja', 'TK Harapan Bangsa Sucinaraja'],
      sd: ['sdn-1-tegalpanjang', 'SDN 2 Cigadog', 'SDN 1 Sadang'],
      smp: ['smpn-1-sucinaraja', 'MTs Sucinaraja'],
      sma: ['sman-41-garut', 'sman-13-garut'],
      smk: ['smk-sucinaraja-vokasi', 'smkn-1-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Samarang',
    koordinatPusat: { lat: -7.2412, lng: 107.8541 },
    kelurahanDesa: [
      'Samarang', 'Cintarakyat', 'Cintarasa', 'Cintaasih', 'Tanjung Anom',
      'Sukakarya', 'Sirnasari', 'Cisarua', 'Karyasari'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-samarang', 'TK Al-Kautsar Samarang'],
      sd: ['sdn-1-samarang', 'SDN 2 Cintarakyat', 'SDN 1 Tanjung Anom'],
      smp: ['smpn-1-samarang', 'SMPN 2 Samarang', 'MTs Al-Falah Samarang'],
      sma: ['sman-7-garut', 'sman-1-garut'],
      smk: ['smk-samarang-vokasi', 'smkn-1-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Pasirwangi',
    koordinatPusat: { lat: -7.2584, lng: 107.8124 },
    kelurahanDesa: [
      'Pasirwangi', 'Padaawas', 'Padamukti', 'Padamulya', 'Padasuka',
      'Pasirkiamis', 'Sarimukti', 'Sirnajaya', 'Talaga', 'Karyamekar'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-pasirwangi', 'TK Bintang Geotermal'],
      sd: ['sdn-1-pasirwangi', 'SDN 2 Padaawas', 'SDN 1 Padamukti'],
      smp: ['smpn-1-pasirwangi', 'SMPN 2 Pasirwangi', 'MTs Pasirwangi'],
      sma: ['sman-35-garut', 'sman-7-garut'],
      smk: ['smk-pasirwangi-energi', 'smkn-2-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Bayongbong',
    koordinatPusat: { lat: -7.2842, lng: 107.8682 },
    kelurahanDesa: [
      'Bayongbong', 'Banjarsari', 'Ciburuy', 'Ciela', 'Cikedokan',
      'Hegarmanah', 'Karyajaya', 'Mulyasari', 'Panembong', 'Salakuray', 'Sukamukti', 'Sukasenang'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-bayongbong', 'TK Ciburuy Ceria'],
      sd: ['sdn-1-bayongbong', 'SDN 2 Banjarsari', 'SDN 1 Ciburuy'],
      smp: ['smpn-1-bayongbong', 'SMPN 2 Bayongbong', 'MTsN 2 Garut Bayongbong'],
      sma: ['sman-27-garut', 'MA Darul Mukminin Bayongbong', 'sman-1-garut'],
      smk: ['smk-bayongbong-mandiri', 'smkn-1-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Cigedug',
    koordinatPusat: { lat: -7.3124, lng: 107.8421 },
    kelurahanDesa: [
      'Cigedug', 'Barusuda', 'Sindangsari', 'Sukahurip', 'Sukamaju'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-cigedug', 'TK Tunas Harapan Cigedug'],
      sd: ['sdn-1-cigedug', 'SDN 2 Barusuda', 'SDN 1 Sukahurip'],
      smp: ['smpn-1-cigedug', 'SMPN 2 Cigedug', 'MTs Cigedug'],
      sma: ['sman-37-garut', 'sman-27-garut'],
      smk: ['smk-cigedug-agri', 'smkn-1-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Cilawu',
    koordinatPusat: { lat: -7.2654, lng: 107.9341 },
    kelurahanDesa: [
      'Ngamplangsari', 'Cilawu', 'Pasanggrahan', 'Mekarmukti', 'Sukamaju',
      'Dangiang', 'Karyamekar', 'Desakolot', 'Margalaksana', 'Sukasirna'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-cilawu', 'TK Mekar Sari Cilawu'],
      sd: ['sdn-1-cilawu', 'SDN 2 Ngamplangsari', 'SDN 1 Pasanggrahan'],
      smp: ['smpn-1-cilawu', 'SMPN 2 Cilawu', 'smpn-2-garut'],
      sma: ['sman-8-garut', 'MA Cilawu', 'sman-1-garut'],
      smk: ['smkn-10-garut', 'smkn-1-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Cisurupan',
    koordinatPusat: { lat: -7.3182, lng: 107.8012 },
    kelurahanDesa: [
      'Karamatwangi', 'Balewangi', 'Cidatar', 'Cipaganti', 'Cisero', 'Cisurupan',
      'Pakatang', 'Pamulihan', 'Simpangsari', 'Sirnagalih', 'Sukawargi', 'Tambakbaya',
      'Situsari', 'Sirnajaya'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-cisurupan', 'TK Papandayan Asri', 'PAUD Terpadu Karamatwangi'],
      sd: [
        'sdn-3-karamatwangi',
        'sdn-1-karamatwangi',
        'sdn-2-karamatwangi',
        'sdn-1-balewangi',
        'sdn-2-balewangi',
        'sdn-1-cidatar',
        'sdn-1-cisero',
        'sdn-1-cisurupan'
      ],
      smp: ['smpn-1-cisurupan', 'smpn-2-cisurupan', 'SMPN 3 Cisurupan', 'MTs Al-Falah Cisurupan'],
      sma: ['sman-16-garut', 'MA Plus Al-Huda Cisurupan', 'sman-1-garut'],
      smk: ['smkn-1-garut', 'smk-plus-sukawargi-cisurupan', 'smk-vokasi-cisurupan'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Sukaresmi',
    koordinatPusat: { lat: -7.2894, lng: 107.7812 },
    kelurahanDesa: [
      'Cintadamai', 'Padamukti', 'Sukalilah', 'Sukamulya', 'Sukaresmi', 'Sukasari', 'Cintanagara'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-sukaresmi', 'TK Tunas Harapan Sukaresmi'],
      sd: ['sdn-1-sukaresmi', 'SDN 2 Cintadamai', 'SDN 1 Sukamulya'],
      smp: ['smpn-1-sukaresmi', 'SMPN 2 Sukaresmi', 'MTs Sukaresmi'],
      sma: ['sman-36-garut', 'sman-16-garut'],
      smk: ['smk-sukaresmi-kreatif', 'smkn-1-garut'],
      slb: ['slbn-garut-kota']
    }
  },

  // --- WILAYAH GARUT UTARA (12 KECAMATAN) ---
  {
    kecamatan: 'Leles',
    koordinatPusat: { lat: -7.1082, lng: 107.8995 },
    kelurahanDesa: [
      'Leles', 'Cangkuang', 'Salamnunggal', 'Haruman', 'Jangkurang',
      'Lembang', 'Mandalasari', 'Margaluyu', 'Dano', 'Sukarame'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-leles', 'TK Al-Falah Cangkuang'],
      sd: ['sdn-1-leles', 'SDN 2 Cangkuang', 'SDN 1 Salamnunggal'],
      smp: ['smpn-1-leles', 'SMPN 2 Leles', 'MTs Al-Falah Leles'],
      sma: ['sman-2-garut', 'MA Al-Falah Leles', 'sman-1-garut'],
      smk: ['smk-santana-1-cibatu', 'smkn-8-garut', 'smkn-1-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Kadungora',
    koordinatPusat: { lat: -7.0872, lng: 107.8864 },
    kelurahanDesa: [
      'Kadungora', 'Karangmulya', 'Karangtengah', 'Mandalahegar', 'Mekarbakti',
      'Rancasalak', 'Talagasari', 'Tangglok', 'Cikembulan', 'Hegarmanah'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-kadungora', 'TK Tunas Harapan Kadungora'],
      sd: ['sdn-1-kadungora', 'SDN 2 Karangmulya', 'SDN 1 Cikembulan'],
      smp: ['smpn-1-kadungora', 'SMPN 2 Kadungora', 'MTs Al-Muawanah Kadungora'],
      sma: ['sman-17-garut', 'sman-2-garut', 'sman-1-garut'],
      smk: ['smkn-8-garut', 'smkn-2-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Banyuresmi',
    koordinatPusat: { lat: -7.1643, lng: 107.9281 },
    kelurahanDesa: [
      'Bagendit', 'Banyuresmi', 'Binakarya', 'Cimareme', 'Cipicung',
      'Dangdeur', 'Karyamukti', 'Karyasari', 'Pamekarsari', 'Sukakarya', 'Sukaratu', 'Sukasenang'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-banyuresmi', 'TK Bagendit Ceria'],
      sd: ['sdn-1-bagendit', 'SDN 2 Banyuresmi', 'SDN 1 Binakarya'],
      smp: ['smpn-1-banyuresmi', 'SMPN 2 Banyuresmi', 'MTs Bagendit'],
      sma: ['sman-1-banyuresmi', 'sman-1-garut'],
      smk: ['smkn-1-garut', 'smk-banyuresmi-tenun'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Cibatu',
    koordinatPusat: { lat: -7.1054, lng: 107.9892 },
    kelurahanDesa: [
      'Cibatu', 'Cibunar', 'Girijaya', 'Karyamukti', 'Keresek',
      'Padasuka', 'Sindangsari', 'Sukalilah', 'Wanakerta'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-cibatu', 'TK Kereta Ceria Cibatu'],
      sd: ['sdn-1-cibatu', 'SDN 2 Keresek', 'SDN 1 Padasuka'],
      smp: ['smpn-1-cibatu', 'SMPN 2 Cibatu', 'MTs Cibatu'],
      sma: ['sman-19-garut', 'MA Cibatu', 'sman-2-garut'],
      smk: ['smk-santana-1-cibatu', 'smkn-1-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Balubur Limbangan',
    koordinatPusat: { lat: -7.0284, lng: 107.9754 },
    kelurahanDesa: [
      'Limbangan Barat', 'Limbangan Tengah', 'Limbangan Timur', 'Ciwareng', 'Galihpakuwon',
      'Neglasari', 'Pangeureunan', 'Pasirwaru', 'Simpen Kaler', 'Simpen Kidul', 'Surabaya', 'Dunguswiru'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-limbangan', 'TK Sunan Cipancar Limbangan'],
      sd: ['sdn-1-limbangan-tengah', 'SDN 2 Limbangan Barat', 'SDN 1 Galihpakuwon'],
      smp: ['smpn-1-limbangan', 'SMPN 2 Limbangan', 'MTs Al-Jawami Limbangan'],
      sma: ['sman-31-garut', 'MA Sunan Cipancar Limbangan', 'sman-2-garut'],
      smk: ['smkn-6-garut', 'smk-limbangan-terpadu'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Malangbong',
    koordinatPusat: { lat: -7.0582, lng: 108.0892 },
    kelurahanDesa: [
      'Malangbong', 'Baru Dua', 'Bunisari', 'Campaka', 'Cibunar', 'Cikarag',
      'Cilampuyang', 'Cinagara', 'Cisitu', 'Citeras', 'Girimukti', 'Karangmulya',
      'Kutanagara', 'Mekar Asri', 'Mekarmulya', 'Sakawayana', 'Sandala', 'Sekarwangi', 'Sukajaya', 'Sukamanah'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-malangbong', 'TK Permata Bunda Malangbong'],
      sd: ['sdn-1-malangbong', 'SDN 2 Bunisari', 'SDN 1 Campaka'],
      smp: ['smpn-1-malangbong', 'SMPN 2 Malangbong', 'MTs Al-Maarif Malangbong'],
      sma: ['sman-14-garut', 'MA Malangbong', 'sman-1-garut'],
      smk: ['smk-malangbong-vokasi', 'smkn-1-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Kersamanah',
    koordinatPusat: { lat: -7.0812, lng: 108.0142 },
    kelurahanDesa: [
      'Kersamanah', 'Girijaya', 'Mekarraya', 'Nanjungjaya', 'Sukamerang'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-kersamanah', 'TK Tunas Kersamanah'],
      sd: ['sdn-1-kersamanah', 'SDN 2 Sukamerang', 'SDN 1 Girijaya'],
      smp: ['smpn-1-kersamanah', 'SMPN 2 Kersamanah', 'MTs Kersamanah'],
      sma: ['sman-33-garut', 'sman-19-garut'],
      smk: ['smk-kersamanah-mandiri', 'smkn-1-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Leuwigoong',
    koordinatPusat: { lat: -7.0984, lng: 107.9412 },
    kelurahanDesa: [
      'Leuwigoong', 'Dungusiku', 'Karangsari', 'Karanganyar', 'Margacinta', 'Sindangsari', 'Tambaksari', 'Margahayu'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-leuwigoong', 'TK Bintang Kecil Leuwigoong'],
      sd: ['sdn-1-leuwigoong', 'SDN 2 Dungusiku', 'SDN 1 Margacinta'],
      smp: ['smpn-1-leuwigoong', 'SMPN 2 Leuwigoong', 'MTs Leuwigoong'],
      sma: ['sman-10-garut', 'sman-2-garut'],
      smk: ['smk-leuwigoong-terpadu', 'smkn-8-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Selaawi',
    koordinatPusat: { lat: -7.0392, lng: 108.0212 },
    kelurahanDesa: [
      'Cigawir', 'Cirapuhan', 'Mekarsari', 'Pelitaasih', 'Putrajawa', 'Samida', 'Selaawi'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-selaawi', 'TK Bambu Kreatif Selaawi'],
      sd: ['sdn-1-selaawi', 'SDN 2 Cigawir', 'SDN 1 Cirapuhan'],
      smp: ['smpn-1-selaawi', 'SMPN 2 Selaawi', 'MTs Selaawi'],
      sma: ['sman-26-garut', 'sman-31-garut'],
      smk: ['smk-selaawi-kriya-bambu', 'smkn-6-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Cibiuk',
    koordinatPusat: { lat: -7.0721, lng: 107.9452 },
    kelurahanDesa: [
      'Cibiuk Kaler', 'Cibiuk Kidul', 'Cipareuan', 'Lingkungpasir', 'Majasari'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-cibiuk', 'TK Harapan Bangsa Cibiuk'],
      sd: ['sdn-1-cibiuk-kaler', 'SDN 2 Cibiuk Kidul', 'SDN 1 Cipareuan'],
      smp: ['smpn-1-cibiuk', 'SMPN 2 Cibiuk', 'MTs Cibiuk'],
      sma: ['sman-32-garut', 'sman-2-garut'],
      smk: ['smk-cibiuk-vokasi', 'smkn-8-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Karangtengah',
    koordinatPusat: { lat: -7.1784, lng: 108.0345 },
    kelurahanDesa: [
      'Caringin', 'Cintamanik', 'Sindanggalih', 'Sukasenang'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-karangtengah', 'TK Tunas Harapan Karangtengah'],
      sd: ['sdn-1-karangtengah', 'SDN 2 Cintamanik', 'SDN 1 Sindanggalih'],
      smp: ['smpn-1-karangtengah', 'SMPN 2 Karangtengah', 'MTs Karangtengah'],
      sma: ['sman-18-garut', 'sman-13-garut'],
      smk: ['smk-karangtengah-vokasi', 'smkn-1-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Sukawening',
    koordinatPusat: { lat: -7.1512, lng: 108.0123 },
    kelurahanDesa: [
      'Maripari', 'Mekarluyu', 'Mekarwangi', 'Pasanggrahan', 'Sudalarang',
      'Sukaluyu', 'Sukamukti', 'Sukasono', 'Sukawening', 'Sukamaju'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-sukawening', 'TK Mekar Wangi Sukawening'],
      sd: ['sdn-1-sukawening', 'SDN 2 Maripari', 'SDN 1 Sukamukti'],
      smp: ['smpn-1-sukawening', 'SMPN 2 Sukawening', 'MTs Sukawening'],
      sma: ['sman-34-garut', 'sman-13-garut'],
      smk: ['smk-sukawening-mandiri', 'smkn-1-garut'],
      slb: ['slbn-garut-kota']
    }
  },

  // --- WILAYAH GARUT SELATAN (16 KECAMATAN) ---
  {
    kecamatan: 'Cikajang',
    koordinatPusat: { lat: -7.3382, lng: 107.7885 },
    kelurahanDesa: [
      'Cikajang', 'Padasuka', 'Girijaya', 'Cibodas', 'Cikandang',
      'Mekarsari', 'Simpang', 'Mekarjaya', 'Margamulya', 'Cipangramatan'
    ],
    sekolahDalamZona: {
      tk: ['paud-kasih-bunda-cikajang', 'TK Aisyiyah Cikajang', 'tk-pembina-cikajang'],
      sd: ['sdn-1-cikajang', 'SDN 2 Padasuka', 'SDN 1 Girijaya', 'MI Cikajang'],
      smp: ['smpn-1-cikajang', 'SMPN 2 Cikajang', 'MTs Persis Cikajang'],
      sma: ['sman-16-garut', 'MA Maarif Cikajang', 'sman-1-garut'],
      smk: ['smk-cikajang-utama', 'smkn-1-garut', 'smkn-2-garut'],
      slb: ['slb-maarif-cikajang', 'slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Pameungpeuk',
    koordinatPusat: { lat: -7.6514, lng: 107.7342 },
    kelurahanDesa: [
      'Pameungpeuk', 'Mancagahar', 'Paas', 'Jatimulya', 'Mandalakasih',
      'Sirnabakti', 'Bojong', 'Bojong Kidul'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-pameungpeuk', 'TK Bahari Pameungpeuk'],
      sd: ['sdn-1-pameungpeuk', 'SDN 2 Mancagahar', 'SDN 1 Paas'],
      smp: ['smpn-1-pameungpeuk', 'SMPN 2 Pameungpeuk', 'MTsN Pameungpeuk'],
      sma: ['sman-20-garut', 'MA Al-Hidayah Pameungpeuk'],
      smk: ['smkn-5-garut', 'smk-bahari-selatan'],
      slb: ['slb-harapan-bahari-pameungpeuk']
    }
  },
  {
    kecamatan: 'Bungbulang',
    koordinatPusat: { lat: -7.4812, lng: 107.5912 },
    kelurahanDesa: [
      'Bungbulang', 'Bojong', 'Cihikeu', 'Gunung Jampang', 'Hanjuang',
      'Hegarmanah', 'Mekarwangi', 'Sinarjaya', 'Tegallega'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-bungbulang', 'TK Terpadu Sinarjaya'],
      sd: ['sdn-1-bungbulang', 'SDN 2 Bojong', 'SDN 1 Cihikeu'],
      smp: ['smpn-1-bungbulang', 'SMPN 2 Bungbulang', 'MTs Bungbulang'],
      sma: ['sman-9-garut', 'MA Al-Muslih Bungbulang'],
      smk: ['smkn-7-garut', 'smkn-1-garut'],
      slb: ['slb-inklusi-bungbulang']
    }
  },
  {
    kecamatan: 'Cisompet',
    koordinatPusat: { lat: -7.5312, lng: 107.8124 },
    kelurahanDesa: [
      'Cisompet', 'Cihaurkuning', 'Cikondang', 'Depok', 'Jatisari',
      'Margamulya', 'Neglasari', 'Panyindangan', 'Sindangsari', 'Sukamukti', 'Sukanagara'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-cisompet', 'TK Tunas Cisompet'],
      sd: ['sdn-1-cisompet', 'SDN 2 Cihaurkuning', 'SDN 1 Depok'],
      smp: ['smpn-1-cisompet', 'SMPN 2 Cisompet', 'MTs Cisompet'],
      sma: ['sman-29-garut', 'MA Cisompet'],
      smk: ['smk-cisompet-perkebunan', 'smkn-5-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Cibalong',
    koordinatPusat: { lat: -7.6712, lng: 107.8212 },
    kelurahanDesa: [
      'Cibalong', 'Cigaronggong', 'Karyamukti', 'Karyasari', 'Maroko',
      'Mekarmukti', 'Mekarsari', 'Najaten', 'Simpang', 'Sancang', 'Karyasari'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-cibalong', 'TK Sancang Asri'],
      sd: ['sdn-1-cibalong', 'SDN 2 Sancang', 'SDN 1 Maroko'],
      smp: ['smpn-1-cibalong', 'SMPN 2 Cibalong', 'MTs Cibalong'],
      sma: ['sman-24-garut', 'MA Cibalong'],
      smk: ['smk-cibalong-maritim', 'smkn-5-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Cikelet',
    koordinatPusat: { lat: -7.6412, lng: 107.6812 },
    kelurahanDesa: [
      'Cigadog', 'Cijambe', 'Cikelet', 'Cipangramatan', 'Girimukti',
      'Karangsari', 'Kertamukti', 'Linggamanik', 'Pamalayan', 'Tipar'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-cikelet', 'TK Santolo Bahari'],
      sd: ['sdn-1-cikelet', 'SDN 2 Pamalayan', 'SDN 1 Cigadog'],
      smp: ['smpn-1-cikelet', 'SMPN 2 Cikelet', 'MTs Cikelet'],
      sma: ['sman-25-garut', 'MA Cikelet'],
      smk: ['smk-cikelet-kelautan', 'smkn-5-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Caringin',
    koordinatPusat: { lat: -7.5412, lng: 107.4812 },
    kelurahanDesa: [
      'Caringin', 'Cimahi', 'Indralayang', 'Purbayani', 'Samuderajaya', 'Sukajadi'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-caringin', 'TK Rancabuaya Ceria'],
      sd: ['sdn-1-caringin', 'SDN 2 Purbayani', 'SDN 1 Indralayang'],
      smp: ['smpn-1-caringin', 'SMPN 2 Caringin', 'MTs Caringin'],
      sma: ['sman-22-garut', 'MA Caringin'],
      smk: ['smk-caringin-bahari', 'smkn-7-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Mekarmukti',
    koordinatPusat: { lat: -7.5712, lng: 107.5512 },
    kelurahanDesa: [
      'Cijayana', 'Karangwangi', 'Mekarmukti', 'Mekarsari', 'Jagabaya'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-mekarmukti', 'TK Cicalobak Indah'],
      sd: ['sdn-1-mekarmukti', 'SDN 2 Cijayana', 'SDN 1 Karangwangi'],
      smp: ['smpn-1-mekarmukti', 'SMPN 2 Mekarmukti', 'MTs Mekarmukti'],
      sma: ['sman-40-garut', 'sman-9-garut'],
      smk: ['smk-mekarmukti-pesisir', 'smkn-7-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Pakenjeng',
    koordinatPusat: { lat: -7.4582, lng: 107.6712 },
    kelurahanDesa: [
      'Depok', 'Jatiwangi', 'Jayamekar', 'Kadongdong', 'Karangsari',
      'Pasirlangu', 'Sukamulya', 'Tanjungjaya', 'Tanjungsari', 'Tegalgede', 'Wangunjaya'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-pakenjeng', 'TK Tunas Harapan Pakenjeng'],
      sd: ['sdn-1-pakenjeng', 'SDN 2 Depok', 'SDN 1 Tanjungjaya'],
      smp: ['smpn-1-pakenjeng', 'SMPN 2 Pakenjeng', 'MTs Pakenjeng'],
      sma: ['sman-5-garut', 'MA Pakenjeng'],
      smk: ['smkn-11-garut', 'smkn-7-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Pamulihan',
    koordinatPusat: { lat: -7.4212, lng: 107.6124 },
    kelurahanDesa: [
      'Garumukti', 'Linggarjati', 'Pakenjeng', 'Panawa', 'Pananjung'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-pamulihan', 'TK Rimba Asri Pamulihan'],
      sd: ['sdn-1-pamulihan', 'SDN 2 Garumukti', 'SDN 1 Linggarjati'],
      smp: ['smpn-1-pamulihan', 'SMPN 2 Pamulihan', 'MTs Pamulihan'],
      sma: ['sman-30-garut', 'sman-9-garut'],
      smk: ['smk-pamulihan-kehutanan', 'smkn-7-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Cisewu',
    koordinatPusat: { lat: -7.3912, lng: 107.5112 },
    kelurahanDesa: [
      'Cisewu', 'Cikarang', 'Girijaya', 'Karangsewu', 'Mekarsewu',
      'Nyalindung', 'Panggalih', 'Pamalayan', 'Sukajaya'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-cisewu', 'TK Pertiwi Cisewu'],
      sd: ['sdn-1-cisewu', 'SDN 2 Cikarang', 'SDN 1 Nyalindung'],
      smp: ['smpn-1-cisewu', 'SMPN 2 Cisewu', 'MTs Cisewu'],
      sma: ['sman-12-garut', 'MA Cisewu'],
      smk: ['smkn-12-garut', 'smkn-7-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Talegong',
    koordinatPusat: { lat: -7.3212, lng: 107.5312 },
    kelurahanDesa: [
      'Mekarmulya', 'Mekarsari', 'Mekarwangi', 'Selaawi', 'Sukalaksana', 'Sukamaju', 'Sukamulya'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-talegong', 'TK Puncak Lestari Talegong'],
      sd: ['sdn-1-talegong', 'SDN 2 Mekarmulya', 'SDN 1 Sukalaksana'],
      smp: ['smpn-1-talegong', 'SMPN 2 Talegong', 'MTs Talegong'],
      sma: ['sman-23-garut', 'sman-12-garut'],
      smk: ['smk-talegong-vokasi', 'smkn-7-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Singajaya',
    koordinatPusat: { lat: -7.4382, lng: 107.8812 },
    kelurahanDesa: [
      'Singajaya', 'Ciudian', 'Girijaya', 'Karangagung', 'Pancawangi',
      'Sukajaya', 'Sukaluyu', 'Sukamulya', 'Mekartani'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-singajaya', 'TK Harapan Singajaya'],
      sd: ['sdn-1-singajaya', 'SDN 2 Ciudian', 'SDN 1 Pancawangi'],
      smp: ['smpn-1-singajaya', 'SMPN 2 Singajaya', 'MTs Singajaya'],
      sma: ['sman-21-garut', 'MA Singajaya'],
      smk: ['smk-singajaya-mandiri', 'smkn-5-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Banjarwangi',
    koordinatPusat: { lat: -7.3942, lng: 107.8412 },
    kelurahanDesa: [
      'Banjarwangi', 'Bojong', 'Dangiang', 'Jayabakti', 'Kadongdong',
      'Mulyajaya', 'Padahurip', 'Talagasari', 'Talagajaya', 'Tanjungjaya', 'Wangunjaya'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-banjarwangi', 'TK Tunas Banjarwangi'],
      sd: ['sdn-1-banjarwangi', 'SDN 2 Bojong', 'SDN 1 Dangiang'],
      smp: ['smpn-1-banjarwangi', 'SMPN 2 Banjarwangi', 'MTs Banjarwangi'],
      sma: ['sman-38-garut', 'sman-16-garut'],
      smk: ['smk-banjarwangi-agrobisnis', 'smkn-1-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Peundeuy',
    koordinatPusat: { lat: -7.4812, lng: 107.9124 },
    kelurahanDesa: [
      'Peundeuy', 'Maroko', 'Pangrumasan', 'Purwajaya', 'Saribakti', 'Sukamulya'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-peundeuy', 'TK Mekar Peundeuy'],
      sd: ['sdn-1-peundeuy', 'SDN 2 Saribakti', 'SDN 1 Purwajaya'],
      smp: ['smpn-1-peundeuy', 'SMPN 2 Peundeuy', 'MTs Peundeuy'],
      sma: ['sman-39-garut', 'sman-21-garut'],
      smk: ['smk-peundeuy-vokasi', 'smkn-5-garut'],
      slb: ['slbn-garut-kota']
    }
  },
  {
    kecamatan: 'Cihurip',
    koordinatPusat: { lat: -7.4212, lng: 107.7912 },
    kelurahanDesa: [
      'Cihurip', 'Cisangkal', 'Jayamukti', 'Mekarmukti'
    ],
    sekolahDalamZona: {
      tk: ['tk-pembina-cihurip', 'TK Curug Nyogong Asri'],
      sd: ['sdn-1-cihurip', 'SDN 2 Cisangkal', 'SDN 1 Jayamukti'],
      smp: ['smpn-1-cihurip', 'SMPN 2 Cihurip', 'MTs Cihurip'],
      sma: ['sman-28-garut', 'sman-16-garut'],
      smk: ['smk-cihurip-wisata', 'smkn-5-garut'],
      slb: ['slbn-garut-kota']
    }
  }
];

export const garutPPDBRules = {
  jalur: [
    { nama: 'Zonasi Tempat Tinggal', kuotaMin: '50%', deskripsi: 'Berdasarkan radius jarak domisili KK ke sekolah tujuan utama' },
    { nama: 'Prestasi Akademik / Non-Akademik', kuotaMin: '25%', deskripsi: 'Nilai rapor semester 1-5 dan sertifikat kejuaraan resmi (OSN, FLS2N, O2SN, Tahfidz)' },
    { nama: 'Afirmasi KETM & Disabilitas', kuotaMin: '15%', deskripsi: 'Khusus pemegang KIP, PKH, DTKS, serta penyandang disabilitas inklusi' },
    { nama: 'Perpindahan Tugas Orang Tua', kuotaMin: '10%', deskripsi: 'Surat penugasan instansi/BUMN/TNI/Polri dan anak kandung guru/tenaga pendidik' }
  ],
  tahapPPDB: [
    {
      tahap: 'Tahap 1: Jalur Afirmasi, Prestasi & Mutasi Orang Tua',
      pendaftaran: '10 - 16 Juni 2026',
      verifikasi: '17 - 19 Juni 2026',
      pengumuman: '21 Juni 2026',
      daftarUlang: '22 - 24 Juni 2026',
      status: 'Selesai'
    },
    {
      tahap: 'Tahap 2: Jalur Zonasi Domisili Murni',
      pendaftaran: '24 - 30 Juni 2026',
      verifikasi: '01 - 03 Juli 2026',
      pengumuman: '05 Juli 2026',
      daftarUlang: '07 - 11 Juli 2026',
      status: 'Berlangsung'
    }
  ],
  jadwalTahapan: [
    { tahap: 'Tahap 1 (Afirmasi, Prestasi & Mutasi)', tanggal: '10 - 16 Juni 2026', status: 'Selesai' },
    { tahap: 'Pengumuman Tahap 1', tanggal: '21 Juni 2026', status: 'Selesai' },
    { tahap: 'Tahap 2 (Zonasi Domisili Murni)', tanggal: '24 - 30 Juni 2026', status: 'Berlangsung' },
    { tahap: 'Pengumuman Resmi Tahap 2', tanggal: '05 Juli 2026', status: 'Akan Datang' },
    { tahap: 'Daftar Ulang Siswa Baru', tanggal: '07 - 11 Juli 2026', status: 'Akan Datang' },
    { tahap: 'Masa Pengenalan Lingkungan Sekolah (MPLS)', tanggal: '15 Juli 2026', status: 'Akan Datang' }
  ],
  dokumenWajib: [
    {
      nama: 'Akta Kelahiran / Surat Keterangan Lahir',
      wajib: true,
      deskripsi: 'Asli dan fotokopi legalisir yang dikeluarkan Dinas Kependudukan dan Pencatatan Sipil'
    },
    {
      nama: 'Kartu Keluarga (KK) Kabupaten Garut',
      wajib: true,
      deskripsi: 'Diterbitkan minimal 1 (satu) tahun sebelum tanggal pendaftaran PPDB'
    },
    {
      nama: 'KTP Asli Kedua Orang Tua / Wali',
      wajib: true,
      deskripsi: 'KTP elektronik asli dan fotokopi orang tua atau wali yang sah'
    },
    {
      nama: 'Buku Rapor & Surat Keterangan Lulus (SKL)',
      wajib: true,
      deskripsi: 'Rapor semester 1 s.d 5 dan SKL resmi bertanda tangan Kepala Sekolah'
    },
    {
      nama: 'Surat Pernyataan Tanggung Jawab Mutlak (SPTJM)',
      wajib: true,
      deskripsi: 'Format resmi bermaterai Rp 10.000 ditandatangani orang tua/wali'
    },
    {
      nama: 'Kartu KIP / PKH / KKS (Jalur Afirmasi)',
      wajib: false,
      deskripsi: 'Khusus calon peserta didik dari keluarga pra-sejahtera atau DTKS Kemensos'
    },
    {
      nama: 'Sertifikat / Piagam Kejuaraan (Jalur Prestasi)',
      wajib: false,
      deskripsi: 'Minimal tingkat Kabupaten Garut yang disahkan instansi berwenang (Disdik/Kemenag/KONI)'
    },
    {
      nama: 'Surat Pindah Tugas Orang Tua (Jalur Perpindahan)',
      wajib: false,
      deskripsi: 'Diterbitkan instansi/kantor/perusahaan paling lama 1 tahun sebelum pendaftaran'
    }
  ],
  syaratDokumenUmum: [
    'Ijazah / Surat Keterangan Lulus (SKL) Asli & Legalisir',
    'Akta Kelahiran Asli & Fotokopi',
    'Kartu Keluarga (KK) yang diterbitkan Disdukcapil Garut minimal 1 tahun',
    'KTP Asli Orang Tua / Wali',
    'Buku Rapor Asli semester 1 s.d. 5',
    'Surat Tanggung Jawab Mutlak (SPTJM) Orang Tua bermaterai Rp 10.000'
  ]
};
