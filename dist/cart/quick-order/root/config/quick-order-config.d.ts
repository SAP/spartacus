import * as i0 from "@angular/core";
export declare abstract class QuickOrderConfig {
    quickOrder?: {
        searchForm?: {
            displayProductImages: boolean;
            maxProducts: number;
            minCharactersBeforeRequest: number;
        };
        list?: {
            hardDeleteTimeout: number;
        };
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<QuickOrderConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<QuickOrderConfig>;
}
declare module '@spartacus/core' {
    interface Config extends QuickOrderConfig {
    }
}
