import React from 'react';
import { ResultsSection } from '../components/ResultsSection';
import { BarChart3 } from 'lucide-react';

export const ResultadosView: React.FC = () => {
  return (
    <div className="space-y-0 animate-fadeIn min-h-screen bg-slate-950 text-slate-100">
      {/* Header de la Ventana */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 border-b border-teal-800/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/80 border border-teal-500/40 text-teal-300 text-xs font-bold uppercase tracking-wider mb-2">
              <BarChart3 className="w-3.5 h-3.5 text-teal-400" />
              <span>Validación Científica & Impacto</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Resultados de la Investigación
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-teal-200/80 max-w-2xl">
              Datos cuantitativos de biodegradación, pruebas con 100 participantes de la comunidad y métricas de satisfacción del bioplástico Solviplas.
            </p>
          </div>
        </div>
      </div>

      {/* Solo Resultados */}
      <ResultsSection />
    </div>
  );
};

export const GaleriaResultadosView = ResultadosView;
