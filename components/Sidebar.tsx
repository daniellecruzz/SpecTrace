"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, FolderKanban, FileText, Settings, FileCheck2 } from "lucide-react";
import { currentUser } from "@/lib/mock-data";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutGrid },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside className="glass sticky top-6 m-6 hidden h-[calc(100vh-3rem)] w-[260px] shrink-0 flex-col rounded-[32px] p-6 lg:flex">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand)] text-white shadow-md">
          <FileCheck2 size={22} />
        </div>
        <div>
          <p className="text-lg font-semibold leading-tight">SpecTrace</p>
          <p className="text-xs text-[var(--muted)]">Spec Verification</p>
        </div>
      </div>

      <nav className="space-y-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-medium transition ${
              isActive(href)
                ? "bg-[var(--brand)] text-white shadow-md"
                : "text-[var(--muted)] hover:bg-white/70"
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="glass-inner mt-auto flex items-center gap-3 rounded-2xl p-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-semibold text-white">
          {currentUser.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold">{currentUser.name}</p>
          <p className="truncate text-xs text-[var(--muted)]">{currentUser.role}</p>
        </div>
      </div>
    </aside>
  );
}