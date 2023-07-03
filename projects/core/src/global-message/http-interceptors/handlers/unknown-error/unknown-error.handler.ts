/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';

import { LoggerService } from '../../../../logger';
import { Priority } from '../../../../util/applicable';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from '../http-error.handler';

/**
 * Unknown Error Handler works as an fallback, to handle errors that were
 * not handled by any other error handlers
 */
@Injectable({
  providedIn: 'root',
})
export class UnknownErrorHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.UNKNOWN;

  protected logger = inject(LoggerService);

  /**
   * hasMatch always returns true, to mach all errors
   */
  hasMatch(_errorResponse: HttpErrorResponse): boolean {
    return true;
  }

  handleError(_request: HttpRequest<any>, errorResponse: HttpErrorResponse) {
    if (isDevMode() || this.isSsr()) {
      this.logger.warn(
        `An unknown http error occurred\n`,
        errorResponse.message
      );
    }
  }

  /**
   * Fallback priority assures that the handler is used as a last resort
   */
  getPriority() {
    return Priority.FALLBACK;
  }
}
