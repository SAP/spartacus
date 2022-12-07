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
        name: 'opf.checkoutTabs.shipping',
        routeName: 'checkoutDeliveryAddress',
        type: [CheckoutStepType.DELIVERY_ADDRESS],
        nameMultiLine: false,
      },
      {
        id: 'deliveryMode',
        name: 'opf.checkoutTabs.deliveryMethod',
        routeName: 'checkoutDeliveryMode',
        type: [CheckoutStepType.DELIVERY_MODE],
        nameMultiLine: false,
      },
      {
        id: 'reviewOrder',
        name: 'opf.checkoutTabs.paymentAndReview',
        routeName: 'checkoutReviewOrder',
        // TODO: (OPF) provide proper step type (PAYMENT_REVIEW) once augmenting problem is solved
        type: [CheckoutStepType.REVIEW_ORDER],
        nameMultiLine: false,
      },
    ],
  },
};
