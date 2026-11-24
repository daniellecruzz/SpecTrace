export type ProjectStatus = "in_progress" | "meets" | "needs_review";
export type Grade = "Grade 40" | "Grade 60" | "Grade 75" | "Grade 80";

export interface Requirements {
  grade: Grade;
  diameterMm: number;
  minYieldMpa: number;
  minTensileMpa?: number; // optional
}

export interface Project {
  id: string;
  name: string;
  material: "Rebars";
  suppliers: number;
  step: 1 | 2 | 3 | 4; // current workflow step
  status: ProjectStatus;
  updatedAt: string;
  requirements?: Requirements;
}

export interface Report {
  projectId: string;
  projectName: string;
  date: string;
  suppliers: number;
  status: ProjectStatus;
}