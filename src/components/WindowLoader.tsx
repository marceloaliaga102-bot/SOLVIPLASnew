import React from 'react';
import { Leaf } from 'lucide-react';

export const WindowLoader: React.FC = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center animate-pulse">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 text-emerald-950 mb-4 animate-bounce">
        <Leaf className="w-7 h-7" />
      </div>
      <p className="text-sm font-black text-emerald-300 tracking-wide">Cargando ventana...</p>
      <p className="text-xs text-slate-400 mt-1">Solviplas Bioplásticos</p>
    </div>
  );
};
