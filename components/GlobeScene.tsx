"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildPhrasePool, generateAgentName, pickPatchPhrase } from "@/lib/bugAgents";

type GlobeSceneProps = {
  paragraphs: readonly string[];
  className?: string;
};

const BLACK = "#000000";
const NAVY = "#0c0647";
const DEEP = "#191790";
const ROYAL = "#1e51c5";
const BLUE = "#1d7ed1";
const LIME = "#c4ff00";

const BAND_COUNT = 18;
const GLOBE_RADIUS = 1.85;
const WIRE_RADIUS = 1.89;
const TARGET_AGENT_COUNT = 20;
const AGENT_COLORS = [LIME, "#ffffff", "#a0d8ee", BLUE];
const ORBIT_RADIUS_MIN = GLOBE_RADIUS * 1.28;
const ORBIT_RADIUS_MAX = GLOBE_RADIUS * 1.68;
const ORBIT_SEGMENTS = 96;

type GlobeTextureHandle = {
  texture: THREE.CanvasTexture;
  patchBand: (index: number, phrase: string) => void;
  getPhrase: (index: number) => string;
  dispose: () => void;
};

function buildGlobeTextureHandle(pool: string[]): GlobeTextureHandle {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  const stripHeight = height / BAND_COUNT;
  const bandColors = ["rgba(255, 255, 255, 0.62)", "rgba(196, 255, 0, 0.5)", "rgba(196, 255, 0, 0.32)"];
  const bandPhrases: string[] = Array.from(
    { length: BAND_COUNT },
    (_, i) => pool[i % pool.length] ?? "PATCH NOTES",
  );

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  if (!ctx) {
    return {
      texture,
      patchBand: () => {},
      getPhrase: (index) => bandPhrases[index],
      dispose: () => {},
    };
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, BLACK);
  gradient.addColorStop(0.28, NAVY);
  gradient.addColorStop(0.52, DEEP);
  gradient.addColorStop(0.76, ROYAL);
  gradient.addColorStop(1, BLUE);

  function paintBackgroundStrip(y0: number, h: number) {
    ctx!.fillStyle = gradient;
    ctx!.fillRect(0, y0, width, h);
    for (let i = 0; i < 2; i++) {
      const bx = Math.random() * width;
      const by = y0 + Math.random() * h;
      const radius = 24 + Math.random() * 60;
      const blob = ctx!.createRadialGradient(bx, by, 0, bx, by, radius);
      blob.addColorStop(0, "rgba(125, 146, 0, 0.3)");
      blob.addColorStop(1, "rgba(125, 146, 0, 0)");
      ctx!.fillStyle = blob;
      ctx!.fillRect(bx - radius, by - radius, radius * 2, radius * 2);
    }
  }

  function paintBandText(index: number, phrase: string, flash: boolean) {
    const v = (index + 0.5) / BAND_COUNT;
    const y = height * v;
    const theta = v * Math.PI;
    const latitudeScale = 1 / Math.max(Math.sin(theta), 0.42);
    const fontSize = Math.round(26 * latitudeScale);

    ctx!.font = `600 ${fontSize}px "General Sans", system-ui, sans-serif`;
    ctx!.textBaseline = "middle";
    ctx!.fillStyle = flash ? "rgba(196, 255, 0, 0.95)" : bandColors[index % bandColors.length];

    const unit = `${phrase}   ·   `;
    const unitWidth = ctx!.measureText(unit).width || 400;
    const offset = ((index * 211) % unitWidth) * -1;
    let x = offset;
    while (x < width) {
      ctx!.fillText(unit, x, y);
      x += unitWidth;
    }
  }

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
  for (let i = 0; i < BAND_COUNT; i++) {
    paintBandText(i, bandPhrases[i], false);
  }
  texture.needsUpdate = true;

  const pendingTimeouts = new Set<number>();

  function patchBand(index: number, phrase: string) {
    bandPhrases[index] = phrase;
    const y0 = stripHeight * index;
    paintBackgroundStrip(y0, stripHeight);
    paintBandText(index, phrase, true);
    texture.needsUpdate = true;

    const timeoutId = window.setTimeout(() => {
      paintBackgroundStrip(y0, stripHeight);
      paintBandText(index, phrase, false);
      texture.needsUpdate = true;
      pendingTimeouts.delete(timeoutId);
    }, 750);
    pendingTimeouts.add(timeoutId);
  }

  return {
    texture,
    patchBand,
    getPhrase: (index) => bandPhrases[index],
    dispose: () => {
      pendingTimeouts.forEach((id) => window.clearTimeout(id));
      pendingTimeouts.clear();
    },
  };
}

function createDotTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createLabelTexture(name: string, sub = ""): THREE.CanvasTexture {
  const width = 256;
  const height = 80;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = '500 20px "General Sans", system-ui, sans-serif';
    ctx.fillStyle = "rgba(1, 0, 4, 0.6)";
    ctx.fillText(name, width / 2 + 1, 23);
    ctx.fillStyle = "rgba(255, 255, 255, 0.94)";
    ctx.fillText(name, width / 2, 22);
    if (sub) {
      ctx.font = '400 17px "General Sans", system-ui, sans-serif';
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.fillText(sub, width / 2, 54);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function refreshLabelTexture(agent: Agent, sub: string) {
  const canvas = agent.labelTexture.image as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = '500 20px "General Sans", system-ui, sans-serif';
  ctx.fillStyle = "rgba(1, 0, 4, 0.6)";
  ctx.fillText(agent.name, 129, 23);
  ctx.fillStyle = "rgba(255, 255, 255, 0.94)";
  ctx.fillText(agent.name, 128, 22);
  ctx.font = '400 17px "General Sans", system-ui, sans-serif';
  ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
  ctx.fillText(sub, 128, 54);
  agent.labelTexture.needsUpdate = true;
}

function randomOrbitBasis(): { u: THREE.Vector3; v: THREE.Vector3 } {
  const normal = new THREE.Vector3(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
  ).normalize();
  const helper = Math.abs(normal.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  const u = new THREE.Vector3().crossVectors(helper, normal).normalize();
  const v = new THREE.Vector3().crossVectors(normal, u).normalize();
  return { u, v };
}

type Agent = {
  name: string;
  dot: THREE.Sprite;
  label: THREE.Sprite;
  dotMaterial: THREE.SpriteMaterial;
  labelMaterial: THREE.SpriteMaterial;
  labelTexture: THREE.CanvasTexture;
  orbitLine: THREE.LineLoop;
  orbitLineMaterial: THREE.LineBasicMaterial;
  u: THREE.Vector3;
  v: THREE.Vector3;
  radius: number;
  angle: number;
  angularSpeed: number;
  born: number;
  lifespan: number;
  fadeIn: number;
  fadeOut: number;
  state: "alive" | "dying";
  deathStart: number;
};

type Pulse = {
  sprite: THREE.Sprite;
  material: THREE.SpriteMaterial;
  beam: THREE.Line;
  beamMaterial: THREE.LineBasicMaterial;
  fromAgent: Agent;
  toAgent: Agent | null;
  bandIndex: number | null;
  agentName: string;
  start: number;
  duration: number;
};

export function GlobeScene({ paragraphs, className = "" }: GlobeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = container.clientWidth || 1;
    let height = container.clientHeight || 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const phrasePool = buildPhrasePool(paragraphs);

    let globeTextureHandle: GlobeTextureHandle | null = null;
    let globe: THREE.Mesh | null = null;
    let wireframe: THREE.LineSegments | null = null;

    const buildGlobe = () => {
      globeTextureHandle = buildGlobeTextureHandle(phrasePool);

      const geometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
      const material = new THREE.MeshBasicMaterial({
        map: globeTextureHandle.texture,
        transparent: true,
        opacity: 0.88,
      });
      globe = new THREE.Mesh(geometry, material);
      scene.add(globe);

      const wireGeometry = new THREE.SphereGeometry(WIRE_RADIUS, 24, BAND_COUNT);
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

    const dotTexture = createDotTexture();
    const usedNames = new Set<string>();
    const agents: Agent[] = [];
    const pulses: Pulse[] = [];

    const spawnAgent = (now: number, warmStart: boolean): Agent => {
      const name = generateAgentName(usedNames);
      usedNames.add(name);

      const { u, v } = randomOrbitBasis();
      const radius = ORBIT_RADIUS_MIN + Math.random() * (ORBIT_RADIUS_MAX - ORBIT_RADIUS_MIN);
      const angularSpeed = (0.03 + Math.random() * 0.09) * (Math.random() < 0.5 ? 1 : -1);
      const lifespan = 20000 + Math.random() * 20000;
      const colorHex = AGENT_COLORS[Math.floor(Math.random() * AGENT_COLORS.length)];

      const dotMaterial = new THREE.SpriteMaterial({
        map: dotTexture,
        color: new THREE.Color(colorHex),
        transparent: true,
        depthWrite: false,
        opacity: 0,
      });
      const dot = new THREE.Sprite(dotMaterial);
      dot.scale.set(0.07, 0.07, 1);

      const labelTexture = createLabelTexture(name);
      const labelMaterial = new THREE.SpriteMaterial({
        map: labelTexture,
        transparent: true,
        depthWrite: false,
        opacity: 0,
      });
      const label = new THREE.Sprite(labelMaterial);
      label.scale.set(0.85, 0.265, 1);

      const orbitPoints: THREE.Vector3[] = [];
      for (let s = 0; s <= ORBIT_SEGMENTS; s++) {
        const a = (s / ORBIT_SEGMENTS) * Math.PI * 2;
        orbitPoints.push(
          new THREE.Vector3()
            .copy(u)
            .multiplyScalar(Math.cos(a) * radius)
            .addScaledVector(v, Math.sin(a) * radius),
        );
      }
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitLineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(colorHex),
        transparent: true,
        depthWrite: false,
        opacity: 0,
      });
      const orbitLine = new THREE.LineLoop(orbitGeometry, orbitLineMaterial);

      scene.add(dot);
      scene.add(label);
      scene.add(orbitLine);

      return {
        name,
        dot,
        label,
        dotMaterial,
        labelMaterial,
        labelTexture,
        orbitLine,
        orbitLineMaterial,
        u,
        v,
        radius,
        angle: Math.random() * Math.PI * 2,
        angularSpeed,
        born: warmStart ? now - Math.random() * lifespan * 0.9 : now,
        lifespan,
        fadeIn: 600 + Math.random() * 1200,
        fadeOut: 800 + Math.random() * 1800,
        state: "alive",
        deathStart: 0,
      };
    };

    const disposeAgent = (agent: Agent) => {
      scene.remove(agent.dot);
      scene.remove(agent.label);
      scene.remove(agent.orbitLine);
      agent.dotMaterial.dispose();
      agent.labelMaterial.dispose();
      agent.labelTexture.dispose();
      agent.orbitLine.geometry.dispose();
      agent.orbitLineMaterial.dispose();
      usedNames.delete(agent.name);
    };

    const spawnPulse = (now: number) => {
      const alive = agents.filter((agent) => agent.state === "alive");
      if (alive.length === 0) {
        return;
      }

      const material = new THREE.SpriteMaterial({
        map: dotTexture,
        color: new THREE.Color(LIME),
        transparent: true,
        depthWrite: false,
        opacity: 0,
      });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(0.17, 0.17, 1);
      scene.add(sprite);

      const beamMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(LIME),
        transparent: true,
        depthWrite: false,
        opacity: 0,
      });
      const beamGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]);
      const beam = new THREE.Line(beamGeometry, beamMaterial);
      scene.add(beam);

      const toGlobe = alive.length < 2 || Math.random() < 0.4;
      const source = alive[Math.floor(Math.random() * alive.length)];

      if (toGlobe) {
        pulses.push({
          sprite,
          material,
          beam,
          beamMaterial,
          fromAgent: source,
          toAgent: null,
          bandIndex: Math.floor(Math.random() * BAND_COUNT),
          agentName: source.name,
          start: now,
          duration: 1400 + Math.random() * 600,
        });
        return;
      }

      let target = alive[Math.floor(Math.random() * alive.length)];
      let guard = 0;
      while (target === source && guard < 6) {
        target = alive[Math.floor(Math.random() * alive.length)];
        guard += 1;
      }

      pulses.push({
        sprite,
        material,
        beam,
        beamMaterial,
        fromAgent: source,
        toAgent: target,
        bandIndex: null,
        agentName: source.name,
        start: now,
        duration: 1100 + Math.random() * 700,
      });
    };

    for (let i = 0; i < TARGET_AGENT_COUNT; i++) {
      agents.push(spawnAgent(performance.now(), true));
    }

    let pointerX = 0;
    let pointerY = 0;
    let rotY = 0;
    let rotX = 0;
    let time = 0;
    let frameId = 0;
    let nextSpawnAt = 0;
    let nextPulseAt = performance.now() + 1500;
    let patchCount = 0;
    let lastLabelRefresh = 0;
    const mountTime = performance.now();

    const scratchNorm = new THREE.Vector3();

    const updateStats = () => {
      if (!statsRef.current) return;
      const openDate = new Date("2026-07-11T00:00:00+07:00");
      const diff = Math.max(0, openDate.getTime() - Date.now());
      const dLeft = Math.floor(diff / 86400000);
      const hLeft = Math.floor((diff % 86400000) / 3600000);
      const mLeft = Math.floor((diff % 3600000) / 60000);
      const sLeft = Math.floor((diff % 60000) / 1000);

      statsRef.current.querySelector<HTMLSpanElement>("[data-opens]")!.textContent =
        `OPENS IN  ${dLeft}d ${hLeft}h ${mLeft}m ${sLeft.toString().padStart(2, "0")}s`;
    };

    const statsInterval = setInterval(updateStats, 1000);
    updateStats();

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    if (!reducedMotion) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }

    const scratchPos = new THREE.Vector3();

    const animate = () => {
      const now = performance.now();

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

      if (!reducedMotion) {

        if (agents.length < TARGET_AGENT_COUNT && now > nextSpawnAt) {
          agents.push(spawnAgent(now, false));
          nextSpawnAt = now + 800 + Math.random() * 3000;
        }

        for (let i = agents.length - 1; i >= 0; i--) {
          const agent = agents[i];
          const age = now - agent.born;

          if (agent.state === "alive" && age > agent.lifespan) {
            agent.state = "dying";
            agent.deathStart = now;
          }

          let opacity: number;
          if (agent.state === "dying") {
            const deathAge = now - agent.deathStart;
            opacity = Math.max(0, 1 - deathAge / agent.fadeOut);
            if (deathAge >= agent.fadeOut) {
              disposeAgent(agent);
              agents.splice(i, 1);
              continue;
            }
          } else {
            opacity = Math.min(1, age / agent.fadeIn);
          }

          agent.angle += agent.angularSpeed * 0.016;
          scratchPos
            .copy(agent.u)
            .multiplyScalar(Math.cos(agent.angle) * agent.radius)
            .addScaledVector(agent.v, Math.sin(agent.angle) * agent.radius);
          agent.dot.position.copy(scratchPos);
          agent.label.position.copy(scratchPos);
          agent.label.position.y += 0.12;
          agent.dotMaterial.opacity = opacity * 0.95;
          agent.labelMaterial.opacity = opacity * 0.82;
          agent.orbitLineMaterial.opacity = opacity * 0.22;
        }

        if (now - lastLabelRefresh > 2000) {
          for (const agent of agents) {
            scratchNorm.copy(agent.dot.position).normalize();
            const lat = Math.round(Math.asin(Math.max(-1, Math.min(1, scratchNorm.y))) * (180 / Math.PI));
            const lng = Math.round(Math.atan2(scratchNorm.x, scratchNorm.z) * (180 / Math.PI));
            const sub = `${lat >= 0 ? "+" : ""}${lat}°  ${lng >= 0 ? "+" : ""}${lng}°`;
            refreshLabelTexture(agent, sub);
          }
          lastLabelRefresh = now;
        }

        if (now > nextPulseAt) {
          spawnPulse(now);
          nextPulseAt = now + 1300 + Math.random() * 1700;
        }

        for (let i = pulses.length - 1; i >= 0; i--) {
          const pulse = pulses[i];
          const t = (now - pulse.start) / pulse.duration;

          if (t >= 1) {
            if (pulse.bandIndex !== null && globeTextureHandle) {
              const current = globeTextureHandle.getPhrase(pulse.bandIndex);
              const phrase = pickPatchPhrase(phrasePool, current);
              globeTextureHandle.patchBand(pulse.bandIndex, `${pulse.agentName} → ${phrase}`);
              patchCount += 1;
            }
            scene.remove(pulse.sprite);
            scene.remove(pulse.beam);
            pulse.material.dispose();
            pulse.beamMaterial.dispose();
            pulse.beam.geometry.dispose();
            pulses.splice(i, 1);
            continue;
          }

          const fromPos = pulse.fromAgent.dot.position;
          const toPos = pulse.toAgent
            ? pulse.toAgent.dot.position
            : scratchPos.copy(fromPos).normalize().multiplyScalar(GLOBE_RADIUS * 1.01);
          const eased = Math.min(t, 1);
          pulse.sprite.position.lerpVectors(fromPos, toPos, eased);
          const glow = Math.sin(eased * Math.PI);
          pulse.material.opacity = glow * 0.95;

          const beamPositions = pulse.beam.geometry.attributes.position as THREE.BufferAttribute;
          beamPositions.setXYZ(0, fromPos.x, fromPos.y, fromPos.z);
          beamPositions.setXYZ(1, pulse.sprite.position.x, pulse.sprite.position.y, pulse.sprite.position.z);
          beamPositions.needsUpdate = true;
          pulse.beamMaterial.opacity = glow * 0.5;
        }
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
      clearInterval(statsInterval);
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);

      agents.forEach(disposeAgent);
      agents.length = 0;

      pulses.forEach((pulse) => {
        scene.remove(pulse.sprite);
        scene.remove(pulse.beam);
        pulse.material.dispose();
        pulse.beamMaterial.dispose();
        pulse.beam.geometry.dispose();
      });
      pulses.length = 0;

      dotTexture.dispose();

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

      globeTextureHandle?.dispose();
      globeTextureHandle?.texture.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [paragraphs]);

  return (
    <>
      <div
        ref={containerRef}
        className={`pointer-events-none absolute inset-0 ${className}`}
        aria-hidden
      />
      <div
        ref={statsRef}
        className="pointer-events-none absolute bottom-6 left-6 z-20 font-mono text-[11px] uppercase tracking-[0.18em]"
        style={{ fontVariantNumeric: "tabular-nums" }}
        aria-hidden
      >
        <span data-opens className="text-lime-300">OPENS IN  —</span>
      </div>
    </>
  );
}
