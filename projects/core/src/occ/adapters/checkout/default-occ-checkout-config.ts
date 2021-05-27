import { OccConfig } from '../../config/occ-config';

export const defaultOccCheckoutConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        cardTypes: 'cardtypes',
        paymentTypes: 'paymenttypes',
        /* eslint-disable max-len */
        deliveryAddresses: 'users/${userId}/carts/${cartId}/addresses/delivery',
        deliveryMode: 'users/${userId}/carts/${cartId}/deliverymode',
        deliveryModes: 'users/${userId}/carts/${cartId}/deliverymodes',
        placeOrder: 'users/${userId}/orders?fields=FULL',
        cartCostCenter:
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
