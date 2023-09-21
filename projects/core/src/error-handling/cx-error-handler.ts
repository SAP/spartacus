/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorHandler, Injectable, Injector, inject } from '@angular/core';
import { FeatureConfigService } from '../features-config';
import { LoggerService } from '../logger';
import {
  ERROR_INTERCEPTORS,
  ErrorInterceptor,
} from './error-interceptors/error-interceptor';
import {
  handleInterceptors,
  sortErrorInterceptors,
  tailChain,
} from './utils/error-interceptor-utils';

/**
 * The CxErrorHandler is the default ErrorHandler for Spartacus in SSR mode.
 * It is responsible for handling errors and passing them to the registered error interceptors.
 *
 * @method handleError - Handles the error by passing it to the registered error interceptors.
 *
 * @public
 */
@Injectable()
export class CxErrorHandler implements ErrorHandler {
  //TODO: Verify whether feature flag in this case is justified.
  // if yes - Add Jira ticket to remove in next major release or after 6 months
  private featureConfig = inject(FeatureConfigService);
  logger = inject(LoggerService);

  injector = inject(Injector);

  errorInterceptors: ErrorInterceptor[] = sortErrorInterceptors(
    this.injector.get(ERROR_INTERCEPTORS, [])
  );

  handleError(error: Error): void {
    //TODO: Verify whether feature flag in this case is justified.
    // if yes - Add Jira ticket to remove in next major release or after 6 months
    if (this.featureConfig.isLevel('6.6')) {
      // Similar to Angular's interceptors, error interceptors are organized from right to left,
      // ensuring that the ultimate execution order is from left to right.
      // In other words, if the interceptors array contains `[a, b, c]`,
      // our goal is to create a chain that can be envisioned as c(b(a(end))),
      // constructed by progressively adding elements from the innermost to the outermost.
      const chain = this.errorInterceptors.reduceRight(
        (next, interceptor) => handleInterceptors(next, interceptor),
        tailChain
      );
      chain(error);
    } else {
      this.logger.error(error);
    }
  }
}
