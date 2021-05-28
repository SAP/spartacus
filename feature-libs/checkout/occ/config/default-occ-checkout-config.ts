import { OccConfig } from '@spartacus/core';

export const defaultOccCheckoutConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        /* eslint-disable max-len */
        setDeliveryAddress:
          'users/${userId}/carts/${cartId}/addresses/delivery',
        placeOrder: 'users/${userId}/orders?fields=FULL',
        cardTypes: 'cardtypes',
        paymentTypes: 'paymenttypes',
        deliveryAddresses: 'users/${userId}/carts/${cartId}/addresses/delivery',
        deliveryMode: 'users/${userId}/carts/${cartId}/deliverymode',
        deliveryModes: 'users/${userId}/carts/${cartId}/deliverymodes',
        setCartCostCenter:
          'users/${userId}/carts/${cartId}/costcenter?fields=DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),user',
        cartPaymentType:
          'users/${userId}/carts/${cartId}/paymenttype?fields=DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),user',
        cartPaymentDetails: 'users/${userId}/carts/${cartId}/paymentdetails',
        paymentProviderRequest:
          'users/${userId}/carts/${cartId}/payment/sop/request?responseUrl=sampleUrl',
        paymentProviderResponse:
          'users/${userId}/carts/${cartId}/payment/sop/response',
        loadCheckoutDetails:
          'users/${userId}/carts/${cartId}?fields=deliveryAddress(FULL),deliveryMode,paymentInfo(FULL)',
        /* eslint-enable */
      },
    },
  },
};
