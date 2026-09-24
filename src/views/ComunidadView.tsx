import React from 'react';
import { CommentsSection } from '../components/CommentsSection';
import { useApp } from '../context/AppContext';
import { MessageSquare, Sparkles } from 'lucide-react';

export const ComunidadView: React.FC = () => {
  const { currentUser, setIsProfileModalOpen, setIsAuthModalOpen, setAuthModalMode } = useApp();

  return (
    <div className="space-y-0 animate-fadeIn min-h-screen bg-slate-950 text-white select-none">
      {/* Header de la Ventana */}
      <div className="bg-gradient-to-r from-teal-950/90 via-slate-950 to-emerald-950/90 border-b border-emerald-500/20 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-wider mb-2 shadow-[0_0_12px_rgba(52,211,153,0.25)] backdrop-blur-md">
              <MessageSquare className="w-3.5 h-3.5 text-teal-300" />
              <span>Foro Abierto & Participación</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Comunidad & Consultas Solviplas
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-emerald-200/80 max-w-2xl leading-relaxed">
              Comparte tus inquietudes, dudas de preparación, sugerencias y debate en tiempo real con el equipo y otros miembros.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-slate-950 text-xs font-black flex items-center gap-2 shadow-[0_4px_16px_rgba(52,211,153,0.35)] transition-all cursor-pointer ring-1 ring-emerald-200/90 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mi Avatar: {currentUser.name}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('register');
                  setIsAuthModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-slate-950 text-xs font-black flex items-center gap-2 shadow-[0_4px_16px_rgba(52,211,153,0.35)] transition-all cursor-pointer ring-1 ring-emerald-200/90 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Elige tu Avatar</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 1. Sección de Comentarios */}
      <CommentsSection />
    </div>
  );
};
