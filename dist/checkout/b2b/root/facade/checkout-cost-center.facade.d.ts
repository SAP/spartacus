import { Cart } from '@spartacus/cart/base/root';
import { CostCenter, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare abstract class CheckoutCostCenterFacade {
    /**
     * Set cost center to cart
     * @param costCenterId : cost center id
     */
    abstract setCostCenter(costCenterId: string): Observable<Cart>;
    /**
     * Get cost center id from cart
     */
    abstract getCostCenterState(): Observable<QueryState<CostCenter | undefined>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutCostCenterFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutCostCenterFacade>;
}
