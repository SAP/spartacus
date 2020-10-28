import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RulebasedConfiguratorRootFeatureModule } from './rulebased-configurator-root-feature.module';
import { VariantInteractiveConfiguratorModule } from './variant/variant-interactive-configurator.module';
import { VariantOverviewConfiguratorModule } from './variant/variant-overview-configurator.module';

/**
 * Exposes the root modules that we need to statically load. Contain page mappings
 */
@NgModule({
  imports: [
    CommonModule,
    RulebasedConfiguratorRootFeatureModule,
    VariantInteractiveConfiguratorModule,
    VariantOverviewConfiguratorModule,
  ],
})
export class RulebasedConfiguratorRootModule {
  static forRoot(): ModuleWithProviders<RulebasedConfiguratorRootModule> {
    return {
      ngModule: RulebasedConfiguratorRootModule,
    };
  }
}
