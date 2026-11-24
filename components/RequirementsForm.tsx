"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { useProjects } from "./ProjectsProvider";
import { gradeDefaults } from "@/lib/mock-data";
import { Grade, Project } from "@/lib/types";

type Errors = Partial<Record<"diameter" | "yield" | "tensile", string>>;

function Field({ label, optional, hint, error, children }: {
  label: string; optional?: boolean; hint: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="font-semibold">
        {label} {optional && <span className="font-normal text-[var(--muted)]">(Optional)</span>}
      </label>
      <div className="mt-2">{children}</div>
      <p className={`mt-2 text-sm ${error ? "text-orange-700" : "text-[var(--muted)]"}`}>{error ?? hint}</p>
    </div>
  );
}

function UnitInput({ value, onChange, unit, invalid }: {
  value: string; onChange: (v: string) => void; unit: string; invalid?: boolean;
}) {
  return (
    <div className={`field flex items-center gap-3 px-5 py-3.5 ${invalid ? "field-error" : ""}`}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode="decimal"
        className="w-full bg-transparent text-lg outline-none"
      />
      <span className="rounded-lg bg-black/5 px-2.5 py-1 text-sm text-[var(--muted)]">{unit}</span>
    </div>
  );
}

export default function RequirementsForm({ project, onContinue }: { project: Project; onContinue: () => void }) {
  const { updateProject } = useProjects();
  const router = useRouter();
  const r = project.requirements;

  const [grade, setGrade] = useState<Grade>(r?.grade ?? "Grade 60");
  const [diameter, setDiameter] = useState(String(r?.diameterMm ?? 16));
  const [yieldMpa, setYield] = useState(String(r?.minYieldMpa ?? gradeDefaults["Grade 60"].yield));
  const [tensile, setTensile] = useState(r ? (r.minTensileMpa?.toString() ?? "") : String(gradeDefaults["Grade 60"].tensile));
  const [errors, setErrors] = useState<Errors>({});
  const [saved, setSaved] = useState(false);

  // Picking a grade pre-fills typical minimums; the user can still edit them
  function onGradeChange(g: Grade) {
    setGrade(g);
    setYield(String(gradeDefaults[g].yield));
    setTensile(String(gradeDefaults[g].tensile));
  }

  function validate() {
    const d = Number(diameter);
    const y = Number(yieldMpa);
    const t = tensile.trim() === "" ? undefined : Number(tensile);
    const e: Errors = {};

    if (!diameter.trim() || !(d >= 6 && d <= 60)) e.diameter = "Enter a diameter between 6 and 60 mm.";
    if (!yieldMpa.trim() || !(y > 0)) e.yield = "Enter a yield strength greater than 0.";
    else if (t !== undefined && !(t >= y)) e.tensile = "Tensile strength must be a number at least equal to yield.";
    else if (t !== undefined && !(t > 0)) e.tensile = "Enter a valid tensile strength.";

    setErrors(e);
    return Object.keys(e).length === 0 ? { d, y, t } : null;
  }

  function save(next: boolean) {
    const values = validate();
    if (!values) return;

    updateProject(project.id, {
      requirements: { grade, diameterMm: values.d, minYieldMpa: values.y, minTensileMpa: values.t },
      updatedAt: "Just now",
      ...(next ? { step: Math.max(project.step, 3) as Project["step"] } : {}),
    });

    if (next) onContinue();
    else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  return (
    <div className="glass mx-auto w-full max-w-[920px] rounded-[36px] p-5">
      <form onSubmit={(e) => e.preventDefault()} className="glass-inner rounded-[28px] p-10">
        <p className="text-sm font-semibold tracking-widest text-[var(--brand)]">STEP 2 OF 4</p>
        <h2 className="mt-1 text-3xl font-bold">Set Requirements</h2>
        <p className="mt-2 text-[var(--muted)]">Define target rebar specifications for supplier comparison.</p>

        <div className="mt-8 grid gap-x-6 gap-y-7 md:grid-cols-2">
          <Field label="Steel Grade" hint="Structural strength grade required by drawings.">
            <div className="field relative px-5 py-3.5">
              <select
                value={grade}
                onChange={(e) => onGradeChange(e.target.value as Grade)}
                className="w-full appearance-none bg-transparent text-lg outline-none"
              >
                {Object.keys(gradeDefaults).map((g) => <option key={g}>{g}</option>)}
              </select>
              <ChevronDown size={18} className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2" />
            </div>
          </Field>

          <Field label="Bar Diameter (mm)" hint="Nominal bar diameter in millimeters." error={errors.diameter}>
            <UnitInput value={diameter} onChange={setDiameter} unit="mm" invalid={!!errors.diameter} />
          </Field>

          <Field label="Minimum Yield Strength (MPa)" hint="Minimum stress before permanent deformation." error={errors.yield}>
            <UnitInput value={yieldMpa} onChange={setYield} unit="MPa" invalid={!!errors.yield} />
          </Field>

          <Field label="Minimum Tensile Strength (MPa)" optional hint="Minimum breaking strength under tension." error={errors.tensile}>
            <UnitInput value={tensile} onChange={setTensile} unit="MPa" invalid={!!errors.tensile} />
          </Field>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-black/5 pt-6">
          <button type="button" onClick={() => router.push("/projects")} className="flex items-center gap-2 px-3 font-semibold text-[var(--muted)] hover:text-[var(--ink)]">
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex items-center gap-3">
            {saved && <span className="text-sm text-[var(--success)]">Saved</span>}
            <button type="button" onClick={() => save(false)} className="btn-secondary rounded-2xl px-6 py-3.5 font-semibold">
              Save Requirements
            </button>
            <button type="button" onClick={() => save(true)} className="btn-primary flex items-center gap-2 rounded-2xl px-6 py-3.5 font-semibold">
              Save &amp; Continue <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}