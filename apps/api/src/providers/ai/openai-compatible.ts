import type { AiMessage, AiProvider } from './ai-provider.js';

export class OpenAiCompatibleProvider implements AiProvider {
  constructor(
    private readonly baseUrl: string,
    private readonly apiKey: string,
    private readonly model: string,
  ) {}

  async complete(messages: AiMessage[], options: { maxOutputTokens?: number; temperature?: number } = {}): Promise<string> {
    const response = await fetch(`${this.baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${this.apiKey}` },
      body: JSON.stringify({
        model: this.model,
        messages,
        max_tokens: options.maxOutputTokens ?? 900,
        temperature: options.temperature ?? 0.1,
      }),
    });
    if (!response.ok) throw new Error(`AI provider error ${response.status}`);
    const body = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = body.choices?.[0]?.message?.content;
    if (!content) throw new Error('AI provider returned no content');
    return content;
  }
}
