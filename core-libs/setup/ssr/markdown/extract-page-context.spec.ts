/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { extractPageContext } from './extract-page-context';

describe('extractPageContext', () => {
  it('reads the document title', () => {
    const html =
      '<html><head><title>Camera X100</title></head><body></body></html>';
    expect(extractPageContext(html).title).toBe('Camera X100');
  });

  it('reads the canonical URL regardless of attribute order', () => {
    const html =
      '<head><link href="https://shop.example/p/123" rel="canonical"></head>';
    expect(extractPageContext(html).canonicalUrl).toBe(
      'https://shop.example/p/123'
    );
  });

  it('builds the breadcrumb trail from JSON-LD BreadcrumbList', () => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { position: 1, name: 'Home' },
        { position: 2, name: 'Cameras' },
        { position: 3, name: 'Camera X100' },
      ],
    };
    // JSON-LD is emitted HTML-escaped in the SSR output.
    const escaped = JSON.stringify(jsonLd)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const html = `<body><script id="json-ld" type="application/ld+json">${escaped}</script></body>`;
    expect(extractPageContext(html).breadcrumb).toBe(
      'Home / Cameras / Camera X100'
    );
  });

  it('falls back to the DOM breadcrumb when JSON-LD is absent', () => {
    const html =
      '<cx-breadcrumb><nav><ol>' +
      '<li><a href="/">Home</a></li>' +
      '<li><a href="/cameras">Cameras</a></li>' +
      '</ol></nav></cx-breadcrumb>';
    expect(extractPageContext(html).breadcrumb).toBe('Home / Cameras');
  });

  it('omits fields that are absent', () => {
    const ctx = extractPageContext('<html><body></body></html>');
    expect(ctx.title).toBeUndefined();
    expect(ctx.canonicalUrl).toBeUndefined();
    expect(ctx.breadcrumb).toBeUndefined();
    expect(ctx.description).toBeUndefined();
    expect(ctx.jsonLd).toBeUndefined();
    expect(ctx.siteName).toBeUndefined();
  });

  it('reads the meta description', () => {
    const html =
      '<head><meta name="description" content="Best cameras online"></head>';
    expect(extractPageContext(html).description).toBe('Best cameras online');
  });

  it('reads meta description regardless of attribute order', () => {
    const html = '<head><meta content="Great deals" name="description"></head>';
    expect(extractPageContext(html).description).toBe('Great deals');
  });

  it('extracts JSON-LD objects into an array', () => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Electronics Store',
    };
    const escaped = JSON.stringify(jsonLd)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const html = `<body><script id="json-ld" type="application/ld+json">${escaped}</script></body>`;
    const ctx = extractPageContext(html);
    expect(ctx.jsonLd).toBeDefined();
    expect(ctx.jsonLd?.length).toBe(1);
    expect((ctx.jsonLd?.[0] as Record<string, string>)['@type']).toBe(
      'WebSite'
    );
  });

  it('flattens a JSON-LD array into the jsonLd field', () => {
    const jsonLd = [
      { '@type': 'WebSite', name: 'Store' },
      { '@type': 'BreadcrumbList', itemListElement: [] },
    ];
    const escaped = JSON.stringify(jsonLd)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const html = `<body><script id="json-ld" type="application/ld+json">${escaped}</script></body>`;
    const ctx = extractPageContext(html);
    expect(ctx.jsonLd?.length).toBe(2);
  });

  it('decodes URL-percent-encoded text in DOM breadcrumb anchors', () => {
    const html =
      '<cx-breadcrumb><nav><ol>' +
      '<li><a href="/">Home</a></li>' +
      '<li><a href="/cameras-%26-lenses">Cameras %26 Lenses</a></li>' +
      '</ol></nav></cx-breadcrumb>';
    expect(extractPageContext(html).breadcrumb).toBe('Home / Cameras & Lenses');
  });

  it('reads site name from og:site_name meta tag', () => {
    const html =
      '<head><meta property="og:site_name" content="Electronics Store"></head>';
    expect(extractPageContext(html).siteName).toBe('Electronics Store');
  });

  it('reads site name from WebSite JSON-LD when og:site_name is absent', () => {
    const jsonLd = { '@type': 'WebSite', name: 'My Shop' };
    const escaped = JSON.stringify(jsonLd)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const html = `<body><script id="json-ld" type="application/ld+json">${escaped}</script></body>`;
    expect(extractPageContext(html).siteName).toBe('My Shop');
  });

  it('prefers og:site_name over WebSite JSON-LD', () => {
    const jsonLd = { '@type': 'WebSite', name: 'JSON Name' };
    const escaped = JSON.stringify(jsonLd)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const html =
      `<head><meta property="og:site_name" content="Meta Name"></head>` +
      `<body><script id="json-ld" type="application/ld+json">${escaped}</script></body>`;
    expect(extractPageContext(html).siteName).toBe('Meta Name');
  });
});
