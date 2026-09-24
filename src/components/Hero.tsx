import React from 'react';
import { useApp } from '../context/AppContext';
import { Droplets, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import { SparkleParticles } from './SparkleParticles';
import { EditableText } from './CanvaEditor/EditableText';
import { EditableMedia } from './CanvaEditor/EditableMedia';
import { ScrollReveal } from './ScrollReveal';
import { LiquidLineDivider } from './LiquidLineDivider';

export const Hero: React.FC = () => {
  const { siteConfig, updateSiteConfig, mediaItems, updateMediaItem } = useApp();

  const featuredImage = mediaItems.find(m => m.isFeatured) || mediaItems[0];

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white pt-10 pb-20 lg:pt-14 lg:pb-28">
      {/* Animated Sparkling Light Particles at the start of the page */}
      <SparkleParticles />

      {/* Organic background gradient glows */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-400 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-teal-300 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-emerald-500 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Top Notification Badge (Canva editable) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 animate-hero-fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-bold backdrop-blur-md shadow-[0_0_15px_rgba(52,211,153,0.3)] relative overflow-hidden group">
            <span className="absolute top-0 inset-x-2 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-full pointer-events-none" />
            <Leaf className="w-3.5 h-3.5 text-teal-300 relative z-10" />
            <EditableText
              value={siteConfig.heroBadge}
              onSave={(val) => updateSiteConfig({ heroBadge: val })}
              tagName="span"
              className="relative z-10"
            />
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headings & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left animate-hero-fade-up [animation-delay:150ms]">
            <div className="space-y-3">
              <EditableText
                value={siteConfig.heroTitle}
                onSave={(val) => updateSiteConfig({ heroTitle: val })}
                tagName="h1"
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight block text-white"
              />
              <EditableText
                value={siteConfig.heroHighlight}
                onSave={(val) => updateSiteConfig({ heroHighlight: val })}
                tagName="h2"
                className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight bg-gradient-to-r from-emerald-300 via-teal-200 to-green-300 bg-clip-text text-transparent drop-shadow-sm block"
              />
            </div>

            <EditableText
              value={siteConfig.heroDescription}
              onSave={(val) => updateSiteConfig({ heroDescription: val })}
              tagName="p"
              multiline
              className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl font-normal block"
            />

            {/* General eco accreditation */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-emerald-300/90 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <EditableText
                  value={siteConfig.heroFeature1 || 'Química Verde: Cero Petróleo'}
                  onSave={(val) => updateSiteConfig({ heroFeature1: val })}
                  tagName="span"
                />
              </span>
              <span className="hidden sm:inline text-emerald-700">•</span>
              <EditableText
                value={siteConfig.heroFeature2 || '100% Hidrosoluble en Minutos'}
                onSave={(val) => updateSiteConfig({ heroFeature2: val })}
                tagName="span"
              />
              <span className="hidden sm:inline text-emerald-700">•</span>
              <EditableText
                value={siteConfig.heroFeature3 || 'Presupuesto Accesible (S/. 30)'}
                onSave={(val) => updateSiteConfig({ heroFeature3: val })}
                tagName="span"
              />
            </div>
          </div>

          {/* Right Column: In-Place Canva Editable Video / Image Showcase */}
          <div className="lg:col-span-5 animate-hero-scale-fade [animation-delay:250ms]">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-500/40 bg-emerald-950/90 aspect-[4/3]">
              <EditableMedia
                type={siteConfig.heroMediaType || 'image'}
                src={siteConfig.heroMediaUrl || featuredImage?.url || 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'}
                alt="Proyecto Solviplas"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
                onSave={(newSrc, newType) => {
                  updateSiteConfig({ heroMediaUrl: newSrc, heroMediaType: newType });
                  if (featuredImage) {
                    updateMediaItem(featuredImage.id, { url: newSrc, type: newType });
                  }
                }}
                label="Cambiar Foto o Video Principal"
              />

              {/* Caption badge */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-emerald-950/85 backdrop-blur-md border border-emerald-600/40 z-10 pointer-events-auto">
                <EditableText
                  value={featuredImage?.title || 'Lámina Flexible de Bioplástico'}
                  onSave={(val) => {
                    if (featuredImage) {
                      updateMediaItem(featuredImage.id, { title: val });
                    }
                  }}
                  tagName="p"
                  className="text-xs font-bold text-emerald-200 line-clamp-1 block"
                />
                <EditableText
                  value={featuredImage?.description || 'Biopolímero natural a base de almidón y glicerina vegetal'}
                  onSave={(val) => {
                    if (featuredImage) {
                      updateMediaItem(featuredImage.id, { description: val });
                    }
                  }}
                  tagName="p"
                  className="text-[11px] text-emerald-300/80 line-clamp-1 mt-0.5 block"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Liquid Horizontal Connector Line */}
        <LiquidLineDivider badge="Métricas de Impacto" label="Resultados Clave del Proyecto" className="mt-12 mb-8" />

        {/* In-Place Editable Key Impact Metrics Bar with bidirectional scroll fade */}
        <ScrollReveal direction="up" delay={150}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="liquid-glass-card rounded-3xl p-5 text-left hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <span className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              <div className="flex items-center justify-between mb-1">
                <EditableText
                  value={String(siteConfig.stats.beneficiarios)}
                  onSave={(val) => updateSiteConfig({
                    stats: { ...siteConfig.stats, beneficiarios: Number(val) || 0 }
                  })}
                  tagName="p"
                  className="text-3xl sm:text-4xl font-black text-emerald-300 block tracking-tight"
                />
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </div>
              <EditableText
                value={siteConfig.stats.beneficiariosLabel}
                onSave={(val) => updateSiteConfig({
                  stats: { ...siteConfig.stats, beneficiariosLabel: val }
                })}
                tagName="p"
                className="text-xs sm:text-sm text-emerald-100/85 font-medium block"
              />
            </div>

            <div className="liquid-glass-card rounded-3xl p-5 text-left hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <span className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              <div className="flex items-center justify-between mb-1">
                <EditableText
                  value={siteConfig.stats.presupuesto}
                  onSave={(val) => updateSiteConfig({
                    stats: { ...siteConfig.stats, presupuesto: val }
                  })}
                  tagName="p"
                  className="text-3xl sm:text-4xl font-black text-teal-300 block tracking-tight"
                />
                <span className="w-2 h-2 rounded-full bg-teal-300 shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
              </div>
              <EditableText
                value={siteConfig.stats.presupuestoLabel}
                onSave={(val) => updateSiteConfig({
                  stats: { ...siteConfig.stats, presupuestoLabel: val }
                })}
                tagName="p"
                className="text-xs sm:text-sm text-emerald-100/85 font-medium block"
              />
            </div>

            <div className="liquid-glass-card rounded-3xl p-5 text-left hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <span className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              <div className="flex items-center justify-between mb-1">
                <EditableText
                  value={siteConfig.stats.reduccionHuella}
                  onSave={(val) => updateSiteConfig({
                    stats: { ...siteConfig.stats, reduccionHuella: val }
                  })}
                  tagName="p"
                  className="text-3xl sm:text-4xl font-black text-cyan-300 block tracking-tight"
                />
                <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              </div>
              <EditableText
                value={siteConfig.stats.reduccionHuellaLabel}
                onSave={(val) => updateSiteConfig({
                  stats: { ...siteConfig.stats, reduccionHuellaLabel: val }
                })}
                tagName="p"
                className="text-xs sm:text-sm text-emerald-100/85 font-medium block"
              />
            </div>

            <div className="liquid-glass-card rounded-3xl p-5 text-left hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <span className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              <div className="flex items-center justify-between mb-1">
                <EditableText
                  value={siteConfig.stats.adopcionPostest}
                  onSave={(val) => updateSiteConfig({
                    stats: { ...siteConfig.stats, adopcionPostest: val }
                  })}
                  tagName="p"
                  className="text-3xl sm:text-4xl font-black text-emerald-300 block tracking-tight"
                />
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </div>
              <EditableText
                value={siteConfig.stats.adopcionLabel}
                onSave={(val) => updateSiteConfig({
                  stats: { ...siteConfig.stats, adopcionLabel: val }
                })}
                tagName="p"
                className="text-xs sm:text-sm text-emerald-100/85 font-medium block"
              />
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
