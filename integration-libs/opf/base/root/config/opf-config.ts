/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class OpfConfig {
  opf?: {
    opfBaseUrl?: string;
    commerceCloudPublicKey?: string;
    paymentOption?: {
      /**
       * The map of info message translation keys for specific payment configuration IDs
       * @example
       * ```ts
       * const opfConfig = {
       *   opf: {
       *     paymentInfoMessagesMap: {
       *       213: 'opfCheckout.payPalPaymentInfoMessage' // Message key for payment method ID 213
       *     }
       *   }
       * };
       * ```
       */
      paymentInfoMessagesMap?: Record<number, string>;
      /**
       * Enables the payment info message section within the payment options
       */
      enableInfoMessage?: boolean;
    };
    /**
     * Local PSP resource configuration for faster loading
     * @example
     * ```ts
     * const opfConfig = {
     *   opf: {
     *     localPspResources: {
     *       213: { // paymentOptionId for Adyen
     *         jsFiles: ['/assets/adyen-payment.js'],
     *         cssFiles: ['/assets/adyen-styles.css']
     *       },
     *       456: { // paymentOptionId for Stripe
     *         jsFiles: ['/assets/stripe-payment.js'],
     *         cssFiles: ['/assets/stripe-styles.css']
     *       }
     *     }
     *   }
     * };
     * ```
     */
    localPspResources?: Record<
      number,
      {
        jsFiles: string[];
        cssFiles: string[];
      }
    >;
  };
}

declare module '@spartacus/core' {
  interface Config extends OpfConfig {}
}
