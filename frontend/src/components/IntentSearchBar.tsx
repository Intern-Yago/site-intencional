'use client';

import React, { useState } from 'react';
import { Search, Sparkles, Check, X, ArrowRight, Loader2 } from 'lucide-react';

interface MatchedIntent {
  id: number;
  name: string;
  slug: string;
  confidence: number;
  source: string;
}

interface IntentSearchBarProps {
  onSearch: (query: string) => Promise<void>;
  matchedIntent: MatchedIntent | null;
  isLoading: boolean;
  onSendFeedback?: (isCorrect: boolean) => void;
}

const QUICK_INTENTS = [
  { label: '🛡️ Proteção & Defesa', query: 'Quero proteção contra inveja e energia negativa' },
  { label: '💰 Atrair Prosperidade', query: 'Quero abrir caminhos financeiros e atrair dinheiro' },
  { label: '✨ Descarrego & Limpeza', query: 'Preciso de um banho de descarrego e limpeza pesada' },
  { label: '💖 Amor & Harmonia', query: 'Quero melhorar a harmonia no relacionamento e amor próprio' },
  { label: '🕊️ Alívio da Ansiedade', query: 'Como acalmar a mente e dormir com paz' },
  { label: '🧠 Foco & Clareza', query: 'Preciso de clareza mental e foco para os estudos' },
];

export const IntentSearchBar: React.FC<IntentSearchBarProps> = ({
  onSearch,
  matchedIntent,
  isLoading,
  onSendFeedback,
}) => {
  const [query, setQuery] = useState('');
  const [feedbackSent, setFeedbackSent] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setFeedbackSent(null);
    onSearch(query);
  };

  const handleQuickClick = (q: string) => {
    setQuery(q);
    setFeedbackSent(null);
    onSearch(q);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Formulário de Busca */}
      <form onSubmit={handleSubmit} className="relative shadow-2xl rounded-2xl">
        <div className="flex items-center bg-white rounded-2xl border-2 border-spiritual-500/30 focus-within:border-spiritual-500 focus-within:ring-4 focus-within:ring-spiritual-500/10 transition-all p-2">
          <div className="pl-3 pr-2 text-spiritual-500">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Qual é a sua intenção ou o que você deseja atrair/proteger hoje?"
            className="w-full px-2 py-3 text-spiritual-900 bg-transparent placeholder-spiritual-500/60 focus:outline-none text-base sm:text-lg"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="bg-spiritual-900 hover:bg-spiritual-700 disabled:opacity-50 text-white px-6 py-3.5 rounded-xl font-medium text-sm flex items-center gap-2 transition shrink-0 shadow-md"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Buscando...</span>
              </>
            ) : (
              <>
                <span>Buscar</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Banner de Intenção Encontrada */}
      {matchedIntent && (
        <div className="mt-4 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-amber-200/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-lg">
              ✨
            </div>
            <div>
              <div className="text-xs text-spiritual-700 font-medium uppercase tracking-wider">
                Intenção Identificada ({Math.round(matchedIntent.confidence * 100)}% de precisão):
              </div>
              <div className="text-base font-bold text-spiritual-900">
                {matchedIntent.name}
              </div>
            </div>
          </div>

          {/* Feedback do Usuário */}
          {feedbackSent === null && onSendFeedback && (
            <div className="flex items-center gap-2 shrink-0 text-xs">
              <span className="text-spiritual-700 hidden sm:inline">Era isso que buscava?</span>
              <button
                onClick={() => {
                  setFeedbackSent(true);
                  onSendFeedback(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-medium flex items-center gap-1 transition"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Sim</span>
              </button>
              <button
                onClick={() => {
                  setFeedbackSent(false);
                  onSendFeedback(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 font-medium flex items-center gap-1 transition"
              >
                <X className="w-3.5 h-3.5" />
                <span>Não</span>
              </button>
            </div>
          )}

          {feedbackSent !== null && (
            <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>Obrigado! O sistema aprendeu com sua resposta.</span>
            </div>
          )}
        </div>
      )}

      {/* Sugestões de Intenções Rápidas */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-semibold text-spiritual-700 mr-1">Sugestões:</span>
        {QUICK_INTENTS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleQuickClick(item.query)}
            className="text-xs bg-white/70 hover:bg-white text-spiritual-900 border border-spiritual-200/80 px-3 py-1.5 rounded-full transition shadow-sm hover:shadow"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
