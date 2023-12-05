import { CartActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class MultiCartEffectsService {
    /**
     * Verifies if cart is the active cart or saved cart and returns the appropriate cart type
     * @param action
     * @returns cart type
     */
    getActiveCartTypeOnLoadSuccess(action: CartActions.LoadCartSuccess): CartActions.SetCartTypeIndex | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiCartEffectsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MultiCartEffectsService>;
}
