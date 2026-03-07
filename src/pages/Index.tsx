import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Smartphone, Shield, Users, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

import MudirDashboard from "./MudirDashboard";
import AdminPanel from "./AdminPanel";
import UstadzMobile from "./UstadzMobile";
import WaliPortal from "./WaliPortal";

type Screen = "mudir" | "admin" | "ustadz" | "wali";

const screens: { id: Screen; label: string; icon: typeof Monitor; desc: string; device: string }[] = [
  { id: "mudir", label: "Mudir", icon: Monitor, desc: "Command Center", device: "Desktop" },
  { id: "admin", label: "Admin", icon: Users, desc: "Backoffice Panel", device: "Desktop" },
  { id: "ustadz", label: "Ustadz", icon: BookOpen, desc: "Mobile App", device: "Mobile" },
  { id: "wali", label: "Wali Santri", icon: Shield, desc: "Parent Portal", device: "Mobile" },
];

export default function Index() {
  const [active, setActive] = useState<Screen>("mudir");
  const isMobile = active === "ustadz" || active === "wali";

  return (
    <div className="min-h-screen bg-background">
      {/* Selector Bar */}
      <div className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-foreground tracking-tight">SIMAKA UI Kit</h1>
                <p className="text-[10px] text-muted-foreground">Sistem Informasi Manajemen Akademik Pondok</p>
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full hidden sm:block">
              {isMobile ? "📱 Preview Mobile" : "🖥️ Preview Desktop"}
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {screens.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0",
                  active === s.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <s.icon className="h-3.5 w-3.5" />
                {s.label}
                <span className={cn("text-[10px]", active === s.id ? "text-primary-foreground/70" : "text-muted-foreground/60")}>
                  {s.device}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Screen Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className={cn(isMobile && "flex justify-center py-6 px-4")}
        >
          {isMobile ? (
            <div className="w-full max-w-[390px] min-h-[780px] rounded-[2.5rem] border-[6px] border-foreground/10 bg-background shadow-2xl overflow-hidden relative">
              {/* Phone Notch */}
              <div className="absolute top-0 inset-x-0 flex justify-center z-50">
                <div className="h-6 w-28 bg-foreground/10 rounded-b-2xl" />
              </div>
              <div className="pt-8 h-full overflow-y-auto">
                {active === "ustadz" ? <UstadzMobile /> : <WaliPortal />}
              </div>
            </div>
          ) : (
            <>
              {active === "mudir" ? <MudirDashboard /> : <AdminPanel />}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
