import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Beaker, Sparkles, Calculator } from 'lucide-react';
import { EditableText } from './CanvaEditor/EditableText';

export const RecipeProcessSection: React.FC = () => {
  const { siteConfig, updateSiteConfig } = useApp();

  // Portions multiplier
  const [portionMultiplier, setPortionMultiplier] = useState<number>(1);

  if (!siteConfig.sections.recipe?.enabled) return null;

  return (
    <section id="recipe" className="py-16 sm:py-24 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Beaker className="w-3.5 h-3.5" />
            <span>Fórmula de Química Verde</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cómo se Elabora Solviplas
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Una receta ecológica, segura y económica desarrollada con insumos naturales accesibles con un presupuesto optimizado de S/. 30 soles.
          </p>
        </div>

        {/* Portion Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 mb-10">
          <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>Calculadora de Proporciones para la Mezcla:</span>
          </div>
          <div className="flex gap-2">
            {[
              { label: "1 Lámina Individual", mult: 1 },
              { label: "Lote Mediano (25 láminas)", mult: 5 },
              { label: "Lote de Taller (100 láminas)", mult: 20 },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => setPortionMultiplier(item.mult)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  portionMultiplier === item.mult
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ingredients Grid (Canva Editable) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {siteConfig.recipeIngredients.map((ing, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-emerald-400 transition-all">
              <div className="flex items-start justify-between gap-2 mb-2">
                <EditableText
                  value={ing.name}
                  onSave={(val) => {
                    const updated = [...siteConfig.recipeIngredients];
                    updated[idx] = { ...updated[idx], name: val };
                    updateSiteConfig({ recipeIngredients: updated });
                  }}
                  tagName="h4"
                  className="font-bold text-slate-900 text-sm block"
                />
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold whitespace-nowrap">
                  {portionMultiplier === 1 ? ing.amount : `${portionMultiplier}x dosis`}
                </span>
              </div>
              <EditableText
                value={ing.purpose}
                onSave={(val) => {
                  const updated = [...siteConfig.recipeIngredients];
                  updated[idx] = { ...updated[idx], purpose: val };
                  updateSiteConfig({ recipeIngredients: updated });
                }}
                tagName="p"
                multiline
                className="text-xs text-slate-600 leading-relaxed block"
              />
            </div>
          ))}
        </div>

        {/* Cooking & Curing Steps (Canva Editable) */}
        <div className="mb-20">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 text-center mb-8">
            Pasos de Fabricación Artesanal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.recipeSteps.map((step, idx) => (
              <div key={step.stepNumber} className="relative p-6 rounded-3xl bg-emerald-50/50 border border-emerald-200/80 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-sm mb-4 shadow">
                    {step.stepNumber}
                  </div>
                  <EditableText
                    value={step.title}
                    onSave={(val) => {
                      const updated = [...siteConfig.recipeSteps];
                      updated[idx] = { ...updated[idx], title: val };
                      updateSiteConfig({ recipeSteps: updated });
                    }}
                    tagName="h4"
                    className="text-base font-bold text-slate-900 mb-2 block"
                  />
                  <EditableText
                    value={step.description}
                    onSave={(val) => {
                      const updated = [...siteConfig.recipeSteps];
                      updated[idx] = { ...updated[idx], description: val };
                      updateSiteConfig({ recipeSteps: updated });
                    }}
                    tagName="p"
                    multiline
                    className="text-xs text-slate-600 leading-relaxed mb-4 block"
                  />
                </div>
                <div className="pt-3 border-t border-emerald-200/60 text-[11px] text-emerald-800 font-medium flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="w-full">
                    <strong>Consejo: </strong>
                    <EditableText
                      value={step.tip}
                      onSave={(val) => {
                        const updated = [...siteConfig.recipeSteps];
                        updated[idx] = { ...updated[idx], tip: val };
                        updateSiteConfig({ recipeSteps: updated });
                      }}
                      tagName="span"
                      className="inline"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
