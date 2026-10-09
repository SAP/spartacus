/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DefaultBaseSiteResolver } from '@spartacus/setup/ssr/base-site';
import {
  createStorefrontBaseSiteResolver,
  resolveOccBaseUrl,
} from './base-site-resolver';

const INDEX_PATHS = ['/browser/index.csr.html', '/browser/index.html'];

describe('resolveOccBaseUrl', () => {
  it('prefers and trims the configured environment URL', () => {
    const readPaths: string[] = [];

    const result = resolveOccBaseUrl(
      '  https://environment.example  ',
      INDEX_PATHS,
      (path) => {
        readPaths.push(path);
        return '';
      }
    );

    expect(result).toBe('https://environment.example');
    expect(readPaths).toEqual([]);
  });

  it('uses the OCC URL from index.csr.html before index.html', () => {
    const readPaths: string[] = [];
    const htmlByPath: Record<string, string> = {
      '/browser/index.csr.html':
        '<meta name="occ-backend-base-url" content="https://csr.example">',
      '/browser/index.html':
        '<meta name="occ-backend-base-url" content="https://index.example">',
    };

    const result = resolveOccBaseUrl('', INDEX_PATHS, (path) => {
      readPaths.push(path);
      return htmlByPath[path];
    });

    expect(result).toBe('https://csr.example');
    expect(readPaths).toEqual(['/browser/index.csr.html']);
  });

  it('falls back to index.html after an unreadable CSR index', () => {
    const result = resolveOccBaseUrl(undefined, INDEX_PATHS, (path) => {
      if (path.endsWith('index.csr.html')) {
        throw new Error('missing');
      }
      return '<meta name="occ-backend-base-url" content="https://index.example">';
    });

    expect(result).toBe('https://index.example');
  });

  it('falls back to index.html after an unsubstituted CSR placeholder', () => {
    const result = resolveOccBaseUrl(undefined, INDEX_PATHS, (path) =>
      path.endsWith('index.csr.html')
        ? '<meta name="occ-backend-base-url" content="OCC_BACKEND_BASE_URL_VALUE">'
        : '<meta name="occ-backend-base-url" content="https://index.example">'
    );

    expect(result).toBe('https://index.example');
  });

  it('returns null when no configured or extracted URL is usable', () => {
    const result = resolveOccBaseUrl('   ', INDEX_PATHS, (path) => {
      if (path.endsWith('index.csr.html')) {
        return '<meta name="occ-backend-base-url" content="   ">';
      }
      throw new Error('missing');
    });

    expect(result).toBeNull();
  });
});

describe('createStorefrontBaseSiteResolver', () => {
  it('creates the default resolver when an OCC URL is available', () => {
    const warnings: string[] = [];

    const resolver = createStorefrontBaseSiteResolver({
      configuredOccBaseUrl: 'https://environment.example',
      indexHtmlPaths: INDEX_PATHS,
      readFile: () => '',
      defaultBaseSite: 'electronics-spa',
      occApiPrefix: '/occ/v2/',
      warn: (message) => warnings.push(message),
    });

    expect(resolver).toBeInstanceOf(DefaultBaseSiteResolver);
    expect(warnings).toEqual([]);
  });

  it('returns no resolver and warns once when no OCC URL is available', () => {
    const warnings: string[] = [];

    const resolver = createStorefrontBaseSiteResolver({
      configuredOccBaseUrl: undefined,
      indexHtmlPaths: INDEX_PATHS,
      readFile: () => {
        throw new Error('missing');
      },
      defaultBaseSite: 'electronics-spa',
      occApiPrefix: '/occ/v2/',
      warn: (message) => warnings.push(message),
    });

    expect(resolver).toBeUndefined();
    expect(warnings.length).toBe(1);
  });
});
