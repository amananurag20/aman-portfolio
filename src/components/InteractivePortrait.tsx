"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./InteractivePortrait.module.css";

export default function InteractivePortrait() {
  const surfaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let x = 0;
    let y = 0;

    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      surface.removeAttribute("data-active");
      for (const property of ["--rotate-x", "--rotate-y", "--light-x", "--light-y"]) {
        surface.style.removeProperty(property);
      }
    };

    const paint = () => {
      frame = 0;
      surface.style.setProperty("--rotate-x", `${-y * 7}deg`);
      surface.style.setProperty("--rotate-y", `${x * 9}deg`);
      surface.style.setProperty("--light-x", `${(x + 1) * 50}%`);
      surface.style.setProperty("--light-y", `${(y + 1) * 50}%`);
      surface.dataset.active = "true";
    };

    const move = (event: PointerEvent) => {
      if (!motion.matches || !pointer.matches || event.pointerType === "touch") return;
      // Measure the stationary surface so the tilt never feeds back into its bounds.
      const bounds = surface.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
      y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1));
      if (!frame) frame = requestAnimationFrame(paint);
    };

    surface.addEventListener("pointermove", move);
    surface.addEventListener("pointerleave", reset);
    surface.addEventListener("pointercancel", reset);
    motion.addEventListener("change", reset);
    pointer.addEventListener("change", reset);
    window.addEventListener("blur", reset);

    return () => {
      reset();
      surface.removeEventListener("pointermove", move);
      surface.removeEventListener("pointerleave", reset);
      surface.removeEventListener("pointercancel", reset);
      motion.removeEventListener("change", reset);
      pointer.removeEventListener("change", reset);
      window.removeEventListener("blur", reset);
    };
  }, []);

  return (
    <aside className="hero-portrait-stage reveal-up delay-three" aria-label="Featured portrait of Aman Anurag">
      <div className={`portrait-halo ${styles.halo}`} aria-hidden="true" />
      <div ref={surfaceRef} className={styles.surface}>
        <div className={styles.card}>
          <div className={styles.imageLayer}>
            <Image
              src="/assests/aman-hero-portrait-v3.png"
              alt="Aman Anurag, Senior Full Stack Engineer"
              fill
              priority
              unoptimized
              sizes="(max-width: 620px) 310px, (max-width: 980px) 362px, 402px"
              className="hero-portrait-image"
            />
            <div className="portrait-vignette" aria-hidden="true" />
            <div className="portrait-scanline" aria-hidden="true" />
          </div>
          <div className={styles.light} aria-hidden="true" />
          <span className={`featured-badge ${styles.badge}`}>FEATURED ENGINEER</span>
          <div className={`portrait-credit ${styles.credit}`}>
            <div>
              <span>AMAN ANURAG</span>
              <small>SENIOR FULL STACK DEVELOPER</small>
            </div>
            <strong>AA</strong>
          </div>
          <div className={styles.edge} aria-hidden="true" />
        </div>
      </div>
      <div className={`portrait-specs ${styles.specs}`}>
        <span><strong>4+</strong> YEARS</span>
        <span><strong>25+</strong> APIs</span>
        <span><strong>99.9%</strong> UPTIME</span>
      </div>
    </aside>
  );
}
