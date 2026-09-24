import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AvatarPicker } from './AvatarPicker';
import { ANIMAL_AVATARS, ECO_TITLES } from '../data/animalAvatars';
import { X, LogIn, UserPlus, Sparkles, Loader2, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    loginUser,
    registerUser,
    setIsProfileModalOpen,
  } = useApp();

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openProfileAfterLogin, setOpenProfileAfterLogin] = useState(false);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regAvatar, setRegAvatar] = useState(ANIMAL_AVATARS[0].svgDataUri);
  const [regAnimalId, setRegAnimalId] = useState<string | undefined>('panda-eco');
  const [regAvatarType, setRegAvatarType] = useState<'animal' | 'custom'>('animal');
  const [regEcoTitle, setRegEcoTitle] = useState(ECO_TITLES[0]);

  // Clean inputs when modal closes
  useEffect(() => {
    if (!isAuthModalOpen) {
      setLoginIdentifier('');
      setLoginPassword('');
      setLoginError('');
      setRegName('');
      setRegEmail('');
      setRegPassword('');
      setIsSubmitting(false);
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);
    try {
      const res = await loginUser(loginIdentifier, loginPassword);
      if (res.success) {
        setIsAuthModalOpen(false);
        setLoginIdentifier('');
        setLoginPassword('');
        if (openProfileAfterLogin) {
          setIsProfileModalOpen(true);
        }
      } else {
        setLoginError(res.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) return;

    setIsSubmitting(true);
    try {
      const ok = await registerUser({
        name: regName.trim(),
        email: regEmail.trim(),
        password: regPassword.trim(),
        avatar: regAvatar,
        avatarAnimalId: regAnimalId,
        avatarType: regAvatarType,
        ecoTitle: regEcoTitle,
      });

      if (ok) {
        setIsAuthModalOpen(false);
        setRegName('');
        setRegEmail('');
        setRegPassword('');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarSelected = (url: string, animalId?: string, type?: 'animal' | 'custom') => {
    setRegAvatar(url);
    setRegAnimalId(animalId);
    setRegAvatarType(type || (animalId ? 'animal' : 'custom'));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header with Close */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 text-emerald-300 hover:text-white p-1 rounded-full hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-extrabold text-white">
                {authModalMode === 'login' ? 'Iniciar Sesión' : 'Únete a Solviplas'}
              </h3>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                {authModalMode === 'login'
                  ? 'Accede a tu perfil ecológico, comentarios e interacciones'
                  : 'Crea tu perfil con un avatar de animalito o sube tu propia foto'}
              </p>
            </div>
          </div>

          {/* Mode switch tabs */}
          <div className="flex rounded-xl bg-emerald-950/80 p-1 border border-emerald-700/60 mt-3.5">
            <button
              onClick={() => { setAuthModalMode('login'); setLoginError(''); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                authModalMode === 'login' ? 'bg-emerald-500 text-emerald-950 shadow' : 'text-emerald-200 hover:text-white'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => { setAuthModalMode('register'); setLoginError(''); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                authModalMode === 'register' ? 'bg-emerald-500 text-emerald-950 shadow' : 'text-emerald-200 hover:text-white'
              }`}
            >
              Crear Cuenta & Avatar
            </button>
          </div>
        </div>

        {/* Content Body - Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {/* LOGIN FORM */}
          {authModalMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Correo Electrónico o Usuario
                </label>
                <input
                  type="text"
                  required
                  placeholder="ejemplo@correo.com o tu usuario"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  placeholder="Ingresa tu contraseña"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="open-profile-opt"
                  checked={openProfileAfterLogin}
                  onChange={(e) => setOpenProfileAfterLogin(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="open-profile-opt" className="text-xs text-slate-600 cursor-pointer select-none">
                  Abrir personalizador de perfil y avatar tras ingresar
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verificando credenciales...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Ingresar a mi Cuenta</span>
                  </>
                )}
              </button>

              <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex items-center justify-between text-xs text-emerald-800">
                <span>¿Deseas elegir un avatar de animalito o subir tu foto?</span>
                <button
                  type="button"
                  onClick={() => setAuthModalMode('register')}
                  className="font-bold underline text-emerald-700 hover:text-emerald-900 shrink-0 ml-2"
                >
                  Crear cuenta
                </button>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {authModalMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nombre Completo o Apodo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Ana Belén"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tu@correo.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Crea una contraseña"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800"
                  />
                </div>
              </div>

              {/* Eco Title Choice */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tu Eco-Título en la Comunidad
                </label>
                <select
                  value={regEcoTitle}
                  onChange={(e) => setRegEcoTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-xs text-slate-800 bg-white"
                >
                  {ECO_TITLES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Avatar Picker Component: Animal Avatars & Gallery Upload */}
              <div className="pt-1">
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Elige tu Avatar o Sube tu Foto de Galería
                </label>
                <AvatarPicker
                  currentAvatar={regAvatar}
                  selectedAnimalId={regAnimalId}
                  onSelectAvatar={handleAvatarSelected}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 mt-3 disabled:opacity-50 active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Guardando tu perfil...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Registrarme con mi Avatar</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setAuthModalMode('login')}
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold"
                >
                  ¿Ya tienes cuenta registrada? Inicia sesión aquí
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
