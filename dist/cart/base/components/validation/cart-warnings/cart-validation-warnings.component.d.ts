import { CartModification, CartValidationFacade } from '@spartacus/cart/base/root';
import { ICON_TYPE } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export declare class CartValidationWarningsComponent {
    protected cartValidationFacade: CartValidationFacade;
    iconTypes: typeof ICON_TYPE;
    visibleWarnings: Record<string, boolean>;
    cartModifications$: import("rxjs").Observable<CartModification[]>;
    constructor(cartValidationFacade: CartValidationFacade);
    removeMessage(cartModification: CartModification): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartValidationWarningsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CartValidationWarningsComponent, "cx-cart-validation-warnings", never, {}, {}, never, never, false, never>;
}
