"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Skills.module.css";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_SKILLS = [
  "React",
  "Node.js",
  "JavaScript",
  "Python",
  "Java",
  "MongoDB",
  "GSAP",
  "TypeScript",
  "Express",
  "SQL",
  "Tailwind",
  "Git",
  "DSA",
  "AI",
  "Cyber Security",
  "Spring Boot",
  "Kafka",
  "Redis",
  "Hibernate",
];

const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    icon: "✦",
    skills: ["React", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "GSAP"],
  },
  {
    title: "Backend",
    icon: "✦",
    skills: ["Node.js", "Express", "MongoDB", "MySQL", "API Integration", "Redis", "Apache Kafka"],
  },
  {
    title: "Java Ecosystem",
    icon: "✦",
    skills: [
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "Hibernate ORM",
      "REST API Architecture",
      "Dependency Injection & IoC",
      "JWT Authentication",
      "JUnit 5 & Mockito",
      "Spring Boot Actuator",
    ],
  },
  {
    title: "Languages",
    icon: "✦",
    skills: ["JavaScript", "Python", "Java", "PHP", "SQL", "TypeScript"],
  },
  {
    title: "Tools & Libraries",
    icon: "✦",
    skills: ["Git", "GitHub", "GSAP", "Locomotive Scroll", "Swiper.js", "VS Code"],
  },
  {
    title: "Specializations",
    icon: "✦",
    skills: [
      "Data Structures & Algorithms",
      "Cyber Security",
      "Operating Systems",
      "AI",
      "Android Development",
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite marquee - row 1 (left to right)
      if (marqueeRef1.current) {
        const width = marqueeRef1.current.scrollWidth / 2;
        gsap.to(marqueeRef1.current, {
          x: -width,
          duration: 30,
          ease: "none",
          repeat: -1,
        });
      }

      // Infinite marquee - row 2 (right to left)
      if (marqueeRef2.current) {
        const width = marqueeRef2.current.scrollWidth / 2;
        gsap.set(marqueeRef2.current, { x: -width });
        gsap.to(marqueeRef2.current, {
          x: 0,
          duration: 35,
          ease: "none",
          repeat: -1,
        });
      }

      // Stagger list items on scroll
      gsap.to(`.${styles.listItem}`, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.list}`,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderMarqueeItems = () =>
    MARQUEE_SKILLS.map((skill, i) => (
      <span key={i}>
        <span className={styles.marqueeItem}>{skill}</span>
        <span className={styles.marqueeSeparator}>✦</span>
      </span>
    ));

  return (
    <section ref={sectionRef} className={styles.skills} id="skills">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <div className={styles.label}>
              <span className={styles.labelLine} />
              Expertise
            </div>
            <h2 className={styles.title}>Tech Stack</h2>
          </div>
        </div>
      </div>

      {/* Marquee Row 1 */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeRow}>
          <div ref={marqueeRef1} className={styles.marqueeTrack}>
            {renderMarqueeItems()}
            {renderMarqueeItems()}
          </div>
        </div>
        <div className={styles.marqueeRow}>
          <div ref={marqueeRef2} className={styles.marqueeTrack}>
            {renderMarqueeItems()}
            {renderMarqueeItems()}
          </div>
        </div>
      </div>

      {/* Skill List (Card-less layout) */}
      <div className={styles.inner}>
        <div className={styles.list}>
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.title} className={styles.listItem}>
              <div className={styles.listHeader}>
                <span className={styles.listIcon}>{category.icon}</span>
                <h3 className={styles.listTitle}>{category.title}</h3>
              </div>
              <div className={styles.listContent}>
                <div className={styles.listContentInner}>
                  <div className={styles.skillTags}>
                    {category.skills.map((skill, index) => (
                      <span key={index} className={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
