/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CheckoutConfig,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';

export const defaultOPFCheckoutConfig: CheckoutConfig = {
  checkout: {
    steps: [
      {
        id: 'deliveryAddress',
        name: 'opfCheckoutProgress.shipping',
        routeName: 'checkoutDeliveryAddress',
        type: [CheckoutStepType.DELIVERY_ADDRESS],
        nameMultiLine: false,
      },
      {
        id: 'deliveryMode',
        name: 'opfCheckoutProgress.deliveryMethod',
        routeName: 'checkoutDeliveryMode',
        type: [CheckoutStepType.DELIVERY_MODE],
        nameMultiLine: false,
      },
      {
        id: 'reviewOrder',
        name: 'opfCheckoutProgress.paymentAndReview',
        routeName: 'paymentAndReview',
        type: [CheckoutStepType.PAYMENT_REVIEW],
        nameMultiLine: false,
      },
    ],
  },
};
