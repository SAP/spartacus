/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CmsPageNotFoundOutboundHttpError,
  HttpResponseStatus,
} from '@spartacus/core';
import { ErrorRequestHandler } from 'express';

/**
 * Returns default handlers which results in a fallback to client side rendering.
 * - If cms page not found, the document content is sent to the client with the appropriate 404 status code.
 * - For rest of errors, the document content is sent to the client with the appropriate status 500 code.
 *
 * @param documentContent The document content to be sent to the client.
 * @returns The error request handler.
 */
//EXPRESS JS ERROR HANDLER
export const defaultExpressErrorHandlers =
  (documentContent: string): ErrorRequestHandler =>
  (err, _req, res, _next) => {
    if (!res.headersSent) {
      res.set('Cache-Control', 'no-store');
      const statusCode =
        err instanceof CmsPageNotFoundOutboundHttpError
          ? HttpResponseStatus.NOT_FOUND
          : HttpResponseStatus.INTERNAL_SERVER_ERROR;
      res.status(statusCode).send(documentContent);
    }
  };

export const customErrorPageErrorHandlers: ErrorRequestHandler = async (
  err,
  req,
  res,
  next
) => {
  if (req.query?.customErrorPage) {
    const statusCode =
      err instanceof CmsPageNotFoundOutboundHttpError
        ? HttpResponseStatus.NOT_FOUND
        : HttpResponseStatus.INTERNAL_SERVER_ERROR;

    const html = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ERROR</title>
  </head>
  <body>
    <h1>${
      statusCode === 404
        ? 'OPS! Page not found (404)'
        : 'Internal Server Error (500)'
    }</h1>
  </body>
</html>
    `;
    res.status(statusCode).send(html);
  } else {
    next(err);
  }
};
