/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Request, Response } from 'express';
import { createMarkdownPageHandler } from './create-markdown-page-handler';
import {
  createDefaultParser,
  defaultConverter,
  renderBody,
  renderJsonLdBlock,
  renderPageBlock,
} from './default-html-to-markdown-converter';
import {
  HtmlToPageParser,
  ParsedPage,
  ParsedPageConverter,
} from './markdown-page-handler.model';

const SAMPLE_HTML =
  `<html><head><title>Camera X100</title>` +
  `<link rel="canonical" href="https://shop.example/p/123"></head>` +
  `<body><header id="cx-header">HEADER</header>` +
  `<main><h1>Camera X100</h1><ul><li>12MP</li><li>Zoom</li></ul></main>` +
  `<footer>FOOTER</footer>` +
  `<script id="json-ld" type="application/ld+json">` +
  JSON.stringify({ '@type': 'Product', name: 'Camera X100' }) +
  `</script></body></html>`;

function mockReq(): Request {
  return {
    accepts: jest.fn().mockReturnValue('text/markdown'),
    url: '/product/123',
  } as unknown as Request;
}

function mockRes(): Response {
  const res = {
    send: jest.fn().mockImplementation(() => res),
    setHeader: jest.fn(),
  };
  return res as unknown as Response;
}

/** Flush enough microtask turns for the async res.send pipeline to settle. */
async function flush(): Promise<void> {
  for (let i = 0; i < 5; i++) {
    await Promise.resolve();
  }
}

describe('markdown handler — customization', () => {
  // ---------------------------------------------------------------------------
  // 1. Custom converter reusing exported block renderers + own markers/order.
  // ---------------------------------------------------------------------------
  describe('custom converter', () => {
    it('receives the exact ParsedPage from the parser and controls assembly', () => {
      const parsed: ParsedPage = {
        title: 'Camera X100',
        canonicalUrl: 'https://shop.example/p/123',
        jsonLd: [{ '@type': 'Product', name: 'Camera X100' }],
        body: '# Camera X100\n\n- 12MP\n- Zoom',
      };

      const converter: ParsedPageConverter = jest.fn((p: ParsedPage) =>
        [
          '<!--START-->',
          `${renderPageBlock(p)}\n<!--page-done-->`,
          `${renderBody(p)}\n<!--body-done-->`,
          `${renderJsonLdBlock(p)}\n<!--jsonld-done-->`,
          '<!--END-->',
        ].join('\n---\n')
      );

      const out = converter(parsed) as string;

      // converter received the same object it was handed
      expect(converter).toHaveBeenCalledWith(parsed);
      // every block renderer contributed, in the custom order, with markers
      expect(out).toContain('## Page');
      expect(out).toContain('<!--page-done-->');
      expect(out).toContain('<!--body-done-->');
      expect(out).toContain('## Structured Data');
      expect(out).toContain('<!--jsonld-done-->');
      // custom ordering respected: body before json-ld (opposite of default)
      expect(out.indexOf('<!--body-done-->')).toBeLessThan(
        out.indexOf('<!--jsonld-done-->')
      );
      // sanity: default converter uses the opposite order
      const def = defaultConverter(parsed) as string;
      expect(def.indexOf('## Structured Data')).toBeLessThan(
        def.indexOf(parsed.body)
      );
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Swap turndown entirely via a custom parser (whole DOM -> plain string).
  // ---------------------------------------------------------------------------
  describe('custom parser (turndown replaced)', () => {
    it('gets the raw HTML, returns a plain-string body, no markdown syntax', async () => {
      const parser: HtmlToPageParser = jest.fn((html: string) => {
        // "turn the whole DOM into a string": strip tags, collapse whitespace.
        const body = html
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        return { title: 'plain', body };
      });

      const res = mockRes();
      const sendMock = res.send as jest.Mock;
      createMarkdownPageHandler({ parser })(mockReq(), res, jest.fn());
      sendMock.mockClear();

      res.send(SAMPLE_HTML);
      await flush();

      // parser saw the raw, unmodified HTML string
      expect(parser).toHaveBeenCalledWith(SAMPLE_HTML);

      const sent = sendMock.mock.calls[0][0] as string;
      // plain-string conversion: content survives, but no turndown markdown
      expect(sent).toContain('Camera X100');
      expect(sent).toContain('12MP');
      expect(sent).not.toContain('# Camera'); // no atx heading -> turndown NOT used
      expect(sent).not.toMatch(/^- 12MP/m); // no markdown list bullet
      // markdown response headers still applied by the handler
      expect(res.setHeader).toHaveBeenCalledWith(
        'Content-Type',
        'text/markdown; charset=utf-8'
      );
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Lighter customization: swap only the Turndown service factory.
  // ---------------------------------------------------------------------------
  describe('createDefaultParser({ createTurndownService })', () => {
    it('uses the injected fake service instead of the real turndown', async () => {
      const fakeService = {
        turndown: jest.fn().mockReturnValue('FAKE-ENGINE-OUTPUT'),
      } as unknown as import('turndown');

      const parser = createDefaultParser({
        createTurndownService: async () => fakeService,
      });
      const parsed = await parser(SAMPLE_HTML);

      // body produced by the fake engine, not real turndown
      expect(parsed.body).toBe('FAKE-ENGINE-OUTPUT');
      expect(fakeService.turndown).toHaveBeenCalled();
      // page context still extracted by the default parser
      expect(parsed.title).toBe('Camera X100');
      expect(parsed.canonicalUrl).toBe('https://shop.example/p/123');
    });
  });

  // ---------------------------------------------------------------------------
  // 4. End-to-end: parser -> converter arg flow through the handler.
  // ---------------------------------------------------------------------------
  describe('end-to-end custom parser + converter', () => {
    it('pipes parser output into the converter and sends the final string', async () => {
      const parsedResult: ParsedPage = { title: 'T', body: 'BODY' };
      const parser: HtmlToPageParser = jest
        .fn()
        .mockResolvedValue(parsedResult);
      const converter: ParsedPageConverter = jest
        .fn()
        .mockReturnValue('FINAL-CUSTOM-MARKDOWN');

      const res = mockRes();
      const sendMock = res.send as jest.Mock;
      createMarkdownPageHandler({ parser, converter })(
        mockReq(),
        res,
        jest.fn()
      );
      sendMock.mockClear();

      res.send(SAMPLE_HTML);
      await flush();

      expect(parser).toHaveBeenCalledWith(SAMPLE_HTML);
      expect(converter).toHaveBeenCalledWith(parsedResult);
      expect(sendMock).toHaveBeenCalledWith('FINAL-CUSTOM-MARKDOWN');
    });
  });
});
