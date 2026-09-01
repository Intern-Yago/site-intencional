'use client';

import React, { useRef, useState } from 'react';
import { 
  Shield, 
  CircleDollarSign, 
  Heart, 
  Bird, 
  Leaf, 
  Flower2, 
  DoorOpen, 
  House,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { LotusDivider } from './LotusDivider';

interface IntentionsSectionProps {
  onSelectIntention: (slug: string, query: string) => void;
  activeIntentionSlug?: string | null;
}

const INTENTION_CARDS = [
  {
    id: 'protecao',
    title: 'Proteção',
    icon: Shield,
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    query: 'Quero proteção contra inveja e energias ruins'
  },
  {
    id: 'prosperidade',
    title: 'Prosperidade',
    icon: CircleDollarSign,
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    query: 'Atrair dinheiro, sucesso profissional e abundância financeira'
  },
  {
    id: 'amor',
    title: 'Amor',
    icon: Heart,
    color: 'bg-rose-50 text-rose-700 border-rose-200',
    query: 'Atrair amor verdadeiro e fortalecer a harmonia no relacionamento'
  },
  {
    id: 'paz',
    title: 'Paz',
    icon: Bird,
    color: 'bg-sky-50 text-sky-700 border-sky-200',
    query: 'Como diminuir a ansiedade e encontrar paz interior'
  },
  {
    id: 'limpeza',
    title: 'Limpeza',
    icon: Leaf,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    query: 'Banho de descarrego e limpeza pesada de energias densas'
  },
  {
    id: 'espiritualidade',
    title: 'Espiritualidade',
    icon: Flower2,
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    query: 'Fortalecer a espiritualidade e desenvolver a intuição'
  },
  {
    id: 'abertura-caminhos',
    title: 'Abertura de Caminhos',
    icon: DoorOpen,
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    query: 'Abrir caminhos e desbloquear situações difíceis'
  },
  {
    id: 'harmonia-lar',
    title: 'Harmonia para o Lar',
    icon: House,
    color: 'bg-teal-50 text-teal-700 border-teal-200',
    query: 'Harmonizar a energia da minha casa e família'
  }
];

export const IntentionsSection: React.FC<IntentionsSectionProps> = ({
  onSelectIntention,
  activeIntentionSlug,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 260;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Suporte a arrastar com o mouse (Drag to Scroll)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section id="intencoes" className="py-12 sm:py-16 px-4 sm:px-8 bg-brand-cream/50">
      <div className="max-w-site mx-auto">
        
        {/* Cabeçalho Centralizado */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-dark font-serif">
            Explore por intenção
          </h2>
          <LotusDivider className="my-2.5" />
        </div>

        {/* Carrossel Arrastável sem scrollbar visível */}
        <div className="relative group/carousel px-2 sm:px-4">
          
          {/* Botão de Navegação Esquerda */}
          <button
            onClick={() => scroll('left')}
            className="hidden sm:flex absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-brand-gold/60 text-brand-dark shadow-md items-center justify-center hover:bg-brand-dark hover:text-white transition-all hover:scale-105"
            aria-label="Rolar para a esquerda"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Área de rolagem arrastável sem barra inferior */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`flex items-center gap-3.5 sm:gap-4 overflow-x-auto py-3 select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {INTENTION_CARDS.map((card) => {
              const Icon = card.icon;
              const isSelected = activeIntentionSlug === card.id;

              return (
                <div
                  key={card.id}
                  onClick={() => {
                    if (!isDragging) onSelectIntention(card.id, card.query);
                  }}
                  className={`shrink-0 w-[140px] sm:w-[165px] lg:w-[180px] h-[140px] sm:h-[155px] rounded-2xl p-4 transition-all duration-300 border bg-white flex flex-col items-center justify-center text-center cursor-pointer hover:-translate-y-1 hover:shadow-lg ${
                    isSelected 
                      ? 'ring-2 ring-brand-purple border-brand-purple shadow-md bg-brand-gold/15 scale-105' 
                      : 'border-brand-gold/40 hover:border-brand-purple/50 shadow-sm'
                  }`}
                >
                  {/* Ícone Centralizado no Topo */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-2.5 transition-transform duration-300 group-hover:scale-110 ${card.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Título da Intenção */}
                  <h3 className="font-serif font-bold text-sm sm:text-base text-brand-dark tracking-tight leading-snug">
                    {card.title}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Botão de Navegação Direita */}
          <button
            onClick={() => scroll('right')}
            className="hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-brand-gold/60 text-brand-dark shadow-md items-center justify-center hover:bg-brand-dark hover:text-white transition-all hover:scale-105"
            aria-label="Rolar para a direita"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
