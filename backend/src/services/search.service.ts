import { supabase } from '../config/supabase.js';
import { GeminiService, CanonicalIntentInfo } from './gemini.service.js';

// Base de dados canônica em memória para fallback caso o banco esteja conectando/sincronizando
export const FALLBACK_INTENTIONS: CanonicalIntentInfo[] = [
  {
    id: 1,
    name: 'Proteção & Defesa',
    slug: 'protecao',
    description: 'Afastamento de energias ruins, defesa espiritual, escudo áurico, blindagem contra inveja e negatividade.',
    synonyms: ['inveja', 'mau olhado', 'defesa espiritual', 'afastar energia ruim', 'protecao', 'quebrar demanda', 'olho gordo']
  },
  {
    id: 2,
    name: 'Prosperidade & Riqueza',
    slug: 'prosperidade',
    description: 'Abertura de caminhos financeiros, dinheiro, abundância, sucesso profissional e oportunidades de negócios.',
    synonyms: ['dinheiro', 'abundancia', 'riqueza', 'abrir caminhos', 'sucesso financeiro', 'vendas', 'emprego']
  },
  {
    id: 3,
    name: 'Amor & Harmonia',
    slug: 'amor',
    description: 'Atração de amor verdadeiro, harmonia conjugal, fortalecimento de laços afetivos e amor próprio.',
    synonyms: ['amor proprio', 'harmonia no casal', 'paixao', 'atrair amor', 'autoestima', 'relacionamento']
  },
  {
    id: 4,
    name: 'Limpeza & Descarrego',
    slug: 'limpeza-energetica',
    description: 'Purificação profunda da aura, descarrego energético, renovação e purificação de ambientes.',
    synonyms: ['descarrego', 'limpeza pesada', 'purificacao', 'tirar peso', 'cansaço espiritual', 'renovacao']
  },
  {
    id: 5,
    name: 'Paz & Serenidade',
    slug: 'paz-e-serenidade',
    description: 'Alívio de ansiedade e estresse, calma mental, sono tranquilo, harmonia familiar e serenidade.',
    synonyms: ['ansiedade', 'estresse', 'dormir melhor', 'calmaria', 'tranquilidade', 'paz interior', 'acalmar a mente']
  },
  {
    id: 6,
    name: 'Foco & Clareza Mental',
    slug: 'foco-e-clareza',
    description: 'Concentração para estudos e trabalho, tomada de decisões, clareza mental e despertar da intuição.',
    synonyms: ['estudos', 'concentracao', 'clareza mental', 'tomar decisao', 'mente focada', 'intuicao']
  }
];

export const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: 'Colar Amuleto de Obsidiana Negra',
    slug: 'colar-amuleto-obsidiana-negra',
    description: 'Poderoso escudo de proteção contra energias densas, inveja e ataques psíquicos. Feito com pedra natural autêntica.',
    price: 89.90,
    promotional_price: 79.90,
    stock_quantity: 35,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600'],
    intentions: ['protecao', 'limpeza-energetica']
  },
  {
    id: 2,
    name: 'Cristal Citrino Natural Bruto (Atrair Prosperidade)',
    slug: 'cristal-citrino-natural-bruto',
    description: 'A pedra máxima da abundância financeira e energia solar. Não acumula negatividade e magnetiza oportunidades de ganhos.',
    price: 55.00,
    promotional_price: 49.00,
    stock_quantity: 50,
    images: ['https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600'],
    intentions: ['prosperidade', 'foco-e-clareza']
  },
  {
    id: 3,
    name: 'Banho de Ervas Descarrego e Limpeza Pesada (Arruda, Guiné e Alecrim)',
    slug: 'banho-descarrego-limpeza-pesada',
    description: 'Mistura fitoterápica potente para descarregar cansaço acumulado, afastar larvas astrais e renovar a vitalidade.',
    price: 29.90,
    promotional_price: null,
    stock_quantity: 100,
    images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600'],
    intentions: ['limpeza-energetica', 'protecao']
  },
  {
    id: 4,
    name: 'Vela Aromática de Quartzo Rosa & Gerânio (Amor e Autoestima)',
    slug: 'vela-quartzo-rosa-geranio',
    description: 'Vela 100% vegetal com essência pura de gerânio e cascalho de quartzo rosa, trabalhando o chakra cardíaco.',
    price: 68.00,
    promotional_price: 59.90,
    stock_quantity: 25,
    images: ['https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600'],
    intentions: ['amor', 'paz-e-serenidade']
  },
  {
    id: 5,
    name: 'Incenso Natural de Sálvia Branca e Olíbano',
    slug: 'incenso-salvia-branca-olibano',
    description: 'Defumação milenar utilizada para purificação profunda de ambientes pesados e elevação da frequência espiritual.',
    price: 32.00,
    promotional_price: null,
    stock_quantity: 80,
    images: ['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600'],
    intentions: ['limpeza-energetica', 'paz-e-serenidade', 'protecao']
  },
  {
    id: 6,
    name: 'Kit Pulseiras Olho de Tigre e Turmalina Negra',
    slug: 'kit-pulseiras-olho-de-tigre-turmalina',
    description: 'Dupla imbatível: Turmalina para repelir energias ruins e Olho de Tigre para dar coragem, clareza e prosperidade.',
    price: 94.00,
    promotional_price: 84.90,
    stock_quantity: 40,
    images: ['https://images.unsplash.com/photo-1611591475155-4286fafb33e6?w=600'],
    intentions: ['protecao', 'prosperidade']
  },
  {
    id: 7,
    name: 'Japamala de Ametista 108 Contas (Paz e Intuição)',
    slug: 'japamala-ametista-108-contas',
    description: 'Pedra da transmutação espiritual, excelente para aliviar a mente acelerada, insônia e ansiedade profunda.',
    price: 129.00,
    promotional_price: 115.00,
    stock_quantity: 15,
    images: ['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600'],
    intentions: ['paz-e-serenidade', 'foco-e-clareza']
  },
  {
    id: 8,
    name: 'Banho Atrai Dinheiro e Abre Caminhos (Canela, Louro e Cravo)',
    slug: 'banho-atrai-dinheiro-abre-caminhos',
    description: 'Ervas quentes e expansivas consagradas para atrair abundância financeira, novas oportunidades e clientes.',
    price: 29.90,
    promotional_price: null,
    stock_quantity: 90,
    images: ['https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600'],
    intentions: ['prosperidade']
  }
];

export interface SearchResult {
  query: string;
  matched_intent: {
    id: number;
    name: string;
    slug: string;
    confidence: number;
    source: 'exact' | 'vector_cache' | 'vector_canonical' | 'llm_classified' | 'fallback';
  } | null;
  products: any[];
  debug?: {
    latency_ms: number;
    reasoning?: string;
  };
}

export class SearchService {
  static normalizeQuery(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  /**
   * Busca as intenções canônicas (do Supabase ou fallback em memória)
   */
  static async getCanonicalIntents(): Promise<CanonicalIntentInfo[]> {
    try {
      const { data, error } = await supabase
        .from('intentions')
        .select('id, name, slug, description, synonyms');

      if (!error && data && data.length > 0) {
        return data as CanonicalIntentInfo[];
      }
    } catch (e) {
      // Ignora e usa fallback
    }

    return FALLBACK_INTENTIONS;
  }

  /**
   * Fluxo Principal de Busca Semântica
   */
  static async search(queryText: string): Promise<SearchResult> {
    const startTime = Date.now();
    const normalized = this.normalizeQuery(queryText);

    if (!normalized) {
      return {
        query: queryText,
        matched_intent: null,
        products: FALLBACK_PRODUCTS,
        debug: { latency_ms: Date.now() - startTime }
      };
    }

    const canonicals = await this.getCanonicalIntents();

    // 1. ETAPA 1: Busca Exata / Sinônimo Direto
    const exactMatch = canonicals.find(i => 
      this.normalizeQuery(i.name) === normalized ||
      this.normalizeQuery(i.slug) === normalized ||
      (i.synonyms && i.synonyms.some(s => this.normalizeQuery(s) === normalized))
    );

    if (exactMatch) {
      const products = await this.getProductsByIntention(exactMatch.slug, exactMatch.id);
      return {
        query: queryText,
        matched_intent: {
          id: exactMatch.id,
          name: exactMatch.name,
          slug: exactMatch.slug,
          confidence: 1.0,
          source: 'exact'
        },
        products,
        debug: { latency_ms: Date.now() - startTime }
      };
    }

    // 2. ETAPA 2: Similaridade Vetorial no Supabase (se acessível)
    let queryEmbedding: number[] = [];
    try {
      queryEmbedding = await GeminiService.generateEmbedding(queryText);
    } catch (e) {
      console.warn('Geração de embedding via Gemini em processamento.');
    }

    if (queryEmbedding.length > 0) {
      try {
        const { data: matches, error } = await supabase.rpc('match_search_intent', {
          query_embedding: queryEmbedding,
          match_threshold: 0.75,
          match_count: 1
        });

        if (!error && matches && matches.length > 0 && matches[0].similarity >= 0.85) {
          const topMatch = matches[0];
          const products = await this.getProductsByIntention(topMatch.intention_slug, topMatch.intention_id);
          return {
            query: queryText,
            matched_intent: {
              id: topMatch.intention_id,
              name: topMatch.intention_name,
              slug: topMatch.intention_slug,
              confidence: Number(topMatch.similarity.toFixed(3)),
              source: topMatch.source === 'cache' ? 'vector_cache' : 'vector_canonical'
            },
            products,
            debug: { latency_ms: Date.now() - startTime }
          };
        }
      } catch (vectorErr) {
        // Fallback para LLM se o banco vetorial não responder
      }
    }

    // 3. ETAPA 3: Fallback com Inteligência Artificial (Gemini Flash)
    try {
      const llmResult = await GeminiService.classifyIntentFallback(queryText, canonicals);

      if (llmResult.matched_slug && llmResult.confidence >= 0.65) {
        const intent = canonicals.find(i => i.slug === llmResult.matched_slug);
        if (intent) {
          // Grava no cache se o Supabase estiver disponível
          try {
            if (queryEmbedding.length > 0) {
              await supabase.from('search_intents_cache').insert({
                query_text: queryText,
                normalized_query: normalized,
                intention_id: intent.id,
                embedding: queryEmbedding,
                confidence: llmResult.confidence,
                source: 'llm_classified',
                status: llmResult.confidence >= 0.85 ? 'approved' : 'pending_review'
              });
            }
          } catch (insertErr) {
            // Silencioso
          }

          const products = await this.getProductsByIntention(intent.slug, intent.id);
          return {
            query: queryText,
            matched_intent: {
              id: intent.id,
              name: intent.name,
              slug: intent.slug,
              confidence: Number(llmResult.confidence.toFixed(3)),
              source: 'llm_classified'
            },
            products,
            debug: {
              latency_ms: Date.now() - startTime,
              reasoning: llmResult.reasoning
            }
          };
        }
      }
    } catch (llmErr) {
      console.warn('Erro na classificação LLM:', llmErr);
    }

    // 4. ETAPA 4: Fallback de Produtos em Destaque
    return {
      query: queryText,
      matched_intent: null,
      products: FALLBACK_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(normalized) || 
        p.description.toLowerCase().includes(normalized)
      ).concat(FALLBACK_PRODUCTS).slice(0, 8),
      debug: {
        latency_ms: Date.now() - startTime,
        reasoning: 'Fallback padrão executado.'
      }
    };
  }

  /**
   * Retorna os produtos associados a uma intenção (com fallback de catálogo)
   */
  static async getProductsByIntention(intentionSlug: string, intentionId?: number): Promise<any[]> {
    try {
      if (intentionId) {
        const { data, error } = await supabase.rpc('get_products_by_intention', {
          target_intention_id: intentionId,
          limit_count: 12
        });

        if (!error && data && data.length > 0) {
          return data;
        }
      }
    } catch (e) {
      // Ignora erro e usa fallback
    }

    // Retorna do catálogo local
    const filtered = FALLBACK_PRODUCTS.filter(p => p.intentions.includes(intentionSlug));
    return filtered.length > 0 ? filtered : FALLBACK_PRODUCTS;
  }
}
