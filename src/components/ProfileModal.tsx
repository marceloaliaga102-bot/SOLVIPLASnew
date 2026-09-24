import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AvatarPicker } from './AvatarPicker';
import { ANIMAL_AVATARS, ECO_TITLES, ECO_INTERESTS, THEME_COLORS } from '../data/animalAvatars';
import {
  X,
  User as UserIcon,
  Sparkles,
  Save,
  MapPin,
  Heart,
  MessageSquare,
  Award,
  Calendar,
  Check,
  Palette,
  ShieldCheck,
  Leaf,
} from 'lucide-react';

export const ProfileModal: React.FC = () => {
  const {
    currentUser,
    isProfileModalOpen,
    setIsProfileModalOpen,
    updateUserProfile,
    comments,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'avatar'>('profile');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [ecoTitle, setEcoTitle] = useState('');
  const [ecoInterest, setEcoInterest] = useState('');
  const [location, setLocation] = useState('');
  const [institution, setInstitution] = useState('');
  const [themeColor, setThemeColor] = useState<'emerald' | 'teal' | 'cyan' | 'amber' | 'violet' | 'rose'>('emerald');
  const [avatar, setAvatar] = useState('');
  const [avatarAnimalId, setAvatarAnimalId] = useState<string | undefined>(undefined);
  const [avatarType, setAvatarType] = useState<'animal' | 'custom' | 'default'>('animal');
  const [isSaving, setIsSaving] = useState(false);

  // Sync state whenever modal opens or currentUser updates
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setBio(currentUser.bio || '');
      setEcoTitle(currentUser.ecoTitle || (currentUser.role === 'admin' ? 'Administrador Solviplas' : 'Guardián de la Biodiversidad'));
      setEcoInterest(currentUser.ecoInterest || 'Almidón de Yuca & Maíz');
      setLocation(currentUser.location || '');
      setInstitution(currentUser.institution || '');
      setThemeColor(currentUser.themeColor || 'emerald');
      setAvatar(currentUser.avatar || ANIMAL_AVATARS[0].svgDataUri);
      setAvatarAnimalId(currentUser.avatarAnimalId);
      setAvatarType(currentUser.avatarType || 'animal');
    }
  }, [currentUser, isProfileModalOpen]);

  if (!isProfileModalOpen || !currentUser) return null;

  // Compute stats for current user
  const userCommentsCount = comments.filter(
    c => c.userId === currentUser.id || c.userName === currentUser.name || (currentUser.email && c.userId === currentUser.email)
  ).length;

  const totalLikesReceived = comments
    .filter(c => c.userId === currentUser.id || c.userName === currentUser.name || (currentUser.email && c.userId === currentUser.email))
    .reduce((acc, curr) => acc + (curr.likes || 0), 0);

  const matchedAnimal = ANIMAL_AVATARS.find(
    a => a.id === avatarAnimalId || a.svgDataUri === avatar
  );

  const activeTheme = THEME_COLORS.find(t => t.id === themeColor) || THEME_COLORS[0];

  const handleAvatarSelect = (newAvatarUrl: string, animalId?: string, type?: 'animal' | 'custom') => {
    setAvatar(newAvatarUrl);
    setAvatarAnimalId(animalId);
    setAvatarType(type || (animalId ? 'animal' : 'custom'));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSaving(true);
    try {
      await updateUserProfile({
        name: name.trim(),
        bio: bio.trim(),
        ecoTitle: ecoTitle.trim(),
        ecoInterest: ecoInterest.trim(),
        location: location.trim(),
        institution: institution.trim(),
        themeColor,
        avatar,
        avatarAnimalId,
        avatarType,
      });
      setIsProfileModalOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'Reciente';
    try {
      return new Date(isoString).toLocaleDateString('es-ES', {
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return '2025';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Banner with dynamic theme color */}
        <div className={`relative p-6 text-white bg-gradient-to-r ${activeTheme.class} shrink-0`}>
          <button
            type="button"
            onClick={() => setIsProfileModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Avatar container with edit trigger */}
            <div className="relative group">
              <img
                src={avatar || ANIMAL_AVATARS[0].svgDataUri}
                alt={name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-white/90 shadow-xl bg-white"
              />
              <button
                type="button"
                onClick={() => setActiveTab('avatar')}
                className="absolute bottom-0 right-0 p-1.5 rounded-full bg-slate-950 text-white text-[10px] hover:bg-emerald-600 transition-colors shadow-md ring-2 ring-white flex items-center justify-center"
                title="Cambiar avatar o foto"
              >
                <UserIcon className="w-3.5 h-3.5 text-white" />
              </button>
            </div>

            {/* User Meta */}
            <div className="text-center sm:text-left flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-black text-white truncate drop-shadow-sm">
                  {name || 'Mi Perfil'}
                </h2>
                {currentUser.role === 'admin' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5" /> Administrador
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/25 text-white backdrop-blur-sm">
                    <Leaf className="w-3 h-3" /> Comunidad Eco
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm font-semibold text-white/90 truncate flex items-center justify-center sm:justify-start gap-1">
                <span>{ecoTitle || 'Guardián de la Biodiversidad'}</span>
                {matchedAnimal && <span>({matchedAnimal.species})</span>}
              </p>

              {/* Bio summary */}
              <p className="text-xs text-white/80 line-clamp-2 mt-1 italic">
                "{bio || 'Comprometido con un planeta libre de plásticos y química verde.'}"
              </p>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/20 text-center">
            <div className="bg-black/15 rounded-xl p-1.5">
              <div className="flex items-center justify-center gap-1 text-[11px] text-white/80">
                <MessageSquare className="w-3 h-3" />
                <span>Comentarios</span>
              </div>
              <p className="text-sm font-black text-white">{userCommentsCount}</p>
            </div>

            <div className="bg-black/15 rounded-xl p-1.5">
              <div className="flex items-center justify-center gap-1 text-[11px] text-white/80">
                <Heart className="w-3 h-3 text-rose-300" />
                <span>Me Gustas</span>
              </div>
              <p className="text-sm font-black text-white">{totalLikesReceived}</p>
            </div>

            <div className="bg-black/15 rounded-xl p-1.5">
              <div className="flex items-center justify-center gap-1 text-[11px] text-white/80">
                <Calendar className="w-3 h-3" />
                <span>Miembro Desde</span>
              </div>
              <p className="text-sm font-black text-white">{formatDate(currentUser.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'profile'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>Datos & Personalización</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('avatar')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'avatar'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Avatar de Animalito / Foto</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">
              16 Avatares
            </span>
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto flex-1 space-y-5">
          {activeTab === 'profile' ? (
            <>
              {/* Name & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nombre o Apodo Visible
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Marcelo Aliaga"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Institución o Centro de Estudios
                  </label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Ej. UNSA / Colegio / Eco-Pyme"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800"
                  />
                </div>
              </div>

              {/* Eco Title Preset Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Eco-Título o Insignia de Perfil
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ecoTitle}
                    onChange={(e) => setEcoTitle(e.target.value)}
                    placeholder="Ej. Guardián de la Biodiversidad"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {ECO_TITLES.map((title) => (
                    <button
                      key={title}
                      type="button"
                      onClick={() => setEcoTitle(title)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                        ecoTitle === title
                          ? 'bg-emerald-600 text-white shadow-xs font-bold'
                          : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                      }`}
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Eco Interest & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Interés Ecológico Principal
                  </label>
                  <select
                    value={ecoInterest}
                    onChange={(e) => setEcoInterest(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800 bg-white"
                  >
                    {ECO_INTERESTS.map(item => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Ubicación / Ciudad</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ej. Arequipa, Perú"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800"
                  />
                </div>
              </div>

              {/* Personal Bio */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Biografía / Compromiso Ecológico
                  </label>
                  <span className="text-[10px] text-slate-400">
                    {bio.length}/300 caracteres
                  </span>
                </div>
                <textarea
                  rows={3}
                  maxLength={300}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Comparte tu experiencia con bioplásticos, tus ideas para reducir contaminación o tu proyecto escolar..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800 resize-none"
                />
              </div>

              {/* Theme Color Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Color de Tema del Perfil</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {THEME_COLORS.map((theme) => {
                    const isSelected = themeColor === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setThemeColor(theme.id)}
                        className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50 shadow-sm ring-1 ring-emerald-500'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${theme.class} shadow-xs flex items-center justify-center text-white text-[10px]`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-[10px] font-semibold text-slate-700 truncate text-center">
                          {theme.label.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Earned Badges */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-slate-800">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Insignias de la Comunidad Solviplas</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
                    Pionero Solviplas
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-xl bg-teal-100 text-teal-800 font-bold flex items-center gap-1">
                    Océanos Limpios
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center gap-1">
                    Químico Verde
                  </span>
                  {userCommentsCount > 0 && (
                    <span className="text-xs px-2.5 py-1 rounded-xl bg-blue-100 text-blue-800 font-bold flex items-center gap-1">
                      Voz Comunitaria ({userCommentsCount})
                    </span>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* TAB 2: AVATAR PICKER */
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900">
                <span className="font-bold">Elige un avatar ecológico o sube tu propia foto:</span>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  Puedes seleccionar cualquiera de nuestros 16 avatares con causas ecológicas o subir cualquier foto desde la galería de tu dispositivo móvil o computadora.
                </p>
              </div>

              <AvatarPicker
                currentAvatar={avatar}
                selectedAnimalId={avatarAnimalId}
                onSelectAvatar={handleAvatarSelect}
              />
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white/95 backdrop-blur-sm -mb-2 pb-2">
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Guardando en la nube...' : 'Guardar Perfil'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
