/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

/**
 * Function that will propagate the server error response object
 * (created during server side rendering) to the CxCommonEngine.
 */
export const PROPAGATE_SERVER_ERROR_RESPONSE = new InjectionToken<
  (serverResponse: unknown) => void
>('PROPAGATE_SERVER_ERROR_RESPONSE');
