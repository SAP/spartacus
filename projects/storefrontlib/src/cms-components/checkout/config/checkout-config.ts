import { CheckoutStep } from '../model/checkout-step.model';
import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

export enum DeliveryModePreferences {
  FREE = 'FREE',
  LEAST_EXPENSIVE = 'LEAST_EXPENSIVE', // but not free
  MOST_EXPENSIVE = 'MOST_EXPENSIVE',
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
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
  };
}
