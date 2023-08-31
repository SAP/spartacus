/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ChatMessagingModule, IconModule } from '@spartacus/storefront';
import { ConfiguratorChatComponent } from './configurator-chat.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, ChatMessagingModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorChat: {
          component: ConfiguratorChatComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorChatComponent],
  exports: [ConfiguratorChatComponent],
})
export class ConfiguratorChatModule {}
