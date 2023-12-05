import { ComponentFactory, ComponentFactoryResolver, ModuleWithProviders, Type } from '@angular/core';
import { ProvideOutletOptions } from './outlet.providers';
import { OutletService } from './outlet.service';
import * as i0 from "@angular/core";
import * as i1 from "./outlet.directive";
import * as i2 from "@angular/common";
/**
 * @private
 */
export declare function registerOutletsFactory(providedOutletOptions: ProvideOutletOptions[], componentFactoryResolver: ComponentFactoryResolver, outletService: OutletService<ComponentFactory<Type<any>>>): () => void;
export declare class OutletModule {
    static forRoot(): ModuleWithProviders<OutletModule>;
    static forChild(): ModuleWithProviders<OutletModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OutletModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<OutletModule, [typeof i1.OutletDirective], [typeof i2.CommonModule], [typeof i1.OutletDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<OutletModule>;
}
