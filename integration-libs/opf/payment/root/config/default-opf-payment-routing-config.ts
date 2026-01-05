/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';

export const defaultOpfPaymentRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      paymentVerificationResult: {
        paths: ['opf/payment-verification-redirect/result'],
      },
      paymentVerificationCancel: {
        paths: ['opf/payment-verification-redirect/cancel'],
      },
    },
  },
};
