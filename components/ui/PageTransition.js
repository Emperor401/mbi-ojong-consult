"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const brandRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    const brand = brandRef.current;

    const tl = gsap.timeline();

    tl.set(overlay, { scaleY: 1, transformOrigin: "top" })
      .set(brand, { opacity: 0, y: 10 })
      .to(brand, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" })
      .to(brand, { opacity: 0, duration: 0.2, ease: "power2.in" }, "+=0.3")
      .to(overlay, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.7,
        ease: "power4.inOut",
      })
      .fromTo(
        content,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      );
  }, [pathname]);

  return (
    <div className="relative">
      {/* Loader overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black z-[9998] pointer-events-none flex flex-col items-center justify-center"
        style={{ transformOrigin: "top" }}
      >
        {/* Branding */}
        <div ref={brandRef} className="flex flex-col items-center gap-3">
          <span className="w-3 h-3 bg-white rotate-45 inline-block" />
          <span
            className="font-bebas text-white tracking-[0.5em] uppercase"
            style={{ fontSize: "clamp(1rem, 3vw, 1.4rem)" }}
          >
            Mbi Ojong
          </span>
          <span
            className="font-satoshi text-white/30 tracking-[0.3em] uppercase"
            style={{ fontSize: "clamp(0.55rem, 1.2vw, 0.65rem)" }}
          >
            AML Investigation Analyst
          </span>
        </div>

      </div>

      {/* Page content */}
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
