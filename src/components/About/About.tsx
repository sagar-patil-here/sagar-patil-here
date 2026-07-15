"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_TEXT =
  "I'm a Full Stack Web Developer & Designer who thrives at the intersection of engineering logic and design aesthetics. I build premium digital experiences — from interactive frontends to robust backend systems — that leave a lasting impression.";

const HIGHLIGHT_WORDS = [
  "Full",
  "Stack",
  "Developer",
  "Designer",
  "premium",
  "digital",
  "experiences",
  "impression",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = wordsRef.current.filter(Boolean);

      // Word-by-word reveal on scroll
      words.forEach((word, i) => {
        gsap.to(word, {
          color: HIGHLIGHT_WORDS.includes(word?.textContent || "")
            ? "var(--accent)"
            : "var(--text-primary)",
          scrollTrigger: {
            trigger: word,
            start: "top 85%",
            end: "top 50%",
            scrub: 0.5,
          },
        });
      });

      // Stats animation
      gsap.to(`.${styles.stat}`, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.stats}`,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = ABOUT_TEXT.split(" ");

  return (
    <section ref={sectionRef} className={styles.about} id="about">
      <span className={styles.sideLabel}>About</span>
      <div className={styles.inner}>
        <div className={styles.label}>
          <span className={styles.labelLine} />
          Who I Am
        </div>

        <p className={styles.revealText}>
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => {
                wordsRef.current[i] = el;
              }}
              className={`${styles.word} ${
                HIGHLIGHT_WORDS.includes(word) ? styles.highlightWord : ""
              }`}
            >
              {word}
            </span>
          ))}
        </p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statNumber}>
              3<span className={styles.statNumberAccent}>+</span>
            </div>
            <div className={styles.statLabel}>Projects Completed</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>
              1<span className={styles.statNumberAccent}>+</span>
            </div>
            <div className={styles.statLabel}>Years Experience</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>
              10<span className={styles.statNumberAccent}>+</span>
            </div>
            <div className={styles.statLabel}>Technologies</div>
          </div>
        </div>
      </div>
    </section>
  );
}
