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
import { ConfiguratorConflictAndErrorMessages } from './configurator-conflict-and-error-messages.component';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, I18nModule, IconModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CpqConfiguratorConflictAndErrorMessages: {
          component: ConfiguratorConflictAndErrorMessages,
        },
      },
    }),
  ],

  declarations: [ConfiguratorConflictAndErrorMessages],
  entryComponents: [ConfiguratorConflictAndErrorMessages],
  exports: [ConfiguratorConflictAndErrorMessages],
})
export class ConfiguratorConflictAndErrorMessagesModule {}
