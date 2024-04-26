/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorRequestHandler } from 'express';
import {
  CmsPageNotFoundServerErrorResponse,
  UnknownServerErrorResponse,
} from '../server-error-response/cx-server-error-response';

/**
 * Returns default handlers which results in a fallback to client side rendering.
 * - If CmsPageNotFOundServerErrorResponse occurred, the document content is sent to the client with the appropriate 404 status code.
 * - If UnknownServerErrorResponse occurred, the document content is sent to the client with the appropriate status 500 code.
 *
 * @param documentContent The document content to be sent to the client.
 * @returns The error request handler.
 */
export const defaultServerErrorResponseHandlers =
  (documentContent: string): ErrorRequestHandler =>
  (err, _req, res, next) => {
    if (!res.headersSent && err instanceof UnknownServerErrorResponse) {
      res.set('Cache-Control', 'no-store');
      res.status(500).send(documentContent);
    } else if (
      !res.headersSent &&
      err instanceof CmsPageNotFoundServerErrorResponse
    ) {
      res.set('Cache-Control', 'no-store');
      res.status(404).send(documentContent);
    } else {
      next(err);
    }
  };
