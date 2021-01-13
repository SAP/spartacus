import { CommonModule } from '@angular/common';
import { ConfiguratorAttributeQuantityComponent } from './configurator-attribute-quantity.component';
import { I18nModule } from '@spartacus/core';
import { ItemCounterModule } from '@spartacus/storefront';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ConfiguratorAttributeQuantityComponent],
  entryComponents: [ConfiguratorAttributeQuantityComponent],
  exports: [ConfiguratorAttributeQuantityComponent],
  imports: [CommonModule, I18nModule, ItemCounterModule],
})
export class ConfiguratorAttributeQuantityModule {}
