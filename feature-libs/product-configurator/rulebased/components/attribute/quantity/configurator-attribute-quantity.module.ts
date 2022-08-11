import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ItemCounterModule, KeyboardFocusModule } from '@spartacus/storefront';
import { defaultConfiguratorUISettingsConfig } from '../../config/default-configurator-ui-settings.config';
import { ConfiguratorAttributeQuantityComponent } from './configurator-attribute-quantity.component';

@NgModule({
  declarations: [ConfiguratorAttributeQuantityComponent],
  exports: [ConfiguratorAttributeQuantityComponent],
  imports: [CommonModule, I18nModule, ItemCounterModule, KeyboardFocusModule],
  providers: [provideDefaultConfig(defaultConfiguratorUISettingsConfig)],
})
export class ConfiguratorAttributeQuantityModule {}
