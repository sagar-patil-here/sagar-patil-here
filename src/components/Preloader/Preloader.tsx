"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./Preloader.module.css";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const loadingBarRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // 1. Loading bar scaling up
    gsap.set(loadingBarRef.current, { scaleX: 0, transformOrigin: "left center" });

    // 2. Animate counter 0 to 100 and scale bar simultaneously
    const counter = { value: 0 };
    tl.to(
      counter,
      {
        value: 100,
        duration: 3, // slightly faster, snappier loading
        ease: "power3.inOut",
        onUpdate: () => {
          setCount(Math.floor(counter.value));
        },
      }
    );

    tl.to(
      loadingBarRef.current,
      {
        scaleX: 1,
        duration: 3,
        ease: "power3.inOut",
      },
      "<" // Sync with previous animation
    );

    // 3. Slide the entire preloader up like a curtain
    tl.to(
      preloaderRef.current,
      {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      },
      "+=0.3" // Slight pause at 100%
    );

    // Add hidden class completely
    tl.set(preloaderRef.current, {
      className: `${styles.preloader} ${styles.hidden}`,
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className={styles.preloader}>
      <div className={styles.content}>
        <div className={styles.counterWrapper}>
          <span
            ref={counterRef}
            className={styles.counter}
          >
            {count}%
          </span>
        </div>
      </div>

      {/* Loading Progress Bar at bottom */}
      <div className={styles.loadingBarContainer}>
        <div ref={loadingBarRef} className={styles.loadingBar}></div>
      </div>
    </div>
  );
}
