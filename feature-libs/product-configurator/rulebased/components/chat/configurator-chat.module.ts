/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfiguratorChatComponent } from './configurator-chat.component';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorTabBar: {
          component: ConfiguratorChatComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorChatComponent],
  exports: [ConfiguratorChatComponent],
})
export class ConfiguratorChatModule {}
