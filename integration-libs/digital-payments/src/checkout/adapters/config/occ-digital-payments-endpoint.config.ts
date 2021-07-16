import { OccConfig } from '@spartacus/core';
import { digitalPaymentsEndpoints } from './index';

const occDigitalPaymentsEndpoints: digitalPaymentsEndpoints = {
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
