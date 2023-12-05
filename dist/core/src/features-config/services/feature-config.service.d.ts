import { FeaturesConfig } from '../config/features-config';
import * as i0 from "@angular/core";
export declare class FeatureConfigService {
    protected config: FeaturesConfig;
    constructor(config: FeaturesConfig);
    isLevel(version: string): boolean;
    isEnabled(feature: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<FeatureConfigService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FeatureConfigService>;
}
