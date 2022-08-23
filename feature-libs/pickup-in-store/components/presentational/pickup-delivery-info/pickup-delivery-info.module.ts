/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { StoreModule } from '../store/store.module';
import { PickupDeliveryInfoComponent } from './pickup-delivery-info.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    StoreModule,
    MediaModule,
    UrlModule,
    RouterModule,
  ],
  declarations: [PickupDeliveryInfoComponent],
  exports: [PickupDeliveryInfoComponent],
})
export class PickupDeliveryInfoModule {}
