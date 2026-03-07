import { AlertTriangle, Clock, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertType = "warning" | "critical" | "info";

interface AlertItemProps {
  type: AlertType;
  message: string;
  time?: string;
}

const alertConfig: Record<AlertType, { icon: typeof AlertTriangle; className: string }> = {
  warning: { icon: Clock, className: "border-l-warning bg-warning/5" },
  critical: { icon: AlertTriangle, className: "border-l-destructive bg-destructive/5" },
  info: { icon: TrendingDown, className: "border-l-primary bg-primary/5" },
};

export function AlertItem({ type, message, time }: AlertItemProps) {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <div className={cn("flex items-start gap-3 rounded-lg border-l-4 p-3.5 transition-all hover:shadow-sm", config.className)}>
      <Icon className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-card-foreground leading-snug">{message}</p>
        {time && <p className="text-xs text-muted-foreground mt-1">{time}</p>}
      </div>
    </div>
  );
}
