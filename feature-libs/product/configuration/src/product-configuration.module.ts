import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigurationComponentsModule } from './components/configuration-components.module';
import { ConfigurationCoreModule } from './core/configuration-core.module';
import { VariantConfiguratorModule } from './variant-configurator/variant-configurator.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigurationComponentsModule,
    ConfigurationCoreModule,
    VariantConfiguratorModule,
  ],
})
export class ProductConfigurationModule {}
