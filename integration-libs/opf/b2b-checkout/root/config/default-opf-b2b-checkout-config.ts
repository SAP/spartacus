/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/checkout/b2b/root';
import {
  CheckoutConfig,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';

const opfB2bCheckoutSteps = [
  {
    id: 'opfPaymentType',
    name: 'opfCheckout.tabs.paymentType',
    routeName: 'opfCheckoutPaymentType',
    type: [CheckoutStepType.PAYMENT_TYPE],
  },
  {
    id: 'opfDeliveryAddress',
    name: 'opfCheckout.tabs.shipping',
    routeName: 'opfCheckoutDeliveryAddress',
    type: [CheckoutStepType.DELIVERY_ADDRESS],
  },
  {
    id: 'deliveryMode',
    name: 'opfCheckout.tabs.deliveryMethod',
    routeName: 'checkoutDeliveryMode',
    type: [CheckoutStepType.DELIVERY_MODE],
  },
  {
    id: 'opfPaymentAndReview',
    name: 'opfCheckout.tabs.paymentAndReview',
    routeName: 'opfCheckoutPaymentAndReview',
    type: [CheckoutStepType.PAYMENT_DETAILS],
  },
  {
    id: 'opfReview',
    name: 'opfCheckout.tabs.review',
    routeName: 'opfCheckoutReview',
    type: [CheckoutStepType.REVIEW_ORDER],
  },
];

export const defaultOpfB2bCheckoutConfig: CheckoutConfig = {
  checkout: {
    flows: {
      OPF: {
        steps: opfB2bCheckoutSteps,
        guest: false,
      },
    },
  },
};
