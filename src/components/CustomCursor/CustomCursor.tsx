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
    const xCircle = gsap.quickTo(circle, "x", { duration: 0.3, ease: "power3.out" });
    const yCircle = gsap.quickTo(circle, "y", { duration: 0.3, ease: "power3.out" });

    const scaleXCircle = gsap.quickTo(circle, "scaleX", { duration: 0.15, ease: "power2.out" });
    const scaleYCircle = gsap.quickTo(circle, "scaleY", { duration: 0.15, ease: "power2.out" });
    const rotateCircle = gsap.quickTo(circle, "rotation", { duration: 0.1, ease: "none" });

    let currentX = 0;
    let currentY = 0;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      currentX = e.clientX;
      currentY = e.clientY;
      xDot(currentX);
      yDot(currentY);
      xCircle(currentX);
      yCircle(currentY);
    };

    // F1 Aerodynamic Slipstream Effect
    const render = () => {
      const dx = currentX - lastX;
      const dy = currentY - lastY;
      const velocity = Math.sqrt(dx * dx + dy * dy);

      // We only apply the F1 slipstream stretch if we are NOT hovering over an interactive element
      if (!circle.classList.contains(styles.hovered)) {
        if (velocity > 2) {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          rotateCircle(angle);

          const stretch = 1 + Math.min(velocity * 0.04, 1.5);
          const squash = 1 - Math.min(velocity * 0.01, 0.4);

          scaleXCircle(stretch);
          scaleYCircle(squash);
        } else {
          scaleXCircle(1);
          scaleYCircle(1);
        }
      } else {
        // Reset rotation and scale on hover
        rotateCircle(0);
        scaleXCircle(1);
        scaleYCircle(1);
      }

      lastX = currentX;
      lastY = currentY;
    };

    gsap.ticker.add(render);

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
      gsap.ticker.remove(render);
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
