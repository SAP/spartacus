import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { VariantConfiguratorCoreModule } from './core/variant-configurator-core.module';
import { InteractiveConfiguratorModule } from './interactive-configurator.module';
import { VariantConfiguratorOccModule } from './occ/variant-configurator-occ.module';
import { OverviewConfiguratorModule } from './overview-configurator.module';

/**
 * Exposes the variant configurator
 */
@NgModule({
  imports: [
    CommonModule,
    VariantConfiguratorCoreModule,
    VariantConfiguratorOccModule,
    InteractiveConfiguratorModule,
    OverviewConfiguratorModule,
  ],
})
export class VariantConfiguratorModule {
  static forRoot(): ModuleWithProviders<VariantConfiguratorModule> {
    return {
      ngModule: VariantConfiguratorModule,
    };
  }
}
