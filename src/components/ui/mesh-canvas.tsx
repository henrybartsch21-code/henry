"use client";

import { useEffect, useRef } from "react";

type Point3D = { x: number; y: number; z: number };

/**
 * Generative Drahtgitter-Mesh — Ersatz für Video 1 ("Continuum", siehe
 * DESIGN-STRATEGY.md Abschnitt 4). Ein sich langsam drehender Punkt-Cluster,
 * dessen nächste Nachbarn verbunden werden, projiziert mit einfacher
 * Perspektive. Läuft auf 2D-Canvas, kein WebGL-Dependency nötig.
 */
export function MeshCanvas({ className }: { className?: string }) {
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

    const POINT_COUNT = 120;
    const RADIUS = 1;
    const points: Point3D[] = [];

    // Fibonacci-Sphere-Verteilung für gleichmäßige, organische Punktwolke
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < POINT_COUNT; i++) {
      const t = i / POINT_COUNT;
      const y = 1 - t * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      points.push({
        x: Math.cos(theta) * r * RADIUS,
        y: y * RADIUS,
        z: Math.sin(theta) * r * RADIUS,
      });
    }

    let angleY = 0;
    let angleX = 0.3;
    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    window.addEventListener("mousemove", onMouseMove);

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height) * 0.34;
      const focalLength = 2.6;

      angleY += prefersReducedMotion ? 0 : 0.0016;
      angleX += (0.3 + mouseY * 0.15 - angleX) * 0.02;
      const targetTiltY = mouseX * 0.2;

      const cosY = Math.cos(angleY + targetTiltY);
      const sinY = Math.sin(angleY + targetTiltY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const projected = points.map((p) => {
        // Rotation um Y-Achse
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        // Rotation um X-Achse
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const perspective = focalLength / (focalLength + z2);
        return {
          x: cx + x1 * scale * perspective,
          y: cy + y1 * scale * perspective,
          z: z2,
          perspective,
        };
      });

      // Verbindungslinien zwischen nahen Nachbarn
      const threshold = 0.62;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dz = points[i].z - points[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < threshold) {
            const a = projected[i];
            const b = projected[j];
            const avgZ = (a.z + b.z) / 2;
            const opacity = Math.max(0, (avgZ + 1) / 2) * 0.5;
            const isAccent = (i * 7 + j) % 37 === 0;
            ctx!.strokeStyle = isAccent
              ? `rgba(201, 117, 47, ${opacity * 1.4})`
              : `rgba(168, 166, 160, ${opacity * 0.5})`;
            ctx!.lineWidth = 0.6;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // Punkte
      projected.forEach((p, i) => {
        const opacity = Math.max(0.15, (p.z + 1) / 2);
        const isAccent = i % 17 === 0;
        const r = isAccent ? 2.2 : 1.3;
        ctx!.fillStyle = isAccent
          ? `rgba(227, 167, 104, ${opacity})`
          : `rgba(232, 230, 225, ${opacity * 0.7})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, r * p.perspective, 0, Math.PI * 2);
        ctx!.fill();
      });

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
