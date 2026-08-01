"use client";

import { useEffect, useRef } from "react";

type Flake = { x: number; y: number; r: number; speed: number; drift: number };

/**
 * Generative Alpen-Panorama-Loop — Ersatz für das Hero-Video, solange kein
 * echtes 4K-Filmmaterial eingebunden ist (kein externer Host wird
 * angesprochen). Gestaffelte Bergsilhouetten mit leichtem Parallax-Drift,
 * warmes Morgenlicht-Glow und Schneefall.
 */
export function MountainScene({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const flakes: Flake[] = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.8 + 0.6,
      speed: Math.random() * 0.15 + 0.05,
      drift: Math.random() * 0.4 - 0.2,
    }));

    function ridge(offsetY: number, jagged: number, seed: number) {
      const points: [number, number][] = [];
      const segments = 8;
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * width;
        const n = Math.sin(i * 12.9898 + seed) * 43758.5453;
        const rand = n - Math.floor(n);
        const y = offsetY + rand * jagged;
        points.push([x, y]);
      }
      return points;
    }

    let t = 0;
    let rafId: number;

    function draw() {
      t += prefersReducedMotion ? 0 : 0.0025;

      const sky = ctx!.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, "#f4ead3");
      sky.addColorStop(0.45, "#e9d3a8");
      sky.addColorStop(1, "#1c3a27");
      ctx!.fillStyle = sky;
      ctx!.fillRect(0, 0, width, height);

      const glow = ctx!.createRadialGradient(
        width * 0.72,
        height * 0.32,
        0,
        width * 0.72,
        height * 0.32,
        width * 0.5
      );
      glow.addColorStop(0, "rgba(255, 226, 170, 0.55)");
      glow.addColorStop(1, "rgba(255, 226, 170, 0)");
      ctx!.fillStyle = glow;
      ctx!.fillRect(0, 0, width, height);

      const layers = [
        { y: height * 0.42, jagged: height * 0.16, color: "rgba(158, 138, 110, 0.55)", seed: 3.1, drift: 6 },
        { y: height * 0.55, jagged: height * 0.2, color: "rgba(90, 92, 68, 0.7)", seed: 7.7, drift: 10 },
        { y: height * 0.68, jagged: height * 0.22, color: "rgba(28, 58, 39, 0.92)", seed: 14.2, drift: 16 },
        { y: height * 0.8, jagged: height * 0.18, color: "#142a1d", seed: 21.5, drift: 22 },
      ];

      layers.forEach((layer) => {
        const wobble = Math.sin(t + layer.seed) * layer.drift;
        const pts = ridge(layer.y + wobble, layer.jagged, layer.seed);
        ctx!.beginPath();
        ctx!.moveTo(0, height);
        pts.forEach(([x, y]) => ctx!.lineTo(x, y));
        ctx!.lineTo(width, height);
        ctx!.closePath();
        ctx!.fillStyle = layer.color;
        ctx!.fill();
      });

      flakes.forEach((f) => {
        f.y += f.speed * 0.01;
        f.x += f.drift * 0.0015;
        if (f.y > 1) f.y = 0;
        if (f.x > 1) f.x = 0;
        if (f.x < 0) f.x = 1;
        ctx!.beginPath();
        ctx!.arc(f.x * width, f.y * height, f.r, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(255,255,255,0.75)";
        ctx!.fill();
      });

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
