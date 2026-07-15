"use client";

import { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import MagneticButton from "../MagneticButton/MagneticButton";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      };
      setTime(now.toLocaleTimeString("en-IN", options) + " IST");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.copyright}>
            © 2026{" "}
            <span className={styles.copyrightAccent}>Sagar Patil</span>. All
            rights reserved.
          </span>
          <span className={styles.time}>{time}</span>
        </div>

        <div className={styles.right}>
          <span className={styles.credit}>
            Designed & Built with ♡
          </span>
          <MagneticButton>
            <button
              className={styles.backToTop}
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
