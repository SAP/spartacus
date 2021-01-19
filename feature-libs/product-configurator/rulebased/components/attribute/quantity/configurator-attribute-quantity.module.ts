import { CommonModule } from '@angular/common';
import { ConfiguratorAttributeQuantityComponent } from './configurator-attribute-quantity.component';
import {
  DefaultQuantityConfig,
  QuantityConfig,
} from '../../config/quantity-config';
import { Config, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ItemCounterModule } from '@spartacus/storefront';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ConfiguratorAttributeQuantityComponent],
  entryComponents: [ConfiguratorAttributeQuantityComponent],
  exports: [ConfiguratorAttributeQuantityComponent],
  imports: [CommonModule, I18nModule, ItemCounterModule],
  providers: [
    provideDefaultConfig(DefaultQuantityConfig),
    { provide: QuantityConfig, useExisting: Config },
  ],
})
export class ConfiguratorAttributeQuantityModule {}
