import { createClient } from '@supabase/supabase-js';
import pg from 'pg';
import { ENV } from './env.js';

// Supabase REST Client
export const supabase = createClient(
  ENV.SUPABASE_URL || 'https://placeholder.supabase.co',
  ENV.SUPABASE_SERVICE_ROLE_KEY || ENV.SUPABASE_ANON_KEY || 'placeholder'
);

// PostgreSQL Direct / Pooler Connection (para queries que usam pgvector diretamente)
export const dbPool = ENV.DATABASE_URL
  ? new pg.Pool({
      connectionString: ENV.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    })
  : null;
