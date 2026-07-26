"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Projects.module.css";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    name: "Tars-Chats",
    description: "Real-time AI chat application with Convex & Next.js 15",
    tags: ["Next.js", "TypeScript", "Convex"],
    live: "https://chat-tars.vercel.app/",
    github: "https://github.com/sagar-patil-here/Tars_FullStack_Platform",
    color: "linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)"
  },
  {
    name: "CropSavior",
    description: "Modern web application for farmers using React & Vite",
    tags: ["React", "TypeScript", "Vite"],
    live: "https://cropsavior.vercel.app/",
    github: "https://github.com/sagar-patil-here/cropsavior",
    color: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)"
  },
  {
    name: "Gesture Control",
    description: "Hand gesture control interface powered by Computer Vision",
    tags: ["Python", "OpenCV", "AI"],
    live: "https://gesture-control-host.vercel.app/",
    github: "https://github.com/sagar-patil-here/Gesture-Control-by-hand",
    color: "linear-gradient(135deg, #654ea3 0%, #eaafc8 100%)"
  },
  {
    name: "Legal.ai",
    description: "Intelligent legal AI assistant bot",
    tags: ["Bot", "AI", "Legal"],
    live: "https://legal-aibot.vercel.app/",
    github: "https://github.com/sagar-patil-here/Legal.ai",
    color: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cursorImageRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isListHovered, setIsListHovered] = useState(false);

  useEffect(() => {
    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        y: -activeIndex * 220, // 220px is the container height
        duration: 0.5,
        ease: "power3.out"
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(`.${styles.projectItem}`, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: `.${styles.projectList}`,
          start: "top 80%",
        },
      });
    }, sectionRef);

    // Mouse movement for floating image
    const moveImage = (e: MouseEvent) => {
      if (!cursorImageRef.current) return;
      gsap.to(cursorImageRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveImage);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", moveImage);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.projects} id="projects">
      {/* Floating Image Cursor */}
      <div 
        ref={cursorImageRef} 
        className={`${styles.cursorImageContainer} ${isListHovered ? styles.active : ""}`}
      >
        <div ref={sliderRef} className={styles.cursorImageSlider}>
          {PROJECTS.map((project, idx) => (
            <div 
              key={idx}
              className={styles.cursorImage}
              style={{ background: project.color }}
            >
              <iframe
                src={project.live}
                title={project.name}
                className={styles.previewIframe}
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
                tabIndex={-1}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <div className={styles.label}>
              <span className={styles.labelLine} />
              Selected Works
            </div>
            <h2 className={styles.title}>Live Projects</h2>
          </div>
          <a
            href="https://github.com/sagar-patil-here?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            View All Repos
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

        <div 
          className={styles.projectList}
          onMouseEnter={() => setIsListHovered(true)}
          onMouseLeave={() => setIsListHovered(false)}
        >
          {PROJECTS.map((project, index) => (
            <div
              key={project.name}
              className={styles.projectItem}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <a 
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLinkBox}
              >
                <div className={styles.projectLeft}>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                </div>
              </a>

              <div className={styles.projectRight}>
                <div className={styles.projectTags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.projectTag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.actionButtons}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.iconButton} aria-label="View Source">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.iconButton} aria-label="Live Preview">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
