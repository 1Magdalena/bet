import type { AuthContext } from '../../core/types.js';

export interface AuthProvider {
  verifyBearerToken(token: string | undefined): Promise<AuthContext>;
}
