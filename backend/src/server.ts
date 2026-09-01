import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import { searchRouter } from './routes/search.routes.js';
import { catalogRouter } from './routes/catalog.routes.js';
import { adminRouter } from './routes/admin.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Healthcheck
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'site-intencional-backend',
    gemini_configured: Boolean(ENV.GEMINI_API_KEY && ENV.GEMINI_API_KEY !== 'sua-gemini-api-key-aqui'),
    supabase_configured: Boolean(ENV.SUPABASE_URL && ENV.SUPABASE_URL !== 'https://seu-projeto.supabase.co')
  });
});

// Rotas da API
app.use('/api/search', searchRouter);
app.use('/api/catalog', catalogRouter);
app.use('/api/admin', adminRouter);

const PORT = Number(ENV.PORT) || 3001;

app.listen(PORT, () => {
  console.log(`\n==============================================`);
  console.log(`🚀 Servidor Site Intencional rodando na porta ${PORT}`);
  console.log(`👉 Healthcheck: http://localhost:${PORT}/health`);
  console.log(`👉 Busca Semântica: http://localhost:${PORT}/api/search?q=afastar+energia+ruim`);
  console.log(`👉 Catálogo: http://localhost:${PORT}/api/catalog/products`);
  console.log(`👉 Moderação/Admin: http://localhost:${PORT}/api/admin/queries/pending`);
  console.log(`==============================================\n`);
});
