import { CheckoutStep } from '../model/checkout-step.model';

export enum DeliveryModePreferences {
  FREE = 'FREE',
  LEAST_EXPENSIVE = 'LEAST_EXPENSIVE', // but not free
  MOST_EXPENSIVE = 'MOST_EXPENSIVE',
}

export abstract class CheckoutConfig {
  checkout?: {
    steps: Array<CheckoutStep>;
    /**
     * Allow for express checkout when default shipping method and payment method are available.
     */
    express?: boolean;
    /**
     * Pre-selected delivery mode. Allowed value is an array of DeliveryModePreferences or delivery codes.
     */
    defaultDeliveryMode?: Array<DeliveryModePreferences | string>;
  };
}
