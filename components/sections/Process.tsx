"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  Variants,
  useScroll,
  useTransform,
} from "framer-motion";
import {useTranslations} from 'next-intl';

type Step = {
  id: string;
  title: string;
  desc: string;
  bullets: string[];
  duration: string;
  image?: string;
  imageFit?: "cover" | "contain";
  wide?: boolean;
  tint: string;
  tags: string[];
  icon?: string;
};

const getSteps = (t: (key: string) => string): Step[] => [
  {
    id: "discover",
    title: t('discoverTitle'),
    desc: t('discoverDesc'),
    bullets: [
      t('discoverBullet1'),
      t('discoverBullet2'),
      t('discoverBullet3'),
      t('discoverBullet4'),
    ],
    duration: t('discoverDuration'),
    image: "/process/discovery.png",
    imageFit: "cover",
    wide: false,
    tint: "rgba(27,124,230,0.12)",
    tags: ["🎯 KPIs", "🗺️ Roadmap", "📑 Brief"],
    icon: "🧭",
  },
  {
    id: "design",
    title: t('designTitle'),
    desc: t('designDesc'),
    bullets: [
      t('designBullet1'),
      t('designBullet2'),
      t('designBullet3'),
      t('designBullet4'),
    ],
    duration: t('designDuration'),
    image: "/process/design.png",
    imageFit: "cover",
    wide: false,
    tint: "rgba(0,160,255,0.12)",
    tags: ["🧪 Quick tests", "🎨 UI Kit", "♿ A11y"],
    icon: "🎨",
  },
  {
    id: "build",
    title: t('buildTitle'),
    desc: t('buildDesc'),
    bullets: [
      t('buildBullet1'),
      t('buildBullet2'),
      t('buildBullet3'),
      t('buildBullet4'),
    ],
    duration: t('buildDuration'),
    image: "/process/build.png",
    imageFit: "cover",
    wide: false,
    tint: "rgba(30,96,255,0.12)",
    tags: ["⚛️ Next.js", "🚀 Vercel", "🧪 CI/CD"],
    icon: "🛠️",
  },
  {
    id: "automate",
    title: t('automateTitle'),
    desc: t('automateDesc'),
    bullets: [
      t('automateBullet1'),
      t('automateBullet2'),
      t('automateBullet3'),
      t('automateBullet4'),
    ],
    duration: t('automateDuration'),
    image: "/process/n8n.png",
    imageFit: "contain",
    wide: true,
    tint: "rgba(0,149,135,0.12)",
    tags: ["🧩 n8n", "💳 Stripe", "📒 Notion"],
    icon: "⚙️",
  },
  {
    id: "launch",
    title: t('launchTitle'),
    desc: t('launchDesc'),
    bullets: [
      t('launchBullet1'),
      t('launchBullet2'),
      t('launchBullet3'),
      t('launchBullet4'),
    ],
    duration: t('launchDuration'),
    image: "/process/launch.jpg",
    imageFit: "cover",
    wide: false,
    tint: "rgba(0,189,165,0.12)",
    tags: ["📈 Analytics", "🧪 e2e", "🟢 Rollouts"],
    icon: "🚀",
  },
];

/* Animaciones (idénticas a Services) */
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

export default function Process() {
  const t = useTranslations('Process');
  const steps = getSteps(t);
  const [active, setActive] = useState(0);
  const sentinelsRef = useRef<Array<HTMLDivElement | null>>([]);
  const sectionRef = useRef<HTMLElement | null>(null);

  // “Uno a la vez”: cada sentinel activa un paso
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

  // Parallax de la imagen sticky
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  const current = steps[active];
  const fitDesktop = current.imageFit === "contain" ? "object-contain" : "object-cover";
  const padDesktop = current.imageFit === "contain" ? "p-3 lg:p-4" : "";

  // Tinte de fondo dinámico (invertimos las posiciones para imagen a la derecha)
  const tintBg = `radial-gradient(700px 700px at 78% 32%, ${current.tint} 0%, transparent 60%),
                  radial-gradient(600px 600px at 18% 28%, ${current.tint} 0%, transparent 65%)`;

  return (
    <section id="proceso" ref={sectionRef} className="section relative py-16 md:py-24">
      {/* Fondo animado */}
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

      {/* Encabezado con reveal */}
      <motion.div
        initial="initial"
        whileInView="enter"
        viewport={{ once: true, amount: 0.25 }}
        className="mb-10 md:mb-16 text-center md:text-left"
      >
        <motion.h2 variants={textIn} className="text-2xl md:text-4xl font-bold tracking-tight">
          {t('title')}
        </motion.h2>
        <motion.p variants={textIn} className="mt-3 text-itg-gray max-w-2xl mx-auto md:mx-0">
          {t('subtitle')}
        </motion.p>
      </motion.div>

      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        {/* IZQUIERDA: contenido sticky (animaciones como Services) */}
        <div className="hidden md:col-span-6 md:block">
          <div className="relative">
            <div className="sticky top-28 z-10 md:pr-6">
              <div className="card">
                <AnimatePresence mode="wait">
                  <motion.div key={current.id} initial="initial" animate="enter" exit="exit" variants={textIn}>
                    <div className="flex items-start justify-between gap-4">
                      <motion.h3 variants={textIn} className="text-2xl font-semibold">
                        {current.title}
                      </motion.h3>
                    </div>

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
                      aria-label={t('toolsAndFocus')}
                    >
                      {current.tags.map((t) => (
                        <motion.li
                          key={t}
                          variants={itemIn}
                          className="inline-flex items-center gap-1 rounded-full border border-itg-border/60 bg-white/80 px-2.5 py-1 text-xs shadow-sm backdrop-blur"
                        >
                          {t}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Sentinelas que controlan el paso activo */}
            <div aria-hidden className="pointer-events-none">
              {steps.map((s, i) => (
                <div
                  key={s.id}
                  data-index={i}
                  ref={(el) => {
                    sentinelsRef.current[i] = el;
                  }}
                  className="h-[80vh]"
                />
              ))}
            </div>
          </div>
        </div>

        {/* DERECHA: imagen/ilustración sticky con parallax y halo */}
        <div className="hidden md:col-span-6 md:block">
          <div className="sticky top-28 md:pl-6">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-16 -z-10 rounded-[48px] bg-gradient-to-br from-itg-blue/18 via-itg-blueLight/10 to-transparent blur-3xl"
              />
              <motion.div
                style={{ y: parallaxY }}
                className="relative overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(2,6,23,0.12)] h-[460px] lg:h-[520px] xl:h-[580px] bg-white"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.image ?? current.icon}
                    variants={imgIn}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    className={`absolute inset-0 grid place-items-center ${padDesktop}`}
                  >
                    {current.image ? (
                      <Image
                        src={current.image}
                        alt={current.title}
                        fill
                        className={fitDesktop}
                        priority={active === 0}
                      />
                    ) : (
                      <div className="grid place-items-center">
                        <div className="relative">
                          <div className="absolute -inset-6 blur-2xl bg-itg-blue/20 rounded-full" />
                          <div className="relative h-40 w-40 lg:h-48 lg:w-48 rounded-full bg-gradient-to-br from-white to-white/70 shadow-xl ring-1 ring-itg-border/70 grid place-items-center">
                            <span className="text-5xl">{current.icon ?? "✨"}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            <div className="mt-3 text-sm text-itg-gray text-right">
              {t('stepCounter', {active: active + 1, total: steps.length, title: current.title.replace(/^\d\)\s*/, "")})}
            </div>
          </div>
        </div>

        {/* MOBILE: timeline con reveals (igual estilo que Services mobile) */}
        <div className="md:hidden grid gap-6">
          {steps.map((s) => {
            const fitMobile = s.imageFit === "contain" ? "object-contain" : "object-cover";
            const padMobile = s.imageFit === "contain" ? "p-2.5" : "";
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5 }}
                className="card relative overflow-hidden"
              >
                <div className="absolute left-4 top-0 h-full w-[2px] bg-itg-border/60" />
                <div className="absolute left-[14px] top-5 h-3 w-3 rounded-full bg-itg-blue shadow-[0_0_0_6px_rgba(27,124,230,0.15)]" />

                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 1.02 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4 }}
                  className="relative mb-4 -mt-2 ml-6"
                >
                  <div
                    aria-hidden
                    className="absolute -inset-6 -z-10 rounded-[30px] bg-gradient-to-br from-itg-blue/15 via-itg-blueLight/8 to-transparent blur-2xl"
                  />
                  <div className="relative overflow-hidden rounded-xl shadow-[0_10px_30px_rgba(2,6,23,0.10)] h-[220px] sm:h-[260px] bg-white grid place-items-center">
                    {s.image ? (
                      <div className={`absolute inset-0 ${padMobile}`}>
                        <Image src={s.image} alt={s.title} fill className={fitMobile} />
                      </div>
                    ) : (
                      <div className="grid place-items-center">
                        <div className="relative">
                          <div className="absolute -inset-6 blur-2xl bg-itg-blue/20 rounded-full" />
                          <div className="relative h-28 w-28 rounded-full bg-gradient-to-br from-white to-white/70 shadow-xl ring-1 ring-itg-border/70 grid place-items-center">
                            <span className="text-4xl">{s.icon ?? "✨"}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                <div className="ml-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                  </div>
                  <p className="mt-2 text-itg-gray">{s.desc}</p>
                  <ul className="mt-3 grid gap-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-itg-blue/90" />
                        <span className="text-sm">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 rounded-full border border-itg-border/60 bg-white/80 px-2.5 py-1 text-xs shadow-sm backdrop-blur"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
