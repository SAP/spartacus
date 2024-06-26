/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { MultiErrorHandler } from '@spartacus/core';
import { PROPAGATE_ERROR_RESPONSE } from '../error-response/propagate-error-response';

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
  protected propagateErrorResponse = inject(PROPAGATE_ERROR_RESPONSE);

  handleError(error: unknown): void {
    this.propagateErrorResponse(error);
  }
}
