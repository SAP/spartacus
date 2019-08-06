import { CheckoutStep } from '../model/checkout-step.model';

export enum DeliveryModePreferences {
  FREE = 'FREE',
  LEAST_EXPENSIVE = 'LEAST_EXPENSIVE',
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
     * Pre-selected delivery mode. Allowed value is contained in enum DeliveryModePreferences, delivery code, or array of codes / DeliveryModePreferences.
     */
    defaultDeliveryMode?:
      | DeliveryModePreferences
      | string
      | Array<DeliveryModePreferences | string>;
  };
}
