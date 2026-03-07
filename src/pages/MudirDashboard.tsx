import { motion } from "framer-motion";
import { Users, BookOpen, AlertTriangle, Shield, Star, TrendingUp, Clock, Calendar, ChevronRight, Activity } from "lucide-react";
import { StatusBadge } from "@/components/simaka/StatusBadge";
import { StatCard } from "@/components/simaka/StatCard";
import { AlertItem } from "@/components/simaka/AlertItem";

const kpiPositive = [
  { text: "Kelas 3 Fiqih 100% hadir hari ini", icon: "🌟" },
  { text: "Halaqoh Al-Mulk setor 15 santri, melebihi target", icon: "🌟" },
];

const kpiNegative = [
  { text: "Halaqoh Al-Kahfi: 3 santri belum setoran 3 hari", icon: "⚠️" },
  { text: "Asrama Al-Farabi kehadiran Subuh hanya 72%", icon: "⚠️" },
];

const alerts = [
  { type: "critical" as const, message: "Ust. Rizal belum membuka sesi Halaqoh Subuh", time: "15 menit lalu" },
  { type: "warning" as const, message: "Kehadiran Subuh turun 15% dibanding pekan lalu", time: "Analisis harian" },
  { type: "warning" as const, message: "3 tagihan SPP melewati jatuh tempo", time: "Perlu tindakan" },
];

const recentSessions = [
  { name: "Halaqoh Subuh - Al-Mulk", status: "DONE", time: "06:00 - 06:45", pic: "Ust. Ahmad" },
  { name: "Kelas 3 - Fiqih", status: "OPEN", time: "08:00 - 09:30", pic: "Ust. Hasan" },
  { name: "Asrama Al-Farabi - Piket", status: "SCHEDULED", time: "10:00 - 10:30", pic: "Ust. Rizal" },
  { name: "Halaqoh Dhuha - An-Naba", status: "SCHEDULED", time: "10:00 - 11:00", pic: "Ust. Bilal" },
];

const sessionStatusStyle: Record<string, string> = {
  DONE: "bg-success/10 text-success",
  OPEN: "bg-accent/15 text-accent-foreground",
  SCHEDULED: "bg-muted text-muted-foreground",
  MISSED: "bg-destructive/10 text-destructive",
};

export default function MudirDashboard() {
  const currentDate = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/60 bg-card/50 backdrop-blur-lg sticky top-0 z-30">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight">SIMAKA</h1>
              <p className="text-xs text-muted-foreground">Command Center — Mudir</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden md:block">{currentDate}</span>
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
              M
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 py-6 space-y-6">
        {/* Pondok Status Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-elevated rounded-2xl p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Status Pondok Hari Ini</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Ringkasan operasional pesantren secara real-time
              </p>
            </div>
            <StatusBadge status="PERLU_PERHATIAN" size="lg" />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Santri Aktif" value="487" subtitle="+3 bulan ini" variant="default" />
          <StatCard icon={BookOpen} label="Setoran Bulan Ini" value="1.284" subtitle="Target: 1.500" variant="gold" />
          <StatCard icon={Shield} label="Kasus Pelanggaran" value="12" subtitle="↓ 8% dari bulan lalu" variant="success" />
          <StatCard icon={TrendingUp} label="Kehadiran Rata-rata" value="91%" subtitle="Semua modul" variant="default" />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Alerts */}
          <div className="lg:col-span-2 glass-card rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                Peringatan Aktif
              </h3>
              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full font-medium">
                {alerts.length}
              </span>
            </div>
            <div className="space-y-3">
              {alerts.map((alert, i) => (
                <AlertItem key={i} {...alert} />
              ))}
            </div>
          </div>

          {/* KPI Panel */}
          <div className="lg:col-span-3 glass-card rounded-xl p-5 space-y-5">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Star className="h-4 w-4 text-accent" />
              Pantauan Kinerja
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Positive */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-success uppercase tracking-wider">Alhamdulillah</p>
                {kpiPositive.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-success/5 border border-success/10">
                    <span className="text-base">{item.icon}</span>
                    <p className="text-sm text-card-foreground leading-snug">{item.text}</p>
                  </div>
                ))}
              </div>
              {/* Negative */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-warning uppercase tracking-wider">Perlu Perhatian</p>
                {kpiNegative.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-warning/5 border border-warning/10">
                    <span className="text-base">{item.icon}</span>
                    <p className="text-sm text-card-foreground leading-snug">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="glass-card rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Sesi Hari Ini
            </h3>
            <button className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
              Lihat Semua <ChevronRight className="h-3 w-3" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {recentSessions.map((session, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between p-3.5 rounded-lg border border-border/40 hover:bg-muted/30 transition-colors"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium text-card-foreground">{session.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {session.time} · {session.pic}
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${sessionStatusStyle[session.status]}`}>
                  {session.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
