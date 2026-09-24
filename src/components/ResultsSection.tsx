import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SURVEY_RESULTS } from '../data/initialData';
import { BarChart3, TrendingUp, Award, CheckCircle } from 'lucide-react';
import { EditableText } from './CanvaEditor/EditableText';
import { LiquidLineDivider } from './LiquidLineDivider';

export const ResultsSection: React.FC = () => {
  const { siteConfig, updateSiteConfig } = useApp();
  const [activeTab, setActiveTab] = useState<'prepost' | 'satisfaction'>('prepost');

  if (!siteConfig.sections.results?.enabled) return null;

  return (
    <section id="results" className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-emerald-950/70 to-slate-950 text-white relative overflow-hidden border-b border-emerald-500/20 select-none">
      
      {/* Background ambient liquid glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-teal-400/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-wider mb-4 shadow-[0_0_14px_rgba(52,211,153,0.3)] backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-teal-300" />
            <span>Evidencia & Resultados</span>
          </div>
          <EditableText
            value={siteConfig.resultsTitle || 'Impacto y Validación Práctica de Solviplas'}
            onSave={(val) => updateSiteConfig({ resultsTitle: val })}
            tagName="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight block"
          />
          <EditableText
            value={siteConfig.resultsSubtitle || 'Muestra evaluada de 100 participantes antes y después de los talleres prácticos de formulación ecológica.'}
            onSave={(val) => updateSiteConfig({ resultsSubtitle: val })}
            tagName="p"
            multiline
            className="mt-4 text-base sm:text-lg text-emerald-100/80 block leading-relaxed"
          />
        </div>

        {/* Tab Switcher Liquid Bar */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 backdrop-blur-xl shadow-lg">
            <button
              onClick={() => setActiveTab('prepost')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'prepost'
                  ? 'bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 text-slate-950 shadow-[0_2px_14px_rgba(52,211,153,0.5),inset_0_1px_1px_rgba(255,255,255,0.9)] ring-1 ring-emerald-200/90'
                  : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/60'
              }`}
            >
              <TrendingUp className="w-4 h-4 stroke-[2.5]" />
              <span>Comparativa Pretest vs. Postest (+87% Adopción)</span>
            </button>
            <button
              onClick={() => setActiveTab('satisfaction')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'satisfaction'
                  ? 'bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 text-slate-950 shadow-[0_2px_14px_rgba(52,211,153,0.5),inset_0_1px_1px_rgba(255,255,255,0.9)] ring-1 ring-emerald-200/90'
                  : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/60'
              }`}
            >
              <BarChart3 className="w-4 h-4 stroke-[2.5]" />
              <span>Encuesta de Satisfacción (100 participantes)</span>
            </button>
          </div>
        </div>

        {/* Liquid Horizontal Connector Line */}
        <LiquidLineDivider badge="Métricas Científicas" label="Resultados Cuantitativos" className="mb-10" />

        {/* Tab 1: Pretest vs Postest */}
        {activeTab === 'prepost' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top highlight card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-500/30 relative overflow-hidden backdrop-blur-xl">
              <span className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-300">
                  Hallazgo Principal del Proyecto
                </span>
                <EditableText
                  value={siteConfig.resultsHighlightTitle || 'Disposición a sustituir el plástico por Solviplas saltó del 2% al 89%'}
                  onSave={(val) => updateSiteConfig({ resultsHighlightTitle: val })}
                  tagName="h3"
                  className="text-xl sm:text-2xl font-black block text-white"
                />
                <EditableText
                  value={siteConfig.resultsHighlightDescription || 'Antes del taller, la gran mayoría dudaba o desconocía los bioplásticos solubles. Tras experimentar su fabricación con almidón vegetal, 89 de cada 100 participantes manifestaron su total disposición a reemplazar plásticos comunes.'}
                  onSave={(val) => updateSiteConfig({ resultsHighlightDescription: val })}
                  tagName="p"
                  multiline
                  className="text-xs sm:text-sm text-emerald-100/80 max-w-xl block"
                />
              </div>
              <div className="shrink-0 flex items-center gap-4 bg-emerald-900/50 px-6 py-4 rounded-2xl border border-emerald-500/30 shadow-lg">
                <div className="text-center">
                  <span className="text-xs text-emerald-200 block font-semibold">Antes</span>
                  <span className="text-2xl font-black text-rose-300">2%</span>
                </div>
                <TrendingUp className="w-6 h-6 text-emerald-300" />
                <div className="text-center">
                  <span className="text-xs text-emerald-200 block font-semibold">Después</span>
                  <span className="text-3xl font-black text-emerald-300">89%</span>
                </div>
              </div>
            </div>

            {/* Questions Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SURVEY_RESULTS.pretestVsPostest.map((item, idx) => (
                <div key={idx} className="liquid-glass-card p-6 rounded-3xl flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                  <span className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                  <div>
                    <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block mb-1">
                      Pregunta #{idx + 1}
                    </span>
                    <h4 className="text-base font-bold text-white mb-4">
                      {item.question}
                    </h4>

                    {/* Bars */}
                    <div className="space-y-4">
                      {/* Pretest */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-400">Pretest (Antes del taller):</span>
                          <span className="text-slate-300 font-bold">{item.pretest.correct}%</span>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-3.5 overflow-hidden border border-slate-800">
                          <div
                            className="bg-slate-600 h-full rounded-full transition-all duration-700"
                            style={{ width: `${item.pretest.correct}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{item.pretest.label}</p>
                      </div>

                      {/* Postest */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-emerald-300 font-bold">Postest (Después del taller):</span>
                          <span className="text-emerald-300 font-black text-sm">{item.postest.correct}%</span>
                        </div>
                        <div className="w-full bg-emerald-950/80 rounded-full h-3.5 overflow-hidden border border-emerald-500/30">
                          <div
                            className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(52,211,153,0.6)]"
                            style={{ width: `${item.postest.correct}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-emerald-200/90 font-medium mt-1">{item.postest.label}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-emerald-900/60 flex items-center justify-between text-xs font-bold text-emerald-300">
                    <span>Avance positivo registrado:</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300 text-[11px] border border-emerald-500/40">
                      {item.gain}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Tab 2: Satisfaction Survey */}
        {activeTab === 'satisfaction' && (
          <div className="liquid-glass-card p-6 sm:p-10 rounded-3xl space-y-6 animate-fadeIn relative overflow-hidden backdrop-blur-xl">
            <span className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-emerald-900/60">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  Encuesta de Satisfacción Post-Taller
                </h3>
                <p className="text-xs text-emerald-200/70 mt-0.5">
                  Evaluación cuantitativa sobre 100 encuestados directos
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 font-bold text-emerald-300">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block shadow-[0_0_6px_rgba(52,211,153,0.8)]" /> Muy Satisfecho
                </span>
                <span className="flex items-center gap-1.5 font-bold text-teal-300">
                  <span className="w-3 h-3 rounded-full bg-teal-400 inline-block shadow-[0_0_6px_rgba(20,184,166,0.8)]" /> Satisfecho
                </span>
              </div>
            </div>

            <div className="space-y-5">
              {SURVEY_RESULTS.satisfaction.map((metric, idx) => {
                const totalPositive = metric.muySatisfecho + metric.satisfecho;
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">{metric.metric}</span>
                      <span className="font-extrabold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                        {totalPositive}% Aprobación
                      </span>
                    </div>

                    <div className="w-full h-4 bg-slate-900 rounded-full flex overflow-hidden border border-emerald-950">
                      <div
                        className="bg-emerald-400 h-full"
                        style={{ width: `${metric.muySatisfecho}%` }}
                        title={`Muy satisfecho: ${metric.muySatisfecho}%`}
                      />
                      <div
                        className="bg-teal-400 h-full"
                        style={{ width: `${metric.satisfecho}%` }}
                        title={`Satisfecho: ${metric.satisfecho}%`}
                      />
                      <div
                        className="bg-amber-400 h-full"
                        style={{ width: `${metric.pocoSatisfecho}%` }}
                        title={`Poco satisfecho: ${metric.pocoSatisfecho}%`}
                      />
                      <div
                        className="bg-rose-400 h-full"
                        style={{ width: `${metric.nadaSatisfecho}%` }}
                        title={`Nada satisfecho: ${metric.nadaSatisfecho}%`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center gap-3 text-xs text-emerald-200 mt-6">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                Más del <strong className="text-white">95% de los participantes</strong> calificó la experiencia formativa como positiva y altamente aplicable en su vida cotidiana.
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
