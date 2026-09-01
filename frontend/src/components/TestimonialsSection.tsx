'use client';

import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Mariana S. Albuquerque',
    location: 'São Paulo - SP',
    quote: 'A busca por intenção me ajudou a encontrar exatamente o que eu precisava. Digitei que estava sentindo uma sobrecarga no trabalho e o sistema me recomendou o banho e a turmalina certos.',
    rating: 5,
    highlight: 'Busca por Intenção Perfeita'
  },
  {
    id: 2,
    name: 'Carlos Eduardo Mendes',
    location: 'Belo Horizonte - MG',
    quote: 'Produtos de ótima qualidade e entrega rápida. O colar de obsidiana veio muito bem embalado, com cheirinho de alfazema e guia de uso. Dá para sentir o carinho em cada detalhe.',
    rating: 5,
    highlight: 'Qualidade & Entrega Rápida'
  },
  {
    id: 3,
    name: 'Beatriz Vasconcelos',
    location: 'Curitiba - PR',
    quote: 'Eu não entendia muito sobre pedras e o site facilitou tudo. Comprei o Citrino para o meu consultório e a energia do lugar mudou completamente. Virei cliente fiel!',
    rating: 5,
    highlight: 'Experiência Acolhedora'
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-8 bg-brand-light">
      <div className="max-w-site mx-auto">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-purple tracking-widest uppercase">
            Depoimentos Reais
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark font-serif mt-2">
            O que nossos clientes dizem
          </h2>
          <p className="text-sm text-brand-dark/75 mt-2">
            Histórias de quem já transformou sua energia e rotina conosco.
          </p>
        </div>

        {/* Grid de Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-brand-gold/40 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Estrelas */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[11px] font-bold text-brand-purple ml-2 bg-brand-gold/20 px-2 py-0.5 rounded-full">
                    {t.highlight}
                  </span>
                </div>

                <p className="text-sm text-brand-dark/85 italic leading-relaxed font-serif">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-gold/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-brand-dark font-sans flex items-center gap-1">
                    <span>{t.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-[11px] text-brand-dark/60">
                    {t.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
