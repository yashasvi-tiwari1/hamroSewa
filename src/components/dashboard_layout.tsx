import { ReactNode } from "react";
import Navbar from "@sewa/components/dashboard_navbar";
import Sidebar from "@sewa/components/dashboard_sidebar";

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-200 flex">
        <Sidebar />
        <div className="flex-grow pl-60 pr-8 pt-6">{children}</div>
      </main>
    </>
  );
}
