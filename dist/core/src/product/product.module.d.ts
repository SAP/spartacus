import { ModuleWithProviders } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./store/product-store.module";
import * as i2 from "./event/product-event.module";
export declare class ProductModule {
    static forRoot(): ModuleWithProviders<ProductModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ProductModule, never, [typeof i1.ProductStoreModule, typeof i2.ProductEventModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ProductModule>;
}
