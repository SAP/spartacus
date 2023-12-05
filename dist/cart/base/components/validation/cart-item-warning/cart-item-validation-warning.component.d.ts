import { CartValidationFacade } from '@spartacus/cart/base/root';
import { ICON_TYPE } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export declare class CartItemValidationWarningComponent {
    protected cartValidationFacade: CartValidationFacade;
    code: string;
    iconTypes: typeof ICON_TYPE;
    isVisible: boolean;
    cartModification$: import("rxjs").Observable<import("@spartacus/cart/base/root").CartModification | undefined>;
    constructor(cartValidationFacade: CartValidationFacade);
    static ɵfac: i0.ɵɵFactoryDeclaration<CartItemValidationWarningComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CartItemValidationWarningComponent, "cx-cart-item-validation-warning", never, { "code": "code"; }, {}, never, never, false, never>;
}
