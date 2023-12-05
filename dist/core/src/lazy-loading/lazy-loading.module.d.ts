import { ModuleWithProviders } from '@angular/core';
import { LazyModulesService } from './lazy-modules.service';
import * as i0 from "@angular/core";
export declare function moduleInitializersFactory(lazyModuleService: LazyModulesService, moduleInitializerFunctions: (() => any)[]): () => any;
export declare class LazyLoadingModule {
    static forRoot(): ModuleWithProviders<LazyLoadingModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<LazyLoadingModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<LazyLoadingModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<LazyLoadingModule>;
}
