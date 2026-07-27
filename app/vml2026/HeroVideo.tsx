"use client";

import { useEffect, useRef, useState } from "react";

/* Hero background video with a sound toggle. Sound defaults to on, but
   browsers block unmuted autoplay — so if the first unmuted play is refused
   we wait for the visitor's first gesture and try again, unless they have
   switched sound off in the meantime. */
export default function HeroVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(true);
  const soundOnRef = useRef(soundOn);
  soundOnRef.current = soundOn;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !soundOn;

    let unlock: (() => void) | null = null;

    if (soundOn) {
      video.play().catch(() => {
        unlock = () => {
          if (soundOnRef.current) {
            video.muted = false;
            video.play().catch(() => {});
          }
        };
        window.addEventListener("pointerdown", unlock, { once: true });
      });
    } else {
      video.play().catch(() => {});
    }

    return () => {
      if (unlock) window.removeEventListener("pointerdown", unlock);
    };
  }, [soundOn]);

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
        onClick={() => setSoundOn((on) => !on)}
      >
        {soundOn ? "Sound on" : "Sound off"}
      </button>
    </>
  );
}
