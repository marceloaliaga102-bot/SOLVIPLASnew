import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Flame,
  Clock,
  Thermometer,
  Lightbulb,
  CheckCircle2,
  Plus,
  Trash2,
  ChefHat,
  Sparkles,
  Layers,
  Droplets,
  Scale
} from 'lucide-react';
import { EditableText } from './CanvaEditor/EditableText';
import { EditableMedia } from './CanvaEditor/EditableMedia';
import { LiquidLineDivider } from './LiquidLineDivider';

export const TutorialSection: React.FC = () => {
  const {
    siteConfig,
    updateSiteConfig,
    tutorialSteps,
    updateTutorialStep,
    addTutorialStep,
    deleteTutorialStep,
    tutorialIngredients,
    updateTutorialIngredient,
    addTutorialIngredient,
    deleteTutorialIngredient,
    isAdmin,
    isLiveEditEnabled
  } = useApp();

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [portionMultiplier, setPortionMultiplier] = useState(1);
  const canEdit = isAdmin && isLiveEditEnabled;

  const currentStep = tutorialSteps[activeStepIndex] || tutorialSteps[0];

  return (
    <section id="tutorial" className="py-20 bg-gradient-to-b from-slate-900 via-emerald-950/60 to-slate-950 text-white relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 scroll-fade-item">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <EditableText
              value={siteConfig.tutorialBadge}
              onSave={(val) => updateSiteConfig({ tutorialBadge: val })}
              tagName="span"
            />
          </div>

          <EditableText
            value={siteConfig.tutorialTitle}
            onSave={(val) => updateSiteConfig({ tutorialTitle: val })}
            tagName="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4"
          />

          <EditableText
            value={siteConfig.tutorialSubtitle}
            onSave={(val) => updateSiteConfig({ tutorialSubtitle: val })}
            tagName="p"
            className="text-base sm:text-lg text-emerald-200/90 font-medium mb-3"
          />

          <EditableText
            value={siteConfig.tutorialDescription}
            onSave={(val) => updateSiteConfig({ tutorialDescription: val })}
            tagName="p"
            className="text-sm text-slate-300 leading-relaxed"
          />
        </div>

        {/* Master Demonstration Media (Video / Photo) */}
        <div className="mb-16 bg-gradient-to-br from-emerald-900/40 via-slate-900 to-teal-900/40 p-2 sm:p-4 rounded-3xl border border-emerald-800/40 shadow-2xl backdrop-blur-md scroll-fade-item">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video max-h-[500px]">
            <EditableMedia
              type={siteConfig.tutorialMediaType}
              src={siteConfig.tutorialMediaUrl}
              alt="Video tutorial de elaboración de bioplástico"
              className="w-full h-full object-cover"
              containerClassName="w-full h-full"
              onSave={(newSrc, newType) =>
                updateSiteConfig({
                  tutorialMediaUrl: newSrc,
                  tutorialMediaType: newType,
                })
              }
              label="Cambiar Video o Portada del Tutorial"
            />
          </div>
          <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Demostración Oficial en Vivo: Gelatinización y Curado Artesanal</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tiempo de cocción: ~7 min</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                <span>Temperatura óptima: 80°C</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Inocuo</span>
              </span>
            </div>
          </div>
        </div>

        {/* Liquid Horizontal Connector Line */}
        <LiquidLineDivider badge="Laboratorio Práctico" label="Etapas de Preparación y Síntesis" className="my-10" />

        {/* Interactive Steps Navigator & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 scroll-fade-item">
          
          {/* Steps selector buttons */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-300" />
                <span>Etapas del Proceso</span>
              </h3>
              {canEdit && (
                <button
                  type="button"
                  onClick={addTutorialStep}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-300 hover:text-white bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir Paso</span>
                </button>
              )}
            </div>

            <div className="space-y-2.5">
              {tutorialSteps.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border flex items-center justify-between gap-3 relative overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 text-slate-950 font-black shadow-[0_4px_20px_rgba(52,211,153,0.5),inset_0_1px_1px_rgba(255,255,255,0.9)] ring-1 ring-emerald-200/90 scale-[1.02]'
                        : 'bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-200/80 border-emerald-800/40 hover:border-emerald-500/40'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute top-0.5 inset-x-2 h-[35%] rounded-full bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />
                    )}
                    <div className="flex items-center gap-3 relative z-10">
                      <div
                        className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-slate-950 text-emerald-300 shadow-md ring-1 ring-emerald-950'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}
                      >
                        0{step.stepNumber || idx + 1}
                      </div>
                      <div className="text-left">
                        <p className={`text-xs font-bold line-clamp-1 ${isActive ? 'text-slate-950 font-black' : 'text-white'}`}>{step.title}</p>
                        <p className={`text-[10px] ${isActive ? 'text-slate-800 font-semibold' : 'text-emerald-300/70'}`}>{step.duration} • {step.temp}</p>
                      </div>
                    </div>

                    {canEdit && tutorialSteps.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('¿Eliminar este paso?')) {
                            deleteTutorialStep(step.id);
                            if (activeStepIndex >= tutorialSteps.length - 1) {
                              setActiveStepIndex(Math.max(0, tutorialSteps.length - 2));
                            }
                          }
                        }}
                        className="p-1.5 rounded-lg text-rose-300 hover:text-rose-100 hover:bg-rose-900/60 transition-colors relative z-10"
                        title="Eliminar paso"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Step Detailed Interactive View */}
          {currentStep && (
            <div className="lg:col-span-8 liquid-glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl">
              <span className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-500/40">
                    PASO {currentStep.stepNumber}
                  </span>
                  <EditableText
                    value={currentStep.title}
                    onSave={(val) => updateTutorialStep(currentStep.id, { title: val })}
                    tagName="h3"
                    className="text-xl sm:text-2xl font-black text-white"
                  />
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 text-emerald-300 border border-slate-700">
                    <Clock className="w-3.5 h-3.5" />
                    <EditableText
                      value={currentStep.duration}
                      onSave={(val) => updateTutorialStep(currentStep.id, { duration: val })}
                      tagName="span"
                      className="font-medium"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 text-amber-300 border border-slate-700">
                    <Thermometer className="w-3.5 h-3.5" />
                    <EditableText
                      value={currentStep.temp}
                      onSave={(val) => updateTutorialStep(currentStep.id, { temp: val })}
                      tagName="span"
                      className="font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Step Media */}
              <div className="mb-6 rounded-2xl overflow-hidden aspect-video max-h-72 border border-slate-800 shadow-lg relative bg-black">
                <EditableMedia
                  type={currentStep.mediaType || 'image'}
                  src={currentStep.mediaUrl}
                  alt={currentStep.title}
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                  onSave={(newSrc, newType) =>
                    updateTutorialStep(currentStep.id, {
                      mediaUrl: newSrc,
                      mediaType: newType,
                    })
                  }
                  label="Cambiar Foto o Video de este Paso"
                />
              </div>

              {/* Step Description */}
              <div className="mb-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Procedimiento Detallado:
                </p>
                <EditableText
                  value={currentStep.description}
                  onSave={(val) => updateTutorialStep(currentStep.id, { description: val })}
                  tagName="p"
                  multiline
                  className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal"
                />
              </div>

              {/* Pro Tip Box */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 shrink-0 mt-0.5">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-extrabold text-amber-300 uppercase tracking-wider mb-1">
                    Consejo de Laboratorio:
                  </p>
                  <EditableText
                    value={currentStep.tip}
                    onSave={(val) => updateTutorialStep(currentStep.id, { tip: val })}
                    tagName="p"
                    className="text-xs text-amber-100/90 leading-normal"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
