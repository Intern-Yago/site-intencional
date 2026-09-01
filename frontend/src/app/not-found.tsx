'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F6F1EB] text-brand-dark px-4 text-center">
      <h1 className="text-6xl font-bold font-serif text-brand-purple">404</h1>
      <h2 className="text-2xl font-bold font-serif mt-2">Página não encontrada</h2>
      <p className="text-sm text-brand-dark/70 mt-2 max-w-md">
        O caminho que você buscou não foi encontrado ou foi movido.
      </p>
      <Link
        href="/"
        className="mt-6 bg-brand-dark text-brand-cream px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-purple transition"
      >
        Voltar para o Início
      </Link>
    </div>
  );
}
