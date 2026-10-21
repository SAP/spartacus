/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  createStorefrontBaseSiteConfig,
  resolveOccBaseUrl,
} from './base-site-resolver';

const INDEX_PATHS = ['/browser/index.csr.html', '/browser/index.html'];
const BASE_SITES = ['electronics-spa', 'powertools-spa'];

describe('resolveOccBaseUrl', () => {
  it('uses the OCC URL from index.csr.html before index.html', () => {
    const readPaths: string[] = [];
    const htmlByPath: Record<string, string> = {
      '/browser/index.csr.html':
        '<meta name="occ-backend-base-url" content="https://csr.example">',
      '/browser/index.html':
        '<meta name="occ-backend-base-url" content="https://index.example">',
    };

    const result = resolveOccBaseUrl(INDEX_PATHS, (path) => {
      readPaths.push(path);
      return htmlByPath[path];
    });

    expect(result).toBe('https://csr.example');
    expect(readPaths).toEqual(['/browser/index.csr.html']);
  });

  it('falls back to index.html after an unreadable CSR index', () => {
    const result = resolveOccBaseUrl(INDEX_PATHS, (path) => {
      if (path.endsWith('index.csr.html')) {
        throw new Error('missing');
      }
      return '<meta name="occ-backend-base-url" content="https://index.example">';
    });

    expect(result).toBe('https://index.example');
  });

  it('falls back to index.html after an unsubstituted CSR placeholder', () => {
    const result = resolveOccBaseUrl(INDEX_PATHS, (path) =>
      path.endsWith('index.csr.html')
        ? '<meta name="occ-backend-base-url" content="OCC_BACKEND_BASE_URL_VALUE">'
        : '<meta name="occ-backend-base-url" content="https://index.example">'
    );

    expect(result).toBe('https://index.example');
  });

  it('returns null when no extracted URL is usable', () => {
    const result = resolveOccBaseUrl(INDEX_PATHS, (path) => {
      if (path.endsWith('index.csr.html')) {
        return '<meta name="occ-backend-base-url" content="   ">';
      }
      throw new Error('missing');
    });

    expect(result).toBeNull();
  });
});

describe('createStorefrontBaseSiteConfig', () => {
  it('includes occBaseUrl and baseSites when an OCC URL is available', () => {
    const warnings: string[] = [];
    const htmlByPath: Record<string, string> = {
      '/browser/index.csr.html':
        '<meta name="occ-backend-base-url" content="https://csr.example">',
    };

    const config = createStorefrontBaseSiteConfig({
      baseSites: BASE_SITES,
      indexHtmlPaths: INDEX_PATHS,
      readFile: (path) => {
        const html = htmlByPath[path];
        if (html === undefined) {
          throw new Error('missing');
        }
        return html;
      },
      warn: (message) => warnings.push(message),
    });

    expect(config.occBaseUrl).toBe('https://csr.example');
    expect(config.baseSites).toEqual(BASE_SITES);
    expect(warnings).toEqual([]);
  });

  it('returns baseSites-only config and warns once when no OCC URL is available', () => {
    const warnings: string[] = [];

    const config = createStorefrontBaseSiteConfig({
      baseSites: BASE_SITES,
      indexHtmlPaths: INDEX_PATHS,
      readFile: () => {
        throw new Error('missing');
      },
      warn: (message) => warnings.push(message),
    });

    expect(config.baseSites).toEqual(BASE_SITES);
    expect(config.occBaseUrl).toBeUndefined();
    expect(warnings.length).toBe(1);
  });
});
