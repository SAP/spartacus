/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ServerErrorResponseTransformer } from './server-error-response-transformers';
import { CxServerErrorResponse, UnknownServerErrorResponse } from '../server-errors';
import { Priority } from '@spartacus/core';

/*
 * The UnknownServerErrorResponseTransformer transfroms into an UnknownServerError incoming HTTP error that occured during server-side rendering.
 *
 * This transformer is used as a fallback to handle any server error that
 * does not match any other transformer.
 */
@Injectable({
  providedIn: 'root',
})
export class UnknownServerErrorResponseTransformer
  implements ServerErrorResponseTransformer
{
  getPriority(): number {
    return Priority.FALLBACK;
  }

  hasMatch(): boolean {
    return true;
  }

  transform(error: any): CxServerErrorResponse {
    const message = 'An unknown server error occurred';
    return new UnknownServerErrorResponse({
      message,
      cause: error,
    });
  }
}
