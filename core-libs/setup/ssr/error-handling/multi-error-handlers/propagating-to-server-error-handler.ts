/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformServer } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  REQUEST_CONTEXT,
  inject,
} from '@angular/core';
import { MultiErrorHandler } from '@spartacus/core';
import { RequestContextWithCx } from '../../engine/request-context.model';
import { PROPAGATE_ERROR_TO_SERVER } from '../error-response/propagate-error-to-server';

/**
 * Propagates the given error object to the higher layer in the server.
 *
 * It's meant to propagate errors for example to ExpressJS layer when using SSR.
 *
 * In the modern SSR system (CxAngularNodeAppEngine), errors are propagated via
 * REQUEST_CONTEXT.cx.error. In the legacy system (CxCommonEngine), errors are
 * propagated via the PROPAGATE_ERROR_TO_SERVER injection token.
 *
 * Note: We need it until Angular implements a proper propagation of async errors
 * from an app to the higher layer in the server.
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
  private platformId = inject(PLATFORM_ID);
  private requestContext = inject(REQUEST_CONTEXT, {
    optional: true,
  }) as RequestContextWithCx | null;
  private legacyPropagateError = inject(PROPAGATE_ERROR_TO_SERVER, {
    optional: true,
  });

  handleError(error: unknown): void {
    if (!isPlatformServer(this.platformId)) {
      return;
    }

    // Try modern path first: REQUEST_CONTEXT.cx.error
    const modernErrorHandler = this.requestContext?.cx?.error;
    if (modernErrorHandler) {
      modernErrorHandler(error);
      return;
    }

    // Fall back to legacy path: PROPAGATE_ERROR_TO_SERVER token
    if (this.legacyPropagateError) {
      this.legacyPropagateError(error);
    }
  }
}
