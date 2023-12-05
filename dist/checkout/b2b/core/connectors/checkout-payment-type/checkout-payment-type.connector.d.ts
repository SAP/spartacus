import { PaymentType } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { CheckoutPaymentTypeAdapter } from './checkout-payment-type.adapter';
import * as i0 from "@angular/core";
export declare class CheckoutPaymentTypeConnector {
    protected adapter: CheckoutPaymentTypeAdapter;
    constructor(adapter: CheckoutPaymentTypeAdapter);
    getPaymentTypes(): Observable<PaymentType[]>;
    setPaymentType(userId: string, cartId: string, typeCode: string, purchaseOrderNumber?: string): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutPaymentTypeConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutPaymentTypeConnector>;
}
