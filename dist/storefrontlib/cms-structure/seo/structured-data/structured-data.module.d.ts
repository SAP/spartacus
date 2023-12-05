import { Injector } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./json-ld.directive";
import * as i2 from "@angular/common";
/**
 * Factory to build the structure data
 * without any interaction with the UI.
 */
export declare function getStructuredDataFactory(injector: Injector): () => void;
export declare class StructuredDataModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<StructuredDataModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<StructuredDataModule, [typeof i1.JsonLdDirective], [typeof i2.CommonModule], [typeof i1.JsonLdDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<StructuredDataModule>;
}
