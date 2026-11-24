import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { ProjectStatus } from "@/lib/types";

const config = {
  in_progress: { label: "In Progress", icon: Clock, cls: "text-[var(--brand)] bg-[var(--brand)]/10 border-[var(--brand)]/25" },
  meets: { label: "Meets Requirements", icon: CheckCircle2, cls: "text-[var(--success)] bg-[var(--success)]/10 border-[var(--success)]/25" },
  needs_review: { label: "Needs Review", icon: AlertTriangle, cls: "text-[var(--warn)] bg-[var(--warn)]/10 border-[var(--warn)]/30" },
} as const;

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  const { label, icon: Icon, cls } = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-sm font-medium ${cls}`}>
      <Icon size={14} />
      {label}
    </span>
  );
}