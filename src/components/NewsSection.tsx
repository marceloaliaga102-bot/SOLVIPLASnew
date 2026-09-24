import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Newspaper,
  Calendar,
  Clock,
  User as UserIcon,
  Tag,
  Plus,
  Edit2,
  Trash2,
  Search,
  ArrowRight,
  X,
  Sparkles,
  BookOpen,
  Share2,
  CheckCircle2,
  ChevronRight,
  Star,
} from 'lucide-react';
import { NewsArticle } from '../types';
import { EditableText } from './CanvaEditor/EditableText';
import { LiquidLineDivider } from './LiquidLineDivider';

export const NewsSection: React.FC = () => {
  const {
    isAdmin,
    newsArticles,
    addNewsArticle,
    updateNewsArticle,
    deleteNewsArticle,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  // Modals
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  // Form State for creating/editing news
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Innovación');
  const [formSummary, setFormSummary] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formAuthorRole, setFormAuthorRole] = useState('');
  const [formReadTime, setFormReadTime] = useState('3 min de lectura');
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formTags, setFormTags] = useState('Biopolímeros, Química Verde');

  const categories = ['todos', 'Innovación', 'Talleres', 'Prototipos', 'Ciencia'];

  const filteredArticles = newsArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'todos' ||
      article.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.tags && article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  const featuredArticle = newsArticles.find(a => a.isFeatured) || newsArticles[0];

  const handleOpenCreateModal = () => {
    setEditingArticleId(null);
    setFormTitle('');
    setFormCategory('Innovación');
    setFormSummary('');
    setFormContent('');
    setFormImageUrl('https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80');
    setFormAuthor('Equipo Solviplas');
    setFormAuthorRole('I+D Sostenibilidad');
    setFormReadTime('3 min de lectura');
    setFormIsFeatured(false);
    setFormTags('Innovación, Bioplásticos, Química Verde');
    setIsEditorModalOpen(true);
  };

  const handleOpenEditModal = (article: NewsArticle) => {
    setEditingArticleId(article.id);
    setFormTitle(article.title);
    setFormCategory(article.category);
    setFormSummary(article.summary);
    setFormContent(article.content);
    setFormImageUrl(article.imageUrl || '');
    setFormAuthor(article.author);
    setFormAuthorRole(article.authorRole || '');
    setFormReadTime(article.readTime || '3 min de lectura');
    setFormIsFeatured(Boolean(article.isFeatured));
    setFormTags(article.tags ? article.tags.join(', ') : '');
    setIsEditorModalOpen(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) {
      showToast('Por favor completa el título y el contenido de la noticia.', 'warning');
      return;
    }

    const tagsArray = formTags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const articleData: Partial<NewsArticle> = {
      title: formTitle.trim(),
      category: formCategory,
      summary: formSummary.trim(),
      content: formContent.trim(),
      imageUrl: formImageUrl.trim() || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
      author: formAuthor.trim() || 'Equipo Solviplas',
      authorRole: formAuthorRole.trim() || 'I+D Sostenibilidad',
      readTime: formReadTime.trim() || '3 min de lectura',
      isFeatured: formIsFeatured,
      tags: tagsArray,
      date: new Date().toISOString().split('T')[0],
    };

    if (editingArticleId) {
      updateNewsArticle(editingArticleId, articleData);
    } else {
      addNewsArticle(articleData);
    }

    setIsEditorModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`¿Estás seguro de eliminar la noticia "${title}"?`)) {
      deleteNewsArticle(id);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-slate-950 via-emerald-950/70 to-slate-950 text-white relative overflow-hidden border-b border-emerald-500/20 select-none">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-emerald-900/60">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-400/40 text-xs font-black uppercase tracking-wider mb-3 shadow-[0_0_12px_rgba(52,211,153,0.3)]">
              <Newspaper className="w-4 h-4 text-teal-300" />
              <span>Novedades & Avances</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Noticias e Implementaciones
            </h2>
            <p className="mt-3 text-base text-emerald-100/80 max-w-2xl leading-relaxed">
              Descubre en tiempo real los nuevos prototipos, formulaciones optimizadas, talleres con la comunidad y avances tecnológicos que estamos incorporando a Solviplas.
            </p>
          </div>

          {/* Admin Create Button */}
          {isAdmin && (
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-[0_0_16px_rgba(52,211,153,0.4)] active:scale-95 transition-all self-start md:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Publicar Nueva Noticia</span>
            </button>
          )}
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all capitalize cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 text-slate-950 font-black shadow-[0_2px_14px_rgba(52,211,153,0.5),inset_0_1px_1px_rgba(255,255,255,0.9)] ring-1 ring-emerald-200/90'
                      : 'bg-emerald-950/60 text-emerald-200/80 hover:text-white hover:bg-emerald-900/60 border border-emerald-800/40'
                  }`}
                >
                  {cat === 'todos' ? 'Todas las Noticias' : cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] sm:w-72">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar noticias o temas..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs sm:text-sm text-white placeholder-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-white text-xs font-bold"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Featured News Hero Card (if no search filter applied) */}
        {!searchQuery && selectedCategory === 'todos' && featuredArticle && (
          <div className="mb-10 rounded-3xl liquid-glass-card shadow-xl overflow-hidden hover:shadow-2xl transition-all group scroll-fade-item relative">
            <span className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-auto overflow-hidden">
                <img
                  src={featuredArticle.imageUrl || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80'}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-[11px] font-black uppercase tracking-wider shadow-md">
                    <Star className="w-3.5 h-3.5 text-amber-900 fill-amber-900" />
                    <span>Noticia Destacada</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-xs text-emerald-200 text-[11px] font-bold border border-emerald-500/30">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-emerald-300/80 mb-3">
                    <span className="flex items-center gap-1 font-semibold text-emerald-300">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      {featuredArticle.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-teal-300" />
                      {featuredArticle.readTime || '3 min'}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-snug group-hover:text-emerald-200 transition-colors">
                    {featuredArticle.title}
                  </h3>

                  <p className="mt-4 text-sm text-emerald-100/75 leading-relaxed line-clamp-3 sm:line-clamp-4">
                    {featuredArticle.summary}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-emerald-900/60 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center justify-center font-bold text-xs ring-1 ring-emerald-400">
                      <UserIcon className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">{featuredArticle.author}</p>
                      <p className="text-[10px] text-emerald-300/70">{featuredArticle.authorRole || 'Solviplas'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(featuredArticle)}
                        className="p-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-200 hover:text-white border border-emerald-700/50 transition-colors cursor-pointer"
                        title="Editar Noticia"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(featuredArticle)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <span>Leer Noticia</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Liquid Horizontal Connector Line */}
        <LiquidLineDivider badge="Noticias & Avances" label="Publicaciones Recientes" className="my-8" />

        {/* News Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 liquid-glass-card rounded-3xl p-8">
            <Newspaper className="w-12 h-12 text-emerald-400/50 mx-auto mb-3" />
            <p className="text-base font-bold text-white">No se encontraron noticias con estos filtros</p>
            <p className="text-xs text-emerald-200/60 mt-1">Intenta con otra palabra clave o categoría.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold text-xs hover:bg-emerald-900 transition-colors cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="liquid-glass-card rounded-3xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col group scroll-fade-item relative"
              >
                <span className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-10" />

                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img
                    src={article.imageUrl || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80'}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 backdrop-blur-xs text-emerald-200 text-[10px] font-black uppercase tracking-wider">
                      {article.category}
                    </span>
                    {article.isFeatured && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold shadow-sm">
                        <Star className="w-2.5 h-2.5 fill-slate-950 text-slate-950" />
                        <span>Destacada</span>
                      </span>
                    )}
                  </div>

                  {isAdmin && (
                    <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/80 p-1 rounded-full backdrop-blur-xs border border-emerald-800/40">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(article)}
                        className="p-1.5 text-white hover:text-emerald-300 transition-colors cursor-pointer"
                        title="Editar noticia"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(article.id, article.title)}
                        className="p-1.5 text-white hover:text-rose-300 transition-colors cursor-pointer"
                        title="Eliminar noticia"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-emerald-300/80 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-emerald-400" />
                        {article.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-teal-300" />
                        {article.readTime || '3 min'}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-white text-base sm:text-lg leading-snug group-hover:text-emerald-200 transition-colors line-clamp-2">
                      {article.title}
                    </h4>

                    <p className="mt-2 text-xs sm:text-sm text-emerald-100/75 leading-relaxed line-clamp-3 font-normal">
                      {article.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-emerald-900/60 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-300/80 truncate max-w-[140px]">
                      Por {article.author}
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedArticle(article)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-teal-200 transition-colors cursor-pointer"
                    >
                      <span>Leer más</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Article Detail Full Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto border border-emerald-100 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cover image header */}
            <div className="relative h-64 sm:h-72 w-full bg-slate-900 overflow-hidden">
              <img
                src={selectedArticle.imageUrl || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80'}
                alt={selectedArticle.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>
              
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-wider mb-2 inline-block">
                  {selectedArticle.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black leading-tight text-white">
                  {selectedArticle.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              {/* Meta bar */}
              <div className="flex items-center justify-between flex-wrap gap-3 pb-4 mb-6 border-b border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    <UserIcon className="w-4 h-4 text-emerald-800" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{selectedArticle.author}</p>
                    <p className="text-[11px] text-slate-400">{selectedArticle.authorRole}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    {selectedArticle.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    {selectedArticle.readTime || '3 min'}
                  </span>
                </div>
              </div>

              {/* Summary lead callout */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-sm font-semibold text-emerald-950 leading-relaxed mb-6">
                {selectedArticle.summary}
              </div>

              {/* Full Article Content */}
              <div className="text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line font-normal">
                {selectedArticle.content}
              </div>

              {/* Tags */}
              {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                    <Tag className="w-3 h-3 text-emerald-600" /> Etiquetas:
                  </span>
                  {selectedArticle.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="mt-8 flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Iniciativa Oficial Solviplas
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin News Editor Modal */}
      {isEditorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div 
            className="relative w-full max-w-xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto border border-emerald-100 animate-scaleUp p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-black text-slate-900">
                  {editingArticleId ? 'Editar Noticia' : 'Publicar Nueva Noticia'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditorModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título de la Noticia *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Ej. Nueva prueba de biodegradabilidad en agua salada..."
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none font-semibold text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Categoría</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none font-semibold text-slate-800"
                  >
                    <option value="Innovación">Innovación</option>
                    <option value="Talleres">Talleres</option>
                    <option value="Prototipos">Prototipos</option>
                    <option value="Ciencia">Ciencia</option>
                    <option value="Comunidad">Comunidad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tiempo de Lectura</label>
                  <input
                    type="text"
                    value={formReadTime}
                    onChange={(e) => setFormReadTime(e.target.value)}
                    placeholder="Ej. 3 min de lectura"
                    className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none font-semibold text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Resumen Breve *</label>
                <textarea
                  rows={2}
                  required
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Resumen atractivo que aparecerá en la tarjeta principal..."
                  className="w-full text-xs px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contenido Completo de la Noticia *</label>
                <textarea
                  rows={6}
                  required
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Escribe los detalles completos, hallazgos, fotos, pasos o novedades implementadas..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL de la Imagen</label>
                <input
                  type="text"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full text-xs px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800"
                />
                <div className="flex gap-2 mt-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-400">Imágenes rápidas:</span>
                  {[
                    { label: 'Laboratorio', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80' },
                    { label: 'Taller Escolar', url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80' },
                    { label: 'Prototipos', url: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=800&auto=format&fit=crop&q=80' },
                    { label: 'Sostenibilidad', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80' },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormImageUrl(preset.url)}
                      className="text-[10px] text-emerald-700 hover:text-emerald-900 font-semibold underline"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Autor</label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="Equipo Solviplas"
                    className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Rol del Autor</label>
                  <input
                    type="text"
                    value={formAuthorRole}
                    onChange={(e) => setFormAuthorRole(e.target.value)}
                    placeholder="I+D Sostenibilidad"
                    className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none font-semibold text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Etiquetas (separadas por coma)</label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="Innovación, Biopolímeros, Química Verde"
                  className="w-full text-xs px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={formIsFeatured}
                  onChange={(e) => setFormIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="featuredToggle" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Marcar como Noticia Destacada (aparece en el banner superior)
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditorModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-all active:scale-95 cursor-pointer"
                >
                  {editingArticleId ? 'Guardar Cambios' : 'Publicar Noticia'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
