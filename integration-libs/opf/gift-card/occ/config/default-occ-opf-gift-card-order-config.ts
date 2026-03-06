import { OccConfig } from '@spartacus/core';
import { OrderOccEndpoints } from '@spartacus/order/occ';

const giftCardOrderEndpoints: OrderOccEndpoints = {
  orderDetail: 'users/${userId}/orders/${orderId}?fields=FULL,sapGiftCardSummary(FULL,totalAppliedAmount(value,formattedValue),totalRemainingBalance(value,formattedValue),totalBalance(value,formattedValue))',
  placePaymentAuthorizedOrder: 'users/${userId}/orders/paymentAuthorizedOrderPlacement?fields=FULL,sapGiftCardSummary(FULL,totalAppliedAmount(value,formattedValue),totalRemainingBalance(value,formattedValue),totalBalance(value,formattedValue))',
};

export const defaultOccOpfGiftCardOrderEndpointsConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...giftCardOrderEndpoints,
      },
    },
  },
};