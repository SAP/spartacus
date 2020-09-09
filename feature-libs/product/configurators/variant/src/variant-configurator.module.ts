import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { InteractiveConfiguratorModule } from './interactive-configurator.module';
import { OverviewConfiguratorModule } from './overview-configurator.module';

/**
 * Exposes the variant configurator
 */
@NgModule({
  imports: [
    CommonModule,
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
