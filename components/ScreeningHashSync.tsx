"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function openProgramFromHash() {
  const hash = window.location.hash.slice(1);
  if (!hash) {
    return;
  }

  const details = document.getElementById(hash);
  if (!(details instanceof HTMLDetailsElement)) {
    return;
  }

  details.open = true;
  details.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ScreeningHashSync() {
  const pathname = usePathname();

  useEffect(() => {
    openProgramFromHash();

    const handleHashChange = () => {
      openProgramFromHash();
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

  return null;
}
