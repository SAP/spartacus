import { CartConfig } from '@spartacus/cart/base/root';
import * as i0 from "@angular/core";
export declare class CartConfigService {
    protected config: CartConfig;
    constructor(config: CartConfig);
    isSelectiveCartEnabled(): boolean;
    isCartValidationEnabled(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartConfigService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartConfigService>;
}
