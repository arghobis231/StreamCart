import React from 'react';

// Wireframe Box Placeholder with crisp cross-diagonal Balsamiq wireframe style
export const WireframeBox: React.FC<{
  label?: string;
  sublabel?: string;
  className?: string;
  aspectRatio?: string;
  showDiagonalCross?: boolean;
  children?: React.ReactNode;
}> = ({
  label = '[ Placeholder ]',
  sublabel,
  className = '',
  showDiagonalCross = true,
  children,
}) => {
  return (
    <div
      className={`relative border-2 border-dashed border-zinc-400 bg-zinc-100 flex flex-col items-center justify-center p-3 text-center overflow-hidden select-none ${className}`}
    >
      {showDiagonalCross && (
        <svg
          className="absolute inset-0 w-full h-full text-zinc-300 pointer-events-none opacity-60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1.5" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
      <div className="relative z-10 font-mono text-xs font-semibold text-zinc-600 bg-white/80 px-2 py-0.5 rounded border border-zinc-300 shadow-xs">
        {label}
      </div>
      {sublabel && (
        <div className="relative z-10 font-mono text-[10px] text-zinc-500 mt-1">
          {sublabel}
        </div>
      )}
      {children && <div className="relative z-10 w-full mt-2">{children}</div>}
    </div>
  );
};

// Wireframe Button with classic low-fi borders and tactile states
export const WireframeButton: React.FC<{
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
}> = ({
  variant = 'secondary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = '',
  title,
  icon,
}) => {
  let baseStyle = 'inline-flex items-center justify-center gap-1.5 font-mono text-xs font-bold rounded border-2 transition-all cursor-pointer select-none active:translate-y-0.5 ';

  if (size === 'sm') baseStyle += 'px-2.5 py-1 text-[11px] ';
  else if (size === 'md') baseStyle += 'px-3.5 py-1.5 text-xs ';
  else if (size === 'lg') baseStyle += 'px-5 py-2.5 text-sm ';

  if (disabled) {
    baseStyle += 'bg-zinc-200 border-zinc-300 text-zinc-400 cursor-not-allowed opacity-60 ';
  } else if (variant === 'primary') {
    baseStyle += 'bg-zinc-900 border-zinc-900 text-white hover:bg-zinc-800 shadow-sm ';
  } else if (variant === 'danger') {
    baseStyle += 'bg-zinc-100 border-red-600 text-red-700 hover:bg-red-50 ';
  } else if (variant === 'outline') {
    baseStyle += 'bg-white border-zinc-700 text-zinc-800 hover:bg-zinc-100 ';
  } else if (variant === 'ghost') {
    baseStyle += 'bg-transparent border-transparent text-zinc-700 hover:bg-zinc-200 ';
  } else {
    baseStyle += 'bg-zinc-100 border-zinc-400 text-zinc-800 hover:bg-zinc-200 ';
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`${baseStyle} ${className}`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};

// Wireframe Badge / Tag
export const WireframeBadge: React.FC<{
  children: React.ReactNode;
  variant?: 'default' | 'live' | 'warning' | 'success' | 'outline';
  className?: string;
}> = ({ children, variant = 'default', className = '' }) => {
  let style = 'inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border ';

  if (variant === 'live') {
    style += 'bg-red-100 border-red-500 text-red-700 animate-pulse ';
  } else if (variant === 'warning') {
    style += 'bg-amber-100 border-amber-500 text-amber-800 ';
  } else if (variant === 'success') {
    style += 'bg-emerald-100 border-emerald-500 text-emerald-800 ';
  } else if (variant === 'outline') {
    style += 'bg-white border-zinc-400 text-zinc-700 ';
  } else {
    style += 'bg-zinc-200 border-zinc-400 text-zinc-800 ';
  }

  return <span className={`${style} ${className}`}>{children}</span>;
};

// Wireframe Card with sketch border
export const WireframeCard: React.FC<{
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, headerAction, children, className = '' }) => {
  return (
    <div className={`bg-white border-2 border-zinc-800 rounded-md shadow-xs flex flex-col ${className}`}>
      {(title || headerAction) && (
        <div className="px-3.5 py-2.5 border-b-2 border-zinc-800 flex items-center justify-between bg-zinc-100 select-none">
          <div>
            {title && <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900">{title}</h3>}
            {subtitle && <p className="font-mono text-[10px] text-zinc-500 mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-3.5 flex-1">{children}</div>
    </div>
  );
};
