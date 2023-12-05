import { CheckoutState } from '@spartacus/checkout/base/root';
import { Observable } from 'rxjs';
import { CheckoutAdapter } from './checkout.adapter';
import * as i0 from "@angular/core";
export declare class CheckoutConnector {
    protected adapter: CheckoutAdapter;
    constructor(adapter: CheckoutAdapter);
    getCheckoutDetails(userId: string, cartId: string): Observable<CheckoutState>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutConnector>;
}
