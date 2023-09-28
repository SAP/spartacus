/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
     *
     * @deprecated since 6.6
     * Use a checkout flow approach instead.
     */
    steps?: Array<CheckoutStep>;
    /**
     * Allow for express checkout when default shipping method and payment method are available.
     *
     * @deprecated since 6.6
     * Use a checkout flow approach instead.
     */
    express?: boolean;
    /**
     * Default delivery mode for i.a. express checkout. Set preferences in order with general preferences (eg. DeliveryModePreferences.LEAST_EXPENSIVE) or specific delivery codes.
     *
     * @deprecated since 6.6
     * Use a checkout flow approach instead.
     */
    defaultDeliveryMode?: Array<DeliveryModePreferences | string>;
    /**
     * Allow for guest checkout.
     *
     * @deprecated since 6.6
     * Use a checkout flow approach instead.
     */
    guest?: boolean;
    /**
     * Use delivery address saved in cart for pre-filling delivery address form.
     *
     * @deprecated since 6.6
     * Use a checkout flow approach instead.
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
