import { OccConfig } from '../../config/occ-config';

export const defaultOccCartConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        /* eslint-disable max-len */
        carts:
          'users/${userId}/carts?fields=carts(DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),saveTime,user,name,entryGroups(entries,DEFAULT))',
        cart:
          'users/${userId}/carts/${cartId}?fields=DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),user,entryGroups(entries,DEFAULT)',
        createCart:
          'users/${userId}/carts?fields=DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),user,entryGroups(entries,DEFAULT)',
        addEntries: 'users/${userId}/carts/${cartId}/entries',
        updateEntries: 'users/${userId}/carts/${cartId}/entries/${entryNumber}',
        removeEntries: 'users/${userId}/carts/${cartId}/entries/${entryNumber}',
        addEmail: 'users/${userId}/carts/${cartId}/email',
        deleteCart: 'users/${userId}/carts/${cartId}',
        cartVoucher: 'users/${userId}/carts/${cartId}/vouchers',
        saveCart: 'users/${userId}/carts/${cartId}/save',
        addToEntryGroup:
          'users/${userId}/carts/${cartId}/entrygroups/${entryGroupNumber}',
        deleteEntryGroup:
          'users/${userId}/carts/${cartId}/entrygroups/${entryGroupNumber}',
        // TODO: startCheckout: ''
        /* eslint-enable */
      },
    },
  },
};
