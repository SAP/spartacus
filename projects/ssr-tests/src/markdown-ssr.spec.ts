/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Server } from 'http';
import * as HttpUtils from './utils/http.utils';
import * as ProxyUtils from './utils/proxy.utils';
import * as SsrUtils from './utils/ssr.utils';

const BACKEND_BASE_URL: string = process.env.CX_BASE_URL || '';

jest.setTimeout(SsrUtils.DEFAULT_SSR_TIMEOUT);

describe('Markdown SSR (Accept: text/markdown)', () => {
  let backendProxy: Server;
  // A CMS content page that is less "busy" than the homepage, matching the
  // existing ssr-testing.spec.ts convention. It reliably renders a <main>,
  // a <title> and a canonical link.
  const REQUEST_PATH = '/contact';

  afterEach(async () => {
    backendProxy?.close();
    await SsrUtils.killSsrServer();
  });

  describe('With caching disabled', () => {
    beforeEach(async () => {
      await SsrUtils.startSsrServer();
    });

    // AC1 (strip layout) + AC "Page block" (+ soft Structured Data)
    it('returns clean Markdown with a Page block for Accept: text/markdown', async () => {
      backendProxy = await ProxyUtils.startBackendProxyServer({
        target: BACKEND_BASE_URL,
      });

      const response = await HttpUtils.sendRequestToSsrServer({
        path: REQUEST_PATH,
        headers: { Accept: 'text/markdown' },
      });

      expect(response.statusCode).toEqual(200);
      expect(response.headers['content-type']).toContain('text/markdown');
      expect(response.headers['content-type']).toContain('charset=utf-8');
      expect(response.headers['vary']).toContain('Accept');

      // Layout stripped: no raw header/footer HTML landmarks survive conversion.
      expect(response.body).not.toContain('<header id="cx-header"');
      expect(response.body).not.toContain('<footer');

      // Page-context block present.
      expect(response.body).toContain('## Page');
      expect(response.body).toMatch(/- Title:/);
      expect(response.body).toMatch(/- URL:/);

      // Structured Data block is emitted only when the page carries JSON-LD.
      // Exhaustive formatting is covered by unit tests; here we only assert the
      // block, when present, is followed by a fenced code block.
      if (response.body.includes('## Structured Data')) {
        expect(response.body).toMatch(/## Structured Data[\s\S]*```/);
      }
    });

    // AC4 — Accept: text/html is untouched (and gives the HTML baseline).
    it('leaves the HTML response untouched for Accept: text/html', async () => {
      backendProxy = await ProxyUtils.startBackendProxyServer({
        target: BACKEND_BASE_URL,
      });

      const response = await HttpUtils.sendRequestToSsrServer({
        path: REQUEST_PATH,
        headers: { Accept: 'text/html' },
      });

      expect(response.statusCode).toEqual(200);
      expect(response.headers['content-type']).toContain('text/html');
      expect(response.headers['content-type']).not.toContain('text/markdown');
      expect(response.body).toContain('<header id="cx-header"');
    });

    // AC4 — browser wildcard must resolve to HTML (regression guard for the
    // two-argument req.accepts(['text/html','text/markdown']) form).
    it('serves HTML (not Markdown) for a browser wildcard Accept header', async () => {
      backendProxy = await ProxyUtils.startBackendProxyServer({
        target: BACKEND_BASE_URL,
      });

      const response = await HttpUtils.sendRequestToSsrServer({
        path: REQUEST_PATH,
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      });

      expect(response.statusCode).toEqual(200);
      expect(response.headers['content-type']).toContain('text/html');
      expect(response.headers['content-type']).not.toContain('text/markdown');
    });

    // AC5 — excluded URLs (default skipUrls) are never converted.
    it('does not convert excluded URLs even with Accept: text/markdown', async () => {
      backendProxy = await ProxyUtils.startBackendProxyServer({
        target: BACKEND_BASE_URL,
      });

      // '/my-account/...' matches the default skipUrls entry 'my-account'.
      const response = await HttpUtils.sendRequestToSsrServer({
        path: '/my-account/address-book',
        headers: { Accept: 'text/markdown' },
      });

      expect(response.headers['content-type']).not.toContain('text/markdown');
    });
  });
});
