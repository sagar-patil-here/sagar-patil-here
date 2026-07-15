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
  const nameRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Animate the counter from 0 to 100
    const counter = { value: 0 };
    tl.to(counter, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        setCount(Math.floor(counter.value));
      },
    });

    // Animate the golden line
    tl.to(
      lineRef.current,
      {
        height: "60px",
        duration: 0.8,
        ease: "power2.out",
      },
      0.3
    );

    // Reveal name
    tl.to(
      nameRef.current,
      {
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      0.8
    );

    // Slide up the entire preloader
    tl.to(
      preloaderRef.current,
      {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        delay: 0.3,
      },
      ">"
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
      <div ref={lineRef} className={styles.line} />
      <div className={styles.counterWrapper}>
        <span ref={counterRef} className={styles.counter}>
          {String(count).padStart(3, "0")}
        </span>
      </div>
      <div className={styles.nameWrapper}>
        <div ref={nameRef} className={styles.name}>
          Sagar Patil
        </div>
      </div>
    </div>
  );
}
