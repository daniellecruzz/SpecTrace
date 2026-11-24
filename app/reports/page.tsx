import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import { reports } from "@/lib/mock-data";

export default function ReportsPage() {
  return (
    <>
      <div className="px-1">
        <h1 className="text-4xl font-bold">Evaluation Reports</h1>
        <p className="mt-2 text-lg text-[var(--muted)]">
          Open supplier verification summaries and source document references.
        </p>
      </div>

      <div className="glass rounded-[32px] p-4">
        <div className="glass-inner overflow-hidden rounded-3xl">
          <div className="grid grid-cols-[2fr_1.2fr_1fr_1.5fr_auto] gap-4 bg-black/[0.03] px-8 py-5 text-sm font-semibold text-[var(--muted)]">
            <span>Project Name</span><span>Evaluation Date</span><span>Suppliers</span><span>Report Status</span><span className="text-right">Action</span>
          </div>

          {reports.length === 0 && (
            <p className="p-10 text-center text-[var(--muted)]">No reports yet.</p>
          )}

          {reports.map((r) => (
            <div key={r.projectId} className="grid grid-cols-[2fr_1.2fr_1fr_1.5fr_auto] items-center gap-4 border-t border-black/5 px-8 py-5">
              <span className="text-lg font-semibold">{r.projectName}</span>
              <span className="text-[var(--muted)]">{r.date}</span>
              <span>{r.suppliers}</span>
              <span><StatusBadge status={r.status} /></span>
              <Link href={`/projects/${r.projectId}`} className="rounded-xl bg-[var(--brand)]/10 px-5 py-2.5 text-sm font-semibold text-[var(--brand)] transition hover:bg-[var(--brand)]/20">
                View Report
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}