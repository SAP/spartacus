/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpResponseStatus } from '@spartacus/core';
import { ErrorRequestHandler } from 'express';

/**
 * Checks if the error is a CMS page not found error.
 *
 * We use name-based check instead of `instanceof` because the error may come
 * from a different bundle/context during SSR, causing `instanceof` to fail.
 */
// TODO: investigate if really required
// TODO: check if the issue with instanceof occurred during dev or prod mode
function isCmsPageNotFoundError(err: unknown): boolean {
  return (
    err instanceof Error && err.name === 'CmsPageNotFoundOutboundHttpError'
  );
}

/**
 * Returns default handlers which results in a fallback to client side rendering.
 * - If cms page not found, the document content is sent to the client with the appropriate 404 status code.
 * - For rest of errors, the document content is sent to the client with the appropriate status 500 code.
 *
 * @param documentContent The document content to be sent to the client.
 * @returns The error request handler.
 */
export const defaultExpressErrorHandlers =
  (documentContent: string): ErrorRequestHandler =>
  (err, _req, res, _next) => {
    if (!res.headersSent) {
      res.set('Cache-Control', 'no-store');
      const statusCode = isCmsPageNotFoundError(err)
        ? HttpResponseStatus.NOT_FOUND
        : HttpResponseStatus.INTERNAL_SERVER_ERROR;
      res.status(statusCode).send(documentContent);
    }
  };
