import React, { useState } from 'react';
import WarehouseVR from './WarehouseVR.jsx';
import ARScanner from './ARScanner.jsx';
import {
  LayoutDashboard, BookOpen, Box, Glasses, Bot, ClipboardCheck, Settings,
  Bell, Search, ArrowRight, Play, CheckCircle2, Clock3, Package, Store,
  Warehouse, Wallet, Building2, ScanLine, MessageCircle, Send, Sparkles,
  ChevronRight, RotateCcw, Lightbulb, Menu, X, CircleHelp, TrendingUp,
  AlertTriangle, Database, FileText, GraduationCap
} from 'lucide-react';

const nav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'explore', label: 'Explore Company', icon: Box },
  { id: 'case', label: 'Business Case', icon: BookOpen },
  { id: 'ai', label: 'AI Investigation', icon: Bot },
  { id: 'result', label: 'Learning Result', icon: ClipboardCheck },
];

const departments = [
  { id: 'sales', title: 'Penjualan', subtitle: 'Transaksi & pelanggan', icon: Store, color: 'blue', detail: 'Bagian penjualan mencatat transaksi pelanggan melalui POS. Setiap transaksi seharusnya memperbarui data persediaan secara otomatis.' },
  { id: 'warehouse', title: 'Gudang', subtitle: 'Stok masuk & keluar', icon: Warehouse, color: 'orange', detail: 'Bagian gudang memantau barang masuk, barang keluar, dan jumlah stok aktual. Petugas juga melakukan pemeriksaan fisik secara berkala.' },
  { id: 'finance', title: 'Keuangan', subtitle: 'Pendapatan & biaya', icon: Wallet, color: 'green', detail: 'Bagian keuangan menggunakan data transaksi untuk mencatat pendapatan, biaya pembelian, dan laporan keuangan.' },
  { id: 'management', title: 'Manajemen', subtitle: 'Laporan & keputusan', icon: Building2, color: 'violet', detail: 'Manajemen menggunakan laporan terintegrasi untuk memantau kinerja dan menentukan keputusan operasional.' },
];

const initialMessages = [
  { from: 'ai', text: 'Halo! Saya SIM Assistant. Kita akan menyelidiki selisih persediaan 15 unit. Mulailah dengan memeriksa data yang paling relevan. Menurut Anda, apa yang perlu diperiksa terlebih dahulu?' }
];

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [activeDept, setActiveDept] = useState('warehouse');
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [chatInput, setChatInput] = useState('');
  const [decision, setDecision] = useState('audit');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [arOpen, setArOpen] = useState(false);
  const [vrOpen, setVrOpen] = useState(false);

  const go = (id) => { setPage(id); setShowMobileNav(false); };
  const mark = (id) => setCompleted(v => v.includes(id) ? v : [...v, id]);

  const sendMessage = () => {
    const value = chatInput.trim();
    if (!value) return;
    setMessages(v => [...v, { from: 'user', text: value }]);
    setChatInput('');
    setTimeout(() => setMessages(v => [...v, {
      from: 'ai',
      text: 'Terima kasih atas analisisnya. Untuk menyelidiki masalah ini, bandingkan riwayat transaksi penjualan, catatan barang masuk dan keluar, serta waktu pembaruan stok. Data mana yang paling kuat mendukung dugaan Anda?'
    }]), 350);
  };

  const submitDecision = () => {
    if (!reason.trim()) return;
    setSubmitted(true);
    mark('case');
    mark('ai');
  };

  const Sidebar = () => <aside className={`sidebar ${showMobileNav ? 'open' : ''}`}>
    <div className="brand">
      <div className="brand-mark"><GraduationCap size={21} /></div>
      <div><strong>SIM Learning Lab</strong><span>Interactive learning</span></div>
      <button className="icon-btn mobile-close" onClick={() => setShowMobileNav(false)}><X size={18} /></button>
    </div>
    <div className="nav-label">LEARNING SPACE</div>
    <nav>{nav.map(item => {
      const Icon = item.icon;
      return <button key={item.id} className={`nav-item ${page === item.id ? 'active' : ''}`} onClick={() => go(item.id)}>
        <Icon size={18} /><span>{item.label}</span>{completed.includes(item.id) && <CheckCircle2 className="nav-check" size={15} />}
      </button>;
    })}</nav>
    <div className="sidebar-bottom">
      <div className="help-card"><div className="help-icon"><CircleHelp size={17} /></div><strong>Butuh bantuan?</strong><p>Pelajari panduan penggunaan SIM Learning Lab.</p><button onClick={() => go('dashboard')}>Lihat panduan <ArrowRight size={14} /></button></div>
      <div className="profile"><div className="avatar">M</div><div><strong>Mahasiswa</strong><span>Student account</span></div><Settings size={17} className="muted" /></div>
    </div>
  </aside>;

  const Header = () => <header className="topbar">
    <button className="icon-btn mobile-menu" onClick={() => setShowMobileNav(true)}><Menu size={20} /></button>
    <div className="breadcrumb">Learning Space <ChevronRight size={14} /> <strong>{nav.find(n => n.id === page)?.label || 'Dashboard'}</strong></div>
    <div className="top-actions"><div className="searchbox"><Search size={16} /><span>Cari materi...</span><kbd>⌘ K</kbd></div><button className="icon-btn notification"><Bell size={18} /><i /></button><div className="avatar small">M</div></div>
  </header>;

  const PageTitle = ({ eyebrow, title, desc, action }) => <div className="page-title"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{desc}</p></div>{action}</div>;

  const renderDashboard = () => <div className="content">
    <PageTitle eyebrow="WELCOME BACK" title="Halo, Mahasiswa! 👋" desc="Siap memahami bagaimana sistem informasi bekerja dalam sebuah bisnis?" action={<span className="date-chip"><Clock3 size={15} /> Estimasi 30–45 menit</span>} />
    <section className="hero">
      <div className="hero-copy"><span className="pill pill-light"><Sparkles size={13} /> INTERACTIVE LEARNING</span><h2>Belajar sistem informasi<br />melalui simulasi bisnis.</h2><p>Jelajahi perusahaan retail, pahami aliran informasi, dan selesaikan tantangan operasional melalui pengalaman interaktif.</p><button className="btn btn-white" onClick={() => go('explore')}>Mulai pembelajaran <ArrowRight size={17} /></button></div>
      <div className="hero-art"><div className="art-glow" /><div className="store-building"><div className="store-roof" /><div className="store-sign">NUSANTARA MART</div><div className="store-window"><span /><span /><span /></div><div className="store-door" /></div><div className="float-card card-stock"><Package size={16} /><div><b>Stok tersedia</b><strong>50 unit</strong></div></div><div className="float-card card-chart"><TrendingUp size={16} /><div><b>Data terintegrasi</b><strong>Real-time</strong></div></div><div className="art-dot dot-one" /><div className="art-dot dot-two" /></div>
    </section>
    <div className="section-heading"><div><h3>Perjalanan belajar</h3><p>Selesaikan setiap aktivitas untuk memahami materi secara menyeluruh.</p></div><span className="progress-label">{completed.length}/3 aktivitas</span></div>
    <div className="progress-track"><div style={{ width: `${Math.min(completed.length / 3 * 100, 100)}%` }} /></div>
    <div className="learning-grid">
      <button className="learning-card" onClick={() => go('explore')}><div className="card-top"><div className="feature-icon blue-bg"><Box size={20} /></div><span className="tag">EXPLORE</span></div><h4>Kenali perusahaan</h4><p>Jelajahi departemen dan komponen sistem informasi.</p><div className="card-foot"><span>AR & VR Exploration</span><ArrowRight size={17} /></div></button>
      <button className="learning-card" onClick={() => go('case')}><div className="card-top"><div className="feature-icon orange-bg"><FileText size={20} /></div><span className="tag">CHALLENGE</span></div><h4>The Missing Inventory</h4><p>Temukan penyebab ketidaksesuaian data persediaan.</p><div className="card-foot"><span>Business Case</span><ArrowRight size={17} /></div></button>
      <button className="learning-card" onClick={() => go('ai')}><div className="card-top"><div className="feature-icon violet-bg"><Bot size={20} /></div><span className="tag">AI POWERED</span></div><h4>Analisis bersama AI</h4><p>Investigasi data dan tentukan solusi bisnis.</p><div className="card-foot"><span>AI Investigation</span><ArrowRight size={17} /></div></button>
    </div>
    <div className="objective-strip"><div className="objective-icon"><Lightbulb size={20} /></div><div><strong>Tujuan pembelajaran</strong><p>Mahasiswa mampu memahami integrasi sistem informasi antarbagian dan mengambil keputusan berdasarkan data operasional.</p></div><button className="text-btn" onClick={() => go('case')}>Lihat studi kasus <ArrowRight size={15} /></button></div>
  </div>;

  const renderExplore = () => <div className="content">
    <PageTitle eyebrow="EXPLORE COMPANY" title="Kenali perusahaan" desc="Pelajari bagaimana setiap bagian perusahaan saling terhubung melalui sistem informasi." />
    <div className="company-banner"><div><span className="pill pill-light">STUDI KASUS SIM</span><h2>Nusantara Mart</h2><p>Perusahaan retail lokal yang mengelola penjualan produk UMKM Sulawesi Selatan.</p><div className="company-meta"><span><Building2 size={15} /> 4 Departemen</span><span><Database size={15} /> Sistem terintegrasi</span></div></div><div className="company-illustration"><div className="mini-building"><div className="mini-roof" /><div className="mini-front"><div className="mini-label">N MART</div><div className="mini-windows"><i /><i /><i /></div></div></div><div className="mini-cloud c1" /><div className="mini-cloud c2" /></div></div>
    <div className="section-heading"><div><h3>Departemen perusahaan</h3><p>Pilih departemen untuk melihat fungsi dan aliran informasinya.</p></div></div>
    <div className="department-grid">{departments.map(d => { const Icon = d.icon; return <button className={`department-card ${activeDept === d.id ? 'selected' : ''}`} key={d.id} onClick={() => setActiveDept(d.id)}><div className={`feature-icon ${d.color}-bg`}><Icon size={20} /></div><h4>{d.title}</h4><p>{d.subtitle}</p><ChevronRight size={17} className="dept-arrow" /></button> })}</div>
    <div className="detail-panel"><div className={`feature-icon ${departments.find(d => d.id === activeDept).color}-bg`}>{React.createElement(departments.find(d => d.id === activeDept).icon, { size: 21 })}</div><div><span className="eyebrow">DEPARTMENT OVERVIEW</span><h3>{departments.find(d => d.id === activeDept).title}</h3><p>{departments.find(d => d.id === activeDept).detail}</p></div></div>
    <div className="experience-grid">
      <div className="experience-card ar-card"><div className="experience-icon"><ScanLine size={22} /></div><div><span className="eyebrow">AUGMENTED REALITY</span><h3>Explore with AR</h3><p>Lihat objek sistem informasi dalam bentuk 3D melalui perangkat Anda.</p><button className="btn btn-primary" onClick={() => setArOpen(true)}>Buka pengalaman AR <ArrowRight size={16} /></button></div></div>
      <div className="experience-card vr-card"><div className="experience-icon"><Glasses size={22} /></div><div><span className="eyebrow">VIRTUAL REALITY</span><h3>Explore with VR</h3><p>Jelajahi lingkungan perusahaan virtual dan kenali proses operasionalnya.</p><button className="btn btn-dark" onClick={() => setVrOpen(true)}>Masuk lingkungan VR <ArrowRight size={16} /></button></div></div>
    </div>
    <div className="bottom-action"><span>Sudah mengenal perusahaan?</span><button className="btn btn-primary" onClick={() => { mark('explore'); go('case') }}>Lanjut ke business case <ArrowRight size={16} /></button></div>
    {arOpen && <Modal title="AR Inventory Scanner" wide close={() => setArOpen(false)}><ARScanner onClose={() => setArOpen(false)} /></Modal>}
    {vrOpen && <Modal title="VR Exploration" wide close={() => setVrOpen(false)}><WarehouseVR onClose={() => setVrOpen(false)} /></Modal>}
  </div>;

  const renderCase = () => <div className="content">
    <PageTitle eyebrow="BUSINESS CASE" title="The Missing Inventory" desc="Analisis kasus berikut dan temukan penyebab perbedaan data persediaan perusahaan." />
    <div className="case-intro"><div className="case-symbol"><AlertTriangle size={24} /></div><div><span className="tag tag-warning">OPERATIONAL ISSUE</span><h3>Ketika data stok tidak sesuai</h3><p>Nusantara Mart menemukan perbedaan antara jumlah stok yang tercatat dalam sistem dan jumlah barang yang tersedia di gudang.</p></div></div>
    <div className="stats-grid"><Stat label="Stok dalam sistem" value="50" unit="unit" icon={Database} color="blue" /><Stat label="Stok aktual gudang" value="35" unit="unit" icon={Package} color="green" /><Stat label="Selisih persediaan" value="15" unit="unit" icon={AlertTriangle} color="orange" /></div>
    <div className="case-layout"><div className="panel"><div className="panel-heading"><div><h3>Informasi kasus</h3><p>Data awal yang tersedia untuk investigasi.</p></div><span className="tag">SIMULATION DATA</span></div><div className="data-row"><span>Produk</span><strong>Kopi khas Sulawesi</strong></div><div className="data-row"><span>Stok tercatat</span><strong>50 unit</strong></div><div className="data-row"><span>Stok fisik</span><strong>35 unit</strong></div><div className="data-row"><span>Selisih</span><strong className="danger-text">15 unit</strong></div><div className="data-row"><span>Status</span><span className="status-warning">Perlu investigasi</span></div></div><div className="panel impact-panel"><div className="impact-icon"><TrendingUp size={21} /></div><h3>Dampak terhadap bisnis</h3><ul><li>Risiko menerima pesanan melebihi stok.</li><li>Informasi persediaan menjadi tidak akurat.</li><li>Keputusan pembelian ulang berpotensi keliru.</li></ul><div className="local-note"><Lightbulb size={17} /><span>Produk dalam kasus terinspirasi dari produk UMKM Sulawesi Selatan.</span></div></div></div>
    <div className="question-panel"><span className="eyebrow">YOUR MISSION</span><h3>Apa yang mungkin menyebabkan selisih persediaan ini?</h3><p>Periksa kemungkinan kesalahan pencatatan, transaksi yang belum diperbarui, atau proses barang masuk dan keluar.</p><button className="btn btn-primary" onClick={() => { mark('case'); go('ai') }}>Mulai investigasi dengan AI <ArrowRight size={16} /></button></div>
  </div>;

  const renderAI = () => <div className="content">
    <PageTitle eyebrow="AI INVESTIGATION" title="Investigasi bersama AI" desc="Gunakan informasi yang tersedia untuk menganalisis penyebab selisih persediaan." />
    <div className="ai-layout"><div className="chat-panel"><div className="chat-header"><div className="ai-avatar"><Bot size={21} /></div><div><strong>SIM Assistant</strong><span><i /> Business Investigation Assistant</span></div><span className="powered">AI ASSISTANT</span></div><div className="chat-messages">{messages.map((m, i) => <div className={`message-row ${m.from}`} key={i}>{m.from === 'ai' && <div className="message-avatar"><Sparkles size={15} /></div>}<div className="message-bubble">{m.text}</div></div>)}</div><div className="suggestions"><span>Suggested questions</span><div><button onClick={() => setChatInput('Data apa yang perlu diperiksa terlebih dahulu?')}>Data apa yang perlu diperiksa?</button><button onClick={() => setChatInput('Bagaimana transaksi penjualan memengaruhi stok?')}>Bagaimana stok diperbarui?</button></div></div><div className="chat-input"><input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Tulis pertanyaan Anda..." /><button onClick={sendMessage} aria-label="Kirim pesan"><Send size={18} /></button></div><div className="demo-disclaimer">Mode demonstrasi: respons saat ini menggunakan contoh percakapan. Integrasi Gemini API dilakukan pada tahap implementasi backend.</div></div><aside className="investigation-side"><div className="panel"><div className="panel-heading"><h3>Case overview</h3><span className="tag tag-warning">ACTIVE</span></div><p className="side-case-title">The Missing Inventory</p><div className="mini-stat"><span>Stok sistem</span><strong>50 unit</strong></div><div className="mini-stat"><span>Stok aktual</span><strong>35 unit</strong></div><div className="mini-stat"><span>Selisih</span><strong className="danger-text">15 unit</strong></div></div><div className="panel"><h3>Investigation checklist</h3><p className="panel-sub">Hal yang perlu diperiksa</p>{['Riwayat transaksi penjualan', 'Barang masuk dan keluar', 'Pembaruan data persediaan'].map((x, i) => <div className="check-line" key={x}><CheckCircle2 size={16} />{x}</div>)}</div><div className="hint-card"><Lightbulb size={18} /><div><strong>Learning tip</strong><p>Jangan langsung menyimpulkan. Gunakan data untuk mendukung setiap dugaan.</p></div></div></aside></div>
    <div className="decision-panel"><div><span className="eyebrow">DECISION MAKING</span><h3>Tentukan rekomendasi Anda</h3><p>Pilih tindakan yang paling tepat dan jelaskan alasan Anda.</p></div><div className="decision-options">{[{ id: 'audit', title: 'Audit persediaan', desc: 'Periksa transaksi dan pergerakan barang.' }, { id: 'sync', title: 'Sinkronisasi data', desc: 'Perbarui data stok dalam sistem.' }, { id: 'procedure', title: 'Perbaiki prosedur', desc: 'Perbaiki pencatatan barang masuk dan keluar.' }].map(o => <button key={o.id} className={`decision-option ${decision === o.id ? 'chosen' : ''}`} onClick={() => { setDecision(o.id); setSubmitted(false) }}><span className="choice-radio" /><span><strong>{o.title}</strong><small>{o.desc}</small></span></button>)}</div><textarea value={reason} onChange={e => { setReason(e.target.value); setSubmitted(false) }} placeholder="Jelaskan alasan keputusan berdasarkan data yang tersedia..." /><div className="decision-footer"><span className="muted">Jawaban Anda akan digunakan untuk evaluasi.</span><button className="btn btn-primary" disabled={!reason.trim()} onClick={submitDecision}>Kirim keputusan <ArrowRight size={16} /></button></div>{submitted && <div className="feedback-box"><CheckCircle2 size={19} /><div><strong>Keputusan berhasil dicatat.</strong><p>Rekomendasi Anda: {decision === 'audit' ? 'Audit persediaan' : decision === 'sync' ? 'Sinkronisasi data' : 'Perbaikan prosedur pencatatan'}. Periksa kembali riwayat transaksi dan bukti stok sebelum melakukan perubahan data. Feedback ini merupakan contoh evaluasi awal.</p><button className="text-btn" onClick={() => go('result')}>Lihat hasil pembelajaran <ArrowRight size={15} /></button></div></div>}</div>
  </div>;

  const renderResult = () => <div className="content">
    <PageTitle eyebrow="LEARNING RESULT" title="Hasil pembelajaran" desc="Lihat ringkasan aktivitas dan refleksi dari simulasi yang telah Anda lakukan." />
    <div className="result-hero"><div className="result-check"><CheckCircle2 size={32} /></div><span className="pill pill-success">LEARNING SUMMARY</span><h2>Terus tingkatkan kemampuan analisis Anda!</h2><p>Anda telah mempelajari proses bisnis perusahaan dan menyelesaikan simulasi The Missing Inventory.</p><div className="result-stats"><div><strong>{completed.length}/3</strong><span>Aktivitas selesai</span></div><div><strong>{submitted ? 'Selesai' : 'Dalam proses'}</strong><span>Status simulasi</span></div></div></div>
    <div className="result-columns"><div className="panel"><h3>Kompetensi yang dipelajari</h3>{[{ t: 'Mengidentifikasi komponen SIM', d: 'Mengenali fungsi departemen dan perangkat informasi.' }, { t: 'Memahami integrasi informasi', d: 'Menjelaskan hubungan penjualan, gudang, dan manajemen.' }, { t: 'Menganalisis masalah operasional', d: 'Menggunakan data untuk memahami selisih persediaan.' }, { t: 'Menentukan rekomendasi', d: 'Memilih tindakan berdasarkan hasil investigasi.' }].map((x, i) => <div className="competency" key={i}><CheckCircle2 size={17} /><div><strong>{x.t}</strong><p>{x.d}</p></div></div>)}</div><div className="panel"><h3>Refleksi pembelajaran</h3><div className="reflection-icon"><Lightbulb size={23} /></div><p className="reflection-text">Sistem informasi yang terintegrasi membantu perusahaan menjaga konsistensi data dan mendukung keputusan operasional. Keakuratan informasi juga bergantung pada prosedur dan kedisiplinan pengguna.</p><div className="local-note"><Sparkles size={17} /><span>Ingat prinsip sipakatau, sipakalebbi, dan sipakainge dalam berkolaborasi dan bertanggung jawab.</span></div></div></div>
    <div className="bottom-action"><button className="btn btn-outline" onClick={() => { setMessages(initialMessages); setReason(''); setSubmitted(false); setCompleted([]); go('dashboard') }}><RotateCcw size={16} /> Ulangi pembelajaran</button><button className="btn btn-primary" onClick={() => go('dashboard')}>Kembali ke dashboard <ArrowRight size={16} /></button></div>
  </div>;

  const current = { dashboard: renderDashboard, explore: renderExplore, case: renderCase, ai: renderAI, result: renderResult }[page]();
  return <div className="app-shell"><Sidebar /><main className="main-area"><Header />{current}<footer className="footer"><span>© 2026 SIM Learning Lab</span><span>Dikembangkan oleh Arian Nurrifqhi · Interactive learning experience · Sistem Informasi Manajemen</span></footer></main></div>;
}

function Stat({ label, value, unit, icon: Icon, color }) {
  return <div className="stat-card"><div className={`feature-icon ${color}-bg`}><Icon size={19} /></div><div><span>{label}</span><strong>{value} <small>{unit}</small></strong></div></div>;
}
function Modal({ title, close, children, wide = false }) {
  return <div className="modal-backdrop" onClick={close}><div className={`modal ${wide ? 'modal-wide' : ''}`} onClick={e => e.stopPropagation()}><div className="modal-head"><strong>{title}</strong><button className="icon-btn" onClick={close}><X size={18} /></button></div>{children}</div></div>;
}
