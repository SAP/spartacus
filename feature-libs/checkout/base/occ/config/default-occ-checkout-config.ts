/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccCheckoutConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        setDeliveryAddress:
          'users/${userId}/carts/${cartId}/addresses/delivery',
        cardTypes: 'cardtypes',
        createDeliveryAddress:
          'users/${userId}/carts/${cartId}/addresses/delivery',
        removeDeliveryAddress:
          'users/${userId}/carts/${cartId}/addresses/delivery',
        deliveryMode: 'users/${userId}/carts/${cartId}/deliverymode',
        setDeliveryMode: 'users/${userId}/carts/${cartId}/deliverymode',
        clearDeliveryMode: 'users/${userId}/carts/${cartId}/deliverymode',
        deliveryModes: 'users/${userId}/carts/${cartId}/deliverymodes',
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
