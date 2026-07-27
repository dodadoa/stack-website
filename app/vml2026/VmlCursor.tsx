"use client";

import { useEffect, useRef } from "react";

/* Custom cursor: yellow dot with black border. The trail is a feedback-style
   smear on a full-screen canvas — each frame the canvas fades slightly and a
   soft brush follows the cursor, so the stroke dissolves from the tail.
   Renders nothing on touch / reduced-motion devices. */
export default function VmlCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const cursor = cursorRef.current;
    const canvas = canvasRef.current;
    if (!cursor || !canvas) return;

    document.body.classList.add("vml-cursor-active");

    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
    };
    resize();
    window.addEventListener("resize", resize);

    // Feedback-style trail: the canvas is never cleared, only faded a little
    // each frame, so the brush smears smoothly and dissolves from the tail.
    const mouse = { x: -100, y: -100 };
    const brush = { x: -100, y: -100 };
    let hasDrawn = false;

    const onMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursor.style.opacity = "1";
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!hasDrawn) {
        brush.x = mouse.x;
        brush.y = mouse.y;
        hasDrawn = true;
      }
    };

    const onLeave = () => {
      cursor.style.opacity = "0";
    };

    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);

      // fade what's already there (the feedback decay)
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = "source-over";

      if (!hasDrawn) return;

      // brush eases toward the mouse — smooth, no quantized steps
      const px = brush.x;
      const py = brush.y;
      brush.x += (mouse.x - brush.x) * 0.35;
      brush.y += (mouse.y - brush.y) * 0.35;

      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(brush.x, brush.y);
      ctx.strokeStyle = "rgba(245, 236, 0, 0.5)";
      ctx.lineWidth = 26;
      ctx.stroke();
    };
    raf = requestAnimationFrame(draw);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("vml-cursor-active");
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="vml-cursor-canvas" aria-hidden />
      <div ref={cursorRef} className="vml-cursor" aria-hidden />
    </>
  );
}
