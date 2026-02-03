/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import '../model/occ-opf-gift-card-endpoints.model';

import { CartOccEndpoints } from '@spartacus/cart/base/occ';
import { OccConfig } from '@spartacus/core';

const giftCardCartEndpoints: CartOccEndpoints = {
  //unComment when raising the PR
  // carts:
  //   'users/${userId}/carts?fields=carts(DEFAULT,_availableOperations,sapGiftCards(FULL),sapGiftCardSummary(FULL),potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),arrivalSlots,basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),totalUnitCount,deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),user,saveTime,name,description)',
  // cart: 'users/${userId}/carts/${cartId}?fields=DEFAULT,_availableOperations,sapGiftCards(FULL),sapGiftCardSummary(FULL),potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),arrivalSlots,basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),totalUnitCount,deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),user,saveTime,name,description',
  // createCart:
  //   'users/${userId}/carts?fields=DEFAULT,_availableOperations,sapGiftCards(FULL),sapGiftCardSummary(FULL),potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),arrivalSlots,basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),totalUnitCount,deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),user',
};

export const defaultGiftCardCartOccEndpointsConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...giftCardCartEndpoints,
        applyGiftCard: 'users/${userId}/carts/${cartId}/giftcards',

        removeGiftCard:
          'users/${userId}/carts/${cartId}/giftcards/${giftCardId}',
      },
    },
  },
};
