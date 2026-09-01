import { SearchService } from './services/search.service.js';

async function testSearchEngine() {
  const queries = [
    'Quero afastar energia ruim e inveja no trabalho',
    'Preciso de mais dinheiro e abrir meus caminhos financeiros',
    'Como acalmar a mente e diminuir a ansiedade?',
    'Colar de obsidiana'
  ];

  for (const q of queries) {
    console.log(`\n========================================`);
    console.log(`🔎 BUSCA DO USUÁRIO: "${q}"`);
    console.log(`========================================`);
    const result = await SearchService.search(q);
    console.log(`✨ Intenção Detectada:`, result.matched_intent);
    console.log(`🛍️ Produtos Retornados (${result.products.length}):`);
    result.products.forEach(p => console.log(`  - ${p.name} (R$ ${p.price})`));
    console.log(`⏱️ Latência: ${result.debug?.latency_ms}ms`);
  }
}

testSearchEngine();
