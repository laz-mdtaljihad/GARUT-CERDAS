import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  School as SchoolIcon, 
  MapPin, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import { School, Scholarship } from '../types';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: School[];
  scholarships: Scholarship[];
  onSelectSchool: (school: School) => void;
  onSelectScholarship: (scholarship: Scholarship) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  recommendedSchools?: School[];
  recommendedScholarships?: Scholarship[];
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  schools,
  scholarships,
  onSelectSchool,
  onSelectScholarship
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      sender: 'bot',
      text: 'Sampurasun! Saya **Kang Cerdas**, asisten AI pendidikan Kabupaten Garut. Saya bisa membantu Anda mencari sekolah terbaik, menghitung radius zonasi PPDB 2026, mencarikan beasiswa, serta memberikan rekomendasi jurusan masa depan anak Anda di Garut. Ada yang bisa saya bantu?',
      timestamp: 'Baru saja'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (!isOpen) return null;

  // Preset quick prompt buttons
  const promptSuggestions = [
    'Rekomendasi SMK IT & Vokasi terbaik di Garut',
    'Bagaimana aturan zonasi SMP di Tarogong Kidul?',
    'Beasiswa apa saja yang sedang buka di Garut?',
    'Prospek kerja jurusan Otomotif & Kerajinan Kulit Garut'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    const userMsg: Message = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Smart contextual response generator
    setTimeout(() => {
      let botResponse = '';
      let matchedSchools: School[] = [];
      let matchedScholarships: Scholarship[] = [];

      const lower = text.toLowerCase();

      if (lower.includes('smk') || lower.includes('it') || lower.includes('vokasi') || lower.includes('coding')) {
        botResponse = `Untuk jenjang SMK bidang IT & Vokasi Unggulan di Garut, terdapat beberapa pilihan terbaik:\n\n1. **SMKN 1 Garut (SMEA)**: Jurusan Rekayasa Perangkat Lunak (RPL), TKJ, dan DKV dengan akreditasi A dan lab komputer modern.\n2. **SMK Wikrama 1 Garut**: Fokus intensif IT, Pengembangan Perangkat Lunak & Gim (PPLG) dengan serapan kerja industri tinggi.\n3. **SMKN 2 Garut (STM)**: Terkenal untuk Teknik Komputer Jaringan dan Teknik Otomotif.\n\nBerikut kartu sekolah yang bisa langsung Anda pelajari:`;
        matchedSchools = schools.filter(s => s.jenjang === 'SMK').slice(0, 2);
      } else if (lower.includes('zonasi') || lower.includes('tarogong') || lower.includes('jarak') || lower.includes('ppdb')) {
        botResponse = `Untuk **Aturan Zonasi PPDB 2026 di Kabupaten Garut**:\n\n- **SD Negeri**: Kuota zonasi minimal **70%**\n- **SMP Negeri**: Kuota zonasi minimal **50%**\n- **SMA Negeri**: Kuota zonasi minimal **50%**\n\nUntuk wilayah **Tarogong Kidul & Garut Kota**, penentuan kelulusan jalur zonasi dihitung dari jarak titik gerbang sekolah ke koordinat domisili Kartu Keluarga (KK Garut minimal terbit 1 tahun). Anda juga bisa mencoba simulasi lengkap di menu **Peta Zonasi**.`;
        matchedSchools = schools.filter(s => s.kecamatan.includes('Tarogong') || s.kecamatan.includes('Garut Kota')).slice(0, 2);
      } else if (lower.includes('beasiswa') || lower.includes('bantuan') || lower.includes('kip') || lower.includes('baznas')) {
        botResponse = `Tersedia beberapa program beasiswa aktif di Kabupaten Garut saat ini:\n\n1. **Beasiswa Garut Cerdas (Pemkab Garut)**: Bantuan SPP & biaya pendidikan bagi siswa SD–S1.\n2. **KIP Kuliah Merdeka**: Pembiayaan kuliah penuh & uang saku s/d Rp 8,4 Juta/semester.\n3. **Beasiswa Baznas Garut**: Khusus mustahik & santri tahfidz Quran.\n\nSilakan cek detail syarat dan batas pendaftarannya di bawah ini:`;
        matchedScholarships = scholarships.filter(s => s.status === 'Buka').slice(0, 2);
      } else if (lower.includes('kulit') || lower.includes('sukaregang') || lower.includes('karir') || lower.includes('prospek')) {
        botResponse = `Prospek industri **Kerajinan Kulit Sukaregang** dan **Otomotif/Manufaktur** di Garut sangat tinggi:\n\n- Garut memiliki lebih dari 400 unit usaha penyamakan & kerajinan kulit dengan pasar ekspor.\n- Lulusan SMKN 2 Garut dan BLK Garut rutin disalurkan ke industri manufaktur otomotif nasional dan magang Jepang.\n- Tersedia pelatihan gratis dari Disnakertrans Garut bersertifikasi BNSP di menu **Pelatihan**.`;
      } else {
        botResponse = `Terima kasih atas pertanyaannya. Terkait hal tersebut, sistem pendidikan Kabupaten Garut menerapkan kurikulum merdeka terpadu dengan fokus penguatan literasi lokal dan pemerataan akses sekolah di 42 kecamatan.\n\nAnda dapat mengeksplorasi direktori sekolah, memeriksa zonasi domisili Anda, atau mengajukan pertanyaan langsung ke operator sekolah terkait di menu **Tanya Sekolah**.`;
        matchedSchools = schools.slice(0, 1);
      }

      const botMsg: Message = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        recommendedSchools: matchedSchools.length > 0 ? matchedSchools : undefined,
        recommendedScholarships: matchedScholarships.length > 0 ? matchedScholarships : undefined
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        id="kang-cerdas-ai-container"
        className="relative bg-white rounded-3xl max-w-2xl w-full h-[88vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 p-4 sm:p-5 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300 border border-white/20 shadow-xs">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-base font-['Outfit',sans-serif]">Kang Cerdas</h3>
                <span className="px-2 py-0.2 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                  AI Edu Garut
                </span>
              </div>
              <p className="text-[11px] text-blue-200">Asisten Pintar Konsultasi Pendidikan & PPDB Garut</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Feed */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4 text-xs bg-slate-50/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-3xl p-3.5 space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-xs shadow-xs'
                  : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs shadow-xs'
              }`}>
                <div className="whitespace-pre-line leading-relaxed text-xs sm:text-[13px]">
                  {msg.text}
                </div>

                {/* Recommended Schools Card Attachment */}
                {msg.recommendedSchools && msg.recommendedSchools.length > 0 && (
                  <div className="mt-3 space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-blue-700 block">
                      Sekolah yang Direkomendasikan:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.recommendedSchools.map((sch) => (
                        <div
                          key={sch.id}
                          onClick={() => {
                            onSelectSchool(sch);
                            onClose();
                          }}
                          className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer text-slate-900"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded">
                              {sch.jenjang}
                            </span>
                            <span className="text-[10px] text-emerald-700 font-bold">Akred. {sch.akreditasi}</span>
                          </div>
                          <p className="font-bold text-xs mt-1 truncate">{sch.nama}</p>
                          <p className="text-[10px] text-slate-500">{sch.kecamatan}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended Scholarships Card Attachment */}
                {msg.recommendedScholarships && msg.recommendedScholarships.length > 0 && (
                  <div className="mt-3 space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-amber-700 block">
                      Beasiswa yang Direkomendasikan:
                    </span>
                    <div className="space-y-1.5">
                      {msg.recommendedScholarships.map((sch) => (
                        <div
                          key={sch.id}
                          onClick={() => {
                            onSelectScholarship(sch);
                            onClose();
                          }}
                          className="p-2.5 rounded-xl bg-amber-50/70 hover:bg-amber-100 border border-amber-200 transition-colors cursor-pointer text-slate-900"
                        >
                          <p className="font-bold text-xs">{sch.nama}</p>
                          <div className="flex items-center justify-between text-[10px] text-amber-900 font-semibold mt-0.5">
                            <span>{sch.besarBantuan}</span>
                            <span>Buka s/d {sch.deadline}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className={`text-[10px] ${msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2.5 items-center text-slate-400 text-xs">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce delay-200"></span>
                <span className="text-[11px] text-slate-500 font-medium ml-1">Kang Cerdas sedang memproses data...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 ml-1" />
          {promptSuggestions.map((sug, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(sug)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 border border-slate-200"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Tanyakan apa saja seputar sekolah, zonasi, beasiswa di Garut..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white rounded-2xl font-bold transition-all shadow-xs shrink-0 cursor-pointer disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
