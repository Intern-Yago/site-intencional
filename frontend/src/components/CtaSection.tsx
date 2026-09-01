'use client';

import React from 'react';
import { MessageCircle, Sparkles, ArrowRight } from 'lucide-react';

export const CtaSection: React.FC = () => {
  return (
    <section id="contato" className="py-16 px-4 sm:px-8 bg-gradient-to-r from-brand-dark via-brand-purple to-brand-dark text-white relative overflow-hidden">
      
      {/* Luz decorativa */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-brand-gold/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-semibold uppercase tracking-wider mb-5">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>Orientação Espiritual Personalizada</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif leading-tight">
          Ainda com dúvidas sobre sua intenção?
        </h2>

        <p className="text-sm sm:text-base text-brand-cream/80 max-w-2xl mx-auto mt-4 leading-relaxed font-sans">
          Fale com nossa equipe especializada. Ajudamos você a escolher as pedras, ervas e rituais ideais para o seu momento presente.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20uma%20orientação%20sobre%20minha%20intenção%20espiritual."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-gold hover:bg-white text-brand-dark px-8 py-4 rounded-xl font-bold text-sm flex items-center gap-2 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 text-brand-dark" />
            <span>Falar com especialista no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
