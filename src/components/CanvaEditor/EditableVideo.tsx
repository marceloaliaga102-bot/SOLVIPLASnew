import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Video, Upload, Link as LinkIcon, Check, X, Loader2 } from 'lucide-react';
import { SmartVideo } from '../SmartVideo';
import { uploadMediaFileToCloud } from '../../utils/cloudMediaStorage';

interface EditableVideoProps {
  src: string;
  poster?: string;
  className?: string;
  containerClassName?: string;
  onSave: (newSrc: string) => void;
  label?: string;
}

export const EditableVideo: React.FC<EditableVideoProps> = ({
  src,
  poster,
  className = '',
  containerClassName = '',
  onSave,
  label = 'Cambiar Video',
}) => {
  const { isAdmin, isLiveEditEnabled, showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ percent: 0, status: '' });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const canEdit = isAdmin && isLiveEditEnabled;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress({ percent: 10, status: 'Iniciando subida a Google Cloud...' });

    try {
      const result = await uploadMediaFileToCloud(file, (percent, status) => {
        setUploadProgress({ percent, status });
      });
      onSave(result.url);
      setIsOpen(false);
      showToast('¡Video subido a la nube y visible para todos los usuarios!', 'success');
    } catch (err) {
      console.error('Upload video error:', err);
      showToast('Error al subir video a Google Cloud. Intenta de nuevo.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onSave(urlInput.trim());
    setUrlInput('');
    setIsOpen(false);
    showToast('¡Video actualizado exitosamente en la nube!', 'success');
  };

  return (
    <div className={`relative group/canva-video ${containerClassName}`}>
      <SmartVideo
        src={src}
        poster={poster}
        controls
        className={className}
      />

      {/* Canva Overlay Trigger */}
      {canEdit && (
        <div className="absolute top-3 right-3 z-30">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600/90 hover:bg-teal-500 text-white font-bold text-xs shadow-xl backdrop-blur-md transition-all hover:scale-105"
          >
            <Video className="w-4 h-4" />
            <span>{label}</span>
          </button>
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 text-slate-900 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-teal-100 text-teal-800">
                  <Video className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Cambiar Video en Tiempo Real
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Video Preview */}
            <div className="mb-4 bg-slate-900 rounded-xl overflow-hidden">
              <SmartVideo src={src} controls className="w-full max-h-36 object-contain" />
            </div>

            {/* Tabs */}
            <div className="flex rounded-xl bg-slate-100 p-1 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'upload' ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-600'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Subir archivo descargado</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('url')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'url' ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-600'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Pegar enlace web</span>
              </button>
            </div>

            {activeTab === 'upload' ? (
              <div className="space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-6 rounded-2xl border-2 border-dashed border-teal-300 bg-teal-50/50 hover:bg-teal-50 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 disabled:opacity-50"
                >
                  <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-teal-950">
                    Seleccionar video descargado de tu dispositivo
                  </span>
                  <span className="text-[11px] text-slate-500">
                    MP4, WebM, MOV — Se fragmenta y guarda en la nube para que todos lo vean
                  </span>
                </button>

                {isUploading && (
                  <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 space-y-2 animate-fadeIn">
                    <div className="flex items-center justify-between text-xs font-bold text-teal-900">
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-600" />
                        <span>{uploadProgress.status}</span>
                      </span>
                      <span>{uploadProgress.percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-teal-200/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300"
                        style={{ width: `${uploadProgress.percent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleUrlSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    URL directa del video:
                  </label>
                  <input
                    type="url"
                    placeholder="https://ejemplo.com/video.mp4"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Actualizar Video</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
