import Link from "next/link";
import { ArrowRight, ChevronRight, CheckCircle2, FileSearch, Sparkles } from "lucide-react";
import CreateProjectButton from "@/components/CreateProjectButton";
import ProjectList from "@/components/ProjectList";
import { workflowSteps } from "@/lib/mock-data";

export default function Dashboard() {
  return (
    <>
      <section className="glass relative overflow-hidden rounded-[36px] p-10 lg:p-14">
        <div className="pointer-events-none absolute -right-20 top-0 h-[420px] w-[420px] rounded-full bg-[var(--brand)]/10 blur-3xl" />

        <div className="relative max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-medium text-[var(--brand)]">
            <Sparkles size={14} /> Reinforcing Steel Verification
          </span>
          <h1 className="mt-8 text-5xl font-bold leading-[1.1] tracking-tight">
            Supplier verification, traced to the source.
          </h1>
          <p className="mt-6 max-w-md text-lg text-[var(--muted)]">
            Check mill certificates and quotes against rebar specs in four steps.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CreateProjectButton className="btn-primary flex items-center gap-2 rounded-2xl px-7 py-4 font-semibold">
              + Create Project
            </CreateProjectButton>
            <Link href="/projects/metro-line-4" className="flex items-center gap-2 rounded-2xl bg-white/80 px-7 py-4 font-semibold transition hover:bg-white">
              Open Sample Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Static illustration, not real extraction */}
        <div className="absolute right-12 top-12 hidden w-[380px] xl:block">
          <p className="mb-2 ml-2 text-sm font-medium text-[var(--brand)]">Metro Line 4 Viaduct</p>
          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-black/5">
            <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-[var(--muted)]">
              YIELD STRENGTH
              <span className="inline-flex items-center gap-1 rounded-full border border-[var(--success)]/25 bg-[var(--success)]/10 px-2.5 py-1 text-[var(--success)]">
                <CheckCircle2 size={12} /> Meets Requirements
              </span>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-4xl font-bold">450 MPa</span>
              <span className="font-semibold text-[var(--brand)]">Supplier A</span>
            </div>
            <p className="mt-1 text-sm text-[var(--muted)]">Required: 420 MPa min.</p>
          </div>
          <div className="-ml-24 mt-16 flex items-center gap-3 rounded-3xl bg-white p-4 shadow-xl shadow-black/5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand)]/10 text-[var(--brand)]">
              <FileSearch size={20} />
            </div>
            <div className="text-sm">
              <p className="font-semibold">Page 3 • Mill Test Certificate</p>
              <p className="text-[var(--muted)]">“Yield Strength: 450 N/mm²”</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
          Four-Step Workflow
        </h2>
        <div className="glass grid gap-3 rounded-[32px] p-4 md:grid-cols-2 xl:grid-cols-4">
          {workflowSteps.map((s) => (
            <div key={s.n} className="rounded-2xl bg-white/80 p-5">
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-[var(--brand)] px-3 py-1 text-sm font-semibold text-white">{s.n}</span>
                <ArrowRight size={16} className="text-[var(--muted)]" />
              </div>
              <p className="mt-5 font-semibold">{s.title}</p>
              <p className="text-sm text-[var(--muted)]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between px-2">
          <h2 className="text-lg font-semibold">Recent Projects</h2>
          <Link href="/projects" className="flex items-center gap-1 text-sm font-semibold text-[var(--brand)]">
            All Projects <ChevronRight size={14} />
          </Link>
        </div>
        <ProjectList limit={4} />
      </section>
    </>
  );
}