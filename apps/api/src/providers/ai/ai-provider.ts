export type AiMessage = { role: 'system' | 'user' | 'assistant'; content: string };
export interface AiProvider {
  complete(messages: AiMessage[], options?: { maxOutputTokens?: number; temperature?: number }): Promise<string>;
}

export class DisabledAiProvider implements AiProvider {
  async complete(): Promise<string> {
    throw new Error('AI provider is disabled');
  }
}
