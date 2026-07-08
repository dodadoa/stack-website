"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type CursorHintProps = {
  hintClosed: string;
  hintOpen: string;
  children: ReactNode;
  className?: string;
};

export function CursorHint({ hintClosed, hintOpen, children, className = "" }: CursorHintProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hint, setHint] = useState(hintClosed);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setEnabled(!reduced && !coarse);
  }, []);

  useEffect(() => {
    const details = rootRef.current?.closest("details");
    if (!details) {
      return;
    }

    const syncHint = () => {
      const isOpen = details.hasAttribute("open");
      setHint(isOpen ? hintOpen : hintClosed);
    };

    syncHint();
    details.addEventListener("toggle", syncHint);

    return () => details.removeEventListener("toggle", syncHint);
  }, [hintClosed, hintOpen]);

  const showHint = (x: number, y: number) => {
    if (!enabled) return;

    const details = rootRef.current?.closest("details");
    const isOpen = details?.hasAttribute("open") ?? false;
    const nextHint = isOpen ? hintOpen : hintClosed;

    setHint(nextHint);
    setPosition({ x, y });
    setVisible(true);
  };

  return (
    <div
      ref={rootRef}
      className={className}
      onMouseEnter={(event) => showHint(event.clientX, event.clientY)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={(event) => showHint(event.clientX, event.clientY)}
    >
      {children}
      {enabled && visible ? (
        <span
          className="type-subheadline label-caps pointer-events-none fixed z-50 whitespace-nowrap text-[0.625rem] leading-none text-pntrsw-body"
          style={{ left: position.x + 16, top: position.y + 16 }}
          aria-hidden
        >
          {hint}
        </span>
      ) : null}
    </div>
  );
}
