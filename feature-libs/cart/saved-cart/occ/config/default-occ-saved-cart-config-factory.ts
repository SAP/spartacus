/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export function defaultOccSavedCartConfigFactory(): OccConfig {
  return {
    backend: {
      occ: {
        endpoints: {
          savedCarts:
            '/users/${userId}/carts?savedCartsOnly=true&fields=carts(DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),totalUnitCount,deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),saveTime,user,name,description)',
          savedCart:
            '/users/${userId}/carts/${cartId}/savedcart?fields=DEFAULT,savedCartData(entryGroups(FULL))',
          restoreSavedCart: '/users/${userId}/carts/${cartId}/restoresavedcart',
          cloneSavedCart: '/users/${userId}/carts/${cartId}/clonesavedcart',
        },
      },
    },
  };
}
