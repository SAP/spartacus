import { Request } from 'express';
import { getRequestOrigin } from './request-origin';

export function getRequestUrl(req: Request): string {
  return getRequestOrigin(req) + req.originalUrl;
}
