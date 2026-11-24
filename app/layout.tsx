import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import CreateProjectModal from "@/components/CreateProjectModal";
import { ProjectsProvider } from "@/components/ProjectsProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpecTrace",
  description: "Supplier document verification for reinforcing steel",
};

// Same size as the real components, so the layout doesn't shift when they load
function SidebarFallback() {
  return <aside className="glass sticky top-6 m-6 hidden h-[calc(100vh-3rem)] w-[260px] shrink-0 rounded-[32px] lg:block" />;
}

function TopbarFallback() {
  return <div className="glass h-[84px] rounded-[28px]" />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProjectsProvider>
          <div className="flex">
            <Suspense fallback={<SidebarFallback />}>
              <Sidebar />
            </Suspense>
            <main className="min-w-0 flex-1 space-y-6 p-6 lg:pl-0">
              <Suspense fallback={<TopbarFallback />}>
                <Topbar />
              </Suspense>
              {children}
            </main>
          </div>
          <CreateProjectModal />
        </ProjectsProvider>
      </body>
    </html>
  );
}