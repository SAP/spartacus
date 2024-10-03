/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { CardModule, IconModule } from '@spartacus/storefront';
import { StoreModule } from '../../presentational/store';
import { MyPreferredStoreComponent } from './my-preferred-store.component';
@NgModule({
  imports: [
    CardModule,
    StoreModule,
    CommonModule,
    I18nModule,
    IconModule,
    ConfigModule.withConfig({
      cmsComponents: {
        MyPreferredStoreComponent: {
          component: MyPreferredStoreComponent,
        },
      },
    } as CmsConfig),
  ],
  exports: [MyPreferredStoreComponent],
  declarations: [MyPreferredStoreComponent],
})
export class MyPreferredStoreModule {}
