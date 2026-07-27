"use client";

import { useEffect, useRef, useState } from "react";

/* Landing-page soundtrack. Defaults to on; browsers block audio autoplay,
   so if the first play is refused we start on the visitor's first gesture,
   unless they toggled sound off in the meantime. */
export function LandingSound({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [soundOn, setSoundOn] = useState(true);
  const unlockRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play().catch(() => {
      const unlock = () => {
        unlockRef.current = null;
        audio.play().catch(() => {});
      };
      unlockRef.current = unlock;
      window.addEventListener("pointerdown", unlock, { once: true });
    });

    return () => {
      audio.pause();
      if (unlockRef.current) {
        window.removeEventListener("pointerdown", unlockRef.current);
        unlockRef.current = null;
      }
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (unlockRef.current) {
      window.removeEventListener("pointerdown", unlockRef.current);
      unlockRef.current = null;
    }

    const next = !soundOn;
    if (next) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
    setSoundOn(next);
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop />
      <button
        type="button"
        className="stk-sound-toggle"
        aria-pressed={soundOn}
        onClick={toggle}
      >
        {soundOn ? "Sound on" : "Sound off"}
      </button>
    </>
  );
}
