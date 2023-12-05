import { ModuleWithProviders } from '@angular/core';
import { TmsService } from './services/tms.service';
import * as i0 from "@angular/core";
/**
 * The factory that conditionally (based on the configuration) starts collecting events
 */
export declare function tmsFactory(service: TmsService): () => void;
export declare class BaseTmsModule {
    static forRoot(): ModuleWithProviders<BaseTmsModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseTmsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BaseTmsModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BaseTmsModule>;
}
