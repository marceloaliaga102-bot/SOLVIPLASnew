import React from 'react';
import { CustomSection } from '../types';
import { CustomSectionRenderer } from '../components/CustomSectionRenderer';
import { Sparkles } from 'lucide-react';

interface CustomSectionViewProps {
  section: CustomSection;
}

export const CustomSectionView: React.FC<CustomSectionViewProps> = ({ section }) => {
  return (
    <div className="space-y-0 animate-fadeIn min-h-screen bg-slate-950 text-white select-none">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950/90 via-slate-950 to-teal-950/90 border-b border-emerald-500/20 py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-wider shadow-[0_0_12px_rgba(52,211,153,0.25)] backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-teal-300" />
            <span>Sección Especial • {section.title}</span>
          </div>
        </div>
      </div>

      <CustomSectionRenderer section={section} />
    </div>
  );
};
