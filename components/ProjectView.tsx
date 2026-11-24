"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Check, Layers } from "lucide-react";
import { useProjects } from "@/components/ProjectsProvider";
import RequirementsForm from "@/components/RequirementsForm";
import StatusBadge from "@/components/StatusBadge";

const steps = ["Create Project", "Set Requirements", "Upload Documents", "Review Results"];

export default function ProjectView() {
  const { id } = useParams<{ id: string }>();
  const { getProject, ready } = useProjects();
  const [view, setView] = useState<number | null>(null);

  if (!ready) return <div className="glass h-64 animate-pulse rounded-[32px]" />;

  const project = getProject(id);
  if (!project) {
    return (
      <div className="glass rounded-3xl p-10 text-center">
        <p className="text-lg font-semibold">Project not found</p>
        <Link href="/projects" className="mt-2 inline-block text-[var(--brand)]">Back to all projects</Link>
      </div>
    );
  }

  const current = view ?? project.step;

  return (
    <>
      <section className="glass rounded-[32px] p-8">
        <div className="flex items-start justify-between">
          <div>
            <Link href="/projects" className="flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)]">
              <ArrowLeft size={16} /> All Projects
            </Link>
            <div className="mt-3 flex items-center gap-4">
              <h1 className="text-4xl font-bold">{project.name}</h1>
              <span className="flex items-center gap-2 rounded-xl bg-white/80 px-4 py-2 text-sm font-medium text-[var(--brand)]">
                <Layers size={16} /> Reinforcing Steel Bars
              </span>
            </div>
          </div>
          <StatusBadge status={project.status} />
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((label, i) => {
            const n = i + 1;
            const active = n === current;
            const done = n < project.step;
            const locked = n > project.step;
            return (
              <button
                key={label}
                disabled={locked}
                onClick={() => setView(n)}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition ${
                  active
                    ? "bg-[var(--brand)] text-white shadow-lg"
                    : locked
                    ? "bg-white/40 text-[var(--muted)]"
                    : "bg-white/80 hover:bg-white"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    active ? "bg-white text-[var(--brand)]" : done ? "bg-[var(--success)]/15 text-[var(--success)]" : "bg-black/5"
                  }`}
                >
                  {done && !active ? <Check size={16} /> : n}
                </span>
                <span>
                  <span className={`block text-xs tracking-wider ${active ? "text-white/80" : "text-[var(--muted)]"}`}>STEP {n}</span>
                  <span className="block font-semibold">{label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {current === 2 ? (
        <RequirementsForm project={project} onContinue={() => setView(3)} />
      ) : (
        <div className="glass mx-auto w-full max-w-[920px] rounded-[36px] p-5">
          <div className="glass-inner rounded-[28px] p-12 text-center">
            <p className="text-sm font-semibold tracking-widest text-[var(--brand)]">STEP {current} OF 4</p>
            <h2 className="mt-1 text-2xl font-bold">{steps[current - 1]}</h2>
            <p className="mt-2 text-[var(--muted)]">This step is the next one to build.</p>
          </div>
        </div>
      )}
    </>
  );
}