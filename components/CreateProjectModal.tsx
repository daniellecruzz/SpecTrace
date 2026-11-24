"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, X } from "lucide-react";
import { useProjects } from "./ProjectsProvider";

export default function CreateProjectModal() {
  const { createOpen, closeCreate, addProject, projects } = useProjects();
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function close() {
    setName("");
    setError("");
    closeCreate();
  }

  useEffect(() => {
    if (!createOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!createOpen) return null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 3) return setError("Project name must be at least 3 characters.");
    if (projects.some((p) => p.name.toLowerCase() === trimmed.toLowerCase()))
      return setError("A project with this name already exists.");

    const project = addProject(trimmed);
    close();
    router.push(`/projects/${project.id}`);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 p-4 backdrop-blur-md"
      onClick={close}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="glass relative w-full max-w-[820px] rounded-[32px] p-10"
      >
        <button type="button" onClick={close} aria-label="Close" className="absolute right-8 top-8 text-[var(--muted)] hover:text-[var(--ink)]">
          <X size={24} />
        </button>

        <p className="text-sm font-semibold tracking-widest text-[var(--brand)]">STEP 1 OF 4</p>
        <h2 className="mt-1 text-3xl font-bold">Create Project</h2>
        <p className="mt-2 text-[var(--muted)]">Name your package and confirm material type.</p>

        <label className="mt-8 block font-semibold" htmlFor="project-name">Project Name</label>
        <div className={`field mt-2 px-5 py-4 ${error ? "field-error" : ""}`}>
          <input
            id="project-name"
            autoFocus
            value={name}
            onChange={(e) => { setName(e.target.value); setError(""); }}
            placeholder="e.g., Eastside Bridge Foundation"
            className="w-full bg-transparent text-lg outline-none placeholder:text-[var(--muted)]/70"
          />
        </div>
        {error && <p className="mt-2 text-sm text-orange-700">{error}</p>}

        <p className="mt-6 font-semibold">Material Type</p>
        <div className="mt-2 flex items-center justify-between rounded-2xl border-2 border-[var(--brand)] bg-white/90 px-6 py-5">
          <div>
            <p className="text-lg font-semibold">Reinforcing Steel Bars (Rebars)</p>
            <p className="text-[var(--muted)]">ASTM A615 / A706 deformed bars</p>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand)] text-white">
            <Check size={16} />
          </span>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {["Structural Steel", "Precast Concrete"].map((m) => (
            <div key={m} className="flex items-center justify-between rounded-2xl bg-white/40 px-5 py-4 text-[var(--muted)]/70">
              <span className="font-semibold">{m}</span>
              <span className="rounded-full bg-white/80 px-3 py-1 text-xs">Coming Soon</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-end gap-6">
          <button type="button" onClick={close} className="font-semibold text-[var(--muted)] hover:text-[var(--ink)]">
            Cancel
          </button>
          <button type="submit" className="btn-primary flex items-center gap-2 rounded-2xl px-7 py-4 font-semibold">
            Continue to Requirements <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}