import * as i0 from "@angular/core";
export declare abstract class ViewConfig {
    view?: {
        /**
         * Configurations related to the view of the application
         */
        defaultPageSize?: number;
        infiniteScroll?: {
            active?: boolean;
            productLimit?: number;
            showMoreButton?: boolean;
        };
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ViewConfig>;
}
declare module '@spartacus/core' {
    interface Config extends ViewConfig {
    }
}
