import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, CheckCircle2, Clock, UserCheck } from 'lucide-react';
import { EditableText } from './CanvaEditor/EditableText';
import { LiquidLineDivider } from './LiquidLineDivider';

export const TimelineSection: React.FC = () => {
  const { siteConfig, updateSiteConfig, activities, updateActivity } = useApp();
  const [selectedObjective, setSelectedObjective] = useState<number | 'all'>('all');

  if (!siteConfig.sections.timeline?.enabled) return null;

  const filteredActivities = selectedObjective === 'all'
    ? activities
    : activities.filter(a => a.objectiveId === selectedObjective);

  return (
    <section id="timeline" className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-emerald-950/70 to-slate-950 text-white relative overflow-hidden border-b border-emerald-500/20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-wider mb-4 shadow-[0_0_14px_rgba(52,211,153,0.3)] backdrop-blur-md">
            <Calendar className="w-3.5 h-3.5 text-teal-300" />
            <span>Planificación Estratégica 2025</span>
          </div>
          <EditableText
            value={siteConfig.timelineTitle || 'Cronograma y Fases del Proyecto'}
            onSave={(val) => updateSiteConfig({ timelineTitle: val })}
            tagName="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight block"
          />
          <EditableText
            value={siteConfig.timelineSubtitle || 'Desarrollo de acciones ejecutadas por el equipo de investigación para la implementación de bioplásticos biodegradables.'}
            onSave={(val) => updateSiteConfig({ timelineSubtitle: val })}
            tagName="p"
            multiline
            className="mt-3 text-base sm:text-lg text-emerald-100/80 block leading-relaxed"
          />
        </div>

        {/* Filter by Objective (Liquid Pills) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedObjective('all')}
            className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
              selectedObjective === 'all'
                ? 'bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 text-slate-950 shadow-[0_2px_14px_rgba(52,211,153,0.5),inset_0_1px_1px_rgba(255,255,255,0.9)] ring-1 ring-emerald-200/90'
                : 'bg-emerald-950/60 text-emerald-200/80 hover:text-white hover:bg-emerald-900/60 border border-emerald-800/40'
            }`}
          >
            Todas las Fases (1 a 5)
          </button>
          {[
            { id: 1, label: 'Fase 1: Fabricación' },
            { id: 2, label: 'Fase 2: Difusión' },
            { id: 3, label: 'Fase 3: Talleres' },
            { id: 4, label: 'Fase 4: Evaluación' },
            { id: 5, label: 'Fase 5: Replicabilidad' },
          ].map(obj => (
            <button
              key={obj.id}
              onClick={() => setSelectedObjective(obj.id)}
              className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                selectedObjective === obj.id
                  ? 'bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 text-slate-950 shadow-[0_2px_14px_rgba(52,211,153,0.5),inset_0_1px_1px_rgba(255,255,255,0.9)] ring-1 ring-emerald-200/90'
                  : 'bg-emerald-950/60 text-emerald-200/80 hover:text-white hover:bg-emerald-900/60 border border-emerald-800/40'
              }`}
            >
              {obj.label}
            </button>
          ))}
        </div>

        {/* Liquid Horizontal Connector Line */}
        <LiquidLineDivider badge="Fases & Actividades" label="Hitos de Ejecución" className="mb-8" />

        {/* Activity Cards List */}
        <div className="space-y-4">
          {filteredActivities.map((act) => (
            <div
              key={act.id}
              className="liquid-glass-card p-5 sm:p-6 rounded-3xl hover:-translate-y-1 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative overflow-hidden group"
            >
              <span className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              <div className="space-y-1.5 max-w-2xl text-left">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 font-black text-xs shadow-xs">
                    {act.activityCode}
                  </span>
                  <EditableText
                    value={act.name}
                    onSave={(val) => updateActivity(act.id, { name: val })}
                    tagName="h4"
                    className="text-base font-bold text-white block group-hover:text-emerald-200 transition-colors"
                  />
                </div>
                <EditableText
                  value={act.description}
                  onSave={(val) => updateActivity(act.id, { description: val })}
                  tagName="p"
                  multiline
                  className="text-xs sm:text-sm text-emerald-100/75 leading-relaxed block font-normal"
                />
                <div className="flex items-center gap-1.5 text-xs text-emerald-300/80 pt-1">
                  <UserCheck className="w-3.5 h-3.5 text-teal-300" />
                  <span>
                    Responsable:{' '}
                    <EditableText
                      value={act.responsible}
                      onSave={(val) => updateActivity(act.id, { responsible: val })}
                      tagName="span"
                      className="font-bold text-white"
                    />
                  </span>
                </div>
              </div>

              {/* Execution Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
                {/* Active Months Badges */}
                <div className="flex flex-wrap gap-1">
                  {act.months.map(m => (
                    <span
                      key={m}
                      className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-200 border border-emerald-500/30 text-[11px] font-semibold"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* Status Tag */}
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    act.status === 'completado'
                      ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-400/50 shadow-[0_0_10px_rgba(52,211,153,0.3)]'
                      : 'bg-amber-950/90 text-amber-300 border border-amber-400/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                  }`}
                >
                  {act.status === 'completado' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Completado</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>En Proceso</span>
                    </>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
