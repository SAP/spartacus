import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Config, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ItemCounterModule } from '@spartacus/storefront';
import {
  ConfiguratorUISettings,
  DefaultConfiguratorUISettings,
} from '../../config';
import { ConfiguratorAttributeQuantityComponent } from './configurator-attribute-quantity.component';

@NgModule({
  declarations: [ConfiguratorAttributeQuantityComponent],
  entryComponents: [ConfiguratorAttributeQuantityComponent],
  exports: [ConfiguratorAttributeQuantityComponent],
  imports: [CommonModule, I18nModule, ItemCounterModule],
  providers: [
    provideDefaultConfig(DefaultConfiguratorUISettings),
    { provide: ConfiguratorUISettings, useExisting: Config },
  ],
})
export class ConfiguratorAttributeQuantityModule {}
