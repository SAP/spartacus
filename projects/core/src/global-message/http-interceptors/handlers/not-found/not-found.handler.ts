/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Priority } from '../../../../util/applicable';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from '../http-error.handler';

@Injectable({
  providedIn: 'root',
})
export class NotFoundHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.NOT_FOUND;

  handleError(): void {
    // Intentional empty error handler to avoid we fallabck to the unknown error handler
  }

  getPriority() {
    return Priority.LOW;
  }
}
