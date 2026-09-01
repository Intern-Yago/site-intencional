import { ENV } from '../config/env.js';

export interface CanonicalIntentInfo {
  id: number;
  name: string;
  slug: string;
  description: string;
  synonyms: string[];
}

export interface ClassificationResult {
  matched_slug: string | null;
  confidence: number;
  reasoning: string;
}

export class GeminiService {
  private static apiKey = ENV.GEMINI_API_KEY;

  /**
   * Gera o vetor de embedding de 768 dimensões para um determinado texto usando gemini-embedding-001
   */
  static async generateEmbedding(text: string): Promise<number[]> {
    if (!this.apiKey || this.apiKey === 'sua-gemini-api-key-aqui') {
      console.warn('⚠️ GEMINI_API_KEY não configurada. Gerando vetor mock temporário.');
      return new Array(768).fill(0).map(() => Math.random() * 0.02 - 0.01);
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${this.apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: {
          parts: [{ text: text.trim() }]
        },
        outputDimensionality: 768
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Erro ao gerar embedding no Gemini (${response.status}): ${errText}`);
    }

    const data = await response.json() as { embedding?: { values: number[] } };
    if (!data.embedding?.values) {
      throw new Error('Formato de resposta inválido na API de Embeddings do Gemini');
    }

    return data.embedding.values;
  }

  /**
   * Fallback com LLM: Classifica uma consulta complexa que não atingiu a similaridade vetorial mínima
   */
  static async classifyIntentFallback(
    queryText: string,
    canonicalIntents: CanonicalIntentInfo[]
  ): Promise<ClassificationResult> {
    if (!this.apiKey || this.apiKey === 'sua-gemini-api-key-aqui') {
      return {
        matched_slug: null,
        confidence: 0,
        reasoning: 'GEMINI_API_KEY não configurada'
      };
    }

    const intentsDescription = canonicalIntents.map(i => 
      `- SLUG: "${i.slug}" | NOME: "${i.name}" | DESCRIÇÃO: "${i.description}" | SINÔNIMOS: ${i.synonyms.join(', ')}`
    ).join('\n');

    const prompt = `Você é um motor de classificação de intenções para um catálogo espiritual e energético.
O usuário fez a seguinte busca no site:
"${queryText}"

As intenções canônicas cadastradas no sistema são:
${intentsDescription}

Sua tarefa:
1. Analise o que o usuário realmente deseja atrair, afastar, harmonizar ou resolver.
2. Identifique se essa necessidade corresponde a uma das intenções da lista acima.
3. Se corresponder com clareza, retorne o SLUG correspondente e uma nota de confiança entre 0.0 e 1.0.
4. Se a busca for totalmente irrelevante (ex: "comprar celular", "futebol") ou ininteligível, retorne matched_slug como null.

Responda ESTRITAMENTE em formato JSON com o seguinte schema:
{
  "matched_slug": "slug_da_intencao_ou_null",
  "confidence": 0.95,
  "reasoning": "Breve justificativa em 1 frase"
}`;

    const modelsToTry = [
      'gemini-3.5-flash-lite',
      'gemini-3.5-flash',
      'gemini-3.7-flash'
    ];

    for (const model of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.1
            }
          })
        });

        if (!response.ok) {
          continue; // tenta o próximo modelo da lista
        }

        const data = await response.json() as any;
        const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!rawContent) continue;

        const parsed = JSON.parse(rawContent);
        return {
          matched_slug: parsed.matched_slug || null,
          confidence: Number(parsed.confidence) || 0,
          reasoning: parsed.reasoning || ''
        };
      } catch (err) {
        console.warn(`Tentativa com ${model} falhou, tentando próximo...`);
      }
    }

    return { matched_slug: null, confidence: 0, reasoning: 'Modelos indisponíveis' };
  }
}
