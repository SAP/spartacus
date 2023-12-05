import { ModuleWithProviders } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./services/organization-page-meta.module";
import * as i2 from "./store/organization-store.module";
import * as i3 from "./guards/organization-guards.module";
export declare class AdministrationCoreModule {
    static forRoot(): ModuleWithProviders<AdministrationCoreModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AdministrationCoreModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AdministrationCoreModule, never, [typeof i1.OrganizationPageMetaModule, typeof i2.OrganizationStoreModule, typeof i3.OrganizationsGuardsModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AdministrationCoreModule>;
}
