'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingBag, Sparkles, Menu, X, Compass } from 'lucide-react';
import { GlobalIntentModal } from '@/components/GlobalIntentModal';

interface HeaderProps {
  onSearchIconClick?: () => void;
  cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ onSearchIconClick, cartCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [intentModalOpen, setIntentModalOpen] = useState(false);

  const handleOpenSearch = () => {
    if (onSearchIconClick) {
      onSearchIconClick();
    } else {
      setIntentModalOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F6F1EB]/95 backdrop-blur-md border-b border-[#D9C7A7]/40 px-4 sm:px-8 py-3 transition-all">
        <div className="max-w-site mx-auto flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Botão Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-brand-dark hover:text-brand-purple"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer shrink-0">
            <div className="w-9 h-9 rounded-full bg-brand-dark text-brand-gold flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-brand-dark font-serif leading-none">
                Luz & Caminho
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-brand-purple uppercase mt-0.5">
                Artigos Espirituais
              </span>
            </div>
          </Link>

          {/* BARRA DE BUSCA DE INTENÇÕES DIRETO NO HEADER (DESKTOP) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <button
              onClick={() => setIntentModalOpen(true)}
              className="w-full flex items-center justify-between bg-white/90 hover:bg-white border border-brand-gold/60 hover:border-brand-purple px-4 py-2 rounded-full text-xs text-brand-dark/60 shadow-sm hover:shadow transition group"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-brand-purple group-hover:scale-110 transition-transform" />
                <span className="text-brand-dark/70 font-medium">Qual é sua intenção espiritual hoje?</span>
              </div>
              <span className="bg-brand-gold/25 text-brand-purple font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> IA
              </span>
            </button>
          </div>

          {/* MENU DESKTOP */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-brand-dark/80 shrink-0">
            <Link href="/" className="hover:text-brand-purple transition-colors">Início</Link>
            <button
              onClick={() => setIntentModalOpen(true)}
              className="hover:text-brand-purple transition-colors font-bold text-brand-purple flex items-center gap-1 bg-brand-gold/20 hover:bg-brand-gold/40 px-2.5 py-1 rounded-full text-xs"
            >
              <Sparkles className="w-3 h-3 text-brand-purple" />
              <span>Intenções IA</span>
            </button>
            <Link href="/produtos" className="hover:text-brand-purple transition-colors">Catálogo</Link>
            <Link href="/artigos" className="hover:text-brand-purple transition-colors">Artigos</Link>
            <Link href="/admin" className="hover:text-brand-purple transition-colors text-[11px] font-semibold text-brand-dark/60">Admin</Link>
          </nav>

          {/* ÍCONES DE AÇÃO */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={handleOpenSearch}
              className="p-2 text-brand-dark hover:text-brand-purple hover:bg-brand-gold/20 rounded-full transition flex items-center gap-1"
              title="Buscar por Intenção (IA)"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <Link
              href="/admin"
              className="p-2 text-brand-dark hover:text-brand-purple hover:bg-brand-gold/20 rounded-full transition hidden sm:flex"
              title="Painel de Gestão"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            <Link
              href="/produtos"
              className="p-2 text-brand-dark hover:text-brand-purple hover:bg-brand-gold/20 rounded-full transition relative flex items-center justify-center"
              title="Carrinho de Compras"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-brand-purple text-white text-[10px] font-bold flex items-center justify-center animate-scaleUp">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* MENU MOBILE EXPANDIDO */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-brand-gold/30 flex flex-col gap-2.5 pb-2 text-xs sm:text-sm font-medium text-brand-dark animate-fadeIn">
            {/* Input de Intenção Rápida Mobile */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIntentModalOpen(true);
              }}
              className="w-full flex items-center justify-between bg-white border border-brand-gold/70 px-3.5 py-2 rounded-xl text-xs text-brand-dark font-medium shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-brand-purple" />
                <span>Buscar por Intenção com IA...</span>
              </div>
              <span className="bg-brand-purple text-white font-bold text-[10px] px-2 py-0.5 rounded-full">IA</span>
            </button>

            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-brand-purple">Início</Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIntentModalOpen(true);
              }}
              className="text-left py-1 font-bold text-brand-purple flex items-center gap-1.5"
            >
              ✨ Guia de Intenções (IA)
            </button>
            <Link href="/produtos" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-brand-purple">Catálogo Completo</Link>
            <Link href="/artigos" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-brand-purple">Artigos & Guias</Link>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-brand-purple text-xs text-brand-dark/70">Painel Administrativo</Link>
          </div>
        )}
      </header>

      {/* BOTÃO FLUTUANTE GLOBAL: GUIA DE INTENÇÕES POR IA EM QUALQUER LUGAR */}
      <button
        onClick={() => setIntentModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-brand-dark via-brand-purple to-brand-dark text-brand-gold hover:text-white px-4 py-3 rounded-full shadow-2xl border-2 border-brand-gold/60 flex items-center gap-2.5 font-serif font-bold text-xs sm:text-sm hover:scale-105 transition-all duration-300 group cursor-pointer"
        aria-label="Buscar Intenção com IA"
      >
        <div className="w-6 h-6 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center font-bold text-xs group-hover:rotate-12 transition-transform">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <span className="text-white tracking-wide drop-shadow-sm">Buscar Intenção (IA)</span>
      </button>

      {/* MODAL GLOBAL DE INTENÇÕES */}
      <GlobalIntentModal
        isOpen={intentModalOpen}
        onClose={() => setIntentModalOpen(false)}
      />
    </>
  );
};

