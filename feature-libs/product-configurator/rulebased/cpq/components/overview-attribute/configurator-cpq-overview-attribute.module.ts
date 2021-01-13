import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { ConfiguratorOverviewPriceModule } from '../../../components/overview-price/index';
import { ConfiguratorCPQOverviewAttributeComponent } from './configurator-cpq-overview-attribute.component';

@NgModule({
  imports: [
    CommonModule,
    MediaModule,
    I18nModule,
    ConfiguratorOverviewPriceModule,
  ],
  declarations: [ConfiguratorCPQOverviewAttributeComponent],
  exports: [ConfiguratorCPQOverviewAttributeComponent],
  entryComponents: [ConfiguratorCPQOverviewAttributeComponent],
})
export class ConfiguratorCPQOverviewAttributeModule {}
