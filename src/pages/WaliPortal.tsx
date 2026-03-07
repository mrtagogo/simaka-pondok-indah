import { motion } from "framer-motion";
import { Shield, Clock, CreditCard, BookOpen, ChevronRight, CheckCircle2, AlertCircle, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const timelineItems = [
  { time: "06:00", event: "Halaqoh Subuh", detail: "Hadir — Setoran Al-Mulk: 16-20 (Jayyid Jiddan)", type: "tahfidz" },
  { time: "08:00", event: "Kelas 3 Fiqih", detail: "Hadir", type: "akademik" },
  { time: "10:00", event: "Piket Asrama Al-Farabi", detail: "Hadir", type: "kesantrian" },
  { time: "13:00", event: "Sholat Dzuhur Berjamaah", detail: "Hadir", type: "ibadah" },
  { time: "15:30", event: "Halaqoh Ashar", detail: "Hadir — Murojaah An-Naba: 1-20 (Mumtaz)", type: "tahfidz" },
];

const typeColor: Record<string, string> = {
  tahfidz: "bg-primary/10 border-primary/20",
  akademik: "bg-accent/10 border-accent/20",
  kesantrian: "bg-success/10 border-success/20",
  ibadah: "bg-muted border-border/30",
};

export default function WaliPortal() {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      {/* Header */}
      <header className="bg-primary px-5 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary-foreground/70 text-xs">Assalamu'alaikum,</p>
            <h1 className="text-lg font-bold text-primary-foreground">Bapak Fauzan</h1>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary-foreground/15 flex items-center justify-center text-sm font-bold text-primary-foreground">
            BF
          </div>
        </div>

        {/* Status Hero Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-primary-foreground/10 backdrop-blur-md rounded-2xl p-5 border border-primary-foreground/10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center">
              <Shield className="h-6 w-6 text-success" />
            </div>
            <div>
              <h2 className="text-base font-bold text-primary-foreground">Ahmad Fauzan</h2>
              <p className="text-xs text-primary-foreground/70">Kelas 3 Fiqih · Asrama Al-Farabi</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-success/20 rounded-xl px-4 py-3">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <div>
              <p className="text-sm font-semibold text-primary-foreground">Aman — Tidak Ada Pelanggaran</p>
              <p className="text-xs text-primary-foreground/60">Kehadiran hari ini: 5/5 sesi</p>
            </div>
          </div>
        </motion.div>
      </header>

      <main className="px-5 py-5 space-y-5">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Hafalan", value: "4 Juz", icon: BookOpen },
            { label: "Kehadiran", value: "96%", icon: Calendar },
            { label: "Pelanggaran", value: "0", icon: Shield },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl p-3.5 text-center"
            >
              <stat.icon className="h-4 w-4 mx-auto text-muted-foreground mb-1.5" />
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Aktivitas Hari Ini
            </h3>
            <span className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
            </span>
          </div>

          <div className="space-y-0">
            {timelineItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-3"
              >
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {i < timelineItems.length - 1 && <div className="w-px flex-1 bg-border/60 my-1" />}
                </div>
                <div className={cn("flex-1 rounded-xl p-3 mb-2 border", typeColor[item.type])}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-card-foreground">{item.event}</p>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Financial Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              Keuangan
            </h3>
            <button className="text-xs text-primary font-medium flex items-center gap-0.5">
              Detail <ChevronRight className="h-3 w-3" />
            </button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-success/5 border border-success/10">
            <div>
              <p className="text-xs text-muted-foreground">SPP Maret 2026</p>
              <p className="text-sm font-semibold text-success">Lunas</p>
            </div>
            <CheckCircle2 className="h-5 w-5 text-success" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-warning/5 border border-warning/10">
            <div>
              <p className="text-xs text-muted-foreground">Uang Gedung Semester 2</p>
              <p className="text-sm font-semibold text-warning">Rp 1.500.000</p>
            </div>
            <AlertCircle className="h-5 w-5 text-warning" />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
