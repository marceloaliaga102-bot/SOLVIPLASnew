import React from 'react';
import { useApp } from '../context/AppContext';
import { Leaf, ArrowUp, Sparkles, Globe, Heart, Palette, ChevronRight } from 'lucide-react';
import { EditableText } from './CanvaEditor/EditableText';
import { BrandLogoIcon } from './CanvaEditor/LogoEditorModal';
import { LiquidLineDivider } from './LiquidLineDivider';

export const Footer: React.FC = () => {
  const { siteConfig, updateSiteConfig, setCurrentWindow, isLiveEditEnabled, setIsLogoModalOpen } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-slate-950 via-emerald-950/90 to-slate-950 text-emerald-100 border-t border-emerald-500/20 pt-16 pb-12 relative overflow-hidden select-none">
      
      {/* Background ambient liquid glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl" />
        <div className="absolute top-12 right-1/4 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-900/60">
          
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (isLiveEditEnabled) {
                    setIsLogoModalOpen(true);
                  }
                }}
                className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-300 via-teal-200 to-cyan-300 flex items-center justify-center text-slate-950 shadow-[0_0_18px_rgba(52,211,153,0.5)] shrink-0 overflow-hidden relative group transition-transform hover:scale-105"
                title={isLiveEditEnabled ? 'Personalizar Logotipo' : siteConfig.siteName}
              >
                <BrandLogoIcon
                  iconName={siteConfig.logoIcon}
                  logoUrl={siteConfig.logoUrl}
                  className="w-5 h-5 text-slate-950 fill-slate-950 stroke-[2.5]"
                />
                {isLiveEditEnabled && (
                  <span className="absolute inset-0 bg-emerald-950/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Palette className="w-3.5 h-3.5 text-emerald-200" />
                  </span>
                )}
              </button>
              <EditableText
                value={siteConfig.siteName}
                onSave={(val) => updateSiteConfig({ siteName: val })}
                tagName="span"
                className="text-2xl font-black tracking-tight text-white block"
              />
            </div>
            <EditableText
              value={siteConfig.heroDescription}
              onSave={(val) => updateSiteConfig({ heroDescription: val })}
              tagName="p"
              multiline
              className="text-xs text-emerald-200/75 leading-relaxed block"
            />
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold shadow-xs">
                <Globe className="w-3.5 h-3.5 text-teal-300" />
                <span>Iniciativa de Impacto Ecológico</span>
              </span>
            </div>
          </div>

          {/* Environmental Commitment */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Compromiso Verde</span>
            </h4>
            <div className="space-y-2 text-xs text-emerald-200/80">
              {(siteConfig.footerCommitments || [
                'Bioplásticos a base de almidón',
                'Disolución rápida y segura en agua',
                '100% libre de derivados de petróleo',
                'Residuo compostable e inocuo',
                'Economía circular y química limpia'
              ]).map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  <EditableText
                    value={item}
                    onSave={(val) => {
                      const updated = [...(siteConfig.footerCommitments || [])];
                      updated[idx] = val;
                      updateSiteConfig({ footerCommitments: updated });
                    }}
                    tagName="span"
                    className="flex-1"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Academic & Scientific references */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-3">
              Referencias & Base Científica
            </h4>
            <div className="space-y-2 text-[11px] text-emerald-300/80 leading-snug">
              {(siteConfig.footerReferences || [
                'Ellen MacArthur Foundation - Principios de circularidad',
                'Reducción de hasta un 60% en huella de carbono',
                'Química verde aplicada a materiales cotidianos',
                'Estándares de biodegradabilidad acuosa'
              ]).map((ref, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1 shrink-0 shadow-[0_0_6px_rgba(20,184,166,0.8)]" />
                  <EditableText
                    value={ref}
                    onSave={(val) => {
                      const updated = [...(siteConfig.footerReferences || [])];
                      updated[idx] = val;
                      updateSiteConfig({ footerReferences: updated });
                    }}
                    tagName="span"
                    className="flex-1"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Quick links & Scroll */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-3">
              Ventanas del Sitio
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-emerald-300/90">
              {[
                { id: 'inicio', label: 'Inicio y Resumen' },
                { id: 'tutorial', label: 'Tutorial & Fórmula' },
                { id: 'productos', label: 'Catálogo de Productos' },
                { id: 'resultados', label: 'Resultados Científicos' },
                { id: 'noticias', label: 'Noticias & Novedades' },
                { id: 'equipo', label: 'Equipo & Cronograma' },
                { id: 'comunidad', label: 'Comunidad & Preguntas' },
              ].map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => setCurrentWindow(link.id)}
                  className="text-left text-emerald-300/80 hover:text-white transition-all duration-200 flex items-center gap-1.5 hover:translate-x-1 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>{link.label}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-full bg-emerald-950/80 hover:bg-emerald-900/90 text-xs font-bold text-emerald-200 hover:text-white transition-all duration-300 border border-emerald-500/30 shadow-[0_0_12px_rgba(52,211,153,0.15)] hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] active:scale-95 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Volver arriba</span>
            </button>
          </div>

        </div>

        {/* Liquid Horizontal Connector Line */}
        <LiquidLineDivider badge="Química Sostenible" label="Educación y Conciencia Ecológica" className="my-6" />

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400/80">
          <p className="flex items-center gap-1">
            <span>© {siteConfig.year} {siteConfig.siteName} • Hecho con</span>
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400 inline" />
            <span>para el medio ambiente.</span>
          </p>
          <div className="flex items-center gap-2 text-emerald-300/90">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>Optimizado para carga rápida y fluidas interacciones móviles</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
