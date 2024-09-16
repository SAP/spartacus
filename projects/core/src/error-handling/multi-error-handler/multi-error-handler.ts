/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

/**
 * Multi error handlers are responsible for act with errors handled by the CxErrorHandler.
 *
 * @method handleError - Handles the error.
 *
 * @public
 */
export interface MultiErrorHandler {
  handleError(error: unknown): void;
}

/**
 * Injection token for multi error handlers.
 * Multi provided error handlers will be called in the order they are provided.
 */

export const MULTI_ERROR_HANDLER = new InjectionToken<MultiErrorHandler[]>(
  'MULTI_ERROR_HANDLER'
);
