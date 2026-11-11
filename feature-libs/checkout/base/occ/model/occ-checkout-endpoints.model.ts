/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

export interface CheckoutOccEndpoints {
  /**
   * Endpoint for set delivery address to cart
   */
  setDeliveryAddress?: string | CoreOccEndpoint;
  /**
   * Get a list of supported payment card types.
   */
  cardTypes?: string | CoreOccEndpoint;
  /**
   * Sets credit card payment details for the cart.
   */
  setCartPaymentDetails?: string | CoreOccEndpoint;
  /**
   *  Get information needed for create subscription
   */
  paymentProviderSubInfo?: string | CoreOccEndpoint;
  /**
   * Handles response from payment provider and create payment details
   */
  createPaymentDetails?: string | CoreOccEndpoint;
  /**
   * Get checkout details
   */
  getCheckoutDetails?: string | CoreOccEndpoint;
  /**
   * Endpoint for create delivery address
   */
  createDeliveryAddress?: string | CoreOccEndpoint;
  /**
   * Endpoint for delete deliver address
   */
  removeDeliveryAddress?: string | CoreOccEndpoint;
  /**
   * Endpoint for get the delivery mode selected for the cart.
   */
  deliveryMode?: string | CoreOccEndpoint;
  /**
   * Endpoint for sets the delivery mode for a cart.
   */
  setDeliveryMode?: string | CoreOccEndpoint;
  /**
   * Endpoint for deletes the delivery mode from the cart.
   */
  clearDeliveryMode?: string | CoreOccEndpoint;
  /**
   *Endpoint for get all delivery modes for the current store and delivery address.
   */
  deliveryModes?: string | CoreOccEndpoint;
  /**
   * Endpoint for set billing address to cart
   */
  setBillingAddress?: string | CoreOccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends CheckoutOccEndpoints {}
}
