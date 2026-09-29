/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, expect, it } from 'vitest';
import { appendAuthReqId } from './url-with-auth-req-id';

describe('appendAuthReqId', () => {
  describe('two-argument call (url + id)', () => {
    it('appends to an absolute URL with no existing query string', () => {
      expect(appendAuthReqId('https://example.com/csrf', 'req-abc')).toBe(
        'https://example.com/csrf?auth_req_id=req-abc'
      );
    });

    it('appends to an absolute URL that already has a query string', () => {
      expect(
        appendAuthReqId('https://example.com/csrf?foo=bar', 'req-abc')
      ).toBe('https://example.com/csrf?foo=bar&auth_req_id=req-abc');
    });

    it('appends to a relative URL with no existing query string', () => {
      expect(appendAuthReqId('/authorizationserver/csrf', 'req-abc')).toBe(
        '/authorizationserver/csrf?auth_req_id=req-abc'
      );
    });

    it('appends to a relative URL that already has a query string', () => {
      expect(appendAuthReqId('/authorizationserver/csrf?x=1', 'req-abc')).toBe(
        '/authorizationserver/csrf?x=1&auth_req_id=req-abc'
      );
    });

    it('URL-encodes special characters in the id', () => {
      const result = appendAuthReqId('/csrf', 'req abc+1');
      expect(result).toContain('auth_req_id=req%20abc%2B1');
    });

    it('replaces an existing auth_req_id in a relative URL instead of duplicating it', () => {
      // Verifies that the relative-URL fallback path mirrors the absolute-URL
      // path (which uses searchParams.set): a URL that already carries
      // auth_req_id=old must have the value replaced, not appended a second time.
      expect(
        appendAuthReqId('/authorizationserver/csrf?auth_req_id=old', 'req-new')
      ).toBe('/authorizationserver/csrf?auth_req_id=req-new');
    });

    it('replaces an existing auth_req_id that is not the first query param in a relative URL', () => {
      expect(
        appendAuthReqId('/csrf?foo=bar&auth_req_id=old', 'req-new')
      ).toBe('/csrf?foo=bar&auth_req_id=req-new');
    });
  });

  describe('three-argument call (path + base + id)', () => {
    it('resolves path against base and appends the param', () => {
      expect(
        appendAuthReqId('/login', 'https://storefront.de', 'req-xyz')
      ).toBe('https://storefront.de/login?auth_req_id=req-xyz');
    });

    it('returns null when base is malformed', () => {
      expect(appendAuthReqId('/login', 'not-a-url', 'req-xyz')).toBeNull();
    });

    it('resolves an empty path against base without double-slash', () => {
      const result = appendAuthReqId('', 'https://storefront.de', 'req-xyz');
      expect(result).toBe('https://storefront.de/?auth_req_id=req-xyz');
    });
  });
});
