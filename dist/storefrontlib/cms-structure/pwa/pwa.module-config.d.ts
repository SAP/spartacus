import * as i0 from "@angular/core";
export declare abstract class PWAModuleConfig {
    pwa?: {
        enabled?: boolean;
        addToHomeScreen?: boolean;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<PWAModuleConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PWAModuleConfig>;
}
export declare const defaultPWAModuleConfig: PWAModuleConfig;
declare module '@spartacus/core' {
    interface Config extends PWAModuleConfig {
    }
}
