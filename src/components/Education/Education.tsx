"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Education.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(`.${styles.card}`, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.cards}`,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.education} id="education">
      <div className={styles.inner}>
        <div className={styles.label}>
          <span className={styles.labelLine} />
          Academic Background
        </div>
        <h2 className={styles.title}>Education</h2>

        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.cardYear}>2024 — Present</div>
            <h3 className={styles.cardDegree}>
              B.Tech in Computer Science Engineering
            </h3>
            <p className={styles.cardInstitution}>
              G.H. Raisoni College of Engineering and Management, Pune
            </p>
            <p className={styles.cardDescription}>
              Specializing in Cyber Security alongside core computer science.
              Serving as Head of the Magazine Committee and active member of the
              GeeksforGeeks (GFG) Student Chapter, organizing campus events and
              hackathons.
            </p>
            <div className={styles.badges}>
              <span className={styles.badge}>Cyber Security</span>
              <span className={styles.badge}>Magazine Head</span>
              <span className={styles.badge}>GFG Chapter</span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardYear}>2021 — 2024</div>
            <h3 className={styles.cardDegree}>Diploma in Computer Science</h3>
            <p className={styles.cardInstitution}>
              CSMSS College of Polytechnic, Chh. Sambhajinagar (Aurangabad)
            </p>
            <p className={styles.cardDescription}>
              Built the foundational stage of technical career — exploring
              multiple programming languages, gaining early software development
              experience, and honing core technical and communication skills that
              drive every project today.
            </p>
            <div className={styles.badges}>
              <span className={styles.badge}>Foundation</span>
              <span className={styles.badge}>Software Dev</span>
              <span className={styles.badge}>Programming</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
