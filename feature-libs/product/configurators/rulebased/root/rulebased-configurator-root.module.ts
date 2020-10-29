import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RulebasedConfiguratorRootFeatureModule } from './rulebased-configurator-root-feature.module';
import { VariantConfiguratorInteractiveModule } from './variant/variant-configurator-interactive.module';
import { VariantConfiguratorOverviewModule } from './variant/variant-configurator-overview.module';

/**
 * Exposes the root modules that we need to load statically. Contains page mappings and feature configuration
 */
@NgModule({
  imports: [
    CommonModule,
    RulebasedConfiguratorRootFeatureModule,
    VariantConfiguratorInteractiveModule,
    VariantConfiguratorOverviewModule,
  ],
})
export class RulebasedConfiguratorRootModule {
  static forRoot(): ModuleWithProviders<RulebasedConfiguratorRootModule> {
    return {
      ngModule: RulebasedConfiguratorRootModule,
    };
  }
}
