/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint to generate OTP for specified cart id.
     */
    generateOtpKey?: string | OccEndpoint;
    /**
     * Creates or updates the billing address of the cart.
     */
    setCartBillingAddress?: string | OccEndpoint;
    /**
     * Sets specific address id as an address for the cart.
     */
    setCartDeliveryAddress?: string | OccEndpoint;
    /**
     * Creates or updates a delivery address for the cart.
     */
    cartDeliveryAddress?: string | OccEndpoint;
    /**
     * Retrieves the delivery modes for the current store and delivery address.
     */
    cartDeliveryModes?: string | OccEndpoint;
    /**
     * Sets the delivery mode id for the specific cart.
     */
    setCartDeliveryMode?: string | OccEndpoint;
    /**
     * Retrieves the delivery mode for the cart.
     */
    cartDeliveryMode?: string | OccEndpoint;
  }
}
