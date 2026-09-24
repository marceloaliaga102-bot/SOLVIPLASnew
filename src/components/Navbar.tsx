import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Leaf,
  LogIn,
  LogOut,
  Menu,
  X,
  Sparkles,
  User as UserIcon,
  Palette,
  Edit3,
  FlaskConical,
  Package,
  BarChart3,
  Newspaper,
  Users,
  MessageSquare,
} from 'lucide-react';
import { EditableText } from './CanvaEditor/EditableText';
import { BrandLogoIcon } from './CanvaEditor/LogoEditorModal';
import { LiquidSectionBar } from './LiquidSectionBar';

export const Navbar: React.FC = () => {
  const {
    siteConfig,
    updateSiteConfig,
    customSections,
    currentUser,
    isAdmin,
    logout,
    setIsAuthModalOpen,
    setAuthModalMode,
    setIsProfileModalOpen,
    currentWindow,
    setCurrentWindow,
    isLiveEditEnabled,
    toggleEditMode,
    setIsLogoModalOpen,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modular windows / separate pages
  const baseWindows = [
    { id: 'inicio', label: 'Inicio', icon: Leaf },
    { id: 'tutorial', label: 'Tutorial & Fórmula', icon: FlaskConical },
    { id: 'productos', label: 'Productos', icon: Package },
    { id: 'resultados', label: 'Resultados', icon: BarChart3 },
    { id: 'noticias', label: 'Noticias & Novedades', icon: Newspaper },
    { id: 'equipo', label: 'Equipo & Metas', icon: Users },
    { id: 'comunidad', label: 'Comunidad & Foro', icon: MessageSquare },
  ];

  const allSections = [
    ...baseWindows,
    ...customSections.map((sec) => ({
      id: sec.id,
      label: sec.title.length > 18 ? sec.title.slice(0, 18) + '...' : sec.title,
      icon: Sparkles,
    })),
  ];

  const handleSelectWindow = (id: string) => {
    setIsMobileMenuOpen(false);
    setCurrentWindow(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-emerald-950/95 text-white backdrop-blur-md border-b border-emerald-800/60 shadow-lg transition-all animate-nav-slide-down">
      {/* Top Header Row: Logo, Search, User Auth */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Container */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2.5 sm:gap-3 group text-left">
              <button
                type="button"
                onClick={() => {
                  if (isAdmin && isLiveEditEnabled) {
                    setIsLogoModalOpen(true);
                  } else {
                    handleSelectWindow('inicio');
                  }
                }}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-300/30 group-hover:scale-105 transition-transform shrink-0 overflow-hidden relative ${
                  isAdmin && isLiveEditEnabled ? 'cursor-pointer ring-amber-300 ring-2' : ''
                }`}
                title={isAdmin && isLiveEditEnabled ? 'Haz clic para personalizar logotipo e icono' : 'Ir al Inicio'}
              >
                <BrandLogoIcon
                  iconName={siteConfig.logoIcon}
                  logoUrl={siteConfig.logoUrl}
                  className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-950 fill-emerald-950"
                />
                {isAdmin && isLiveEditEnabled && (
                  <span className="absolute inset-0 bg-emerald-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Palette className="w-4 h-4 text-emerald-200" />
                  </span>
                )}
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <EditableText
                    value={siteConfig.siteName}
                    onSave={(val) => updateSiteConfig({ siteName: val })}
                    tagName="span"
                    className="font-black text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-emerald-200 via-teal-100 to-emerald-400 bg-clip-text text-transparent"
                  />
                  <EditableText
                    value={siteConfig.logoBadge || 'Bioplásticos'}
                    onSave={(val) => updateSiteConfig({ logoBadge: val })}
                    tagName="span"
                    className="hidden sm:inline text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-emerald-800/80 text-emerald-200 border border-emerald-600/40"
                  />
                </div>
                <EditableText
                  value={siteConfig.logoSubtitle || 'Química Verde & Hidrosolubilidad'}
                  onSave={(val) => updateSiteConfig({ logoSubtitle: val })}
                  tagName="p"
                  className="text-[11px] sm:text-xs text-emerald-300/80 font-medium line-clamp-1"
                />
              </div>
            </div>

            {/* Quick Logo Customizer button strictly for Admin when editing is enabled */}
            {isAdmin && isLiveEditEnabled && (
              <button
                type="button"
                onClick={() => setIsLogoModalOpen(true)}
                className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-xl bg-emerald-900/70 hover:bg-emerald-800 text-emerald-300 border border-emerald-700/60 text-[10px] font-bold shadow-sm transition-all hover:scale-105"
                title="Personalizar Logotipo, Iconos e Identidad"
              >
                <Palette className="w-3 h-3 text-emerald-400" />
                <span>Logo</span>
              </button>
            )}
          </div>

          {/* User Session Buttons & Edit Mode Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Toggle: Modo Edición / Vista Previa (Solo visible para cuenta Admin) */}
            {isAdmin && (
              <button
                type="button"
                onClick={toggleEditMode}
                className={`flex items-center gap-1.5 text-xs font-bold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border transition-all ${
                  isLiveEditEnabled
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/20 active:scale-95'
                    : 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border-emerald-700/60'
                }`}
                title={isLiveEditEnabled ? 'Cambiar a Modo Vista Previa' : 'Activar Modo Edición de Todo el Sitio'}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isLiveEditEnabled ? 'Editando' : 'Modo Edición'}</span>
                <span className="sm:hidden">{isLiveEditEnabled ? 'Editando' : 'Editar'}</span>
              </button>
            )}

            {currentUser ? (
              <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-emerald-800/80">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(true)}
                  className="flex items-center gap-2 group p-1 rounded-2xl hover:bg-emerald-900/60 transition-all text-left"
                  title="Personalizar mi perfil y avatar"
                >
                  <div className="relative">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.6)] group-hover:ring-teal-200 transition-all bg-white"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-teal-300 text-slate-950 flex items-center justify-center text-[9px] font-black ring-1 ring-emerald-950 shadow-xs">
                      <UserIcon className="w-2.5 h-2.5 text-slate-950 stroke-[3]" />
                    </span>
                  </div>
                  <div className="text-left hidden md:block max-w-[130px]">
                    <p className="text-xs font-bold truncate leading-tight text-white group-hover:text-emerald-300 transition-colors">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-emerald-300/80 truncate">
                      {currentUser.ecoTitle || (currentUser.role === 'admin' ? 'Administrador' : currentUser.institution || 'Mi Perfil')}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(true)}
                  className="hidden lg:flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 hover:text-white border border-emerald-500/40 shadow-xs transition-all"
                  title="Personalizar datos, fotos y temas"
                >
                  <UserIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Perfil</span>
                </button>

                <button
                  type="button"
                  onClick={logout}
                  className="p-1.5 sm:p-2 text-emerald-300 hover:text-rose-300 hover:bg-rose-950/40 rounded-xl transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Ingresar</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalMode('register');
                    setIsAuthModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 text-xs font-black px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 hover:from-emerald-200 hover:to-cyan-200 text-slate-950 shadow-[0_2px_14px_rgba(52,211,153,0.5),inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(13,148,136,0.3)] ring-1 ring-emerald-200/90 transition-all active:scale-95 cursor-pointer relative overflow-hidden group"
                >
                  <span className="absolute top-0 inset-x-2 h-[40%] rounded-full bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />
                  <Sparkles className="w-3.5 h-3.5 text-slate-950 stroke-[2.6] relative z-10" />
                  <span className="relative z-10">Crear Cuenta</span>
                </button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <div className="flex md:hidden items-center ml-1">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-800/60 rounded-xl transition-colors"
                aria-label="Abrir menú"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* LIQUID SECTION BAR WITH FLUID ANIMATIONS & SPRING PHYSICS */}
      {/* Optimized GPU transitions, momentum scrolling, and rippling */}
      {/* ========================================================= */}
      <LiquidSectionBar
        sections={allSections}
        activeId={currentWindow}
        onSelectSection={handleSelectWindow}
      />

      {/* Mobile Drawer Dropdown if opened */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-emerald-800/80 bg-emerald-950/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 animate-fadeIn max-h-[75vh] overflow-y-auto">
          {currentUser && (
            <div className="p-3 rounded-2xl bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-400 bg-white"
                />
                <div>
                  <p className="text-xs font-black text-white">{currentUser.name}</p>
                  <p className="text-[10px] text-emerald-300">{currentUser.ecoTitle || 'Miembro Solviplas'}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsProfileModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 text-xs font-black shadow-sm"
              >
                Editar Perfil
              </button>
            </div>
          )}

          {/* Quick Admin Tools on Mobile (Solo para administrador) */}
          {isAdmin && (
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-emerald-800/60">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  toggleEditMode();
                }}
                className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl text-xs font-bold border transition-colors ${
                  isLiveEditEnabled
                    ? 'bg-amber-400 text-slate-950 border-amber-300'
                    : 'bg-emerald-900/60 text-emerald-200 border-emerald-700/60'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isLiveEditEnabled ? 'Edición Activa' : 'Modo Edición'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLogoModalOpen(true);
                }}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl text-xs font-bold bg-emerald-900/60 text-emerald-200 border border-emerald-700/60 hover:bg-emerald-800"
              >
                <Palette className="w-3.5 h-3.5 text-emerald-400" />
                <span>Editar Logo</span>
              </button>
            </div>
          )}

          <p className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-400 mb-2">
            Ventanas de Solviplas:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {allSections.map((sec) => {
              const Icon = sec.icon;
              const isActive = currentWindow === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleSelectWindow(sec.id)}
                  className={`relative flex items-center gap-2 p-2.5 rounded-2xl text-left text-xs font-bold transition-all overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-emerald-950 font-black shadow-lg shadow-emerald-500/25 ring-1 ring-white/60'
                      : 'bg-emerald-900/40 text-emerald-200 hover:bg-emerald-800/60 border border-emerald-700/40'
                  }`}
                >
                  {isActive && (
                    <span className="absolute top-0.5 inset-x-2 h-[40%] rounded-full bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
                  )}
                  <Icon className={`w-3.5 h-3.5 shrink-0 relative z-10 ${isActive ? 'text-emerald-950 stroke-[2.5]' : 'text-emerald-400'}`} />
                  <span className="truncate relative z-10">{sec.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
