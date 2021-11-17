import { OccConfig } from '@spartacus/core';

export const defaultOccSavedCartConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        savedCarts:
          '/users/${userId}/carts?savedCartsOnly=true&fields=carts(DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),saveTime,user,name,description)',
        saveCart:
          '/users/${userId}/carts/${cartId}/save?saveCartName=${saveCartName}&saveCartDescription=${saveCartDescription}',
        savedCart: '/users/${userId}/carts/${cartId}/savedcart',
        restoreSavedCart: '/users/${userId}/carts/${cartId}/restoresavedcart',
        cloneSavedCart:
          '/users/${userId}/carts/${cartId}/clonesavedcart?name=${saveCartName}',
      },
    },
  },
};
