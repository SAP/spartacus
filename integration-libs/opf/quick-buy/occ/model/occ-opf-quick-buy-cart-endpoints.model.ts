/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

export interface OccOpfQuickBuyCartEndpoints {
  /**
   * Endpoint for creating a delivery address on a cart
   */
  quickBuyCreateDeliveryAddress?: string | CoreOccEndpoint;
  /**
   * Endpoint for setting a billing address on a cart
   */
  quickBuySetBillingAddress?: string | CoreOccEndpoint;
  /**
   * Endpoint for getting supported delivery modes for a cart
   */
  quickBuyDeliveryModes?: string | CoreOccEndpoint;
  /**
   * Endpoint for setting a delivery mode on a cart
   */
  quickBuySetDeliveryMode?: string | CoreOccEndpoint;
  /**
   * Endpoint for getting the selected delivery mode on a cart
   */
  quickBuySelectedDeliveryMode?: string | CoreOccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends OccOpfQuickBuyCartEndpoints {}
}
