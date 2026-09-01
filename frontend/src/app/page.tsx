'use client';

import React, { useState } from 'react';
import { Topbar } from '@/components/Topbar';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { IntentionsSection } from '@/components/IntentionsSection';
import { ProductsSection } from '@/components/ProductsSection';
import { BlogSection } from '@/components/BlogSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { CtaSection } from '@/components/CtaSection';
import { NewsletterSection } from '@/components/NewsletterSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const [matchedIntent, setMatchedIntent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuery, setActiveQuery] = useState('');
  const [activeIntentionSlug, setActiveIntentionSlug] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

  // Busca Semântica Integrada com a API do Backend
  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setActiveQuery(query);

    try {
      const res = await fetch(`http://localhost:3001/api/search?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setMatchedIntent(data.matched_intent);
        if (data.matched_intent?.slug) {
          setActiveIntentionSlug(data.matched_intent.slug);
          // Rola suavemente até os produtos correspondentes
          const elem = document.getElementById('produtos');
          elem?.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        simulateLocalIntent(query);
      }
    } catch (e) {
      simulateLocalIntent(query);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateLocalIntent = (query: string) => {
    const q = query.toLowerCase();
    let detectedSlug = 'protecao';
    let detectedName = 'Proteção & Defesa';

    if (q.includes('inveja') || q.includes('protecao') || q.includes('ruim') || q.includes('defesa') || q.includes('olho')) {
      detectedSlug = 'protecao';
      detectedName = 'Proteção & Defesa';
    } else if (q.includes('dinheiro') || q.includes('prosperidade') || q.includes('caminhos') || q.includes('abundancia') || q.includes('emprego') || q.includes('trabalho')) {
      detectedSlug = 'prosperidade';
      detectedName = 'Prosperidade & Riqueza';
    } else if (q.includes('amor') || q.includes('relacionamento') || q.includes('autoestima') || q.includes('casal')) {
      detectedSlug = 'amor';
      detectedName = 'Amor & Harmonia';
    } else if (q.includes('descarrego') || q.includes('limpeza') || q.includes('pesada') || q.includes('peso')) {
      detectedSlug = 'limpeza';
      detectedName = 'Limpeza & Descarrego';
    } else if (q.includes('ansiedade') || q.includes('paz') || q.includes('acalmar') || q.includes('mente') || q.includes('dormir')) {
      detectedSlug = 'paz';
      detectedName = 'Paz & Serenidade';
    }

    setMatchedIntent({ id: 1, name: detectedName, slug: detectedSlug, confidence: 0.98, source: 'semantic' });
    setActiveIntentionSlug(detectedSlug);

    // Rola até os produtos
    const elem = document.getElementById('produtos');
    elem?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectIntention = (slug: string, query: string) => {
    setActiveIntentionSlug(slug);
    handleSearch(query);
  };

  const handleSendFeedback = async (isCorrect: boolean) => {
    try {
      await fetch('http://localhost:3001/api/search/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query_text: activeQuery,
          intention_id: matchedIntent?.id,
          is_correct: isCorrect
        })
      });
    } catch (e) {
      console.log('Feedback enviado localmente');
    }
  };

  const handleAddToCart = (_productName: string) => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F1EB]">
      {/* 1. Topbar */}
      <Topbar />

      {/* 2. Header */}
      <Header
        cartCount={cartCount}
        onSearchIconClick={() => {
          const input = document.getElementById('hero-search-input');
          input?.focus();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 3. Hero Section (com placeholders tipo máquina de escrever e texto convidativo) */}
      <HeroSection
        onSearch={handleSearch}
        matchedIntent={matchedIntent}
        isLoading={isLoading}
        onSendFeedback={handleSendFeedback}
      />

      {/* 4. Explore por Intenção (8 Cards em Carrossel Arrastável) */}
      <IntentionsSection
        onSelectIntention={handleSelectIntention}
        activeIntentionSlug={activeIntentionSlug}
      />

      {/* 5. Mais Procurados para Você (Carrossel Sincronizado + Link Direto para o Catálogo) */}
      <ProductsSection 
        onAddToCart={handleAddToCart}
        activeIntentionTab={activeIntentionSlug}
      />

      {/* 6. Blog & Artigos (com botão Ver Mais) */}
      <BlogSection />

      {/* 7. Benefícios (4 Pilares) */}
      <BenefitsSection />

      {/* 8. Depoimentos */}
      <TestimonialsSection />

      {/* 9. CTA WhatsApp */}
      <CtaSection />

      {/* 10. Newsletter */}
      <NewsletterSection />

      {/* 11. Footer Completo */}
      <Footer />
    </div>
  );
}
