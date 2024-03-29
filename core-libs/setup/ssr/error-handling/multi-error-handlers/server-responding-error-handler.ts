/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { MultiErrorHandler, resolveApplicable } from '@spartacus/core';
import { SERVER_ERROR_RESPONSE_TRANSFORMERS } from '../server-error-response-transformers';

/**
 * Error handler responsible for sending an error response to the incoming request in the server.
 * Intended to be used as part of a multi-error handler strategy.
 *
 * @see MultiErrorHandler
 */
@Injectable({
  providedIn: 'root',
})
export class ServerRespondingErrorHandler implements MultiErrorHandler {
  protected transformers = inject(SERVER_ERROR_RESPONSE_TRANSFORMERS);

  handleError(error: unknown): void {
    //@ts-ignore
    //TODO:CXSPA-6577 Remove console.log and propagate the error to the OptimizedSsrEngine
    const cxServerError = resolveApplicable(this.transformers, [
      error,
    ]).transform(error);
    //@eslint-disable-next-line
    console.log('ServerRespondingErrorHandler: ', cxServerError);
  }
}
