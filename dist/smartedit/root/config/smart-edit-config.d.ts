import * as i0 from "@angular/core";
export declare abstract class SmartEditConfig {
    smartEdit?: {
        storefrontPreviewRoute?: string;
        allowOrigin?: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<SmartEditConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SmartEditConfig>;
}
declare module '@spartacus/core' {
    interface Config extends SmartEditConfig {
    }
}
