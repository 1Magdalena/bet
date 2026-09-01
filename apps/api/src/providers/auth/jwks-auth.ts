import { createRemoteJWKSet, jwtVerify } from 'jose';
import type { AuthProvider } from './auth-provider.js';
import type { AuthContext } from '../../core/types.js';

export class JwksAuthProvider implements AuthProvider {
  private readonly jwks;
  constructor(
    jwksUrl: string,
    private readonly issuer?: string,
    private readonly audience: string = 'authenticated',
  ) {
    this.jwks = createRemoteJWKSet(new URL(jwksUrl));
  }

  async verifyBearerToken(token: string | undefined): Promise<AuthContext> {
    if (!token) throw new Error('Missing bearer token');
    const options: { audience: string; issuer?: string } = { audience: this.audience };
    if (this.issuer) options.issuer = this.issuer;
    const { payload } = await jwtVerify(token, this.jwks, options);
    if (!payload.sub) throw new Error('Token missing subject');
    const appMetadata = (payload.app_metadata ?? {}) as Record<string, unknown>;
    const result: AuthContext = { userId: payload.sub, role: appMetadata.bet_role === 'admin' ? 'admin' : 'member' };
    if (payload.jti) result.tokenId = payload.jti;
    if (typeof payload.email === 'string') result.email = payload.email;
    return result;
  }
}
