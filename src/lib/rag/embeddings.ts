import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';

const client = new BedrockRuntimeClient({
  region:
    process.env.AWS_BEDROCK_REGION || process.env.AWS_REGION || 'us-east-1',
});

const MODEL_ID = 'amazon.titan-embed-text-v2:0';
const DIMENSIONS = 256;

export async function getQueryEmbedding(text: string): Promise<number[]> {
  const response = await client.send(
    new InvokeModelCommand({
      modelId: MODEL_ID,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        inputText: text.slice(0, 8000),
        dimensions: DIMENSIONS,
        normalize: true,
      }),
    })
  );

  const result = JSON.parse(new TextDecoder().decode(response.body));
  return result.embedding;
}
