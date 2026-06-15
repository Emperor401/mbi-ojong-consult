"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const certificates = [
  {
    title: "Analytic Investigations (Intermediate Level)",
    short: "ANALYTIC INVESTIGATIONS",
    issuer: "Udemy",
    category: "Fintech",
    image: "/cert1.jpeg",
  },
  {
    title: "The Complete Guide To Anti Money Laundering (AML) Compliance",
    short: "AML COMPLIANCE",
    issuer: "Udemy",
    category: "AML",
    image: "/cert2.png",
  },
  {
    title: "Financial Crime: Processes & Technology - Masterclass",
    short: "FINANCIAL CRIME MASTERCLASS",
    issuer: "Udemy",
    category: "Financial Crime",
    image: "/cert3.png",
  },
  {
    title: "Professional Certificate in Regulatory Compliance",
    short: "REGULATORY COMPLIANCE",
    issuer: "Udemy",
    category: "Compliance",
    image: "/cert4.png",
  },
];

export default function CertificatesPage() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current.querySelectorAll(".reveal-word"),
        { y: 120, opacity: 0, skewY: 5 },
        {
          y: 0, opacity: 1, skewY: 0, duration: 1, ease: "power4.out",
          stagger: 0.08, delay: 0.5,
        }
      );

      gsap.fromTo(
        counterRef.current,
        { innerText: 0 },
        {
          innerText: 4, duration: 2.5, ease: "power2.out",
          snap: { innerText: 1 }, delay: 0.8,
        }
      );

      gsap.fromTo(
        gridRef.current.querySelectorAll(".cert-card"),
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          stagger: 0.1, delay: 0.6,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black min-h-screen">

      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-10 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div ref={heroRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">

            <div>
              <div className="flex items-center gap-3 mb-5 md:mb-6">
                <div className="w-8 h-px bg-red-600" />
                <span className="font-satoshi text-xs text-red-600 tracking-[0.4em] uppercase">
                  Credentials
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="reveal-word inline-block font-bebas text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[10vw] text-white leading-none tracking-tight">
                  CERTIFIED
                </span>
              </div>
              <div className="overflow-hidden -mt-2 md:-mt-4">
                <span className="reveal-word inline-block font-satoshi italic text-red-600 text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[4vw] font-bold">
                  excellence
                </span>
              </div>
            </div>

            <div className="flex items-end gap-2 mb-0 md:mb-4">
              <span
                ref={counterRef}
                className="font-bebas text-[16vw] sm:text-[12vw] md:text-[8vw] text-white leading-none"
              >
                0
              </span>
              <div className="flex flex-col mb-1 md:mb-2">
                <span className="font-bebas text-2xl md:text-3xl text-red-600">/100</span>
                <span className="font-satoshi text-xs text-white/30 tracking-widest uppercase">
                  Certificates
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="px-6 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {certificates.map((cert, i) => (
              <div
                key={i}
                className="cert-card group rounded-2xl md:rounded-3xl overflow-hidden bg-black"
              >
                <div className="relative">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-auto block"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 md:px-5 pt-10 md:pt-12 pb-4 md:pb-5">
                    <h3 className="font-bebas text-white text-[clamp(1.4rem,3vw,2.8rem)] leading-[1] uppercase tracking-wide">
                      {cert.short}
                    </h3>
                    <p className="font-satoshi text-white/50 text-xs mt-1 tracking-widest uppercase">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
