# 🌟 Lumina — E-commerce & Catálogo Intencional

Sistema de **E-commerce com Busca Semântica Híbrida e Memória de Intenções**, construído com **Next.js 15**, **Node.js/TypeScript**, **Supabase (PostgreSQL + pgvector)** e **Google Gemini (Embeddings & Fallback)**.

---

## 🏛️ Arquitetura do Sistema

```text
                             USUÁRIO
                                │
                  "quero afastar inveja e peso"
                                │
                                ▼
                         FRONTEND (Next.js)
                                │
                                ▼
                         BACKEND (API TS)
                                │
                ┌───────────────┴───────────────┐
                ▼                               ▼
       Busca Exata / Sinônimo            Gera Embedding
        (se bater, retorna direto)      (gemini-embedding-001)
                                                │
                                                ▼
                                        SUPABASE pgvector
                                    (Busca no Cache & Intenções)
                                                │
                            ┌───────────────────┴───────────────────┐
                            │                                       │
                    Confiança >= 0.85                       Confiança < 0.85
                            │                                       │
                            ▼                                       ▼
                     Intenção Direta                       Gemini 3.5 Flash
                    (ex: Proteção 96%)                   (Classifica e grava
                            │                            no cache para aprender)
                            │                                       │
                            └───────────────────┬───────────────────┘
                                                │
                                                ▼
                                    SELECT * FROM products
                                    WHERE intention = 'protecao'
                                    ORDER BY relevance_weight DESC
```

---

## 🚀 Como Executar Localmente

### 1. Banco de Dados (Supabase)
1. No seu painel do **Supabase**, abra o **SQL Editor** (`>_`).
2. Execute o conteúdo de [`database/01_schema.sql`](./database/01_schema.sql) para criar as tabelas, índices `pgvector` HNSW e funções RPC.
3. Execute o conteúdo de [`database/02_seed.sql`](./database/02_seed.sql) para cadastrar as 6 intenções canônicas e os produtos iniciais.

### 2. Backend (API)
```bash
cd backend
npm install
npm run dev
```
* Servidor rodando em: `http://localhost:3001`
* Documentação de Healthcheck: `http://localhost:3001/health`
* Endpoint de Busca: `http://localhost:3001/api/search?q=inveja`

### 3. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
* Acesse no navegador: `http://localhost:3000`

---

## 🔒 Segurança e Boas Práticas
* Arquivos `.env` locais estão no `.gitignore`.
* Use o `.env.example` como referência de configuração.
* Rota de moderação em `/api/admin/queries/pending` para revisão editorial de termos aprendidos pela IA.
