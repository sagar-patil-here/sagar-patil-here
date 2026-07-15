"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Experience.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line drawing
      gsap.to(lineRef.current, {
        height: "100%",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.timeline}`,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 1,
        },
      });

      // Animate timeline items
      gsap.to(`.${styles.timelineItem}`, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.timeline}`,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.experience} id="experience">
      <div className={styles.inner}>
        <div className={styles.label}>
          <span className={styles.labelLine} />
          Career
        </div>
        <h2 className={styles.title}>Experience</h2>

        <div className={styles.timeline}>
          <div ref={lineRef} className={styles.timelineLine} />

          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}>
              <div className={styles.timelineDotGlow} />
            </div>
            <div className={styles.itemHeader}>
              <h3 className={styles.company}>Geotech Pvt. Ltd.</h3>
              <span className={styles.duration}>1 Month Program</span>
            </div>
            <p className={styles.role}>Data Analysis & Python Intern</p>
            <p className={styles.description}>
              Worked on real-world datasets, mastering data manipulation,
              visualization, and insights generation. Applied Python libraries
              for data analysis and contributed to actionable business
              intelligence.
            </p>
            <div className={styles.achievement}>
              <span>★</span> Awarded ₹2,000 stipend for outstanding performance
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}>
              <div className={styles.timelineDotGlow} />
            </div>
            <div className={styles.itemHeader}>
              <h3 className={styles.company}>Freelance Developer</h3>
              <span className={styles.duration}>Ongoing</span>
            </div>
            <p className={styles.role}>Full Stack Web Developer & Designer</p>
            <p className={styles.description}>
              Designing and developing premium web experiences for clients —
              combining modern frontend frameworks with robust backend systems.
              Specializing in animated, interactive websites with GSAP and
              smooth scroll implementations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
