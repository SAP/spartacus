/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CmsPageNotFoundHttpErrorResponse } from '@spartacus/core';
import { ErrorRequestHandler } from 'express';

/**
 * Returns default handlers which results in a fallback to client side rendering.
 * - If cms page not found, the document content is sent to the client with the appropriate 404 status code.
 * - For rest of errors, the document content is sent to the client with the appropriate status 500 code.
 *
 * @param documentContent The document content to be sent to the client.
 * @returns The error request handler.
 */
export const defaultServerErrorResponseHandlers =
  (documentContent: string): ErrorRequestHandler =>
  (err, _req, res, _next) => {
    if (!res.headersSent && isCmsPageNotFoundError(err)) {
      res.set('Cache-Control', 'no-store');
      res.status(404).send(documentContent);
    } else {
      res.set('Cache-Control', 'no-store');
      res.status(500).send(documentContent);
    }
  };

export function isCmsPageNotFoundError(error: unknown): boolean {
  return isCmsPageNotFoundHttpErrorResponse(error) && error.cxCmsPageNotFound;
}

export function isCmsPageNotFoundHttpErrorResponse(
  error: unknown
): error is CmsPageNotFoundHttpErrorResponse {
  return error instanceof Object && 'cxCmsPageNotFound' in error;
}
