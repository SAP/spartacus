/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

export interface OccOpfQuickBuyCartEndpoints {
  /**
   * Endpoint for creating a delivery address on a cart
   */
  quickBuyCreateDeliveryAddress?: string | OccEndpoint;
  /**
   * Endpoint for setting a billing address on a cart
   */
  quickBuySetBillingAddress?: string | OccEndpoint;
  /**
   * Endpoint for getting supported delivery modes for a cart
   */
  quickBuyDeliveryModes?: string | OccEndpoint;
  /**
   * Endpoint for setting a delivery mode on a cart
   */
  quickBuySetDeliveryMode?: string | OccEndpoint;
  /**
   * Endpoint for getting the selected delivery mode on a cart
   */
  quickBuySelectedDeliveryMode?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends OccOpfQuickBuyCartEndpoints {}
}
