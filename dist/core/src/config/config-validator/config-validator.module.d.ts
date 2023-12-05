import { ModuleWithProviders } from '@angular/core';
import { ConfigInitializerService } from '../config-initializer/config-initializer.service';
import { ConfigValidator } from './config-validator';
import * as i0 from "@angular/core";
export declare function configValidatorFactory(configInitializer: ConfigInitializerService, validators: ConfigValidator[]): () => void;
/**
 * Should stay private in 1.x
 * as forRoot() is used internally by ConfigInitializerModule
 *
 * issue: #5279
 */
export declare class ConfigValidatorModule {
    static forRoot(): ModuleWithProviders<ConfigValidatorModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigValidatorModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ConfigValidatorModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ConfigValidatorModule>;
}
