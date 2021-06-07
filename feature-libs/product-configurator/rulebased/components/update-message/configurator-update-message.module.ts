import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  Config,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { DefaultMessageConfig } from '../config/default-message-config';
import { MessageConfig } from '../config/message-config';
import { ConfiguratorUpdateMessageComponent } from './configurator-update-message.component';

@NgModule({
  imports: [CommonModule, SpinnerModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorUpdateMessage: {
          component: ConfiguratorUpdateMessageComponent,
        },
      },
    }),
    provideDefaultConfig(DefaultMessageConfig),
    { provide: MessageConfig, useExisting: Config },
  ],
  declarations: [ConfiguratorUpdateMessageComponent],
  exports: [ConfiguratorUpdateMessageComponent],
})
export class ConfiguratorUpdateMessageModule {}
