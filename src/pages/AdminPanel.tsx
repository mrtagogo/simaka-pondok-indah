import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, BookOpen, Home, Settings, Database, CreditCard, Calendar,
  Search, Filter, ChevronDown, MoreHorizontal, Plus, Shield,
  GraduationCap, Building2, BookMarked, FileText, Bell,
  ChevronLeft, ChevronRight, Menu
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: Home, label: "Overview", active: true },
  { icon: Users, label: "Data Santri" },
  { icon: GraduationCap, label: "Data Ustadz" },
  { icon: Building2, label: "Asrama" },
  { icon: BookMarked, label: "Halaqoh Tahfidz" },
  { icon: Calendar, label: "Program & Jadwal" },
  { icon: BookOpen, label: "Sesi Harian" },
  { icon: Database, label: "Rekap Kehadiran" },
  { icon: Shield, label: "Pelanggaran" },
  { icon: CreditCard, label: "Keuangan" },
  { icon: FileText, label: "Laporan" },
  { icon: Settings, label: "Pengaturan" },
];

const santriData = [
  { nis: "24001", nama: "Ahmad Fauzan", kelas: "3 Fiqih", asrama: "Al-Farabi", halaqoh: "Al-Mulk", status: "AKTIF" },
  { nis: "24002", nama: "Muhammad Rizki", kelas: "2 Nahwu", asrama: "Al-Ghazali", halaqoh: "An-Naba", status: "AKTIF" },
  { nis: "24003", nama: "Abdullah Hakim", kelas: "3 Fiqih", asrama: "Al-Farabi", halaqoh: "Al-Kahfi", status: "AKTIF" },
  { nis: "24004", nama: "Umar Faruq", kelas: "1 Sharaf", asrama: "Ibnu Sina", halaqoh: "Al-Mulk", status: "AKTIF" },
  { nis: "24005", nama: "Aflah Dzaki", kelas: "2 Nahwu", asrama: "Al-Ghazali", halaqoh: "An-Naba", status: "IZIN" },
  { nis: "24006", nama: "Rafi Hidayat", kelas: "3 Fiqih", asrama: "Al-Farabi", halaqoh: "Al-Mulk", status: "AKTIF" },
  { nis: "24007", nama: "Zaid Ibrahim", kelas: "1 Sharaf", asrama: "Ibnu Sina", halaqoh: "Al-Kahfi", status: "AKTIF" },
  { nis: "24008", nama: "Hasan Basri", kelas: "2 Nahwu", asrama: "Al-Ghazali", halaqoh: "An-Naba", status: "AKTIF" },
];

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Data Santri");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={cn(
        "bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 shrink-0",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        {/* Logo */}
        <div className="p-4 flex items-center gap-3 border-b border-sidebar-border">
          <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
            <BookOpen className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-sm font-bold text-sidebar-foreground">SIMAKA</p>
              <p className="text-[10px] text-sidebar-foreground/60">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                activeItem === item.label
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Collapse Toggle */}
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sidebar-foreground/60 hover:bg-sidebar-accent/50 transition-all text-xs"
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            {sidebarOpen && <span>Tutup Sidebar</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 border-b border-border/60 bg-card/50 backdrop-blur-lg flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-1.5 rounded-md hover:bg-muted">
              <Menu className="h-5 w-5 text-muted-foreground" />
            </button>
            <div className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">Admin</span> / Data Santri
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari santri, ustadz..."
                className="h-9 pl-9 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 w-64"
              />
            </div>
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
            </button>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
              AD
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-foreground">Data Santri</h1>
                <p className="text-sm text-muted-foreground">Kelola seluruh data santri pesantren</p>
              </div>
              <button className="h-9 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
                <Plus className="h-4 w-4" />
                Tambah Santri
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <button className="h-9 px-3 bg-card border border-border rounded-lg text-sm flex items-center gap-2 hover:bg-muted/50 transition-colors text-card-foreground">
                <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                Filter
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
              {["Semua Status", "Kelas", "Asrama", "Halaqoh"].map((f) => (
                <button key={f} className="h-9 px-3 bg-muted/50 border border-border/50 rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors">
                  {f} <ChevronDown className="h-3 w-3 inline ml-1" />
                </button>
              ))}
              <span className="text-sm text-muted-foreground ml-auto">{santriData.length} santri</span>
            </div>

            {/* Table */}
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      {["NIS", "Nama", "Kelas", "Asrama", "Halaqoh", "Status", ""].map((h) => (
                        <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {santriData.map((s, i) => (
                      <motion.tr
                        key={s.nis}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-border/30 hover:bg-muted/20 transition-colors"
                      >
                        <td className="px-4 py-3.5 text-sm font-mono text-muted-foreground">{s.nis}</td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                              {s.nama.charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-card-foreground">{s.nama}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-sm text-muted-foreground">{s.kelas}</td>
                        <td className="px-4 py-3.5 text-sm text-muted-foreground">{s.asrama}</td>
                        <td className="px-4 py-3.5 text-sm text-muted-foreground">{s.halaqoh}</td>
                        <td className="px-4 py-3.5">
                          <span className={cn(
                            "text-xs px-2 py-0.5 rounded-full font-medium",
                            s.status === "AKTIF" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                          )}>
                            {s.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <button className="p-1 rounded hover:bg-muted transition-colors">
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
