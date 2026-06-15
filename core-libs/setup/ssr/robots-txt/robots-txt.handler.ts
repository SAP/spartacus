/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RequestHandler } from 'express';
import { DEFAULT_ROBOTS_TXT_CONTENT } from './robots-txt-default-content';
import { RobotsTxtOptions } from './robots-txt.model';

/**
 * Creates an Express request handler that serves /robots.txt as plain text.
 *
 * Returns null when `enabled` is false so callers can skip route registration.
 *
 * Usage in server.ts:
 * ```ts
 * const robotsTxtHandler = createRobotsTxtHandler();
 * if (robotsTxtHandler) {
 *   server.get('/robots.txt', robotsTxtHandler);
 * }
 * ```
 */
export function createRobotsTxtHandler(
  options?: RobotsTxtOptions
): RequestHandler | null {
  if (options?.enabled === false) {
    return null;
  }

  const content = options?.content ?? DEFAULT_ROBOTS_TXT_CONTENT;

  return (_req, res) => {
    res.set('Cache-Control', 'public, max-age=3600');
    res.type('text/plain').send(content);
  };
}
