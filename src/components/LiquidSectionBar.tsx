import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';

export interface SectionItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface LiquidSectionBarProps {
  sections: SectionItem[];
  activeId: string;
  onSelectSection: (id: string) => void;
}

interface RippleEffect {
  id: number;
  x: number;
  y: number;
}

interface ActiveRect {
  left: number;
  width: number;
  totalWidth: number;
}

export const LiquidSectionBar: React.FC<LiquidSectionBarProps> = ({
  sections,
  activeId,
  onSelectSection,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [ripples, setRipples] = useState<Map<string, RippleEffect[]>>(new Map());
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Geometry state for the single continuous horizontal line with active rising wave
  const [activeRect, setActiveRect] = useState<ActiveRect>(() => {
    const activeIdx = Math.max(0, sections.findIndex((s) => s.id === activeId));
    return {
      left: activeIdx * 150 + 16,
      width: 130,
      totalWidth: Math.max(800, sections.length * 150 + 32),
    };
  });

  // Measure the active element's exact pixel position inside the scrollable track
  const measureActive = useCallback(() => {
    const activeEl = itemRefs.current.get(activeId);
    const container = containerRef.current;
    if (!activeEl || !container) return;

    const left = activeEl.offsetLeft;
    const width = activeEl.offsetWidth;
    const totalWidth = Math.max(container.scrollWidth, container.clientWidth, 600);

    setActiveRect({ left, width, totalWidth });
  }, [activeId]);

  useLayoutEffect(() => {
    measureActive();
  }, [measureActive]);

  // Check scroll position to dynamically update navigation arrows
  const updateScrollState = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollState();
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => {
      measureActive();
      updateScrollState();
    };

    container.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', handleResize);
    };
  }, [measureActive, updateScrollState, sections.length]);

  // Smooth auto-scroll to center the active section when changed
  useEffect(() => {
    const activeEl = itemRefs.current.get(activeId);
    if (activeEl && containerRef.current) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeId]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const scrollAmount = direction === 'left' ? -260 : 260;
    containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleItemClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    sectionId: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rippleId = Date.now() + Math.random();

    setRipples((prev) => {
      const next = new Map(prev);
      const list = next.get(sectionId) || [];
      next.set(sectionId, [...list, { id: rippleId, x, y }]);
      return next;
    });

    setTimeout(() => {
      setRipples((prev) => {
        const next = new Map(prev);
        const list = next.get(sectionId) || [];
        next.set(
          sectionId,
          list.filter((r) => r.id !== rippleId)
        );
        return next;
      });
    }, 600);

    onSelectSection(sectionId);
  };

  // Generate the single continuous SVG path with an organic upward wave under the active section
  const baselineY = 32;
  const apexY = 10;
  const { left, width, totalWidth } = activeRect;
  const startX = Math.max(0, left + 4);
  const endX = Math.min(totalWidth, left + width - 4);
  const waveW = Math.max(20, endX - startX);
  const centerX = startX + waveW * 0.5;

  const cp1X = startX + waveW * 0.22;
  const cp2X = startX + waveW * 0.32;
  const cp3X = startX + waveW * 0.68;
  const cp4X = startX + waveW * 0.78;

  const continuousLinePath = `M 0,${baselineY} L ${startX},${baselineY} C ${cp1X},${baselineY} ${cp2X},${apexY} ${centerX},${apexY} C ${cp3X},${apexY} ${cp4X},${baselineY} ${endX},${baselineY} L ${totalWidth},${baselineY}`;
  const waveFillPath = `M ${startX},${baselineY} C ${cp1X},${baselineY} ${cp2X},${apexY} ${centerX},${apexY} C ${cp3X},${apexY} ${cp4X},${baselineY} ${endX},${baselineY} Z`;

  return (
    <div className="relative w-full border-t border-b border-emerald-500/20 bg-gradient-to-r from-emerald-950/95 via-slate-950/95 to-emerald-950/95 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.06)] select-none overflow-hidden">
      
      {/* Background ambient liquid wave & light shimmer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-y-0 w-60 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent animate-liquid-shimmer pointer-events-none" />
        <div className="absolute -top-12 left-1/4 w-80 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 right-1/4 w-80 h-24 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 relative flex items-center min-h-[72px] sm:min-h-[80px]">
        
        {/* Left Scroll Button */}
        <div className="hidden md:flex items-center shrink-0 pr-1 z-30">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Desplazar secciones a la izquierda"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
              canScrollLeft
                ? 'bg-emerald-900/70 hover:bg-emerald-800 text-emerald-200 hover:text-white border border-emerald-400/30 shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:scale-110 active:scale-95 cursor-pointer'
                : 'opacity-25 bg-emerald-950/40 text-emerald-500/30 border border-emerald-800/20 cursor-default'
            }`}
            title="Desplazar secciones a la izquierda"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Liquid Edge Fading Masks */}
        <div className="pointer-events-none absolute left-0 sm:left-10 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-r from-emerald-950 via-emerald-950/80 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 sm:right-10 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-l from-emerald-950 via-emerald-950/80 to-transparent z-20" />

        {/* Liquid Navigation Track */}
        <nav
          ref={containerRef}
          aria-label="Barra de secciones con nombres libres y línea animada que se alza"
          className="relative flex items-center gap-2 sm:gap-4 overflow-x-auto whitespace-nowrap px-4 sm:px-6 no-scrollbar snap-x touch-pan-x flex-1 scroll-smooth h-[72px] sm:h-[80px]"
        >
          {/* ========================================================================= */}
          {/* UNA SOLA LÍNEA DEBAJO DE TODOS: Single continuous line that lifts up      */}
          {/* beneath the active section without any seams, boxes or black masks.       */}
          {/* ========================================================================= */}
          <svg
            className="absolute left-0 bottom-0 pointer-events-none z-10 overflow-visible"
            style={{ width: totalWidth, height: 44 }}
            aria-hidden="true"
          >
            <defs>
              {/* Gradient for the single continuous line */}
              <linearGradient id="singleFluidLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#064e3b" stopOpacity="0.4" />
                <stop offset="25%" stopColor="#059669" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
                <stop offset="75%" stopColor="#059669" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#064e3b" stopOpacity="0.4" />
              </linearGradient>

              {/* Translucent liquid glow fill under the lifted wave */}
              <linearGradient id="waveMeniscusFill" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="rgba(5, 150, 105, 0)" />
                <stop offset="100%" stopColor="rgba(34, 211, 238, 0.22)" />
              </linearGradient>
            </defs>

            {/* Translucent liquid fill under the active raised wave */}
            <motion.path
              animate={{ d: waveFillPath }}
              fill="url(#waveMeniscusFill)"
              transition={{
                type: 'spring',
                stiffness: 340,
                damping: 26,
                mass: 0.7,
              }}
            />

            {/* Ambient soft glow along the single line */}
            <motion.path
              animate={{ d: continuousLinePath }}
              stroke="rgba(34, 211, 238, 0.35)"
              strokeWidth={6}
              strokeLinecap="round"
              fill="none"
              transition={{
                type: 'spring',
                stiffness: 340,
                damping: 26,
                mass: 0.7,
              }}
            />

            {/* Main sharp continuous line that lifts up where clicked */}
            <motion.path
              animate={{ d: continuousLinePath }}
              stroke="url(#singleFluidLineGrad)"
              strokeWidth={2.8}
              strokeLinecap="round"
              fill="none"
              transition={{
                type: 'spring',
                stiffness: 340,
                damping: 26,
                mass: 0.7,
              }}
            />

            {/* Radiant liquid droplet bead at the apex of the lifted line */}
            <motion.circle
              animate={{ cx: centerX, cy: apexY }}
              r={3.5}
              fill="#cffafe"
              stroke="#22d3ee"
              strokeWidth={2}
              className="drop-shadow-[0_0_10px_rgba(34,211,238,1)]"
              transition={{
                type: 'spring',
                stiffness: 340,
                damping: 26,
                mass: 0.7,
              }}
            />
          </svg>

          {/* ========================================================================= */}
          {/* SECTION NAMES: Completely free (SIN CÁPSULAS). Clean text and icon that   */}
          {/* elevate and highlight when active, supported by the lifted line below.    */}
          {/* ========================================================================= */}
          {sections.map((section) => {
            const isActive = activeId === section.id;
            const isHovered = hoveredId === section.id && !isActive;
            const Icon = section.icon;
            const sectionRipples = ripples.get(section.id) || [];

            return (
              <button
                key={section.id}
                ref={(el) => {
                  if (el) {
                    itemRefs.current.set(section.id, el);
                  } else {
                    itemRefs.current.delete(section.id);
                  }
                }}
                type="button"
                onClick={(e) => handleItemClick(e, section.id)}
                onMouseEnter={() => setHoveredId(section.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative shrink-0 snap-start flex items-center justify-center px-3.5 sm:px-5 pb-6 pt-2 h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-xl cursor-pointer group"
              >
                {/* Free typography (NO CAPSULES) that lifts as the line rises below it */}
                <motion.div
                  animate={{
                    // When clicked, the section elevates upward to match the lifted line
                    y: isActive ? -12 : 0,
                    scale: isActive ? 1.08 : isHovered ? 1.03 : 1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 24,
                    mass: 0.7,
                  }}
                  className="relative z-20 flex items-center gap-2 select-none"
                >
                  {/* Icon with active dynamic bounce and distinct color */}
                  <div className="relative flex items-center justify-center shrink-0">
                    {isActive ? (
                      <motion.div
                        animate={{
                          scale: [1, 1.25, 1],
                          rotate: [0, -8, 0],
                        }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                      >
                        <Icon className="w-4 h-4 text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.95)] stroke-[2.7]" />
                      </motion.div>
                    ) : (
                      <Icon
                        className={`w-4 h-4 transition-colors duration-200 ${
                          isHovered ? 'text-teal-300' : 'text-emerald-400/75'
                        }`}
                      />
                    )}
                  </div>

                  {/* Section Label: Free-standing, unencapsulated, bold and vibrant when active */}
                  <span
                    className={`whitespace-nowrap tracking-wide text-xs sm:text-sm transition-all duration-300 ${
                      isActive
                        // ACTIVE COLOR: Luminous turquoise gradient text with specular drop glow
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-100 to-cyan-300 font-black drop-shadow-[0_0_16px_rgba(52,211,153,0.9)]'
                        : isHovered
                        // HOVER COLOR
                        ? 'text-white font-bold'
                        // INACTIVE COLOR: Free, soft emerald-white typography
                        : 'text-emerald-200/75 font-semibold'
                    }`}
                  >
                    {section.label}
                  </span>
                </motion.div>

                {/* Water Splash Ripple Effect on Click */}
                <AnimatePresence>
                  {sectionRipples.map((ripple) => (
                    <motion.span
                      key={ripple.id}
                      className="absolute rounded-full pointer-events-none z-30"
                      style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: 14,
                        height: 14,
                        marginLeft: -7,
                        marginTop: -7,
                        background: isActive
                          ? 'radial-gradient(circle, rgba(34,211,238,0.8) 0%, rgba(52,211,153,0.3) 70%, transparent 100%)'
                          : 'radial-gradient(circle, rgba(52,211,153,0.6) 0%, transparent 70%)',
                      }}
                      initial={{ scale: 0.2, opacity: 0.95 }}
                      animate={{ scale: 4.5, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  ))}
                </AnimatePresence>
              </button>
            );
          })}
        </nav>

        {/* Right Scroll Button */}
        <div className="hidden md:flex items-center shrink-0 pl-1 z-30">
          <button
            type="button"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Desplazar secciones a la derecha"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
              canScrollRight
                ? 'bg-emerald-900/70 hover:bg-emerald-800 text-emerald-200 hover:text-white border border-emerald-400/30 shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:scale-110 active:scale-95 cursor-pointer'
                : 'opacity-25 bg-emerald-950/40 text-emerald-500/30 border border-emerald-800/20 cursor-default'
            }`}
            title="Desplazar secciones a la derecha"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
