/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

export interface OrderOccEndpoints {
  /**
   * Endpoint for the list of one user's orders
   *
   * @member {string}
   */
  orderHistory?: string | CoreOccEndpoint;
  /**
   * Endpoint for the details of one user's order
   *
   * @member {string}
   */
  orderDetail?: string | CoreOccEndpoint;
  /**
   * Endpoint for Quote Code associated with the Order. The Quote Code is present if the order was placed from a quote.
   *
   * @member {string}
   */
  quoteCode?: string | CoreOccEndpoint;
  /**
   * Endpoint for consignment tracking
   *
   * @member {string}
   */
  consignmentTracking?: string | CoreOccEndpoint;
  /**
   * Endpoint for cancel an order
   */
  cancelOrder?: string | CoreOccEndpoint;
  /**
   * Endpoint for creating order return request
   */
  returnOrder?: string | CoreOccEndpoint;
  /**
   * Endpoint for user's order return requests
   */
  orderReturns?: string | CoreOccEndpoint;
  /**
   * Endpoint for order return request details
   */
  orderReturnDetail?: string | CoreOccEndpoint;
  /**
   * Endpoint for cancelling return request
   */
  cancelReturn?: string | CoreOccEndpoint;
  /**
   * Endpoint for the list of one user's replenishment orders
   *
   * @member {string}
   */
  replenishmentOrderHistory?: string | CoreOccEndpoint;
  /**
   * Endpoint to get a replenishment order details
   *
   * @member {string}
   */
  replenishmentOrderDetails?: string | CoreOccEndpoint;
  /**
   * Endpoint to get a replenishment order history for a replenishment
   *
   * @member {string}
   */
  replenishmentOrderDetailsHistory?: string | CoreOccEndpoint;
  /**
   * Endpoint to get a replenishment order history for a replenishment
   *
   * @member {string}
   */
  cancelReplenishmentOrder?: string | CoreOccEndpoint;
  /**
   * Endpoint for place order
   */
  placeOrder?: string | CoreOccEndpoint;
  /**
   * Endpoint for place order after the payment authorization
   */
  placePaymentAuthorizedOrder?: string | CoreOccEndpoint;
  /**
   * Endpoint for scheduling a replenishment order
   */
  scheduleReplenishmentOrder?: string | CoreOccEndpoint;
  /**
   * Endpoint to create a new cart from an existing order
   */
  reorder?: string | CoreOccEndpoint;
  /**
   * Get order attachments
   */
  orderAttachments?: string | CoreOccEndpoint;
  /**
   * Download order attachment blob
   */
  downloadOrderAttachment?: string | CoreOccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends OrderOccEndpoints {}
}
