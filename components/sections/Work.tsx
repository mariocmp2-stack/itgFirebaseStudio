"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import {useTranslations} from 'next-intl';

/* ---------- Types & Data ---------- */
type Category = "web" | "mobile" | "automation" | "saas";
type WorkCase = {
  id: string;
  category: Category;
  title: string;
  subtitle: string;
  desc: string;
  cover: string;
  coverFit?: "cover" | "contain";
  tint: string;
  stack: string[];
  impact: Array<[string, string]>;
  url: string;
};

const getCases = (t: (key: string) => string): WorkCase[] => [
  {
    id: "pig-growth-control",
    category: "mobile",
    title: t('pigGrowthTitle'),
    subtitle: t('pigGrowthSubtitle'),
    desc: t('pigGrowthDesc'),
    cover: "/work/placeholder-mobile.jpg",
    coverFit: "cover",
    tint: "rgba(27,124,230,0.14)",
    stack: ["Flutter", "Firebase", "Charts", "SQLite"],
    impact: [["95%", t('trackingAccuracy')], ["40%", t('timeSaved')], ["4.7★", t('userRating')]],
    url: "#pig-growth-app",
  },
  {
    id: "greenhouse-website",
    category: "web",
    title: t('greenhouseTitle'),
    subtitle: t('greenhouseSubtitle'),
    desc: t('greenhouseDesc'),
    cover: "/demos/miltonapage.png",
    coverFit: "cover",
    tint: "rgba(0,160,255,0.14)",
    stack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    impact: [["92", t('pageSpeed')], ["<1.2s", t('lcp')], ["+60%", t('inquiries')]],
    url: "https://www.miltonagreenhouse.com/",
  },
  {
    id: "altiqpro-guatemala",
    category: "web",
    title: t('altiqproTitle'),
    subtitle: t('altiqproSubtitle'),
    desc: t('altiqproDesc'),
    cover: "/demos/altiqpropage.png",
    coverFit: "cover",
    tint: "rgba(30,96,255,0.14)",
    stack: ["Next.js", "PostgreSQL", "Maps API", "Prisma"],
    impact: [["85%", t('leadQuality')], ["99.8%", t('uptime')], ["+120%", t('bookings')]],
    url: "https://altiqpro.com/",
  },
];

/* ---------- Smooth Animations ---------- */
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

/* ---------- Browser Mockup Component ---------- */
interface BrowserMockupProps {
  children: React.ReactNode;
  url?: string;
  className?: string;
}

function BrowserMockup({ children, url, className = "" }: BrowserMockupProps) {
  const t = useTranslations('Work');
  const [showIframe, setShowIframe] = useState(false); // Empezar con screenshot
  const [iframeError, setIframeError] = useState(false);
  const [loading, setLoading] = useState(false); // No empezar cargando
  const [retryCount, setRetryCount] = useState(0);

  const handleToggleView = () => {
    if (!showIframe && url) {
      // Cuando cambiamos a iframe, activar loading y resetear error
      setLoading(true);
      setIframeError(false);
      setRetryCount(0);
    } else if (showIframe) {
      // Cuando cambiamos a imagen, no necesita loading
      setLoading(false);
    }
    setShowIframe(!showIframe);
  };

  const handleOpenSite = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleIframeLoad = () => {
    setLoading(false);
    setIframeError(false);
  };

  const handleIframeError = () => {
    setLoading(false);
    if (retryCount < 2) {
      // Intentar recargar automáticamente hasta 2 veces
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setLoading(true);
      }, 1000);
    } else {
      setIframeError(true);
    }
  };

  const handleRetry = () => {
    setLoading(true);
    setIframeError(false);
    setRetryCount(0);
  };

  // Auto-hide loading after 5 seconds as fallback (reducido de 8s)
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        if (!iframeError) {
          setIframeError(true);
        }
      }, 5000); // Reducido a 5 segundos
      return () => clearTimeout(timer);
    }
  }, [loading, iframeError]);

  // Auto-cargar iframe después de 2 segundos para mostrar la página real primero
  useEffect(() => {
    if (url && !showIframe && !loading && !iframeError) {
      const autoLoadTimer = setTimeout(() => {
        setLoading(true);
        setShowIframe(true);
      }, 2000); // Cambiar automáticamente después de 2 segundos
      
      return () => clearTimeout(autoLoadTimer);
    }
  }, [url, showIframe, loading, iframeError]);

  // Preload iframe en background para mejorar performance
  useEffect(() => {
    if (url && !showIframe) {
      // Precargar el iframe en background cuando mostramos screenshot
      const preloadIframe = document.createElement('iframe');
      preloadIframe.src = url;
      preloadIframe.style.display = 'none';
      preloadIframe.style.position = 'absolute';
      preloadIframe.style.left = '-9999px';
      document.body.appendChild(preloadIframe);
      
      const cleanup = () => {
        if (document.body.contains(preloadIframe)) {
          document.body.removeChild(preloadIframe);
        }
      };

      // Cleanup después de 10 segundos o cuando el componente se desmonte
      const timer = setTimeout(cleanup, 10000);
      return () => {
        clearTimeout(timer);
        cleanup();
      };
    }
  }, [url, showIframe]);

  return (
    <div className={`relative bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden ${className}`}>
      {/* Browser Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 bg-red-400 rounded-full" />
            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="w-3 h-3 bg-green-400 rounded-full" />
          </div>
          
          {/* URL bar */}
          <div className="ml-4 px-3 py-1 bg-white border border-gray-300 rounded-md text-xs text-gray-600 font-mono max-w-xs truncate">
            {url || 'https://example.com'}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          {/* Refresh button for iframe */}
          {url && showIframe && (
            <button
              onClick={handleRetry}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
              title={t('refreshIframe')}
              aria-label={t('refreshIframe')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          )}

          {/* Toggle iframe/screenshot button */}
          {url && (
            <button
              onClick={handleToggleView}
              className={`p-1.5 rounded transition-colors ${
                showIframe 
                  ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
              title={showIframe ? t('showScreenshot') : t('showLiveSite')}
              aria-label={showIframe ? t('showScreenshot') : t('showLiveSite')}
            >
              {showIframe ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          )}

          {/* Open in new tab button */}
          {url && (
            <button
              onClick={handleOpenSite}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
              aria-label={t('openInNewTab', {url})}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {!showIframe ? (
          <>
            {children}
            <div 
              className="absolute inset-0 bg-transparent hover:bg-black/5 transition-all duration-300 cursor-pointer group"
              onClick={handleToggleView}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="bg-black/90 text-white px-6 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transform scale-95 group-hover:scale-100 transition-transform shadow-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>{t('viewLiveSite')}</span>
                  </div>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              
              {/* Corner indicator con countdown */}
              <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-1.5">
                  <span>{t('preview')}</span>
                  {url && (
                    <>
                      <span>•</span>
                      <span className="text-blue-100">{t('autoLoading')}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : showIframe && url && !iframeError ? (
          <div className="relative h-full">
            {loading && (
              <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1 font-medium">{t('loadingLiveSite')}</p>
                    <p className="text-xs text-gray-500">
                      {retryCount > 0 ? t('attempt', {count: retryCount + 1}) : t('optimizing')}
                    </p>
                    {/* Progress bar simulado */}
                    <div className="w-48 h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full"
                        style={{
                          animation: 'loadingProgress 3s ease-out infinite'
                        }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {setLoading(false); setIframeError(true);}}
                    className="text-xs text-gray-500 hover:text-gray-700 underline transition-colors"
                  >
                    {t('skipAndShow')}
                  </button>
                </div>
              </div>
            )}
            <iframe
              key={`iframe-${retryCount}`}
              src={url}
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              title={`Live preview of ${url}`}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ 
                minHeight: '400px',
                backgroundColor: 'white'
              }}
              loading="eager"
            />
            {/* Live indicator */}
            {!loading && (
              <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                {t('liveSite')}
              </div>
            )}
          </div>
        ) : iframeError ? (
          <div className="h-full bg-gray-50 flex flex-col items-center justify-center p-8">
            <div className="text-center max-w-md">
              <div className="mb-4">
                <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('unableToLoad')}</h3>
              <p className="text-sm text-gray-600 mb-6">
                {t('unableToLoadDesc')}
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleOpenSite}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full justify-center font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>{t('openFullSite')}</span>
                </button>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleRetry}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    {t('tryAgain')}
                  </button>
                  <button
                    onClick={() => {setIframeError(false); setShowIframe(false);}}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    {t('showPreview')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ---------- Project Card Component ---------- */
interface ProjectCardProps {
  project: WorkCase;
  isSelected: boolean;
  onClick: () => void;
}

function ProjectCard({ project, isSelected, onClick }: ProjectCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative w-full text-left p-6 rounded-xl transition-all duration-300
        bg-white/80 backdrop-blur-sm border border-white/20
        shadow-lg hover:shadow-xl
        ${isSelected 
          ? 'ring-2 ring-blue-500 bg-blue-50/50 shadow-blue-100' 
          : 'hover:bg-white/90'
        }
      `}
      variants={slideIn}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={isSelected}
      role="tab"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">
            {project.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {project.subtitle}
          </p>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
              {project.category}
            </span>
            <span className="text-xs font-semibold text-blue-600">
              {project.impact[0]?.[0]}
            </span>
          </div>
        </div>
        
        <div className={`
          w-3 h-3 rounded-full ml-4 mt-1 transition-colors
          ${isSelected ? 'bg-blue-500' : 'bg-gray-300'}
        `} />
      </div>
    </motion.button>
  );
}

/* ---------- Main Component ---------- */
export default function Work() {
  const t = useTranslations('Work');
  const cases = getCases(t);
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [selectedProject, setSelectedProject] = useState(0);

  const filteredProjects = useMemo(
    () => filter === "all" ? cases : cases.filter(c => c.category === filter),
    [filter, cases]
  );

  const counts = useMemo(() => {
    const base = { all: cases.length, web: 0, mobile: 0, automation: 0, saas: 0 } as Record<"all" | Category, number>;
    cases.forEach(c => base[c.category]++);
    return base;
  }, [cases]);

  useEffect(() => {
    setSelectedProject(0);
  }, [filter]);

  const currentProject = filteredProjects[selectedProject] || filteredProjects[0];

  const filterTabs = [
    { key: "all" as const, label: t('allWork'), count: counts.all },
    { key: "web" as const, label: t('webApps'), count: counts.web },
    { key: "mobile" as const, label: t('mobile'), count: counts.mobile },
    { key: "automation" as const, label: t('automation'), count: counts.automation },
    { key: "saas" as const, label: t('saas'), count: counts.saas },
  ];

  return (
    <section 
      id="work" 
      className="relative min-h-screen py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50"
      aria-label="Portfolio showcase"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-purple-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.rich('title', {
              work: (chunks) => <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{chunks}</span>
            })}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="flex flex-wrap justify-center gap-2 mb-12"
          role="tablist"
          aria-label="Project categories"
        >
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                ${filter === tab.key
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
                }
              `}
              role="tab"
              aria-selected={filter === tab.key}
            >
              <span>{tab.label}</span>
              <span className={`
                px-1.5 py-0.5 text-xs rounded-full
                ${filter === tab.key ? 'bg-white/20' : 'bg-gray-100'}
              `}>
                {tab.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Desktop: Project List Sidebar */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-8">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl p-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                  role="tabpanel"
                  aria-label={t('projectList')}
                >
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isSelected={index === selectedProject}
                      onClick={() => setSelectedProject(index)}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Desktop: Project Preview */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {currentProject && (
                <motion.div
                  key={`${currentProject.id}-${filter}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="space-y-8"
                >
                  {/* Project Preview */}
                  <div className="relative">
                    {currentProject.category === "web" ? (
                      <BrowserMockup url={currentProject.url} className="h-[500px]">
                        <div className="relative h-full">
                          <Image
                            src={currentProject.cover}
                            alt={`Preview of ${currentProject.title}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 66vw"
                            priority
                          />
                        </div>
                      </BrowserMockup>
                    ) : (
                      <div className="relative h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                        <Image
                          src={currentProject.cover}
                          alt={`Preview of ${currentProject.title}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 66vw"
                          priority
                        />
                        {currentProject.url && (
                          <Link
                            href={currentProject.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 bg-transparent hover:bg-black/5 transition-colors"
                            aria-label={`View ${currentProject.title} project`}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Project Info */}
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {currentProject.title}
                        </h3>
                        <p className="text-lg text-gray-600 mb-4">
                          {currentProject.subtitle}
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-6">
                          {currentProject.desc}
                        </p>
                        
                        {/* Tech Stack */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                            {t('techStack')}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {currentProject.stack.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Impact Metrics */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                          {t('projectImpact')}
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          {currentProject.impact.map(([value, label], index) => (
                            <div key={index} className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                              <div className="text-2xl font-bold text-gray-900 mb-1">
                                {value}
                              </div>
                              <div className="text-sm text-gray-600 capitalize">
                                {label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile: Stacked Cards */}
          <div className="lg:hidden col-span-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-container-${filter}`}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-8"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={`mobile-${project.id}-${filter}-${index}`}
                    variants={fadeInUp}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl overflow-hidden"
                  >
                  {/* Project Image */}
                  <div className="relative h-64 sm:h-80">
                    <Image
                      src={project.cover}
                      alt={`Preview of ${project.title}`}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                    {project.url && (
                      <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-transparent hover:bg-black/10 transition-colors"
                        aria-label={`View ${project.title} project`}
                      />
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full capitalize">
                        {project.category}
                      </span>
                      <span className="text-sm font-semibold text-blue-600">
                        {project.impact[0]?.[0]} {project.impact[0]?.[1]}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {project.subtitle}
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {project.desc}
                    </p>

                    {/* Impact Metrics */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {project.impact.map(([value, label], index) => (
                        <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="font-bold text-gray-900 text-sm">
                            {value}
                          </div>
                          <div className="text-xs text-gray-600">
                            {label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
