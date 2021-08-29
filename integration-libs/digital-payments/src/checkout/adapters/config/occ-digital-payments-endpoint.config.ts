import { OccConfig } from '@spartacus/core';
import { DigitalPaymentsOccEndpoints } from './index';

const occDigitalPaymentsEndpoints: DigitalPaymentsOccEndpoints = {
  paymentRequest:
    'users/${userId}/carts/${cartId}/payment/digitalPayments/request',
  paymentDetails:
    'users/${userId}/carts/${cartId}/payment/digitalPayments/response',
};
export const occDigitalPaymentsConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...occDigitalPaymentsEndpoints,
      },
    },
  },
};
