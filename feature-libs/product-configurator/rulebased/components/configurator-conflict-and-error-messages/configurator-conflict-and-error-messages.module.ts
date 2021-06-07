import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorConflictAndErrorMessagesComponent } from './configurator-conflict-and-error-messages.component';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, I18nModule, IconModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CpqConfiguratorConflictAndErrorMessagesComponent: {
          component: ConfiguratorConflictAndErrorMessagesComponent,
        },
      },
    }),
  ],

  declarations: [ConfiguratorConflictAndErrorMessagesComponent],
  exports: [ConfiguratorConflictAndErrorMessagesComponent],
})
export class ConfiguratorConflictAndErrorMessagesModule {}
