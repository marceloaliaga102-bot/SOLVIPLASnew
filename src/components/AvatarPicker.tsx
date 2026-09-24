import React, { useState, useRef } from 'react';
import { ANIMAL_AVATARS, compressAndResizeImage } from '../data/animalAvatars';
import { Image, Upload, Check, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

interface AvatarPickerProps {
  currentAvatar: string;
  selectedAnimalId?: string;
  onSelectAvatar: (avatarUrl: string, animalId?: string, type?: 'animal' | 'custom') => void;
  className?: string;
  compact?: boolean;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  currentAvatar,
  selectedAnimalId,
  onSelectAvatar,
  className = '',
  compact = false,
}) => {
  const [tab, setTab] = useState<'animals' | 'upload' | 'url'>('animals');
  const [animalCategory, setAnimalCategory] = useState<'all' | 'terrestre' | 'marino' | 'aves_insectos'>('all');
  const [isProcessing, setIsProcessing] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredAnimals = animalCategory === 'all'
    ? ANIMAL_AVATARS
    : ANIMAL_AVATARS.filter(a => a.category === animalCategory);

  const currentAnimal = ANIMAL_AVATARS.find(
    a => a.id === selectedAnimalId || a.svgDataUri === currentAvatar
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Por favor selecciona un archivo de imagen válido (JPG, PNG, WebP).');
      return;
    }

    setErrorMsg('');
    setIsProcessing(true);
    try {
      const compressedDataUrl = await compressAndResizeImage(file, 360, 360, 0.85);
      onSelectAvatar(compressedDataUrl, undefined, 'custom');
    } catch {
      setErrorMsg('No se pudo procesar la imagen seleccionada.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrlInput.trim()) return;
    onSelectAvatar(customUrlInput.trim(), undefined, 'custom');
    setCustomUrlInput('');
  };

  return (
    <div className={`space-y-3.5 ${className}`}>
      {/* Top Preview Card */}
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50/60 border border-emerald-100 shadow-sm">
        <div className="relative shrink-0">
          <img
            src={currentAvatar || ANIMAL_AVATARS[0].svgDataUri}
            alt="Avatar seleccionado"
            className="w-14 h-14 rounded-full object-cover ring-2 ring-emerald-500 shadow-md bg-white"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-emerald-950 truncate">
              {currentAnimal ? currentAnimal.name : 'Foto personalizada'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold shrink-0">
              {currentAnimal ? currentAnimal.species : 'Galería'}
            </span>
          </div>
          <p className="text-[11px] text-emerald-700/90 truncate mt-0.5">
            {currentAnimal ? currentAnimal.ecoRole : 'Tu imagen personalizada para comentarios y perfil'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
        <button
          type="button"
          onClick={() => { setTab('animals'); setErrorMsg(''); }}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            tab === 'animals'
              ? 'bg-white text-emerald-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Animalitos</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">
            {ANIMAL_AVATARS.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => { setTab('upload'); setErrorMsg(''); }}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            tab === 'upload'
              ? 'bg-white text-emerald-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Upload className="w-3.5 h-3.5 text-emerald-600" />
          <span>Subir de Galería</span>
        </button>

        <button
          type="button"
          onClick={() => { setTab('url'); setErrorMsg(''); }}
          className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all ${
            tab === 'url'
              ? 'bg-white text-emerald-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Image className="w-3.5 h-3.5" />
          <span>URL</span>
        </button>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-1.5 p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* TAB 1: Animal Avatars */}
      {tab === 'animals' && (
        <div className="space-y-2.5">
          {/* Sub category filter */}
          {!compact && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
              <button
                type="button"
                onClick={() => setAnimalCategory('all')}
                className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all ${
                  animalCategory === 'all'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Todos ({ANIMAL_AVATARS.length})
              </button>
              <button
                type="button"
                onClick={() => setAnimalCategory('terrestre')}
                className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all ${
                  animalCategory === 'terrestre'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Fauna Terrestre
              </button>
              <button
                type="button"
                onClick={() => setAnimalCategory('marino')}
                className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all ${
                  animalCategory === 'marino'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Marinos & Agua
              </button>
              <button
                type="button"
                onClick={() => setAnimalCategory('aves_insectos')}
                className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all ${
                  animalCategory === 'aves_insectos'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Aves & Abejas
              </button>
            </div>
          )}

          {/* Grid of Animals */}
          <div className={`grid grid-cols-4 ${compact ? 'gap-2 max-h-48' : 'sm:grid-cols-4 gap-2.5 max-h-60'} overflow-y-auto p-1 rounded-xl bg-slate-50/70 border border-slate-200/80`}>
            {filteredAnimals.map((animal) => {
              const isSelected =
                selectedAnimalId === animal.id ||
                currentAvatar === animal.svgDataUri;

              return (
                <button
                  key={animal.id}
                  type="button"
                  onClick={() => onSelectAvatar(animal.svgDataUri, animal.id, 'animal')}
                  className={`relative group p-2 rounded-2xl flex flex-col items-center text-center transition-all ${
                    isSelected
                      ? 'bg-white ring-2 ring-emerald-500 shadow-md scale-95 sm:scale-100'
                      : 'bg-white/80 hover:bg-white hover:shadow hover:scale-105 border border-slate-100'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={animal.svgDataUri}
                      alt={animal.name}
                      className="w-12 h-12 rounded-full object-cover shadow-sm bg-white"
                      loading="lazy"
                    />
                    {isSelected && (
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] ring-2 ring-white">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 mt-1 line-clamp-1">
                    {animal.name}
                  </span>
                  <span className="text-[9px] text-slate-500 line-clamp-1">
                    {animal.species}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Upload from Device / Gallery */}
      {tab === 'upload' && (
        <div className="space-y-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
            id="avatar-file-upload-input"
          />

          <label
            htmlFor="avatar-file-upload-input"
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl bg-emerald-50/40 hover:bg-emerald-50 cursor-pointer transition-all group"
          >
            {isProcessing ? (
              <div className="flex flex-col items-center gap-2 text-emerald-700">
                <RefreshCw className="w-8 h-8 animate-spin text-emerald-600" />
                <span className="text-xs font-bold">Comprimiendo y optimizando foto...</span>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800 text-center">
                  Toca aquí para seleccionar una foto de tu galería
                </span>
                <span className="text-[11px] text-slate-500 text-center mt-1">
                  Formatos compatibles: JPG, PNG, WebP o foto de cámara
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Optimización instantánea en tu navegador
                </span>
              </>
            )}
          </label>
        </div>
      )}

      {/* TAB 3: Direct URL */}
      {tab === 'url' && (
        <form onSubmit={handleApplyUrl} className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Ingresa enlace web de tu foto
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://ejemplo.com/mi-foto.jpg"
              value={customUrlInput}
              onChange={(e) => setCustomUrlInput(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800"
            />
            <button
              type="submit"
              disabled={!customUrlInput.trim()}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs"
            >
              Aplicar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
