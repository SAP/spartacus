/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

export interface CheckoutB2BOccEndpoints {
  /**
   * Returns a list of the available payment types.
   */
  paymentTypes?: string | CoreOccEndpoint;
  /**
   * Sets the cost center for the checkout cart.
   */
  setCartCostCenter?: string | CoreOccEndpoint;
  /**
   * Sets the payment type for the checkout cart
   */
  setCartPaymentType?: string | CoreOccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends CheckoutB2BOccEndpoints {}
}
