import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Droplets,
  Leaf,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Package,
  BarChart3,
  Newspaper,
  Users,
  MessageSquare,
  Zap,
  Globe,
  ArrowRight
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { LiquidLineDivider } from './LiquidLineDivider';

export const PresentationSection: React.FC = () => {
  const { setCurrentWindow } = useApp();

  const platformHighlights = [
    {
      windowId: 'tutorial',
      icon: BookOpen,
      title: 'Formulación y Guía Práctica',
      desc: 'El paso a paso exacto para sintetizar bioplásticos con almidón vegetal, glicerina y vinagre sin equipos industriales.',
      color: 'from-emerald-400 to-teal-500',
      badge: 'Laboratorio',
    },
    {
      windowId: 'productos',
      icon: Package,
      title: 'Prototipos y Catálogo',
      desc: 'Láminas, bolsas biodegradables y protectores funcionales diseñados para reemplazar el polietileno común.',
      color: 'from-teal-400 to-cyan-500',
      badge: 'Aplicaciones',
    },
    {
      windowId: 'resultados',
      icon: BarChart3,
      title: 'Validación Científica',
      desc: 'Pruebas de tracción, solubilidad cronometrada y encuesta de aceptación en 100 participantes con 89% de preferencia.',
      color: 'from-cyan-400 to-emerald-400',
      badge: 'Evidencias',
    },
    {
      windowId: 'noticias',
      icon: Newspaper,
      title: 'Noticias e Innovaciones',
      desc: 'Publicaciones continuas sobre nuevas versiones de la fórmula, prototipos agrícolas y actividades en la comunidad.',
      color: 'from-emerald-400 to-teal-400',
      badge: 'Actualizaciones',
    },
    {
      windowId: 'equipo',
      icon: Users,
      title: 'Equipo & Metas',
      desc: 'Investigadores, mentores y cronograma de hitos para democratizar la química verde en escuelas y hogares.',
      color: 'from-teal-300 to-cyan-400',
      badge: 'Investigación',
    },
    {
      windowId: 'comunidad',
      icon: MessageSquare,
      title: 'Comunidad Participativa',
      desc: 'Foro abierto con avatares de animalitos donde estudiantes, docentes y familias interactúan y reciben soporte oficial.',
      color: 'from-cyan-300 to-emerald-400',
      badge: 'Comunidad',
    },
  ];

  const pillars = [
    {
      icon: Droplets,
      title: '100% Hidrosoluble',
      desc: 'Se disuelve completamente en agua tibia (35°C a 40°C) en menos de 60 segundos sin dejar fragmentos sólidos.',
      color: 'text-cyan-300 bg-cyan-950/80 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]',
    },
    {
      icon: ShieldCheck,
      title: 'Cero Microplásticos',
      desc: 'A diferencia de los plásticos oxodegradables que solo se fragmentan, la matriz de almidón se biodegrada biológicamente.',
      color: 'text-emerald-300 bg-emerald-950/80 border-emerald-500/40 shadow-[0_0_15px_rgba(52,211,153,0.25)]',
    },
    {
      icon: Leaf,
      title: 'Química Verde Segura',
      desc: 'Insumos 100% no tóxicos, grado alimentario o escolar, seguros para elaborar en casa o en laboratorio de ciencias.',
      color: 'text-teal-300 bg-teal-950/80 border-teal-500/40 shadow-[0_0_15px_rgba(20,184,166,0.25)]',
    },
    {
      icon: Zap,
      title: 'Costo Accesible: S/. 30',
      desc: 'Presupuesto total optimizado de tan solo 30 soles para producir más de 25 láminas y prototipos funcionales.',
      color: 'text-amber-300 bg-amber-950/80 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.25)]',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-emerald-950/70 to-slate-950 relative overflow-hidden border-b border-emerald-500/20 text-white select-none">
      
      {/* Background ambient liquid glow (low GPU overhead) */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-teal-400/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header de Presentación */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-400/40 text-xs font-black uppercase tracking-wider mb-4 shadow-[0_0_14px_rgba(52,211,153,0.3)] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>Presentación Oficial del Proyecto</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              ¿Qué es Solviplas y de qué trata esta plataforma?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
              Solviplas es una iniciativa científica y comunitaria de <strong className="text-emerald-300 font-extrabold">química verde</strong> que propone una alternativa real, económica y ecológica a los plásticos convencionales de un solo uso mediante biopolímeros 100% hidrosolubles.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Pilares de la Innovación Solviplas (Liquid Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 90} direction="up" className="h-full">
                <div className="liquid-glass-card rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between h-full group relative overflow-hidden">
                  {/* Specular gloss top curve */}
                  <div className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border ${p.color} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-extrabold text-white mb-2 group-hover:text-emerald-200 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-normal">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Liquid Horizontal Connector Line */}
        <LiquidLineDivider badge="Ciencia Limpia" label="Alcance y Beneficios del Bioplástico" />

        {/* Bloque Central de Resumen (Liquid Glass Showcase) */}
        <ScrollReveal direction="up">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-950/90 via-slate-900/95 to-teal-950/90 text-white p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] border border-emerald-500/30 relative overflow-hidden mb-12 backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/70 text-emerald-300 border border-emerald-400/30 text-xs font-black uppercase tracking-wider mb-3">
                <Globe className="w-3.5 h-3.5 text-teal-300" />
                <span>Resumen de Contenidos y Alcance</span>
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                Lo que da a conocer esta página
              </h3>
              <p className="mt-4 text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
                Este portal web interactivo tiene como objetivo divulgar la ciencia detrás de los bioplásticos para que colegios, universidades, emprendedores y familias puedan replicar la síntesis, conocer las ventajas ambientales y formar parte de la solución frente a la contaminación por plásticos.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/20 backdrop-blur-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Metodología Abierta y Reproducible</h4>
                    <p className="text-xs text-emerald-200/75 mt-0.5">Procedimientos claros para elaborar bioplásticos en minutos.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/20 backdrop-blur-sm">
                  <CheckCircle2 className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Evidencia Basada en Datos</h4>
                    <p className="text-xs text-emerald-200/75 mt-0.5">Mediciones rigurosas de biodegradación y pruebas de campo.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/20 backdrop-blur-sm">
                  <CheckCircle2 className="w-5 h-5 text-cyan-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Nuevas Implementaciones Continuas</h4>
                    <p className="text-xs text-emerald-200/75 mt-0.5">Noticias periódicas de prototipos agrícolas y escolares.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/20 backdrop-blur-sm">
                  <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Comunidad Participativa y Avatares</h4>
                    <p className="text-xs text-emerald-200/75 mt-0.5">Espacio para resolver dudas y compartir experiencias reales.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Liquid Horizontal Connector Line */}
        <LiquidLineDivider badge="Módulos Interactivos" label="Exploración Rápida de Secciones" />

        {/* Guía de Contenidos Disponibles (Liquid Interactive Cards) */}
        <div>
          <ScrollReveal direction="up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase font-black tracking-wider text-emerald-400">Exploración del Proyecto</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Secciones Disponibles en Solviplas
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-emerald-200/70 max-w-md">
                Haz clic en cualquier tarjeta para abrir directamente su ventana interactiva.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.windowId} delay={idx * 75} direction="up" className="h-full">
                  <button
                    type="button"
                    onClick={() => setCurrentWindow(item.windowId)}
                    className="w-full text-left liquid-glass-card rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400/50 flex flex-col justify-between h-full group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    {/* Top specular curve */}
                    <div className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-slate-950 font-black shadow-[0_0_16px_rgba(52,211,153,0.4)] group-hover:scale-105 transition-transform duration-300`}>
                          <Icon className="w-5 h-5 stroke-[2.4]" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                          {item.badge}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-extrabold text-white group-hover:text-emerald-200 transition-colors">
                        {item.title}
                      </h4>

                      <p className="mt-2 text-xs sm:text-sm text-emerald-100/75 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-emerald-900/60 flex items-center justify-between text-xs font-bold text-emerald-300 group-hover:text-teal-200">
                      <span>Explorar ventana</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
