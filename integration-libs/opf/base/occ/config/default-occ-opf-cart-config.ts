/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

/**
 * The endpoints to call from the OCC adapter for stock levels.
 */
export const defaultOccOpfCartConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        generateOtpKey: 'users/${userId}/carts/${cartId}/accessCode',
        setCartBillingAddress:
          'users/${userId}/carts/${cartId}/addresses/billing',
        setCartDeliveryAddress:
          'users/${userId}/carts/${cartId}/addresses/delivery?addressId=${addressId}',
        cartDeliveryAddress:
          'users/${userId}/carts/${cartId}/addresses/delivery',
        cartDeliveryModes: 'users/${userId}/carts/${cartId}/deliverymodes',
        setCartDeliveryMode:
          'users/${userId}/carts/${cartId}/deliverymode?deliveryModeId=${deliveryModeId}',
        cartDeliveryMode: 'users/${userId}/carts/${cartId}/deliverymode',
      },
    },
  },
};
