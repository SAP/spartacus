/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckoutStepType } from '../model/checkout-step.model';
import { CheckoutConfig, DeliveryModePreferences } from './checkout-config';

/**
 * TODO: Verify this change before the final review,
 * as it could potentially be considered as a breaking change.
 * This modification was made for testing purposes
 * to allow switching between flows on the epic/opf branch.
 */
export const defaultCheckoutConfig: CheckoutConfig = {
  checkout: {
    flows: {
      mockup: {
        steps: [
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
    },
  },
};
