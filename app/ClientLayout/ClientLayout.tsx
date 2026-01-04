"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/Footer/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/admin" || pathname === "/dashboard/admin" || pathname?.startsWith("/admin/") || pathname?.startsWith("/dashboard/admin/");
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideNavbar && <Footer />}
    </>
  );
}