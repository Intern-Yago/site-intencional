'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Topbar } from '@/components/Topbar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LotusDivider } from '@/components/LotusDivider';
import { Clock, ArrowLeft, BookOpen, Sparkles } from 'lucide-react';

const ARTICLES_LIST = [
  {
    id: 1,
    title: 'Como escolher uma pedra para proteção',
    category: 'Cristais & Amuletos',
    readTime: '4 min de leitura',
    excerpt: 'Aprenda a identificar a pedra certa para o seu momento: Turmalina Negra para repelir negatividade pesada, Obsidiana para escudo psíquico e Olho de Tigre para afastar inveja.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'Ervas tradicionalmente associadas à limpeza energética',
    category: 'Ervas Sagradas',
    readTime: '6 min de leitura',
    excerpt: 'Descubra os poderes fitoenergéticos da Arruda, Guiné, Alecrim, Manjericão e Sálvia Branca para descarregar ambientes e renovar a vitalidade áurica.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'Diferenças entre banhos e defumações',
    category: 'Rituais',
    readTime: '5 min de leitura',
    excerpt: 'Quando usar a água e quando usar a fumaça sagrada? Entenda como o elemento Água atua no corpo físico e emocional, enquanto o Fogo/Ar purifica a frequência do ambiente.',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    title: 'Como montar um espaço de oração e meditação',
    category: 'Harmonia & Lar',
    readTime: '7 min de leitura',
    excerpt: 'Passo a passo simples para criar seu altar em casa equilibrando os 4 elementos da natureza: vela (fogo), cristal (terra), incenso (ar) e taça com água.',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    title: 'O poder da Lua Cheia para consagrar seus cristais',
    category: 'Rituais',
    readTime: '5 min de leitura',
    excerpt: 'Como aproveitar o ápice do ciclo lunar para limpar, energizar e programar intenções nas suas pedras e amuletos sagrados.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 6,
    title: 'Como utilizar o Japamala para meditação e mantras',
    category: 'Cristais & Amuletos',
    readTime: '6 min de leitura',
    excerpt: 'Entenda o significado das 108 contas, a conta Meru e como entoar mantras de cura para acalmar a mente e diminuir a ansiedade diária.',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&auto=format&fit=crop&q=80'
  }
];

const CATEGORIES = ['Todos', 'Cristais & Amuletos', 'Ervas Sagradas', 'Rituais', 'Harmonia & Lar'];

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filtered = selectedCategory === 'Todos'
    ? ARTICLES_LIST
    : ARTICLES_LIST.filter(a => a.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F1EB]">
      <Topbar />
      <Header />

      {/* Hero dos Artigos */}
      <section className="bg-gradient-to-b from-[#FAF7F4] via-[#F6F1EB] to-[#F6F1EB] py-12 px-4 sm:px-8 border-b border-brand-gold/30">
        <div className="max-w-site mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-purple mb-3">
            <Link href="/" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Início</span>
            </Link>
            <span>/</span>
            <span className="text-brand-dark/70">Artigos & Conhecimento</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark font-serif">
            Conteúdos para iluminar seu caminho
          </h1>
          <p className="text-sm sm:text-base text-brand-dark/75 mt-2 max-w-2xl font-sans">
            Guias práticos, sabedoria ancestral sobre cristais, ervas, rituais e harmonização energética para o seu dia a dia.
          </p>

          {/* Filtros de Categoria de Artigos */}
          <div className="flex items-center gap-2 overflow-x-auto mt-6 pb-2 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-brand-dark text-brand-cream shadow-md'
                    : 'bg-white text-brand-dark/80 hover:bg-brand-gold/20 border border-brand-gold/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Artigos */}
      <main className="max-w-site mx-auto px-4 sm:px-8 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map(art => (
            <article
              key={art.id}
              className="group bg-white rounded-3xl overflow-hidden border border-brand-gold/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-cream">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-brand-dark/85 backdrop-blur-md text-brand-gold text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {art.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-brand-purple font-medium mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.readTime}</span>
                  </div>

                  <h2 className="font-serif font-bold text-xl text-brand-dark leading-snug group-hover:text-brand-purple transition-colors">
                    {art.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-brand-dark/75 mt-2.5 line-clamp-3 leading-relaxed font-sans">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-purple group-hover:text-brand-dark transition">
                  <span>Ler artigo completo</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
