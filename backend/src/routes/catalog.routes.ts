import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';
import { FALLBACK_INTENTIONS, FALLBACK_PRODUCTS } from '../services/search.service.js';

export const catalogRouter = Router();

// GET /api/catalog/intentions
catalogRouter.get('/intentions', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('intentions')
      .select('id, name, slug, description, icon, synonyms')
      .order('name');

    if (!error && data && data.length > 0) {
      return res.json(data);
    }
  } catch (err) {
    // Silencioso
  }

  return res.json(FALLBACK_INTENTIONS);
});

// GET /api/catalog/categories
catalogRouter.get('/categories', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, slug, description, icon')
      .order('name');

    if (!error && data && data.length > 0) {
      return res.json(data);
    }
  } catch (err) {
    // Silencioso
  }

  return res.json([
    { id: 1, name: 'Cristais e Pedras', slug: 'cristais-e-pedras', icon: '💎' },
    { id: 2, name: 'Incensos e Defumadores', slug: 'incensos-e-defumadores', icon: '💨' },
    { id: 3, name: 'Banhos de Ervas', slug: 'banhos-de-ervas', icon: '🌿' },
    { id: 4, name: 'Amuletos e Japamalas', slug: 'amuletos-e-japamalas', icon: '📿' },
    { id: 5, name: 'Velas Aromáticas', slug: 'velas-aromaticas', icon: '🕯️' }
  ]);
});

// GET /api/catalog/products
catalogRouter.get('/products', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true);

    if (!error && data && data.length > 0) {
      return res.json(data);
    }
  } catch (err) {
    // Silencioso
  }

  return res.json(FALLBACK_PRODUCTS);
});
