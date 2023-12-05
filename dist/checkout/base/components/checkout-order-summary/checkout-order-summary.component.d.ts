import { ActiveCartFacade, Cart, CartOutlets } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CheckoutOrderSummaryComponent {
    protected activeCartFacade: ActiveCartFacade;
    cart$: Observable<Cart>;
    readonly cartOutlets: typeof CartOutlets;
    constructor(activeCartFacade: ActiveCartFacade);
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutOrderSummaryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckoutOrderSummaryComponent, "cx-checkout-order-summary", never, {}, {}, never, never, false, never>;
}
