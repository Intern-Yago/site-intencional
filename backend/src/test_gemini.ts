import { ENV } from './config/env.js';

const modelsToTry = [
  'gemini-2.5-flash-lite',
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.7-flash'
];

async function testModels() {
  const apiKey = ENV.GEMINI_API_KEY;
  const prompt = `Você é um motor de classificação de intenções para um catálogo espiritual.
O usuário buscou: "sinto muita inveja no meu trabalho e quero me blindar"

Intenções disponíveis:
- SLUG: "protecao" | NOME: "Proteção" | DESC: "Afastamento de energias ruins, defesa espiritual, blindagem contra inveja."
- SLUG: "prosperidade" | NOME: "Prosperidade" | DESC: "Abertura de caminhos financeiros, dinheiro, abundância."

Responda ESTRITAMENTE em formato JSON:
{
  "matched_slug": "slug_escolhido",
  "confidence": 0.95,
  "reasoning": "motivo"
}`;

  for (const model of modelsToTry) {
    console.log(`Testando modelo ${model}...`);
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      });
      const data = await res.json() as any;
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        console.log(`🎉 SUCESSO com ${model}!`);
        console.log(text);
        break;
      } else {
        console.log(`Falha em ${model}:`, data.error?.message || data);
      }
    } catch (e: any) {
      console.log(`Erro em ${model}: ${e.message}`);
    }
  }
}

testModels();
