import { QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutState } from '../model/checkout-state.model';
import * as i0 from "@angular/core";
export declare abstract class CheckoutQueryFacade {
    /**
     * Returns the checkout details state.
     */
    abstract getCheckoutDetailsState(): Observable<QueryState<CheckoutState | undefined>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutQueryFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutQueryFacade>;
}
