import { DeliveryMode } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { CheckoutDeliveryModesAdapter } from './checkout-delivery-modes.adapter';
import * as i0 from "@angular/core";
export declare class CheckoutDeliveryModesConnector {
    protected adapter: CheckoutDeliveryModesAdapter;
    constructor(adapter: CheckoutDeliveryModesAdapter);
    setMode(userId: string, cartId: string, deliveryModeId: string): Observable<unknown>;
    getSupportedModes(userId: string, cartId: string): Observable<DeliveryMode[]>;
    clearCheckoutDeliveryMode(userId: string, cartId: string): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutDeliveryModesConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutDeliveryModesConnector>;
}
