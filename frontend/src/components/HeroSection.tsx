'use client';

import React, { useState, useEffect } from 'react';
import { Search, Check, X, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (query: string) => Promise<void>;
  matchedIntent: {
    id: number;
    name: string;
    slug: string;
    confidence: number;
    source: string;
  } | null;
  isLoading: boolean;
  onSendFeedback?: (isCorrect: boolean) => void;
}

const POPULAR_SEARCHES = [
  { label: 'Proteção', query: 'Quero proteção contra inveja e energias pesadas' },
  { label: 'Prosperidade', query: 'Atrair dinheiro, sucesso e abrir caminhos financeiros' },
  { label: 'Limpeza', query: 'Banho de descarrego e limpeza energética profunda' },
  { label: 'Amor', query: 'Atrair amor verdadeiro e harmonizar o relacionamento' },
  { label: 'Paz', query: 'Aliviar a ansiedade e trazer paz para dentro de casa' }
];

const TYPEWRITER_PLACEHOLDERS = [
  'Tô sentindo muito olho gordo e energia pesada...',
  'Não tô conseguindo ganhar dinheiro e quero abrir caminhos...',
  'Preciso acalmar minha cabeça e dormir melhor...',
  'Quero melhorar a harmonia e o amor dentro de casa...',
  'Preciso de um banho de descarrego forte e renovação...'
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  matchedIntent,
  isLoading,
  onSendFeedback,
}) => {
  const [query, setQuery] = useState('');
  const [feedbackSent, setFeedbackSent] = useState<boolean | null>(null);

  // Efeito Máquina de Escrever Dinâmica no Placeholder
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = TYPEWRITER_PLACEHOLDERS[placeholderIndex];
    const typingSpeed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedPlaceholder.length < currentText.length) {
          setDisplayedPlaceholder(currentText.substring(0, displayedPlaceholder.length + 1));
        } else {
          // Pausa antes de começar a apagar
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        if (displayedPlaceholder.length > 0) {
          setDisplayedPlaceholder(currentText.substring(0, displayedPlaceholder.length - 1));
        } else {
          setIsDeleting(false);
          setPlaceholderIndex((prev) => (prev + 1) % TYPEWRITER_PLACEHOLDERS.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedPlaceholder, isDeleting, placeholderIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setFeedbackSent(null);
    onSearch(query);
  };

  const handleChipClick = (q: string) => {
    setQuery(q);
    setFeedbackSent(null);
    onSearch(q);
  };

  const handleFocusSearch = () => {
    const input = document.getElementById('hero-search-input');
    input?.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[520px] flex items-center px-4 sm:px-8 py-14 lg:py-20 border-b border-brand-gold/30 overflow-hidden">
      
      {/* IMAGEM DE BACKGROUND ESPIRITUAL NÍTIDA E ACOLHEDORA */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1920&auto=format&fit=crop&q=85')`
        }}
      />

      {/* OVERLAYS EM TONS CREME/DOURADO (SEM NENHUM AZUL) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F6F1EB]/95 via-[#F6F1EB]/85 to-[#F6F1EB]/75"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#F6F1EB] via-transparent to-[#F6F1EB]/60"></div>
      <div className="absolute inset-0 bg-brand-gold/10 pointer-events-none"></div>

      {/* CONTEÚDO PRINCIPAL (2 COLUNAS) */}
      <div className="relative z-10 max-w-site mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* COLUNA DA ESQUERDA: TÍTULO, TEXTO E BUSCA */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-dark font-serif leading-[1.15]">
            Encontre o que sua <br />
            <span className="italic font-normal text-brand-purple">alma busca.</span>
          </h1>

          {/* Description Convidativa */}
          <p className="mt-4 text-sm sm:text-base text-brand-dark/85 max-w-xl leading-relaxed font-sans font-medium">
            Pergunte aquilo que você precisa e vamos te ajudar a encontrar o caminho e os artigos certos para o seu momento.
          </p>

          {/* BARRA DE BUSCA INTELIGENTE */}
          <div className="mt-6 w-full">
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center bg-white/95 backdrop-blur-md rounded-2xl border-2 border-brand-gold/70 focus-within:border-brand-purple focus-within:ring-4 focus-within:ring-brand-purple/15 transition-all p-2 shadow-xl shadow-brand-dark/5">
                <div className="pl-3 pr-2 text-brand-purple">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  id="hero-search-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={displayedPlaceholder || "Descreva o que você está sentindo..."}
                  className="w-full px-2 py-2.5 text-brand-dark bg-transparent placeholder-brand-dark/45 focus:outline-none text-sm sm:text-base font-sans font-medium"
                />
                <button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="bg-brand-dark hover:bg-brand-purple disabled:opacity-50 text-brand-cream px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 shrink-0 shadow-md hover:shadow-lg hover:scale-105"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
                      <span>Buscando...</span>
                    </>
                  ) : (
                    <>
                      <span>Buscar</span>
                      <ArrowRight className="w-4 h-4 text-brand-gold" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* BANNER DE INTENÇÃO IDENTIFICADA */}
            {matchedIntent && (
              <div className="mt-3.5 p-3.5 bg-white/95 backdrop-blur-md rounded-2xl border border-brand-gold/80 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn text-left">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-purple/15 text-brand-purple flex items-center justify-center shrink-0 font-bold">
                    ✨
                  </div>
                  <div>
                    <div className="text-[10px] text-brand-purple font-semibold uppercase tracking-wider">
                      Intenção Identificada ({Math.round(matchedIntent.confidence * 100)}% de precisão):
                    </div>
                    <div className="text-sm sm:text-base font-bold text-brand-dark font-serif">
                      {matchedIntent.name}
                    </div>
                  </div>
                </div>

                {/* Feedback do usuário */}
                {feedbackSent === null && onSendFeedback && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-brand-dark/70 hidden sm:inline">Era isso que buscava?</span>
                    <button
                      onClick={() => {
                        setFeedbackSent(true);
                        onSendFeedback(true);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-medium flex items-center gap-1 transition"
                    >
                      <Check className="w-3 h-3" />
                      <span>Sim</span>
                    </button>
                    <button
                      onClick={() => {
                        setFeedbackSent(false);
                        onSendFeedback(false);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-900 font-medium flex items-center gap-1 transition"
                    >
                      <X className="w-3 h-3" />
                      <span>Não</span>
                    </button>
                  </div>
                )}

                {feedbackSent !== null && (
                  <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Obrigado! Associação refinada no sistema.</span>
                  </div>
                )}
              </div>
            )}

            {/* BUSCAS POPULARES */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-brand-dark/75 mr-1">Buscas populares:</span>
              {POPULAR_SEARCHES.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChipClick(item.query)}
                  className="text-xs bg-white/90 hover:bg-brand-dark hover:text-brand-cream text-brand-dark border border-brand-gold/60 px-3 py-1 rounded-full transition-all duration-200 shadow-sm hover:shadow"
                >
                  {item.label}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* COLUNA DA DIREITA: CARD COM FLOR DE LIS */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-sm bg-white/95 backdrop-blur-md rounded-3xl p-7 border-2 border-brand-gold/60 shadow-2xl shadow-brand-dark/10 flex flex-col items-center text-center transition-transform duration-300 hover:scale-[1.02]">
            
            {/* Símbolo Flor de Lis */}
            <div className="w-14 h-14 rounded-2xl bg-brand-gold/20 text-brand-purple flex items-center justify-center border border-brand-gold/40 shadow-inner mb-4">
              <svg 
                className="w-8 h-8 text-brand-dark fill-current" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C11.5 4 10.2 6.5 8 7.5C9.5 8.5 10.5 10 10.5 12C10.5 12.8 10.2 13.5 9.8 14.1C9.2 13.8 8.6 13.6 8 13.6C5.8 13.6 4 15.4 4 17.6C4 18.9 4.6 20.1 5.6 20.8C4.5 20.9 2 20.2 2 17C2 13.5 5.5 10.5 8 9.5C6.5 8.5 5.5 7 5.5 5C5.5 4.5 5.6 4 5.8 3.5C5.1 4.3 4.5 5.3 4.5 6.5C4.5 9 6.5 11 9 11C9.3 11 9.7 10.9 10 10.8C9.5 9.5 9.5 7.5 12 2ZM12 2C12.5 4 13.8 6.5 16 7.5C14.5 8.5 13.5 10 13.5 12C13.5 12.8 13.8 13.5 14.2 14.1C14.8 13.8 15.4 13.6 16 13.6C18.2 13.6 20 15.4 20 17.6C20 18.9 19.4 20.1 18.4 20.8C19.5 20.9 22 20.2 22 17C22 13.5 18.5 10.5 16 9.5C17.5 8.5 18.5 7 18.5 5C18.5 4.5 18.4 4 18.2 3.5C18.9 4.3 19.5 5.3 19.5 6.5C19.5 9 17.5 11 15 11C14.7 11 14.3 10.9 14 10.8C14.5 9.5 14.5 7.5 12 2ZM12 13C11.4 13 11 13.4 11 14V21C11 21.6 11.4 22 12 22C12.6 22 13 21.6 13 21V14C13 13.4 12.6 13 12 13Z"/>
              </svg>
            </div>

            {/* Título do Card */}
            <h3 className="font-serif font-bold text-xl text-brand-dark leading-snug">
              Não sabe o que procurar?
            </h3>

            {/* Texto Descritivo */}
            <p className="text-xs sm:text-sm text-brand-dark/75 mt-2.5 leading-relaxed font-sans">
              Descubra artigos relacionados à sua intenção e receba orientações.
            </p>

            {/* Linha Divisória */}
            <div className="w-12 h-[1px] bg-brand-gold/60 my-5"></div>

            {/* Botão Buscar Agora */}
            <button
              onClick={handleFocusSearch}
              className="w-full bg-brand-dark hover:bg-brand-purple text-brand-cream py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow hover:shadow-md"
            >
              <span>Buscar agora</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};
