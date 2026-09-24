import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, Users } from 'lucide-react';
import { EditableText } from './CanvaEditor/EditableText';
import { EditableImage } from './CanvaEditor/EditableImage';
import { LiquidLineDivider } from './LiquidLineDivider';

export const TeamSection: React.FC = () => {
  const { siteConfig, updateSiteConfig, teamMembers, updateTeamMember } = useApp();

  if (!siteConfig.sections.team?.enabled) return null;

  const leader = teamMembers[0];
  const members = teamMembers.slice(1);

  return (
    <section id="team" className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-emerald-950/70 to-slate-950 text-white relative overflow-hidden border-b border-emerald-500/20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-wider mb-4 shadow-[0_0_14px_rgba(52,211,153,0.3)] backdrop-blur-md">
            <Users className="w-3.5 h-3.5 text-teal-300" />
            <span>Equipo de Investigación & Desarrollo Sostenible</span>
          </div>
          <EditableText
            value={siteConfig.teamTitle || 'Equipo Responsable del Proyecto'}
            onSave={(val) => updateSiteConfig({ teamTitle: val })}
            tagName="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight block"
          />
          <EditableText
            value={siteConfig.teamSubtitle || 'Personas comprometidas con la reducción de residuos plásticos y la democratización de la química verde.'}
            onSave={(val) => updateSiteConfig({ teamSubtitle: val })}
            tagName="p"
            multiline
            className="mt-3 text-base sm:text-lg text-emerald-100/80 block leading-relaxed"
          />
        </div>

        {/* Featured Leader Card */}
        {leader && (
          <div className="mb-14 p-6 sm:p-8 rounded-3xl liquid-glass-card shadow-2xl relative overflow-hidden group">
            <span className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-4 flex justify-center">
                <div className="relative">
                  <EditableImage
                    src={leader.avatar}
                    alt={leader.name}
                    onSave={(newSrc) => updateTeamMember(leader.id, { avatar: newSrc })}
                    className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover ring-4 ring-emerald-400/50 shadow-2xl"
                    label="Cambiar Foto"
                  />
                  <span className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-300 to-teal-300 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-lg pointer-events-none">
                    Coordinación
                  </span>
                </div>
              </div>

              <div className="md:col-span-8 space-y-3 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-black border border-emerald-500/40">
                  <Award className="w-3.5 h-3.5 text-teal-300" />
                  <EditableText
                    value={leader.role}
                    onSave={(val) => updateTeamMember(leader.id, { role: val })}
                    tagName="span"
                  />
                </div>

                <EditableText
                  value={leader.name}
                  onSave={(val) => updateTeamMember(leader.id, { name: val })}
                  tagName="h3"
                  className="text-2xl sm:text-3xl font-black text-white block"
                />

                <EditableText
                  value={leader.institution}
                  onSave={(val) => updateTeamMember(leader.id, { institution: val })}
                  tagName="p"
                  className="text-xs sm:text-sm text-teal-300 font-semibold block"
                />

                <EditableText
                  value={leader.description}
                  onSave={(val) => updateTeamMember(leader.id, { description: val })}
                  tagName="p"
                  multiline
                  className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-2xl block font-normal"
                />
              </div>
            </div>
          </div>
        )}

        {/* Liquid Horizontal Connector Line */}
        <LiquidLineDivider badge="Investigadores & Estudiantes" label="Colaboradores del Proyecto" className="mb-10" />

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map(member => (
            <div
              key={member.id}
              className="liquid-glass-card p-6 rounded-3xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between scroll-fade-item relative overflow-hidden group"
            >
              <span className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <EditableImage
                    src={member.avatar}
                    alt={member.name}
                    onSave={(newSrc) => updateTeamMember(member.id, { avatar: newSrc })}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-400/40 shadow-sm"
                    label="Cambiar"
                  />
                  <div>
                    <EditableText
                      value={member.name}
                      onSave={(val) => updateTeamMember(member.id, { name: val })}
                      tagName="h4"
                      className="font-bold text-white text-sm leading-snug block group-hover:text-emerald-200 transition-colors"
                    />
                    <EditableText
                      value={member.role}
                      onSave={(val) => updateTeamMember(member.id, { role: val })}
                      tagName="p"
                      className="text-xs text-teal-300 font-semibold block"
                    />
                  </div>
                </div>

                <EditableText
                  value={member.description}
                  onSave={(val) => updateTeamMember(member.id, { description: val })}
                  tagName="p"
                  multiline
                  className="text-xs text-emerald-100/75 leading-relaxed block font-normal"
                />
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-900/60 text-[11px] text-emerald-300/80 font-medium">
                <EditableText
                  value={member.institution}
                  onSave={(val) => updateTeamMember(member.id, { institution: val })}
                  tagName="span"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
