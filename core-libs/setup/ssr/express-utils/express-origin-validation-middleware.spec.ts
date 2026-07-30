/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NextFunction, Request, Response } from 'express';
import { getOriginValidationMiddleware } from './express-origin-validation-middleware';

function createMockRequest({
  protocol = 'https',
  host = 'origin.com',
  forwardedHost,
  trustProxy = true,
}: {
  protocol?: string;
  host?: string;
  forwardedHost?: string;
  trustProxy?: boolean;
} = {}): Request {
  const headers: Record<string, string | undefined> = {
    host,
    'x-forwarded-host': forwardedHost,
  };
  return {
    protocol,
    connection: { remoteAddress: '127.0.0.1' },
    app: {
      get: (key: string) =>
        key === 'trust proxy fn' ? () => trustProxy : undefined,
    },
    get: (name: string) => headers[name.toLowerCase()],
    headers,
  } as unknown as Request;
}

function createMockNext(): NextFunction {
  return jest.fn() as unknown as NextFunction;
}

describe('getOriginValidationMiddleware', () => {
  describe('when allowedOrigins is absent or empty', () => {
    it('should return a no-op middleware that calls next()', () => {
      const middleware = getOriginValidationMiddleware({});
      const req = createMockRequest({ host: 'any.com' });
      const next = createMockNext();
      middleware(req, {} as Response, next);
      expect(next).toHaveBeenCalled();
    });

    it('should not modify headers when allowedOrigins is empty array', () => {
      const middleware = getOriginValidationMiddleware({ allowedOrigins: [] });
      const req = createMockRequest({ host: 'any.com' });
      const next = createMockNext();
      middleware(req, {} as Response, next);
      expect(req.headers['host']).toBe('any.com');
      expect(next).toHaveBeenCalled();
    });
  });

  describe('when allowedOrigins is provided', () => {
    it('should call next() without modifying headers when origin matches', () => {
      const middleware = getOriginValidationMiddleware({
        allowedOrigins: ['https://allowed.com'],
      });
      const req = createMockRequest({ host: 'allowed.com', trustProxy: false });
      const next = createMockNext();
      middleware(req, {} as Response, next);
      expect(req.headers['host']).toBe('allowed.com');
      expect(next).toHaveBeenCalled();
    });

    it('should rewrite host headers to canonical host when origin does not match', () => {
      const middleware = getOriginValidationMiddleware({
        allowedOrigins: ['https://canonical.com', 'https://other.com'],
      });
      const req = createMockRequest({
        host: 'spoofed.com',
        trustProxy: false,
      });
      const next = createMockNext();
      middleware(req, {} as Response, next);
      expect(req.headers['host']).toBe('canonical.com');
      expect(req.headers['x-forwarded-host']).toBe('canonical.com');
      expect(next).toHaveBeenCalled();
    });

    it('should match case-insensitively', () => {
      const middleware = getOriginValidationMiddleware({
        allowedOrigins: ['https://ALLOWED.COM'],
      });
      const req = createMockRequest({ host: 'allowed.com', trustProxy: false });
      const next = createMockNext();
      middleware(req, {} as Response, next);
      expect(req.headers['host']).toBe('allowed.com');
    });

    it('should match wildcard origin (*.domain.com)', () => {
      const middleware = getOriginValidationMiddleware({
        allowedOrigins: ['https://*.domain.com'],
      });
      const req = createMockRequest({
        host: 'shop.domain.com',
        trustProxy: false,
      });
      const next = createMockNext();
      middleware(req, {} as Response, next);
      expect(req.headers['host']).toBe('shop.domain.com');
    });

    it('should not match apex domain for wildcard (*.domain.com)', () => {
      const middleware = getOriginValidationMiddleware({
        allowedOrigins: ['https://canonical.com', 'https://*.domain.com'],
      });
      const req = createMockRequest({
        host: 'domain.com',
        trustProxy: false,
      });
      const next = createMockNext();
      middleware(req, {} as Response, next);
      expect(req.headers['host']).toBe('canonical.com');
    });

    it('should not match two-label subdomain for single wildcard (*.domain.com)', () => {
      const middleware = getOriginValidationMiddleware({
        allowedOrigins: ['https://canonical.com', 'https://*.domain.com'],
      });
      const req = createMockRequest({
        host: 'a.b.domain.com',
        trustProxy: false,
      });
      const next = createMockNext();
      middleware(req, {} as Response, next);
      expect(req.headers['host']).toBe('canonical.com');
    });

    it('should use X-Forwarded-Host for origin resolution when proxy is trusted', () => {
      const middleware = getOriginValidationMiddleware({
        allowedOrigins: ['https://allowed.com'],
      });
      const req = createMockRequest({
        host: 'internal.com',
        forwardedHost: 'allowed.com',
        trustProxy: true,
      });
      const next = createMockNext();
      middleware(req, {} as Response, next);
      expect(req.headers['host']).toBe('internal.com');
      expect(next).toHaveBeenCalled();
    });
  });
});
