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
    const md = await convert('<html><body><main><p>x</p></main></body></html>');
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

  it('hoists heading out of link when <h3> and price are wrapped in <a>', async () => {
    const md = await convert(
      page(
        '<a href="/electronics-spa/en/USD/product/816802/cyber-shot-w55">' +
          '<img src="https://cdn.example/img.jpg" alt="Cyber-shot W55">' +
          '<h3 class="cx-product-name">Cyber-shot W55</h3>' +
          '<div class="price">$260.87</div>' +
          '</a>'
      )
    );
    // heading must be outside the link brackets
    expect(md).toContain('### Cyber-shot W55');
    expect(md).not.toMatch(/\[.*###.*\]/s);
    // link must use plain product name
    expect(md).toContain(
      '[Cyber-shot W55](/electronics-spa/en/USD/product/816802/cyber-shot-w55)'
    );
    // price must appear after the link
    expect(md).toContain('$260.87');
    const headingPos = md.indexOf('### Cyber-shot W55');
    const linkPos = md.indexOf('[Cyber-shot W55]');
    const pricePos = md.indexOf('$260.87');
    expect(headingPos).toBeLessThan(linkPos);
    expect(linkPos).toBeLessThan(pricePos);
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

  it('renders pagination anchors using their aria-label, keeping the href', async () => {
    const md = await convert(
      page(
        '<a class="previous" aria-label="Previous page" href="/c/575?currentPage=0">«</a>' +
          '<a class="page" aria-label="Page 2" href="/c/575?currentPage=1&sortCode=relevance">2</a>' +
          '<a class="next" aria-label="Next page" href="/c/575?currentPage=2">»</a>'
      )
    );
    expect(md).toContain('[Previous page](/c/575?currentPage=0)');
    expect(md).toContain('[Page 2](/c/575?currentPage=1&sortCode=relevance)');
    expect(md).toContain('[Next page](/c/575?currentPage=2)');
    // the bare glyph is not emitted as the link text
    expect(md).not.toContain('[«]');
    expect(md).not.toContain('[»]');
  });

  it('matches multi-class pagination anchors and drops disabled/current ones', async () => {
    // Real rendered markup: the component adds "disabled"/"current" alongside
    // the item-type class, e.g. class="page disabled current", "start disabled".
    const md = await convert(
      page(
        '<a class="start disabled" aria-label="Previous page" href="/c/brands">«</a>' +
          '<a class="page disabled current" aria-label="Page 1" href="/c/brands">1</a>' +
          '<a class="page" aria-label="Go to page 2" href="/c/brands?currentPage=1">2</a>' +
          '<a class="end" aria-label="Go to last page" href="/c/brands?currentPage=14">»</a>'
      )
    );
    // navigable multi-class anchors are emitted with their aria-label
    expect(md).toContain('[Go to page 2](/c/brands?currentPage=1)');
    expect(md).toContain('[Go to last page](/c/brands?currentPage=14)');
    // disabled and current anchors are dropped entirely (no bare glyph link)
    expect(md).not.toContain('[Previous page]');
    expect(md).not.toContain('[Page 1]');
    expect(md).not.toContain('](/c/brands)'); // the two links to the current page
  });

  it('drops the cx-sorting widget entirely', async () => {
    const md = await convert(
      page(
        '<cx-sorting><label>Sort by</label>' +
          '<div role="combobox">Relevance</div>6 options available</cx-sorting>' +
          '<p>real content</p>'
      )
    );
    expect(md).toContain('real content');
    expect(md).not.toContain('Sort by');
    expect(md).not.toContain('options available');
  });

  it('drops the sort label + combobox but keeps sibling pagination in the same row', async () => {
    // Real markup: <div class="cx-sorting top"><div class="row">
    //   <label class="cx-sort-dropdown"><span>Sort by</span><cx-sorting/></label>
    //   <div class="col-auto"><cx-pagination><a class="page" .../></cx-pagination></div>
    // </div></div> — pagination shares the .cx-sorting row, so only the label
    // and <cx-sorting> may be removed, never the wrapping row.
    const md = await convert(
      page(
        '<div class="cx-sorting top"><div class="row">' +
          '<label class="form-group cx-sort-dropdown"><span>Sort by</span>' +
          '<cx-sorting>6 options available</cx-sorting></label>' +
          '<div class="col-auto"><a class="page" aria-label="Go to page 2" href="/c/brands?currentPage=1">2</a></div>' +
          '</div></div><p>real content</p>'
      )
    );
    expect(md).toContain('real content');
    expect(md).not.toContain('Sort by');
    expect(md).not.toContain('options available');
    // pagination in the same row survives
    expect(md).toContain('[Go to page 2](/c/brands?currentPage=1)');
  });

  it('renders active facets as a plain "Applied filters" line, dropping the remove-filter hrefs', async () => {
    // Real markup: each active filter is an <a role="button"> "chip" whose
    // href points to the *remove-this-filter* URL, with the label in a <span>
    // and a trailing decorative <cx-icon>.
    const md = await convert(
      page(
        '<cx-active-facets>' +
          '<a role="button" href="/c/brands?query=:relevance:brand:BrandA">' +
          '<span>Brand A</span><cx-icon></cx-icon></a>' +
          '<a role="button" href="/c/brands?query=:relevance:color:ColorB">' +
          '<span>Color B</span><cx-icon></cx-icon></a>' +
          '</cx-active-facets>'
      )
    );
    expect(md).toContain('Applied filters: Brand A, Color B');
    // the misleading remove-filter hrefs must not survive as links
    expect(md).not.toContain('[Brand A]');
    expect(md).not.toContain('[Color B]');
    expect(md).not.toContain('query=:relevance:');
  });

  it('emits nothing for an empty cx-active-facets, keeping sibling content', async () => {
    const md = await convert(
      page('<cx-active-facets></cx-active-facets><p>real content</p>')
    );
    expect(md).not.toContain('Applied filters');
    expect(md).toContain('real content');
  });

  it('renders sibling banners as separate blocks, not one concatenated run', async () => {
    const md = await convert(
      page(
        '<cx-banner><a href="/promo-1"><img src="https://cdn.example/1.jpg" alt="Promo One"></a></cx-banner>' +
          '<cx-banner><a href="/promo-2"><img src="https://cdn.example/2.jpg" alt="Promo Two"></a></cx-banner>'
      )
    );
    expect(md).toContain('[Promo One](/promo-1)');
    expect(md).toContain('[Promo Two](/promo-2)');
    // the two banners must not collapse onto a single line (a newline separates them)
    expect(md).not.toMatch(/\]\(\/promo-1\)[^\n]*\[Promo Two\]/);
  });

  it('uses the link aria-label as banner label when the image has no alt', async () => {
    const md = await convert(
      page('<cx-banner><a href="/deal" aria-label="Weekend Deal"></a></cx-banner>')
    );
    expect(md).toContain('[Weekend Deal](/deal)');
  });

  it('drops a banner that has no usable label', async () => {
    const md = await convert(
      page(
        '<cx-banner><a href="/promo"><img src="https://cdn.example/b.jpg" alt=""></a></cx-banner>' +
          '<p>real content</p>'
      )
    );
    expect(md).not.toContain('](/promo)');
    expect(md).toContain('real content');
  });

  it('drops <button> elements while keeping their sibling content', async () => {
    const md = await convert(
      page(
        '<button type="button">Add to cart</button>' +
          '<p>Product description here</p>'
      )
    );
    expect(md).not.toContain('Add to cart');
    expect(md).toContain('Product description here');
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
      const block = renderPageBlock({
        body: '',
        siteName: 'My Shop',
        title: 'T',
      });
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
