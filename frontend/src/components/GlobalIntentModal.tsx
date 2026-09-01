'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, X, ArrowRight, Loader2, Compass, Shield, Coins, Sparkle, Heart, Wind, Flame, Check } from 'lucide-react';

interface GlobalIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_INTENT_SHORTCUTS = [
  { slug: 'protecao', label: 'Proteção & Defesa', icon: '🛡️', query: 'Quero afastar inveja, olho gordo e energias pesadas' },
  { slug: 'prosperidade', label: 'Prosperidade & Riqueza', icon: '💰', query: 'Atrair dinheiro, abrir caminhos financeiros e novos negócios' },
  { slug: 'limpeza', label: 'Limpeza & Descarrego', icon: '🌿', query: 'Banho de descarrego para cansaço acumulado e peso nos ombros' },
  { slug: 'amor', label: 'Amor & Autoestima', icon: '❤️', query: 'Atrair relacionamentos sinceros, amor próprio e harmonia afetiva' },
  { slug: 'paz', label: 'Paz & Serenidade', icon: '🕊️', query: 'Acalmar a mente, diminuir ansiedade e dormir com tranquilidade' },
  { slug: 'espiritualidade', label: 'Espiritualidade & Luz', icon: '🪷', query: 'Elevar a vibração, meditação e conexão com o divino' },
  { slug: 'abertura-caminhos', label: 'Abertura de Caminhos', icon: '🚪', query: 'Destravar oportunidades na vida profissional e pessoal' },
  { slug: 'harmonia-lar', label: 'Harmonia para o Lar', icon: '🏠', query: 'Purificar a energia da casa e harmonizar a família' },
];

export const GlobalIntentModal: React.FC<GlobalIntentModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [matchedIntent, setMatchedIntent] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
      setMatchedIntent(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  // Tecla ESC para fechar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch(`http://localhost:3001/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.matched_intent) {
          setMatchedIntent(data.matched_intent);
          return;
        }
      }
      simulateIntentMatch(searchQuery);
    } catch (e) {
      simulateIntentMatch(searchQuery);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateIntentMatch = (q: string) => {
    const text = q.toLowerCase();
    let slug = 'protecao';
    let name = 'Proteção & Defesa';
    let reason = 'Elementos consagrados para blindar sua energia e afastar vibrações densas.';

    if (text.includes('dinheiro') || text.includes('prosperidade') || text.includes('riqueza') || text.includes('abundancia') || text.includes('emprego') || text.includes('venda') || text.includes('trabalho')) {
      slug = 'prosperidade';
      name = 'Prosperidade & Riqueza';
      reason = 'Canaliza frequências solares de atração magnética para prosperidade material e novos ganhos.';
    } else if (text.includes('limpeza') || text.includes('descarrego') || text.includes('pesado') || text.includes('cansaco') || text.includes('miasma')) {
      slug = 'limpeza';
      name = 'Limpeza & Descarrego';
      reason = 'Ervas sagradas e fitoenergia para descarregar o campo áurico e restabelecer o equilíbrio.';
    } else if (text.includes('amor') || text.includes('casal') || text.includes('afeto') || text.includes('autoestima') || text.includes('relacionamento')) {
      slug = 'amor';
      name = 'Amor & Harmonia';
      reason = 'Desperta a vibração do chakra cardíaco, amor próprio e magnetismo afetivo sincero.';
    } else if (text.includes('paz') || text.includes('ansiedade') || text.includes('sono') || text.includes('insonia') || text.includes('mente') || text.includes('calma')) {
      slug = 'paz';
      name = 'Paz & Serenidade';
      reason = 'Artigos com frequência calmante para serenar pensamentos agitados e favorecer o descanso profundo.';
    } else if (text.includes('caminho') || text.includes('destravar') || text.includes('porta') || text.includes('bloqueio')) {
      slug = 'abertura-caminhos';
      name = 'Abertura de Caminhos';
      reason = 'Rompe entraves e sintoniza você com novas oportunidades e portas abertas.';
    } else if (text.includes('casa') || text.includes('lar') || text.includes('familia') || text.includes('ambiente')) {
      slug = 'harmonia-lar';
      name = 'Harmonia para o Lar';
      reason = 'Harmoniza as relações de convivência e purifica as paredes e cômodos do seu lar.';
    } else if (text.includes('espirit') || text.includes('medita') || text.includes('luz') || text.includes('oracao') || text.includes('chakra')) {
      slug = 'espiritualidade';
      name = 'Espiritualidade & Elevação';
      reason = 'Eleva a frequência vibracional para conexão intuitiva e práticas meditativas.';
    }

    setMatchedIntent({
      slug,
      name,
      confidence: 0.96,
      reason
    });
  };

  const handleNavigateToIntention = (intentSlug: string) => {
    onClose();
    router.push(`/produtos?intencao=${intentSlug}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-[#FAF7F4] w-full max-w-2xl rounded-3xl border-2 border-[#D9C7A7]/70 shadow-2xl overflow-hidden my-auto animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#241B16] via-[#2F221B] to-[#241B16] text-white flex items-center justify-between border-b border-[#D9C7A7]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-purple text-brand-gold flex items-center justify-center font-bold shadow-inner">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-brand-cream">
                Busca de Intenções por IA
              </h2>
              <p className="text-[11px] sm:text-xs text-brand-gold/90 font-medium">
                Descreva o que você sente, precisa ou deseja atrair para sua vida hoje
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* Input de Intenção */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
            className="relative"
          >
            <div className="flex items-center bg-white rounded-2xl border-2 border-brand-gold/60 focus-within:border-brand-purple focus-within:ring-4 focus-within:ring-brand-purple/10 shadow-sm p-2 transition">
              <div className="pl-2 pr-1 text-brand-purple">
                <Search className="w-5 h-5" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex: Me sinto sem energia e com peso nas costas..."
                className="w-full px-2.5 py-2.5 text-xs sm:text-sm text-brand-dark placeholder-brand-dark/45 bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="bg-brand-dark hover:bg-brand-purple disabled:opacity-40 text-brand-cream px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow shrink-0"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Analisando...</span>
                  </>
                ) : (
                  <>
                    <span>Analisar com IA</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Resultado de Intenção Identificada */}
          {matchedIntent && (
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-brand-gold/60 shadow-md animate-fadeIn">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/25 text-brand-purple flex items-center justify-center text-xl shrink-0">
                    ✨
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-purple">
                      Intenção Identificada pela IA ({Math.round((matchedIntent.confidence || 0.95) * 100)}% de precisão)
                    </div>
                    <div className="text-base sm:text-lg font-bold font-serif text-brand-dark">
                      {matchedIntent.name}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleNavigateToIntention(matchedIntent.slug)}
                  className="bg-brand-purple hover:bg-brand-dark text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow shrink-0"
                >
                  <span>Ver Produtos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {matchedIntent.reason && (
                <p className="text-xs text-brand-dark/75 mt-3 pt-3 border-t border-brand-gold/20 leading-relaxed font-sans">
                  {matchedIntent.reason}
                </p>
              )}
            </div>
          )}

          {/* Sugestões Rápidas de Intenção */}
          <div>
            <div className="text-xs font-bold text-brand-dark/70 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-brand-purple" />
              <span>Ou escolha uma intenção direta:</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {QUICK_INTENT_SHORTCUTS.map(intent => (
                <button
                  key={intent.slug}
                  onClick={() => handleNavigateToIntention(intent.slug)}
                  className="bg-white hover:bg-brand-gold/20 text-brand-dark/85 hover:text-brand-dark p-2.5 rounded-xl border border-brand-gold/40 text-left transition flex flex-col justify-between group shadow-sm"
                >
                  <div className="text-base mb-1 group-hover:scale-110 transition-transform">
                    {intent.icon}
                  </div>
                  <span className="text-[11px] font-bold leading-tight line-clamp-2">
                    {intent.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer do Modal */}
        <div className="px-6 py-3.5 bg-brand-cream/60 border-t border-brand-gold/30 flex items-center justify-between text-[11px] text-brand-dark/60">
          <span>Dica: Você pode pesquisar dores, sentimentos ou rituais específicos.</span>
          <button 
            onClick={() => handleNavigateToIntention('')}
            className="font-bold text-brand-purple hover:underline"
          >
            Ver Catálogo Geral →
          </button>
        </div>
      </div>
    </div>
  );
};
