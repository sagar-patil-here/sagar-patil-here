"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./Navbar.module.css";
import MagneticButton from "../MagneticButton/MagneticButton";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    // No JS entrance or scroll tracking needed for the static absolute navbar
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={styles.nav}
        id="navbar"
      >
        <div className={styles.inner}>
          <MagneticButton strength={0.2}>
            <a
              href="#"
              className={styles.logo}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Sagar
            </a>
          </MagneticButton>

          <div className={styles.links}>
            {NAV_LINKS.map((link) => (
              <MagneticButton key={link.label} strength={0.25}>
                <a
                  href={link.href}
                  className={styles.link}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                >
                  {link.label}
                </a>
              </MagneticButton>
            ))}
          </div>

          <button
            className={`${styles.hamburger} ${isMobileOpen ? styles.active : ""}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${isMobileOpen ? styles.active : ""}`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={styles.mobileLink}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(link.href);
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
