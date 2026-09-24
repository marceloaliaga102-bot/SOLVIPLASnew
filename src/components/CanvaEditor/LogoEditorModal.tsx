import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Check,
  Upload,
  Link as LinkIcon,
  Leaf,
  Sprout,
  FlaskConical,
  Droplets,
  Sparkles,
  Globe,
  ShieldCheck,
  Package,
  Recycle,
  Sun,
  Flame,
  Feather,
  Palette,
  RotateCcw
} from 'lucide-react';
import { uploadMediaFileToCloud } from '../../utils/cloudMediaStorage';

interface LogoEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ECO_ICONS_LIST = [
  { id: 'Leaf', label: 'Hoja Verde', Icon: Leaf },
  { id: 'Sprout', label: 'Brote Orgánico', Icon: Sprout },
  { id: 'FlaskConical', label: 'Química Verde', Icon: FlaskConical },
  { id: 'Droplets', label: 'Hidrosoluble', Icon: Droplets },
  { id: 'Sparkles', label: 'Innovación', Icon: Sparkles },
  { id: 'Globe', label: 'Planeta Sostenible', Icon: Globe },
  { id: 'ShieldCheck', label: 'Garantía Verde', Icon: ShieldCheck },
  { id: 'Package', label: 'Biopackaging', Icon: Package },
  { id: 'Recycle', label: 'Circularidad', Icon: Recycle },
  { id: 'Sun', label: 'Energía Solar', Icon: Sun },
  { id: 'Flame', label: 'Transformación Térmica', Icon: Flame },
  { id: 'Feather', label: 'Ligereza y Maleabilidad', Icon: Feather },
];

export const BrandLogoIcon: React.FC<{
  iconName?: string;
  logoUrl?: string;
  className?: string;
}> = ({ iconName, logoUrl, className = 'w-6 h-6 text-emerald-950 fill-emerald-950' }) => {
  if (logoUrl) {
    return <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />;
  }
  const matched = ECO_ICONS_LIST.find((i) => i.id === iconName);
  const IconComp = matched ? matched.Icon : Leaf;
  return <IconComp className={className} />;
};

export const LogoEditorModal: React.FC<LogoEditorModalProps> = ({ isOpen, onClose }) => {
  const { siteConfig, updateSiteConfig, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'icon' | 'image'>('icon');
  const [selectedIcon, setSelectedIcon] = useState<string>(siteConfig.logoIcon || 'Leaf');
  const [customImageUrl, setCustomImageUrl] = useState<string>(siteConfig.logoUrl || '');
  const [brandName, setBrandName] = useState<string>(siteConfig.siteName || 'SOLVIPLAS');
  const [logoSubtitle, setLogoSubtitle] = useState<string>(siteConfig.logoSubtitle || 'Química Verde & Hidrosolubilidad');
  const [logoBadge, setLogoBadge] = useState<string>(siteConfig.logoBadge || 'Bioplásticos');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  // Selected icon component
  const currentIconObj = ECO_ICONS_LIST.find(i => i.id === selectedIcon) || ECO_ICONS_LIST[0];
  const CurrentIcon = currentIconObj.Icon;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Por favor selecciona una imagen válida (PNG, JPG, SVG o WebP).', 'warning');
      return;
    }

    setIsUploading(true);
    try {
      const res = await uploadMediaFileToCloud(file);
      setCustomImageUrl(res.url);
      setActiveTab('image');
      showToast('¡Logotipo cargado con éxito!', 'success');
    } catch (err) {
      // Fallback to local base64
      const reader = new FileReader();
      reader.onload = () => {
        setCustomImageUrl(reader.result as string);
        setActiveTab('image');
        showToast('Imagen cargada en previsualización local.', 'info');
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    updateSiteConfig({
      siteName: brandName.trim() || 'SOLVIPLAS',
      logoSubtitle: logoSubtitle.trim(),
      logoBadge: logoBadge.trim(),
      logoUrl: activeTab === 'image' ? customImageUrl.trim() : '',
      logoIcon: selectedIcon,
    });
    showToast('¡Logotipo e identidad de marca actualizados en toda la web!', 'success');
    onClose();
  };

  const handleReset = () => {
    setSelectedIcon('Leaf');
    setCustomImageUrl('');
    setActiveTab('icon');
    setBrandName('SOLVIPLAS');
    setLogoSubtitle('Química Verde & Hidrosolubilidad');
    setLogoBadge('Bioplásticos');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl w-full max-w-xl text-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Personalizar Logotipo & Marca
              </h3>
              <p className="text-xs text-slate-400">
                Edita el logo, nombre, insignia y subtítulo del encabezado
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Live Preview Box */}
          <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-700/60 shadow-inner">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-2">
              Vista Previa en Tiempo Real
            </span>
            <div className="flex items-center gap-3 bg-emerald-950/90 p-3 rounded-xl border border-emerald-800/80">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg ring-2 ring-emerald-300/30 shrink-0 overflow-hidden">
                {activeTab === 'image' && customImageUrl ? (
                  <img
                    src={customImageUrl}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CurrentIcon className="w-6 h-6 text-emerald-950 fill-emerald-950" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-xl tracking-tight bg-gradient-to-r from-emerald-200 via-teal-100 to-emerald-400 bg-clip-text text-transparent truncate">
                    {brandName || 'SOLVIPLAS'}
                  </span>
                  {logoBadge && (
                    <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-emerald-800/80 text-emerald-200 border border-emerald-600/40">
                      {logoBadge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-emerald-300/80 font-medium truncate mt-0.5">
                  {logoSubtitle || 'Química Verde & Hidrosolubilidad'}
                </p>
              </div>
            </div>
          </div>

          {/* Logo Type Tabs */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Tipo de Logotipo
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-800/80 rounded-2xl border border-slate-700">
              <button
                type="button"
                onClick={() => setActiveTab('icon')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'icon'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Leaf className="w-4 h-4" />
                <span>Iconos Ecológicos SVG</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('image')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'image'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>Subir Imagen o URL</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Icon Selector */}
          {activeTab === 'icon' && (
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2">
                Selecciona un Icono Representativo:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {ECO_ICONS_LIST.map((item) => {
                  const Icon = item.Icon;
                  const isSelected = selectedIcon === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedIcon(item.id)}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        isSelected
                          ? 'bg-emerald-900/60 border-emerald-400 text-emerald-300 ring-2 ring-emerald-500/30'
                          : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-bold truncate max-w-full">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Image Upload / URL */}
          {activeTab === 'image' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Subir archivo de imagen desde tu dispositivo:
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-dashed border-slate-600 hover:border-emerald-400 text-slate-300 flex items-center justify-center gap-2 text-xs font-bold transition-all"
                >
                  <Upload className="w-4 h-4 text-emerald-400" />
                  <span>{isUploading ? 'Subiendo imagen...' : 'Seleccionar Imagen (PNG, JPG, SVG, WebP)'}</span>
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  O pegar enlace web directo de la imagen:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="https://ejemplo.com/logo.png"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  {customImageUrl && (
                    <button
                      type="button"
                      onClick={() => setCustomImageUrl('')}
                      className="px-3 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-bold"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Text Fields */}
          <div className="space-y-3.5 pt-2 border-t border-slate-800">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Nombre de la Marca / Proyecto:
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="SOLVIPLAS"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Insignia / Badge:
                </label>
                <input
                  type="text"
                  value={logoBadge}
                  onChange={(e) => setLogoBadge(e.target.value)}
                  placeholder="Bioplásticos"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Subtítulo / Lema Corto:
                </label>
                <input
                  type="text"
                  value={logoSubtitle}
                  onChange={(e) => setLogoSubtitle(e.target.value)}
                  placeholder="Química Verde & Hidrosolubilidad"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 text-xs font-bold rounded-xl text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Por Defecto</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-750 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
