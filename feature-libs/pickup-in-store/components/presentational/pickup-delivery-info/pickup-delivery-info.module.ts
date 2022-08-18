/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { StoreModule } from '../store/store.module';
import { PickupDeliveryInfoComponent } from './pickup-delivery-info.component';

@NgModule({
  imports: [CommonModule, I18nModule, StoreModule],
  declarations: [PickupDeliveryInfoComponent],
  exports: [PickupDeliveryInfoComponent],
})
export class PickupDeliveryInfoModule {}
