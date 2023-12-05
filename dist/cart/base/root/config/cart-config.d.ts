import '@spartacus/storefront';
import * as i0 from "@angular/core";
export declare abstract class CartConfig {
    cart?: {
        selectiveCart?: {
            enabled?: boolean;
        };
        validation?: {
            enabled?: boolean;
        };
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<CartConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartConfig>;
}
declare module '@spartacus/core' {
    interface Config extends CartConfig {
    }
}
