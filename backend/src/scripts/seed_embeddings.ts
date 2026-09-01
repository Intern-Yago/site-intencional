import { supabase } from '../config/supabase.js';
import { GeminiService } from '../services/gemini.service.js';

async function generateIntentionsEmbeddings() {
  console.log('🌟 Iniciando vetorização das Intenções Canônicas...');

  const { data: intentions, error } = await supabase
    .from('intentions')
    .select('id, name, slug, description, synonyms');

  if (error || !intentions || intentions.length === 0) {
    console.error('❌ Não foi possível carregar as intenções do Supabase:', error?.message);
    return;
  }

  console.log(`Encontradas ${intentions.length} intenções para vetorizar.`);

  for (const intent of intentions) {
    const textToEmbed = `${intent.name} - ${intent.description}. Sinônimos e termos: ${(intent.synonyms || []).join(', ')}`;
    console.log(`\n🔮 Gerando embedding para [${intent.name}]...`);
    
    try {
      const vector = await GeminiService.generateEmbedding(textToEmbed);
      
      const { error: updateErr } = await supabase
        .from('intentions')
        .update({ embedding: vector })
        .eq('id', intent.id);

      if (updateErr) {
        console.error(`❌ Erro ao salvar embedding de ${intent.name}:`, updateErr.message);
      } else {
        console.log(`✅ Embedding de [${intent.name}] salvo com sucesso no Supabase!`);
      }
    } catch (e: any) {
      console.error(`❌ Falha ao processar ${intent.name}:`, e.message);
    }
  }

  console.log('\n🎉 Todas as intenções canônicas foram vetorizadas e indexadas!');
}

generateIntentionsEmbeddings();
