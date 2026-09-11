/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  createDefaultParser,
  createDefaultTurndownService,
  defaultConverter,
  extractMainContent,
  htmlToMarkdown,
  renderBody,
  renderJsonLdBlock,
  renderPageBlock,
} from './default-html-to-markdown-converter';
import { ParsedPage } from './markdown-page-handler.model';

/** Parse + convert a full HTML page to Markdown using the default pipeline. */
async function convert(html: string): Promise<string> {
  const parser = createDefaultParser();
  const parsed = await parser(html);
  return defaultConverter(parsed) as string;
}

describe('default pipeline (createDefaultParser + defaultConverter)', () => {
  const page = (main: string, head = '', bodyExtra = '') =>
    `<html><head><title>Camera X100</title>` +
    `<link rel="canonical" href="https://shop.example/p/123">${head}</head>` +
    `<body><header id="cx-header"><h1>SITE HEADER</h1></header>` +
    `<cx-page-slot position="BottomHeaderSlot">PROMO</cx-page-slot>` +
    `<main>${main}</main>` +
    `<footer>SITE FOOTER</footer>${bodyExtra}</body></html>`;

  it('keeps the <main> content in the output', async () => {
    const md = await convert(page('<h1>Product</h1><p>Great cam.</p>'));
    expect(md).toContain('Product');
    expect(md).toContain('Great cam.');
  });

  it('drops header, footer and BottomHeaderSlot', async () => {
    const md = await convert(page('<p>body</p>'));
    expect(md).not.toContain('SITE HEADER');
    expect(md).not.toContain('SITE FOOTER');
    expect(md).not.toContain('PROMO');
  });

  it('converts lists to Markdown', async () => {
    const md = await convert(page('<ul><li>One</li><li>Two</li></ul>'));
    expect(md).toMatch(/[-*]\s+One/);
    expect(md).toMatch(/[-*]\s+Two/);
  });

  it('appends a Page context block with title, URL and breadcrumb', async () => {
    const jsonLd = {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { position: 1, name: 'Home' },
        { position: 2, name: 'Cameras' },
      ],
    };
    const escaped = JSON.stringify(jsonLd)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const md = await convert(
      page(
        '<p>body</p>',
        '',
        `<script id="json-ld" type="application/ld+json">${escaped}</script>`
      )
    );
    expect(md).toContain('## Page');
    expect(md).toContain('Title: Camera X100');
    expect(md).toContain('URL: https://shop.example/p/123');
    expect(md).toContain('Breadcrumb: Home / Cameras');
  });

  it('renders Page block before body content', async () => {
    const md = await convert(page('<p>body content here</p>'));
    const pageIdx = md.indexOf('## Page');
    const bodyIdx = md.indexOf('body content here');
    expect(pageIdx).toBeGreaterThanOrEqual(0);
    expect(bodyIdx).toBeGreaterThan(pageIdx);
  });

  it('includes site name in Page block when og:site_name is present', async () => {
    const html =
      `<html><head><title>T</title>` +
      `<meta property="og:site_name" content="Electronics Store">` +
      `<link rel="canonical" href="https://shop.example/"></head>` +
      `<body><main><p>body</p></main></body></html>`;
    expect(await convert(html)).toContain('Site: Electronics Store');
  });

  it('renders aria-label of div[role="img"] as text (e.g. star ratings)', async () => {
    const md = await convert(
      page(
        '<div role="img" aria-label="Rated: 4.5 out of 5"><span>★★★★★</span></div>'
      )
    );
    expect(md).toContain('Rated: 4.5 out of 5');
  });

  it('renders image-only link as plain alt text, not a hyperlink', async () => {
    const md = await convert(
      page(
        '<a href="/product/1"><img src="https://cdn.example/img.jpg" alt="FinePix S1500"></a>' +
          '<h2><a href="/product/1">FinePix S1500</a></h2>'
      )
    );
    expect(md).not.toMatch(/\[FinePix S1500\].*\[FinePix S1500\]/);
    expect(md).toContain('[FinePix S1500](/product/1)');
  });

  it('omits context lines whose value is missing (no placeholders)', async () => {
    const md = await convert(
      '<html><body><main><p>x</p></main></body></html>'
    );
    expect(md).not.toContain('Title:');
    expect(md).not.toContain('URL:');
    expect(md).not.toContain('Breadcrumb:');
  });

  it('produces clean Markdown with no raw layout tags', async () => {
    const md = await convert(page('<p>hello</p>'));
    expect(md).not.toContain('<main');
    expect(md).not.toContain('<header');
    expect(md).not.toContain('<footer');
  });

  it('strips image src URLs, rendering only alt text', async () => {
    const md = await convert(
      page('<img src="https://cdn.example/huge-url.jpg" alt="Product Photo">')
    );
    expect(md).not.toContain('https://cdn.example');
    expect(md).toContain('Product Photo');
  });

  it('drops image-only links that have no alt text', async () => {
    const md = await convert(
      page(
        '<a href="/promo"><img src="https://cdn.example/banner.jpg" alt=""></a>'
      )
    );
    expect(md).not.toContain('https://cdn.example');
    expect(md).not.toContain('](/promo)');
  });

  it('converts image-only links to text links using alt text', async () => {
    const md = await convert(
      page(
        '<a href="/cameras"><img src="https://cdn.example/cam.jpg" alt="Cameras"></a>'
      )
    );
    expect(md).not.toContain('https://cdn.example');
    expect(md).not.toContain('[Cameras](/cameras)');
    expect(md).toContain('Cameras');
  });

  it('includes meta description in Page block', async () => {
    const html =
      `<html><head><title>Store</title>` +
      `<meta name="description" content="Best online store">` +
      `<link rel="canonical" href="https://shop.example/"></head>` +
      `<body><main><p>body</p></main></body></html>`;
    expect(await convert(html)).toContain('Description: Best online store');
  });

  it('appends Structured Data block when JSON-LD is present', async () => {
    const jsonLd = { '@type': 'WebSite', name: 'Electronics' };
    const escaped = JSON.stringify(jsonLd)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const md = await convert(
      page(
        '<p>body</p>',
        '',
        `<script id="json-ld" type="application/ld+json">${escaped}</script>`
      )
    );
    expect(md).toContain('## Structured Data');
    expect(md).toContain('"@type": "WebSite"');
    expect(md).toContain('```json');
  });

  it('each createDefaultParser call returns an independent instance', () => {
    const p1 = createDefaultParser();
    const p2 = createDefaultParser();
    expect(p1).not.toBe(p2);
  });
});

describe('block renderers', () => {
  describe('renderPageBlock', () => {
    it('formats only present fields', () => {
      expect(renderPageBlock({ body: '', title: 'T' })).toBe(
        '## Page\n- Title: T'
      );
      expect(renderPageBlock({ body: '' })).toBe('');
    });

    it('includes site name before title', () => {
      const block = renderPageBlock({ body: '', siteName: 'My Shop', title: 'T' });
      expect(block).toContain('- Site: My Shop');
      expect(block.indexOf('Site:')).toBeLessThan(block.indexOf('Title:'));
    });

    it('includes description when present', () => {
      expect(
        renderPageBlock({ body: '', title: 'T', description: 'Desc' })
      ).toContain('- Description: Desc');
    });
  });

  describe('renderJsonLdBlock', () => {
    it('returns empty string when jsonLd is absent', () => {
      expect(renderJsonLdBlock({ body: '' })).toBe('');
      expect(renderJsonLdBlock({ body: '', jsonLd: [] })).toBe('');
    });

    it('formats a single object as fenced JSON code block', () => {
      const block = renderJsonLdBlock({
        body: '',
        jsonLd: [{ '@type': 'WebSite' }],
      });
      expect(block).toContain('## Structured Data');
      expect(block).toContain('```json');
      expect(block).toContain('"@type": "WebSite"');
    });

    it('strips image and logo fields', () => {
      const block = renderJsonLdBlock({
        body: '',
        jsonLd: [
          {
            '@type': 'Product',
            name: 'Cam',
            image: 'https://cdn.example/img.jpg',
            logo: 'https://cdn.example/logo.png',
          },
        ],
      });
      expect(block).toContain('"name": "Cam"');
      expect(block).not.toContain('image');
      expect(block).not.toContain('logo');
    });

    it('formats multiple objects as a JSON array', () => {
      const block = renderJsonLdBlock({
        body: '',
        jsonLd: [{ '@type': 'A' }, { '@type': 'B' }],
      });
      expect(block).toContain('"@type": "A"');
      expect(block).toContain('"@type": "B"');
    });

    it('filters out empty objects after media-field stripping', () => {
      const block = renderJsonLdBlock({
        body: '',
        jsonLd: [{}, { '@type': 'BreadcrumbList', itemListElement: [] }],
      });
      expect(block).toContain('BreadcrumbList');
      expect(block).not.toMatch(/"^\{\}"/);
    });
  });

  describe('renderBody', () => {
    it('returns the body field unchanged', () => {
      const parsed: ParsedPage = { body: '# Hello' };
      expect(renderBody(parsed)).toBe('# Hello');
    });
  });
});

describe('lower-level primitives', () => {
  it('createDefaultTurndownService resolves to a configured TurndownService', async () => {
    const service = await createDefaultTurndownService();
    expect(service).toBeDefined();
    expect(typeof service.turndown).toBe('function');
    expect(service.turndown('<h2>Hi</h2>').trim()).toContain('## Hi');
  });

  it('htmlToMarkdown converts an arbitrary fragment (structure-agnostic)', async () => {
    const service = await createDefaultTurndownService();
    expect(htmlToMarkdown('<h2>Hi</h2>', service)).toContain('## Hi');
  });

  it('extractMainContent returns the <main> inner HTML', () => {
    expect(extractMainContent('<body><main><p>x</p></main></body>')).toBe(
      '<p>x</p>'
    );
  });
});
