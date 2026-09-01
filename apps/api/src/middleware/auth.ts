import type { FastifyRequest } from 'fastify';
import type { AuthProvider } from '../providers/auth/auth-provider.js';

export function bearerFromRequest(request: FastifyRequest): string | undefined {
  const header = request.headers.authorization;
  if (!header?.startsWith('Bearer ')) return undefined;
  return header.slice('Bearer '.length).trim();
}

export function buildAuthPreHandler(authProvider: AuthProvider) {
  return async (request: FastifyRequest) => {
    const auth = await authProvider.verifyBearerToken(bearerFromRequest(request));
    request.betAuth = auth;
  };
}

declare module 'fastify' {
  interface FastifyRequest {
    betAuth: import('../core/types.js').AuthContext;
  }
}
