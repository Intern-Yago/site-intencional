import React from 'react';

interface LotusDividerProps {
  className?: string;
}

export const LotusDivider: React.FC<LotusDividerProps> = ({ className = "my-4" }) => {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-brand-gold"></div>
      
      {/* Ícone SVG Elegante da Flor de Lótus */}
      <svg
        className="w-6 h-6 text-brand-gold fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 3C12 3 8.5 7.5 8.5 11.5C8.5 13.8 9.9 15.7 12 16.3C14.1 15.7 15.5 13.8 15.5 11.5C15.5 7.5 12 3 12 3Z" />
        <path d="M6.2 9.2C6.2 9.2 3 12.8 3.8 16.2C4.3 18.2 6 19.5 8.1 19.3C10.3 19.1 11.8 17.6 12 17.2C10.2 16.7 8.8 15.2 8.3 13.3C7.9 11.8 8.1 10.3 8.7 9.1L6.2 9.2Z" opacity="0.85" />
        <path d="M17.8 9.2C17.8 9.2 21 12.8 20.2 16.2C19.7 18.2 18 19.5 15.9 19.3C13.7 19.1 12.2 17.6 12 17.2C13.8 16.7 15.2 15.2 15.7 13.3C16.1 11.8 15.9 10.3 15.3 9.1L17.8 9.2Z" opacity="0.85" />
      </svg>

      <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-brand-gold"></div>
    </div>
  );
};
