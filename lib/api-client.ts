import { MotivationLetterData, GenerateResponse } from './types';
import { ERROR_MESSAGES } from './constants';

export async function generateLetter(data: MotivationLetterData): Promise<string> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || ERROR_MESSAGES.NETWORK);
    }

    const result: GenerateResponse = await response.json();
    
    if (result.error) {
      throw new Error(result.error);
    }

    if (!result.content) {
      throw new Error(ERROR_MESSAGES.GENERATION);
    }

    return result.content;
  } catch (error) {
    console.error('Generation error:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(ERROR_MESSAGES.GENERATION);
  }
}