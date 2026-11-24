"use client";

import ProjectRow from "./ProjectRow";
import { useProjects } from "./ProjectsProvider";

export default function ProjectList({ q = "", limit }: { q?: string; limit?: number }) {
  const { projects, ready } = useProjects();

  if (!ready) {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map((i) => <div key={i} className="glass h-[72px] animate-pulse rounded-2xl" />)}
      </div>
    );
  }

  let list = projects.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  if (limit) list = list.slice(0, limit);

  if (list.length === 0) {
    return (
      <div className="glass rounded-3xl p-10 text-center text-[var(--muted)]">
        {q ? <>No projects match “{q}”.</> : "No projects yet. Create your first one."}
      </div>
    );
  }

  return <div className="space-y-3">{list.map((p) => <ProjectRow key={p.id} project={p} />)}</div>;
}