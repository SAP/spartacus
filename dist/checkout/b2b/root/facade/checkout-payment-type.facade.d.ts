import { PaymentType } from '@spartacus/cart/base/root';
import { QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare abstract class CheckoutPaymentTypeFacade {
    /**
     * Get payment types state.
     */
    abstract getPaymentTypesState(): Observable<QueryState<PaymentType[] | undefined>>;
    /**
     * Get payment types.
     */
    abstract getPaymentTypes(): Observable<PaymentType[]>;
    /**
     * Set payment type to cart
     */
    abstract setPaymentType(paymentTypeCode: string, purchaseOrderNumber?: string): Observable<unknown>;
    /**
     * Get the selected payment type
     */
    abstract getSelectedPaymentTypeState(): Observable<QueryState<PaymentType | undefined>>;
    /**
     * Get whether the selected payment type is "ACCOUNT" payment
     */
    abstract isAccountPayment(): Observable<boolean>;
    /**
     * Get purchase order number
     */
    abstract getPurchaseOrderNumberState(): Observable<QueryState<string | undefined>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutPaymentTypeFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutPaymentTypeFacade>;
}
