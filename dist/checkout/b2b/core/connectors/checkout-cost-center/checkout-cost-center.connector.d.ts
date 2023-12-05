import { Cart } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { CheckoutCostCenterAdapter } from './checkout-cost-center.adapter';
import * as i0 from "@angular/core";
export declare class CheckoutCostCenterConnector {
    protected adapter: CheckoutCostCenterAdapter;
    constructor(adapter: CheckoutCostCenterAdapter);
    setCostCenter(userId: string, cartId: string, costCenterId: string): Observable<Cart>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutCostCenterConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutCostCenterConnector>;
}
