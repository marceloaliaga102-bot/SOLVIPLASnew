import React from 'react';
import { TutorialSection } from '../components/TutorialSection';
import { FlaskConical } from 'lucide-react';

export const TutorialView: React.FC = () => {
  return (
    <div className="space-y-0 animate-fadeIn min-h-screen">
      {/* Header de la Ventana */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-b border-emerald-800/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
              <span>Guía Práctica</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Tutorial & Proceso de Preparación
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-emerald-200/80 max-w-2xl">
              Aprende a formular y elaborar bioplásticos biodegradables a base de almidón vegetal con instrucciones paso a paso.
            </p>
          </div>
        </div>
      </div>

      {/* Tutorial Paso a Paso */}
      <TutorialSection />
    </div>
  );
};
