/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  FeatureConfigService,
  MultiErrorHandler,
  resolveApplicable,
} from '@spartacus/core';
import { SERVER_ERROR_RESPONSE_FACTORY } from '../server-error-response-factory';
import { PROPAGATE_SERVER_ERROR_RESPONSE } from '../server-error-response/propagate-server-error-response';

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
  protected serverErrorResponseFactories = inject(
    SERVER_ERROR_RESPONSE_FACTORY
  );
  protected propagateServerErrorResponse = inject(
    PROPAGATE_SERVER_ERROR_RESPONSE
  );
  private featureConfigService: FeatureConfigService =
    inject(FeatureConfigService);

  handleError(error: unknown): void {
    if (!this.featureConfigService.isEnabled('ssrErrorPropagation')) {
      return;
    }
    const cxServerErrorResponse = resolveApplicable(
      this.serverErrorResponseFactories,
      [error]
    )?.create(error);

    if (cxServerErrorResponse) {
      this.propagateServerErrorResponse(cxServerErrorResponse);
    }
  }
}
