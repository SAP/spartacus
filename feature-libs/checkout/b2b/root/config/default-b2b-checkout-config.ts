/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CheckoutConfig,
  CheckoutStepType,
  DeliveryModePreferences,
} from '@spartacus/checkout/base/root';

export const defaultB2BCheckoutConfig: CheckoutConfig = {
  checkout: {
    steps: [
      {
        id: 'paymentType',
        name: 'checkoutB2B.progress.methodOfPayment',
        routeName: 'checkoutPaymentType',
        type: [CheckoutStepType.PAYMENT_TYPE],
      },
      {
        id: 'deliveryAddress',
        name: 'checkoutProgress.deliveryAddress',
        routeName: 'checkoutDeliveryAddress',
        type: [CheckoutStepType.DELIVERY_ADDRESS],
      },
      {
        id: 'deliveryMode',
        name: 'checkoutProgress.deliveryMode',
        routeName: 'checkoutDeliveryMode',
        type: [CheckoutStepType.DELIVERY_MODE],
      },
      {
        id: 'paymentDetails',
        name: 'checkoutProgress.paymentDetails',
        routeName: 'checkoutPaymentDetails',
        type: [CheckoutStepType.PAYMENT_DETAILS],
      },
      {
        id: 'reviewOrder',
        name: 'checkoutProgress.reviewOrder',
        routeName: 'checkoutReviewOrder',
        type: [CheckoutStepType.REVIEW_ORDER],
      },
    ],
    express: false,
    defaultDeliveryMode: [DeliveryModePreferences.FREE],
    guest: false,
  },
};
