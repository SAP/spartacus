import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigurationComponentsModule } from './components/configuration-components.module';
import { ConfigurationCoreModule } from './core/configuration-core.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigurationComponentsModule,
    ConfigurationCoreModule,
  ],
})
export class ProductConfigurationModule {}
