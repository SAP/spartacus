/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ServerErrorResponseFactory } from './server-error-response-factory';
import {
  CxServerErrorResponse,
  UnknownServerErrorResponse,
} from '../server-errors';
import { Priority } from '@spartacus/core';

/*
 * The UnknownServerErrorResponseFactory creates an UnknownServerErrorResponse if HTTP error occur during server-side rendering.
 *
 * This factory is used as a fallback to handle any server error that
 * does not match any other cases.
 */
@Injectable({
  providedIn: 'root',
})
export class UnknownServerErrorResponseFactory
  implements ServerErrorResponseFactory
{
  getPriority(): number {
    return Priority.FALLBACK;
  }

  hasMatch(): boolean {
    return true;
  }

  create(error: any): CxServerErrorResponse {
    const message = 'An unknown server error occurred';
    return new UnknownServerErrorResponse({
      message,
      cause: error,
    });
  }
}
