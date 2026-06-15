"use client";
import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Hero() {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const integrityRef = useRef(null);
  const eyebrowRef = useRef(null);
  const bottomRef = useRef(null);
  const tmRef = useRef(null);

  const fitLines = useCallback(() => {
    const vw = window.innerWidth;
    [line1Ref, line2Ref].forEach((ref) => {
      if (!ref.current) return;
      let lo = 10, hi = 1200;
      while (hi - lo > 0.5) {
        const mid = (lo + hi) / 2;
        ref.current.style.fontSize = mid + "px";
        ref.current.scrollWidth <= vw ? (lo = mid) : (hi = mid);
      }
      ref.current.style.fontSize = lo + "px";
    });
  }, []);

  useEffect(() => {
    gsap.set(eyebrowRef.current, { opacity: 0 });
    gsap.set(tmRef.current, { opacity: 0, y: 12 });
    gsap.set(integrityRef.current, { opacity: 0, x: -70, filter: "blur(12px)" });
    gsap.set(bottomRef.current?.querySelectorAll(".fi"), { opacity: 0, y: 22 });

    let ctx;

    const run = () => {
      ctx?.revert();
      fitLines();

      const chars1 = line1Ref.current?.querySelectorAll(".ch");
      const chars2 = line2Ref.current?.querySelectorAll(".ch");
      const ewChars = eyebrowRef.current?.querySelectorAll(".ew-char");

      ctx = gsap.context(() => {
        gsap.set([chars1, chars2], { y: "110%", opacity: 0 });
        gsap.set(ewChars, { opacity: 0, y: 10, filter: "blur(6px)" });
        gsap.set(eyebrowRef.current, { opacity: 1 });

        const tl = gsap.timeline({ delay: 0.15 });
        tl
          .to(ewChars, {
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: 0.55, ease: "power3.out", stagger: 0.022,
          })
          .to(tmRef.current, {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          }, "<")
          .to(chars1, {
            y: "0%", opacity: 1, duration: 0.8, ease: "power4.out", stagger: 0.028,
          }, "-=0.4")
          .to(chars2, {
            y: "0%", opacity: 1, duration: 0.8, ease: "power4.out", stagger: 0.028,
          }, "-=0.55")
          .to(integrityRef.current, {
            opacity: 1, x: 0, filter: "blur(0px)", duration: 1.3, ease: "power3.out",
          }, "-=0.55")
          .to(bottomRef.current?.querySelectorAll(".fi"), {
            y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1,
          }, "-=0.9");
      });
    };

    const timeout = setTimeout(run, 400);
    document.fonts.ready.then(() => {
      clearTimeout(timeout);
      run();
    });

    window.addEventListener("resize", fitLines);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", fitLines);
      ctx?.revert();
    };
  }, [fitLines]);

  return (
    <section className="relative min-h-screen bg-black flex flex-col overflow-hidden">

      {/* Subtle red depth glow */}
      <div
        className="absolute bottom-0 right-0 w-[700px] h-[700px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px",
        }}
      />

      {/* TM badge */}
      <div ref={tmRef} className="absolute top-24 right-6 z-10">
        <span className="font-satoshi text-white/25 text-[9px] tracking-[0.4em] uppercase">TM</span>
      </div>

      {/* Eyebrow */}
      <div ref={eyebrowRef} className="px-5 md:px-8 pt-28">
        <div className="flex items-center gap-3">
          <span className="w-5 h-px bg-red-600 flex-shrink-0" />
          <span className="font-satoshi text-[11px] sm:text-xs text-white/90 tracking-[0.28em] sm:tracking-[0.38em] uppercase font-medium">
            {"AML Investigation Analyst — Guidehouse, Vilnius".split("").map((char, i) => (
              <span
                key={i}
                className="ew-char"
                style={{ display: char === " " ? "inline" : "inline-block" }}
              >
                {char}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Headlines */}
      <div className="flex-1 flex flex-col justify-center">
        {/* EMPOWERING */}
        <div className="overflow-hidden">
          <div
            ref={line1Ref}
            className="font-bebas text-white leading-[0.9] tracking-tight whitespace-nowrap"
            style={{ fontSize: "14vw" }}
          >
            {"EMPOWERING".split("").map((c, i) => (
              <span key={i} className="ch inline-block">{c}</span>
            ))}
          </div>
        </div>

        {/* FINANCIAL */}
        <div className="overflow-hidden">
          <div
            ref={line2Ref}
            className="font-bebas text-white leading-[0.9] tracking-tight whitespace-nowrap"
            style={{ fontSize: "14vw" }}
          >
            {"FINANCIAL".split("").map((c, i) => (
              <span key={i} className="ch inline-block">{c}</span>
            ))}
          </div>
        </div>

        {/* integrity */}
        <div className="pl-4 md:pl-8 mt-4 sm:mt-6">
          <span
            ref={integrityRef}
            className="font-script italic text-red-600 leading-none"
            style={{ fontSize: "clamp(2.2rem, 8vw, 130px)" }}
          >
            integrity
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div ref={bottomRef} className="px-5 md:px-8 pb-8 sm:pb-10 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 sm:gap-6">

          <p className="fi font-satoshi text-white/80 text-xs leading-relaxed max-w-[260px]">
            Hands-on AML investigator at Guidehouse and Western Union —
            detecting financial crime and safeguarding compliance worldwide.
          </p>

          <div className="fi flex items-center gap-4 sm:gap-5">
            <div>
              <p className="font-bebas text-xl sm:text-2xl text-white leading-none">3+</p>
              <p className="font-satoshi text-white/25 text-[9px] tracking-widest uppercase mt-0.5">Years</p>
            </div>
            <div className="w-px h-7 bg-white/10" />
            <div>
              <p className="font-bebas text-xl sm:text-2xl text-white leading-none">4</p>
              <p className="font-satoshi text-white/25 text-[9px] tracking-widest uppercase mt-0.5">Certs</p>
            </div>
            <div className="w-px h-7 bg-white/10" />
            <Link
              href="/contact"
              className="font-satoshi text-[10px] tracking-[0.3em] uppercase text-red-600 hover:text-white transition-colors duration-300"
            >
              Book a Call ↗
            </Link>
          </div>

          <span className="fi hidden md:block font-satoshi text-white/20 text-[9px] tracking-[0.4em] uppercase">
            Scroll ↓
          </span>

        </div>
      </div>
    </section>
  );
}
