"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/* Cross-site hamburger: jumps between the Stack landing page and the
   programme sites. Rendered on VML 2026 and Patch Notes pages. */
export function StackMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="stkm">
      <button
        type="button"
        className="stkm-burger"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={open ? "stkm-line stkm-line-open" : "stkm-line"} />
        <span className={open ? "stkm-line stkm-line-open" : "stkm-line"} />
        <span className={open ? "stkm-line stkm-line-open" : "stkm-line"} />
      </button>

      {open && (
        <nav className="stkm-panel">
          <Link href="/" className="stkm-link">
            Stack
            <span className="stkm-sub">Landing</span>
          </Link>
          <Link href="/vml2026" className="stkm-link">
            Stack V_Circuits — Transitional Images
            <span className="stkm-sub">Ongoing · 2026</span>
          </Link>
          <Link href="/patch-note" className="stkm-link">
            Patch Notes That Refuse a Settled World
            <span className="stkm-sub">Archive · 2026</span>
          </Link>
        </nav>
      )}
    </div>
  );
}
