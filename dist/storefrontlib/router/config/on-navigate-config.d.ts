import * as i0 from "@angular/core";
export declare abstract class OnNavigateConfig {
    enableResetViewOnNavigate?: {
        active?: boolean;
        ignoreQueryString?: boolean;
        ignoreRoutes?: string[];
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<OnNavigateConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OnNavigateConfig>;
}
declare module '@spartacus/core' {
    interface Config extends OnNavigateConfig {
    }
}
