import React from 'react';

interface LiquidLineDividerProps {
  className?: string;
  label?: string;
  badge?: string;
}

export const LiquidLineDivider: React.FC<LiquidLineDividerProps> = ({
  className = '',
  label,
  badge,
}) => {
  return (
    <div className={`relative w-full my-8 sm:my-12 flex items-center justify-center select-none ${className}`}>
      {/* Horizontal glowing liquid line */}
      <div
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-emerald-400/20 blur-[2px]" />
      </div>

      {/* Central Node Anchor / Floating Liquid Pill */}
      {label || badge ? (
        <div className="relative z-10 px-4 py-1 rounded-full bg-emerald-950/90 border border-emerald-400/40 shadow-[0_0_16px_rgba(52,211,153,0.35)] backdrop-blur-md flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-300 ring-2 ring-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
          {badge && (
            <span className="text-[10px] uppercase font-black tracking-wider text-emerald-400">
              {badge}
            </span>
          )}
          {label && (
            <span className="text-xs font-bold text-emerald-200">
              {label}
            </span>
          )}
        </div>
      ) : (
        <div className="relative z-10 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
          <span className="w-3 h-3 rounded-full bg-teal-200 ring-2 ring-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)] animate-pulse" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
        </div>
      )}
    </div>
  );
};
