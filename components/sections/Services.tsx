"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants, useScroll, useTransform } from "framer-motion";
import {useTranslations} from 'next-intl';

// Function to get tech icons
const getTechIcon = (techName: string) => {
  const icons: { [key: string]: React.ReactElement } = {
    Flutter: (
      <svg width="16" height="16" viewBox="0 0 256 317" fill="none">
        <path d="M157.666 0L48.8 108.785L81.922 141.909L157.666 66.164H256L157.666 0Z" fill="#42A5F5"/>
        <path d="M157.666 66.164L81.922 141.909L48.8 108.785L157.666 0V66.164Z" fill="#0277BD"/>
        <path d="M121.71 175.074L48.8 248L81.922 281.124L195.121 167.924L157.666 130.469L121.71 175.074Z" fill="#42A5F5"/>
        <path d="M114.833 202.246L48.8 268.279L48.8 317L155.025 317L155.025 268.279L114.833 202.246Z" fill="#0277BD"/>
      </svg>
    ),
    UX: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-5h2v2h-2zm0-8h2v6h-2z" fill="#FF5722"/>
      </svg>
    ),
    Push: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M7.58 4.08L6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2c.15-2.65 1.51-4.97 3.55-6.42zm12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43c2.02 1.45 3.39 3.77 3.54 6.42zM18 11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2v-5zm-6 11c.14 0 .27-.01.4-.04.65-.14 1.18-.58 1.44-1.18.1-.24.15-.5.15-.78h-4c.01 1.1.9 2 2.01 2z" fill="#FF9800"/>
      </svg>
    ),
    Firebase: (
      <svg width="16" height="16" viewBox="0 0 256 351" fill="none">
        <path d="M1.253 280.732l1.605-3.131 99.353-188.518-44.15-83.475c-1.044-1.962-2.924-3.241-5.104-3.241s-4.06 1.279-5.104 3.241L1.253 280.732z" fill="#FFC24A"/>
        <path d="M134.417 148.974L97.93 61.892c-1.075-2.568-4.58-2.568-5.655 0L1.253 280.732l133.164-131.758z" fill="#FFA000"/>
        <path d="M254.747 280.732l-20.902-130.151c-.47-2.94-2.974-5.036-5.998-5.036-1.227 0-2.396.378-3.357 1.044L1.253 280.732l126.723 70.127a11.85 11.85 0 0 0 11.722 0l115.049-70.127z" fill="#F57C00"/>
        <path d="M139.121 347.551l126.006-67.818-1.062-1.12-134.859-130.343-128.953 131.463L139.121 347.551z" fill="#FFCC02"/>
      </svg>
    ),
    "CWV 90+": (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="#0F9D58"/>
        <path d="M4 12L6 10L12 16L18 10L20 12L12 20L4 12Z" fill="#0F9D58"/>
      </svg>
    ),
    "Technical SEO": (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 13 15.5c.18-.64.39-1.24.69-1.77l.27-.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#EA4335"/>
      </svg>
    ),
    "A/B": (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M7 5H17V7H19V17H17V19H7V17H5V7H7V5M15 13V15H13V13H15M11 9V11H9V9H11Z" fill="#673AB7"/>
      </svg>
    ),
    Vercel: (
      <svg width="16" height="16" viewBox="0 0 284 65" fill="none">
        <path d="M141.68 16.25c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16.25c-7.26 0-13.03 5.42-13.03 12.5s5.77 12.5 13.03 12.5c7.25 0 13.02-5.42 13.02-12.5s-5.77-12.5-13.02-12.5zM248.72 24.5c-3.17 0-5.74 2.42-5.74 5.5s2.57 5.5 5.74 5.5c3.16 0 5.73-2.42 5.73-5.5s-2.57-5.5-5.73-5.5zm-86.2 0h-8.3V17.56h8.3V24.5z" fill="#000"/>
        <path d="M17.19 8.192c.094.058.19.114.287.169L35.1 18.742l.012.007c.104.062.209.121.315.177L53.05 28.25c.104.062.209.121.315.177l17.621 9.324c.104.062.209.121.315.177l.012.007.287.169V47.18c-.097-.055-.193-.111-.287-.169l-.012-.007c-.106-.056-.211-.115-.315-.177L53.365 37.503c-.104-.062-.209-.121-.315-.177L35.427 27.992c-.104-.062-.209-.121-.315-.177l-.012-.007-.287-.169V8.192z" fill="#000"/>
      </svg>
    ),
    n8n: (
      <svg width="16" height="16" viewBox="0 0 256 256" fill="none">
        <path d="M68.9 61.3c-10.5 0-19 8.5-19 19s8.5 19 19 19 19-8.5 19-19-8.5-19-19-19z" fill="#EA4B71"/>
        <path d="M187.1 61.3c-10.5 0-19 8.5-19 19s8.5 19 19 19 19-8.5 19-19-8.5-19-19-19z" fill="#EA4B71"/>
        <path d="M68.9 156.7c-10.5 0-19 8.5-19 19s8.5 19 19 19 19-8.5 19-19-8.5-19-19-19z" fill="#EA4B71"/>
        <path d="M187.1 156.7c-10.5 0-19 8.5-19 19s8.5 19 19 19 19-8.5 19-19-8.5-19-19-19z" fill="#EA4B71"/>
        <path d="M128 109c-10.5 0-19 8.5-19 19s8.5 19 19 19 19-8.5 19-19-8.5-19-19-19z" fill="#EA4B71"/>
        <path d="M87.9 80.3l60.2 60.2" stroke="#EA4B71" strokeWidth="8"/>
        <path d="M168.1 80.3l-60.2 60.2" stroke="#EA4B71" strokeWidth="8"/>
        <path d="M87.9 175.7l60.2-60.2" stroke="#EA4B71" strokeWidth="8"/>
        <path d="M168.1 175.7l-60.2-60.2" stroke="#EA4B71" strokeWidth="8"/>
      </svg>
    ),
    Stripe: (
      <svg width="16" height="16" viewBox="0 0 512 214" fill="none">
        <path d="M35 0h442c19.33 0 35 15.67 35 35v144c0 19.33-15.67 35-35 35H35c-19.33 0-35-15.67-35-35V35C0 15.67 15.67 0 35 0z" fill="#635BFF"/>
        <path d="M212.775 89.8c0-5.24-4.13-7.615-10.985-7.615-9.905 0-22.455 2.375-32.36 7.615v-30.21c11.5-4.13 23.57-6.505 36.49-6.505 30.21 0 50.255 15.835 50.255 43.34v53.3h-33.625V133.89c-7.615 10.985-19.685 16.72-35.045 16.72-21.57 0-37.375-14.065-37.375-34.51 0-21.57 17.165-33.625 48.26-35.045l24.385-1.255zm0 24.385c-17.165.885-24.385 5.24-24.385 12.24 0 5.24 4.13 8.5 11.87 8.5 8.5 0 12.515-5.24 12.515-12.24v-8.5z" fill="#FFF"/>
      </svg>
    ),
    Notion: (
      <svg width="16" height="16" viewBox="0 0 256 256" fill="none">
        <path d="M30.637 36.581L65.15 32.262c2.496-.313 4.146.313 5.484 1.652l51.506 51.506c1.339 1.339 2.278 3.614 2.278 6.11V228.42c0 2.496-1.252 3.927-3.122 3.927H97.98c-1.87 0-3.122-1.431-3.122-3.927V97.353L46.334 146.33c-.626.626-1.565.939-2.191.939s-1.565-.313-2.191-.939L9.068 113.446c-.626-.626-.939-1.565-.939-2.191V51.193c0-8.736 7.049-15.472 15.472-15.472 3.122 0 5.932 1.252 7.801 3.122l-.765-.262zm174.06 41.068c0-13.915-10.693-25.234-23.86-25.234H139.77c-1.87 0-3.122 1.431-3.122 3.927v124.07c0 2.496 1.252 3.927 3.122 3.927h40.754c13.167 0 23.86-11.319 23.86-25.234V78.649zm-24.173 24.486v74.52c0 2.809-2.278 5.087-5.087 5.087h-15.159c-2.809 0-5.087-2.278-5.087-5.087v-74.52c0-2.809 2.278-5.087 5.087-5.087h15.159c2.809 0 5.087 2.278 5.087 5.087z" fill="#000"/>
      </svg>
    ),
    Slack: (
      <svg width="16" height="16" viewBox="0 0 256 256" fill="none">
        <path d="M99.4 151.2c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V99.4c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v51.8z" fill="#E01E5A"/>
        <path d="M86.5 99.4c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h51.8c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H86.5z" fill="#36C5F0"/>
        <path d="M151.2 86.5c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v51.8c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V86.5z" fill="#2EB67D"/>
        <path d="M164.1 151.2c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H112.3c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h51.8z" fill="#ECB22E"/>
        <path d="M177 177c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9v-12.9h12.9c7.1 0 12.9 5.8 12.9 12.9z" fill="#E01E5A"/>
        <path d="M177 86.5c0-7.1-5.8-12.9-12.9-12.9s-12.9 5.8-12.9 12.9v12.9h12.9c7.1 0 12.9-5.8 12.9-12.9z" fill="#2EB67D"/>
        <path d="M79 79c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v12.9H91.9C84.8 91.9 79 86.1 79 79z" fill="#36C5F0"/>
        <path d="M79 164.1c0 7.1 5.8 12.9 12.9 12.9s12.9-5.8 12.9-12.9v-12.9H91.9c-7.1 0-12.9 5.8-12.9 12.9z" fill="#ECB22E"/>
      </svg>
    ),
    "Next.js": (
      <svg width="16" height="16" viewBox="0 0 180 180" fill="none">
        <mask id="mask0_408_134" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="black"/>
        </mask>
        <g mask="url(#mask0_408_134)">
          <circle cx="90" cy="90" r="90" fill="black"/>
          <path d="m149.508 157.52-69-69.02c-1.01-1.02-2.67-1.02-3.68 0l-10.86 10.86c-1.02 1.02-1.02 2.67 0 3.68l74.52 74.52c1.02 1.02 2.67 1.02 3.68 0l5.36-5.36c1.02-1.02 1.02-2.67 0-3.68l-.02-.02z" fill="url(#paint0_linear_408_134)"/>
          <path d="M115.89 40.18H70.19c-2.83 0-5.12 2.29-5.12 5.12v89.4c0 2.83 2.29 5.12 5.12 5.12h45.7c2.83 0 5.12-2.29 5.12-5.12V45.3c0-2.83-2.29-5.12-5.12-5.12z" fill="url(#paint1_linear_408_134)"/>
        </g>
        <defs>
          <linearGradient id="paint0_linear_408_134" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint1_linear_408_134" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    Postgres: (
      <svg width="16" height="16" viewBox="0 0 432.071 445.383" fill="none">
        <path d="M323.205 324.227c2.833-23.601 1.984-27.062 19.563-23.239l4.463.392c13.517.615 31.199-2.174 41.587-7 22.362-10.376 35.622-27.7 13.572-23.148-50.297 10.376-53.755-6.655-53.755-6.655 53.111-78.803 75.313-178.836 56.149-203.322C352.514-5.534 262.036 26.049 260.522 26.869l-.482.089c-9.938-2.062-21.06-3.294-33.554-3.496-22.761-.374-40.032 5.967-53.133 15.904 0 0-161.408-66.498-153.899 83.628C31.061 179.209 89.459 231.926 136.31 298.325c32.316 45.706 60.188 84.144 80.258 84.144 1.66 0 3.263-.259 4.794-.777 17.837-6.089 28.4-23.062 19.563-23.239z" fill="#336791"/>
        <path d="M402.395 271.23c-50.302 10.376-53.76-6.655-53.76-6.655 53.111-78.808 75.313-178.843 56.153-203.326-52.27-66.785-142.752-35.2-144.262-34.38l-.486.087c-9.938-2.063-21.06-3.292-33.560-3.496-22.761-.373-40.026 5.967-53.127 15.902 0 0-161.411-66.495-153.904 83.63 11.618 57.215 69.016 109.932 115.867 176.331 32.322 45.706 60.194 84.144 80.264 84.144 1.66 0 3.263-.259 4.790-.777C364.174 346.696 334.111 297.423 402.395 271.23z" fill="#336791"/>
      </svg>
    ),
    Auth: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M18,8A6,6 0 0,0 12,2A6,6 0 0,0 6,8V10H5A2,2 0 0,0 3,12V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V12A2,2 0 0,0 19,10H18V8M12,4A4,4 0 0,1 16,8V10H8V8A4,4 0 0,1 12,4M12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17A2,2 0 0,1 10,15A2,2 0 0,1 12,13Z" fill="#4CAF50"/>
      </svg>
    ),
    Edge: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#00A4EF"/>
      </svg>
    )
  };

  return icons[techName] || <span>{techName}</span>;
};

type Service = {
  id: string;
  title: string;
  desc: string;
  bullets: string[];
  image: string;
  imageFit?: "cover" | "contain";
  wide?: boolean;
  tint: string;
  tags: string[]; // chips visuales
};

const getServices = (t: (key: string) => string): Service[] => [
  {
    id: "mobile",
    title: t('mobileTitle'),
    desc: t('mobileDesc'),
    bullets: [
      t('mobileBullet1'),
      t('mobileBullet2'),
      t('mobileBullet3'),
      t('mobileBullet4'),
    ],
    image: "/services/mobile-apps.png",
    imageFit: "cover",
    wide: false,
    tint: "rgba(27, 124, 230, 0.14)",
    tags: ["Flutter", "UX", "Push", "Firebase"],
  },
  {
    id: "landing",
    title: t('landingTitle'),
    desc: t('landingDesc'),
    bullets: [
      t('landingBullet1'),
      t('landingBullet2'),
      t('landingBullet3'),
      t('landingBullet4'),
    ],
    image: "/services/landing-page.png",
    imageFit: "cover",
    wide: false,
    tint: "rgba(0, 160, 255, 0.14)",
    tags: ["CWV 90+", "Technical SEO", "A/B", "Vercel"],
  },
  {
    id: "automation",
    title: t('automationTitle'),
    desc: t('automationDesc'),
    bullets: [
      t('automationBullet1'),
      t('automationBullet2'),
      t('automationBullet3'),
      t('automationBullet4'),
    ],
    image: "/services/n8n.png",
    imageFit: "contain",
    wide: true,
    tint: "rgba(0, 149, 135, 0.14)",
    tags: ["n8n", "Stripe", "Notion", "Slack"],
  },
  {
    id: "webapp",
    title: t('webAppTitle'),
    desc: t('webAppDesc'),
    bullets: [
      t('webAppBullet1'),
      t('webAppBullet2'),
      t('webAppBullet3'),
      t('webAppBullet4'),
    ],
    image: "/services/web-app.png",
    imageFit: "cover",
    wide: false,
    tint: "rgba(30, 96, 255, 0.14)",
    tags: ["Next.js", "Postgres", "Auth", "Edge"],
  },
];

/* Animaciones */
const textIn: Variants = {
  initial: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};
const listIn: Variants = { initial: {}, enter: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } };
const itemIn: Variants = { initial: { opacity: 0, y: 8 }, enter: { opacity: 1, y: 0, transition: { duration: 0.28 } } };
const imgIn: Variants = {
  initial: { opacity: 0, y: 12, scale: 1.03 },
  enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, scale: 1.02, transition: { duration: 0.3 } },
};

export default function Services() {
  const t = useTranslations('Services');
  const services = getServices(t);
  const [active, setActive] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sentinelsRef = useRef<Array<HTMLDivElement | null>>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.index);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0.25 }
    );
    sentinelsRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Parallax suave para la imagen sticky
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  // Carousel functions for mobile
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000); // 6 seconds
    return () => clearInterval(interval);
  }, [nextSlide]);

  const current = services[active];
  const fitDesktop = current.imageFit === "contain" ? "object-contain" : "object-cover";
  const padDesktop = current.imageFit === "contain" ? "p-3 lg:p-4" : "";

  // Fondo dinámico según servicio activo
  const tintBg = `radial-gradient(700px 700px at 22% 32%, ${current.tint} 0%, transparent 60%),
                  radial-gradient(600px 600px at 82% 28%, ${current.tint} 0%, transparent 65%)`;

  return (
    <section id="servicios" ref={sectionRef} className="section relative py-16 md:py-24">
      {/* Tinte de fondo animado */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          className="pointer-events-none absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{ backgroundImage: tintBg }}
        />
      </AnimatePresence>

      {/* Encabezado */}
      <motion.div
        initial="initial"
        whileInView="enter"
        viewport={{ once: true, amount: 0.25 }}
        className="mb-10 md:mb-16 text-center md:text-left"
      >
        <motion.h2 variants={textIn} className="text-2xl md:text-4xl font-bold tracking-tight">
          {t.rich('title', {
            timeToValue: (chunks) => <span className="bg-gradient-to-r from-itg-blue to-itg-blueLight bg-clip-text text-transparent">{chunks}</span>
          })}
        </motion.h2>
        <motion.p variants={textIn} className="mt-3 text-itg-gray max-w-2xl mx-auto md:mx-0">
          {t('subtitle')}
        </motion.p>
      </motion.div>

      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        {/* IZQ (md+): imagen sticky grande con parallax */}
        <div className="hidden md:col-span-6 md:block">
          <div className="sticky top-28">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-16 -z-10 rounded-[48px] bg-gradient-to-br from-itg-blue/18 via-itg-blueLight/10 to-transparent blur-3xl"
              />
              <motion.div
                style={{ y: parallaxY }}
                className="relative overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(2,6,23,0.12)] h-[480px] lg:h-[540px] xl:h-[600px]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.image}
                    variants={imgIn}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    className={`absolute inset-0 ${padDesktop}`}
                  >
                    {current.id === "mobile" ? (
                      <video
                        src="/services/mobile-apps.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`w-full h-full ${fitDesktop}`}
                        style={{ objectFit: current.imageFit === "contain" ? "contain" : "cover" }}
                      />
                    ) : (
                      <Image
                        src={current.image}
                        alt={current.title}
                        fill
                        className={fitDesktop}
                        priority={active === 0}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            <div className="mt-3 text-sm text-itg-gray">
              {t('serviceCounter', {active: active + 1, total: services.length, title: current.title})}
            </div>
          </div>
        </div>

        {/* DER (md+): texto sticky + chips visuales */}
        <div className="hidden md:col-span-6 md:block">
          <div className="relative">
            <div className="sticky top-28 z-10">
              <div className="card">
                <AnimatePresence mode="wait">
                  <motion.div key={current.id} initial="initial" animate="enter" exit="exit" variants={textIn}>
                    <motion.h3 variants={textIn} className="text-2xl font-semibold">
                      {current.title}
                    </motion.h3>
                    <motion.p variants={textIn} className="mt-2 text-itg-gray">
                      {current.desc}
                    </motion.p>

                    <motion.ul variants={listIn} className="mt-4 grid gap-2 grid-cols-2">
                      {current.bullets.map((b) => (
                        <motion.li key={b} variants={itemIn} className="flex items-start gap-2">
                          <span className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-itg-blue/90" />
                          <span className="text-sm">{b}</span>
                        </motion.li>
                      ))}
                    </motion.ul>

                    {/* Chips visuales */}
                    <motion.ul
                      variants={listIn}
                      className="mt-6 flex flex-wrap gap-2"
                      aria-label={t('techAndFeats')}
                    >
                      {current.tags.map((t) => (
                        <motion.li
                          key={t}
                          variants={itemIn}
                          className="inline-flex items-center gap-2 rounded-full border border-itg-border/60 bg-white/80 px-3 py-1.5 text-xs shadow-sm backdrop-blur"
                        >
                          {getTechIcon(t)}
                          <span>{t}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Sentinelas para el “uno a la vez” */}
            <div aria-hidden className="pointer-events-none">
              {services.map((s, i) => (
                <div
                  key={s.id}
                  data-index={i}
                  ref={(el) => { sentinelsRef.current[i] = el; }}
                  className="h-[80vh]"
                />
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE: Simple & Clean Carousel */}
        <div className="md:hidden px-4">
          {/* Carousel Container */}
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {services.map((service) => {
                const fitMobile = service.imageFit === "contain" ? "object-contain" : "object-cover";
                const padMobile = service.imageFit === "contain" ? "p-6" : "";
                
                return (
                  <div key={service.id} className="w-full flex-shrink-0">
                    <div className="p-6">
                      {/* Service Image */}
                      <div className="relative mb-6">
                        <div className="relative overflow-hidden rounded-xl h-[250px] bg-gray-50">
                          <div className={`absolute inset-0 ${padMobile}`}>
                            {service.id === "mobile" ? (
                              <video
                                src="/services/mobile-apps.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className={`w-full h-full ${fitMobile}`}
                                style={{ objectFit: service.imageFit === "contain" ? "contain" : "cover" }}
                              />
                            ) : (
                              <Image 
                                src={service.image} 
                                alt={service.title} 
                                fill 
                                className={fitMobile} 
                                sizes="(max-width: 768px) 100vw, 50vw" 
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Service Content */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-itg-dark text-center">
                          {service.title}
                        </h3>
                        
                        <p className="text-itg-gray text-sm leading-relaxed text-center">
                          {service.desc}
                        </p>

                        {/* Bullets */}
                        <div className="space-y-2">
                          {service.bullets.map((bullet) => (
                            <div 
                              key={bullet}
                              className="flex items-start gap-3"
                            >
                              <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-itg-blue flex-shrink-0" />
                              <span className="text-sm text-itg-gray">{bullet}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-2 justify-center pt-4">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1.5 rounded-full bg-itg-blue/10 border border-itg-blue/20 px-3 py-1.5 text-xs font-medium text-itg-dark"
                            >
                              {getTechIcon(tag)}
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label={t('previous')}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label={t('next')}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-itg-blue w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={t('slide', {index: index + 1})}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-itg-gray">
              {t('counter', {current: currentSlide + 1, total: services.length})}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
