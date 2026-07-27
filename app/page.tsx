import type { Metadata } from "next";
import Link from "next/link";
import "./landing.css";

export const metadata: Metadata = {
  title: "Stack",
  description:
    "Stack — media art programmes. Coming soon: Stack V_Circuits, Vietnam Media Show: Transitional Images (2026). Archive: Patch Notes That Refuse a Settled World.",
};

const SLICES = 5;

export default function StackLandingPage() {
  return (
    <main className="stk-page">
      <nav className="stk-nav">
        <div className="stk-nav-group">
          <p className="stk-nav-label">Coming soon</p>
          <Link href="/vml2026" className="stk-nav-link">
            Stack V_Circuits — Transitional Images
            <span className="stk-nav-year">2026</span>
          </Link>
        </div>
        <div className="stk-nav-group">
          <p className="stk-nav-label">Finished</p>
          <Link href="/patch-note" className="stk-nav-link">
            Patch Notes That Refuse a Settled World
            <span className="stk-nav-year">2026</span>
          </Link>
          <div className="stk-nav-link stk-nav-constructing" aria-disabled>
            PLAYER 2 HAS ENTERED THE SERVER
            <span className="stk-nav-year">
              Goethe-Institut Thailand · 21–22 June 2025
            </span>
            <span className="stk-nav-badge">Under construction</span>
          </div>
        </div>
      </nav>

      <a
        className="stk-ig"
        href="https://www.instagram.com/stack_xyz/"
        target="_blank"
        rel="noopener noreferrer"
      >
        IG — @stack_xyz
      </a>

      <h1 className="stk-word" aria-label="STACK">
        {Array.from({ length: SLICES }, (_, i) => (
          <span key={i} className="stk-slice" aria-hidden>
            <span
              className="stk-slice-text"
              style={{ transform: `translateY(${-i * (100 / SLICES)}%)` }}
            >
              STACK
            </span>
          </span>
        ))}
      </h1>
    </main>
  );
}
