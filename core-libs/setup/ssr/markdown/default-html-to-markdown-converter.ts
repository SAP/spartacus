/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import type TurndownService from 'turndown';
import { extractPageContext } from './extract-page-context';
import {
  HtmlToPageParser,
  ParsedPage,
  ParsedPageConverter,
} from './markdown-page-handler.model';

/**
 * CSS classes Spartacus' pagination component sets on each anchor
 * (mirrors `PaginationItemType`). Used to detect pagination links so their
 * aria-label is emitted instead of the bare symbol/number inner text.
 */
const PAGINATION_ITEM_TYPES = new Set([
  'first',
  'last',
  'previous',
  'next',
  'start',
  'end',
  'page',
]);

const ARIA_LABEL = 'aria-label';

/**
 * Dynamically imports and configures a TurndownService instance with
 * Spartacus-specific conversion rules.
 *
 * Typically called eagerly by `createDefaultParser` at server startup so
 * the module is ready before the first request arrives. Exported for
 * composability: call this, add custom rules on top, then pass the factory
 * to `createDefaultParser({ createTurndownService })`.
 */
export async function createDefaultTurndownService(): Promise<TurndownService> {
  const { default: TurndownServiceClass } = await import('turndown');
  const service = new TurndownServiceClass({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
  });

  // Strip <img> elements — replace with alt text only (image URLs are noise for agents).
  service.addRule('no-images', {
    filter: 'img',
    replacement: (_, node) => (node as Element).getAttribute('alt') || '',
  });

  // Drop anchor links whose inner content is empty after child processing.
  // Image-only links whose img had no alt text become empty and are removed;
  // image-only links with alt text are kept as plain text (not hyperlinks).
  //
  // Block-level markdown (headings) cannot live inside an inline `[…](url)`.
  // When the converted content contains heading lines (e.g. a product card
  // where <h3> and price sit inside <a>), hoist the headings before the link
  // and use the heading's plain text as the link label.
  service.addRule('clean-empty-links', {
    filter: (node) => node.nodeName === 'A' && !!node.getAttribute('href'),
    replacement: (content, node) => {
      const text = content.trim();
      if (!text) {
        return '';
      }
      const isImageOnlyLink = Array.from((node as Element).childNodes).every(
        (child) =>
          child.nodeName === 'IMG' ||
          (child.nodeType === 3 /* TEXT_NODE */ &&
            !(child as Text).textContent?.trim())
      );
      if (isImageOnlyLink) {
        return text;
      }
      const href = (node as Element).getAttribute('href') || '';

      // Detect heading lines produced by child conversion (e.g. <h3> inside <a>).
      const lines = text.split('\n');
      const headingLines = lines.filter((l) => /^#{1,6}\s/.test(l.trim()));
      if (headingLines.length === 0) {
        return `[${text}](${href})`;
      }

      // Use the first heading's plain text as the link label.
      const linkLabel = headingLines[0].replace(/^#{1,6}\s+/, '').trim();

      // Remaining non-heading content (price, description, …), deduped against
      // the link label so image alt text echoing the heading title is dropped.
      const remaining = lines
        .filter((l) => !/^#{1,6}\s/.test(l.trim()))
        .map((l) => l.trim())
        .filter((l) => l && l !== linkLabel)
        .join('\n');

      return (
        '\n\n' +
        [...headingLines, `[${linkLabel}](${href})`, ...(remaining ? [remaining] : [])].join('\n') +
        '\n\n'
      );
    },
  });

  // Render accessible image-role elements (e.g. cx-star-rating) via their
  // aria-label, so rating values survive the HTML→Markdown conversion.
  service.addRule('aria-img', {
    filter: (node) =>
      node.nodeName === 'DIV' &&
      node.getAttribute('role') === 'img' &&
      !!node.getAttribute(ARIA_LABEL),
    replacement: (_, node) => (node as Element).getAttribute(ARIA_LABEL) || '',
  });

  // Pagination anchors render a symbol/number as inner text (« » 1 2 …) but
  // carry a meaningful aria-label ("Go to page 2", "Go to last page").
  // Emit `[aria-label](href)` so the navigable page links survive with their
  // target URL (incl. currentPage/sortCode query params) intact. Anchors that
  // are `disabled` (« on the first page) or mark the `current` page point
  // nowhere useful, so they are dropped entirely. The component sets several
  // classes (e.g. "page disabled current"), so match on the class token list.
  service.addRule('pagination-link', {
    filter: (node) => {
      if (node.nodeName !== 'A' || !node.getAttribute('href')) {
        return false;
      }
      const classes = (node.getAttribute('class') ?? '').split(/\s+/);
      return classes.some((c) => PAGINATION_ITEM_TYPES.has(c));
    },
    replacement: (content, node) => {
      const el = node as Element;
      const classes = (el.getAttribute('class') ?? '').split(/\s+/);
      if (classes.includes('disabled') || classes.includes('current')) {
        return '';
      }
      const label = (el.getAttribute(ARIA_LABEL) || content).trim();
      const href = el.getAttribute('href') || '';
      return label && href ? `[${label}](${href}) ` : '';
    },
  });

  // Render applied filters (Spartacus `<cx-active-facets>`) as a single plain
  // text line. Each active filter is an `<a role="button">` "chip" whose href
  // points to the *remove-this-filter* URL — a misleading link for an agent —
  // so we drop the hrefs and keep only the human-readable filter labels
  // (the chip's `<span>` text; the trailing `<cx-icon>` is decorative).
  service.addRule('active-facets', {
    filter: (node) => node.nodeName === 'CX-ACTIVE-FACETS',
    replacement: (_content, node) => {
      const chips = Array.from((node as Element).querySelectorAll('a'))
        .map((a) => (a.textContent ?? '').replace(/\s+/g, ' ').trim())
        .filter(Boolean);
      return chips.length ? `\n\nApplied filters: ${chips.join(', ')}\n\n` : '';
    },
  });

  // Render each Spartacus `<cx-banner>` as its own delineated block instead of
  // letting sibling banners concatenate into one unspaced run. The banner's
  // visible text lives in the `<img alt>` (falling back to the link's
  // aria-label); when the banner is a link, emit `[label](href)` so the
  // navigation target survives, otherwise emit the label as plain text.
  service.addRule('banner', {
    filter: (node) => node.nodeName === 'CX-BANNER',
    replacement: (_content, node) => {
      const el = node as Element;
      const anchor = el.querySelector('a[href]');
      const label = (
        el.querySelector('img')?.getAttribute('alt') ||
        anchor?.getAttribute(ARIA_LABEL) ||
        ''
      ).trim();
      if (!label) {
        return '';
      }
      const href = anchor?.getAttribute('href');
      return href ? `\n\n[${label}](${href})\n\n` : `\n\n${label}\n\n`;
    },
  });

  // Drop the sort widget: it is an interactive combobox (ng-select) with no
  // navigable links — noise for agents. Remove the <cx-sorting> element and
  // its "Sort by" <label class="cx-sort-dropdown"> sibling. Do NOT remove the
  // enclosing `.cx-sorting` row: it also hosts the pagination, which we keep.
  service.remove((node) => {
    if (node.nodeName === 'CX-SORTING') {
      return true;
    }
    if (node.nodeName !== 'LABEL') {
      return false;
    }
    const classes = (node.getAttribute('class') ?? '').split(/\s+/);
    return classes.includes('cx-sort-dropdown');
  });

  // Drop every <button>: buttons are interactive JS affordances (add to cart,
  // read more, quantity steppers, accordion/tab toggles, carousel scroll,
  // "show reviews", …) with no navigable href — pure noise for agents. Their
  // sibling content (product description, spec bullets, reviews) lives outside
  // the button and is preserved. Navigation stays available via <a href>.
  service.remove('button');

  return service;
}

/** Options for `createDefaultParser`. */
export interface DefaultParserOptions {
  /**
   * Custom TurndownService factory. Defaults to `createDefaultTurndownService`.
   *
   * Use when you need to add or replace Turndown conversion rules without
   * writing a full custom parser.
   *
   * @example
   * const parser = createDefaultParser({
   *   createTurndownService: async () => {
   *     const svc = await createDefaultTurndownService();
   *     svc.addRule('highlight', { filter: 'mark', replacement: c => `==${c}==` });
   *     return svc;
   *   },
   * });
   */
  createTurndownService?: () => Promise<TurndownService>;
}

/**
 * Factory: creates the default HTML → `ParsedPage` parser.
 *
 * Triggers a dynamic import of `turndown` **immediately** when called (i.e. at
 * server startup when `createMarkdownPageHandler` registers the middleware),
 * so the module is loaded before the first request arrives. No per-request
 * overhead.
 *
 * If a customer provides their own `parser` option to `createMarkdownPageHandler`,
 * this factory is never called and `turndown` is never imported.
 */
export function createDefaultParser(
  options?: DefaultParserOptions
): HtmlToPageParser {
  // Eager load: dynamic import starts immediately at factory-creation time.
  // By the time the first request is processed, TurndownService is ready.
  const servicePromise = (
    options?.createTurndownService ?? createDefaultTurndownService
  )();

  return async (html: string): Promise<ParsedPage> => {
    const service = await servicePromise;
    const body = htmlToMarkdown(extractMainContent(html), service);
    const context = extractPageContext(html);
    return { ...context, body };
  };
}

/** Structure-agnostic: convert any HTML fragment to trimmed Markdown. */
export function htmlToMarkdown(
  fragmentHtml: string,
  service: TurndownService
): string {
  return service.turndown(fragmentHtml).trim();
}

/**
 * Spartacus-landmark-specific: return the inner HTML of `<main>`.
 * Falls back to `<body>` then the whole input when `<main>` is absent.
 */
export function extractMainContent(html: string): string {
  const main = /<main\b[^>]*>([\s\S]*?)<\/main>/i.exec(html);
  if (main) {
    return main[1];
  }
  const bodyMatch = /<body\b[^>]*>([\s\S]*?)<\/body>/i.exec(html);
  return bodyMatch ? bodyMatch[1] : html;
}

/** Block renderer: formats a `## Page` metadata block from the parsed page context. */
export function renderPageBlock(parsed: ParsedPage): string {
  const lines: string[] = [];
  if (parsed.siteName) {
    lines.push(`- Site: ${parsed.siteName}`);
  }
  if (parsed.title) {
    lines.push(`- Title: ${parsed.title}`);
  }
  if (parsed.canonicalUrl) {
    lines.push(`- URL: ${parsed.canonicalUrl}`);
  }
  if (parsed.description) {
    lines.push(`- Description: ${parsed.description}`);
  }
  if (parsed.breadcrumb) {
    lines.push(`- Breadcrumb: ${parsed.breadcrumb}`);
  }
  return lines.length ? `## Page\n${lines.join('\n')}` : '';
}

/**
 * Block renderer: formats a `## Structured Data` fenced JSON code block.
 *
 * `image` and `logo` properties are stripped before serialisation — their
 * values are always media URLs, which are noise for agents.
 */
export function renderJsonLdBlock(parsed: ParsedPage): string {
  const jsonLd = parsed.jsonLd;
  if (!jsonLd || jsonLd.length === 0) {
    return '';
  }
  const cleaned = jsonLd
    .map(stripMediaFields)
    .filter((obj) => Object.keys(obj as Record<string, unknown>).length > 0);
  if (cleaned.length === 0) {
    return '';
  }
  const payload = cleaned.length === 1 ? cleaned[0] : cleaned;
  return `## Structured Data\n\`\`\`json\n${JSON.stringify(payload, null, 2)}\n\`\`\``;
}

/** Block renderer: returns the pre-converted Markdown body. */
export function renderBody(parsed: ParsedPage): string {
  return parsed.body;
}

/**
 * Default `ParsedPage` → Markdown converter.
 *
 * Assembles a `## Page` metadata block, a `## Structured Data` block,
 * and the Markdown body, separated by `---`. The individual block renderers
 * (`renderPageBlock`, `renderJsonLdBlock`, `renderBody`) are exported so a
 * custom converter can reuse specific blocks and insert its own in any order.
 */
export const defaultConverter: ParsedPageConverter = (
  parsed: ParsedPage
): string => {
  const pageBlock = renderPageBlock(parsed);
  const jsonLdBlock = renderJsonLdBlock(parsed);
  const prefix = [pageBlock, jsonLdBlock].filter(Boolean).join('\n\n');
  return prefix
    ? `${prefix}\n\n---\n\n${renderBody(parsed)}`
    : renderBody(parsed);
};

function stripMediaFields(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(stripMediaFields);
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([key]) => key !== 'image' && key !== 'logo')
        .map(([key, val]) => [key, stripMediaFields(val)])
    );
  }
  return value;
}
