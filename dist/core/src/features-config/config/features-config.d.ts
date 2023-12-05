import * as i0 from "@angular/core";
export declare abstract class FeaturesConfig {
    features?: {
        level?: string;
        [featureToggle: string]: string | boolean | undefined;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<FeaturesConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FeaturesConfig>;
}
declare module '../../config/config-tokens' {
    interface Config extends FeaturesConfig {
    }
}
