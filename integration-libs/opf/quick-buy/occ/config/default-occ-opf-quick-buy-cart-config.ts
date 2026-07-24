/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccOpfQuickBuyCartConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        quickBuyCreateDeliveryAddress:
          'users/${userId}/carts/${cartId}/addresses/delivery',
        quickBuySetBillingAddress:
          'users/${userId}/carts/${cartId}/addresses/billing',
        quickBuyDeliveryModes: 'users/${userId}/carts/${cartId}/deliverymodes',
        quickBuySetDeliveryMode: 'users/${userId}/carts/${cartId}/deliverymode',
        quickBuySelectedDeliveryMode:
          'users/${userId}/carts/${cartId}?fields=deliveryMode(FULL)',
      },
    },
  },
};
