import { NgModule } from '@angular/core';
import { VariantConfiguratorComponentsModule } from './components/variant-configurator-components.module';
import { VariantConfiguratorCoreModule } from './core/variant-configurator-core.module';

@NgModule({
  imports: [VariantConfiguratorCoreModule, VariantConfiguratorComponentsModule],
})
export class VariantConfiguratorModule {}
