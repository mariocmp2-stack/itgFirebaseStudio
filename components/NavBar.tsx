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
  const [condensed, setCondensed] = useState(false);

  // Scrollspy
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Switch to capsule when hero is not visible
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([e]) => setCondensed(!e.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  const headerClasses = [
    "sticky top-0 z-50 transition-colors",
    "border-b border-itg-border bg-white/80 backdrop-blur",
    condensed && "md:border-transparent md:bg-transparent md:backdrop-blur-0",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* HEADER */}
      <header className={headerClasses}>
        <div
          className={[
            "section flex h-16 md:h-20 items-center justify-between",
            condensed ? "md:invisible" : "",
          ].join(" ")}
        >
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/logo-itg.png"
              alt="ITG Solutions"
              width={64}
              height={64}
              className={condensed ? "w-10 h-10 md:w-12 md:h-12" : "w-12 h-12 md:w-16 md:h-16"}
              priority
            />
            <span className="text-base md:text-lg font-semibold tracking-tight">Solutions</span>
          </Link>

          {/* DESKTOP: links + popover */}
          {!condensed && (
            <nav className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                <PillLink key={l.href} item={l} active={active === l.href} />
              ))}
              <DesktopPopover />
            </nav>
          )}

          {/* CTA desktop */}
          {!condensed && (
            <div className="hidden md:flex">
              <a href="/contact" className="btn btn-primary rounded-full">
                Contact Us
              </a>
            </div>
          )}

          {/* MOBILE */}
          <div className="relative md:hidden">
            <MobilePopover links={links} />
          </div>
        </div>
      </header>

      {/* TOP-CENTER CAPSULE (desktop only) */}
      {condensed && (
        <div className="pointer-events-auto fixed top-3 left-1/2 z-[60] hidden -translate-x-1/2 md:flex">
          <div className="flex items-center gap-1 rounded-full bg-white px-1 py-1 shadow-lg ring-1 ring-itg-border">
            {links.map((l) => (
              <PillLink key={l.href} item={l} active={active === l.href} compact />
            ))}
            <DesktopPopover compact />
            <a href="/contact" className="btn btn-primary rounded-full h-10 px-4 ml-1">
              Contact
            </a>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- Pill Link ---------- */
function PillLink({
  item,
  active,
  compact = false,
}: {
  item: LinkItem;
  active: boolean;
  compact?: boolean;
}) {
  return (
    <a
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={[
        "group relative inline-flex items-center rounded-full text-sm font-medium transition",
        compact ? "h-10 px-4" : "h-10 px-4",
        active
          ? "text-itg-ink bg-white/90 border border-itg-border shadow-sm"
          : "text-itg-gray hover:text-itg-ink border border-transparent hover:border-itg-border/80 hover:bg-white/60",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-itg-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white",
      ].join(" ")}
    >
      <span className="relative">
        {item.label}
        <span
          className={[
            "pointer-events-none absolute left-0 right-0 -bottom-1 h-[2px] rounded-full",
            "bg-gradient-to-r from-itg-blue to-itg-blueLight",
            "origin-left transition-transform duration-300",
            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
          ].join(" ")}
        />
      </span>
    </a>
  );
}

/* ---------- Mobile Popover ---------- */
function MobilePopover({ links }: { links: LinkItem[] }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      )
        setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-itg-border"
      >
        ☰
      </button>

      {open && (
        <div
          ref={panelRef}
          role="menu"
          className="absolute right-0 top-[calc(100%+10px)] z-50 w-[90vw] max-w-[22rem]
                     rounded-2xl bg-white shadow-xl ring-1 ring-itg-border overflow-hidden
                     before:absolute before:-top-2 before:right-6 before:h-0 before:w-0
                     before:border-x-[10px] before:border-b-[10px]
                     before:border-x-transparent before:border-b-white before:content-['']"
        >
          <MenuContent links={links} onClickItem={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}

/* ---------- Desktop Popover ---------- */
function DesktopPopover({
  compact = false,
  placement = "under",
}: {
  compact?: boolean;
  placement?: "under" | "right";
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      )
        setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative hidden md:block">
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center rounded-full text-sm font-medium transition h-10
                   px-4 text-itg-gray hover:text-itg-ink border border-transparent
                   hover:border-itg-border/80 hover:bg-white/60
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-itg-blue
                   focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        Menu <span className="ml-2">▾</span>
      </button>

      {open && (
        <div
          ref={panelRef}
          role="menu"
          className={[
            placement === "right"
              ? "absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2"
              : "absolute left-1/2 -translate-x-1/2 top-[calc(100%+12px)]",
            "z-50 w-[36rem] max-w-[88vw] rounded-2xl bg-white shadow-2xl ring-1 ring-itg-border overflow-hidden",
            placement === "right"
              ? "before:absolute before:left-[-10px] before:top-1/2 before:-translate-y-1/2 before:h-0 before:w-0 before:border-y-[10px] before:border-r-[10px] before:border-y-transparent before:border-r-white before:content-['']"
              : "before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:h-0 before:w-0 before:border-x-[10px] before:border-b-[10px] before:border-x-transparent before:border-b-white before:content-['']",
          ].join(" ")}
        >
          <MenuContent
            links={[
              { href: "#servicios", label: "Services" },
              { href: "#procesos", label: "Process" },
              { href: "#trabajos", label: "Work" },
            ]}
            onClickItem={() => setOpen(false)}
            desktop
            showNav={false}
          />
        </div>
      )}
    </div>
  );
}

/* ---------- Menu Content ---------- */
function MenuContent({
  links,
  onClickItem,
  desktop = false,
  showNav = true,
}: {
  links: LinkItem[];
  onClickItem: () => void;
  desktop?: boolean;
  showNav?: boolean;
}) {
  return (
    <>
      {/* Solutions */}
      <div className="p-3">
        <div className="px-2 pb-1 text-[11px] font-semibold tracking-wide text-itg-gray/70">
          SOLUTIONS
        </div>
        <div className={desktop ? "grid grid-cols-2 divide-x divide-itg-border/70" : ""}>
          <div className="divide-y divide-itg-border/70">
            {[
              { label: "Mobile Apps", desc: "Flutter / iOS / Android", href: "#services", icon: "📱" },
              { label: "Landing Pages", desc: "Core Web Vitals + SEO", href: "#services", icon: "🚀" },
            ].map((it) => (
              <a
                key={it.label}
                href={it.href}
                onClick={onClickItem}
                className="flex items-center gap-3 px-3 py-3 hover:bg-white/60 transition"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl ring-1 ring-itg-border bg-white">
                  <span className="text-base">{it.icon}</span>
                </span>
                <div className="flex-1">
                  <div className="text-sm font-medium">{it.label}</div>
                  <div className="text-xs text-itg-gray">{it.desc}</div>
                </div>
                <span aria-hidden className="text-itg-gray">›</span>
              </a>
            ))}
          </div>

          {/* Column 2 (desktop only) */}
          <div className={desktop ? "divide-y divide-itg-border/70" : "hidden"}>
            {[
              { label: "n8n Automations", desc: "CRM, payments, email", href: "#services", icon: "⚙️" },
              { label: "Web Apps", desc: "SaaS / admin / Next.js", href: "#services", icon: "🖥️" },
            ].map((it) => (
              <a
                key={it.label}
                href={it.href}
                onClick={onClickItem}
                className="flex items-center gap-3 px-3 py-3 hover:bg-white/60 transition"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl ring-1 ring-itg-border bg-white">
                  <span className="text-base">{it.icon}</span>
                </span>
                <div className="flex-1">
                  <div className="text-sm font-medium">{it.label}</div>
                  <div className="text-xs text-itg-gray">{it.desc}</div>
                </div>
                <span aria-hidden className="text-itg-gray">›</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* NAVIGATION (mobile only) */}
      {showNav && (
        <div className="px-3 pb-3">
          <div className="px-2 pb-1 pt-2 text-[11px] font-semibold tracking-wide text-itg-gray/70">
            NAVIGATION
          </div>
          <div className="grid gap-2 px-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={onClickItem}
                className="rounded-xl px-3 py-2 text-sm border border-transparent hover:border-itg-border hover:bg-white/60 transition"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="border-t border-itg-border bg-white/70 p-3">
        <a href="/contact" onClick={onClickItem} className="btn btn-primary w-full rounded-xl">
          Contact Us
        </a>
      </div>
    </>
  );
}
