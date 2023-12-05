import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./cpq-configurator-layout.module";
/**
 * Takes care of the configuration overview that visualizes the attribute value assignments that have been done already in a condensed, read-only form.
 * The end-user can switch between the interactive view and this overview.
 * Provides routing, assignment of ng components to CMS components and assignment of CMS components to the layout slots.
 * Some of the ng components on this view (tab bar, price summary and addToCart button) are shared between the interactive view and the overview.
 */
export declare class CpqConfiguratorOverviewModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CpqConfiguratorOverviewModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CpqConfiguratorOverviewModule, never, [typeof i1.RouterModule, typeof i2.CpqConfiguratorLayoutModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CpqConfiguratorOverviewModule>;
}
