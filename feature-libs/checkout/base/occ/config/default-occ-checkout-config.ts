/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

const DELIVERY_ENDPOINT = 'users/${userId}/carts/${cartId}/addresses/delivery';
const DELIVERY_MODE_ENDPOINT = 'users/${userId}/carts/${cartId}/deliverymode';

export const defaultOccCheckoutConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        setDeliveryAddress: DELIVERY_ENDPOINT,
        cardTypes: 'cardtypes',
        createDeliveryAddress: DELIVERY_ENDPOINT,
        removeDeliveryAddress: DELIVERY_ENDPOINT,
        deliveryMode: DELIVERY_MODE_ENDPOINT,
        setDeliveryMode: DELIVERY_MODE_ENDPOINT,
        clearDeliveryMode: DELIVERY_MODE_ENDPOINT,
        deliveryModes: `${DELIVERY_MODE_ENDPOINT}s`,
        setCartPaymentDetails: 'users/${userId}/carts/${cartId}/paymentdetails',
        paymentProviderSubInfo:
          'users/${userId}/carts/${cartId}/payment/sop/request?responseUrl=sampleUrl',
        createPaymentDetails:
          'users/${userId}/carts/${cartId}/payment/sop/response',
        getCheckoutDetails:
          'users/${userId}/carts/${cartId}?fields=deliveryAddress(FULL),deliveryMode(FULL),paymentInfo(FULL)',
      },
    },
  },
};
