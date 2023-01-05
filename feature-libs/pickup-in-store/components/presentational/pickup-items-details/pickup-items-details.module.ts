/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  CardModule,
  IconModule,
  MediaModule,
  OutletModule,
} from '@spartacus/storefront';
import { StoreModule } from '../store';
import { PickUpItemsDetailsComponent } from './pickup-items-details.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    UrlModule,
    IconModule,
    StoreModule,
    CardModule,
    MediaModule,
    OutletModule,
  ],
  declarations: [PickUpItemsDetailsComponent],
  exports: [PickUpItemsDetailsComponent],
})
export class PickUpItemsDetailsModule {}
