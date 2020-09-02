import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { InteractiveConfigurationModule } from './interactive-configuration.module';
import { OverviewModule } from './overview.module';

/**
 * Exposes the variant configurator
 */
@NgModule({
  imports: [CommonModule, InteractiveConfigurationModule, OverviewModule],
})
export class VariantConfiguratorModule {
  static forRoot(): ModuleWithProviders<VariantConfiguratorModule> {
    return {
      ngModule: VariantConfiguratorModule,
    };
  }
}
