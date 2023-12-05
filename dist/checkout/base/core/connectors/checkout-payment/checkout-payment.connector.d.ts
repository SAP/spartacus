import { CardType, PaymentDetails } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { CheckoutPaymentAdapter } from './checkout-payment.adapter';
import * as i0 from "@angular/core";
export declare class CheckoutPaymentConnector {
    protected adapter: CheckoutPaymentAdapter;
    constructor(adapter: CheckoutPaymentAdapter);
    createPaymentDetails(userId: string, cartId: string, paymentDetails: PaymentDetails): Observable<PaymentDetails>;
    setPaymentDetails(userId: string, cartId: string, paymentDetailsId: string): Observable<unknown>;
    getPaymentCardTypes(): Observable<CardType[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutPaymentConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutPaymentConnector>;
}
