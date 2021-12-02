import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { ConfiguratorPriceModule } from '../price/configurator-price.module';
import { ConfiguratorOverviewAttributeComponent } from './configurator-overview-attribute.component';

@NgModule({
  imports: [CommonModule, I18nModule, ConfiguratorPriceModule],
  declarations: [ConfiguratorOverviewAttributeComponent],
  exports: [ConfiguratorOverviewAttributeComponent],
})
export class ConfiguratorOverviewAttributeModule {}
