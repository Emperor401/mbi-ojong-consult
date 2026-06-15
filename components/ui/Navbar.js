"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Certificates", href: "/certificates" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.4 }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open; close if viewport expands to desktop
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [menuOpen]);

  return (
    <>
      {/* Floating capsule navbar */}
      <div ref={navRef} className="fixed top-5 inset-x-0 z-50 px-4 md:px-8">
        <nav className="max-w-5xl mx-auto">
          <div
            className={`flex items-center justify-between rounded-full px-4 sm:px-5 py-3 border transition-all duration-500 ${
              scrolled
                ? "bg-black/50 border-white/15 backdrop-blur-[40px]"
                : "bg-white/[0.06] border-white/10 backdrop-blur-[32px]"
            }`}
            style={{ WebkitBackdropFilter: scrolled ? "blur(40px)" : "blur(32px)" }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="w-2.5 h-2.5 bg-red-600 rotate-45 inline-block flex-shrink-0" />
              <span className="font-bebas text-white text-base sm:text-lg tracking-widest uppercase">
                Mbi Ojong
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-satoshi text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:text-red-500 ${
                    pathname === link.href ? "text-red-500" : "text-white/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Contact button + hamburger */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/contact"
                className={`hidden md:inline-flex font-satoshi text-xs tracking-[0.2em] uppercase px-5 py-2 rounded-full border transition-all duration-300 hover:bg-white hover:text-black hover:border-white ${
                  pathname === "/contact"
                    ? "bg-red-600 border-red-600 text-white"
                    : "border-white/30 text-white"
                }`}
              >
                Contact
              </Link>

              <button
                className="md:hidden flex flex-col gap-[5px] z-50 p-1"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                <span
                  className={`block w-5 h-0.5 bg-white transition-all duration-300 origin-center ${
                    menuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                    menuOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-white transition-all duration-300 origin-center ${
                    menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 sm:gap-8 px-6"
          style={{ background: "rgba(0,0,0,0.97)", backdropFilter: "blur(24px)" }}
        >
          {[...navLinks, { label: "Contact", href: "/contact" }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-bebas text-4xl sm:text-5xl tracking-widest uppercase transition-colors duration-300 hover:text-red-600 ${
                pathname === link.href ? "text-red-600" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
