'use client';

import React from 'react';
import { Sparkles, ShoppingBag, Heart, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-spiritual-50/90 backdrop-blur-md border-b border-spiritual-200/60 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-spiritual-500 text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-spiritual-900 block leading-none font-serif">
              LUMINA
            </span>
            <span className="text-[11px] font-medium tracking-widest text-spiritual-700 uppercase">
              Catálogo Intencional
            </span>
          </div>
        </div>

        {/* Categorias Rápidas */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-spiritual-700">
          <a href="#intencoes" className="hover:text-spiritual-900 transition">Intenções</a>
          <a href="#produtos" className="hover:text-spiritual-900 transition">Catálogo Completo</a>
          <a href="#como-funciona" className="hover:text-spiritual-900 transition">Como Funciona</a>
        </nav>

        {/* Ações */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-spiritual-700 hover:text-spiritual-900 transition relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-600"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
