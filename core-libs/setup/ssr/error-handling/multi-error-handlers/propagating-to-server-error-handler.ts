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
 * Propagates errors from the Angular app to the server layer during SSR.
 *
 * Supports both modern (CxAngularNodeAppEngine via REQUEST_CONTEXT.cx.error)
 * and legacy (CxCommonEngine via PROPAGATE_ERROR_TO_SERVER token) SSR systems.
 *
 * Note: Required until Angular implements proper async error propagation.
 * See: https://github.com/angular/angular/issues/33642
 *
 * @see MultiErrorHandler
 */
@Injectable({ providedIn: 'root' })
export class PropagatingToServerErrorHandler implements MultiErrorHandler {
  private platformId = inject(PLATFORM_ID);

  /** Modern error handler from REQUEST_CONTEXT.cx.error */
  private modernErrorHandler = (
    inject(REQUEST_CONTEXT, { optional: true }) as RequestContextWithCx | null
  )?.cx?.error;

  /** Legacy error handler from PROPAGATE_ERROR_TO_SERVER token */
  private legacyErrorHandler = inject(PROPAGATE_ERROR_TO_SERVER, {
    optional: true,
  });

  handleError(error: unknown): void {
    if (!isPlatformServer(this.platformId)) {
      return;
    }

    // Use modern path if available, otherwise fall back to legacy
    const errorHandler = this.modernErrorHandler ?? this.legacyErrorHandler;
    errorHandler?.(error);
  }
}
