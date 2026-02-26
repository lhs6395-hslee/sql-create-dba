#!/usr/bin/env node
/**
 * RAG Pre-processing Script
 *
 * Extracts text from PDF textbooks in /rag, chunks them,
 * generates embeddings via AWS Bedrock Titan, and saves
 * the vectors to rag/vectors.json.
 *
 * Prerequisites:
 *   - pdftotext (brew install poppler)
 *   - AWS credentials configured (~/.aws/credentials)
 *   - amazon.titan-embed-text-v2:0 enabled in Bedrock console
 *
 * Usage: node scripts/build-rag.mjs
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const RAG_DIR = join(ROOT, 'rag');
const OUTPUT_PATH = join(RAG_DIR, 'vectors.json');

/* ------------------------------------------------------------------ */
/*  AWS Bedrock Titan Embeddings                                       */
/* ------------------------------------------------------------------ */
let BedrockClient, InvokeCmd;
try {
  const mod = await import('@aws-sdk/client-bedrock-runtime');
  BedrockClient = mod.BedrockRuntimeClient;
  InvokeCmd = mod.InvokeModelCommand;
} catch {
  console.error(
    '❌ Missing @aws-sdk/client-bedrock-runtime. Run: npm install'
  );
  process.exit(1);
}

const bedrock = new BedrockClient({
  region:
    process.env.AWS_BEDROCK_REGION || process.env.AWS_REGION || 'us-east-1',
});

const EMBED_MODEL = 'amazon.titan-embed-text-v2:0';
const EMBED_DIM = 256;

async function embed(text) {
  const res = await bedrock.send(
    new InvokeCmd({
      modelId: EMBED_MODEL,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        inputText: text.slice(0, 8000),
        dimensions: EMBED_DIM,
        normalize: true,
      }),
    })
  );
  const result = JSON.parse(new TextDecoder().decode(res.body));
  return result.embedding;
}

/* ------------------------------------------------------------------ */
/*  PDF Text Extraction                                                */
/* ------------------------------------------------------------------ */
function extractPdfText(pdfPath) {
  console.log(`📄 Extracting: ${pdfPath}`);
  try {
    return execSync(`pdftotext "${pdfPath}" -`, {
      encoding: 'utf-8',
      maxBuffer: 200 * 1024 * 1024,
    });
  } catch (err) {
    console.error(`❌ pdftotext failed. Install with: brew install poppler`);
    throw err;
  }
}

/* ------------------------------------------------------------------ */
/*  Text Cleaning                                                      */
/* ------------------------------------------------------------------ */
function cleanText(text) {
  return text
    .replace(/\f/g, '\n\n')
    .replace(/\r\n/g, '\n')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\d+\s*$/gm, '') // standalone page numbers
    .replace(/Syntax Warning:.*$/gm, '') // pdftotext warnings
    .trim();
}

/* ------------------------------------------------------------------ */
/*  Chunking                                                           */
/* ------------------------------------------------------------------ */
function chunkText(text, source, maxWords = 800, overlap = 100) {
  const paragraphs = text.split(/\n{2,}/);
  const chunks = [];
  let current = [];
  let wordCount = 0;

  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed || trimmed.length < 20) continue;

    const words = trimmed.split(/\s+/).length;

    if (wordCount + words > maxWords && current.length > 0) {
      chunks.push({
        text: current.join('\n\n'),
        source,
        words: wordCount,
      });

      // Keep last paragraph(s) as overlap
      const overlapParas = [];
      let overlapWords = 0;
      for (let i = current.length - 1; i >= 0; i--) {
        const pw = current[i].split(/\s+/).length;
        if (overlapWords + pw > overlap) break;
        overlapParas.unshift(current[i]);
        overlapWords += pw;
      }

      current = overlapParas;
      wordCount = overlapWords;
    }

    current.push(trimmed);
    wordCount += words;
  }

  if (current.length > 0 && wordCount > 50) {
    chunks.push({
      text: current.join('\n\n'),
      source,
      words: wordCount,
    });
  }

  return chunks;
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */
async function main() {
  console.log('🚀 RAG Build Script\n');

  const pdfs = [
    {
      path: join(RAG_DIR, 'DATABASE MANAGEMENT SYSTEMS.pdf'),
      source: 'dbms-textbook',
    },
    {
      path: join(RAG_DIR, 'ullman_the_complete_book.pdf'),
      source: 'ullman-db-complete',
    },
  ];

  let allChunks = [];

  for (const pdf of pdfs) {
    if (!existsSync(pdf.path)) {
      console.warn(`⚠️  Skipping ${pdf.path} — not found`);
      continue;
    }

    const raw = extractPdfText(pdf.path);
    const clean = cleanText(raw);
    const chunks = chunkText(clean, pdf.source);
    console.log(`   → ${chunks.length} chunks from ${pdf.source}`);
    allChunks.push(...chunks);
  }

  // Filter out noise
  allChunks = allChunks.filter((c) => c.words >= 50 && c.text.length >= 200);
  console.log(`\n📊 Total chunks after filtering: ${allChunks.length}`);
  console.log('🔄 Generating embeddings with Bedrock Titan Embed v2...\n');

  const vectors = [];
  let errors = 0;

  for (let i = 0; i < allChunks.length; i++) {
    const chunk = allChunks[i];

    try {
      const embedding = await embed(chunk.text);
      vectors.push({
        id: vectors.length,
        text: chunk.text,
        source: chunk.source,
        embedding,
      });

      if ((i + 1) % 25 === 0 || i === allChunks.length - 1) {
        console.log(`   ${i + 1}/${allChunks.length} embedded`);
      }
    } catch (err) {
      errors++;
      if (errors <= 3) {
        console.error(`   ❌ Chunk ${i}: ${err.message}`);
      }
      if (errors === 1 && err.name === 'AccessDeniedException') {
        console.error(
          '\n⚠️  Enable "amazon.titan-embed-text-v2:0" in the AWS Bedrock console.\n'
        );
        process.exit(1);
      }
    }

    // Rate limit: ~5 req/sec
    await new Promise((r) => setTimeout(r, 200));
  }

  writeFileSync(OUTPUT_PATH, JSON.stringify(vectors));

  const sizeMB = (readFileSync(OUTPUT_PATH).length / (1024 * 1024)).toFixed(1);
  console.log(
    `\n✅ Saved ${vectors.length} vectors to rag/vectors.json (${sizeMB} MB)`
  );
  if (errors > 0) console.log(`⚠️  ${errors} chunks failed to embed`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
