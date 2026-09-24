import React, { useState, useEffect } from 'react';
import { resolveCloudVideoUrl } from '../utils/cloudMediaStorage';
import { Loader2, Film } from 'lucide-react';

interface SmartVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  className?: string;
}

export const SmartVideo: React.FC<SmartVideoProps> = ({
  src,
  poster,
  className = '',
  ...rest
}) => {
  const [resolvedSrc, setResolvedSrc] = useState<string>(src.startsWith('firestore-video://') ? '' : src);
  const [isLoading, setIsLoading] = useState<boolean>(src.startsWith('firestore-video://'));

  useEffect(() => {
    let isMounted = true;

    if (!src) {
      setResolvedSrc('');
      setIsLoading(false);
      return;
    }

    if (!src.startsWith('firestore-video://')) {
      setResolvedSrc(src);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    resolveCloudVideoUrl(src)
      .then((url) => {
        if (isMounted) {
          setResolvedSrc(url);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [src]);

  if (isLoading) {
    return (
      <div className={`flex flex-col items-center justify-center bg-slate-900/90 text-white rounded-2xl min-h-[220px] p-6 text-center ${className}`}>
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mb-3" />
        <p className="text-xs font-bold text-emerald-300">Descargando video desde Google Cloud...</p>
        <p className="text-[11px] text-slate-400 mt-1">Reensamblando fragmentos para reproducción en alta calidad.</p>
      </div>
    );
  }

  if (!resolvedSrc) {
    return (
      <div className={`flex flex-col items-center justify-center bg-slate-800 text-slate-400 rounded-2xl min-h-[180px] p-4 text-center ${className}`}>
        <Film className="w-8 h-8 mb-2 opacity-50" />
        <span className="text-xs">Video no disponible</span>
      </div>
    );
  }

  return (
    <video
      src={resolvedSrc}
      poster={poster}
      controls
      playsInline
      className={className}
      {...rest}
    >
      Tu navegador no soporta la reproducción de video.
    </video>
  );
};
