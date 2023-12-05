import { CheckoutDeliveryAddressEventListener } from './checkout-delivery-address-event.listener';
import { CheckoutDeliveryModeEventListener } from './checkout-delivery-mode-event.listener';
import { CheckoutLegacyStoreEventListener } from './checkout-legacy-store-event.listener';
import { CheckoutPaymentEventListener } from './checkout-payment-event.listener';
import { CheckoutPlaceOrderEventListener } from './checkout-place-order-event.listener';
import { CheckoutQueryEventListener } from './checkout-query-event.listener';
import * as i0 from "@angular/core";
export declare class CheckoutEventModule {
    constructor(_checkoutQueryEventListener: CheckoutQueryEventListener, _checkoutDeliveryAddressEventListener: CheckoutDeliveryAddressEventListener, _checkoutDeliveryModeEventListener: CheckoutDeliveryModeEventListener, _checkoutPaymentEventListener: CheckoutPaymentEventListener, _checkoutPlaceOrderEventListener: CheckoutPlaceOrderEventListener, _checkoutLegacyStoreEventListener: CheckoutLegacyStoreEventListener);
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutEventModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CheckoutEventModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CheckoutEventModule>;
}
