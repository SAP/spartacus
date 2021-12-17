import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Config, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { ConfiguratorMessageConfig } from '../config/configurator-message.config';
import { defaultConfiguratorMessageConfig } from '../config/default-configurator-message.config';
import { ConfiguratorUpdateMessageComponent } from './configurator-update-message.component';

@NgModule({
  imports: [CommonModule, SpinnerModule, I18nModule],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        ConfiguratorUpdateMessage: {
          component: ConfiguratorUpdateMessageComponent,
        },
      },
    }),
    provideDefaultConfig(defaultConfiguratorMessageConfig),
    { provide: ConfiguratorMessageConfig, useExisting: Config },
  ],
  declarations: [ConfiguratorUpdateMessageComponent],
  exports: [ConfiguratorUpdateMessageComponent],
})
export class ConfiguratorUpdateMessageModule {}
