import { CheckoutStep } from '../model/checkout-step.model';
import * as i0 from "@angular/core";
export declare enum DeliveryModePreferences {
    FREE = "FREE",
    LEAST_EXPENSIVE = "LEAST_EXPENSIVE",
    MOST_EXPENSIVE = "MOST_EXPENSIVE"
}
export declare abstract class CheckoutConfig {
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
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutConfig>;
}
declare module '@spartacus/core' {
    interface Config extends CheckoutConfig {
    }
}
