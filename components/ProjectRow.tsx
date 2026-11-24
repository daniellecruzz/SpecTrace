import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Project } from "@/lib/types";
import StatusBadge from "./StatusBadge";

export default function ProjectRow({ project }: { project: Project }) {
  const { id, name, material, suppliers, step, status, updatedAt } = project;

  return (
    <Link
      href={`/projects/${id}`}
      className="glass flex items-center justify-between gap-4 rounded-2xl px-7 py-5 transition hover:-translate-y-0.5 hover:bg-white/80"
    >
      <div className="flex items-center gap-3">
        <span className="font-semibold">{name}</span>
        <span className="rounded-lg bg-[var(--brand)]/10 px-2.5 py-1 text-xs font-medium text-[var(--brand)]">
          {material}
        </span>
      </div>

      <div className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex">
        <span>{suppliers} {suppliers === 1 ? "Supplier" : "Suppliers"}</span>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className={`h-1.5 w-6 rounded-full ${i <= step ? "bg-[var(--brand)]" : "bg-black/10"}`} />
            ))}
          </div>
          <span>{step}/4</span>
        </div>
        <StatusBadge status={status} />
        <span className="w-32 text-right">{updatedAt}</span>
      </div>

      <ChevronRight size={18} className="text-[var(--muted)]" />
    </Link>
  );
}