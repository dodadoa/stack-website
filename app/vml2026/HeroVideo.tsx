"use client";

import { useEffect, useRef, useState } from "react";

/* Hero background video with a sound toggle. Sound defaults to on, but
   browsers block unmuted autoplay — so if the first unmuted play is refused
   we wait for the visitor's first gesture and try again, unless they have
   switched sound off in the meantime. The toggle mutes the element directly,
   synchronously, so no pending listener can override it. */
export default function HeroVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(true);
  const unlockRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.play().catch(() => {
      // unmuted autoplay refused — play muted, unmute on first gesture
      video.muted = true;
      video.play().catch(() => {});
      const unlock = () => {
        unlockRef.current = null;
        video.muted = false;
        video.play().catch(() => {});
      };
      unlockRef.current = unlock;
      window.addEventListener("pointerdown", unlock, { once: true });
    });

    return () => {
      if (unlockRef.current) {
        window.removeEventListener("pointerdown", unlockRef.current);
        unlockRef.current = null;
      }
    };
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;

    // a pending first-gesture unlock must never fight the explicit toggle
    if (unlockRef.current) {
      window.removeEventListener("pointerdown", unlockRef.current);
      unlockRef.current = null;
    }

    const next = !soundOn;
    video.muted = !next;
    if (next) video.play().catch(() => {});
    setSoundOn(next);
  };

  return (
    <>
      <video
        ref={videoRef}
        className="vml-hero-video"
        src={src}
        autoPlay
        loop
        playsInline
        aria-hidden
      />
      <button
        type="button"
        className="vml-sound-toggle"
        aria-pressed={soundOn}
        onClick={toggle}
      >
        {soundOn ? "Sound on" : "Sound off"}
      </button>
    </>
  );
}
