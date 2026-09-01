-- ==============================================================================
-- DADOS INICIAIS (SEED) - INTENÇÕES, CATEGORIAS E PRODUTOS
-- ==============================================================================

-- 1. Categorias
INSERT INTO categories (name, slug, description, icon) VALUES
('Cristais e Pedras', 'cristais-e-pedras', 'Pedras brutas, roladas e cristais de alta vibração', '💎'),
('Incensos e Defumadores', 'incensos-e-defumadores', 'Incensos naturais, resinas e ervas para defumação', '💨'),
('Banhos de Ervas', 'banhos-de-ervas', 'Misturas fitoterápicas e rituais de descarrego e atração', '🌿'),
('Amuletos e Japamalas', 'amuletos-e-japamalas', 'Colares, pulseiras e talismãs energéticos', '📿'),
('Velas Aromáticas', 'velas-aromaticas', 'Velas de cera vegetal com óleos essenciais e intenção', '🕯️')
ON CONFLICT (slug) DO NOTHING;

-- 2. Intenções Canônicas
INSERT INTO intentions (name, slug, description, synonyms, icon) VALUES
(
    'Proteção', 
    'protecao', 
    'Afastamento de energias ruins, defesa espiritual, escudo áurico, blindagem contra inveja, mau-olhado e negatividade.',
    ARRAY['afastar energia ruim', 'inveja', 'mau olhado', 'defesa espiritual', 'escudo protetor', 'bloqueio de negatividade', 'quebrar demanda'],
    '🛡️'
),
(
    'Prosperidade', 
    'prosperidade', 
    'Abertura de caminhos financeiros, atração de dinheiro, abundância, sucesso profissional e oportunidades de negócios.',
    ARRAY['dinheiro', 'atrair riqueza', 'abundancia', 'abrir caminhos', 'sucesso financeiro', 'vendas', 'emprego'],
    '💰'
),
(
    'Amor e Relacionamento', 
    'amor', 
    'Atração de amor verdadeiro, harmonia conjugal, fortalecimento de laços afetivos e amor próprio.',
    ARRAY['atrair amor', 'harmonia no casal', 'amor proprio', 'autoestima', 'paixao', 'reconciliacao'],
    '💖'
),
(
    'Limpeza e Descarrego', 
    'limpeza-energetica', 
    'Purificação profunda da aura, eliminação de miasmas, descarrego energético, renovação e purificação de ambientes.',
    ARRAY['descarrego', 'limpar a casa', 'tirar peso das costas', 'purificacao', 'renovacao de energia', 'fadiga espiritual'],
    '✨'
),
(
    'Paz e Serenidade', 
    'paz-e-serenidade', 
    'Alívio de ansiedade e estresse, equilíbrio emocional, sono tranquilo, harmonia familiar e serenidade.',
    ARRAY['ansiedade', 'estresse', 'dormir melhor', 'calmaria', 'tranquilidade', 'paz interior', 'acalmar a mente'],
    '🕊️'
),
(
    'Foco e Clareza Mental', 
    'foco-e-clareza', 
    'Concentração para estudos e trabalho, tomada de decisões, clareza mental e despertar da intuição.',
    ARRAY['estudos', 'concentracao', 'clareza mental', 'tomar decisao', 'mente focada', 'intuicao'],
    '🧠'
)
ON CONFLICT (slug) DO NOTHING;

-- 3. Produtos
INSERT INTO products (name, slug, description, how_to_use, price, promotional_price, stock_quantity, sku, images, is_active) VALUES
(
    'Colar Amuleto de Obsidiana Negra',
    'colar-amuleto-obsidiana-negra',
    'Poderoso escudo de proteção contra energias densas, inveja e ataques psíquicos. Feito com pedra natural autêntica.',
    'Use diariamente na altura do peito. Limpe sob água corrente uma vez por semana.',
    89.90,
    79.90,
    35,
    'OBS-001',
    ARRAY['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600'],
    TRUE
),
(
    'Cristal Citrino Natural Bruto (Atrair Prosperidade)',
    'cristal-citrino-natural-bruto',
    'A pedra máxima da abundância financeira e energia solar. Não acumula negatividade e magnetiza oportunidades de ganhos.',
    'Coloque na sua carteira, mesa de trabalho ou no canto da prosperidade da casa.',
    55.00,
    49.00,
    50,
    'CIT-002',
    ARRAY['https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600'],
    TRUE
),
(
    'Banho de Ervas Descarrego e Limpeza Pesada (Arruda, Guiné e Alecrim)',
    'banho-descarrego-limpeza-pesada',
    'Mistura fitoterápica potente para descarregar cansaço acumulado, afastar larvas astrais e renovar a vitalidade.',
    'Ferva 1 litro de água, adicione as ervas, abafe por 15 minutos e jogue do pescoço para baixo após o banho higiênico.',
    29.90,
    NULL,
    100,
    'BNH-003',
    ARRAY['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600'],
    TRUE
),
(
    'Vela Aromática de Quartzo Rosa & Gerânio (Amor e Autoestima)',
    'vela-quartzo-rosa-geranio',
    'Vela 100% vegetal com essência pura de gerânio e cascalho de quartzo rosa, trabalhando o chakra cardíaco.',
    'Acenda em momentos de autocuidado, meditação ou para harmonizar o ambiente do casal.',
    68.00,
    59.90,
    25,
    'VEL-004',
    ARRAY['https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600'],
    TRUE
),
(
    'Incenso Natural de Sálvia Branca e Olíbano',
    'incenso-salvia-branca-olibano',
    'Defumação milenar utilizada para purificação profunda de ambientes pesados e elevação da frequência espiritual.',
    'Passe a fumaça pelos quatro cantos do cômodo, mantendo portas e janelas abertas.',
    32.00,
    NULL,
    80,
    'INC-005',
    ARRAY['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600'],
    TRUE
),
(
    'Kit Pulseiras Olho de Tigre e Turmalina Negra',
    'kit-pulseiras-olho-de-tigre-turmalina',
    'Dupla imbatível: Turmalina para repelir energias ruins e Olho de Tigre para dar coragem, clareza e prosperidade.',
    'Use no pulso esquerdo (lado de recepção energética) para proteção ativa.',
    94.00,
    84.90,
    40,
    'PUL-006',
    ARRAY['https://images.unsplash.com/photo-1611591475155-4286fafb33e6?w=600'],
    TRUE
),
(
    'Japamala de Ametista 108 Contas (Paz e Intuição)',
    'japamala-ametista-108-contas',
    'Pedra da transmutação espiritual, excelente para aliviar a mente acelerada, insônia e ansiedade profunda.',
    'Utilize para entoar mantras, orações ou respirações conscientes.',
    129.00,
    115.00,
    15,
    'JAP-007',
    ARRAY['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600'],
    TRUE
),
(
    'Banho Atrai Dinheiro e Abre Caminhos (Canela, Louro e Cravo)',
    'banho-atrai-dinheiro-abre-caminhos',
    'Ervas quentes e expansivas consagradas para atrair abundância financeira, novas oportunidades e clientes.',
    'Prepare na fase da lua crescente ou cheia. Jogue do pescoço para baixo mentalizando prosperidade.',
    29.90,
    NULL,
    90,
    'BNH-008',
    ARRAY['https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600'],
    TRUE
)
ON CONFLICT (slug) DO NOTHING;

-- 4. Associação de Produtos com Categorias
INSERT INTO product_categories (product_id, category_id)
SELECT p.id, c.id FROM products p, categories c
WHERE (p.slug = 'colar-amuleto-obsidiana-negra' AND c.slug = 'amuletos-e-japamalas')
   OR (p.slug = 'cristal-citrino-natural-bruto' AND c.slug = 'cristais-e-pedras')
   OR (p.slug = 'banho-descarrego-limpeza-pesada' AND c.slug = 'banhos-de-ervas')
   OR (p.slug = 'vela-quartzo-rosa-geranio' AND c.slug = 'velas-aromaticas')
   OR (p.slug = 'incenso-salvia-branca-olibano' AND c.slug = 'incensos-e-defumadores')
   OR (p.slug = 'kit-pulseiras-olho-de-tigre-turmalina' AND c.slug = 'amuletos-e-japamalas')
   OR (p.slug = 'japamala-ametista-108-contas' AND c.slug = 'amuletos-e-japamalas')
   OR (p.slug = 'banho-atrai-dinheiro-abre-caminhos' AND c.slug = 'banhos-de-ervas')
ON CONFLICT DO NOTHING;

-- 5. Associação de Produtos com Intenções (com pesos de relevância)
INSERT INTO product_intentions (product_id, intention_id, relevance_weight)
SELECT p.id, i.id, w.weight FROM products p, intentions i,
(VALUES 
    -- Obsidiana -> Proteção (1.0), Limpeza (0.8)
    ('colar-amuleto-obsidiana-negra', 'protecao', 1.00),
    ('colar-amuleto-obsidiana-negra', 'limpeza-energetica', 0.80),
    
    -- Citrino -> Prosperidade (1.0), Foco (0.6)
    ('cristal-citrino-natural-bruto', 'prosperidade', 1.00),
    ('cristal-citrino-natural-bruto', 'foco-e-clareza', 0.60),
    
    -- Banho Descarrego -> Limpeza (1.0), Proteção (0.85)
    ('banho-descarrego-limpeza-pesada', 'limpeza-energetica', 1.00),
    ('banho-descarrego-limpeza-pesada', 'protecao', 0.85),
    
    -- Vela Quartzo Rosa -> Amor (1.0), Paz (0.75)
    ('vela-quartzo-rosa-geranio', 'amor', 1.00),
    ('vela-quartzo-rosa-geranio', 'paz-e-serenidade', 0.75),
    
    -- Incenso Sálvia -> Limpeza (0.95), Paz (0.80), Proteção (0.70)
    ('incenso-salvia-branca-olibano', 'limpeza-energetica', 0.95),
    ('incenso-salvia-branca-olibano', 'paz-e-serenidade', 0.80),
    ('incenso-salvia-branca-olibano', 'protecao', 0.70),
    
    -- Kit Pulseiras -> Proteção (0.95), Prosperidade (0.80)
    ('kit-pulseiras-olho-de-tigre-turmalina', 'protecao', 0.95),
    ('kit-pulseiras-olho-de-tigre-turmalina', 'prosperidade', 0.80),
    
    -- Japamala Ametista -> Paz (1.0), Foco (0.85), Limpeza (0.60)
    ('japamala-ametista-108-contas', 'paz-e-serenidade', 1.00),
    ('japamala-ametista-108-contas', 'foco-e-clareza', 0.85),
    
    -- Banho Prosperidade -> Prosperidade (1.0), Foco (0.50)
    ('banho-atrai-dinheiro-abre-caminhos', 'prosperidade', 1.00)
) AS w(p_slug, i_slug, weight)
WHERE p.slug = w.p_slug AND i.slug = w.i_slug
ON CONFLICT (product_id, intention_id) DO UPDATE SET relevance_weight = EXCLUDED.relevance_weight;
