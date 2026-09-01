import type { AuthProvider } from './auth-provider.js';
import type { AuthContext } from '../../core/types.js';

export class DevAuthProvider implements AuthProvider {
  constructor(private readonly userId: string) {}
  async verifyBearerToken(): Promise<AuthContext> {
    return { userId: this.userId, role: 'admin', email: 'owner@bet.local' };
  }
}
