'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { LotusDivider } from './LotusDivider';

const ARTICLES = [
  {
    id: 1,
    title: 'Como escolher uma pedra para proteção',
    readTime: '4 min de leitura',
    category: 'Cristais & Amuletos',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'Ervas tradicionalmente associadas à limpeza energética',
    readTime: '6 min de leitura',
    category: 'Ervas Sagradas',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'Diferenças entre banhos e defumações',
    readTime: '5 min de leitura',
    category: 'Rituais',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    title: 'Como montar um espaço de oração e meditação',
    readTime: '7 min de leitura',
    category: 'Harmonia & Lar',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80'
  }
];

export const BlogSection: React.FC = () => {
  return (
    <section id="artigos" className="py-14 sm:py-16 px-4 sm:px-8 bg-brand-cream/60 border-t border-brand-gold/30">
      <div className="max-w-site mx-auto flex flex-col items-center">
        
        {/* Cabeçalho Centralizado com Lotus */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark font-serif">
            Conteúdos para iluminar seu caminho
          </h2>
          <LotusDivider className="my-3" />
        </div>

        {/* Grid de Artigos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {ARTICLES.map((art) => (
            <Link
              key={art.id}
              href="/artigos"
              className="group relative h-[320px] sm:h-[350px] rounded-2xl overflow-hidden border border-brand-gold/40 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between p-5"
            >
              {/* Imagem de Fundo Clara e Nítida */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${art.image}')` }}
              />

              {/* Gradiente Suave Apenas na Base */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>

              {/* Badge no Topo */}
              <div className="relative z-10">
                <span className="self-start inline-block bg-brand-dark/80 backdrop-blur-md text-brand-gold text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                  {art.category}
                </span>
              </div>

              {/* Texto na Base */}
              <div className="relative z-10 flex flex-col">
                <h3 className="font-serif font-bold text-white text-lg leading-snug drop-shadow-md group-hover:text-brand-gold transition-colors">
                  {art.title}
                </h3>

                <div className="flex items-center gap-1.5 text-[11px] text-white/80 mt-2.5 pt-2 border-t border-white/20">
                  <Clock className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{art.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* BOTÃO VER MAIS ARTIGOS */}
        <div className="mt-10 text-center">
          <Link
            href="/artigos"
            className="inline-flex items-center gap-2 bg-white hover:bg-brand-dark hover:text-brand-cream text-brand-dark border-2 border-brand-gold/70 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 group"
          >
            <span>Ver todos os artigos & guias</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-gold group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
