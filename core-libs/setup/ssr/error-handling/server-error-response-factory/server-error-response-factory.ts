/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Applicable } from '@spartacus/core';
import { CxServerErrorResponse } from '../server-error-response';

/**
 * A factory responsible for creating a {@link CxServerErrorResponse} based on a HTTP error response during SSR.
 *
 * The factory implements the {@link Applicable} interface. So when handing an original error, only one of the provided server response factories will be used - the one that is the best applicable for the handled error.
 */
export interface ServerErrorResponseFactory extends Applicable {
  create(error: unknown): CxServerErrorResponse;
}

/**
 * Injection token for multi-provided server error response factory.
 */
export const SERVER_ERROR_RESPONSE_FACTORY = new InjectionToken<
  ServerErrorResponseFactory[]
>('SERVER_ERROR_RESPONSE_FACTORY');
