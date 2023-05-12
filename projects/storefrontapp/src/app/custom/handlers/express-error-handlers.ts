import { HttpErrorResponse } from '@angular/common/http';
import { ErrorRequestHandler } from 'express';

import { UnknownServerRenderError } from '../errors/server-render-errors';

export const handleHttpErrorResponse =
  (): ErrorRequestHandler => (err, _req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }

    if (err instanceof HttpErrorResponse) {
      err.headers.keys().forEach((key) => {
        const value = err.headers.get(key);

        if (!value) return;

        res.setHeader(key, value);
      });

      res.status(err.status).send(err.error.message);
    } else {
      next(err);
    }
  };

export const handleUnknownServerRenderErrors =
  (): ErrorRequestHandler => (err, _req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }

    if (err instanceof UnknownServerRenderError) {
      console.log(`CX Error Code: ${err.cxErrorCode}`);

      res.status(500).send(err.message);
    } else {
      next(err);
    }
  };

export interface UnknownServerRenderErrorHandlerOptions {
  template: string;
}
