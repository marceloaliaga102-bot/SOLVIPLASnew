import React from 'react';
import { TimelineSection } from '../components/TimelineSection';
import { TeamSection } from '../components/TeamSection';
import { Users } from 'lucide-react';

export const EquipoView: React.FC = () => {
  return (
    <div className="space-y-0 animate-fadeIn min-h-screen bg-slate-950 text-white select-none">
      {/* Header de la Ventana */}
      <div className="bg-gradient-to-r from-emerald-950/90 via-slate-950 to-green-950/90 border-b border-emerald-500/20 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-wider mb-2 shadow-[0_0_12px_rgba(52,211,153,0.25)] backdrop-blur-md">
              <Users className="w-3.5 h-3.5 text-teal-300" />
              <span>Investigación & Personas</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Equipo de Investigación & Cronograma
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-emerald-200/80 max-w-2xl leading-relaxed">
              Conoce a los creadores de Solviplas, mentores pedagógicos, objetivos alcanzados y el plan de trabajo para la difusión ambiental.
            </p>
          </div>
        </div>
      </div>

      {/* 1. Cronograma de Actividades */}
      <TimelineSection />

      {/* 2. Equipo de Investigación */}
      <TeamSection />
    </div>
  );
};
