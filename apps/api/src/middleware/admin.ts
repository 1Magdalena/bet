import type { FastifyRequest } from 'fastify';
export async function requireAdmin(request: FastifyRequest) {
  if (request.betAuth?.role !== 'admin') {
    const error = new Error('Admin access required') as Error & { statusCode?: number };
    error.statusCode = 403;
    throw error;
  }
}
