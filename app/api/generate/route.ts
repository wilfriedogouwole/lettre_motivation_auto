import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { OPENAI_CONFIG, SYSTEM_PROMPT, ERROR_MESSAGES } from '@/lib/constants';
import { createUserPrompt } from '@/lib/prompts';
import type { MotivationLetterData } from '@/lib/types';

if (!process.env.OPENAI_API_KEY) {
  throw new Error(ERROR_MESSAGES.API_KEY);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const data: MotivationLetterData = await req.json();

    const completion = await openai.chat.completions.create({
      ...OPENAI_CONFIG,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: createUserPrompt(data)
        }
      ],
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error(ERROR_MESSAGES.GENERATION);
    }

    return NextResponse.json({ content });
  } catch (error: any) {
    console.error('Erreur OpenAI:', error);
    
    // Gestion spécifique de l'erreur de quota
    if (error?.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: "Service temporairement indisponible. Veuillez réessayer plus tard." },
        { status: 429 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.GENERATION;
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}