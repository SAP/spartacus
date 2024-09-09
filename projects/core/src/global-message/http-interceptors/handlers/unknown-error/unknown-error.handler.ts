/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';

import { FeatureConfigService } from '../../../../features-config';
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
  protected logger = inject(LoggerService);
  protected featureConfigService = inject(FeatureConfigService);

  responseStatus = HttpResponseStatus.UNKNOWN;

  /**
   * hasMatch always returns true, to mach all errors
   */
  hasMatch(_errorResponse: HttpErrorResponse): boolean {
    return true;
  }

  handleError(_request: HttpRequest<any>, errorResponse: HttpErrorResponse) {
    const shouldLogError = this.featureConfigService.isEnabled(
      'ssrStrictErrorHandlingForHttpAndNgrx'
    )
      ? isDevMode()
      : isDevMode() || this.isSsr();
    console.log('shouldLogError', shouldLogError);

    // Error will be handled and logged by the `HttpErrorHandlerInterceptor`.
    // After removing the `ssrStrictErrorHandlingForHttpAndNgrx` feature flag, error will be logged only in dev mode.
    if (shouldLogError) {
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
