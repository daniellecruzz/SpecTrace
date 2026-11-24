import { Grade, Project, Report } from "./types";

// Mock data. Later, replace with calls to the FastAPI backend.
export const seedProjects: Project[] = [
  { id: "tip", name: "TIP", material: "Rebars", suppliers: 0, step: 3, status: "in_progress", updatedAt: "Just now" },
  { id: "metro-line-4", name: "Metro Line 4 Viaduct", material: "Rebars", suppliers: 2, step: 4, status: "meets", updatedAt: "Today, 10:40 AM" },
  { id: "harborview", name: "Harborview Tower Podium", material: "Rebars", suppliers: 2, step: 4, status: "needs_review", updatedAt: "Yesterday, 4:15 PM" },
  { id: "northgate", name: "Northgate Logistics Hub", material: "Rebars", suppliers: 1, step: 3, status: "in_progress", updatedAt: "Nov 22, 2026" },
];

export const reports: Report[] = [
  { projectId: "metro-line-4", projectName: "Metro Line 4 Viaduct", date: "Nov 25, 2026", suppliers: 2, status: "meets" },
  { projectId: "harborview", projectName: "Harborview Tower Podium", date: "Nov 24, 2026", suppliers: 2, status: "needs_review" },
];

// Typical ASTM A615 minimums in MPa (verify against the standard and project drawings)
export const gradeDefaults: Record<Grade, { yield: number; tensile: number }> = {
  "Grade 40": { yield: 280, tensile: 420 },
  "Grade 60": { yield: 420, tensile: 620 },
  "Grade 75": { yield: 520, tensile: 690 },
  "Grade 80": { yield: 550, tensile: 725 },
};

export const currentUser = { name: "Elena Vance", role: "Lead Procurement Officer", initials: "EV" };

export const workflowSteps = [
  { n: "01", title: "Create Project", desc: "Name project & select rebar" },
  { n: "02", title: "Set Requirements", desc: "Define grade, size & strength" },
  { n: "03", title: "Upload Documents", desc: "Add certificates & supplier quotes" },
  { n: "04", title: "Review Results", desc: "Compare specs & view sources" },
];