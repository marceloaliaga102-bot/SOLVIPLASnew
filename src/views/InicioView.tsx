import React from 'react';
import { Hero } from '../components/Hero';
import { PresentationSection } from '../components/PresentationSection';

export const InicioView: React.FC = () => {
  return (
    <div className="space-y-0 animate-fadeIn bg-slate-950 text-slate-100 min-h-screen">
      {/* 1. Hero Principal de Bienvenida */}
      <Hero />

      {/* 2. Presentación y Resumen Completo: De qué trata la página y qué da a conocer */}
      <PresentationSection />
    </div>
  );
};
