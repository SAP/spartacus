import * as i0 from "@angular/core";
import * as i1 from "./events/cart-base-event.module";
import * as i2 from "@angular/router";
export declare function defaultCartComponentsConfig(): {
    featureModules: {
        cartBase: {
            cmsComponents: string[];
        };
        miniCart: {
            cmsComponents: string[];
        };
        addToCart: {
            cmsComponents: string[];
        };
        cartBaseCore: string;
    };
};
export declare class CartBaseRootModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CartBaseRootModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CartBaseRootModule, never, [typeof i1.CartBaseEventModule, typeof i2.RouterModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CartBaseRootModule>;
}
