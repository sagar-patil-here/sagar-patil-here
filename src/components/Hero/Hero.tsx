"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageGlowRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const nameAccentRef = useRef<HTMLDivElement>(null);
  const leftTitlesRef = useRef<HTMLSpanElement[]>([]);
  const rightTitlesRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 3.2,
      });

      // 1. Image reveals — the star of the show
      tl.to(imageWrapperRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "power3.out",
      });

      // 2. Image glow
      tl.to(
        imageGlowRef.current,
        { opacity: 1, duration: 1.2, ease: "power2.out" },
        "-=0.8"
      );

      // 3. Tagline
      gsap.set(`.${styles.taglineInner}`, { y: 40, opacity: 0 });
      tl.to(
        `.${styles.taglineInner}`,
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // 4. LEFT TEXT — slides up
      leftTitlesRef.current.forEach((el, i) => {
        gsap.set(el, { y: 110, opacity: 0 }); // hide immediately
        tl.to(
          el,
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power4.out",
          },
          i === 0 ? "-=0.3" : "-=0.7"
        );
      });

      // 5. RIGHT TEXT — slides up
      rightTitlesRef.current.forEach((el, i) => {
        gsap.set(el, { y: 110, opacity: 0 }); // hide immediately
        tl.to(
          el,
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power4.out",
          },
          i === 0 ? "-=0.6" : "-=0.7"
        );
      });

      // 6. Bottom bar
      tl.to(
        bottomLeftRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      // 7. Scroll indicator
      tl.to(
        scrollIndicatorRef.current,
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

      // 8. Name accent
      tl.to(
        nameAccentRef.current,
        { opacity: 0.6, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

      // ── Scroll Parallax ──
      // Image drifts up
      gsap.to(imageWrapperRef.current, {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Left text drifts down (diverging from image)
      gsap.to(`.${styles.textLeft}`, {
        y: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Right text drifts up (diverging from image)
      gsap.to(`.${styles.textRight}`, {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Scroll indicator fades on scroll
      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        y: -20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "5% top",
          end: "15% top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero} id="hero">
      {/* Tagline — top left */}
      <div className={styles.tagline}>
        <span className={styles.taglineInner}>
          <span className={styles.taglineLine} />
         
        </span>
      </div>

      {/* ═══ LEFT TEXT BLOCK ═══
          Positioned in the dark space to the left of body,
          at chest/torso height. Bold white. */}
      <div className={styles.textLeft}>
        <div className={styles.textLeftInner}>
          <span
            ref={(el) => { if (el) leftTitlesRef.current[0] = el; }}
            className={styles.titleLeft}
          >
            Full
          </span>
        </div>
        <div className={styles.textLeftInner}>
          <span
            ref={(el) => { if (el) leftTitlesRef.current[1] = el; }}
            className={styles.titleLeft}
          >
            Stack
          </span>
        </div>
      </div>

      {/* ═══ RIGHT TEXT BLOCK ═══
          Positioned to the right of the head/shoulder,
          stacked vertically. Bold white. */}
      <div className={styles.textRight}>
        <div className={styles.textRightInner}>
          <span
            ref={(el) => { if (el) rightTitlesRef.current[0] = el; }}
            className={styles.titleRight}
          >
            Devel
          </span>
        </div>
        <div className={styles.textRightInner}>
          <span
            ref={(el) => { if (el) rightTitlesRef.current[1] = el; }}
            className={styles.titleRight}
          >
            oper
          </span>
        </div>
        <div className={styles.textRightInner}>
          <span
            ref={(el) => { if (el) rightTitlesRef.current[2] = el; }}
            className={styles.titleRight}
          >
            &
          </span>
        </div>
        <div className={styles.textRightInner}>
          <span
            ref={(el) => { if (el) rightTitlesRef.current[3] = el; }}
            className={styles.titleRight}
          >
            Designer
          </span>
        </div>
      </div>

      {/* ═══ IMAGE — CENTER FOCAL POINT ═══ */}
      <div className={styles.imageContainer}>
        <div ref={imageWrapperRef} className={styles.imageWrapper}>
          <Image
            src="/images/hero-sagar.png"
            alt="Sagar Patil — Full Stack Developer & Designer"
            fill
            className={styles.heroImage}
            priority
            sizes="100vw"
          />
          <div ref={imageGlowRef} className={styles.imageGlow} />
        </div>
      </div>

      {/* Name accent — right side vertical */}
      {/* <div ref={nameAccentRef} className={styles.nameAccent}>
        Sagar Patil
      </div> */}

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div ref={bottomLeftRef} className={styles.bottomLeft}>
          <p className={styles.subtitle}>
            Crafting premium digital experiences where engineering logic meets
            design aesthetics.
          </p>
          <div className={styles.ctaRow}>
            <a href="#contact" className={styles.cta}>
              Get in Touch
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <a href="#projects" className={styles.ctaSecondary}>
              View Work
            </a>
          </div>
        </div>

        <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
          <span className={styles.scrollText}>Scroll</span>
          <div className={styles.scrollLine} />
        </div>
      </div>
    </section>
  );
}
