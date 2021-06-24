// We need this import for augmentation of OccEndpoints to pick up
import { CheckoutOccEndpoints } from '@spartacus/checkout/occ';
import { OccConfig } from '@spartacus/core';

const defaultB2bCheckoutOccEndpoints: CheckoutOccEndpoints = {
  setDeliveryAddress: 'orgUsers/${userId}/carts/${cartId}/addresses/delivery',
  placeOrder: 'orgUsers/${userId}/orders?fields=FULL',
};

export const defaultB2bOccConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...defaultB2bCheckoutOccEndpoints,
        user: 'orgUsers/${userId}',
        userUpdateProfile: 'users/${userId}',
        userCloseAccount: 'users/${userId}',
        addEntries:
          'orgUsers/${userId}/carts/${cartId}/entries?quantity=${quantity}',
        scheduleReplenishmentOrder:
          'orgUsers/${userId}/replenishmentOrders?fields=FULL,costCenter(FULL),purchaseOrderNumber,paymentType',
        replenishmentOrderDetails:
          'users/${userId}/replenishmentOrders/${replenishmentOrderCode}?fields=FULL,costCenter(FULL),purchaseOrderNumber,paymentType,user',
        replenishmentOrderDetailsHistory:
          'users/${userId}/replenishmentOrders/${replenishmentOrderCode}/orders',
        cancelReplenishmentOrder:
          'users/${userId}/replenishmentOrders/${replenishmentOrderCode}?fields=FULL,costCenter(FULL),purchaseOrderNumber,paymentType,user',
        replenishmentOrderHistory:
          'users/${userId}/replenishmentOrders?fields=FULL,replenishmentOrders(FULL, purchaseOrderNumber)',
      },
    },
  },
};
