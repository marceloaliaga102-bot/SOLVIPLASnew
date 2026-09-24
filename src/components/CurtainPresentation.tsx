import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogoIcon } from './CanvaEditor/LogoEditorModal';
import { Leaf } from 'lucide-react';

interface CurtainPresentationProps {
  onAnimationComplete: () => void;
}

export const CurtainPresentation: React.FC<CurtainPresentationProps> = ({ onAnimationComplete }) => {
  const { siteConfig } = useApp();
  // Stages:
  // 1. 'display' (0ms - 1400ms): Logo proudly displayed in center with glow, curtain closed
  // 2. 'logo-fade' (1400ms - 2600ms): Logo gently, noticeably and smoothly dissolves in the center with progressive blur
  // 3. 'curtain-open' (2600ms - 4200ms): Diagonal panels open smoothly and gracefully
  // 4. 'finished' (4250ms): Presentation completes and cleanly unmounts
  const [stage, setStage] = useState<'display' | 'logo-fade' | 'curtain-open' | 'finished'>('display');

  useEffect(() => {
    // Stage 2: Logo dissolves smoothly and noticeably in place at 1.4s
    const fadeTimer = setTimeout(() => {
      setStage('logo-fade');
    }, 1400);

    // Stage 3: After logo is fully dissolved, curtain smoothly opens diagonally at 2.6s
    const splitTimer = setTimeout(() => {
      setStage('curtain-open');
    }, 2600);

    // Stage 4: Presentation completes gently at 4.25s
    const endTimer = setTimeout(() => {
      setStage('finished');
      onAnimationComplete();
    }, 4250);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(splitTimer);
      clearTimeout(endTimer);
    };
  }, [onAnimationComplete]);

  if (stage === 'finished') {
    return null;
  }

  const isLogoFading = stage === 'logo-fade' || stage === 'curtain-open';
  const isCurtainOpen = stage === 'curtain-open';

  return (
    <div
      className={`fixed inset-0 z-[99999] pointer-events-none overflow-hidden select-none transition-all duration-[1650ms] ease-out ${
        isCurtainOpen ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* 
        DIAGONAL CURTAIN PANEL 1: Top-Left Half
        Smoothly and noticeably slides towards top-left while fading out
      */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 will-change-transform"
        style={{
          clipPath: 'polygon(0% 0%, 102% 0%, 0% 102%)',
          transform: isCurtainOpen ? 'translate3d(-115%, -115%, 0)' : 'translate3d(0, 0, 0)',
          opacity: isCurtainOpen ? 0 : 1,
          transition: 'transform 1650ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1550ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Subtle decorative mesh / glowing aura on top panel */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-teal-500/10 rounded-full blur-[80px] pointer-events-none" />
      </div>

      {/* 
        DIAGONAL CURTAIN PANEL 2: Bottom-Right Half
        Smoothly and noticeably slides towards bottom-right while fading out
      */}
      <div
        className="absolute inset-0 bg-gradient-to-tl from-slate-950 via-emerald-950 to-slate-950 will-change-transform"
        style={{
          clipPath: 'polygon(102% 0%, 102% 102%, 0% 102%)',
          transform: isCurtainOpen ? 'translate3d(115%, 115%, 0)' : 'translate3d(0, 0, 0)',
          opacity: isCurtainOpen ? 0 : 1,
          transition: 'transform 1650ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1550ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Subtle decorative mesh on bottom panel */}
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-teal-400/10 rounded-full blur-[80px] pointer-events-none" />
      </div>

      {/* 
        Glowing diagonal seam accent line
        Subtle luminous divider that fades softly as the curtain parts
      */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-out pointer-events-none ${
          isCurtainOpen ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div
          className="absolute w-[200%] h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent top-0 left-0 -translate-x-1/4 origin-top-left rotate-[45deg]"
          style={{
            boxShadow: '0 0 24px rgba(52, 211, 153, 0.6)',
          }}
        />
      </div>

      {/* 
        CENTER LOGO PRESENTATION
        - Enters with gentle scale and soft glow
        - Remains centered and clear for the viewer to appreciate
        - Dissolves with a progressive, smooth, and noticeable 1150ms blur & fade
        - Once dissolved, the curtain opens
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div
          className={`flex flex-col items-center text-center px-6 transition-all duration-[1150ms] ease-out will-change-transform ${
            isLogoFading
              ? 'opacity-0 scale-[0.88] blur-xl translate-y-4 pointer-events-none'
              : 'opacity-100 scale-100 blur-0 translate-y-0 animate-curtain-logo-in'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {/* Logo Badge Container */}
          <div className="relative mb-5">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-400/25 to-teal-400/25 blur-xl animate-pulse" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-300 to-emerald-600 p-[2.5px] shadow-[0_0_40px_rgba(16,185,129,0.35)] ring-2 ring-emerald-300/40">
              <div className="w-full h-full rounded-[0.95rem] bg-slate-950 flex items-center justify-center p-3">
                <BrandLogoIcon
                  iconName={siteConfig.logoIcon}
                  logoUrl={siteConfig.logoUrl}
                  className="w-14 h-14 sm:w-16 sm:h-16 text-emerald-400 fill-emerald-400 drop-shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Site Name */}
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md mb-2">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent">
              {siteConfig.siteName || 'SOLVIPLAS'}
            </span>
          </h1>

          {/* Subtitle / Ecological Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-wide backdrop-blur-md shadow-sm">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>{siteConfig.logoBadge || 'Bioplásticos Biodegradables'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
