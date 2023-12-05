import { CardType, PaymentDetails } from '@spartacus/cart/base/root';
import { QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare abstract class CheckoutPaymentFacade {
    /**
     * Returns the card types state
     */
    abstract getPaymentCardTypesState(): Observable<QueryState<CardType[] | undefined>>;
    /**
     * Returns the card types, or an empty array if the data is undefined.
     */
    abstract getPaymentCardTypes(): Observable<CardType[]>;
    /**
     * Returns the payment details state
     */
    abstract getPaymentDetailsState(): Observable<QueryState<PaymentDetails | undefined>>;
    /**
     * Creates the payment details using the provided paymentDetails
     */
    abstract createPaymentDetails(paymentDetails: PaymentDetails): Observable<unknown>;
    /**
     * Sets the payment details to the current cart
     */
    abstract setPaymentDetails(paymentDetails: PaymentDetails): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutPaymentFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutPaymentFacade>;
}
