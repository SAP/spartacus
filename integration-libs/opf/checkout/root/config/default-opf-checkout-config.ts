/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
    name: 'opf.checkout.tabs.shipping',
    routeName: 'checkoutDeliveryAddress',
    type: [CheckoutStepType.DELIVERY_ADDRESS],
    nameMultiLine: false,
  },
  {
    id: 'deliveryMode',
    name: 'opf.checkout.tabs.deliveryMethod',
    routeName: 'checkoutDeliveryMode',
    type: [CheckoutStepType.DELIVERY_MODE],
    nameMultiLine: false,
  },
  {
    id: 'opfReviewOrder',
    name: 'opf.checkout.tabs.paymentAndReview',
    routeName: 'opfCheckoutPaymentAndReview',
    // TODO OPF: provide proper step type (PAYMENT_REVIEW) once augmenting problem is solved
    type: [CheckoutStepType.PAYMENT_TYPE],
    nameMultiLine: false,
  },
];

export const defaultOpfCheckoutConfig: CheckoutConfig = {
  checkout: {
    flows: {
      'spa-opf': {
        steps: opfCheckoutSteps,
        guest: false,
      },
      'spa-opf-guest': {
        steps: opfCheckoutSteps,
        guest: true,
      },
    },
  },
};
