import React from 'react';
import { NewsSection } from '../components/NewsSection';
import { Newspaper, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NoticiasView: React.FC = () => {
  const { siteConfig } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 animate-fadeIn">
      {/* Top Breadcrumb & Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-950 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-emerald-800/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black uppercase tracking-wider mb-4">
            <Newspaper className="w-3.5 h-3.5 text-emerald-400" />
            <span>Actualizaciones & Nuevas Implementaciones</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Noticias & Avances de Solviplas
          </h1>
          <p className="mt-3 text-sm sm:text-base text-emerald-200/90 max-w-2xl leading-relaxed">
            Sigue de cerca el desarrollo de nuevos prototipos de bioplásticos hidrosolubles, resultados de talleres comunitarios, pruebas de laboratorio y mejoras continuas del proyecto.
          </p>
        </div>
      </div>

      {/* Main News Section */}
      <NewsSection />
    </div>
  );
};
