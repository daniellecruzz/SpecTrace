import { Suspense } from "react";
import ProjectList from "@/components/ProjectList";

type SearchParams = Promise<{ q?: string }>;

// Reads the search param inside Suspense, so the page shell can prerender
async function Results({ searchParams }: { searchParams: SearchParams }) {
  const { q = "" } = await searchParams;
  return <ProjectList q={q} />;
}

function ListFallback() {
  return (
    <div className="space-y-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="glass h-[72px] animate-pulse rounded-2xl" />
      ))}
    </div>
  );
}

export default function ProjectsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <section className="space-y-3">
      <h1 className="px-2 text-2xl font-bold">Projects</h1>
      <Suspense fallback={<ListFallback />}>
        <Results searchParams={searchParams} />
      </Suspense>
    </section>
  );
}