"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;

    // Page enter animation
    const tl = gsap.timeline();

    tl.set(overlay, { scaleY: 1, transformOrigin: "top" })
      .to(overlay, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.8,
        ease: "power4.inOut",
      })
      .fromTo(
        content,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );
  }, [pathname]);

  return (
    <div className="relative">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-red-600 z-[9998] pointer-events-none"
        style={{ transformOrigin: "top" }}
      />
      {/* Content */}
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}