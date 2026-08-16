import { ModulAjar } from '../types';

export const exportModulAjarToDoc = (modul: ModulAjar) => {
  const fileName = `Modul_Ajar_${modul.mataPelajaran.replace(/\s+/g, '_')}_${modul.kelas.replace(/\s+/g, '_')}_Garut.doc`;

  const htmlContent = `
    <!DOCTYPE html>
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>${modul.judul}</title>
      <style>
        body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.5; color: #111827; }
        .kop-surat { text-align: center; border-bottom: 3px double #000; padding-bottom: 8px; margin-bottom: 16px; }
        .kop-surat h2 { font-size: 14pt; margin: 0; text-transform: uppercase; color: #047857; }
        .kop-surat h3 { font-size: 12pt; margin: 2px 0; }
        .kop-surat p { font-size: 9pt; margin: 0; color: #4b5563; }
        .judul-dokumen { text-align: center; font-size: 14pt; font-weight: bold; margin: 16px 0 8px 0; text-transform: uppercase; color: #0f766e; }
        .subjudul { text-align: center; font-size: 11pt; margin-bottom: 18px; color: #374151; }
        table.identitas { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
        table.identitas td { padding: 4px 8px; vertical-align: top; font-size: 10.5pt; }
        table.identitas td.label { width: 25%; font-weight: bold; }
        .section-header { background-color: #0f766e; color: white; padding: 6px 10px; font-weight: bold; font-size: 11pt; margin-top: 18px; margin-bottom: 8px; border-radius: 4px; }
        .box-cp { background-color: #f0fdfa; border-left: 4px solid #0f766e; padding: 10px; margin: 8px 0; font-size: 10.5pt; }
        .box-pancasila { background-color: #fefce8; border: 1px solid #fef08a; padding: 8px 12px; margin: 8px 0; border-radius: 4px; }
        table.rubrik { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 9.5pt; }
        table.rubrik th { background-color: #0f766e; color: white; border: 1px solid #0d9488; padding: 6px; text-align: center; }
        table.rubrik td { border: 1px solid #cbd5e1; padding: 6px 8px; vertical-align: top; }
        .lkpd-container { border: 2px dashed #0f766e; padding: 14px; margin: 16px 0; background-color: #f8fafc; border-radius: 6px; }
        .lkpd-header { font-weight: bold; font-size: 12pt; text-align: center; color: #0f766e; margin-bottom: 10px; }
        .tanda-tangan { width: 100%; margin-top: 30px; }
        .tanda-tangan td { width: 50%; text-align: center; font-size: 10.5pt; }
      </style>
    </head>
    <body>
      <div class="kop-surat">
        <h2>PEMERINTAH KABUPATEN GARUT</h2>
        <h3>DINAS PENDIDIKAN KABUPATEN GARUT</h3>
        <p>Portal Pendidikan Terpadu "GARUT CERDAS" & Platform Merdeka Mengajar (PMM)</p>
        <p>SK BSKAP Kemendikdasmen RI: ${modul.nomorSKKemendikdasmen || 'No. 032/H/KR/2024'} | Kode Dapodik: ${modul.kodeDapodik || 'DPK-AJAR-2026-GRT'}</p>
      </div>

      <div class="judul-dokumen">MODUL AJAR KURIKULUM MERDEKA</div>
      <div class="subjudul">${modul.judul}</div>

      <div class="section-header">I. INFORMASI UMUM & IDENTITAS MODUL</div>
      <table class="identitas">
        <tr><td class="label">Nama Penyusun</td><td>: ${modul.penyusun}</td></tr>
        <tr><td class="label">Satuan Pendidikan</td><td>: ${modul.instansiPenyusun}</td></tr>
        <tr><td class="label">Tahun Pelajaran</td><td>: ${modul.tahunAjaran}</td></tr>
        <tr><td class="label">Jenjang / Fase / Kelas</td><td>: ${modul.jenjang} / ${modul.fase} / ${modul.kelas}</td></tr>
        <tr><td class="label">Mata Pelajaran</td><td>: ${modul.mataPelajaran}</td></tr>
        <tr><td class="label">Alokasi Waktu</td><td>: ${modul.alokasiWaktu}</td></tr>
        <tr><td class="label">Target Peserta Didik</td><td>: ${modul.targetPesertaDidik}</td></tr>
        <tr><td class="label">Model Pembelajaran</td><td>: ${modul.modelPembelajaran}</td></tr>
        <tr><td class="label">ID Platform PMM</td><td>: ${modul.idPMM || 'PMM-VERIFIED-2026'}</td></tr>
      </table>

      <div class="box-pancasila">
        <strong>Dimensi Profil Pelajar Pancasila:</strong> ${modul.profilPelajarPancasila.join(', ')}
      </div>

      <div>
        <strong>Sarana & Prasarana:</strong> ${modul.saranaPrasarana.join(', ')}
      </div>

      <div class="section-header">II. KOMPONEN INTI & CAPAIAN PEMBELAJARAN</div>
      
      <p><strong>A. Capaian Pembelajaran (CP):</strong></p>
      <div class="box-cp">
        ${modul.capaianPembelajaran}
      </div>

      <p><strong>B. Alur Tujuan Pembelajaran (ATP / TP):</strong></p>
      <ol>
        ${modul.tujuanPembelajaran.map(tp => `<li>${tp}</li>`).join('')}
      </ol>

      <p><strong>C. Pemahaman Bermakna:</strong></p>
      <p>${modul.pemahamanBermakna}</p>

      <p><strong>D. Pertanyaan Pemantik:</strong></p>
      <ul>
        ${modul.pertanyaanPemantik.map(q => `<li>${q}</li>`).join('')}
      </ul>

      <div class="section-header">III. KEGIATAN PEMBELAJARAN BERDIFERENSIASI</div>

      <p><strong>1. Kegiatan Pendahuluan (Apersepsi & Motivasi):</strong></p>
      <ul>
        ${modul.kegiatanPembelajaran.pendahuluan.map(p => `<li>${p}</li>`).join('')}
      </ul>

      <p><strong>2. Kegiatan Inti (Berdiferensiasi Konten, Proses, & Produk):</strong></p>
      ${modul.kegiatanPembelajaran.intiBerdiferensiasi.diferensiasiKonten ? `<p><em>• Diferensiasi Konten:</em> ${modul.kegiatanPembelajaran.intiBerdiferensiasi.diferensiasiKonten}</p>` : ''}
      <p><em>• Diferensiasi Proses:</em> ${modul.kegiatanPembelajaran.intiBerdiferensiasi.diferensiasiProses}</p>
      ${modul.kegiatanPembelajaran.intiBerdiferensiasi.diferensiasiProduk ? `<p><em>• Diferensiasi Produk:</em> ${modul.kegiatanPembelajaran.intiBerdiferensiasi.diferensiasiProduk}</p>` : ''}
      
      <p><strong>Langkah-Langkah Terstruktur:</strong></p>
      <ol>
        ${modul.kegiatanPembelajaran.intiBerdiferensiasi.langkahLangkah.map(l => `<li>${l}</li>`).join('')}
      </ol>

      <p><strong>3. Kegiatan Penutup & Refleksi:</strong></p>
      <ul>
        ${modul.kegiatanPembelajaran.penutupRefleksi.map(r => `<li>${r}</li>`).join('')}
      </ul>

      <div class="section-header">IV. ASESMEN & RUBRIK PENILAIAN</div>
      <p><strong>1. Asesmen Diagnostik (Awal):</strong> ${modul.asesmen.awalDiagnostik}</p>
      <p><strong>2. Asesmen Formatif (Proses):</strong> ${modul.asesmen.formatif}</p>
      <p><strong>3. Asesmen Sumatif (Akhir):</strong> ${modul.asesmen.sumatif}</p>

      <p><strong>Rubrik Penilaian Kinerja & Pemahaman:</strong></p>
      <table class="rubrik">
        <thead>
          <tr>
            <th style="width: 25%;">Kriteria Penilaian</th>
            <th style="width: 18%;">Perlu Bimbingan (1)</th>
            <th style="width: 18%;">Cukup (2)</th>
            <th style="width: 19%;">Baik (3)</th>
            <th style="width: 20%;">Sangat Baik (4)</th>
          </tr>
        </thead>
        <tbody>
          ${modul.asesmen.rubrik.map(r => `
            <tr>
              <td><strong>${r.kriteria}</strong></td>
              <td>${r.perluBimbingan}</td>
              <td>${r.cukup}</td>
              <td>${r.baik}</td>
              <td>${r.sangatBaik}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="section-header">V. LEMBAR KERJA PESERTA DIDIK (LKPD)</div>
      <div class="lkpd-container">
        <div class="lkpd-header">${modul.lkpd.judul}</div>
        <p><strong>Petunjuk Pengerjaan:</strong></p>
        <ol>
          ${modul.lkpd.petunjuk.map(p => `<li>${p}</li>`).join('')}
        </ol>

        <p><strong>Daftar Tugas & Aktivitas:</strong></p>
        <ol>
          ${modul.lkpd.soalAktivitas.map(s => `<li><p>${s}</p><div style="border: 1px dashed #94a3b8; height: 50px; margin: 4px 0; background: #fff;"></div></li>`).join('')}
        </ol>

        ${modul.lkpd.refleksiSiswa ? `
          <p><strong>Refleksi Siswa:</strong></p>
          <ul>${modul.lkpd.refleksiSiswa.map(rf => `<li>${rf}</li>`).join('')}</ul>
        ` : ''}
      </div>

      <div class="section-header">VI. MATERI, GLOSARIUM & DAFTAR PUSTAKA</div>
      <p><strong>Ringkasan Materi Esensial:</strong></p>
      <p>${modul.ringkasanMateri}</p>

      <p><strong>Glosarium:</strong></p>
      <ul>
        ${modul.glosarium.map(g => `<li>${g}</li>`).join('')}
      </ul>

      <p><strong>Daftar Pustaka & Referensi:</strong></p>
      <ul>
        ${modul.daftarPustaka.map(dp => `<li>${dp}</li>`).join('')}
      </ul>

      <table class="tanda-tangan">
        <tr>
          <td>
            Mengetahui,<br>
            Kepala Satuan Pendidikan<br><br><br><br>
            <strong>___________________________</strong><br>
            NIP. ........................................
          </td>
          <td>
            Garut, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br>
            Guru Mata Pelajaran / Penyusun<br><br><br><br>
            <strong>${modul.penyusun}</strong><br>
            NIP. ........................................
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
