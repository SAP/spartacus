/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

export interface OccOpfPaymentEndpoints {
  /**
   * Sets the payment option for the checkout cart
   */
  setCartPaymentOption?: string | CoreOccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends OccOpfPaymentEndpoints {}
}
