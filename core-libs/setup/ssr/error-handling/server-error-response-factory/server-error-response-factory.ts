/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Applicable } from '@spartacus/core';
import { CxServerErrorResponse } from '../server-errors';

/**
 * A factory responsible for creating a {@link CxServerErrorResponse} basedon HTTP error response during SSR.
 * The fatory is applicable when the error matches the factory's criteria.
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
