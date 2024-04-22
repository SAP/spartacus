/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { CxServerErrorResponse } from './cx-server-error-response';

/**
 * Injection token used to provide a function that will propagate the server error response occurred during server side rendering to the CommonEngine wrapper.
 *
 * @private
 */
export const PROPAGATE_SERVER_ERROR_RESPONSE = new InjectionToken<
  (serverResponse: CxServerErrorResponse) => void
>('PROPAGATE_SERVER_ERROR_RESPONSE');
