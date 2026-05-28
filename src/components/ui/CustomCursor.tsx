"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.to(dot, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.08,
      ease: "none",
    });
    gsap.to(ring, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.35,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Start hidden
    gsap.set([dot, ring], { opacity: 0 });

    const onEnter = () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    const onLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 });

    const onHoverEnter = () => {
      isHovering.current = true;
      ring.classList.add("hovering");
      gsap.to(ring, {
        width: 56,
        height: 56,
        borderColor: "rgba(212,175,55,0.9)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, {
        scale: 0,
        duration: 0.2,
      });
    };

    const onHoverLeave = () => {
      isHovering.current = false;
      ring.classList.remove("hovering");
      gsap.to(ring, {
        width: 36,
        height: 36,
        borderColor: "rgba(212,175,55,0.5)",
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.3,
      });
    };

    // Handle interactive elements
    const attachListeners = () => {
      const els = document.querySelectorAll<HTMLElement>(
        "a, button, [data-cursor-hover], input, select, textarea, label"
      );
      els.forEach((el) => {
        el.addEventListener("mouseenter", onHoverEnter);
        el.addEventListener("mouseleave", onHoverLeave);
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    // Attach on mount + after short delay (for dynamically rendered elements)
    attachListeners();
    const t = setTimeout(attachListeners, 1000);

    // Use MutationObserver to catch new elements
    const observer = new MutationObserver(() => attachListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      clearTimeout(t);
      observer.disconnect();
    };
  }, [onMouseMove]);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
}
