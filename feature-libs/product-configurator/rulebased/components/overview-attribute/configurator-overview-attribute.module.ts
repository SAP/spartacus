import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfiguratorOverviewAttributeComponent } from './configurator-overview-attribute.component';
import { ConfiguratorPriceModule } from '../price/configurator-price.module';

@NgModule({
  imports: [CommonModule, ConfiguratorPriceModule],
  declarations: [ConfiguratorOverviewAttributeComponent],
  exports: [ConfiguratorOverviewAttributeComponent],
})
export class ConfiguratorOverviewAttributeModule {}
