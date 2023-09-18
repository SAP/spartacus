/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/checkout/b2b/root';
import {
  CheckoutConfig,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';

export const defaultB2BOPFCheckoutConfig: CheckoutConfig = {
  checkout: {
    flows: {
      'b2b-spa-opf': {
        steps: [
          {
            id: 'paymentType',
            name: 'checkoutB2B.progress.methodOfPayment',
            routeName: 'checkoutPaymentType',
            type: [CheckoutStepType.PAYMENT_TYPE],
          },
          {
            id: 'deliveryAddress',
            name: 'opf.checkout.tabs.shipping',
            routeName: 'checkoutDeliveryAddress',
            type: [CheckoutStepType.DELIVERY_ADDRESS],
          },
          {
            id: 'deliveryMode',
            name: 'opf.checkout.tabs.deliveryMethod',
            routeName: 'checkoutDeliveryMode',
            type: [CheckoutStepType.DELIVERY_MODE],
          },
          {
            id: 'reviewOrder',
            name: 'opf.checkout.tabs.paymentAndReview',
            routeName: 'checkoutReviewOrder',
            // TODO OPF: provide proper step type (PAYMENT_REVIEW) once augmenting problem is solved
            type: [CheckoutStepType.REVIEW_ORDER],
          },
        ],
      },
    },
  },
};
