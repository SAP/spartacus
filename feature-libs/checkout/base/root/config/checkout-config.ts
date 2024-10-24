/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { CheckoutFlow } from '../model/checkout-flow.model';
import { CheckoutStep } from '../model/checkout-step.model';

export enum DeliveryModePreferences {
  FREE = 'FREE',
  LEAST_EXPENSIVE = 'LEAST_EXPENSIVE', // but not free
  MOST_EXPENSIVE = 'MOST_EXPENSIVE',
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CheckoutConfig {
  checkout?: {
    /**
     * Set checkout steps as ordered array of pages.
     */
    steps?: Array<CheckoutStep>;
    /**
     * Allow for express checkout when default shipping method and payment method are available.
     */
    express?: boolean;
    /**
     * Default delivery mode for i.a. express checkout. Set preferences in order with general preferences (eg. DeliveryModePreferences.LEAST_EXPENSIVE) or specific delivery codes.
     */
    defaultDeliveryMode?: Array<DeliveryModePreferences | string>;
    /**
     * Allow for guest checkout.
     */
    guest?: boolean;
    /**
     * Use delivery address saved in cart for pre-filling delivery address form.
     */
    guestUseSavedAddress?: boolean;
    /**
     * Determine multiple flows that can be used during the checkout process.
     */
    flows?: {
      [key: string]: CheckoutFlow;
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends CheckoutConfig {}
}
