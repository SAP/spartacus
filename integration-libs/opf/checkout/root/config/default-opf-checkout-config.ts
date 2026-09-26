/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
    nameMultiLine: true,
  },
  {
    id: 'deliveryMode',
    name: 'opfCheckout.tabs.deliveryMethod',
    routeName: 'checkoutDeliveryMode',
    type: [CheckoutStepType.DELIVERY_MODE],
    nameMultiLine: true,
  },
  {
    id: 'opfPaymentAndReview',
    name: 'opfCheckout.tabs.paymentAndReview',
    routeName: 'opfCheckoutPaymentAndReview',
    type: [CheckoutStepType.PAYMENT_DETAILS],
    nameMultiLine: true,
  },
];

export const defaultOpfCheckoutConfig: CheckoutConfig = {
  checkout: {
    flows: {
      OPF: {
        steps: opfCheckoutSteps,
        guest: true,
      },
    },
  },
};
