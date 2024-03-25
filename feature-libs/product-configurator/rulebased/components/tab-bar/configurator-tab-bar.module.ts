/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorTabBarComponent } from './configurator-tab-bar.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    KeyboardFocusModule,
    NgSelectModule,
    CommonModule,
    I18nModule,
    UrlModule,
    RouterModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorTabBar: {
          component: ConfiguratorTabBarComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorTabBarComponent],
  exports: [ConfiguratorTabBarComponent],
})
export class ConfiguratorTabBarModule {}
