/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Request, RequestHandler, Response } from 'express';
import { defaultRenderingStrategyResolverOptions } from '@spartacus/setup/ssr';
import { DefaultExpressServerLogger, ExpressServerLogger } from '../logger';
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
  const converter: ParsedPageConverter = options?.converter ?? defaultConverter;
  const timeout = options?.timeout ?? DEFAULT_TIMEOUT_MS;
  const logger: ExpressServerLogger | null =
    options?.logger === undefined
      ? new DefaultExpressServerLogger()
      : options.logger;
  const skipUrls =
    options?.skipUrls ?? defaultRenderingStrategyResolverOptions.excludedUrls;

  return (req, res, next) => {
    const isSkipped = !!(
      skipUrls?.length &&
      req.url &&
      skipUrls.some((url) => req.url.includes(url))
    );
    if (isSkipped) {
      // A skipped URL has no Markdown representation, but the response still
      // depends on Accept (HTML for browsers vs 406 for Markdown-only clients),
      // so shared/downstream caches must key on it.
      res.vary('Accept');

      // Browsers (and any client that accepts HTML) get the normal page.
      if (req.accepts('html')) {
        next();
        return;
      }

      // A Markdown-only client (e.g. an agent) explicitly asked for a
      // representation we won't produce here: signal it honestly with 406
      // instead of silently returning HTML it didn't ask for.
      res.status(406).end();
      return;
    }

    // For non-skipped URLs the representation depends on the Accept header
    // (HTML vs Markdown), so shared/downstream caches must key on it.
    res.vary('Accept');

    if (req.accepts(['text/html', 'text/markdown']) !== 'text/markdown') {
      next();
      return;
    }

    const originalSend = res.send.bind(res);
    res.send = (body?: unknown): Response => {
      res.send = originalSend; // restore first to prevent recursion
      const html = typeof body === 'string' ? body : String(body);

      void sendMarkdown(
        html,
        parser,
        converter,
        timeout,
        logger,
        originalSend,
        res,
        req
      );

      return res;
    };

    next();
  };
}

async function runPipeline(
  html: string,
  parser: HtmlToPageParser,
  converter: ParsedPageConverter,
  signal: AbortSignal
): Promise<string> {
  const parsed = await parser(html);
  if (signal.aborted) {
    throw new Error('markdown conversion aborted');
  }
  return converter(parsed);
}

async function sendMarkdown(
  html: string,
  parser: HtmlToPageParser,
  converter: ParsedPageConverter,
  timeout: number,
  logger: ExpressServerLogger | null,
  originalSend: Response['send'],
  res: Response,
  req: Request
): Promise<void> {
  try {
    const markdown = await withTimeout(
      (signal) => runPipeline(html, parser, converter, signal),
      timeout
    );
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    originalSend(markdown);
  } catch (error) {
    // Graceful degradation: serve the original HTML untouched.
    logger?.error('[markdown-page-handler] conversion failed', {
      request: req,
      error,
    });
    originalSend(html);
  }
}

async function withTimeout(
  run: (signal: AbortSignal) => Promise<string>,
  ms: number
): Promise<string> {
  const controller = new AbortController();
  let timerId: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timerId = setTimeout(() => {
      controller.abort();
      reject(new Error(`markdown conversion timed out after ${ms}ms`));
    }, ms);
  });
  try {
    // Note: synchronous turndown work inside `run` cannot be preempted; the
    // signal is checked at the pipeline's async boundaries only.
    return await Promise.race([run(controller.signal), timeout]);
  } finally {
    clearTimeout(timerId);
  }
}
