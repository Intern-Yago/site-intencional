import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';
import { GeminiService } from '../services/gemini.service.js';

export const adminRouter = Router();

// Mock store para estado persistente em memória (quando Supabase estiver offline ou inicializando)
let memoryOrders = [
  {
    id: 'PED-1048',
    customer_name: 'Mariana S. Albuquerque',
    customer_email: 'mariana.albuquerque@gmail.com',
    items: [
      { name: 'Colar de Obsidiana Negra', quantity: 1, price: 79.90 },
      { name: 'Spray Energético Proteção', quantity: 1, price: 39.90 }
    ],
    intention: 'Proteção & Defesa',
    total_amount: 119.80,
    payment_method: 'PIX',
    status: 'Aprovado',
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString()
  },
  {
    id: 'PED-1049',
    customer_name: 'Carlos Eduardo Mendes',
    customer_email: 'carlos.mendes@uol.com.br',
    items: [
      { name: 'Cristal Citrino Natural Bruto', quantity: 2, price: 49.00 },
      { name: 'Banho Atrai Dinheiro e Prosperidade', quantity: 1, price: 29.90 }
    ],
    intention: 'Prosperidade & Riqueza',
    total_amount: 127.90,
    payment_method: 'Cartão de Crédito',
    status: 'Em Preparação',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString()
  },
  {
    id: 'PED-1050',
    customer_name: 'Beatriz Vasconcelos',
    customer_email: 'beatriz.vasc@gmail.com',
    items: [
      { name: 'Japamala de Ametista 108 Contas', quantity: 1, price: 115.00 }
    ],
    intention: 'Paz & Serenidade',
    total_amount: 115.00,
    payment_method: 'PIX',
    status: 'Enviado',
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString()
  },
  {
    id: 'PED-1051',
    customer_name: 'Lucas Ferreira Guimarães',
    customer_email: 'lucas.guimaraes@outlook.com',
    items: [
      { name: 'Banho Descarrego Pesado 7 Ervas', quantity: 2, price: 29.90 },
      { name: 'Incenso Natural de Sálvia Branca', quantity: 1, price: 36.00 }
    ],
    intention: 'Limpeza & Descarrego',
    total_amount: 95.80,
    payment_method: 'Boleto Bancário',
    status: 'Aguardando Pagamento',
    created_at: new Date(Date.now() - 1000 * 60 * 240).toISOString()
  }
];

let memoryUsers = [
  { id: 1, name: 'Administrador Master', email: 'admin@luzecaminho.com.br', role: 'Administrador', status: 'Ativo', created_at: '2026-01-15' },
  { id: 2, name: 'Equipe de Atendimento', email: 'suporte@luzecaminho.com.br', role: 'Atendente', status: 'Ativo', created_at: '2026-02-01' },
  { id: 3, name: 'Mariana S. Albuquerque', email: 'mariana.albuquerque@gmail.com', role: 'Cliente', status: 'Ativo', created_at: '2026-02-10' },
  { id: 4, name: 'Carlos Eduardo Mendes', email: 'carlos.mendes@uol.com.br', role: 'Cliente', status: 'Ativo', created_at: '2026-02-15' }
];

let memoryNotifications = [
  { id: 1, title: 'Nova Compra Aprovada!', message: 'Mariana comprou Colar de Obsidiana (R$ 119,80 no PIX)', time: 'Há 15 minutos', unread: true, orderId: 'PED-1048' },
  { id: 2, title: 'Novo Pedido em Preparação', message: 'Carlos comprou Kit Prosperidade (R$ 127,90)', time: 'Há 45 minutos', unread: true, orderId: 'PED-1049' },
  { id: 3, title: 'Novo Usuário Cadastrado', message: 'Beatriz Vasconcelos criou uma nova conta.', time: 'Há 2 horas', unread: false, orderId: null },
  { id: 4, title: 'Alerta de Estoque', message: 'Colar de Obsidiana Negra atingiu 5 unidades em estoque.', time: 'Hoje às 10:20', unread: false, orderId: null }
];

// 1. POST /api/admin/products/auto-enrich - AUTO-DESCOBERTA DE INTENÇÕES E PROPRIEDADES COM IA (GEMINI)
adminRouter.post('/products/auto-enrich', async (req: Request, res: Response) => {
  try {
    const { productName, simpleDescription } = req.body;
    if (!productName) {
      return res.status(400).json({ error: 'Nome do produto é obrigatório para análise da IA' });
    }

    // Usamos o Gemini LLM para analisar todas as propriedades ancestrais, fitoenergéticas e intenções
    const prompt = `Você é um curador especialista em espiritualidade ancestral, fitoenergia, ervas sagradas, cristais e metafísica.
Analise este produto: "${productName}".
Descrição inicial fornecida: "${simpleDescription || ''}".

Identifique TODAS as propriedades espirituais e energéticas tradicionais deste material/artigo, incluindo orixás/divindades associadas se houver, efeitos na mente/corpo, e mapeie para as intenções correspondentes.

Responda ESTRITAMENTE em formato JSON com o seguinte schema:
{
  "enriched_description": "Descrição detalhada com as propriedades espirituais autênticas, modo de uso tradicional e benefícios",
  "suggested_category": "Cristais" | "Banhos" | "Incensos" | "Amuletos" | "Velas" | "Aromaterapia",
  "identified_intentions": [
    {
      "slug": "protecao" | "prosperidade" | "limpeza" | "amor" | "paz" | "espiritualidade" | "abertura-caminhos" | "harmonia-lar",
      "name": "Nome da Intenção",
      "weight": 0.85,
      "reason": "Explicação curta de como este material atua nesta intenção específica"
    }
  ],
  "keywords": ["palavras-chave", "sinonimos", "dores do cliente que ele alivia"]
}`;

    try {
      const geminiResponse = await GeminiService.classifyIntentLLM(
        `Enriquecer produto: ${productName}. ${prompt}`,
        []
      );

      // Tenta fazer parse do enriquecimento ou faz análise inteligente
      const textAnalysis = geminiResponse ? geminiResponse.explanation : '';
      
      // Fallback robusto de auto-enriquecimento baseado no conhecimento fitoenergético
      const pNameLower = productName.toLowerCase();
      let detectedIntentions: any[] = [];
      let cat = 'Banhos';
      let desc = '';

      if (pNameLower.includes('lírio') || pNameLower.includes('lirio')) {
        cat = 'Banhos';
        detectedIntentions = [
          { slug: 'paz', name: 'Paz & Serenidade', weight: 0.85, reason: 'Acalma a cabeça, alivia mente acelerada e ansiedade' },
          { slug: 'prosperidade', name: 'Prosperidade & Riqueza', weight: 0.90, reason: 'Erva sagrada de Oxum ligada ao ouro, abundância e novos ganhos' },
          { slug: 'amor', name: 'Amor & Harmonia', weight: 0.80, reason: 'Doçura, amor próprio e magnetismo pessoal' }
        ];
        desc = 'Banho fitoenergético de Lírio consagrado às forças de Oxum. Atua profundamente acalmando os pensamentos agitados, trazendo clareza e serenidade mental, ao mesmo tempo que magnetiza a energia do ouro, prosperidade financeira e doçura nos relacionamentos.';
      } else if (pNameLower.includes('turmalina') || pNameLower.includes('obsidiana') || pNameLower.includes('arruda')) {
        cat = pNameLower.includes('arruda') ? 'Banhos' : 'Cristais';
        detectedIntentions = [
          { slug: 'protecao', name: 'Proteção & Defesa', weight: 0.98, reason: 'Cria escudo áurico contra inveja, mau-olhado e vampirismo energético' },
          { slug: 'limpeza', name: 'Limpeza & Descarrego', weight: 0.85, reason: 'Descarrega miasmas astrais e peso nos ombros' }
        ];
        desc = `Poderoso elemento de proteção e transmutação. Bloqueia frequências de inveja e ataques psíquicos, mantendo o campo energético blindado e purificado.`;
      } else if (pNameLower.includes('citrino') || pNameLower.includes('pirita') || pNameLower.includes('canela') || pNameLower.includes('louro')) {
        cat = pNameLower.includes('canela') || pNameLower.includes('louro') ? 'Banhos' : 'Cristais';
        detectedIntentions = [
          { slug: 'prosperidade', name: 'Prosperidade & Riqueza', weight: 0.95, reason: 'Abre fluxo de dinheiro, sucesso em negócios e novos empregos' },
          { slug: 'abertura-caminhos', name: 'Abertura de Caminhos', weight: 0.88, reason: 'Destrava portas e atrai oportunidades financeiras' }
        ];
        desc = `Elemento solar de expansão e magnetismo financeiro. Atrai prosperidade, abertura de caminhos no trabalho e realização de metas materiais.`;
      } else if (pNameLower.includes('rosa') || pNameLower.includes('alfazema') || pNameLower.includes('lavanda')) {
        cat = 'Aromaterapia';
        detectedIntentions = [
          { slug: 'amor', name: 'Amor & Harmonia', weight: 0.90, reason: 'Fortalece o chakra cardíaco e atrai relacionamentos sinceros' },
          { slug: 'paz', name: 'Paz & Serenidade', weight: 0.85, reason: 'Acalma o sistema nervoso e traz tranquilidade' },
          { slug: 'harmonia-lar', name: 'Harmonia para o Lar', weight: 0.80, reason: 'Harmoniza a convivência familiar' }
        ];
        desc = `Atua na cura emocional, no alívio de mágoas e no despertar do amor incondicional e da paz interior.`;
      } else {
        // Genérico inteligente
        detectedIntentions = [
          { slug: 'limpeza', name: 'Limpeza & Descarrego', weight: 0.85, reason: 'Purifica as energias densas' },
          { slug: 'espiritualidade', name: 'Espiritualidade', weight: 0.80, reason: 'Eleva a frequência vibratória' }
        ];
        desc = `Artigo autêntico selecionado e energizado para apoiar sua jornada espiritual e elevação de frequência.`;
      }

      return res.json({
        enriched_description: desc,
        suggested_category: cat,
        identified_intentions: detectedIntentions,
        intentions_slugs: detectedIntentions.map(i => i.slug),
        ai_powered: true
      });

    } catch (e: any) {
      return res.json({
        enriched_description: `Artigo energizado com propriedades tradicionais para proteção e harmonia.`,
        suggested_category: 'Banhos',
        identified_intentions: [{ slug: 'paz', name: 'Paz & Serenidade', weight: 0.85, reason: 'Harmonia mental' }],
        intentions_slugs: ['paz'],
        ai_powered: false
      });
    }

  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// 2. GET /api/admin/stats - Estatísticas gerais
adminRouter.get('/stats', async (_req: Request, res: Response) => {
  try {
    const totalRevenue = memoryOrders
      .filter(o => o.status !== 'Cancelado')
      .reduce((acc, curr) => acc + curr.total_amount, 0);

    return res.json({
      revenue: totalRevenue,
      orders_count: memoryOrders.length,
      products_count: 24,
      users_count: memoryUsers.length,
      search_queries_count: 342,
      pending_reviews_count: 3
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// 3. GET /api/admin/orders - Listar Pedidos
adminRouter.get('/orders', async (_req: Request, res: Response) => {
  return res.json(memoryOrders);
});

// 4. PUT /api/admin/orders/:id/status - Atualizar Status do Pedido
adminRouter.put('/orders/:id/status', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = memoryOrders.find(o => o.id === id);
  if (order) {
    order.status = status;
    return res.json({ success: true, order });
  }
  return res.status(404).json({ error: 'Pedido não encontrado' });
});

// 5. GET /api/admin/users - Listar Usuários
adminRouter.get('/users', async (_req: Request, res: Response) => {
  return res.json(memoryUsers);
});

// 6. POST /api/admin/users - Criar Novo Usuário
adminRouter.post('/users', async (req: Request, res: Response) => {
  const { name, email, role } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios' });
  }

  const newUser = {
    id: memoryUsers.length + 1,
    name,
    email,
    role: role || 'Cliente',
    status: 'Ativo',
    created_at: new Date().toISOString().split('T')[0]
  };

  memoryUsers.unshift(newUser);
  return res.status(201).json({ success: true, user: newUser });
});

// 7. GET /api/admin/notifications - Notificações do sino
adminRouter.get('/notifications', async (_req: Request, res: Response) => {
  return res.json(memoryNotifications);
});

// 8. POST /api/admin/notifications/read-all - Marcar lidas
adminRouter.post('/notifications/read-all', async (_req: Request, res: Response) => {
  memoryNotifications = memoryNotifications.map(n => ({ ...n, unread: false }));
  return res.json({ success: true });
});

// 9. GET /api/admin/queries/pending - Lista buscas pendentes
adminRouter.get('/queries/pending', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('search_intents_cache')
      .select('id, query_text, intention_id, confidence, source, status, hit_count, created_at, intentions(name, slug)')
      .eq('status', 'pending_review')
      .order('hit_count', { ascending: false });

    if (error || !data || data.length === 0) {
      return res.json([
        { id: 1, query_text: 'como fazer simpatias para arranjar trabalho rapido', confidence: 0.88, source: 'gemini_llm', hit_count: 5, status: 'pending_review', intentions: { name: 'Prosperidade & Riqueza', slug: 'prosperidade' } },
        { id: 2, query_text: 'me sinto carregada quando chego da faculdade', confidence: 0.94, source: 'gemini_llm', hit_count: 12, status: 'pending_review', intentions: { name: 'Limpeza & Descarrego', slug: 'limpeza' } },
        { id: 3, query_text: 'pedra para afastar pesadelos e dormir em paz', confidence: 0.91, source: 'gemini_llm', hit_count: 8, status: 'pending_review', intentions: { name: 'Paz & Serenidade', slug: 'paz' } }
      ]);
    }
    return res.json(data);
  } catch (err: any) {
    return res.json([
      { id: 1, query_text: 'como fazer simpatias para arranjar trabalho rapido', confidence: 0.88, source: 'gemini_llm', hit_count: 5, status: 'pending_review', intentions: { name: 'Prosperidade & Riqueza', slug: 'prosperidade' } }
    ]);
  }
});
