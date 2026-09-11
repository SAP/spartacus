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
      return `[${text}](${href})`;
    },
  });

  // Render accessible image-role elements (e.g. cx-star-rating) via their
  // aria-label, so rating values survive the HTML→Markdown conversion.
  service.addRule('aria-img', {
    filter: (node) =>
      node.nodeName === 'DIV' &&
      node.getAttribute('role') === 'img' &&
      !!node.getAttribute('aria-label'),
    replacement: (_, node) =>
      (node as Element).getAttribute('aria-label') || '',
  });

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
