import { CheckoutStep } from '../model/checkout-step.model';

export enum DeliveryModePreferences {
  FREE = 'FREE',
  LEAST_EXPENSIVE = 'LEAST_EXPENSIVE', // but not free
  MOST_EXPENSIVE = 'MOST_EXPENSIVE',
}

export abstract class CheckoutGroup {
    /**
     * Set checkout group Id
     */
    groupId?: string;
    /**
     * Set checkout steps within the group as ordered array of pages.
     */
    steps?: Array<CheckoutStep>;
}

export abstract class CheckoutConfig {
  checkout?: {
    /**
     * @deprecated groups configuration instead
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
     * Configures available checkout groups
     */
    groups?: Array<CheckoutGroup>;
  };
}
