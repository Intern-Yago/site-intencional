export interface CatalogProduct {
  id: number;
  name: string;
  slug: string;
  category: 'Cristais' | 'Banhos' | 'Incensos' | 'Amuletos' | 'Velas' | 'Aromaterapia';
  intentions: string[]; // slugs: 'protecao', 'prosperidade', 'limpeza', 'amor', 'paz', 'espiritualidade', 'abertura-caminhos', 'harmonia-lar'
  price: number;
  promotional_price?: number;
  rating: number;
  reviews_count: number;
  image: string;
  description: string;
  badge?: string;
  in_stock: boolean;
}

export const ALL_PRODUCTS: CatalogProduct[] = [
  // --- PROTEÇÃO ---
  {
    id: 101,
    name: 'Colar Amuleto de Obsidiana Negra',
    slug: 'colar-amuleto-obsidiana-negra',
    category: 'Amuletos',
    intentions: ['protecao', 'limpeza'],
    price: 89.90,
    promotional_price: 79.90,
    rating: 4.9,
    reviews_count: 84,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600',
    description: 'Poderoso escudo de proteção contra energias densas, inveja e ataques psíquicos.',
    badge: 'Mais Vendido',
    in_stock: true
  },
  {
    id: 102,
    name: 'Pulseira Turmalina Negra Proteção Ativa',
    slug: 'pulseira-turmalina-negra',
    category: 'Amuletos',
    intentions: ['protecao', 'prosperidade'],
    price: 64.00,
    promotional_price: 54.90,
    rating: 5.0,
    reviews_count: 112,
    image: 'https://images.unsplash.com/photo-1611591475155-4286fafb33e6?w=600',
    description: 'Repele vibrações negativas e cria um campo de isolamento magnético no corpo.',
    badge: 'Destaque',
    in_stock: true
  },
  {
    id: 103,
    name: 'Kit Defumação Proteção Espiritual',
    slug: 'kit-defumacao-protecao',
    category: 'Incensos',
    intentions: ['protecao', 'limpeza', 'harmonia-lar'],
    price: 49.90,
    rating: 4.8,
    reviews_count: 47,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600',
    description: 'Composto de Mirra, Benjoim e Breu Branco para selar e blindar a residência.',
    in_stock: true
  },
  {
    id: 104,
    name: 'Turmalina Negra Bruta de Alta Frequência',
    slug: 'turmalina-negra-bruta',
    category: 'Cristais',
    intentions: ['protecao', 'limpeza'],
    price: 38.00,
    rating: 4.9,
    reviews_count: 65,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600',
    description: 'Ideal para colocar na porta de entrada da casa ou mesa de trabalho contra olho gordo.',
    in_stock: true
  },
  {
    id: 105,
    name: 'Spray Energético Proteção & Fechamento de Aura',
    slug: 'spray-energetico-protecao',
    category: 'Aromaterapia',
    intentions: ['protecao', 'limpeza'],
    price: 45.00,
    promotional_price: 39.90,
    rating: 4.7,
    reviews_count: 39,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600',
    description: 'Elixir com óleos essenciais de Alecrim, Cedro e tintura sagrada de arruda.',
    in_stock: true
  },
  {
    id: 106,
    name: 'Banho de Ervas Proteção e Descarrego',
    slug: 'banho-ervas-protecao',
    category: 'Banhos',
    intentions: ['protecao', 'limpeza'],
    price: 29.90,
    rating: 5.0,
    reviews_count: 140,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600',
    description: 'Arruda, Guiné, Espada de São Jorge e Sal Rosa do Himalaia.',
    in_stock: true
  },

  // --- PROSPERIDADE ---
  {
    id: 201,
    name: 'Cristal Citrino Natural Bruto (Prosperidade Solar)',
    slug: 'cristal-citrino-natural-bruto',
    category: 'Cristais',
    intentions: ['prosperidade', 'abertura-caminhos'],
    price: 55.00,
    promotional_price: 49.00,
    rating: 5.0,
    reviews_count: 98,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600',
    description: 'Magnetiza ganhos financeiros, oportunidades e energia de sucesso nos negócios.',
    badge: 'Queridinho',
    in_stock: true
  },
  {
    id: 202,
    name: 'Banho Atrai Dinheiro e Abre Caminhos',
    slug: 'banho-atrai-dinheiro-abre-caminhos',
    category: 'Banhos',
    intentions: ['prosperidade', 'abertura-caminhos'],
    price: 29.90,
    rating: 4.9,
    reviews_count: 73,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600',
    description: 'Louro, Canela em pau, Cravo e Noz moscada para fluir abundância e novos empregos.',
    in_stock: true
  },
  {
    id: 203,
    name: 'Pirita Dourada da Abundância Bruta',
    slug: 'pirita-abundancia-bruta',
    category: 'Cristais',
    intentions: ['prosperidade', 'abertura-caminhos'],
    price: 48.00,
    rating: 4.9,
    reviews_count: 51,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600',
    description: 'Conhecida como o ouro dos tolos, atrai riqueza, expansão e novos contratos.',
    in_stock: true
  },
  {
    id: 204,
    name: 'Vela Aromática de Canela & Cravo da Fortuna',
    slug: 'vela-canela-cravo-fortuna',
    category: 'Velas',
    intentions: ['prosperidade', 'harmonia-lar'],
    price: 59.90,
    rating: 4.8,
    reviews_count: 36,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600',
    description: 'Aquece a energia do ambiente e abre fluxo de prosperidade financeira.',
    in_stock: true
  },

  // --- LIMPEZA ---
  {
    id: 301,
    name: 'Incenso Natural de Sálvia Branca Californiana',
    slug: 'incenso-salvia-branca',
    category: 'Incensos',
    intentions: ['limpeza', 'paz', 'harmonia-lar'],
    price: 36.00,
    rating: 4.9,
    reviews_count: 55,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600',
    description: 'Purificação profunda de ambientes pesados e renovação completa do ar.',
    in_stock: true
  },
  {
    id: 302,
    name: 'Banho Descarrego Pesado 7 Ervas Sagradas',
    slug: 'banho-descarrego-pesado-7-ervas',
    category: 'Banhos',
    intentions: ['limpeza', 'protecao'],
    price: 29.90,
    rating: 5.0,
    reviews_count: 120,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600',
    description: 'Descarrega cansaço acumulado, estresse e miasmas astrais da aura.',
    badge: 'Top Avaliado',
    in_stock: true
  },
  {
    id: 303,
    name: 'Selenita Branca Bastão Purificador',
    slug: 'selenita-branca-bastao',
    category: 'Cristais',
    intentions: ['limpeza', 'paz', 'espiritualidade'],
    price: 42.00,
    rating: 5.0,
    reviews_count: 64,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600',
    description: 'Cristal autolimpante capaz de purificar outros cristais e o campo áurico.',
    in_stock: true
  },

  // --- AMOR ---
  {
    id: 401,
    name: 'Vela Aromática Quartzo Rosa & Gerânio',
    slug: 'vela-quartzo-rosa-geranio',
    category: 'Velas',
    intentions: ['amor', 'paz', 'harmonia-lar'],
    price: 68.00,
    promotional_price: 59.90,
    rating: 4.9,
    reviews_count: 42,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600',
    description: 'Trabalha o amor próprio, autoestima, perdão e o chakra cardíaco.',
    in_stock: true
  },
  {
    id: 402,
    name: 'Pingente Coração Quartzo Rosa Polido',
    slug: 'pingente-coracao-quartzo-rosa',
    category: 'Amuletos',
    intentions: ['amor', 'paz'],
    price: 49.00,
    rating: 5.0,
    reviews_count: 67,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600',
    description: 'Pedra do amor incondicional para usar junto ao peito.',
    in_stock: true
  },

  // --- PAZ ---
  {
    id: 501,
    name: 'Japamala de Ametista 108 Contas Naturais',
    slug: 'japamala-ametista-108-contas',
    category: 'Amuletos',
    intentions: ['paz', 'espiritualidade', 'foco-e-clareza'],
    price: 129.00,
    promotional_price: 115.00,
    rating: 5.0,
    reviews_count: 67,
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600',
    description: 'Acalma a mente acelerada, alivia insônia e promove profunda serenidade.',
    in_stock: true
  },
  {
    id: 502,
    name: 'Ametista Drusa Natural Calmante',
    slug: 'ametista-drusa-natural',
    category: 'Cristais',
    intentions: ['paz', 'espiritualidade', 'harmonia-lar'],
    price: 58.00,
    rating: 4.9,
    reviews_count: 48,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600',
    description: 'Transmuta pensamentos agitados em calma e equilíbrio emocional.',
    in_stock: true
  }
];

export const INTENTION_MAPPINGS: { [key: string]: { name: string; icon: string } } = {
  'protecao': { name: 'Proteção & Defesa', icon: '🛡️' },
  'prosperidade': { name: 'Prosperidade & Riqueza', icon: '💰' },
  'limpeza': { name: 'Limpeza & Descarrego', icon: '🌿' },
  'amor': { name: 'Amor & Harmonia', icon: '❤️' },
  'paz': { name: 'Paz & Serenidade', icon: '🕊️' },
  'espiritualidade': { name: 'Espiritualidade', icon: '🪷' },
  'abertura-caminhos': { name: 'Abertura de Caminhos', icon: '🚪' },
  'harmonia-lar': { name: 'Harmonia para o Lar', icon: '🏠' }
};
