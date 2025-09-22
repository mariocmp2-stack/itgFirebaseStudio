"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type LinkItem = { href: string; label: string };

export default function NavBar() {
  const links: LinkItem[] = [
    { href: "#servicios", label: "Services" },
    { href: "#proceso", label: "Process" },
    { href: "#work", label: "Work" },
  ];

  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  // Scrollspy
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-40% 0px -40% 0px", threshold: 0.1 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm' : 'bg-transparent'
    }`}>
      <div className="section">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-itg.png"
              alt="ITG Solutions"
              width={40}
              height={40}
              className="w-10 h-10"
              priority
            />
            <span className="text-lg font-semibold text-gray-900">ITG Solutions</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-gray-900 ${
                  active === link.href ? 'text-gray-900' : 'text-gray-600'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a href="/contact" className="btn btn-primary">
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MobileMenu links={links} />
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------- Mobile Menu ---------- */
function MobileMenu({ links }: { links: LinkItem[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-2 text-gray-600 hover:text-gray-900"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="text-lg font-semibold text-gray-900">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-8">
              <div className="space-y-6">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-xl font-medium text-gray-900 hover:text-gray-600 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>
            
            {/* CTA */}
            <div className="p-4 border-t border-gray-100">
              <a
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full justify-center"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
