import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Star, Heart, Pin, Send, CornerDownRight, Trash2, ChevronDown, ChevronUp, User as UserIcon, UserPlus, LogIn, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EditableText } from './CanvaEditor/EditableText';
import { UserProfileModal, ProfileModalData } from './UserProfileModal';
import { LiquidLineDivider } from './LiquidLineDivider';

export const CommentsSection: React.FC = () => {
  const {
    siteConfig,
    updateSiteConfig,
    currentUser,
    isAdmin,
    comments,
    addComment,
    toggleLikeComment,
    deleteComment,
    pinComment,
    replyComment,
    setIsAuthModalOpen,
    setAuthModalMode,
    setIsProfileModalOpen,
    showToast,
  } = useApp();

  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'opinion' | 'pregunta' | 'felicitacion' | 'idea'>('opinion');
  const [newRating, setNewRating] = useState(5);
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('todos');

  // Modal para ver perfiles de usuarios que comentan
  const [viewingProfile, setViewingProfile] = useState<ProfileModalData | null>(null);
  const [isViewProfileModalOpen, setIsViewProfileModalOpen] = useState(false);

  const handleOpenUserProfile = (name: string, avatar: string, role?: string, userId?: string) => {
    const matchedUser = (currentUser && (currentUser.id === userId || currentUser.name === name))
      ? currentUser
      : undefined;

    const userComments = comments.filter(c => c.userName === name || c.userId === userId);

    setViewingProfile({
      user: matchedUser,
      name,
      avatar,
      role,
      userComments,
    });
    setIsViewProfileModalOpen(true);
  };

  // Bandejas de comentarios y respuestas
  const [openRepliesBandejas, setOpenRepliesBandejas] = useState<Record<string, boolean>>({});
  const [isAllCommentsExpanded, setIsAllCommentsExpanded] = useState(false);

  const toggleRepliesBandeja = (commentId: string) => {
    setOpenRepliesBandejas(prev => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  if (!siteConfig.sections.comments?.enabled) return null;

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      showToast('Para comentar en Solviplas, debes crearte una cuenta o iniciar sesión.', 'info');
      setAuthModalMode('register');
      setIsAuthModalOpen(true);
      return;
    }
    if (!newContent.trim()) return;

    const ok = addComment(newContent, newCategory, newRating);
    if (ok) {
      setNewContent('');
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#10b981', '#14b8a6', '#059669', '#34d399'],
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleSendReply = (commentId: string) => {
    if (!currentUser) {
      showToast('Para responder comentarios, debes crearte una cuenta o iniciar sesión.', 'info');
      setAuthModalMode('register');
      setIsAuthModalOpen(true);
      return;
    }
    if (!replyText.trim()) return;
    replyComment(commentId, replyText, currentUser.name, currentUser.avatar, isAdmin);
    setReplyingCommentId(null);
    setReplyText('');
    // Auto-abrir la bandeja de respuestas para que el usuario vea su respuesta publicada
    setOpenRepliesBandejas(prev => ({ ...prev, [commentId]: true }));
  };

  const filteredComments = filterCategory === 'todos'
    ? comments
    : comments.filter(c => c.category === filterCategory);

  const COMMENTS_PER_PAGE = 5;
  const visibleComments = isAllCommentsExpanded ? filteredComments : filteredComments.slice(0, COMMENTS_PER_PAGE);
  const hiddenCommentsCount = Math.max(0, filteredComments.length - COMMENTS_PER_PAGE);

  return (
    <section id="comments" className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-emerald-950/70 to-slate-950 text-white relative overflow-hidden border-b border-emerald-500/20 select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-wider mb-4 shadow-[0_0_14px_rgba(52,211,153,0.3)] backdrop-blur-md">
            <MessageSquare className="w-3.5 h-3.5 text-teal-300" />
            <span>Comunidad & Participación</span>
          </div>
          <EditableText
            value={siteConfig.commentsTitle || 'Comentarios y Preguntas de la Comunidad'}
            onSave={(val) => updateSiteConfig({ commentsTitle: val })}
            tagName="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight block"
          />
          <EditableText
            value={siteConfig.commentsSubtitle || 'Miembros de la comunidad, entusiastas del medio ambiente y participantes comparten sus dudas, ideas y experiencias con Solviplas.'}
            onSave={(val) => updateSiteConfig({ commentsSubtitle: val })}
            tagName="p"
            multiline
            className="mt-3 text-sm sm:text-base text-emerald-100/80 block leading-relaxed"
          />
        </div>

        {/* Create Comment Form / Auth Prompt - Registration Required */}
        {currentUser ? (
          <div className="mb-14 p-6 sm:p-8 rounded-3xl liquid-glass-card shadow-xl relative overflow-hidden">
            <span className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-emerald-900/60">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsProfileModalOpen(true)}
                    className="relative group shrink-0 cursor-pointer"
                    title="Cambiar avatar o personalizar perfil"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-400 group-hover:ring-emerald-300 transition-all bg-slate-900"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-slate-900 rounded-full p-0.5 shadow-sm border border-emerald-500/50">
                      <UserIcon className="w-2.5 h-2.5 text-emerald-400" />
                    </span>
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-black text-white leading-tight">{currentUser.name}</p>
                      <button
                        type="button"
                        onClick={() => setIsProfileModalOpen(true)}
                        className="text-[11px] text-teal-300 hover:text-teal-200 font-bold underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Personalizar perfil</span>
                      </button>
                    </div>
                    <p className="text-xs text-emerald-300/80 font-medium">
                      {currentUser.ecoTitle || (currentUser.role === 'admin' ? 'Equipo Solviplas (Admin)' : (currentUser.institution || 'Comunidad'))}
                    </p>
                  </div>
                </div>

                {/* Rating Selector */}
                <div className="flex items-center gap-1.5 ml-auto">
                  <span className="text-xs text-emerald-200/80 font-medium">Calificación:</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-4 h-4 ${star <= newRating ? 'fill-amber-400' : 'text-slate-700'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category selector */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-emerald-200/80 font-semibold">Tipo de mensaje:</span>
                {[
                  { id: 'opinion', label: 'Opinión' },
                  { id: 'pregunta', label: 'Pregunta' },
                  { id: 'felicitacion', label: 'Felicitación' },
                  { id: 'idea', label: 'Sugerencia' },
                ].map(cat => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setNewCategory(cat.id as any)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      newCategory === cat.id
                        ? 'bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 text-slate-950 font-black shadow-[0_2px_14px_rgba(52,211,153,0.5)] ring-1 ring-emerald-200/90'
                        : 'bg-emerald-950/60 text-emerald-200/80 hover:text-white hover:bg-emerald-900/60 border border-emerald-800/40'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <textarea
                rows={3}
                required
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Escribe tu mensaje, duda o recomendación aquí (se publicará y guardará en la nube en tiempo real)..."
                className="w-full p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/30 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400 outline-none text-sm text-white transition-all placeholder:text-emerald-300/40 font-normal"
              />

              <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                <span className="text-[11px] text-emerald-300 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Sincronización en la nube activa: tu comentario será visible para todos al instante
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-md shadow-emerald-600/30 flex items-center gap-2 transition-all active:scale-95 ml-auto cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Publicar Comentario</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="mb-14 p-6 sm:p-8 rounded-3xl liquid-glass-card text-white border border-emerald-500/30 shadow-xl relative overflow-hidden">
            <span className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl space-y-2 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-black border border-emerald-500/40">
                  <UserPlus className="w-3.5 h-3.5 text-teal-300" />
                  <span>Cuenta requerida para comentar</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Para comentar debes crearte una cuenta
                </h3>
                <p className="text-sm text-emerald-100/80 leading-relaxed font-normal">
                  Únete a la comunidad de Solviplas de forma rápida y gratuita. Podrás elegir tu avatar ecológico personalizado, formular dudas o preguntas técnicas sobre bioplásticos hidrosolubles y recibir respuestas directas del equipo.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-emerald-200/80 font-medium">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Registro 100% gratuito</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <UserIcon className="w-4 h-4 text-emerald-400" />
                    <span>16 avatares ecológicos o foto propia</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Respuestas en tiempo real</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 sm:w-auto md:w-56">
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalMode('register');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-5 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all active:scale-95 text-center cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 stroke-[2.5]" />
                  <span>Crear una Cuenta</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-full bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 hover:text-white font-bold text-xs sm:text-sm border border-emerald-500/40 flex items-center justify-center gap-2 transition-all active:scale-95 text-center cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Iniciar Sesión</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Liquid Horizontal Connector Line */}
        <LiquidLineDivider badge="Comunidad & Foro" label="Conversaciones y Debates" className="my-8" />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'opinion', label: 'Opiniones' },
              { id: 'pregunta', label: 'Preguntas' },
              { id: 'felicitacion', label: 'Felicitaciones' },
              { id: 'idea', label: 'Sugerencias' },
            ].map(cat => {
              const isActive = filterCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 text-slate-950 shadow-[0_2px_14px_rgba(52,211,153,0.5),inset_0_1px_1px_rgba(255,255,255,0.9)] ring-1 ring-emerald-200/90'
                      : 'bg-emerald-950/60 text-emerald-200/80 hover:text-white hover:bg-emerald-900/60 border border-emerald-800/40'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <span className="text-xs text-emerald-300/80 font-bold">
            {filteredComments.length} {filteredComments.length === 1 ? 'comentario' : 'comentarios'}
          </span>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {visibleComments.map((comment) => {
            const hasReplies = (comment.replies && comment.replies.length > 0) || Boolean(comment.adminReply);
            const repliesCount = (comment.replies?.length || 0) + (comment.adminReply && (!comment.replies || comment.replies.length === 0) ? 1 : 0);
            const isRepliesBandejaOpen = Boolean(openRepliesBandejas[comment.id]);

            return (
              <div
                key={comment.id}
                className={`p-5 sm:p-6 rounded-3xl liquid-glass-card transition-all relative overflow-hidden hover:-translate-y-0.5 duration-300 ${
                  comment.isPinned
                    ? 'border-emerald-400 ring-2 ring-emerald-400/40'
                    : ''
                }`}
              >
                <span className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleOpenUserProfile(comment.userName, comment.userAvatar, comment.userRole, comment.userId)}
                    className="flex items-center gap-3 text-left group cursor-pointer hover:opacity-90 transition-opacity"
                    title={`Ver perfil de ${comment.userName}`}
                  >
                    <img
                      src={comment.userAvatar}
                      alt={comment.userName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-400 group-hover:ring-emerald-300 group-hover:scale-105 transition-all bg-slate-900"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                          {comment.userName}
                        </span>
                        {comment.isPinned && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-400/50 text-[10px] font-black">
                            <Pin className="w-2.5 h-2.5 fill-emerald-300" /> Fijado
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-emerald-300/70 block">
                        {comment.userRole} • {comment.createdAt.split('T')[0]} • <span className="text-teal-300 font-semibold underline">Ver perfil</span>
                      </span>
                    </div>
                  </button>

                  {/* Rating and Category Badge */}
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold capitalize">
                      {comment.category}
                    </span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= comment.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comment text */}
                <p className="mt-3 text-sm text-emerald-100/90 leading-relaxed font-normal">
                  {comment.content}
                </p>

                {/* Actions Footer */}
                <div className="mt-4 pt-3 border-t border-emerald-900/60 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <button
                      onClick={() => toggleLikeComment(comment.id)}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                        currentUser && comment.likedBy.includes(currentUser.id)
                          ? 'text-rose-400 bg-rose-950/60 border border-rose-500/40 shadow-xs'
                          : 'text-emerald-300/80 hover:text-rose-400 hover:bg-rose-950/30'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          currentUser && comment.likedBy.includes(currentUser.id)
                            ? 'fill-rose-400'
                            : ''
                        }`}
                      />
                      <span>{comment.likes}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (!currentUser) {
                          showToast('Para responder comentarios debes crearte una cuenta o iniciar sesión.', 'info');
                          setAuthModalMode('register');
                          setIsAuthModalOpen(true);
                          return;
                        }
                        if (replyingCommentId === comment.id) {
                          setReplyingCommentId(null);
                        } else {
                          setReplyingCommentId(comment.id);
                          setReplyText('');
                        }
                      }}
                      className="text-xs text-teal-300 hover:text-teal-200 font-bold flex items-center gap-1 px-2.5 py-1 rounded-full hover:bg-emerald-900/50 transition-colors cursor-pointer"
                    >
                      <CornerDownRight className="w-3.5 h-3.5" />
                      <span>{isAdmin ? 'Responder oficialmente' : 'Responder'}</span>
                    </button>

                    {/* Bandeja toggle button para respuestas si tiene comentarios hijos */}
                    {hasReplies && (
                      <button
                        type="button"
                        onClick={() => toggleRepliesBandeja(comment.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-200 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 transition-all cursor-pointer"
                        title={isRepliesBandejaOpen ? 'Ocultar bandeja de respuestas' : 'Ver respuestas a este comentario'}
                      >
                        <MessageSquare className="w-3 h-3 text-teal-300" />
                        <span>
                          {isRepliesBandejaOpen
                            ? `Ocultar respuestas (${repliesCount}) ▲`
                            : `Bandeja de respuestas (${repliesCount}) ▼`}
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Admin controls */}
                  {isAdmin && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => pinComment(comment.id)}
                        className={`p-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                          comment.isPinned
                            ? 'text-emerald-300 bg-emerald-900/80 border border-emerald-400/40'
                            : 'text-emerald-400/60 hover:text-emerald-300'
                        }`}
                        title="Fijar comentario al inicio"
                      >
                        <Pin className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteComment(comment.id)}
                        className="p-1.5 rounded-lg text-emerald-400/60 hover:text-rose-400 cursor-pointer"
                        title="Eliminar comentario"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Bandeja Desplegable de Respuestas */}
                {hasReplies && isRepliesBandejaOpen && (
                  <div className="mt-4 pl-3 sm:pl-5 border-l-2 border-emerald-400/60 space-y-3 pt-2">
                    {/* Legacy or official direct adminReply if no replies array yet */}
                    {comment.adminReply && (!comment.replies || comment.replies.length === 0) && (
                      <div className="p-3.5 rounded-2xl liquid-glass-card border border-emerald-500/40 text-xs text-white space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                          <CornerDownRight className="w-3.5 h-3.5 text-teal-300" />
                          <span>Respuesta del Equipo Solviplas:</span>
                        </div>
                        <p className="text-emerald-100 pl-5 font-normal">{comment.adminReply}</p>
                      </div>
                    )}

                    {/* List of modern replies with avatar and role */}
                    {comment.replies && comment.replies.map((rep) => (
                      <div
                        key={rep.id}
                        className={`p-3.5 rounded-2xl text-xs space-y-1.5 transition-all liquid-glass-card ${
                          rep.isOfficial
                            ? 'border border-emerald-400/50 shadow-md'
                            : 'border border-emerald-500/20'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenUserProfile(rep.authorName, rep.authorAvatar, rep.authorRole)}
                            className="flex items-center gap-2 group cursor-pointer text-left hover:opacity-90 transition-opacity"
                            title={`Ver perfil de ${rep.authorName}`}
                          >
                            <img
                              src={rep.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'}
                              alt={rep.authorName}
                              className="w-6 h-6 rounded-full object-cover ring-1 ring-emerald-400 group-hover:ring-emerald-300 group-hover:scale-105 transition-all bg-slate-900"
                            />
                            <span className="font-bold text-white group-hover:text-emerald-300 transition-colors">{rep.authorName}</span>
                            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                              rep.isOfficial
                                ? 'bg-emerald-400 text-slate-950'
                                : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                            }`}>
                              {rep.authorRole}
                            </span>
                          </button>
                          <span className="text-[10px] text-emerald-300/60">
                            {rep.createdAt ? rep.createdAt.split('T')[0] : 'Hoy'}
                          </span>
                        </div>
                        <p className="text-emerald-100/90 pl-8 font-normal leading-relaxed">
                          {rep.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Enhanced Inline Reply Form with 100% visible high-contrast text */}
                {replyingCommentId === comment.id && (
                  <div className="mt-4 pt-3 border-t-2 border-emerald-500/30 liquid-glass-card p-4 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <CornerDownRight className="w-3.5 h-3.5 text-teal-300" />
                        <span>{isAdmin ? 'Escribir respuesta oficial de Solviplas:' : `Respondiendo a ${comment.userName}:`}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setReplyingCommentId(null)}
                        className="text-xs text-emerald-300/70 hover:text-white font-semibold cursor-pointer"
                      >
                        Cerrar
                      </button>
                    </div>

                    {!currentUser ? (
                      <div className="p-4 liquid-glass-card rounded-xl border border-emerald-500/40 text-center space-y-3">
                        <p className="text-xs sm:text-sm text-emerald-100 font-semibold">
                          Debes crearte una cuenta para poder responder comentarios.
                        </p>
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setAuthModalMode('register');
                              setIsAuthModalOpen(true);
                            }}
                            className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
                          >
                            <UserPlus className="w-3.5 h-3.5" />
                            <span>Crear Cuenta</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setAuthModalMode('login');
                              setIsAuthModalOpen(true);
                            }}
                            className="px-4 py-2 rounded-full bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 font-bold text-xs border border-emerald-500/40 flex items-center gap-1.5 cursor-pointer"
                          >
                            <LogIn className="w-3.5 h-3.5" />
                            <span>Iniciar Sesión</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="w-6 h-6 rounded-full object-cover ring-1 ring-emerald-400 bg-slate-900"
                          />
                          <span className="text-xs font-bold text-white">{currentUser.name}</span>
                          <span className="text-[10px] text-teal-300 font-medium">({currentUser.ecoTitle || currentUser.role})</span>
                        </div>

                        {/* Reply text area with dark high-contrast font */}
                        <div className="space-y-1">
                          <textarea
                            rows={2}
                            autoFocus
                            placeholder="Escribe tu respuesta aquí..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="w-full p-3 text-sm font-normal text-white bg-emerald-950/80 border border-emerald-500/40 rounded-xl focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400 outline-none placeholder:text-emerald-300/40"
                          />
                          {replyText.length > 0 && (
                            <p className="text-[11px] text-emerald-300/60 text-right">
                              {replyText.length} caracteres
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setReplyingCommentId(null);
                              setReplyText('');
                            }}
                            className="px-3 py-1.5 rounded-full text-emerald-300/80 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                          >
                            Cancelar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSendReply(comment.id)}
                            disabled={!replyText.trim()}
                            className={`px-4 py-1.5 rounded-full font-black text-xs flex items-center gap-1.5 shadow transition-all ${
                              replyText.trim()
                                ? 'bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 cursor-pointer active:scale-95'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            <Send className="w-3 h-3" />
                            <span>Publicar Respuesta</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bandeja para ver más comentarios si hay más de 5 */}
        {filteredComments.length > 5 && (
          <div className="pt-6 pb-2 flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={() => setIsAllCommentsExpanded(!isAllCommentsExpanded)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 hover:from-emerald-300 hover:to-cyan-200 text-slate-950 font-black text-sm shadow-[0_4px_20px_rgba(52,211,153,0.35)] transition-all active:scale-95 cursor-pointer ring-1 ring-emerald-200/90"
            >
              <MessageSquare className="w-4 h-4 text-slate-950" />
              {isAllCommentsExpanded ? (
                <>
                  <span>Ocultar bandeja de comentarios adicionales</span>
                  <span className="text-xs bg-slate-950/80 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold">▲ Mostrar solo 5</span>
                </>
              ) : (
                <>
                  <span>Abrir bandeja para ver más comentarios</span>
                  <span className="text-xs bg-slate-950/80 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold shadow-xs">
                    ▼ {hiddenCommentsCount} adicionales
                  </span>
                </>
              )}
            </button>
            <p className="mt-2 text-xs text-emerald-300/70 font-medium">
              {isAllCommentsExpanded
                ? `Mostrando todos los ${filteredComments.length} comentarios de la comunidad.`
                : `Mostrando 5 de ${filteredComments.length} comentarios para mantener la página fluida y optimizada.`}
            </p>
          </div>
        )}

      </div>

      {/* Modal para inspeccionar perfil del autor del comentario */}
      <UserProfileModal
        isOpen={isViewProfileModalOpen}
        onClose={() => setIsViewProfileModalOpen(false)}
        profile={viewingProfile}
      />
    </section>
  );
};
