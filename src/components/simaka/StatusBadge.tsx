import { cn } from "@/lib/utils";

type StatusLevel = "NORMAL" | "PERLU_PERHATIAN" | "KRITIS";

const statusConfig: Record<StatusLevel, { label: string; className: string; dot: string }> = {
  NORMAL: { label: "Normal", className: "status-normal", dot: "bg-success" },
  PERLU_PERHATIAN: { label: "Perlu Perhatian", className: "status-warning", dot: "bg-warning" },
  KRITIS: { label: "Kritis", className: "status-critical", dot: "bg-destructive" },
};

export function StatusBadge({ status, size = "md" }: { status: StatusLevel; size?: "sm" | "md" | "lg" }) {
  const config = statusConfig[status];
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5 font-semibold",
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border font-medium", config.className, sizeClasses[size])}>
      <span className={cn("h-2 w-2 rounded-full animate-pulse-soft", config.dot)} />
      {config.label}
    </span>
  );
}
