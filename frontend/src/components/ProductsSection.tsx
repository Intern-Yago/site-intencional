'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Check, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { LotusDivider } from './LotusDivider';
import { ALL_PRODUCTS, CatalogProduct } from '@/data/products';

interface ProductsSectionProps {
  onAddToCart?: (productName: string) => void;
  activeIntentionTab?: string | null;
}

const TABS = [
  { label: 'Proteção', slug: 'protecao' },
  { label: 'Prosperidade', slug: 'prosperidade' },
  { label: 'Limpeza', slug: 'limpeza' },
  { label: 'Amor', slug: 'amor' },
  { label: 'Paz', slug: 'paz' }
];

export const ProductsSection: React.FC<ProductsSectionProps> = ({ 
  onAddToCart, 
  activeIntentionTab 
}) => {
  const [activeTabSlug, setActiveTabSlug] = useState('protecao');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [addedId, setAddedId] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Sincroniza a aba ativa quando uma busca semântica é realizada
  useEffect(() => {
    if (activeIntentionTab) {
      const match = TABS.find(t => t.slug === activeIntentionTab || activeIntentionTab.includes(t.slug));
      if (match) {
        setActiveTabSlug(match.slug);
      }
    }
  }, [activeIntentionTab]);

  const activeTabObj = TABS.find(t => t.slug === activeTabSlug) || TABS[0];
  const filteredProducts = ALL_PRODUCTS.filter(p => p.intentions.includes(activeTabSlug));

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const handleBuy = (product: CatalogProduct) => {
    setAddedId(product.id);
    if (onAddToCart) onAddToCart(product.name);
    setTimeout(() => setAddedId(null), 1500);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
    <section id="produtos" className="py-14 sm:py-16 px-4 sm:px-8 max-w-site mx-auto w-full flex flex-col items-center">
      
      {/* Título Centralizado com Flor de Lótus (100% no meio) */}
      <div className="text-center w-full max-w-xl mx-auto mb-6 flex flex-col items-center justify-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-dark font-serif text-center">
          Mais procurados para você
        </h2>
        <LotusDivider className="my-2.5" />
      </div>

      {/* Abas Centralizadas no Meio */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none max-w-full">
        {TABS.map(tab => (
          <button
            key={tab.slug}
            onClick={() => setActiveTabSlug(tab.slug)}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
              activeTabSlug === tab.slug
                ? 'bg-brand-dark text-brand-cream shadow-md scale-105'
                : 'bg-white text-brand-dark/80 hover:bg-brand-gold/20 border border-brand-gold/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Carrossel de Produtos Compacto */}
      <div className="relative group/carousel w-full px-1 sm:px-4">
        
        {/* Botão Esquerda */}
        <button
          onClick={() => scroll('left')}
          className="hidden sm:flex absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-brand-gold/60 text-brand-dark shadow-md items-center justify-center hover:bg-brand-dark hover:text-white transition-all hover:scale-105"
          aria-label="Rolar produtos para a esquerda"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Área de Rolagem do Carrossel */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex items-stretch gap-4 overflow-x-auto py-3 select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {filteredProducts.map((product) => {
            const isFav = favorites.includes(product.id);
            const isAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                className="shrink-0 w-[180px] sm:w-[210px] lg:w-[230px] bg-white rounded-2xl border border-brand-gold/40 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Imagem */}
                <div className="relative aspect-square overflow-hidden bg-brand-cream/30">
                  <Link href={`/produtos/${product.slug}`} className="block w-full h-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Coração Favoritar */}
                  <button
                    onClick={(e) => toggleFavorite(e, product.id)}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow hover:scale-110 transition text-brand-dark z-10"
                    aria-label="Favoritar produto"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        isFav ? 'fill-rose-500 text-rose-500' : 'text-brand-dark/70 hover:text-rose-500'
                      }`}
                    />
                  </button>

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-2.5 left-2.5 bg-brand-dark/85 backdrop-blur-md text-brand-gold text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Info Compacta */}
                <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between">
                  <div>
                    <Link href={`/produtos/${product.slug}`}>
                      <h3 className="font-serif font-bold text-brand-dark text-xs sm:text-sm leading-snug line-clamp-2 hover:text-brand-purple transition">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="mt-1">
                      <span className="inline-block bg-brand-gold/20 text-brand-purple text-[9px] font-semibold px-2 py-0.5 rounded">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Preço e Botão */}
                  <div className="mt-3 pt-2 border-t border-brand-gold/20 flex items-center justify-between gap-1.5">
                    <div>
                      {product.promotional_price ? (
                        <div className="flex flex-col">
                          <span className="text-[9px] text-brand-dark/40 line-through font-sans leading-none">
                            R$ {product.price.toFixed(2).replace('.', ',')}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-brand-dark font-sans leading-tight">
                            R$ {product.promotional_price.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs sm:text-sm font-bold text-brand-dark font-sans">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleBuy(product)}
                      className={`p-2 rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-brand-dark hover:bg-brand-purple text-brand-cream'
                      }`}
                      title="Comprar"
                    >
                      {isAdded ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <ShoppingBag className="w-3.5 h-3.5 text-brand-gold" />
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Botão Direita */}
        <button
          onClick={() => scroll('right')}
          className="hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-brand-gold/60 text-brand-dark shadow-md items-center justify-center hover:bg-brand-dark hover:text-white transition-all hover:scale-105"
          aria-label="Rolar produtos para a direita"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* BOTÃO VER MAIS / CATÁLOGO COMPLETO */}
      <div className="mt-8 text-center">
        <Link
          href={`/produtos?intencao=${activeTabSlug}`}
          className="inline-flex items-center gap-2 bg-white hover:bg-brand-dark hover:text-brand-cream text-brand-dark border-2 border-brand-gold/70 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 group"
        >
          <span>Ver catálogo completo de {activeTabObj.label}</span>
          <ArrowRight className="w-3.5 h-3.5 text-brand-gold group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </section>
  );
};
