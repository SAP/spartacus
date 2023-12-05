import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CheckoutReviewOverviewComponent {
    protected activeCartFacade: ActiveCartFacade;
    constructor(activeCartFacade: ActiveCartFacade);
    get cart$(): Observable<Cart>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutReviewOverviewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckoutReviewOverviewComponent, "cx-checkout-review-overview", never, {}, {}, never, never, false, never>;
}
