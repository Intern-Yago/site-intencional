'use client';

import React from 'react';
import { Truck, Zap, Headphones } from 'lucide-react';

export const Topbar: React.FC = () => {
  return (
    <div className="bg-brand-dark text-brand-cream/90 text-xs py-2 px-4 border-b border-brand-purple/30">
      <div className="max-w-site mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Frete Grátis */}
        <div className="flex items-center gap-1.5 mx-auto sm:mx-0 font-medium">
          <Truck className="w-3.5 h-3.5 text-brand-gold" />
          <span>Frete grátis para todo o Brasil acima de <strong className="text-brand-gold">R$ 199</strong></span>
        </div>

        {/* Oferta Pix & Atendimento */}
        <div className="hidden sm:flex items-center gap-6 text-[11px] text-brand-cream/80">
          <div className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span><strong>5% OFF</strong> no pagamento via PIX</span>
          </div>
          <span className="text-brand-purple">|</span>
          <a href="#contato" className="flex items-center gap-1 hover:text-white transition">
            <Headphones className="w-3.5 h-3.5 text-brand-gold" />
            <span>Atendimento Personalizado</span>
          </a>
        </div>
      </div>
    </div>
  );
};
