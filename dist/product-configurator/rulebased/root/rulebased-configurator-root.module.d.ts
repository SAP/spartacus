import { ModuleWithProviders } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@spartacus/product-configurator/common";
import * as i3 from "./rulebased-configurator-root-feature.module";
import * as i4 from "./variant/variant-configurator-interactive.module";
import * as i5 from "./variant/variant-configurator-overview.module";
import * as i6 from "./rulebased-configurator-routing.module";
/**
 * Exposes the root modules that we need to load statically. Contains page mappings, route configurations
 * and feature configuration
 */
export declare class RulebasedConfiguratorRootModule {
    static forRoot(): ModuleWithProviders<RulebasedConfiguratorRootModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RulebasedConfiguratorRootModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RulebasedConfiguratorRootModule, never, [typeof i1.CommonModule, typeof i2.CommonConfiguratorModule, typeof i3.RulebasedConfiguratorRootFeatureModule, typeof i4.VariantConfiguratorInteractiveModule, typeof i5.VariantConfiguratorOverviewModule, typeof i6.RulebasedConfiguratorRoutingModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RulebasedConfiguratorRootModule>;
}
