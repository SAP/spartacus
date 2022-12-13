/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { CardModule, IconModule, MediaModule } from '@spartacus/storefront';
import { StoreModule } from '../../presentational/store';
import { PickUpInStoreDetailsComponent } from './pickup-in-store-details.component';
@NgModule({
  imports: [
    CardModule,
    StoreModule,
    CommonModule,
    MediaModule,
    I18nModule,
    IconModule,
    ConfigModule.withConfig({
      cmsComponents: {
        PickupInStoreDetails: {
          component: PickUpInStoreDetailsComponent,
        },
      },
    } as CmsConfig),
  ],
  exports: [PickUpInStoreDetailsComponent],
  declarations: [PickUpInStoreDetailsComponent],
})
export class PickupInStoreDetailsModule {}
