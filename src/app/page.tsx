"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader/Preloader";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Experience from "@/components/Experience/Experience";
import Projects from "@/components/Projects/Projects";
import Education from "@/components/Education/Education";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

const CustomCursor = dynamic(
  () => import("@/components/CustomCursor/CustomCursor"),
  { ssr: false }
);

const SmoothScroll = dynamic(
  () => import("@/components/SmoothScroll/SmoothScroll"),
  { ssr: false }
);

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
    document.body.style.overflow = "auto";
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <main
          className={`page-wrapper ${isLoaded ? "loaded" : ""}`}
          role="main"
        >
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
