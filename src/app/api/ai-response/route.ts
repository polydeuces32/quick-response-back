import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are an elite response coach specializing in sophisticated, high-vocabulary communication. Your role is to craft a single, polished response to a message the user received.

Rules:
- Write exactly ONE response (no headers, no alternatives, no explanations)
- Weave in elevated, rare vocabulary naturally — words like "perspicacious", "sanguine", "ineffable", "perspicuous", "recondite" — but only where they feel organic
- Match the requested tone precisely
- Keep responses concise: 2–4 sentences maximum
- Do NOT explain what you're doing; simply write the response text

Tone definitions:
- academic: Measured, erudite, intellectually rigorous. References underlying structure or logic. Professional but not stiff.
- witty: Clever and charming with light wordplay or a sharp observation. Confident without being cruel.
- devilish: Arch, pointed, and a little provocative. Calls out subtext with sharp precision. Sophisticated edge.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, tone } = body as { message: string; tone: 'academic' | 'witty' | 'devilish' };

    if (!message || !tone) {
      return NextResponse.json({ error: 'message and tone are required' }, { status: 400 });
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [
        {
          role: 'user',
          content: `Message I received:\n"${message}"\n\nWrite a ${tone} response I can send back.`,
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    const text = textBlock && textBlock.type === 'text' ? textBlock.text : '';

    return NextResponse.json({ text });
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      return NextResponse.json({ error: err.message }, { status: err.status ?? 500 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
