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

function createMockResponse(): Response {
  const res = {
    setHeader: jest.fn(),
    send: jest.fn(),
  } as Partial<Response>;
  res.status = jest.fn().mockReturnValue(res) as unknown as Response['status'];
  return res as Response;
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

    it('should reject with 421 and no-store when origin does not match', () => {
      const middleware = getOriginValidationMiddleware({
        allowedOrigins: ['https://canonical.com', 'https://other.com'],
      });
      const req = createMockRequest({
        host: 'spoofed.com',
        trustProxy: false,
      });
      const res = createMockResponse();
      const next = createMockNext();
      middleware(req, res, next);
      expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', 'no-store');
      expect(res.status).toHaveBeenCalledWith(421);
      expect(res.send).toHaveBeenCalledWith('Misdirected Request');
      expect(next).not.toHaveBeenCalled();
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
      const res = createMockResponse();
      const next = createMockNext();
      middleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(421);
      expect(next).not.toHaveBeenCalled();
    });

    it('should not match two-label subdomain for single wildcard (*.domain.com)', () => {
      const middleware = getOriginValidationMiddleware({
        allowedOrigins: ['https://canonical.com', 'https://*.domain.com'],
      });
      const req = createMockRequest({
        host: 'a.b.domain.com',
        trustProxy: false,
      });
      const res = createMockResponse();
      const next = createMockNext();
      middleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(421);
      expect(next).not.toHaveBeenCalled();
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

  describe('allowedOrigins parsing (comma-separated string)', () => {
    it('should accept a single comma-separated string of origins', () => {
      const middleware = getOriginValidationMiddleware({
        allowedOrigins: 'https://a.com,https://b.com',
      });
      const req = createMockRequest({ host: 'b.com', trustProxy: false });
      const next = createMockNext();
      middleware(req, createMockResponse(), next);
      expect(next).toHaveBeenCalled();
    });

    it('should trim whitespace around each entry', () => {
      const middleware = getOriginValidationMiddleware({
        allowedOrigins: '  https://a.com ,  https://b.com  ',
      });
      const req = createMockRequest({ host: 'a.com', trustProxy: false });
      const next = createMockNext();
      middleware(req, createMockResponse(), next);
      expect(next).toHaveBeenCalled();
    });

    it('should ignore empty segments from leading/trailing/double commas', () => {
      const middleware = getOriginValidationMiddleware({
        allowedOrigins: ',https://a.com,,https://b.com,',
      });
      const allowed = createMockRequest({ host: 'a.com', trustProxy: false });
      const allowedNext = createMockNext();
      middleware(allowed, createMockResponse(), allowedNext);
      expect(allowedNext).toHaveBeenCalled();

      // an empty segment must not become a catch-all that allows anything
      const spoofed = createMockRequest({
        host: 'evil.com',
        trustProxy: false,
      });
      const spoofedRes = createMockResponse();
      const spoofedNext = createMockNext();
      middleware(spoofed, spoofedRes, spoofedNext);
      expect(spoofedRes.status).toHaveBeenCalledWith(421);
      expect(spoofedNext).not.toHaveBeenCalled();
    });

    it('should return a no-op middleware for an empty string', () => {
      const middleware = getOriginValidationMiddleware({ allowedOrigins: '' });
      const req = createMockRequest({ host: 'any.com' });
      const next = createMockNext();
      middleware(req, {} as Response, next);
      expect(next).toHaveBeenCalled();
    });

    it('should return a no-op middleware for a whitespace/comma-only string', () => {
      const middleware = getOriginValidationMiddleware({
        allowedOrigins: '  , ,  ',
      });
      const req = createMockRequest({ host: 'any.com' });
      const next = createMockNext();
      middleware(req, {} as Response, next);
      expect(next).toHaveBeenCalled();
    });

    it('should return a no-op middleware when allowedOrigins is undefined', () => {
      const middleware = getOriginValidationMiddleware({
        allowedOrigins: undefined,
      });
      const req = createMockRequest({ host: 'any.com' });
      const next = createMockNext();
      middleware(req, {} as Response, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
