/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { RequestHandler, Response } from 'express';
import { defaultRenderingStrategyResolverOptions } from '../optimized-engine/rendering-strategy-resolver-options';
import {
  createDefaultParser,
  defaultConverter,
} from './default-html-to-markdown-converter';
import {
  HtmlToPageParser,
  MarkdownPageHandlerOptions,
  ParsedPageConverter,
} from './markdown-page-handler.model';

const DEFAULT_TIMEOUT_MS = 3000;

/**
 * Express middleware that serves a Markdown rendering of the SSR page
 * when the client negotiates `Accept: text/markdown`.
 *
 * Register it BEFORE `express.static` and the Angular catch-all. It
 * patches `res.send` for qualifying requests; Angular renders normally
 * and the patch intercepts the rendered HTML string after render.
 *
 * The pipeline is: `html → parser → ParsedPage → converter → markdown`.
 * On any parser/converter failure or timeout the original HTML is served
 * untouched, so a transformation error never breaks a page response.
 */
export function createMarkdownPageHandler(
  options?: MarkdownPageHandlerOptions
): RequestHandler {
  const parser: HtmlToPageParser = options?.parser ?? createDefaultParser();
  const converter: ParsedPageConverter =
    options?.converter ?? defaultConverter;
  const timeout = options?.timeout ?? DEFAULT_TIMEOUT_MS;
  const logger = options?.logger !== undefined ? options.logger : console;
  const skipUrls =
    options?.skipUrls ?? defaultRenderingStrategyResolverOptions.excludedUrls;

  return (req, res, next) => {
    if (
      req.accepts(['text/html', 'text/markdown']) !== 'text/markdown' ||
      (skipUrls?.length &&
        req.url &&
        skipUrls.some((url) => req.url.includes(url)))
    ) {
      next();
      return;
    }

    const originalSend = res.send.bind(res);
    res.send = (body?: unknown): Response => {
      res.send = originalSend; // restore first to prevent recursion
      const html = typeof body === 'string' ? body : String(body);

      void sendMarkdown(html, parser, converter, timeout, logger, originalSend, res);

      return res;
    };

    next();
  };
}

async function runPipeline(
  html: string,
  parser: HtmlToPageParser,
  converter: ParsedPageConverter
): Promise<string> {
  const parsed = await parser(html);
  return converter(parsed);
}

async function sendMarkdown(
  html: string,
  parser: HtmlToPageParser,
  converter: ParsedPageConverter,
  timeout: number,
  logger: Pick<Console, 'error'> | null | undefined,
  originalSend: Response['send'],
  res: Response
): Promise<void> {
  try {
    const markdown = await withTimeout(
      runPipeline(html, parser, converter),
      timeout
    );
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('Vary', 'Accept');
    originalSend(markdown);
  } catch (error) {
    // Graceful degradation: serve the original HTML untouched.
    logger?.error('[markdown-page-handler] conversion failed', error);
    originalSend(html);
  }
}

async function withTimeout(
  promise: Promise<string>,
  ms: number
): Promise<string> {
  let timerId: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timerId = setTimeout(
          () =>
            reject(new Error(`markdown conversion timed out after ${ms}ms`)),
          ms
        );
      }),
    ]);
  } finally {
    clearTimeout(timerId);
  }
}
