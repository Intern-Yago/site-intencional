'use client';

import React from 'react';
import { ShoppingBag, Sparkles, Check } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  how_to_use?: string;
  price: number;
  promotional_price?: number;
  images: string[];
  stock_quantity: number;
  relevance_weight?: number;
}

interface ProductCardProps {
  product: Product;
  intentBadge?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, intentBadge }) => {
  const defaultImage = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600';
  const displayImage = product.images?.[0] || defaultImage;

  return (
    <div className="group bg-white rounded-2xl border border-spiritual-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Imagem do Produto */}
      <div className="relative aspect-square overflow-hidden bg-spiritual-100">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {intentBadge && (
          <div className="absolute top-3 left-3 bg-spiritual-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{intentBadge}</span>
          </div>
        )}

        {product.promotional_price && (
          <div className="absolute top-3 right-3 bg-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
            OFERTA
          </div>
        )}
      </div>

      {/* Detalhes */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-semibold text-spiritual-900 text-base leading-snug group-hover:text-spiritual-700 transition">
            {product.name}
          </h3>
          <p className="text-xs text-spiritual-700 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-spiritual-100 flex items-center justify-between">
          <div>
            {product.promotional_price ? (
              <div>
                <span className="text-xs text-gray-400 line-through mr-1.5">
                  R$ {Number(product.price).toFixed(2).replace('.', ',')}
                </span>
                <span className="text-lg font-bold text-spiritual-900">
                  R$ {Number(product.promotional_price).toFixed(2).replace('.', ',')}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-spiritual-900">
                R$ {Number(product.price).toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>

          <button
            className="bg-spiritual-900 hover:bg-spiritual-700 text-white p-2.5 rounded-xl transition shadow hover:shadow-md flex items-center gap-1.5 text-xs font-semibold"
            onClick={() => alert(`Produto "${product.name}" adicionado ao carrinho!`)}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Comprar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
