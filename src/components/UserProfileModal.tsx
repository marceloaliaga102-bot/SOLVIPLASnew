import React from 'react';
import { X, Award, MapPin, Building, Calendar, MessageSquare, ShieldCheck, Heart, Sparkles, User as UserIcon, Leaf, Droplets, MessageCircle } from 'lucide-react';
import { User, Comment } from '../types';

export interface ProfileModalData {
  user?: Partial<User> | null;
  name: string;
  avatar: string;
  role?: string;
  institution?: string;
  bio?: string;
  ecoTitle?: string;
  ecoInterest?: string;
  location?: string;
  joinedDate?: string;
  userComments?: Comment[];
}

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileModalData | null;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  if (!isOpen || !profile) return null;

  const roleName = profile.user?.role === 'admin' 
    ? 'Administrador Solviplas' 
    : profile.role || (profile.user?.institution ? `Comunidad (${profile.user.institution})` : 'Miembro Comunitario');

  const ecoTitle = profile.ecoTitle || profile.user?.ecoTitle || (profile.user?.role === 'admin' ? 'Líder de Proyecto' : 'Amigo de la Química Verde');
  const institution = profile.institution || profile.user?.institution || 'Comunidad Solviplas';
  const location = profile.location || profile.user?.location || 'Lima, Perú';
  const bio = profile.bio || profile.user?.bio || 'Participante activo en la transición hacia alternativas libres de microplásticos y defensor de los biopolímeros biodegradables.';
  const ecoInterest = profile.ecoInterest || profile.user?.ecoInterest || 'Reducción de plásticos de un solo uso & formulación casera';
  const commentsCount = profile.userComments ? profile.userComments.length : 1;

  // Badges based on activity/role
  const badges = [
    { label: 'Pionero Verde', icon: Leaf, desc: 'Promueve alternativas ecológicas', color: 'text-emerald-600' },
    { label: 'Cero Microplásticos', icon: Droplets, desc: 'Comprometido con la hidrosolubilidad', color: 'text-cyan-600' },
    ...(profile.user?.role === 'admin' ? [{ label: 'Equipo Oficial', icon: ShieldCheck, desc: 'Investigador y administrador', color: 'text-amber-600' }] : []),
    ...(commentsCount >= 2 ? [{ label: 'Voz Activa', icon: MessageCircle, desc: 'Múltiples aportes en la comunidad', color: 'text-blue-600' }] : []),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Cover Background */}
        <div className="h-28 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
            title="Cerrar perfil"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <span className="absolute bottom-2 right-4 text-[10px] font-extrabold uppercase tracking-wider text-emerald-100 bg-emerald-950/40 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
            Perfil de la Comunidad
          </span>
        </div>

        {/* Avatar & Main Info */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex items-end justify-between -mt-12 mb-4">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-xl bg-white border border-emerald-100"
              />
              <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center ring-2 ring-white shadow-sm">
                <UserIcon className="w-3.5 h-3.5 text-slate-950" />
              </span>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {roleName}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              {profile.name}
            </h3>
            <p className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              {ecoTitle}
            </p>
          </div>

          {/* Bio text */}
          <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
            "{bio}"
          </div>

          {/* Quick Details Grid */}
          <div className="grid grid-cols-2 gap-2.5 mt-4 text-xs">
            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100/80 flex items-center gap-2 text-emerald-900">
              <Building className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-emerald-600 block font-semibold uppercase">Institución</span>
                <span className="font-bold truncate">{institution}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-teal-50/70 border border-teal-100/80 flex items-center gap-2 text-teal-900">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-teal-600 block font-semibold uppercase">Ubicación</span>
                <span className="font-bold truncate">{location}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-cyan-50/70 border border-cyan-100/80 flex items-center gap-2 text-cyan-900 col-span-2">
              <Heart className="w-4 h-4 text-cyan-600 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-cyan-600 block font-semibold uppercase">Interés Ecológico</span>
                <span className="font-bold truncate">{ecoInterest}</span>
              </div>
            </div>
          </div>

          {/* Badges / Medallas */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-500" /> Insignias Obtenidas
              </span>
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <MessageSquare className="w-3 h-3 text-emerald-600" />
                {commentsCount} {commentsCount === 1 ? 'publicación' : 'publicaciones'}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {badges.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <span
                    key={idx}
                    title={b.desc}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-emerald-100/60 text-slate-700 hover:text-emerald-900 text-[11px] font-bold border border-slate-200 transition-colors"
                  >
                    <Icon className={`w-3.5 h-3.5 ${b.color}`} />
                    <span>{b.label}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-5">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all active:scale-98"
            >
              Cerrar Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
