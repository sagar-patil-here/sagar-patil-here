"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;

    const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const xCircle = gsap.quickTo(circle, "x", {
      duration: 0.4,
      ease: "power3.out",
    });
    const yCircle = gsap.quickTo(circle, "y", {
      duration: 0.4,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xCircle(e.clientX);
      yCircle(e.clientY);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    window.addEventListener("mousemove", handleMouseMove);

    // Attach hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [data-cursor="pointer"], input, textarea'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // Re-attach listeners when DOM changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);

      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor="pointer"], input, textarea'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.dot} />
      <div
        ref={circleRef}
        className={`${styles.circle} ${isHovered ? styles.hovered : ""}`}
      >
        <span className={styles.label}>View</span>
      </div>
    </>
  );
}
