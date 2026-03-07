import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, BookOpen, Home, Settings, CreditCard, Calendar,
  Search, Bell, ChevronLeft, ChevronRight, Menu, Shield,
  GraduationCap, Building2, BookMarked, FileText, BarChart3,
  Warehouse, ClipboardList, Receipt, DollarSign, Layers,
  ChevronDown, TrendingUp, TrendingDown, AlertTriangle,
  CheckCircle2, Clock, MapPin, UserCheck, Bookmark, Package,
  PieChart, ArrowUpRight, ArrowDownRight, CircleDot
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/simaka/StatusBadge";

// ─── Sidebar Config ───
const sidebarSections = [
  {
    label: "MASTER DATA",
    items: [
      { icon: Users, label: "Data Santri" },
      { icon: GraduationCap, label: "Ustadz" },
      { icon: Calendar, label: "Tahun Ajaran" },
      { icon: ClipboardList, label: "Catatan Kelas" },
    ],
  },
  {
    label: "AKADEMIK",
    items: [
      { icon: BookOpen, label: "Data Akademik" },
    ],
  },
  {
    label: "TAHFIDZ",
    items: [
      { icon: BookMarked, label: "Halaqoh Tahfidz" },
      { icon: Layers, label: "Kurikulum Tahfidz" },
    ],
  },
  {
    label: "KESANTRIAN",
    items: [
      { icon: Building2, label: "Asrama" },
      { icon: Shield, label: "Catatan Pelanggaran" },
      { icon: FileText, label: "Informasi Izin/Sakit" },
    ],
  },
  {
    label: "SARANA",
    items: [
      { icon: Package, label: "Data Sarana" },
      { icon: Warehouse, label: "Inventaris" },
      { icon: FileText, label: "Laporan Sarana" },
    ],
  },
  {
    label: "KEUANGAN",
    items: [
      { icon: Receipt, label: "Pembayaran Biaya" },
      { icon: DollarSign, label: "SPP/Manajemen" },
      { icon: CreditCard, label: "Status Tunggakan" },
      { icon: BarChart3, label: "Laporan Keuangan" },
    ],
  },
  {
    label: "PENGATURAN PONDOK",
    items: [
      { icon: Calendar, label: "Kalender Pondok" },
      { icon: ClipboardList, label: "Jadwal Kelas" },
      { icon: PieChart, label: "Unit Edukasi" },
      { icon: Settings, label: "Manajemen Semester" },
    ],
  },
];

// ─── Dashboard Data ───
const pembinaanAlerts = [
  { type: "danger" as const, text: "Alhamdulillah, tidak ada yang perlu perhatian khusus." },
];

const modulAkademik = [
  { label: "Kelas Aktif", value: "12" },
  { label: "Kuota Terpakai", value: "487" },
  { label: "Jadwal Aktif", value: "36" },
  { label: "Catatan Kelas", value: "8" },
];

const modulTahfidz = [
  { label: "Halaqoh Aktif", value: "24" },
  { label: "Jumlah Pertemuan", value: "312" },
  { label: "Kehadiran", value: "94%" },
  { label: "Setoran", value: "1.284" },
  { label: "Level", value: "—", highlight: true },
];

const modulKesantrian = [
  { label: "Asrama", value: "6" },
  { label: "Kamar di Asrama", value: "48" },
  { label: "Pelanggaran Aktif", value: "12", variant: "warning" as const },
  { label: "Perizinan Proses", value: "3", variant: "warning" as const },
];

const pelanggaranBulan = {
  total: 12,
  categories: [
    { label: "Perilaku", value: 5, color: "bg-primary" },
    { label: "Ringan", value: 4, color: "bg-warning" },
    { label: "Sedang", value: 2, color: "bg-accent" },
    { label: "Berat", value: 1, color: "bg-destructive" },
  ],
};

const masterData = {
  santri: [
    { label: "Laki-laki", value: 285, color: "bg-primary" },
    { label: "Perempuan", value: 202, color: "bg-accent" },
    { label: "Non-aktif", value: 0, color: "bg-muted-foreground" },
  ],
  stakeholder: [
    { label: "Aktif", value: 32, color: "bg-primary" },
    { label: "Tamu", value: 7, color: "bg-accent" },
    { label: "Non-aktif", value: 0, color: "bg-muted-foreground" },
  ],
};

const modulKeuangan = {
  stats: [
    { label: "Komponen Biaya", value: "3" },
    { label: "Total Tagihan", value: "Rp 245jt" },
    { label: "Lunas", value: "189", variant: "success" as const },
    { label: "Belum Lunas", value: "56", variant: "danger" as const },
  ],
  pembayaran: { terbayar: "Rp 180jt", sisa: "Rp 65jt" },
};

const modulSarpras = [
  { label: "Total Inventaris", value: "320" },
  { label: "Total Jenis", value: "24" },
  { label: "Laporan Pending", value: "5", variant: "warning" as const },
  { label: "Laporan Bulan Ini", value: "12", variant: "success" as const },
];

const rekapKehadiran = [
  { label: "Hari Kehadiran", value: "22" },
  { label: "Hari Tidak Hadir", value: "2", variant: "warning" as const },
  { label: "Belum Terjadwal", value: "1", variant: "muted" as const },
  { label: "Hari Effektif", value: "25" },
];

// ─── Sub Components ───
function MiniStat({ label, value, variant }: { label: string; value: string; variant?: "success" | "warning" | "danger" | "muted" }) {
  const variantClasses = {
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    danger: "bg-destructive/10 text-destructive border-destructive/20",
    muted: "bg-muted text-muted-foreground border-border/50",
  };
  return (
    <div className={cn(
      "rounded-xl p-4 border transition-all hover:shadow-sm",
      variant ? variantClasses[variant] : "bg-card border-border/50"
    )}>
      <p className="text-[11px] uppercase tracking-wider font-medium opacity-70 mb-1">{label}</p>
      <p className={cn("text-xl font-bold", !variant && "text-card-foreground")}>{value}</p>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, badge }: { icon: typeof Users; title: string; badge?: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <h3 className="text-sm font-bold text-foreground tracking-tight">{title}</h3>
      {badge && (
        <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{badge}</span>
      )}
    </div>
  );
}

function DonutMini({ items, total }: { items: { label: string; value: number; color: string }[]; total: number }) {
  // Simple horizontal bar representation
  return (
    <div className="space-y-3">
      <div className="flex h-3 rounded-full overflow-hidden bg-muted/50 gap-0.5">
        {items.map((item, i) => (
          <div
            key={i}
            className={cn("h-full rounded-full transition-all", item.color)}
            style={{ width: `${Math.max((item.value / Math.max(total, 1)) * 100, 4)}%` }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={cn("h-2.5 w-2.5 rounded-full", item.color)} />
            <span>{item.value}</span>
            <span className="opacity-60">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───
export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Overview");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    Object.fromEntries(sidebarSections.map(s => [s.label, true]))
  );
  const currentDate = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const toggleSection = (label: string) => {
    setExpandedSections(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* ─── Sidebar ─── */}
      <aside className={cn(
        "bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 shrink-0 overflow-hidden",
        sidebarOpen ? "w-60" : "w-[52px]"
      )}>
        {/* Logo */}
        <div className="px-3 py-4 flex items-center gap-2.5 border-b border-sidebar-border">
          <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
            <BookOpen className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          {sidebarOpen && (
            <div className="min-w-0">
              <p className="text-sm font-bold text-sidebar-foreground truncate">SIMAKA</p>
              <p className="text-[10px] text-sidebar-foreground/50 truncate">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Overview Link */}
        <div className="px-2 pt-3 pb-1">
          <button
            onClick={() => setActiveItem("Overview")}
            className={cn(
              "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-all",
              activeItem === "Overview"
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/40"
            )}
          >
            <Home className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span>Overview</span>}
          </button>
        </div>

        {/* Nav Sections */}
        <nav className="flex-1 px-2 pb-3 overflow-y-auto space-y-1 scrollbar-thin">
          {sidebarSections.map((section) => (
            <div key={section.label}>
              {sidebarOpen && (
                <button
                  onClick={() => toggleSection(section.label)}
                  className="w-full flex items-center justify-between px-2.5 py-2 mt-2"
                >
                  <span className="text-[10px] font-bold text-sidebar-foreground/40 uppercase tracking-widest">{section.label}</span>
                  <ChevronDown className={cn(
                    "h-3 w-3 text-sidebar-foreground/30 transition-transform",
                    !expandedSections[section.label] && "-rotate-90"
                  )} />
                </button>
              )}
              {(expandedSections[section.label] || !sidebarOpen) && (
                <div className="space-y-0.5">
                  {section.items.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setActiveItem(item.label)}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-all",
                        activeItem === item.label
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground/60 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground/80"
                      )}
                    >
                      <item.icon className="h-3.5 w-3.5 shrink-0" />
                      {sidebarOpen && <span className="truncate">{item.label}</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Collapse */}
        <div className="p-2 border-t border-sidebar-border">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-2 py-2 rounded-lg text-sidebar-foreground/40 hover:bg-sidebar-accent/30 transition-all text-xs"
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            {sidebarOpen && <span>Tutup</span>}
          </button>
        </div>
      </aside>

      {/* ─── Main ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-13 border-b border-border/60 bg-card/50 backdrop-blur-lg flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-1.5 rounded-md hover:bg-muted">
              <Menu className="h-5 w-5 text-muted-foreground" />
            </button>
            <span className="text-sm text-muted-foreground">Overview</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari santri, ustadz..."
                className="h-9 pl-9 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 w-56"
              />
            </div>
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full" />
            </button>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
              AD
            </div>
          </div>
        </header>

        {/* ─── Content ─── */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-[1200px] mx-auto px-6 py-6 space-y-6">
            {/* Greeting */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-foreground">Selamat Datang, Admin</h1>
                  <p className="text-sm text-muted-foreground">Ringkasan lengkap operasional pondok</p>
                </div>
                <button className="h-9 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
                  <Users className="h-4 w-4" />
                  Tambah Santri
                </button>
              </div>
            </motion.div>

            {/* Pondok Status */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="glass-card-elevated rounded-2xl p-5 flex items-center gap-4"
            >
              <div className="h-11 w-11 rounded-xl bg-success/15 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div className="flex-1">
                <p className="text-base font-bold text-foreground">PONDOK BERJALAN NORMAL</p>
                <p className="text-xs text-muted-foreground">{currentDate}</p>
              </div>
              <StatusBadge status="NORMAL" size="lg" />
            </motion.div>

            {/* Pembinaan Umum */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
              <SectionHeader icon={Shield} title="Pembinaan Umum" badge="Hari ini" />
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-success/20 bg-success/5 p-4">
                  <p className="text-xs font-semibold text-success mb-2">Reka Kebaikan ✨</p>
                  <p className="text-sm text-card-foreground">Alhamdulillah, tidak ada yang perlu perhatian khusus.</p>
                </div>
                <div className="rounded-xl border border-muted bg-muted/30 p-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Alhamdulillah ☀️</p>
                  <p className="text-sm text-muted-foreground">Belum ada catatan info hari ini. Seluruh berjalan semestinya.</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Stats */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Users, label: "Total Santri Aktif", value: "487", sub: "Santri Aktif", trend: "+3" },
                  { icon: GraduationCap, label: "Total Pengajar", value: "32", sub: "Guru & Ustadz" },
                  { icon: BookMarked, label: "Skor Tahfidz Bulan Ini", value: "1.284", sub: "Setoran terlaksana", trend: "+12%" },
                  { icon: Bookmark, label: "Setoran Bulan Ini", value: "312", sub: "Target: 500", trend: "62%" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.12 + i * 0.04 }}
                    className="glass-card rounded-xl p-4 flex items-start gap-3 group hover:shadow-lg transition-shadow"
                  >
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-muted-foreground font-medium truncate">{stat.label}</p>
                      <p className="text-2xl font-bold text-card-foreground tracking-tight">{stat.value}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] text-muted-foreground">{stat.sub}</span>
                        {stat.trend && (
                          <span className="text-[10px] font-semibold text-success flex items-center gap-0.5">
                            <ArrowUpRight className="h-3 w-3" />{stat.trend}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Modul Akademik */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <SectionHeader icon={BookOpen} title="Modul Akademik" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {modulAkademik.map((m, i) => <MiniStat key={i} {...m} />)}
              </div>
            </motion.div>

            {/* Modul Tahfidz */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
              <SectionHeader icon={BookMarked} title="Modul Tahfidz" />
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {modulTahfidz.map((m, i) => (
                  <div key={i} className={cn(
                    "rounded-xl p-4 border transition-all hover:shadow-sm",
                    m.highlight ? "bg-accent/10 border-accent/30" : "bg-card border-border/50"
                  )}>
                    <p className="text-[11px] uppercase tracking-wider font-medium text-muted-foreground mb-1">{m.label}</p>
                    <p className={cn("text-xl font-bold", m.highlight ? "text-accent" : "text-card-foreground")}>{m.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Modul Kesantrian + Pelanggaran */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.21 }}>
              <SectionHeader icon={Building2} title="Modul Kesantrian" />
              <div className="grid lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2 grid grid-cols-2 gap-3">
                  {modulKesantrian.map((m, i) => <MiniStat key={i} {...m} />)}
                </div>
                <div className="lg:col-span-3 glass-card rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-card-foreground">Pelanggaran Bulan Ini — Maret 2026</p>
                    <span className="text-2xl font-bold text-card-foreground">{pelanggaranBulan.total}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {pelanggaranBulan.categories.map((cat, i) => (
                      <div key={i} className="text-center">
                        <div className={cn("mx-auto h-12 w-12 rounded-xl flex items-center justify-center text-lg font-bold text-primary-foreground mb-1.5", cat.color)}>
                          {cat.value}
                        </div>
                        <p className="text-[10px] text-muted-foreground font-medium">{cat.label}</p>
                      </div>
                    ))}
                  </div>
                  <DonutMini items={pelanggaranBulan.categories} total={pelanggaranBulan.total} />
                </div>
              </div>
            </motion.div>

            {/* Master Data */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
              <SectionHeader icon={Users} title="Master Data" />
              <div className="grid md:grid-cols-2 gap-4">
                {/* Data Santri */}
                <div className="glass-card rounded-xl p-5">
                  <p className="text-sm font-semibold text-card-foreground mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" /> Data Santri
                  </p>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {masterData.santri.map((item, i) => (
                      <div key={i} className={cn("rounded-xl p-3 text-center", item.color + "/10")}>
                        <p className="text-xl font-bold text-card-foreground">{item.value}</p>
                        <p className="text-[10px] text-muted-foreground">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  <DonutMini items={masterData.santri} total={487} />
                </div>
                {/* Data Stakeholder */}
                <div className="glass-card rounded-xl p-5">
                  <p className="text-sm font-semibold text-card-foreground mb-3 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" /> Data Stakeholder
                  </p>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {masterData.stakeholder.map((item, i) => (
                      <div key={i} className={cn("rounded-xl p-3 text-center", item.color + "/10")}>
                        <p className="text-xl font-bold text-card-foreground">{item.value}</p>
                        <p className="text-[10px] text-muted-foreground">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  <DonutMini items={masterData.stakeholder} total={39} />
                </div>
              </div>
            </motion.div>

            {/* Modul Keuangan */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.27 }}>
              <SectionHeader icon={CreditCard} title="Modul Keuangan" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                {modulKeuangan.stats.map((m, i) => <MiniStat key={i} label={m.label} value={m.value} variant={m.variant as any} />)}
              </div>
              <div className="glass-card rounded-xl p-5">
                <p className="text-sm font-semibold text-card-foreground mb-3">Progres Pembayaran</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>Terbayar: <span className="font-semibold text-success">{modulKeuangan.pembayaran.terbayar}</span></span>
                  <span>Sisa: <span className="font-semibold text-destructive">{modulKeuangan.pembayaran.sisa}</span></span>
                </div>
                <div className="h-3 rounded-full bg-muted/50 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-success" style={{ width: "73%" }} />
                </div>
                <div className="flex justify-between mt-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="h-3 w-3 rounded-full bg-warning/60" />
                    <span className="text-muted-foreground">Payment Pending</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="h-3 w-3 rounded-full bg-success" />
                    <span className="text-muted-foreground">Payment Fulfilled</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Modul Sarpras */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <SectionHeader icon={Package} title="Modul Sarpras" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {modulSarpras.map((m, i) => <MiniStat key={i} label={m.label} value={m.value} variant={m.variant as any} />)}
              </div>
            </motion.div>

            {/* Rekap Kehadiran */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.33 }}>
              <SectionHeader icon={UserCheck} title="Rekap Kehadiran Bulan Ini" badge="Maret 2026" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {rekapKehadiran.map((m, i) => <MiniStat key={i} label={m.label} value={m.value} variant={m.variant as any} />)}
              </div>
            </motion.div>

            <div className="h-8" />
          </div>
        </main>
      </div>
    </div>
  );
}
