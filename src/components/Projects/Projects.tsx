"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Projects.module.css";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    name: "Portfolio Website",
    tags: ["Next.js", "GSAP", "Lenis"],
    link: "https://github.com/sagar-patil-here",
  },
  {
    name: "MERN Stack App",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    link: "https://github.com/sagar-patil-here",
  },
  {
    name: "Data Visualization",
    tags: ["Python", "Pandas", "Matplotlib"],
    link: "https://github.com/sagar-patil-here",
  },
  {
    name: "Cyber Security Tool",
    tags: ["Python", "Networking", "Security"],
    link: "https://github.com/sagar-patil-here",
  },
  {
    name: "Android Application",
    tags: ["Java", "Android SDK", "Firebase"],
    link: "https://github.com/sagar-patil-here",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(`.${styles.projectItem}`, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.projectList}`,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.projects} id="projects">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <div className={styles.label}>
              <span className={styles.labelLine} />
              Portfolio
            </div>
            <h2 className={styles.title}>Selected Work</h2>
          </div>
          <a
            href="https://github.com/sagar-patil-here"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            View All on GitHub
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>

        <div className={styles.projectList}>
          {PROJECTS.map((project, index) => (
            <a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectItem}
              data-cursor="pointer"
            >
              <div className={styles.projectLeft}>
                <span className={styles.projectIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.projectName}>{project.name}</h3>
              </div>

              <div className={styles.projectRight}>
                <div className={styles.projectTags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.projectTag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.projectArrow}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>

              <div className={styles.projectImagePreview}>
                <span className={styles.previewPlaceholder}>
                  {project.name.charAt(0)}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
