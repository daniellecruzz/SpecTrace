import { Suspense } from "react";
import ProjectView from "@/components/ProjectView";

export default function ProjectPage() {
  return (
    <Suspense fallback={<div className="glass h-64 animate-pulse rounded-[32px]" />}>
      <ProjectView />
    </Suspense>
  );
}