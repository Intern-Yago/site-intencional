'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Topbar } from '@/components/Topbar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LotusDivider } from '@/components/LotusDivider';
import { ALL_PRODUCTS, CatalogProduct, INTENTION_MAPPINGS } from '@/data/products';
import { 
  Search, 
  Filter, 
  Heart, 
  ShoppingBag, 
  Star, 
  Check, 
  ArrowLeft,
  X,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialIntention = searchParams.get('intencao') || '';
  const initialCategory = searchParams.get('categoria') || '';
  const initialQuery = searchParams.get('q') || '';

  const [selectedIntention, setSelectedIntention] = useState<string>(initialIntention);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [onlyPromotions, setOnlyPromotions] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [addedId, setAddedId] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  const categories = ['Cristais', 'Banhos', 'Incensos', 'Amuletos', 'Velas', 'Aromaterapia'];

  const intentionsList = [
    { slug: 'protecao', name: 'Proteção', icon: '🛡️' },
    { slug: 'prosperidade', name: 'Prosperidade', icon: '💰' },
    { slug: 'limpeza', name: 'Limpeza', icon: '🌿' },
    { slug: 'amor', name: 'Amor', icon: '❤️' },
    { slug: 'paz', name: 'Paz', icon: '🕊️' },
    { slug: 'espiritualidade', name: 'Espiritualidade', icon: '🪷' },
    { slug: 'abertura-caminhos', name: 'Abertura de Caminhos', icon: '🚪' },
    { slug: 'harmonia-lar', name: 'Harmonia para o Lar', icon: '🏠' }
  ];

  // Filtragem e Ordenação Reativa
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(p => {
      // Filtro por intenção
      if (selectedIntention && !p.intentions.includes(selectedIntention)) {
        return false;
      }
      // Filtro por categoria
      if (selectedCategory && p.category !== selectedCategory) {
        return false;
      }
      // Filtro por busca de texto
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = p.name.toLowerCase().includes(q) || 
                        p.description.toLowerCase().includes(q) ||
                        p.category.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // Filtro por promoção
      if (onlyPromotions && !p.promotional_price) {
        return false;
      }
      // Filtro por preço
      const currentPrice = p.promotional_price || p.price;
      if (selectedPriceRange === 'under-40' && currentPrice > 40) return false;
      if (selectedPriceRange === '40-80' && (currentPrice <= 40 || currentPrice > 80)) return false;
      if (selectedPriceRange === 'above-80' && currentPrice <= 80) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.promotional_price || a.price;
      const priceB = b.promotional_price || b.price;
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // relevance
    });
  }, [selectedIntention, selectedCategory, searchQuery, selectedPriceRange, onlyPromotions, sortBy]);

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product: CatalogProduct) => {
    setAddedId(product.id);
    setCartCount(prev => prev + 1);
    setTimeout(() => setAddedId(null), 1500);
  };

  const clearFilters = () => {
    setSelectedIntention('');
    setSelectedCategory('');
    setSearchQuery('');
    setSelectedPriceRange('all');
    setOnlyPromotions(false);
  };

  const activeIntentionObj = selectedIntention ? INTENTION_MAPPINGS[selectedIntention] : null;

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F1EB]">
      <Topbar />
      <Header cartCount={cartCount} />

      {/* Banner de Cabeçalho do Catálogo */}
      <section className="bg-gradient-to-b from-[#FAF7F4] via-[#F6F1EB] to-[#F6F1EB] py-10 px-4 sm:px-8 border-b border-brand-gold/30">
        <div className="max-w-site mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-purple mb-3">
            <Link href="/" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Início</span>
            </Link>
            <span>/</span>
            <span className="text-brand-dark/70">Catálogo de Produtos</span>
            {activeIntentionObj && (
              <>
                <span>/</span>
                <span className="text-brand-dark font-bold">{activeIntentionObj.name}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-brand-dark font-serif">
                {activeIntentionObj ? `${activeIntentionObj.icon} ${activeIntentionObj.name}` : 'Catálogo Completo'}
              </h1>
              <p className="text-xs sm:text-sm text-brand-dark/75 mt-1.5 font-sans">
                {activeIntentionObj 
                  ? `Artigos consagrados e selecionados especialmente para canalizar ${activeIntentionObj.name.toLowerCase()}.`
                  : 'Explore nossos cristais autênticos, banhos de ervas, incensos naturais e amuletos.'}
              </p>
            </div>

            {/* Barra de Busca Rápida no Catálogo */}
            <div className="w-full md:w-80 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar no catálogo..."
                className="w-full bg-white px-4 py-2.5 pl-10 rounded-xl border border-brand-gold/60 text-xs sm:text-sm text-brand-dark placeholder-brand-dark/40 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/15 transition shadow-sm"
              />
              <Search className="w-4 h-4 text-brand-dark/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-dark/40 hover:text-brand-dark"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Corpo Principal: Sidebar + Grid */}
      <main className="max-w-site mx-auto px-4 sm:px-8 py-8 flex-1 w-full">
        
        {/* Barra Superior de Controles e Mobile Filter Toggle */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-brand-gold/30 text-xs text-brand-dark/80">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-brand-gold/60 font-semibold shadow-sm text-brand-dark"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filtros</span>
            </button>
            <span className="font-medium text-brand-dark">
              <strong>{filteredProducts.length}</strong> produtos encontrados
            </span>
          </div>

          {/* Ordenação */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-brand-dark/70 font-medium">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-brand-gold/60 text-brand-dark text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-brand-purple shadow-sm font-medium"
            >
              <option value="relevance">Mais Relevantes</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="rating">Melhores Avaliações</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SIDEBAR DE FILTROS (DESKTOP) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-2xl p-6 border border-brand-gold/40 shadow-sm sticky top-24">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-brand-gold/30">
              <h3 className="font-serif font-bold text-base text-brand-dark flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-brand-purple" />
                <span>Filtrar Catálogo</span>
              </h3>
              {(selectedIntention || selectedCategory || searchQuery || selectedPriceRange !== 'all' || onlyPromotions) && (
                <button
                  onClick={clearFilters}
                  className="text-[11px] font-bold text-brand-purple hover:underline"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* 1. Filtro por Intenção */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark/70 mb-3">
                Intenção Espiritual
              </h4>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setSelectedIntention('')}
                  className={`text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    selectedIntention === ''
                      ? 'bg-brand-dark text-brand-cream shadow-sm'
                      : 'text-brand-dark/80 hover:bg-brand-cream'
                  }`}
                >
                  ✨ Todas as Intenções
                </button>
                {intentionsList.map(item => (
                  <button
                    key={item.slug}
                    onClick={() => setSelectedIntention(item.slug === selectedIntention ? '' : item.slug)}
                    className={`text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                      selectedIntention === item.slug
                        ? 'bg-brand-dark text-brand-cream shadow-sm'
                        : 'text-brand-dark/80 hover:bg-brand-cream'
                    }`}
                  >
                    <span>{item.icon} {item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Filtro por Categoria */}
            <div className="mb-6 pt-4 border-t border-brand-gold/20">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark/70 mb-3">
                Categoria
              </h4>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    selectedCategory === ''
                      ? 'bg-brand-purple text-white shadow-sm'
                      : 'text-brand-dark/80 hover:bg-brand-cream'
                  }`}
                >
                  Todas as Categorias
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
                    className={`text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      selectedCategory === cat
                        ? 'bg-brand-purple text-white shadow-sm'
                        : 'text-brand-dark/80 hover:bg-brand-cream'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Filtro por Faixa de Preço */}
            <div className="mb-6 pt-4 border-t border-brand-gold/20">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark/70 mb-3">
                Faixa de Preço
              </h4>
              <div className="space-y-2 text-xs text-brand-dark/80">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={selectedPriceRange === 'all'}
                    onChange={() => setSelectedPriceRange('all')}
                    className="accent-brand-purple"
                  />
                  <span>Todos os Preços</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={selectedPriceRange === 'under-40'}
                    onChange={() => setSelectedPriceRange('under-40')}
                    className="accent-brand-purple"
                  />
                  <span>Até R$ 40,00</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={selectedPriceRange === '40-80'}
                    onChange={() => setSelectedPriceRange('40-80')}
                    className="accent-brand-purple"
                  />
                  <span>R$ 40,00 a R$ 80,00</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={selectedPriceRange === 'above-80'}
                    onChange={() => setSelectedPriceRange('above-80')}
                    className="accent-brand-purple"
                  />
                  <span>Acima de R$ 80,00</span>
                </label>
              </div>
            </div>

            {/* 4. Apenas Promoções */}
            <div className="pt-4 border-t border-brand-gold/20">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-brand-dark">
                <input
                  type="checkbox"
                  checked={onlyPromotions}
                  onChange={(e) => setOnlyPromotions(e.target.checked)}
                  className="rounded accent-brand-purple w-4 h-4"
                />
                <span>Apenas produtos em oferta 🔥</span>
              </label>
            </div>
          </aside>

          {/* GRID DE PRODUTOS */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-brand-gold/40 shadow-sm flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-brand-gold/20 text-brand-purple flex items-center justify-center mb-3">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-xl text-brand-dark">
                  Nenhum produto encontrado
                </h3>
                <p className="text-xs sm:text-sm text-brand-dark/70 mt-1.5 max-w-sm font-sans">
                  Não encontramos artigos correspondentes aos filtros selecionados. Tente limpar os filtros para ver todo o catálogo.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-5 bg-brand-dark text-brand-cream px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-purple transition shadow"
                >
                  Limpar Todos os Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => {
                  const isFav = favorites.includes(product.id);
                  const isAdded = addedId === product.id;
                  const finalPrice = product.promotional_price || product.price;
                  const pixPrice = (finalPrice * 0.95).toFixed(2).replace('.', ',');

                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl border border-brand-gold/40 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Imagem Superior */}
                      <div className="relative aspect-square overflow-hidden bg-brand-cream/30">
                        <Link href={`/produtos/${product.slug}`} className="block w-full h-full">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </Link>

                        {/* Botão Favoritar */}
                        <button
                          onClick={(e) => toggleFavorite(e, product.id)}
                          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow hover:scale-110 transition text-brand-dark z-10"
                          aria-label="Favoritar"
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors ${
                              isFav ? 'fill-rose-500 text-rose-500' : 'text-brand-dark/70 hover:text-rose-500'
                            }`}
                          />
                        </button>

                        {/* Badges */}
                        {product.badge && (
                          <div className="absolute top-2.5 left-2.5 bg-brand-dark/90 backdrop-blur-md text-brand-gold text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
                            {product.badge}
                          </div>
                        )}
                        {product.promotional_price && (
                          <div className="absolute top-2.5 left-2.5 bg-amber-700 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
                            OFERTA
                          </div>
                        )}
                      </div>

                      {/* Informações */}
                      <div className="p-4 flex flex-col flex-1 justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-brand-purple font-medium mb-1">
                            <span>{product.category}</span>
                            <div className="flex items-center gap-1 text-amber-500 font-semibold">
                              <Star className="w-3.5 h-3.5 fill-amber-400" />
                              <span>{product.rating}</span>
                              <span className="text-brand-dark/40 text-[10px]">({product.reviews_count})</span>
                            </div>
                          </div>

                          <Link href={`/produtos/${product.slug}`}>
                            <h3 className="font-serif font-bold text-brand-dark text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-brand-purple transition-colors">
                              {product.name}
                            </h3>
                          </Link>

                          {/* Tags de Intenção */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {product.intentions.slice(0, 2).map(intentSlug => (
                              <button
                                key={intentSlug}
                                onClick={() => setSelectedIntention(intentSlug)}
                                className="bg-brand-gold/25 text-brand-purple text-[9px] font-bold px-2 py-0.5 rounded capitalize hover:bg-brand-purple hover:text-white transition"
                              >
                                {intentSlug.replace('-', ' ')}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Preço e Compra */}
                        <div className="mt-4 pt-3 border-t border-brand-gold/20 flex flex-col gap-2.5">
                          <div>
                            {product.promotional_price ? (
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-xs text-brand-dark/40 line-through font-sans">
                                  R$ {product.price.toFixed(2).replace('.', ',')}
                                </span>
                                <span className="text-base sm:text-lg font-bold text-brand-dark font-sans">
                                  R$ {product.promotional_price.toFixed(2).replace('.', ',')}
                                </span>
                              </div>
                            ) : (
                              <span className="text-base sm:text-lg font-bold text-brand-dark font-sans">
                                R$ {product.price.toFixed(2).replace('.', ',')}
                              </span>
                            )}
                            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                              R$ {pixPrice} no PIX (5% OFF)
                            </div>
                          </div>

                          <button
                            onClick={() => handleAddToCart(product)}
                            className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow ${
                              isAdded
                                ? 'bg-emerald-600 text-white'
                                : 'bg-brand-dark hover:bg-brand-purple text-brand-cream hover:shadow-md'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Adicionado</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3.5 h-3.5 text-brand-gold" />
                                <span>Adicionar</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </main>

      {/* MODAL DE FILTROS MOBILE */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-brand-gold/30">
                <h3 className="font-serif font-bold text-lg text-brand-dark">Filtros</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 text-brand-dark hover:text-brand-purple"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Intenções */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase text-brand-dark/70 mb-2">Intenções</h4>
                <div className="flex flex-col gap-1">
                  {intentionsList.map(item => (
                    <button
                      key={item.slug}
                      onClick={() => setSelectedIntention(item.slug === selectedIntention ? '' : item.slug)}
                      className={`text-left px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        selectedIntention === item.slug ? 'bg-brand-dark text-white' : 'text-brand-dark/80'
                      }`}
                    >
                      {item.icon} {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categorias */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase text-brand-dark/70 mb-2">Categorias</h4>
                <div className="flex flex-col gap-1">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
                      className={`text-left px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        selectedCategory === cat ? 'bg-brand-purple text-white' : 'text-brand-dark/80'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full bg-brand-dark text-white py-3 rounded-xl font-bold text-xs uppercase"
            >
              Ver {filteredProducts.length} Resultados
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F6F1EB] text-brand-dark">Carregando catálogo...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
