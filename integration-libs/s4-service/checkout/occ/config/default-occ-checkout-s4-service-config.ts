/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckoutOccEndpoints } from '@spartacus/checkout/base/occ';
import { OccConfig } from '@spartacus/core';

const defaultServiceOrderCheckoutDetailsOccEndpoint: CheckoutOccEndpoints = {
  getCheckoutDetails:
    'users/${userId}/carts/${cartId}?fields=deliveryAddress(FULL),deliveryMode(FULL),paymentInfo(FULL),costCenter(FULL),purchaseOrderNumber,paymentType(FULL),servicedAt',
};

export const defaultOccCheckoutServiceOrderConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...defaultServiceOrderCheckoutDetailsOccEndpoint,
        setServiceScheduleSlot:
          'users/${userId}/carts/${cartId}/serviceOrder/serviceScheduleSlot',
      },
    },
  },
};
