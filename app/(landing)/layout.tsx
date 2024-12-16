"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Default layout for the landing page
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize AOS on first render
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });

  return (
    <>
      <main className="relative flex grow flex-col">{children}</main>
    </>
  );
}