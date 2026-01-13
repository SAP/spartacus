/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';

export const defaultOpfCheckoutRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      opfCheckoutPaymentType: {
        paths: ['checkout/opf-payment-type'],
      },
      opfCheckoutDeliveryAddress: {
        paths: ['checkout/opf-delivery-address'],
      },
      opfCheckoutPaymentAndReview: {
        paths: ['checkout/opf-payment-and-review'],
      },
      opfCheckoutReview: {
        paths: ['checkout/opf-review'],
      },
      opfCheckoutEmail: {
        paths: ['opf-checkout-email'],
      },
    },
  },
};
