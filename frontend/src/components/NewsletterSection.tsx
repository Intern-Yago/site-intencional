'use client';

import React, { useState } from 'react';
import { Mail, Check, Sparkles } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="py-16 px-4 sm:px-8 bg-brand-cream border-t border-brand-gold/40">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-12 h-12 rounded-full bg-brand-gold/30 text-brand-purple flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark font-serif">
          Receba conteúdos e novidades
        </h2>

        <p className="text-xs sm:text-sm text-brand-dark/75 mt-2 leading-relaxed font-sans">
          Assine nossa newsletter e receba dicas, artigos sobre cristais, fases da lua e ofertas exclusivas direto no seu e-mail.
        </p>

        {subscribed ? (
          <div className="mt-6 p-4 rounded-xl bg-emerald-100 text-emerald-900 text-sm font-semibold flex items-center justify-center gap-2 animate-fadeIn">
            <Check className="w-5 h-5 text-emerald-600" />
            <span>Gratidão! Sua inscrição foi realizada com sucesso.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu melhor e-mail..."
              className="flex-1 px-4 py-3 rounded-xl bg-white border border-brand-gold/60 text-brand-dark text-sm placeholder-brand-dark/40 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition"
            />
            <button
              type="submit"
              className="bg-brand-dark hover:bg-brand-purple text-brand-cream px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition shrink-0 shadow-md"
            >
              Inscrever-se
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
