export type Email = { to: string; subject: string; text: string };
export interface EmailProvider { send(message: Email): Promise<void>; }

export class ConsoleEmailProvider implements EmailProvider {
  async send(message: Email) { console.log('[email]', message); }
}
