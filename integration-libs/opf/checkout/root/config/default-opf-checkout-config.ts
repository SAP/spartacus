/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CheckoutConfig,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';

const opfCheckoutSteps = [
  {
    id: 'deliveryAddress',
    name: 'opfCheckout.tabs.shipping',
    routeName: 'checkoutDeliveryAddress',
    type: [CheckoutStepType.DELIVERY_ADDRESS],
    nameMultiLine: false,
  },
  {
    id: 'deliveryMode',
    name: 'opfCheckout.tabs.deliveryMethod',
    routeName: 'checkoutDeliveryMode',
    type: [CheckoutStepType.DELIVERY_MODE],
    nameMultiLine: false,
  },
  {
    id: 'opfReviewOrder',
    name: 'opfCheckout.tabs.paymentAndReview',
    routeName: 'opfCheckoutPaymentAndReview',
    // TODO OPF: provide proper step type (PAYMENT_REVIEW) once augmenting problem is solved
    type: [CheckoutStepType.PAYMENT_TYPE],
    nameMultiLine: false,
  },
];

export const defaultOpfCheckoutConfig: CheckoutConfig = {
  checkout: {
    flows: {
      OPF: {
        steps: opfCheckoutSteps,
        guest: false,
      },
      'OPF-guest': {
        steps: opfCheckoutSteps,
        guest: true,
      },
    },
  },
};
