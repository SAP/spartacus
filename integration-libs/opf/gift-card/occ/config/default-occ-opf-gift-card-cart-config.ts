/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import '../model/occ-opf-gift-card-endpoints.model';

import { CartOccEndpoints } from '@spartacus/cart/base/occ';
import { OccConfig } from '@spartacus/core';

const giftCardCartEndpoints: CartOccEndpoints = {
  carts:
    'users/${userId}/carts?fields=carts(DEFAULT,sapGiftCards(FULL,balance(value,formattedValue),remainingBalance(value,formattedValue), appliedAmount(value,formattedValue)),sapGiftCardSummary(FULL,totalAppliedAmount(value,formattedValue),totalRemainingBalance(value,formattedValue), totalBalance(value,formattedValue)),potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),totalUnitCount,deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),user,saveTime,name,description,_availableOperations)',
  cart: 'users/${userId}/carts/${cartId}?fields=DEFAULT,sapGiftCards(FULL,balance(value,formattedValue),remainingBalance(value,formattedValue), appliedAmount(value,formattedValue)),sapGiftCardSummary(FULL,totalAppliedAmount(value,formattedValue),totalRemainingBalance(value,formattedValue), totalBalance(value,formattedValue)),potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),totalUnitCount,deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),user,saveTime,name,description,_availableOperations',
};

export const defaultGiftCardCartOccEndpointsConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...giftCardCartEndpoints,
        applyGiftCard: 'users/${userId}/carts/${cartId}/giftCards',
        removeGiftCard:
          'users/${userId}/carts/${cartId}/giftCards/${giftCardId}',
      },
    },
  },
};
