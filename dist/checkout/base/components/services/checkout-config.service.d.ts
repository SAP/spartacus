import { DeliveryMode } from '@spartacus/cart/base/root';
import { CheckoutConfig } from '@spartacus/checkout/base/root';
import * as i0 from "@angular/core";
export declare class CheckoutConfigService {
    private checkoutConfig;
    private express;
    private guest;
    private defaultDeliveryMode;
    constructor(checkoutConfig: CheckoutConfig);
    protected compareDeliveryCost(deliveryMode1: DeliveryMode, deliveryMode2: DeliveryMode): number;
    protected findMatchingDeliveryMode(deliveryModes: DeliveryMode[], index?: number): string | undefined;
    shouldUseAddressSavedInCart(): boolean;
    getPreferredDeliveryMode(deliveryModes: DeliveryMode[]): string | undefined;
    isExpressCheckout(): boolean;
    isGuestCheckout(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutConfigService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutConfigService>;
}
