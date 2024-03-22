/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { MultiErrorHandler } from '@spartacus/core';

/**
 * Error handler responsible for responsible for handling server responding errors.
 * Intended to be used as part of a multi-error handler strategy.
 *
 * @see MultiErrorHandler
 */
@Injectable({
  providedIn: 'root',
})
export class ServerRespondingErrorHandler implements MultiErrorHandler {
  handleError(_error: Error): void {
    // TODO: CXSPA-6576 use SEVER_ERROR_RESPONSE_TRANSFORMERS
  }
}
