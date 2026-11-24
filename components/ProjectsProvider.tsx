"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { seedProjects } from "@/lib/mock-data";
import { Project } from "@/lib/types";

const KEY = "spectrace.projects";

interface ProjectsContextValue {
  projects: Project[];
  ready: boolean; // false until localStorage has been read
  getProject: (id: string) => Project | undefined;
  addProject: (name: string) => Project;
  updateProject: (id: string, patch: Partial<Project>) => void;
  createOpen: boolean;
  openCreate: () => void;
  closeCreate: () => void;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(seedProjects);
  const [ready, setReady] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setProjects(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(projects));
    } catch {}
  }, [projects, ready]);

  const getProject = (id: string) => projects.find((p) => p.id === id);

  function addProject(name: string): Project {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const project: Project = {
      id: `${slug}-${Math.random().toString(36).slice(2, 6)}`,
      name,
      material: "Rebars",
      suppliers: 0,
      step: 2, // step 1 (create) is done, so they land on requirements
      status: "in_progress",
      updatedAt: "Just now",
    };
    setProjects((prev) => [project, ...prev]);
    return project;
  }

  function updateProject(id: string, patch: Partial<Project>) {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects, ready, getProject, addProject, updateProject,
        createOpen,
        openCreate: () => setCreateOpen(true),
        closeCreate: () => setCreateOpen(false),
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error("useProjects must be used inside ProjectsProvider");
  return ctx;
}