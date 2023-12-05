import { ModuleWithProviders } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./adapters/cms/cms-occ.module";
import * as i2 from "./adapters/site-context/site-context-occ.module";
export declare class BaseOccModule {
    static forRoot(): ModuleWithProviders<BaseOccModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseOccModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BaseOccModule, never, [typeof i1.CmsOccModule, typeof i2.SiteContextOccModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BaseOccModule>;
}
