"use client";

import { useEffect } from "react";

export function ScreeningHashSync() {
  useEffect(() => {
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
  }, []);

  return null;
}
