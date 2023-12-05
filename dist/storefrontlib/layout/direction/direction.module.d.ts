import { FeatureConfigService } from '@spartacus/core';
import { DirectionService } from './direction.service';
import * as i0 from "@angular/core";
export declare function initHtmlDirAttribute(directionService: DirectionService, featureConfigService: FeatureConfigService): () => void;
/**
 * Provides a configuration and APP_INITIALIZER to add the correct (language drive) html direction.
 */
export declare class DirectionModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<DirectionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DirectionModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DirectionModule>;
}
