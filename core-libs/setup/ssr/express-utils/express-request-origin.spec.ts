/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request } from 'express';
import { getRequestOrigin } from './express-request-origin';

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
}): Request {
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
  } as unknown as Request;
}

describe('getRequestOrigin', () => {
  describe('without an allowlist (default behavior)', () => {
    it('should use X-Forwarded-Host when the proxy is trusted', () => {
      const req = createMockRequest({
        forwardedHost: 'forwarded.com',
        trustProxy: true,
      });
      expect(getRequestOrigin(req)).toBe('https://forwarded.com');
    });

    it('should fall back to Host when the proxy is not trusted', () => {
      const req = createMockRequest({
        host: 'origin.com',
        forwardedHost: 'forwarded.com',
        trustProxy: false,
      });
      expect(getRequestOrigin(req)).toBe('https://origin.com');
    });

    it('should use the left-most (original public-facing) entry of X-Forwarded-Host chain', () => {
      const req = createMockRequest({
        forwardedHost: 'real-host.com, internal-proxy.local',
        trustProxy: true,
      });
      expect(getRequestOrigin(req)).toBe('https://real-host.com');
    });
  });
});
