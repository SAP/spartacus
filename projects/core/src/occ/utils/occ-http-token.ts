/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpContextToken } from '@angular/common/http';

export interface OccHttpContext {
  /**
   * Indicates to the interceptor that the emulated customer ID should be sent to the OCC
   * to avoid ambiguity.
   * 'string' if the request has the user ID at hand.
   * 'boolean' (or, 'true') if the request does not have the user ID but still needs to send the emulated ID.
   * @see feature-libs/asm/root/interceptors/user-id-http-header.interceptor.ts
   */
  sendUserIdAsHeader?: string | boolean;
}

export const OCC_HTTP_TOKEN = new HttpContextToken<OccHttpContext>(() => ({}));
