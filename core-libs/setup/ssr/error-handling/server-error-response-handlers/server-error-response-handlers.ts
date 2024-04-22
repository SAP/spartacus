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
 * Handles CmsPageNotFoundServerErrorResponse which results in a fallback to client side rendering.
 * The document content is sent to the client with the appropriate 404 status code.
 *
 * @param documentContent The document content to be sent to the client.
 * @returns The error request handler.
 */
export const handleCmsPageNotFoundErrorResponse =
  (documentContent: string): ErrorRequestHandler =>
  (err, _req, res, next) => {
    if (!res.headersSent && err instanceof CmsPageNotFoundServerErrorResponse) {
      res.set('Cache-Control', 'no-store');
      res.status(404).send(documentContent);
    } else {
      next(err);
    }
  };

/**
 * Handles UnknownServerErrorResponse which results in a fallback to client side rendering.
 * The document content is sent to the client with the appropriate status 500 code.
 *
 * @param documentContent The document content to be sent to the client.
 * @returns The error request handler.
 */
export const handleUnknownServerErrorResponse =
  (documentContent: string): ErrorRequestHandler =>
  (err, _req, res, next) => {
    if (!res.headersSent && err instanceof UnknownServerErrorResponse) {
      res.set('Cache-Control', 'no-store');
      res.status(500).send(documentContent);
    } else {
      next(err);
    }
  };
