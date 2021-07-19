import { OccConfig } from '@spartacus/core';

export const defaultOccOrderConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        /* eslint-disable max-len */
        orderHistory: 'users/${userId}/orders',
        orderDetail: 'users/${userId}/orders/${orderId}?fields=FULL',
        consignmentTracking:
          'users/${userId}/orders/${orderCode}/consignments/${consignmentCode}/tracking',
        cancelOrder: 'users/${userId}/orders/${orderId}/cancellation',
        returnOrder:
          'users/${userId}/orderReturns?fields=BASIC,returnEntries(BASIC,refundAmount(formattedValue),orderEntry(basePrice(formattedValue),product(name,code,baseOptions,images(DEFAULT,galleryIndex)))),deliveryCost(formattedValue),totalPrice(formattedValue),subTotal(formattedValue)',
        orderReturns: 'users/${userId}/orderReturns?fields=BASIC',
        orderReturnDetail:
          'users/${userId}/orderReturns/${returnRequestCode}?fields=BASIC,returnEntries(BASIC,refundAmount(formattedValue),orderEntry(basePrice(formattedValue),product(name,code,baseOptions,images(DEFAULT,galleryIndex)))),deliveryCost(formattedValue),totalPrice(formattedValue),subTotal(formattedValue)',
        cancelReturn: 'users/${userId}/orderReturns/${returnRequestCode}',
        /* eslint-enable */
      },
    },
  },
};
