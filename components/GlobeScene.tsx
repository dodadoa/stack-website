"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type GlobeSceneProps = {
  text: string;
  className?: string;
};

const BLACK = "#000000";
const NAVY = "#0c0647";
const DEEP = "#191790";
const ROYAL = "#1e51c5";
const BLUE = "#1d7ed1";
const LIME = "#c4ff00";

const BAND_COUNT = 18;

function createGlobeTexture(text: string): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, BLACK);
  gradient.addColorStop(0.28, NAVY);
  gradient.addColorStop(0.52, DEEP);
  gradient.addColorStop(0.76, ROYAL);
  gradient.addColorStop(1, BLUE);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 16; i++) {
    const bx = Math.random() * width;
    const by = height * (0.15 + Math.random() * 0.7);
    const radius = 40 + Math.random() * 110;
    const blob = ctx.createRadialGradient(bx, by, 0, bx, by, radius);
    blob.addColorStop(0, "rgba(125, 146, 0, 0.35)");
    blob.addColorStop(1, "rgba(125, 146, 0, 0)");
    ctx.fillStyle = blob;
    ctx.fillRect(bx - radius, by - radius, radius * 2, radius * 2);
  }

  const clean = text.replace(/\s+/g, " ").trim();
  const unitBase = `${clean}  ·  `;
  const bandColors = ["rgba(255, 255, 255, 0.62)", "rgba(196, 255, 0, 0.5)", "rgba(196, 255, 0, 0.32)"];
  const baseFontSize = 26;

  for (let i = 0; i < BAND_COUNT; i++) {
    const v = (i + 0.5) / BAND_COUNT;
    const y = height * v;

    // Equirectangular UV wraps a smaller physical circumference near the
    // poles (v near 0 or 1), so scale the font up there to keep the text
    // reading at a consistent apparent size once it's wrapped onto the sphere.
    const theta = v * Math.PI;
    const latitudeScale = 1 / Math.max(Math.sin(theta), 0.42);
    const fontSize = Math.round(baseFontSize * latitudeScale);

    ctx.font = `600 ${fontSize}px "General Sans", system-ui, sans-serif`;
    ctx.textBaseline = "middle";
    ctx.fillStyle = bandColors[i % bandColors.length];

    const unitWidth = ctx.measureText(unitBase).width || 400;
    const offset = ((i * 211) % unitWidth) * -1;
    let x = offset;
    while (x < width) {
      ctx.fillText(unitBase, x, y);
      x += unitWidth;
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export function GlobeScene({ text, className = "" }: GlobeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = container.clientWidth || 1;
    let height = container.clientHeight || 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    let texture: THREE.CanvasTexture | null = null;
    let globe: THREE.Mesh | null = null;
    let wireframe: THREE.LineSegments | null = null;

    const buildGlobe = () => {
      texture = createGlobeTexture(text);

      const geometry = new THREE.SphereGeometry(2.05, 64, 64);
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.92 });
      globe = new THREE.Mesh(geometry, material);
      scene.add(globe);

      const wireGeometry = new THREE.SphereGeometry(2.09, 24, BAND_COUNT);
      const wireEdges = new THREE.EdgesGeometry(wireGeometry);
      const wireMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(LIME),
        transparent: true,
        opacity: 0.16,
      });
      wireframe = new THREE.LineSegments(wireEdges, wireMaterial);
      scene.add(wireframe);
      wireGeometry.dispose();
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(buildGlobe).catch(buildGlobe);
    } else {
      buildGlobe();
    }

    let pointerX = 0;
    let pointerY = 0;
    let rotY = 0;
    let rotX = 0;
    let time = 0;
    let frameId = 0;

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    if (!reducedMotion) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }

    const animate = () => {
      if (!reducedMotion) {
        time += 0.00045;
        rotY += (pointerX * 0.6 - rotY) * 0.012;
        rotX += (-pointerY * 0.25 - rotX) * 0.012;
      }

      if (globe && wireframe) {
        globe.rotation.y = time + rotY;
        globe.rotation.x = rotX;
        wireframe.rotation.y = time + rotY;
        wireframe.rotation.x = rotX;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = container.clientWidth || 1;
      height = container.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);

      if (globe) {
        scene.remove(globe);
        globe.geometry.dispose();
        (globe.material as THREE.Material).dispose();
      }

      if (wireframe) {
        scene.remove(wireframe);
        wireframe.geometry.dispose();
        (wireframe.material as THREE.Material).dispose();
      }

      texture?.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
    />
  );
}
