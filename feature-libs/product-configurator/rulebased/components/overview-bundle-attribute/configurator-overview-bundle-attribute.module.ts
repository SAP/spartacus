import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { ConfiguratorPriceModule } from '../../components/price/index';
import { ConfiguratorOverviewBundleAttributeComponent } from './configurator-overview-bundle-attribute.component';

@NgModule({
  imports: [CommonModule, MediaModule, I18nModule, ConfiguratorPriceModule],
  declarations: [ConfiguratorOverviewBundleAttributeComponent],
  exports: [ConfiguratorOverviewBundleAttributeComponent],
  entryComponents: [ConfiguratorOverviewBundleAttributeComponent],
})
export class ConfiguratorOverviewBundleAttributeModule {}
