/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpfConfig } from './opf-config';

export const defaultOpfConfig: OpfConfig = {
  opf: {
    opfBaseUrl: '',
    paymentOption: {
      enableInfoMessage: true,
    },
    // Example local PSP resource configuration using paymentOptionId
    // localPspResources: {
    //   213: { // paymentOptionId for Adyen
    //     jsFiles: ['/assets/adyen-payment.js'],
    //     cssFiles: ['/assets/adyen-styles.css']
    //   },
    //   456: { // paymentOptionId for Stripe
    //     jsFiles: ['/assets/stripe-payment.js'],
    //     cssFiles: ['/assets/stripe-styles.css']
    //   }
    // }
  },
};
