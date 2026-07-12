"use client";

import { setPageRevealed } from "@/lib/pageReveal";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const COL_W = 72;
const PIXEL = 12;
const PALETTE = ["#c4ff00"];

const FILL_DURATION = 420;
const CLEAR_DURATION = 500;
const MAX_DELAY = 0.25;
const STUCK_RESET_MS = 1200;

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (1 - t) * (2 - 2 * t));

type ColumnSetup = {
  cols: number;
  delays: number[];
  colors: string[];
  W: number;
  H: number;
};

function solidCover(ctx: CanvasRenderingContext2D, setup: ColumnSetup) {
  for (let c = 0; c < setup.cols; c++) {
    const x = c * COL_W;
    const w = c === setup.cols - 1 ? setup.W - x : COL_W;
    ctx.globalAlpha = 1;
    ctx.fillStyle = setup.colors[c]!;
    ctx.fillRect(x, 0, w, setup.H);
  }
}

export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fillRafRef = useRef(0);
  const clearRafRef = useRef(0);
  const setupRef = useRef<ColumnSetup | null>(null);
  const transitioningRef = useRef(false);
  const visibleRef = useRef(false);
  const stuckTimerRef = useRef(0);
  const [visible, setVisible] = useState(false);

  const setOverlayVisible = (next: boolean) => {
    visibleRef.current = next;
    setVisible(next);
  };

  useEffect(() => {
    const resetTransition = () => {
      transitioningRef.current = false;
      window.clearTimeout(stuckTimerRef.current);
      setOverlayVisible(false);
      setPageRevealed(true);
      cancelAnimationFrame(fillRafRef.current);
      cancelAnimationFrame(clearRafRef.current);
    };

    const prepare = (): CanvasRenderingContext2D | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const cols = Math.ceil(W / COL_W);
      setupRef.current = {
        cols,
        delays: Array.from({ length: cols }, () => Math.random() * MAX_DELAY),
        colors: Array.from(
          { length: cols },
          () => PALETTE[Math.floor(Math.random() * PALETTE.length)],
        ),
        W,
        H,
      };
      return ctx;
    };

    const columnProgress = (elapsed: number, duration: number, c: number) => {
      const setup = setupRef.current!;
      const raw = Math.max(0, elapsed / duration - setup.delays[c]) / (1 - MAX_DELAY);
      return easeInOut(Math.min(1, raw));
    };

    const drawColumn = (ctx: CanvasRenderingContext2D, c: number, front: number) => {
      const setup = setupRef.current!;
      const x = c * COL_W;
      const w = c === setup.cols - 1 ? setup.W - x : COL_W;
      const edge = Math.floor(front / PIXEL) * PIXEL;

      ctx.globalAlpha = 1;
      ctx.fillStyle = setup.colors[c];
      if (edge > 0) {
        ctx.fillRect(x, 0, w, edge);
      }
    };

    const solidCoverCanvas = (ctx: CanvasRenderingContext2D) => {
      const setup = setupRef.current!;
      solidCover(ctx, setup);
    };

    const playFill = (onDone: () => void) => {
      cancelAnimationFrame(fillRafRef.current);
      const ctx = prepare();
      if (!ctx || !setupRef.current) {
        onDone();
        return;
      }

      const setup = setupRef.current;
      setPageRevealed(false);
      setOverlayVisible(true);
      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = now - start;
        ctx.clearRect(0, 0, setup.W, setup.H);
        let allDone = true;

        for (let c = 0; c < setup.cols; c++) {
          const p = columnProgress(elapsed, FILL_DURATION, c);
          drawColumn(ctx, c, p * setup.H);
          if (p < 1) allDone = false;
        }

        if (allDone) {
          solidCoverCanvas(ctx);
          onDone();
          return;
        }

        fillRafRef.current = requestAnimationFrame(tick);
      };

      fillRafRef.current = requestAnimationFrame(tick);
    };

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement).closest("a[href]");
      if (!anchor || anchor.getAttribute("target") === "_blank") return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;

      const nextRoute = url.pathname + url.search;
      const currentRoute = window.location.pathname + window.location.search;

      // Hash-only updates on the same page should use native link behaviour.
      if (nextRoute === currentRoute) {
        return;
      }

      const nextPath = nextRoute + url.hash;
      const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (nextPath === currentPath) {
        return;
      }

      if (transitioningRef.current) {
        resetTransition();
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      transitioningRef.current = true;

      playFill(() => {
        router.push(nextPath);
        stuckTimerRef.current = window.setTimeout(resetTransition, STUCK_RESET_MS);
      });
    };

    const handleHashChange = () => {
      if (transitioningRef.current || visibleRef.current) {
        resetTransition();
      }
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("hashchange", handleHashChange);
      window.clearTimeout(stuckTimerRef.current);
      cancelAnimationFrame(fillRafRef.current);
    };
  }, [router]);

  useEffect(() => {
    window.clearTimeout(stuckTimerRef.current);

    if (!transitioningRef.current && !visibleRef.current) {
      return;
    }

    transitioningRef.current = false;

    cancelAnimationFrame(clearRafRef.current);
    const canvas = canvasRef.current;
    const setup = setupRef.current;
    if (!canvas || !setup) {
      setOverlayVisible(false);
      setPageRevealed(true);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setOverlayVisible(false);
      setPageRevealed(true);
      return;
    }

    solidCover(ctx, setup);

    const drawColumnBelow = (c: number, front: number) => {
      const x = c * COL_W;
      const w = c === setup.cols - 1 ? setup.W - x : COL_W;
      const edge = Math.floor(front / PIXEL) * PIXEL;

      ctx.globalAlpha = 1;
      ctx.fillStyle = setup.colors[c];
      ctx.fillRect(x, edge, w, setup.H - edge);
    };

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, setup.W, setup.H);
      let allDone = true;

      for (let c = 0; c < setup.cols; c++) {
        const raw =
          Math.max(0, elapsed / CLEAR_DURATION - setup.delays[c]) / (1 - MAX_DELAY);
        const p = easeInOut(Math.min(1, raw));
        if (p < 1) {
          drawColumnBelow(c, p * setup.H);
          allDone = false;
        }
      }

      if (allDone) {
        setOverlayVisible(false);
        requestAnimationFrame(() => setPageRevealed(true));
        return;
      }

      clearRafRef.current = requestAnimationFrame(tick);
    };

    clearRafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(clearRafRef.current);
  }, [pathname]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[45]"
      style={{ visibility: visible ? "visible" : "hidden" }}
      aria-hidden={!visible}
    >
      <canvas ref={canvasRef} className="pointer-events-none block h-full w-full" />
    </div>
  );
}
