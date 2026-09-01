import { supabase } from './config/supabase.js';

async function testFetch() {
  try {
    const res = await fetch('https://imgfgzvqfvgcomngmxoc.supabase.co/rest/v1/', {
      headers: {
        'apikey': process.env.SUPABASE_ANON_KEY || ''
      }
    });
    console.log('Status REST:', res.status);
    const text = await res.text();
    console.log('Resposta:', text);
  } catch (e: any) {
    console.error('Erro no fetch direto:', e.cause || e);
  }
}

testFetch();
