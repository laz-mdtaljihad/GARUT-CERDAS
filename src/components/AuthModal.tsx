import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  User, 
  Building2, 
  CheckCircle2, 
  KeyRound, 
  Sparkles,
  ArrowRight,
  LogOut,
  Mail,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: UserProfile;
  userProfile?: UserProfile;
  onLogin?: (profile: UserProfile) => void;
  onLoginSuccess?: (profile: UserProfile) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser: propCurrentUser,
  userProfile: propUserProfile,
  onLogin,
  onLoginSuccess,
  onLogout
}) => {
  const currentUser: UserProfile = propCurrentUser || propUserProfile || {
    nama: 'Warga Garut',
    role: 'Orang Tua',
    email: 'mdtaljihad2026@gmail.com',
    kecamatanDomisili: 'Tarogong Kidul',
    isAdmin: false,
    favoritSekolah: [],
    favoritBeasiswa: [],
    notifikasiAktif: { ppdb: true, beasiswa: true, pengumuman: true }
  };

  const notifyLogin = (profile: UserProfile) => {
    if (onLogin) onLogin(profile);
    if (onLoginSuccess) onLoginSuccess(profile);
  };

  const [activeTab, setActiveTab] = useState<'google' | 'admin'>('google');

  // Google / Gmail form state
  const [gmailName, setGmailName] = useState(currentUser.loginProvider === 'google' ? currentUser.nama : 'Mochamad Daffa Taljihad');
  const [gmailEmail, setGmailEmail] = useState(currentUser.email || 'mdtaljihad2026@gmail.com');
  const [gmailRole, setGmailRole] = useState<UserRole>(
    currentUser.role === 'Admin Disdik' || currentUser.role === 'Operator Sekolah' ? 'Orang Tua' : currentUser.role
  );
  const [gmailKecamatan, setGmailKecamatan] = useState(currentUser.kecamatanDomisili || 'Tarogong Kidul');
  
  // Admin Disdik form state
  const [adminNip, setAdminNip] = useState('19820514 200604 1 008');
  const [adminEmail, setAdminEmail] = useState('admin.disdik@garutkab.go.id');
  const [adminPassword, setAdminPassword] = useState('GarutCerdas2026!');
  const [adminUnit, setAdminUnit] = useState('Dinas Pendidikan Kab. Garut (Admin Utama)');
  const [adminRole, setAdminRole] = useState<'Admin Disdik' | 'Operator Sekolah'>('Admin Disdik');
  const [adminError, setAdminError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle Google / Gmail Fast Login
  const handleGoogleLogin = (customEmail?: string, customName?: string, customRole?: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      const emailToUse = customEmail || gmailEmail || 'mdtaljihad2026@gmail.com';
      const nameToUse = customName || gmailName || 'Warga Garut';
      const roleToUse = customRole || gmailRole || 'Orang Tua';

      const updatedProfile: UserProfile = {
        ...currentUser,
        id: 'user-google-' + Date.now(),
        nama: nameToUse,
        email: emailToUse,
        role: roleToUse,
        loginProvider: 'google',
        isAdmin: false,
        isOperator: false,
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(nameToUse)}&backgroundColor=0284c7,0f766e,4f46e5`,
        kecamatanDomisili: gmailKecamatan
      };

      notifyLogin(updatedProfile);
      setIsLoading(false);
      setSuccessToast(`Berhasil masuk dengan akun Google: ${emailToUse}`);
      setTimeout(() => {
        setSuccessToast(null);
        onClose();
      }, 1200);
    }, 800);
  };

  // Handle Admin Disdik Login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);

    if (!adminEmail.trim() || !adminPassword.trim()) {
      setAdminError('Email dinas dan kata sandi wajib diisi.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      let namaAdmin = 'Dr. H. Ade Hernawan, M.Pd';
      let jabatanAdmin = 'Kepala Seksi Kurikulum & Pengendali Data Pendidikan';
      
      if (adminRole === 'Operator Sekolah') {
        namaAdmin = 'Siti Nurhalizah, S.Kom';
        jabatanAdmin = 'Operator SIMPPDB & Dapodik Disdik Garut';
      }

      const updatedProfile: UserProfile = {
        ...currentUser,
        id: 'admin-' + Date.now(),
        nama: namaAdmin,
        email: adminEmail,
        role: adminRole,
        loginProvider: 'disdik_admin',
        isAdmin: true,
        isOperator: true,
        nip: adminNip,
        instansiDinas: adminUnit,
        jabatan: jabatanAdmin,
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(adminEmail)}&backgroundColor=047857`,
        kecamatanDomisili: 'Garut Kota'
      };

      notifyLogin(updatedProfile);
      setIsLoading(false);
      setSuccessToast(`Berhasil masuk sebagai ${adminRole} (${namaAdmin})`);
      setTimeout(() => {
        setSuccessToast(null);
        onClose();
      }, 1200);
    }, 800);
  };

  // Quick Demo fill for Admin
  const handleFillDemoAdmin = (type: 'superadmin' | 'operator') => {
    if (type === 'superadmin') {
      setAdminNip('19820514 200604 1 008');
      setAdminEmail('admin.disdik@garutkab.go.id');
      setAdminPassword('GarutCerdas2026!');
      setAdminUnit('Dinas Pendidikan Kab. Garut (Admin Utama)');
      setAdminRole('Admin Disdik');
    } else {
      setAdminNip('19890312 201101 2 005');
      setAdminEmail('operator.dapodik@garutkab.go.id');
      setAdminPassword('OperatorGarut2026!');
      setAdminUnit('Bidang Pembinaan & Operator Dapodik');
      setAdminRole('Operator Sekolah');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER MODAL */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 p-5 text-white flex items-start justify-between relative">
          <div className="pr-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md bg-teal-500/30 text-teal-300 text-[10px] font-black uppercase tracking-wider border border-teal-400/30">
                SSO & Otentikasi Terpadu
              </span>
              {currentUser.isAdmin && (
                <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                  Admin Aktif
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-['Outfit',sans-serif]">
              Masuk ke Portal Garut Cerdas
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Gunakan akun Gmail untuk Masyarakat/Orang Tua, atau Login Dinas untuk Operator/Admin.
            </p>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STATUS BAR JIKA SUDAH LOGIN */}
        {currentUser.email && (
          <div className="bg-slate-50 border-b border-slate-200 px-5 py-2.5 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 truncate">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-slate-500">Sedang login sebagai:</span>
              <span className="font-bold text-slate-800 truncate">{currentUser.nama}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                currentUser.isAdmin 
                  ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {currentUser.role}
              </span>
            </div>
            <button
              onClick={() => {
                onLogout();
                setSuccessToast('Berhasil keluar dari akun.');
                setTimeout(() => setSuccessToast(null), 2000);
              }}
              className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 hover:underline shrink-0 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        )}

        {/* TOAST SUCCESS */}
        {successToast && (
          <div className="m-4 p-3.5 bg-emerald-700 text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg animate-in slide-in-from-top duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* TAB SELECTOR: GOOGLE GMAIL vs ADMIN DISDIK */}
        <div className="p-4 bg-slate-100/70 border-b border-slate-200 grid grid-cols-2 gap-2">
          <button
            id="tab-auth-google"
            onClick={() => setActiveTab('google')}
            className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'google'
                ? 'bg-white text-slate-900 shadow-md border border-slate-200'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Gmail / Masyarakat</span>
          </button>

          <button
            id="tab-auth-admin"
            onClick={() => setActiveTab('admin')}
            className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-md'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>ADMIN / Operator Disdik</span>
          </button>
        </div>

        {/* TAB BODY CONTENT */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* TAB 1: GOOGLE / GMAIL AUTHENTICATION */}
          {activeTab === 'google' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-2xl flex items-start gap-3 text-xs text-blue-900">
                <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Login Cepat dengan Google Account</p>
                  <p className="text-blue-700 mt-0.5 leading-relaxed">
                    Khusus Orang Tua, Siswa, Guru, dan Masyarakat Umum untuk menyimpan sekolah favorit, memantau zonasi PPDB, dan konsultasi tanya sekolah.
                  </p>
                </div>
              </div>

              {/* FAST 1-CLICK GMAIL BUTTON */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Pilihan Akun Cepat:
                </p>
                
                {/* Account card: Active / detected user */}
                <button
                  id="btn-google-login-direct"
                  onClick={() => handleGoogleLogin('mdtaljihad2026@gmail.com', 'Mochamad Daffa Taljihad', 'Orang Tua')}
                  disabled={isLoading}
                  className="w-full p-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-blue-400/80 hover:border-blue-500 text-left transition-all shadow-xs flex items-center justify-between gap-3 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
                      M
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                        <span>Mochamad Daffa Taljihad</span>
                        <span className="px-1.5 py-0.2 rounded-md bg-blue-100 text-blue-700 text-[10px] font-bold">Orang Tua</span>
                      </div>
                      <div className="text-xs text-slate-500 font-mono">
                        mdtaljihad2026@gmail.com
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-1.5 bg-blue-600 group-hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1">
                    <span>Masuk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>

              {/* CUSTOM GMAIL FORM */}
              <div className="pt-3 border-t border-slate-200 space-y-3">
                <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>Atau Masuk dengan Akun Gmail Lainnya:</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Nama Lengkap Anda:
                    </label>
                    <input
                      type="text"
                      value={gmailName}
                      onChange={(e) => setGmailName(e.target.value)}
                      placeholder="Contoh: Bp. Hendra / Ibu Ratna"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Alamat Gmail (@gmail.com):
                    </label>
                    <input
                      type="email"
                      value={gmailEmail}
                      onChange={(e) => setGmailEmail(e.target.value)}
                      placeholder="nama@gmail.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Peran / Kategori Pengguna:
                    </label>
                    <select
                      value={gmailRole}
                      onChange={(e) => setGmailRole(e.target.value as UserRole)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Orang Tua">Orang Tua Murid / Wali</option>
                      <option value="Siswa">Siswa / Pelajar Garut</option>
                      <option value="Calon Mahasiswa">Calon Mahasiswa / Alumni</option>
                      <option value="Pendidik">Guru / Pendidik</option>
                      <option value="Umum">Masyarakat Umum</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Kecamatan Domisili (Garut):
                    </label>
                    <input
                      type="text"
                      value={gmailKecamatan}
                      onChange={(e) => setGmailKecamatan(e.target.value)}
                      placeholder="Tarogong Kidul / Garut Kota"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button
                  id="btn-submit-custom-gmail"
                  onClick={() => handleGoogleLogin()}
                  disabled={isLoading}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Masuk dengan Google / Gmail Ini</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: ADMIN DISDIK & OPERATOR LOGIN */}
          {activeTab === 'admin' && (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-start gap-3 text-xs text-emerald-950">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-emerald-900">Hak Akses Penuh Administrator & Operator</p>
                  <p className="text-emerald-800 mt-0.5 leading-relaxed">
                    Setelah login, Anda memiliki kewenangan untuk <strong>menambah, mengedit, dan menghapus</strong> data Sekolah, Modul Ajar Resmi, Beasiswa, Pengumuman Dinas, serta Menjawab Tanya Jawab.
                  </p>
                </div>
              </div>

              {/* DEMO SHORTCUT BUTTONS */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                    ⚡ Demo 1-Klik Isi Kredensial:
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleFillDemoAdmin('superadmin')}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-100 border border-slate-300 text-left transition-colors cursor-pointer"
                  >
                    <div className="text-xs font-bold text-slate-900">Admin Utama Disdik</div>
                    <div className="text-[10px] text-slate-500 font-mono">admin.disdik@...</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFillDemoAdmin('operator')}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-100 border border-slate-300 text-left transition-colors cursor-pointer"
                  >
                    <div className="text-xs font-bold text-slate-900">Operator Sekolah / Dapodik</div>
                    <div className="text-[10px] text-slate-500 font-mono">operator.dapodik@...</div>
                  </button>
                </div>
              </div>

              {adminError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{adminError}</span>
                </div>
              )}

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      NIP / Kode Petugas Disdik:
                    </label>
                    <input
                      type="text"
                      value={adminNip}
                      onChange={(e) => setAdminNip(e.target.value)}
                      placeholder="19820514 200604 1 008"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Peran Jabatan:
                    </label>
                    <select
                      value={adminRole}
                      onChange={(e) => setAdminRole(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                    >
                      <option value="Admin Disdik">Admin Utama Dinas Pendidikan</option>
                      <option value="Operator Sekolah">Operator Sekolah & SIMPPDB</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Email Dinas Resmi:
                  </label>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="nama.petugas@disdik.garutkab.go.id"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Kata Sandi / PIN Pengawas:
                  </label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Unit Kerja / Bidang Pengelolaan:
                  </label>
                  <select
                    value={adminUnit}
                    onChange={(e) => setAdminUnit(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Dinas Pendidikan Kab. Garut (Admin Utama)">Dinas Pendidikan Kab. Garut (Admin Utama)</option>
                    <option value="Bidang Pembinaan SMP / SD">Bidang Pembinaan SMP & SD</option>
                    <option value="Operator SIM-PPDB & Zonasi Garut">Operator SIM-PPDB & Zonasi Garut</option>
                    <option value="Operator Dapodik & Modul Ajar">Operator Dapodik & Modul Ajar</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                id="btn-submit-admin-login"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-900 hover:to-teal-900 text-white rounded-xl text-xs sm:text-sm font-extrabold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>{isLoading ? 'Memverifikasi...' : 'Masuk sebagai ADMIN / Operator Disdik'}</span>
              </button>
            </form>
          )}

        </div>

        {/* FOOTER MODAL */}
        <div className="bg-slate-100 px-5 py-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Portal Pendidikan Terpadu Garut Cerdas</span>
          <span>Disdik Kab. Garut</span>
        </div>

      </div>
    </div>
  );
};
