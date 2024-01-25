/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';

export const defaultCheckoutRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      checkoutLogin: { paths: ['checkout-login'], authFlow: true },
      checkout: { paths: ['checkout'] },
      checkoutDeliveryAddress: { paths: ['checkout/delivery-address'] },
      checkoutDeliveryMode: { paths: ['checkout/delivery-mode'] },
      checkoutPaymentDetails: { paths: ['checkout/payment-details'] },
      checkoutReviewOrder: { paths: ['checkout/review-order'] },
    },
  },
};
