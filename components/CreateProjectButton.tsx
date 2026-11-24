"use client";

import { useProjects } from "./ProjectsProvider";

export default function CreateProjectButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { openCreate } = useProjects();
  return (
    <button type="button" onClick={openCreate} className={className}>
      {children}
    </button>
  );
}