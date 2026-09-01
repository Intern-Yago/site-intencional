'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Topbar } from '@/components/Topbar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LotusDivider } from '@/components/LotusDivider';
import { ALL_PRODUCTS, CatalogProduct, INTENTION_MAPPINGS } from '@/data/products';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Check, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  RotateCcw, 
  Share2, 
  Plus, 
  Minus,
  CheckCircle2,
  Info,
  Flame,
  Droplets,
  Sun,
  Moon,
  Compass
} from 'lucide-react';

interface ProductSacredDetails {
  element: string;
  chakra: string;
  energyType: string;
  ritualInstruction: string;
  composition: string;
  careInstructions: string;
}

const SACRED_DETAILS_BY_CATEGORY: Record<string, ProductSacredDetails> = {
  'Cristais': {
    element: 'Terra & Éter',
    chakra: 'Frontal e Cardíaco',
    energyType: 'Transmutação e Proteção Áurica',
    ritualInstruction: 'Lave em água corrente natural ou repouse sobre uma drusa de selenita. Deixe sob a luz da lua cheia por 4 horas para potencializar sua frequência vibracional.',
    composition: 'Mineral 100% natural, sem corantes ou resinas artificiais.',
    careInstructions: 'Evite quedas e contato prolongado com produtos químicos fortes.'
  },
  'Banhos': {
    element: 'Água & Fogo',
    chakra: 'Chakras Básico, Plexo Solar e Coronário',
    energyType: 'Descarrego, Purificação e Atração Magnética',
    ritualInstruction: 'Ferva 1,5L de água, desligue o fogo e adicione as ervas sagradas. Abafe por 15 minutos, coe e jogue do pescoço para baixo após o banho higiênico, mentalizando seus caminhos se abrindo.',
    composition: 'Ervas desidratadas puras, colhidas em luas propícias com orações e respeito fitoenergético.',
    careInstructions: 'Conservar em local seco, arejado e longe da luz solar direta.'
  },
  'Incensos': {
    element: 'Ar & Fogo',
    chakra: 'Laríngeo e Coronário',
    energyType: 'Limpeza de Ambientes e Selamento Astral',
    ritualInstruction: 'Acenda a ponta com fósforo, deixe queimar por alguns segundos e assopre. Percorra os cantos da casa de dentro para fora no sentido horário, mantendo janelas abertas.',
    composition: 'Resinas vegetais puras, biomassa vegetal e óleos essenciais terapêuticos.',
    careInstructions: 'Mantenha em porta-incenso resistente ao calor, longe de cortinas e fora do alcance de crianças.'
  },
  'Amuletos': {
    element: 'Éter & Terra',
    chakra: 'Todos os 7 Chakras principais',
    energyType: 'Escudo Pessoal e Âncora de Intenção',
    ritualInstruction: 'Segure o amuleto com ambas as mãos na altura do peito, respire fundo 3 vezes e declare sua intenção em voz alta (ex: "Consagro este amuleto para me proteger e guiar meus passos").',
    composition: 'Pedras naturais selecionadas, cordões reforçados e metais com banho nobre.',
    careInstructions: 'Limpe periodicamente com incenso de sálvia ou palo santo.'
  },
  'Velas': {
    element: 'Fogo & Terra',
    chakra: 'Plexo Solar e Cardíaco',
    energyType: 'Iluminação, Magnetismo e Expansão',
    ritualInstruction: 'Ao acender, faça uma oração ou pedido sincero ao Universo. Nunca apague assoprando; utilize um abafador para manter a energia concentrada no ambiente.',
    composition: 'Cera vegetal de coco, pavio 100% algodão e essências botânicas.',
    careInstructions: 'Apare o pavio a 0,5cm antes de reacender para uma queima limpa e sem fumaça escura.'
  },
  'Aromaterapia': {
    element: 'Ar & Água',
    chakra: 'Coronário e Olfativo',
    energyType: 'Equilíbrio Emocional e Alívio da Mente',
    ritualInstruction: 'Borrife 3 a 4 vezes ao redor da sua aura ou nas extremidades do ambiente (cama, cortinas, altar) antes de dormir ou meditar.',
    composition: 'Óleos essenciais nobres, álcool de cereais e tinturas botânicas artesanais.',
    careInstructions: 'Uso externo. Não ingerir e não aplicar diretamente sobre mucosas.'
  }
};

const SAMPLE_REVIEWS = [
  {
    id: 1,
    author: 'Mariana Silveira',
    rating: 5,
    date: 'Há 4 dias',
    verified: true,
    comment: 'A energia desse produto é surreal! Chegou muito bem embalado, com cheirinho de alfazema e uma mensagem linda de consagração. Senti a diferença no ambiente no primeiro uso!'
  },
  {
    id: 2,
    author: 'Rodrigo Fontes',
    rating: 5,
    date: 'Há 2 semanas',
    verified: true,
    comment: 'Qualidade excepcional. Dá para perceber o carinho e o cuidado em cada detalhe. Super recomendo!'
  },
  {
    id: 3,
    author: 'Camila Albuquerque',
    rating: 5,
    date: 'Há 3 semanas',
    verified: true,
    comment: 'Comprei para presentear e acabei ficando tão encantada que comprei outro para mim. Chegou super rápido pelo Sedex.'
  }
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'propriedades' | 'ritual' | 'cuidados'>('propriedades');
  const [cep, setCep] = useState('');
  const [freteCalculado, setFreteCalculado] = useState<boolean | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Busca do Produto Atual
  const product = useMemo(() => {
    return ALL_PRODUCTS.find(p => p.slug === slug) || ALL_PRODUCTS[0];
  }, [slug]);

  // Produtos Relacionados (pela mesma intenção)
  const relatedProducts = useMemo(() => {
    const mainIntent = product.intentions[0] || 'protecao';
    return ALL_PRODUCTS.filter(p => p.id !== product.id && p.intentions.includes(mainIntent)).slice(0, 4);
  }, [product]);

  const sacredDetails = SACRED_DETAILS_BY_CATEGORY[product.category] || SACRED_DETAILS_BY_CATEGORY['Cristais'];
  const finalPrice = (product.promotional_price || product.price) * quantity;
  const pixPrice = (finalPrice * 0.95).toFixed(2).replace('.', ',');
  const installmentPrice = (finalPrice / 3).toFixed(2).replace('.', ',');

  const handleAddToCart = () => {
    setCartCount(prev => prev + quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleBuyNow = () => {
    setCartCount(prev => prev + quantity);
    router.push('/produtos');
  };

  const handleCalculateFrete = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.trim().length >= 8) {
      setFreteCalculado(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F1EB]">
      <Topbar />
      <Header cartCount={cartCount} />

      {/* Breadcrumb Navigation */}
      <section className="bg-[#FAF7F4] py-3.5 px-4 sm:px-8 border-b border-brand-gold/30">
        <div className="max-w-site mx-auto flex items-center gap-2 text-xs font-semibold text-brand-dark/70">
          <Link href="/" className="hover:text-brand-purple flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Início</span>
          </Link>
          <span>/</span>
          <Link href="/produtos" className="hover:text-brand-purple">
            Catálogo
          </Link>
          <span>/</span>
          <span className="text-brand-purple capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-brand-dark font-bold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </div>
      </section>

      {/* CONTEÚDO PRINCIPAL DO PRODUTO */}
      <main className="max-w-site mx-auto px-4 sm:px-8 py-8 sm:py-12 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* COLUNA ESQUERDA: GALERIA DE IMAGENS */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border-2 border-brand-gold/50 shadow-lg group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Botão Favorito */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 transition z-10"
                aria-label="Favoritar produto"
              >
                <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-brand-dark/70 hover:text-rose-500'}`} />
              </button>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.badge && (
                  <span className="bg-brand-dark/90 backdrop-blur-md text-brand-gold text-xs font-bold px-3 py-1 rounded-full shadow">
                    {product.badge}
                  </span>
                )}
                {product.promotional_price && (
                  <span className="bg-amber-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    OFERTA ESPECIAL
                  </span>
                )}
              </div>
            </div>

            {/* Garantias e Selos abaixo da imagem */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3 rounded-2xl border border-brand-gold/40 text-center flex flex-col items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4 text-brand-purple mb-1" />
                <span className="text-[10px] font-bold text-brand-dark">100% Consagrado</span>
                <span className="text-[9px] text-brand-dark/60">Energização Sagrada</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-brand-gold/40 text-center flex flex-col items-center justify-center shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-700 mb-1" />
                <span className="text-[10px] font-bold text-brand-dark">Autenticidade</span>
                <span className="text-[9px] text-brand-dark/60">Minerais & Ervas Puras</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-brand-gold/40 text-center flex flex-col items-center justify-center shadow-sm">
                <Truck className="w-4 h-4 text-amber-700 mb-1" />
                <span className="text-[10px] font-bold text-brand-dark">Envio Blindado</span>
                <span className="text-[9px] text-brand-dark/60">Proteção na Entrega</span>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: INFORMAÇÕES DE COMPRA */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Categoria + Avaliações */}
            <div className="flex items-center justify-between">
              <span className="bg-brand-purple/15 text-brand-purple font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 text-amber-500 font-bold text-xs bg-white px-3 py-1 rounded-full border border-brand-gold/40 shadow-sm">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-brand-dark/50 font-normal">({product.reviews_count} avaliações)</span>
              </div>
            </div>

            {/* Título do Produto */}
            <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-brand-dark leading-tight">
              {product.name}
            </h1>

            {/* Tags de Intenções Conectadas */}
            <div className="flex items-center flex-wrap gap-2 pt-1">
              <span className="text-xs font-bold text-brand-dark/70">Intenções Ativadas:</span>
              {product.intentions.map(slugKey => {
                const intentInfo = INTENTION_MAPPINGS[slugKey];
                return (
                  <Link
                    key={slugKey}
                    href={`/produtos?intencao=${slugKey}`}
                    className="bg-brand-gold/30 hover:bg-brand-gold/60 text-brand-purple font-bold text-xs px-3 py-1 rounded-full transition flex items-center gap-1 shadow-sm"
                  >
                    <span>{intentInfo?.icon || '✨'}</span>
                    <span>{intentInfo?.name || slugKey}</span>
                  </Link>
                );
              })}
            </div>

            {/* Descrição Sintética */}
            <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans border-l-2 border-brand-purple pl-3.5 py-1">
              {product.description}
            </p>

            {/* Card de Preços & Condições */}
            <div className="bg-white rounded-3xl p-6 border-2 border-brand-gold/60 shadow-sm space-y-4">
              <div>
                {product.promotional_price ? (
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-sm text-brand-dark/40 line-through">
                      R$ {(product.price * quantity).toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-brand-dark font-sans">
                      R$ {finalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl sm:text-3xl font-bold text-brand-dark font-sans">
                    R$ {finalPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}

                {/* Destaque PIX */}
                <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-3 mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> R$ {pixPrice} no PIX (5% OFF)
                    </span>
                    <div className="text-[10px] text-emerald-700/80 mt-0.5">Aprovação imediata e envio prioritário</div>
                  </div>
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    MELHOR PREÇO
                  </span>
                </div>

                <div className="text-xs text-brand-dark/70 mt-2">
                  ou em até <strong>3x de R$ {installmentPrice}</strong> sem juros no cartão
                </div>
              </div>

              {/* Seletor de Quantidade + Botões de Compra */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border-2 border-brand-gold/60 rounded-2xl bg-brand-cream/40 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-xl bg-white hover:bg-brand-dark hover:text-white text-brand-dark flex items-center justify-center transition"
                      aria-label="Diminuir"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-brand-dark">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-xl bg-white hover:bg-brand-dark hover:text-white text-brand-dark flex items-center justify-center transition"
                      aria-label="Aumentar"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                      addedAnimation
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white hover:bg-brand-gold/20 text-brand-dark border-2 border-brand-dark/80'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Adicionado à Sacola!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-brand-purple" />
                        <span>Adicionar à Sacola</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-brand-dark hover:bg-brand-purple text-brand-cream py-4 rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                  <span>Comprar Agora com PIX (5% OFF)</span>
                </button>
              </div>

              {/* Simulador de Frete */}
              <div className="pt-3 border-t border-brand-gold/20">
                <form onSubmit={handleCalculateFrete} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Digite seu CEP..."
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    maxLength={9}
                    className="flex-1 bg-brand-cream/30 border border-brand-gold/60 rounded-xl px-3 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-purple"
                  />
                  <button
                    type="submit"
                    className="bg-brand-purple hover:bg-brand-dark text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
                  >
                    Calcular
                  </button>
                </form>

                {freteCalculado && (
                  <div className="mt-2.5 p-2.5 bg-brand-cream/50 rounded-xl border border-brand-gold/30 text-[11px] text-brand-dark space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span>Sedex Expresso (2-3 dias úteis):</span>
                      <span className="text-emerald-700 font-bold">R$ 14,90</span>
                    </div>
                    <div className="flex justify-between text-brand-dark/70">
                      <span>PAC Econômico (5-7 dias úteis):</span>
                      <span className="font-bold">R$ 9,90</span>
                    </div>
                    <div className="text-[10px] text-emerald-800 font-bold mt-1">
                      🎉 Frete Grátis nas compras acima de R$ 199,00
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* SEÇÃO SAGRADA: ABAS DE PROPRIEDADES, RITUAL E CUIDADOS */}
        <section className="mt-14 pt-10 border-t border-brand-gold/40">
          <div className="flex items-center justify-center gap-3 sm:gap-6 border-b border-brand-gold/30 pb-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('propriedades')}
              className={`font-serif font-bold text-sm sm:text-base px-4 py-2 rounded-2xl transition flex items-center gap-2 ${
                activeTab === 'propriedades'
                  ? 'bg-brand-dark text-brand-cream shadow-md'
                  : 'text-brand-dark/70 hover:bg-brand-gold/20'
              }`}
            >
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span>Propriedades & Energia</span>
            </button>

            <button
              onClick={() => setActiveTab('ritual')}
              className={`font-serif font-bold text-sm sm:text-base px-4 py-2 rounded-2xl transition flex items-center gap-2 ${
                activeTab === 'ritual'
                  ? 'bg-brand-dark text-brand-cream shadow-md'
                  : 'text-brand-dark/70 hover:bg-brand-gold/20'
              }`}
            >
              <Moon className="w-4 h-4 text-brand-purple" />
              <span>Modo de Uso & Consagração</span>
            </button>

            <button
              onClick={() => setActiveTab('cuidados')}
              className={`font-serif font-bold text-sm sm:text-base px-4 py-2 rounded-2xl transition flex items-center gap-2 ${
                activeTab === 'cuidados'
                  ? 'bg-brand-dark text-brand-cream shadow-md'
                  : 'text-brand-dark/70 hover:bg-brand-gold/20'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Composição & Autenticidade</span>
            </button>
          </div>

          <div className="mt-8 max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-brand-gold/40 shadow-sm">
            {activeTab === 'propriedades' && (
              <div className="space-y-5 animate-fadeIn">
                <h3 className="font-serif font-bold text-xl text-brand-dark">
                  Atributos Energéticos & Alinhamento Espiritual
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="bg-brand-cream/40 p-4 rounded-2xl border border-brand-gold/30">
                    <span className="text-brand-dark/60 font-semibold uppercase">Elemento Regente</span>
                    <div className="font-bold text-sm text-brand-dark mt-1">{sacredDetails.element}</div>
                  </div>
                  <div className="bg-brand-cream/40 p-4 rounded-2xl border border-brand-gold/30">
                    <span className="text-brand-dark/60 font-semibold uppercase">Chakra Ativado</span>
                    <div className="font-bold text-sm text-brand-dark mt-1">{sacredDetails.chakra}</div>
                  </div>
                  <div className="bg-brand-cream/40 p-4 rounded-2xl border border-brand-gold/30">
                    <span className="text-brand-dark/60 font-semibold uppercase">Tipo de Frequência</span>
                    <div className="font-bold text-sm text-brand-purple mt-1">{sacredDetails.energyType}</div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans pt-2">
                  Cada exemplar de {product.name} passa por um processo minucioso de seleção energética. Nossos artigos são consagrados com orações e mantidos em ambiente de alta vibração até o envio para o seu lar.
                </p>
              </div>
            )}

            {activeTab === 'ritual' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="font-serif font-bold text-xl text-brand-dark flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-600" />
                  <span>Ritual de Ativação & Modo de Uso</span>
                </h3>
                <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
                  {sacredDetails.ritualInstruction}
                </p>
                <div className="p-4 bg-brand-gold/15 rounded-2xl border border-brand-gold/40 text-xs text-brand-dark/80">
                  <strong className="text-brand-purple">Dica de Curadoria:</strong> A força de qualquer artigo espiritual se multiplica com a clareza do seu pensamento e a pureza do seu coração durante o ritual.
                </div>
              </div>
            )}

            {activeTab === 'cuidados' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="font-serif font-bold text-xl text-brand-dark flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <span>Composição Pura & Cuidados Tradicionais</span>
                </h3>
                <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
                  <strong>Composição:</strong> {sacredDetails.composition}
                </p>
                <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
                  <strong>Cuidados e Conservação:</strong> {sacredDetails.careInstructions}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* AVALIAÇÕES DE CLIENTES REAIS */}
        <section className="mt-14 pt-10 border-t border-brand-gold/40">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-serif font-bold text-2xl text-brand-dark">
                  Avaliações Verificadas ({product.reviews_count})
                </h3>
                <p className="text-xs sm:text-sm text-brand-dark/70 mt-0.5">
                  Experiências e relatos de quem já consagrou este artigo
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-amber-500 font-bold text-lg bg-white px-4 py-2 rounded-2xl border border-brand-gold/40 shadow-sm">
                <Star className="w-5 h-5 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-xs text-brand-dark/40">/ 5.0</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SAMPLE_REVIEWS.map(rev => (
                <div key={rev.id} className="bg-white p-5 rounded-2xl border border-brand-gold/40 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] text-brand-dark/40">{rev.date}</span>
                    </div>
                    <p className="text-xs text-brand-dark/80 leading-relaxed font-sans line-clamp-4">
                      "{rev.comment}"
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-brand-gold/20 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-brand-dark">{rev.author}</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Compra Verificada
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUTOS RELACIONADOS PELA MESMA INTENÇÃO */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-10 border-t border-brand-gold/40">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif font-bold text-2xl text-brand-dark">
                  Combine com a mesma Intenção
                </h3>
                <p className="text-xs sm:text-sm text-brand-dark/70 mt-0.5">
                  Artigos que potencializam a energia de {INTENTION_MAPPINGS[product.intentions[0]]?.name || 'sua busca'}
                </p>
              </div>
              <Link href="/produtos" className="text-xs font-bold text-brand-purple hover:underline">
                Ver todo o catálogo →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map(rel => (
                <Link
                  key={rel.id}
                  href={`/produtos/${rel.slug}`}
                  className="group bg-white rounded-2xl border border-brand-gold/40 overflow-hidden shadow-sm hover:shadow-lg transition p-3 flex flex-col justify-between"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-brand-cream/40 mb-2.5">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-brand-purple font-semibold">{rel.category}</span>
                    <h4 className="font-serif font-bold text-brand-dark text-xs sm:text-sm line-clamp-2 mt-0.5 group-hover:text-brand-purple transition">
                      {rel.name}
                    </h4>
                  </div>
                  <div className="mt-2 pt-2 border-t border-brand-gold/20 flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-brand-dark">
                      R$ {(rel.promotional_price || rel.price).toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-[10px] font-bold text-brand-purple group-hover:underline">
                      Ver detalhes
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
}
