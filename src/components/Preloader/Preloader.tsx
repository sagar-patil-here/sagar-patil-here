"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./Preloader.module.css";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const spiderRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // 1. Spider pendulum swing
    gsap.set(spiderRef.current, { transformOrigin: "top center", y: 0 });
    const swingAnim = gsap.fromTo(
      spiderRef.current,
      { rotation: -20 },
      { rotation: 20, duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: -1 }
    );

    // 2. Animate the counter from 0 to 100 with a Spider-Verse glitch build-up
    const counter = { value: 0 };
    tl.to(
      counter,
      {
        value: 100,
        duration: 3.5,
        ease: "power2.inOut",
        onUpdate: () => {
          setCount(Math.floor(counter.value));
        },
      }
    );

    // 3. Stop swinging and zip up rapidly
    tl.add(() => {
      swingAnim.kill();
    });
    
    tl.to(
      spiderRef.current,
      { rotation: 0, duration: 0.2, ease: "power1.out" }
    );
    
    tl.to(
      spiderRef.current,
      { y: -1000, duration: 0.4, ease: "power4.in" },
      "+=0.2"
    );

    // 4. Slide up the entire preloader, as if pulled by the web
    tl.to(
      preloaderRef.current,
      {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      },
      "-=0.2"
    );

    // Add hidden class
    tl.set(preloaderRef.current, {
      className: `${styles.preloader} ${styles.hidden}`,
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className={styles.preloader}>
      {/* Minimalist Spider & Web Thread */}
      <div className={styles.spiderContainer} ref={spiderRef}>
        <div className={styles.thread} />
        <svg
          className={styles.spider}
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Body */}
          <circle cx="12" cy="14" r="3" fill="var(--accent)" />
          <circle cx="12" cy="8" r="1.5" fill="var(--accent)" />
          {/* Left legs */}
          <path d="M10 14 C 6 14, 4 10, 2 12" />
          <path d="M10 14 C 6 16, 4 18, 2 16" />
          <path d="M10 12 C 6 10, 4 6, 2 8" />
          <path d="M10 15 C 6 18, 4 21, 2 19" />
          {/* Right legs */}
          <path d="M14 14 C 18 14, 20 10, 22 12" />
          <path d="M14 14 C 18 16, 20 18, 22 16" />
          <path d="M14 12 C 18 10, 20 6, 22 8" />
          <path d="M14 15 C 18 18, 20 21, 22 19" />
        </svg>
      </div>

      <div className={styles.content}>
        <div className={styles.counterWrapper}>
          <span 
            ref={counterRef} 
            className={styles.counter}
            data-count={String(count).padStart(3, "0")}
          >
            {String(count).padStart(3, "0")}
          </span>
        </div>

        {/* Spidey Face */}
        <div className={styles.spideyFaceWrapper}>
          <svg viewBox="0 0 100 100" className={styles.spideyFace} width="60" height="60">
            {/* Head */}
            <path d="M50 5 C 20 5, 10 25, 10 50 C 10 80, 30 95, 50 95 C 70 95, 90 80, 90 50 C 90 25, 80 5, 50 5 Z" fill="#ff003c"/>
            {/* Web lines */}
            <path d="M 50 5 L 50 95 M 25 15 Q 50 50 25 85 M 75 15 Q 50 50 75 85" stroke="#a30026" strokeWidth="1.5" fill="none"/>
            <path d="M 10 50 Q 50 35 90 50 M 15 30 Q 50 15 85 30 M 18 70 Q 50 60 82 70" stroke="#a30026" strokeWidth="1.5" fill="none"/>
            {/* Eyes */}
            <path d="M 46 42 Q 25 32 14 45 Q 18 65 42 58 Z" fill="#fff" stroke="#000" strokeWidth="4" strokeLinejoin="round"/>
            <path d="M 54 42 Q 75 32 86 45 Q 82 65 58 58 Z" fill="#fff" stroke="#000" strokeWidth="4" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className={styles.name}>Sagar Patil</div>
      </div>
    </div>
  );
}
