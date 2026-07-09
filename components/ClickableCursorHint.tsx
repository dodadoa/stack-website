"use client";

import { useEffect, useState } from "react";

const HINT = "click to enter page";
const CLICKABLE_SELECTOR =
  'a[href], button:not(:disabled), summary, [role="link"], [role="button"], label[for], input[type="submit"], input[type="button"], select';

function useCustomCursorEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const noHover = window.matchMedia("(hover: none)").matches;
    setEnabled(!reduced && !coarse && !noHover);
  }, []);

  return enabled;
}

function getClickableTarget(element: Element | null): Element | null {
  if (!element) {
    return null;
  }

  if (element.closest('[data-cursor-hint="off"]')) {
    return null;
  }

  const clickable = element.closest(CLICKABLE_SELECTOR);
  if (
    clickable instanceof HTMLElement &&
    clickable.tagName === "SUMMARY" &&
    element.closest('[data-cursor-hint="custom"]')
  ) {
    return null;
  }

  if (clickable instanceof HTMLAnchorElement) {
    return clickable.href ? clickable : null;
  }

  if (clickable) {
    return clickable;
  }

  const row = element.closest(".clickable-row");
  if (row) {
    const overlay = row.querySelector("a[href]");
    if (overlay instanceof HTMLAnchorElement && overlay.href) {
      return overlay;
    }
  }

  return null;
}

export function ClickableCursorHint() {
  const enabled = useCustomCursorEnabled();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      const clickable = getClickableTarget(event.target as Element | null);

      if (!clickable) {
        setVisible(false);
        return;
      }

      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };

    const handleLeave = () => setVisible(false);

    document.addEventListener("mousemove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled]);

  if (!enabled || !visible) {
    return null;
  }

  return (
    <span
      className="type-subheadline label-caps pointer-events-none fixed z-[10000] whitespace-nowrap text-[0.625rem] leading-none text-pntrsw-body"
      style={{ left: position.x + 16, top: position.y + 16 }}
      aria-hidden
    >
      {HINT}
    </span>
  );
}
