/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  FeaturesConfigModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { ConfiguratorGroupTitleComponent } from './configurator-group-title.component';
import { HamburgerMenuModule } from '@spartacus/storefront';

@NgModule({
  imports: [CommonModule, FeaturesConfigModule, HamburgerMenuModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorGroupTitle: {
          component: ConfiguratorGroupTitleComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorGroupTitleComponent],
  exports: [ConfiguratorGroupTitleComponent],
})
export class ConfiguratorGroupTitleModule {}
