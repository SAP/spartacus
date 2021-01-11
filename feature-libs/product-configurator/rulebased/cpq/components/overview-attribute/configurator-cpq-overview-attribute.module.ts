import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MediaModule } from '@spartacus/storefront';
import { ConfiguratorCPQOverviewAttributeComponent } from './configurator-cpq-overview-attribute.component';

@NgModule({
  imports: [CommonModule, MediaModule],
  declarations: [ConfiguratorCPQOverviewAttributeComponent],
  exports: [ConfiguratorCPQOverviewAttributeComponent],
  entryComponents: [ConfiguratorCPQOverviewAttributeComponent],
})
export class ConfiguratorCPQOverviewAttributeModule {}
