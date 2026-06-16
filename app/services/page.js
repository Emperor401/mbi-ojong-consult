"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Shield, Search, AlertTriangle, Globe, Bitcoin, FileCheck, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    icon: Search,
    title: "AML Investigation & Analysis",
    tagline: "Evidence-based financial crime detection",
    description:
      "Complex AML investigations focused on detecting suspicious consumer behavior and financial crimes. Using multiple investigative tools and open-source data sources to build comprehensive, evidence-driven risk assessments.",
    features: [
      "Suspicious behavior pattern analysis",
      "Multi-source data intelligence",
      "Financial crime case documentation",
      "Open-source & proprietary database tools",
    ],
  },
  {
    number: "02",
    icon: AlertTriangle,
    title: "Suspicious Activity Detection & Reporting",
    tagline: "Accurate SAR preparation & escalation",
    description:
      "Expert identification and escalation of suspicious activities with accurate SAR preparation in full compliance with AML/CFT requirements. Supporting internal compliance teams with timely, well-documented case reporting.",
    features: [
      "Suspicious Activity Report (SAR) preparation",
      "Escalation to compliance & legal teams",
      "Case documentation & record-keeping",
      "AML/CFT regulatory alignment",
    ],
  },
  {
    number: "03",
    icon: Shield,
    title: "Transaction Monitoring (CDD/EDD)",
    tagline: "Deep due diligence frameworks",
    description:
      "In-depth Customer Due Diligence and Enhanced Due Diligence monitoring frameworks for financial institutions. Analysing transaction patterns to identify potential money laundering and fraud with system-generated alert review.",
    features: [
      "Customer risk profiling & segmentation",
      "Ongoing transaction monitoring",
      "EDD for high-risk & PEP clients",
      "System-generated alert investigation",
    ],
  },
  {
    number: "04",
    icon: Globe,
    title: "PEP & Sanctions Screening",
    tagline: "Global political exposure & sanctions checks",
    description:
      "Comprehensive Politically Exposed Persons screening and sanctions compliance using global regulatory databases. Protecting your business from reputational and regulatory risk through thorough, ongoing identity and media checks.",
    features: [
      "Global PEP database screening",
      "Adverse media & reputational monitoring",
      "MUDB & sanctions list compliance",
      "Ongoing refresh & re-screening",
    ],
  },
  {
    number: "05",
    icon: FileCheck,
    title: "KYC & Customer Due Diligence",
    tagline: "High-volume KYC review in English & French",
    description:
      "End-to-end KYC review and customer due diligence services across high-volume global client bases. Experienced in conducting RCDD and CDD on high-risk customers in both English and French.",
    features: [
      "KYC onboarding & periodic review",
      "RCDD & CDD on high-risk customers",
      "Multilingual service (English & French)",
      "High-volume portfolio management",
    ],
  },
  {
    number: "06",
    icon: Bitcoin,
    title: "AML Risk Assessment & Typologies",
    tagline: "Vulnerability analysis & trend monitoring",
    description:
      "Enterprise AML risk assessments identifying compliance vulnerabilities, emerging typologies, and regulatory developments. Applying risk-based decision-making to deliver actionable recommendations that strengthen your AML controls.",
    features: [
      "Enterprise-wide AML risk assessment",
      "Emerging typologies & trend analysis",
      "Regulatory gap analysis & remediation",
      "AML policy & framework recommendations",
    ],
  },
];

export default function ServicesPage() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current.querySelectorAll(".reveal-word"),
        { y: 120, opacity: 0, skewY: 5 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
          delay: 0.5,
        }
      );

      // Service cards
      gsap.fromTo(
        servicesRef.current.querySelectorAll(".service-card"),
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
          },
        }
      );

      // CTA
      gsap.fromTo(
        ctaRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black min-h-screen">

      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-10 px-6 overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div ref={heroRef}>
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <div className="w-8 h-px bg-white" />
              <span className="font-satoshi text-sm text-white tracking-[0.3em] uppercase font-semibold">
                What I Offer
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="reveal-word inline-block font-bebas text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[10vw] text-white leading-none tracking-tight">
                SERVICES
              </span>
            </div>
            <div className="overflow-hidden -mt-2 md:-mt-4">
              <span className="reveal-word inline-block font-satoshi italic text-white text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[4vw] font-bold">
                specialized
              </span>
            </div>
            <p className="font-satoshi text-white/50 text-sm leading-relaxed max-w-xl mt-6 md:mt-8">
              Comprehensive AML consulting and compliance services designed to
              protect your business, ensure regulatory alignment, and build
              lasting financial integrity.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section ref={servicesRef} className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 md:gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className="service-card group relative bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 lg:p-10 hover:border-white transition-all duration-500 overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-all duration-500 rounded-2xl" />

                {/* Bottom line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-700" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                  {/* Left — number, icon, title */}
                  <div className="lg:col-span-1">
                    <div className="flex items-center gap-4 mb-3 md:mb-4">
                      <span className="font-bebas text-4xl md:text-5xl text-white/10 group-hover:text-white/20 transition-colors duration-300">
                        {service.number}
                      </span>
                      <div className="w-9 h-9 md:w-10 md:h-10 border border-white/20 group-hover:border-white rounded-full flex items-center justify-center transition-all duration-300">
                        <Icon
                          size={16}
                          className="text-white/50 group-hover:text-white transition-colors duration-300"
                        />
                      </div>
                    </div>
                    <h3 className="font-bebas text-2xl md:text-3xl text-white tracking-wide leading-tight">
                      {service.title}
                    </h3>
                    <p className="font-satoshi italic text-white/70 text-sm mt-1">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Middle — description */}
                  <div className="lg:col-span-1">
                    <p className="font-satoshi text-white/50 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Right — features */}
                  <div className="lg:col-span-1">
                    <p className="font-satoshi text-xs text-white/30 tracking-widest uppercase mb-3 md:mb-4">
                      Key Features
                    </p>
                    <ul className="flex flex-col gap-2">
                      {service.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <ChevronRight size={14} className="text-white shrink-0" />
                          <span className="font-satoshi text-white/60 text-xs">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-zinc-950 border border-white/10 rounded-2xl md:rounded-3xl p-8 sm:p-12 md:p-16 overflow-hidden text-center">

            <div className="relative z-10">
              <div className="overflow-hidden mb-2">
                <span className="inline-block font-bebas text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] text-white leading-none tracking-tight">
                  READY TO GET STARTED?
                </span>
              </div>
              <div className="overflow-hidden -mt-2 mb-6 md:mb-8">
                <span className="inline-block font-satoshi italic text-white text-[5vw] sm:text-[4vw] md:text-[3vw] lg:text-[2vw] font-bold">
                  let's talk
                </span>
              </div>
              <p className="font-satoshi text-white/50 text-sm max-w-md mx-auto mb-6 md:mb-8">
                Book a free consultation and let's discuss how I can help
                strengthen your AML compliance framework.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 font-satoshi text-sm tracking-widest uppercase bg-white text-black px-8 py-4 rounded-full hover:bg-zinc-300 transition-all duration-300"
              >
                Book a Consultation
                <ArrowUpRight
                  size={16}
                  className="group-hover:rotate-45 transition-transform duration-300"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
