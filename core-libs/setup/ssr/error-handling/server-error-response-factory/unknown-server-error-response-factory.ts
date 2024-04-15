/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Priority } from '@spartacus/core';
import {
  CxServerErrorResponse,
  UnknownServerErrorResponse,
} from '../server-error-response';
import { ServerErrorResponseFactory } from './server-error-response-factory';

/*
 * The UnknownServerErrorResponseFactory creates an UnknownServerErrorResponse if HTTP error occur during server-side rendering.
 *
 * This factory is used as a fallback to handle any server error that
 * does not match the applicability criteria of other Server Error Response Factories.
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
