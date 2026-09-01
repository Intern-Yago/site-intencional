-- ==============================================================================
-- 1. EXTENSÕES NECESSÁRIAS
-- ==============================================================================
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. TABELAS DO CATÁLOGO & INTENÇÕES
-- ==============================================================================

-- Categorias de Produtos (ex: Cristais, Incensos, Banhos de Ervas, Amuletos)
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Intenções Canônicas (ex: Proteção, Prosperidade, Amor, Limpeza, Paz, Foco)
-- Vetor de 768 dimensões compatível com o modelo Google Gemini (text-embedding-004)
CREATE TABLE IF NOT EXISTS intentions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    synonyms TEXT[], -- array de termos comuns (ex: ['afastar inveja', 'defesa', 'escudo'])
    icon VARCHAR(50),
    embedding vector(768),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Produtos
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    how_to_use TEXT, -- Modo de uso / ritual recomendado
    price DECIMAL(10, 2) NOT NULL,
    promotional_price DECIMAL(10, 2),
    stock_quantity INT DEFAULT 0,
    sku VARCHAR(100),
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    shopee_item_id VARCHAR(100), -- ID de sincronização com a Shopee
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Relação Produto <-> Categoria (N:N)
CREATE TABLE IF NOT EXISTS product_categories (
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, category_id)
);

-- Relação Produto <-> Intenção (N:N com peso de relevância)
CREATE TABLE IF NOT EXISTS product_intentions (
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    intention_id INT REFERENCES intentions(id) ON DELETE CASCADE,
    relevance_weight DECIMAL(3, 2) DEFAULT 1.0, -- de 0.0 a 1.0 (quão forte o produto atende à intenção)
    PRIMARY KEY (product_id, intention_id)
);

-- ==============================================================================
-- 3. MEMÓRIA SEMÂNTICA DE BUSCAS (O motor de aprendizado)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS search_intents_cache (
    id SERIAL PRIMARY KEY,
    query_text TEXT NOT NULL,
    normalized_query TEXT NOT NULL,
    intention_id INT REFERENCES intentions(id) ON DELETE CASCADE,
    embedding vector(768) NOT NULL,
    confidence DECIMAL(4, 3) NOT NULL,
    source VARCHAR(30) NOT NULL, -- 'exact_match', 'vector_match', 'llm_classified', 'manual'
    status VARCHAR(20) DEFAULT 'approved', -- 'approved', 'pending_review', 'rejected'
    hit_count INT DEFAULT 1,
    last_hit_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 4. PEDIDOS, ITENS & E-COMMERCE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    customer_document VARCHAR(20), -- CPF
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, paid, preparing, shipped, delivered, cancelled
    payment_method VARCHAR(50), -- pix, credit_card, boleto
    payment_id VARCHAR(100),
    shipping_address JSONB,
    shopee_order_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id),
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL
);

-- ==============================================================================
-- 5. ÍNDICES VETORIAIS (HNSW para busca ultrarrápida)
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_intentions_embedding 
ON intentions USING hnsw (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS idx_search_cache_embedding 
ON search_intents_cache USING hnsw (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS idx_search_cache_query 
ON search_intents_cache (normalized_query);

-- ==============================================================================
-- 6. FUNÇÕES RPC DO SUPABASE PARA BUSCA SEMÂNTICA
-- ==============================================================================

-- Função 1: Encontrar intenção por similaridade no cache e nas intenções canônicas
CREATE OR REPLACE FUNCTION match_search_intent(
    query_embedding vector(768),
    match_threshold float DEFAULT 0.70,
    match_count int DEFAULT 3
)
RETURNS TABLE (
    intention_id INT,
    intention_name VARCHAR,
    intention_slug VARCHAR,
    similarity FLOAT,
    source VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM (
        -- 1. Primeiro verifica no cache de buscas validadas
        SELECT 
            c.intention_id,
            i.name AS intention_name,
            i.slug AS intention_slug,
            (1 - (c.embedding <=> query_embedding))::FLOAT AS similarity,
            'cache'::VARCHAR AS source
        FROM search_intents_cache c
        JOIN intentions i ON i.id = c.intention_id
        WHERE c.status = 'approved'
          AND (1 - (c.embedding <=> query_embedding)) >= match_threshold
        
        UNION ALL
        
        -- 2. Também compara com as intenções canônicas diretamente
        SELECT 
            i.id AS intention_id,
            i.name AS intention_name,
            i.slug AS intention_slug,
            (1 - (i.embedding <=> query_embedding))::FLOAT AS similarity,
            'canonical'::VARCHAR AS source
        FROM intentions i
        WHERE i.embedding IS NOT NULL
          AND (1 - (i.embedding <=> query_embedding)) >= match_threshold
    ) results
    ORDER BY similarity DESC
    LIMIT match_count;
END;
$$;

-- Função 2: Retornar produtos associados a uma intenção com relevância
CREATE OR REPLACE FUNCTION get_products_by_intention(
    target_intention_id INT,
    limit_count INT DEFAULT 12
)
RETURNS TABLE (
    product_id INT,
    name VARCHAR,
    slug VARCHAR,
    description TEXT,
    price DECIMAL,
    promotional_price DECIMAL,
    images TEXT[],
    stock_quantity INT,
    relevance_weight DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id AS product_id,
        p.name,
        p.slug,
        p.description,
        p.price,
        p.promotional_price,
        p.images,
        p.stock_quantity,
        pi.relevance_weight
    FROM products p
    JOIN product_intentions pi ON pi.product_id = p.id
    WHERE pi.intention_id = target_intention_id
      AND p.is_active = TRUE
    ORDER BY pi.relevance_weight DESC, p.stock_quantity DESC
    LIMIT limit_count;
END;
$$;
