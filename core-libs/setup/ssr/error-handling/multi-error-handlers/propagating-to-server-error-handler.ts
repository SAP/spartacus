/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { FeatureConfigService, MultiErrorHandler } from '@spartacus/core';
import { PROPAGATE_ERROR_TO_SERVER } from '../error-response/propagate-error-to-server';

/**
 * Propagates the given error object to the higher layer in the server.
 *
 * It's meant to propagate errors for example to ExpressJS layer when using SSR
 * or to a Prerendering Worker when using Server Prerendering.
 * Currently, it's provided OOTB only in SSR (not prerendering), in the `CxCommonEngine` class.
 *
 * Note: We need it until Angular implements a proper propagation of async errors
 * from an app to the the higher layer in the server.
 * For more, see the Angular issue https://github.com/angular/angular/issues/33642
 *
 * Intended to be used as part of a multi-error handler strategy.
 *
 * @see MultiErrorHandler
 */
@Injectable({
  providedIn: 'root',
})
export class PropagatingToServerErrorHandler implements MultiErrorHandler {
  protected propagateErrorToServer = inject(PROPAGATE_ERROR_TO_SERVER);
  private featureConfigService: FeatureConfigService =
    inject(FeatureConfigService);

  handleError(error: unknown): void {
    if (!this.featureConfigService.isEnabled('propagateErrorsToServer')) {
      return;
    }
    this.propagateErrorToServer(error);
  }
}
