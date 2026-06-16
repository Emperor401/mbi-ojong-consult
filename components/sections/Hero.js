"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
);

const socials = [
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/mbi-ojong-77381-4230", label: "LinkedIn" },
  { icon: Mail, href: "mailto:Mbiojong06@gmail.com", label: "Email" },
  { icon: Phone, href: "tel:+37068845465", label: "Phone" },
];

export default function Hero() {
  const blobRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const brandRef = useRef(null);
  const dockRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = headingRef.current?.querySelectorAll(".reveal-line");
      const dockItems = dockRef.current?.querySelectorAll(".dock-item");

      gsap.set(blobRef.current, { opacity: 0, y: 40 });
      gsap.set(eyebrowRef.current, { opacity: 0, y: 10 });
      gsap.set(lines, { y: 40, opacity: 0 });
      gsap.set(imageRef.current, { opacity: 0, scale: 1.08, clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(brandRef.current, { opacity: 0, y: 30 });
      gsap.set(dockItems, { opacity: 0, x: 20 });

      const tl = gsap.timeline({ delay: 0.4 });
      tl
        .to(blobRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
        .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.6")
        .to(lines, { y: 0, opacity: 1, duration: 0.8, ease: "power4.out", stagger: 0.1 }, "-=0.45")
        .to(imageRef.current, {
          opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.out",
        }, "-=0.7")
        .to(brandRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.3")
        .to(dockItems, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out", stagger: 0.1 }, "-=0.6");
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-black overflow-hidden">

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px",
        }}
      />

      {/* Floating social dock */}
      <div
        ref={dockRef}
        className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 flex-col gap-3 z-40"
      >
        {socials.map((s, i) => {
          const Icon = s.icon;
          return (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="dock-item w-11 h-11 flex items-center justify-center rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-[24px] text-white/70 hover:text-white hover:border-white/40 transition-all duration-300"
            >
              <Icon className="w-[17px] h-[17px]" />
            </a>
          );
        })}
      </div>

      <div className="px-4 md:px-6 pt-28 md:pt-32 max-w-7xl mx-auto">

        {/* Organic blob hero card */}
        <div className="relative">
          <div
            ref={blobRef}
            className="relative bg-[#161616] border border-white/[0.14] overflow-hidden flex flex-col md:flex-row min-h-[600px] md:min-h-[620px] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
            style={{
              borderRadius: "40px",
              borderTopRightRadius: "clamp(110px, 24vw, 380px)",
              borderBottomRightRadius: "clamp(48px, 9vw, 150px)",
            }}
          >
            {/* rim light tracing the curve */}
            <div
              className="absolute top-0 right-0 pointer-events-none"
              style={{
                width: "60%",
                height: "55%",
                background: "radial-gradient(ellipse at top right, rgba(255,255,255,0.10) 0%, transparent 60%)",
              }}
            />

            {/* corner glow */}
            <div
              className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />

            {/* Left: eyebrow + heading + CTA */}
            <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-14 py-12 md:py-0">

              <div ref={eyebrowRef} className="flex items-center gap-3 mb-6 md:mb-8">
                <span className="w-5 h-px bg-white flex-shrink-0" />
                <span className="font-satoshi text-[11px] sm:text-xs text-white/90 tracking-[0.28em] uppercase font-medium">
                  AML Investigation Analyst — Guidehouse, Vilnius
                </span>
              </div>

              <div ref={headingRef} className="mb-8 md:mb-10">
                <div className="overflow-hidden">
                  <span className="reveal-line block font-bebas text-white text-[10vw] sm:text-[7vw] md:text-[4.4vw] lg:text-[3.4vw] leading-[1.05] tracking-tight">
                    Detecting financial crime,
                  </span>
                </div>
                <div className="overflow-hidden">
                  <span className="reveal-line block font-bebas text-white text-[10vw] sm:text-[7vw] md:text-[4.4vw] lg:text-[3.4vw] leading-[1.05] tracking-tight">
                    safeguarding businesses
                  </span>
                </div>
                <div className="overflow-hidden">
                  <span className="reveal-line block font-bebas text-white text-[10vw] sm:text-[7vw] md:text-[4.4vw] lg:text-[3.4vw] leading-[1.05] tracking-tight">
                    that demand{" "}
                    <span className="font-script italic text-white normal-case">integrity</span>.
                  </span>
                </div>
              </div>

              <Link
                href="/services"
                className="group inline-flex items-center gap-3 w-fit font-satoshi text-sm tracking-widest uppercase bg-white text-black px-7 py-4 rounded-full hover:bg-zinc-300 transition-all duration-300"
              >
                View Services
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
              </Link>
            </div>

            {/* Right: reserved space for the portrait on desktop */}
            <div className="hidden md:block md:w-[38%] shrink-0" />
          </div>

          {/* Portrait — breaks out of the blob, positioned outside the clipped card */}
          <div className="px-6 sm:px-10 md:px-0 -mt-6 md:mt-0 md:absolute md:right-12 md:-top-16 md:bottom-0 md:w-[36%] flex items-end justify-center">
            <div
              ref={imageRef}
              className="relative w-[70%] md:w-full aspect-[3/4] md:h-[calc(100%+4rem)]"
            >
              <img
                src="/image5.jpeg"
                alt="Jiles Agbor Mbi Ojong"
                className="w-full h-full object-cover object-top grayscale contrast-125 rounded-t-[80px] md:rounded-t-[170px] rounded-b-[24px]"
              />
              {/* color motion streak */}
              <div
                className="absolute left-[-15%] right-[-15%] top-[32%] h-12 md:h-16 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.9) 35%, rgba(255,255,255,0.4) 55%, transparent)",
                  filter: "blur(14px)",
                  transform: "rotate(-6deg)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent rounded-t-[80px] md:rounded-t-[140px] rounded-b-[24px]" />
            </div>
          </div>
        </div>

        {/* Bottom gradient brand text */}
        <div ref={brandRef} className="py-10 md:py-16 overflow-hidden">
          <span
            className="font-bebas text-[16vw] md:text-[8vw] leading-none tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #ffffff 0%, #999999 55%, #333333 100%)",
            }}
          >
            MBIOJONG
          </span>
        </div>
      </div>
    </section>
  );
}
