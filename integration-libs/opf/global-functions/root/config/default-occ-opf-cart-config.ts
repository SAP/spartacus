/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartOccEndpoints } from '@spartacus/cart/base/occ';
import { OccConfig } from '@spartacus/core';

const opfCartEndpoints: CartOccEndpoints = {
  cart: 'users/${userId}/carts/${cartId}?fields=DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),totalUnitCount,deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),user,saveTime,name,description,deliveryAddress(FULL),deliveryMode(FULL),paymentInfo(FULL),sapBillingAddress(FULL)',
};

export const defaultOccOpfCartConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...opfCartEndpoints,
      },
    },
  },
};
