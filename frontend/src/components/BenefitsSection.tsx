'use client';

import React from 'react';
import { HeartHandshake, Truck, ShieldCheck, Headphones } from 'lucide-react';

const BENEFITS = [
  {
    icon: HeartHandshake,
    title: 'Produtos com Amor e Propósito',
    description: 'Ervas colhidas com respeito, cristais autênticos e produção consciente.'
  },
  {
    icon: Truck,
    title: 'Envio para todo o Brasil',
    description: 'Embalagem segura e energizada, com rastreamento em tempo real.'
  },
  {
    icon: ShieldCheck,
    title: 'Pagamento Seguro em até 12x',
    description: 'PIX com 5% de desconto imediato ou parcelamento protegido.'
  },
  {
    icon: Headphones,
    title: 'Atendimento Humanizado',
    description: 'Especialistas prontos para te orientar na escolha dos artigos e rituais.'
  }
];

export const BenefitsSection: React.FC = () => {
  return (
    <section className="py-14 px-4 sm:px-8 bg-brand-dark text-brand-cream border-t border-brand-purple/40">
      <div className="max-w-site mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {BENEFITS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-purple/30 border border-brand-gold/30 text-brand-gold flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-brand-cream/70 mt-1 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
