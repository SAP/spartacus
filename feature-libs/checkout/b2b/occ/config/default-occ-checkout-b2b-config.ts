/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// We need these imports for augmentation of OccEndpoints to be picked up
import { CheckoutOccEndpoints } from '@spartacus/checkout/base/occ';
import { OccConfig } from '@spartacus/core';

const defaultB2bCheckoutDetailsOccEndpoint: CheckoutOccEndpoints = {
  getCheckoutDetails:
    'users/${userId}/carts/${cartId}?fields=deliveryAddress(FULL),deliveryMode(FULL),paymentInfo(FULL),costCenter(FULL),purchaseOrderNumber,paymentType(FULL)',
};

export const defaultOccCheckoutB2BConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...defaultB2bCheckoutDetailsOccEndpoint,
        setDeliveryAddress:
          'orgUsers/${userId}/carts/${cartId}/addresses/delivery',
        paymentTypes: 'paymenttypes',
        setCartCostCenter: 'users/${userId}/carts/${cartId}/costcenter',
        setCartPaymentType: 'users/${userId}/carts/${cartId}/paymenttype',
      },
    },
  },
};
