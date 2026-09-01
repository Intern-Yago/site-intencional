import { Router, Request, Response } from 'express';
import { SearchService } from '../services/search.service.js';
import { supabase } from '../config/supabase.js';

export const searchRouter = Router();

/**
 * GET /api/search?q=afastar+energia+ruim
 * Endpoint principal de busca semântica
 */
searchRouter.get('/', async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).json({ error: 'Parâmetro de busca "q" é obrigatório.' });
    }

    const result = await SearchService.search(query);
    return res.json(result);
  } catch (error: any) {
    console.error('Erro na busca:', error);
    return res.status(500).json({ error: 'Erro interno ao processar a busca', details: error.message });
  }
});

/**
 * POST /api/search/feedback
 * Usuário confirma se a intenção sugerida estava correta
 */
searchRouter.post('/feedback', async (req: Request, res: Response) => {
  try {
    const { query_text, intention_id, is_correct } = req.body;
    
    if (!query_text || !intention_id) {
      return res.status(400).json({ error: 'query_text e intention_id são obrigatórios.' });
    }

    const normalized = SearchService.normalizeQuery(query_text);

    if (is_correct) {
      // Atualiza o cache para aprovado e incrementa relevância
      await supabase
        .from('search_intents_cache')
        .update({ status: 'approved' })
        .eq('normalized_query', normalized);
    } else {
      // Marca para revisão humana
      await supabase
        .from('search_intents_cache')
        .update({ status: 'pending_review' })
        .eq('normalized_query', normalized);
    }

    return res.json({ success: true, message: 'Feedback registrado com sucesso.' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
