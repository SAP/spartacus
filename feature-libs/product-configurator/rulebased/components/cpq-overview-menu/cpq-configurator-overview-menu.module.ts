/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorOverviewMenuModule } from '../overview-menu/configurator-overview-menu.module';
import { CpqConfiguratorOverviewMenuComponent } from './cpq-configurator-overview-menu.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfiguratorOverviewMenuModule,
    CpqConfiguratorOverviewMenuComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CpqConfiguratorOverviewMenu: {
          component: CpqConfiguratorOverviewMenuComponent,
        },
      },
    }),
  ],
  exports: [CpqConfiguratorOverviewMenuComponent],
})
export class CpqConfiguratorOverviewMenuModule {}
