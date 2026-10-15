/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { PageContext } from './extract-page-context';

/**
 * Parsed representation of a rendered SSR page.
 * Returned by `HtmlToPageParser` and consumed by `ParsedPageConverter`
 * block renderers.
 */
export interface ParsedPage extends PageContext {
  /** Markdown body extracted from the page's main content area. */
  body: string;
}

/**
 * Parses a rendered SSR HTML string into a structured `ParsedPage`.
 * May be synchronous or asynchronous.
 *
 * Provided as the `parser` option to `createMarkdownPageHandler`.
 * The default implementation is `createDefaultParser()`.
 */
export type HtmlToPageParser = (
  html: string
) => ParsedPage | Promise<ParsedPage>;

/**
 * Assembles a `ParsedPage` into the final Markdown string.
 * May be synchronous or asynchronous.
 *
 * Provided as the `converter` option to `createMarkdownPageHandler`.
 * The default implementation is `defaultConverter`.
 *
 * Individual block renderers (`renderPageBlock`, `renderJsonLdBlock`,
 * `renderBody`) are exported so a custom converter can reuse specific
 * blocks and insert its own in any order.
 */
export type ParsedPageConverter = (
  parsed: ParsedPage
) => string | Promise<string>;

/**
 * Options for `createMarkdownPageHandler`.
 */
export interface MarkdownPageHandlerOptions {
  /**
   * Custom HTML → `ParsedPage` parser. Defaults to `createDefaultParser()`.
   *
   * Supply your own when your storefront emits a different HTML structure.
   * Use `createDefaultParser({ createTurndownService })` to adjust only the
   * Turndown rules without replacing the full parser.
   */
  parser?: HtmlToPageParser;
  /**
   * Custom `ParsedPage` → Markdown converter. Defaults to `defaultConverter`.
   *
   * Build your own by calling the exported block renderers (`renderPageBlock`,
   * `renderJsonLdBlock`, `renderBody`) and adding custom blocks in any order.
   */
  converter?: ParsedPageConverter;
  /**
   * Max time (ms) allowed for the parser + converter pipeline before falling
   * back to serving the original HTML untouched. Defaults to 3000.
   */
  timeout?: number;
  /**
   * Logger used when conversion fails or times out. Defaults to `console`.
   * Pass `null` to silence all conversion errors, or supply a custom object
   * to route logs to your application logger.
   *
   * @example
   * // Silence errors
   * createMarkdownPageHandler({ logger: null })
   * // Custom logger
   * createMarkdownPageHandler({ logger: myAppLogger })
   */
  logger?: Pick<Console, 'error'> | null;
  /**
   * URL substrings for which Markdown conversion is skipped entirely.
   * Matched as a case-sensitive substring of `req.url`. Defaults to
   * `defaultRenderingStrategyResolverOptions.excludedUrls` so that
   * CSR-only pages (checkout, my-account, etc.) are excluded automatically.
   * Pass an empty array to disable URL filtering.
   *
   * @example
   * createMarkdownPageHandler({ skipUrls: ['checkout', 'admin'] })
   */
  skipUrls?: string[];
}
