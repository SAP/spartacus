/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Applicable } from '@spartacus/core';
import { CxServerErrorResponse } from '../server-errors';

/**
 * A transformer responsible for transforming an error into a {@link CxServerErrorResponse}.
 * The transformer is applicable when the error matches the transformer's criteria.
 */
export interface ServerErrorResponseTransformer extends Applicable {
  transform(error: unknown): CxServerErrorResponse;
}

/**
 * Injection token for server error response transformers.
 */
export const SERVER_ERROR_RESPONSE_TRANSFORMERS = new InjectionToken<
  ServerErrorResponseTransformer[]
>('SERVER_ERROR_RESPONSE_TRANSFORMERS');
