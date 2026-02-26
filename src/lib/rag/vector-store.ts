import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface VectorEntry {
  id: number;
  text: string;
  source: string;
  embedding: number[];
}

export interface SearchResult {
  text: string;
  source: string;
  score: number;
}

let cachedVectors: VectorEntry[] | null = null;

function loadVectors(): VectorEntry[] {
  if (cachedVectors) return cachedVectors;

  const vectorPath = join(process.cwd(), 'rag', 'vectors.json');
  if (!existsSync(vectorPath)) {
    return [];
  }

  try {
    const data = readFileSync(vectorPath, 'utf-8');
    cachedVectors = JSON.parse(data);
    console.log(`[RAG] Loaded ${cachedVectors!.length} vectors`);
    return cachedVectors!;
  } catch (err) {
    console.error('[RAG] Failed to load vectors:', err);
    return [];
  }
}

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

export function searchVectors(
  queryEmbedding: number[],
  topK = 5
): SearchResult[] {
  const vectors = loadVectors();
  if (vectors.length === 0) return [];

  const scored = vectors.map((v) => ({
    text: v.text,
    source: v.source,
    score: cosineSimilarity(queryEmbedding, v.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, topK).filter((s) => s.score > 0.3);
}

export function isRagAvailable(): boolean {
  const vectorPath = join(process.cwd(), 'rag', 'vectors.json');
  return existsSync(vectorPath);
}
