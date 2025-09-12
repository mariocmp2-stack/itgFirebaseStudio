"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {useTranslations} from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('NavBar');
  const year = new Date().getFullYear();

  const nav = [
    { href: "#servicios", label: tNav('services') },
    { href: "#proceso",   label: tNav('process')   },
    { href: "#trabajos",  label: tNav('work')  },
  ];

  const services = [
    { href: "#servicios", label: tNav('mobileApps') },
    { href: "#servicios", label: tNav('landingPages') },
    { href: "#servicios", label: tNav('n8nAutomations') },
    { href: "#servicios", label: tNav('webApps') },
  ];

  const socials = [
    { href: "mailto:hola@itg.dev",      label: t('emailAria'),     icon: MailIcon     },
    { href: "https://www.linkedin.com/",label: t('linkedinAria'),  icon: LinkedInIcon },
    { href: "https://github.com/",      label: t('githubAria'),    icon: GitHubIcon   },
  ];

  return (
    <footer className="relative mt-24 border-t border-itg-border bg-white">
      {/* Halo sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 h-40 w-[70%] -translate-x-1/2 rounded-full bg-gradient-to-r from-itg-blue/15 via-itg-blueLight/10 to-transparent blur-2xl"
      />
      <div className="absolute inset-0 bg-grid opacity-[.35] pointer-events-none" />

      {/* Stripe CTA */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        className="section"
      >
        <div className="my-10 rounded-2xl border border-itg-border bg-white/80 p-5 shadow-sm backdrop-blur md:my-12 md:flex md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold text-itg-ink md:text-xl">
              {t('ctaTitle')}
            </h3>
            <p className="mt-1 text-sm text-itg-gray" dangerouslySetInnerHTML={{ __html: t('ctaSubtitle') }} />
          </div>
          <div className="mt-4 flex gap-2 md:mt-0">
            <Link href="/contact" className="btn btn-primary rounded-full">{t('contactUs')}</Link>
          </div>
        </div>
      </motion.div>

      {/* Grid principal */}
      <div className="section pb-10">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Col 1: brand */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4"
          >
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo-itg.png" alt="ITG Solutions" width={42} height={42} className="h-10 w-10" />
              <span className="text-lg font-semibold tracking-tight">ITG Solutions</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-itg-gray">
              {t('description')}
            </p>

            {/* Socials */}
            <div className="mt-4 flex items-center gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                const external = s.href.startsWith("http") || s.href.startsWith("mailto:");
                return (
                  <Link
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-itg-border bg-white/80 text-itg-ink shadow-sm transition hover:border-itg-border/80 hover:bg-white"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Col 2: navegación */}
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3"
            aria-label={t('navigation')}
          >
            <h4 className="text-sm font-semibold text-itg-ink">{t('navigation')}</h4>
            <ul className="mt-3 grid gap-2 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-itg-gray hover:text-itg-ink">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Col 3: services */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <h4 className="text-sm font-semibold text-itg-ink">{t('services')}</h4>
            <ul className="mt-3 grid gap-2 text-sm">
              {services.map((n) => (
                <li key={n.label}>
                  <a href={n.href} className="text-itg-gray hover:text-itg-ink">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4: contact */}
          <motion.address
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="not-italic md:col-span-2"
          >
            <h4 className="text-sm font-semibold text-itg-ink">{t('contact')}</h4>
            <ul className="mt-3 grid gap-2 text-sm">
              <li>
                <a href="mailto:hola@itg.dev" className="text-itg-gray hover:text-itg-ink">
                  hola@itg.dev
                </a>
              </li>
              <li className="text-itg-gray">{t('businessHours')}</li>
            </ul>
          </motion.address>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-itg-border/80" />

        {/* Bottom bar */}
        <div className="mt-4 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <p className="text-xs text-itg-gray">
            {t('rights', {year})}
          </p>
          <div className="flex gap-4 text-xs">
            <Link href="#" className="text-itg-gray hover:text-itg-ink">{t('terms')}</Link>
            <Link href="#" className="text-itg-gray hover:text-itg-ink">{t('privacy')}</Link>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        aria-label={t('goToTop')}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="group fixed bottom-6 right-6 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-itg-border bg-white/90 text-itg-ink shadow-md backdrop-blur transition hover:bg-white"
      >
        <ArrowUp className="h-4 w-4 transition group-hover:-translate-y-0.5" />
      </button>
    </footer>
  );
}

/* --------- Iconos (SVG inline) --------- */
function ArrowUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0-6 6m6-6 6 6" />
    </svg>
  );
}
function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 6 8 6 8-6" />
    </svg>
  );
}
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5ZM4.5 9h3v12h-3V9Zm6 0h2.9v1.64h.04c.4-.76 1.36-1.56 2.8-1.56 2.98 0 3.53 1.96 3.53 4.5V21h-3v-5.5c0-1.31-.02-3-1.84-3-1.84 0-2.12 1.43-2.12 2.9V21h-3V9Z" />
    </svg>
  );
}
function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.11.79-.25.79-.56v-2c-3.23.7-3.91-1.56-3.91-1.56a3.08 3.08 0 0 0-1.28-1.7c-1.05-.72.08-.7.08-.7a2.44 2.44 0 0 1 1.78 1.2 2.47 2.47 0 0 0 3.39 1 2.47 2.47 0 0 1 .74-1.55c-2.58-.29-5.29-1.29-5.29-5.74A4.49 4.49 0 0 1 6.2 6.53a4.17 4.17 0 0 1 .11-3.07s.97-.31 3.18 1.18a10.98 10.98 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.22.78.23 1.6.03 2.38a4.49 4.49 0 0 1 1.2 3.1c0 4.46-2.71 5.45-5.3 5.74a2.77 2.77 0 0 1 .79 2.16v3.21c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}
