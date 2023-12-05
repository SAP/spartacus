import { ModuleWithProviders } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./directives/feature-level.directive";
import * as i2 from "./directives/feature.directive";
export declare class FeaturesConfigModule {
    static forRoot(defaultLevel?: string): ModuleWithProviders<FeaturesConfigModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FeaturesConfigModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<FeaturesConfigModule, [typeof i1.FeatureLevelDirective, typeof i2.FeatureDirective], never, [typeof i1.FeatureLevelDirective, typeof i2.FeatureDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<FeaturesConfigModule>;
}
