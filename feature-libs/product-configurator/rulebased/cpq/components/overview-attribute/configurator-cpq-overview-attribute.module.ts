import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { ConfiguratorCPQOverviewAttributeComponent } from './configurator-cpq-overview-attribute.component';

@NgModule({
  imports: [CommonModule, MediaModule, I18nModule],
  declarations: [ConfiguratorCPQOverviewAttributeComponent],
  exports: [ConfiguratorCPQOverviewAttributeComponent],
  entryComponents: [ConfiguratorCPQOverviewAttributeComponent],
})
export class ConfiguratorCPQOverviewAttributeModule {}
