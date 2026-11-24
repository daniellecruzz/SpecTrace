"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, Plus, Search } from "lucide-react";
import { useProjects } from "./ProjectsProvider";

const titles: Record<string, string> = {
  "": "Overview",
  projects: "Projects",
  reports: "Evaluation Reports",
  settings: "Settings",
};

export default function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { getProject, openCreate } = useProjects();
  const [query, setQuery] = useState("");

  const [section, id] = pathname.split("/").filter(Boolean);
  const title = section === "projects" && id
    ? getProject(id)?.name ?? "Project"
    : titles[section ?? ""] ?? "Overview";

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/projects?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header className="glass flex items-center justify-between rounded-[28px] px-7 py-5">
      <div className="flex items-center gap-3 text-sm">
        <Link href="/" className="rounded-lg bg-[var(--brand)]/10 px-3 py-1.5 font-medium text-[var(--brand)]">
          SpecTrace
        </Link>
        <ChevronRight size={14} className="text-[var(--muted)]" />
        <span className="font-semibold">{title}</span>
      </div>

      <div className="flex items-center gap-3">
        <form onSubmit={onSearch} className="hidden items-center gap-2 rounded-xl bg-white/70 px-4 py-2.5 sm:flex">
          <Search size={16} className="text-[var(--muted)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find project..."
            className="w-40 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
          />
        </form>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold">
          <Plus size={16} /> Create Project
        </button>
      </div>
    </header>
  );
}