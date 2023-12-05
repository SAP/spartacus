import { RoutingConfig } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export declare function defaultQuickOrderComponentsConfig(): {
    featureModules: {
        cartQuickOrder: {
            cmsComponents: string[];
        };
        cartQuickOrderCore: string;
    };
};
export declare const defaultQuickOrderRoutingConfig: RoutingConfig;
export declare class QuickOrderRootModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<QuickOrderRootModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<QuickOrderRootModule, never, [typeof i1.RouterModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<QuickOrderRootModule>;
}
