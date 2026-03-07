import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ClipboardList, BookOpen, User, Clock, Users, ChevronRight, CheckCircle2, Calendar, Award } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "beranda" | "sesi" | "setoran" | "profil";

const upcomingSessions = [
  { id: 1, title: "Kelas 2 - Nahwu", time: "08:00 - 09:30", santriCount: 18, type: "AKADEMIK", status: "SCHEDULED" },
  { id: 2, title: "Piket Asrama Al-Farabi", time: "10:00 - 10:30", santriCount: 24, type: "KESANTRIAN", status: "SCHEDULED" },
];

const recentSetoran = [
  { nama: "Ahmad Fauzan", surah: "Al-Mulk: 1-15", kriteria: "JAYYID_JIDDAN", time: "Kemarin" },
  { nama: "Umar Faruq", surah: "An-Naba: 1-20", kriteria: "MUMTAZ", time: "Kemarin" },
  { nama: "Zaid Ibrahim", surah: "Al-Mulk: 16-30", kriteria: "JAYYID", time: "2 hari lalu" },
];

const kriteriaColor: Record<string, string> = {
  MUMTAZ: "bg-success/10 text-success",
  JAYYID_JIDDAN: "bg-primary/10 text-primary",
  JAYYID: "bg-accent/15 text-accent-foreground",
  MAQBUL: "bg-warning/10 text-warning",
  RASIB: "bg-destructive/10 text-destructive",
};

const tabItems: { id: Tab; icon: typeof Home; label: string }[] = [
  { id: "beranda", icon: Home, label: "Beranda" },
  { id: "sesi", icon: ClipboardList, label: "Sesi" },
  { id: "setoran", icon: BookOpen, label: "Setoran" },
  { id: "profil", icon: User, label: "Profil" },
];

export default function UstadzMobile() {
  const [activeTab, setActiveTab] = useState<Tab>("beranda");

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <AnimatePresence mode="wait">
          {activeTab === "beranda" && <BerandaTab key="beranda" />}
          {activeTab === "sesi" && <SesiTab key="sesi" />}
          {activeTab === "setoran" && <SetoranTab key="setoran" />}
          {activeTab === "profil" && <ProfilTab key="profil" />}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card/90 backdrop-blur-xl border-t border-border/50 px-4 pb-2 pt-1 z-40">
        <div className="flex items-center justify-around">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn("bottom-nav-item", activeTab === tab.id ? "bottom-nav-item-active" : "bottom-nav-item-inactive")}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div layoutId="tab-indicator" className="absolute -top-1 h-0.5 w-8 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

function BerandaTab() {
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="p-5 space-y-5">
      {/* Greeting */}
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Assalamu'alaikum,</p>
        <h1 className="text-xl font-bold text-foreground">Ust. Ahmad</h1>
        <p className="text-xs text-muted-foreground">
          {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Context-Aware Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl bg-primary p-5 space-y-4"
      >
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs text-primary-foreground/70 font-medium uppercase tracking-wider">Sekarang</p>
            <h2 className="text-lg font-bold text-primary-foreground">Halaqoh Subuh</h2>
            <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
              <Clock className="h-3.5 w-3.5" />
              <span>06:00 - 06:45</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-primary-foreground/70 text-sm bg-primary-foreground/10 rounded-lg px-2.5 py-1">
            <Users className="h-3.5 w-3.5" />
            <span>10 Santri</span>
          </div>
        </div>
        <button className="w-full h-12 rounded-xl bg-primary-foreground text-primary font-bold text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
          MULAI SESI
        </button>
      </motion.div>

      {/* Upcoming */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Sesi Berikutnya</h3>
        {upcomingSessions.map((s) => (
          <div key={s.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-card-foreground">{s.title}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {s.time} · {s.santriCount} santri
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </div>

      {/* Muhasabah Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-4 space-y-3"
      >
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-accent" />
          <h3 className="text-sm font-semibold text-foreground">Muhasabah Bulan Ini</h3>
        </div>
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">Kehadiran Mengajar</p>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[92%] rounded-full bg-primary transition-all" />
            </div>
          </div>
          <span className="text-lg font-bold text-foreground">22<span className="text-muted-foreground font-normal text-sm">/24</span></span>
        </div>
        <p className="text-xs text-success font-medium">92% — Masya Allah, konsisten! 💪</p>
      </motion.div>
    </motion.div>
  );
}

function SesiTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 space-y-4">
      <h2 className="text-lg font-bold text-foreground">Sesi Hari Ini</h2>
      <div className="space-y-3">
        {[
          { title: "Halaqoh Subuh - Al-Mulk", time: "06:00 - 06:45", status: "DONE", santri: 10 },
          { title: "Kelas 2 - Nahwu", time: "08:00 - 09:30", status: "SCHEDULED", santri: 18 },
          { title: "Piket Al-Farabi", time: "10:00 - 10:30", status: "SCHEDULED", santri: 24 },
        ].map((s, i) => (
          <div key={i} className="glass-card rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-card-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" /> {s.time} · {s.santri} santri
                </p>
              </div>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full font-medium",
                s.status === "DONE" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
              )}>
                {s.status === "DONE" ? "✓ Selesai" : "Terjadwal"}
              </span>
            </div>
            {s.status === "SCHEDULED" && (
              <button className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-semibold mt-2 active:scale-[0.98] transition-transform">
                Buka Sesi
              </button>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SetoranTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Setoran Tahfidz</h2>
        <button className="text-xs text-primary font-medium bg-primary/10 px-3 py-1.5 rounded-lg">+ Catat Setoran</button>
      </div>
      <div className="space-y-3">
        {recentSetoran.map((s, i) => (
          <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary shrink-0">
              {s.nama.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-card-foreground">{s.nama}</p>
              <p className="text-xs text-muted-foreground">{s.surah} · {s.time}</p>
            </div>
            <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-semibold", kriteriaColor[s.kriteria])}>
              {s.kriteria.replace("_", " ")}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ProfilTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 space-y-5">
      <div className="flex flex-col items-center text-center space-y-3 pt-4">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
          UA
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Ust. Ahmad Firdaus</h2>
          <p className="text-sm text-muted-foreground">Muhaffidz · Musyrif Asrama Al-Farabi</p>
        </div>
      </div>

      <div className="glass-card rounded-xl divide-y divide-border/40">
        {[
          { label: "NIP", value: "UST-2024-001" },
          { label: "Halaqoh", value: "Al-Mulk (10 Santri)" },
          { label: "Asrama", value: "Al-Farabi" },
          { label: "Jabatan", value: "Muhaffidz, Musyrif" },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between px-4 py-3.5">
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <span className="text-sm font-medium text-card-foreground">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-foreground">92%</p>
          <p className="text-xs text-muted-foreground mt-1">Kehadiran</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-foreground">156</p>
          <p className="text-xs text-muted-foreground mt-1">Total Setoran</p>
        </div>
      </div>
    </motion.div>
  );
}
