"use client";
import { motion } from "framer-motion";
import {useTranslations} from 'next-intl';
import Link from 'next/link';

type Item = {
  title: string;
  tag: "Landing" | "Mobile App" | "Web App" | "Automation";
  stat: string;
  note: string;
};

export default function Hero() {
  const t = useTranslations('Hero');
  const items: Item[] = [
    { title: t('highPerformanceLanding'), tag: "Landing", stat: t('conversionStat'), note: t('nextjsNote') },
    { title: t('bookingMobileApp'), tag: "Mobile App", stat: t('ratingStat'), note: t('flutterNote') },
    { title: t('internalDashboard'), tag: "Web App", stat: t('uptimeStat'), note: t('rbacNote') },
    { title: t('n8nAutomations'), tag: "Automation", stat: t('automatedTasksStat'), note: t('integrationsNote') },
  ];
  return (
    <section id="hero" className="relative z-0 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-8 sm:pb-12 md:pb-16">
        {/* ====== iMac Mockup con relación de aspecto responsive ====== */}
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mx-auto w-full max-w-[1200px]"
        >
          {/* Wrapper que fija la proporción de pantalla - más alto en móvil */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[16/12] md:aspect-[16/10] lg:aspect-[16/9]">
            {/* Bezel + Screen */}
            <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl border border-black/10 bg-neutral-900/95 shadow-[0_8px_28px_rgba(0,0,0,0.14)] ring-1 ring-black/5 overflow-hidden">
              {/* Top bezel con cámara - más pequeño en móvil */}
              <div className="relative rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl border-b border-white/5 bg-neutral-900/90 px-2 py-0.5 sm:py-1 md:px-3 md:py-1.5">
                <div className="mx-auto h-0.5 w-10 sm:w-12 md:w-16 rounded-full bg-white/10" />
                <div className="absolute left-1/2 top-0.5 sm:top-1 -translate-x-1/2 md:top-1.5">
                  <span className="block h-[3px] w-[3px] sm:h-[3.5px] sm:w-[3.5px] md:h-1 md:w-1 rounded-full bg-gradient-to-b from-neutral-600 to-neutral-800 ring-1 ring-neutral-700" />
                </div>
              </div>

              {/* Inner glass area */}
              <div className="absolute inset-0 pt-4 sm:pt-6 md:pt-8 px-2 sm:px-4 md:px-6 lg:px-8 pb-2 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] overflow-y-auto scrollbar-hide">
                {/* Ventana dentro de la pantalla */}
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.995 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="mx-auto w-full max-w-6xl select-none rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10 bg-black/60 shadow-[0_6px_28px_rgba(0,0,0,0.22)] backdrop-blur"
                >
                  {/* Barra de título - más compacta en móvil */}
                  <div className="flex items-center justify-between rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl border-b border-white/10 bg-black/40 px-2 sm:px-3 py-1 sm:py-1.5">
                    <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                      <span className="h-[7px] w-[7px] sm:h-[8px] sm:w-[8px] md:h-2.5 md:w-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="h-[7px] w-[7px] sm:h-[8px] sm:w-[8px] md:h-2.5 md:w-2.5 rounded-full bg-[#febc2e]" />
                      <span className="h-[7px] w-[7px] sm:h-[8px] sm:w-[8px] md:h-2.5 md:w-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="truncate text-[9px] sm:text-[10px] md:text-xs text-white/70 px-2">ITG — Showcase</div>
                    <div className="h-2.5 sm:h-3 w-4 sm:w-5 md:w-6 rounded-md bg-white/5" />
                  </div>

                  {/* Contenido - stack vertical en móvil */}
                  <div className="p-3 sm:p-5 md:p-6 lg:p-8">
                    {/* Stack vertical en móvil, grid en desktop */}
                    <div className="space-y-6 sm:space-y-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
                      {/* Izquierda */}
                      <div className="text-center lg:text-left">
                        <motion.h1
                          className="font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {t.rich('title', {
                            digitalNeeds: (chunks) => <span className="bg-gradient-to-r from-itg-blue to-itg-blueLight bg-clip-text text-transparent">{chunks}</span>
                          })}
                        </motion.h1>

                        <motion.p
                          className="mx-auto mt-3 sm:mt-4 md:mt-5 lg:mt-6 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-white/90 lg:mx-0"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 }}
                        >
                          
                        </motion.p>

                        {/* CTA dentro del recuadro: SOLO desktop */}
                        <motion.div
                          className="hidden lg:flex mt-8 items-center justify-start gap-3"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Link href="/contact" className="btn btn-primary text-base px-4 py-2">{t('contactUs')}</Link>
                          <a href="#servicios" className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-base font-medium transition border border-white/20 text-white/90 hover:bg-white/10">{t('ourServices')}</a>
                        </motion.div>

                        {/* Métricas - 2x2 en móvil */}
                        <motion.div
                          className="mt-6 sm:mt-8 lg:mt-10 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4"
                          initial="hidden"
                          animate="show"
                          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                        >
                          {[
                            ["+50%", t('betterConversion')],
                            ["<1s", t('firstMeaningfulPaint')],
                            ["99.9%", t('uptime')],
                            ["x3", t('taskAutomation')],
                          ].map(([k, v]) => (
                            <motion.div
                              key={k}
                              className="card border border-black/10 bg-white text-black shadow-sm p-2 sm:p-3 md:p-4"
                              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                            >
                              <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">{k}</div>
                              <div className="text-[10px] sm:text-xs md:text-sm line-clamp-1">{v}</div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>

                      {/* Derecha: showcase - oculto en móviles muy pequeños */}
                      <div className="w-full max-w-xl mx-auto lg:ml-auto">
                        {/* Search bar */}
                        <div className="flex items-center gap-2 sm:gap-2.5 rounded-lg border border-white/10 bg-black/30 px-2 sm:px-3 py-1.5 sm:py-2">
                          <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-itg-blue" />
                          <input
                            className="w-full bg-transparent text-xs sm:text-sm text-white/90 placeholder-white/50 outline-none"
                            placeholder={t('searchWork')}
                            readOnly
                          />
                        </div>

                        {/* Tags - horizontal scroll en móvil */}
                        <div className="mt-2 sm:mt-3 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs overflow-x-auto scrollbar-hide pb-1">
                          <span className="flex-shrink-0 rounded-lg bg-white/5 px-2 py-1 text-white/80">{t('all')}</span>
                          <span className="flex-shrink-0 rounded-lg bg-white/5 px-2 py-1 text-white/70">{t('caseStudies')}</span>
                          <span className="flex-shrink-0 rounded-lg bg-itg-blue/40 px-2 py-1 text-white">{t('mobile')}</span>
                          <span className="flex-shrink-0 rounded-lg bg-white/5 px-2 py-1 text-white/70">{t('web')}</span>
                          <span className="flex-shrink-0 rounded-lg bg-itg-blue/40 px-2 py-1 text-white">{t('automations')}</span>
                        </div>

                        {/* Items list - menos items en móvil */}
                        <div className="mt-2 sm:mt-3 md:mt-4 space-y-1 sm:space-y-1.5 md:space-y-2">
                          {items.slice(0, typeof window !== "undefined" && window.innerWidth < 640 ? 3 : 4).map((item, i) => (
                            <div
                              key={item.title}
                              className="flex items-center justify-between rounded-lg border border-white/10 bg-black/25 px-2 sm:px-3 py-1.5 sm:py-2"
                            >
                              <div className="min-w-0 flex items-center gap-2 sm:gap-2.5">
                                <div className="h-2.5 sm:h-3 w-2.5 sm:w-3 rounded-sm bg-itg-blue/60 flex-shrink-0" />
                                <div className="min-w-0">
                                  <div className="truncate text-[11px] sm:text-xs md:text-sm text-white/90">{item.title}</div>
                                  <div className="truncate text-[9px] sm:text-[10px] md:text-[11px] text-white/70">{item.note}</div>
                                </div>
                              </div>

                              <div className="ml-2 flex items-center gap-1 sm:gap-1.5">
                                <span className="hidden md:inline rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-white/80">
                                  {item.tag}
                                </span>
                                <span className="rounded-md bg-gradient-to-r from-itg-blue to-itg-blueLight px-1.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-white shadow-sm">
                                  {item.stat}
                                </span>
                                <span className="hidden sm:inline text-[10px] sm:text-[11px] text-white/40"># {i + 1}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Bottom bar - simplificado en móvil */}
                        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-white/10 bg-black/30 p-2 sm:px-3 sm:py-2">
                          <div className="flex items-center gap-1 sm:gap-1.5 text-white/80 text-[9px] sm:text-[10px] md:text-[11px] overflow-x-auto scrollbar-hide">
                            <span className="flex-shrink-0 rounded-md border border-white/10 px-1.5 sm:px-2 py-0.5 sm:py-1">{t('discovery')}</span>
                            <span className="flex-shrink-0 rounded-md border border-white/10 px-1.5 sm:px-2 py-0.5 sm:py-1">{t('uxui')}</span>
                            <span className="flex-shrink-0 rounded-md border border-white/10 px-1.5 sm:px-2 py-0.5 sm:py-1">{t('dev')}</span>
                            <span className="flex-shrink-0 rounded-md border border-white/10 px-1.5 sm:px-2 py-0.5 sm:py-1">{t('launch')}</span>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <a href="#trabajos" className="rounded-md bg-itg-blue/40 px-2 py-1 text-[10px] sm:text-xs font-medium text-white">
                              {t('portfolio')}
                            </a>
                            <Link href="/contact" className="rounded-md bg-white/5 px-2 py-1 text-[10px] sm:text-xs text-white/90">
                              {t('getAQuote')}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pie de ventana - más pequeño en móvil */}
                  <div className="flex items-center justify-end rounded-b-lg sm:rounded-b-xl md:rounded-b-2xl border-t border-white/10 bg-black/40 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2">
                    <span className="h-2.5 sm:h-3 w-2.5 sm:w-3 rotate-45 border-b border-r border-white/20" />
                  </div>
                </motion.div>

                {/* Chin: visible solo en desktop */}
                <div className="hidden lg:block mx-auto mt-2 w-[94%] rounded-b-xl border-t border-white/5 bg-gradient-to-b from-neutral-900/70 to-neutral-900/30 px-4 py-2 text-center text-[10px] tracking-[0.15em] text-white/50">
                  {t('itgSolutions')}
                </div>
              </div>
            </div>
          </div>

          {/* Stand / Base: solo en desktop */}
          <div className="hidden lg:flex mx-auto mt-4 w-[420px] max-w-[70%] flex-col items-center">
            <div className="h-3 w-40 rounded-b-full bg-gradient-to-b from-neutral-700/50 to-neutral-900/80 shadow-[0_6px_20px_rgba(0,0,0,0.15)]" />
            <div className="mt-1 h-1 w-56 rounded-full bg-black/5 ring-1 ring-black/5" />
            <div className="mt-0.5 h-0.5 w-32 rounded-full bg-black/5" />
          </div>
        </motion.div>

        {/* ==== CTA fuera del recuadro: SOLO móvil/tablet ==== */}
        <div className="lg:hidden mx-auto mt-5 sm:mt-6 max-w-[720px] px-2 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3"
          >
            <Link href="/contact" className="w-full sm:w-auto btn btn-primary text-sm sm:text-base px-4 py-2">
              {t('contactUs')}
            </Link>
            <a href="#servicios" className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm sm:text-base font-medium transition border border-white/20 text-white/90 hover:bg-white/10">
              {t('ourServices')}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Estilos para ocultar scrollbar */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
