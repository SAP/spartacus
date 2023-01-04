/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule, SpinnerModule } from '@spartacus/storefront';
import { StoreScheduleComponent } from './store-schedule/index';
import { StoreAddressComponent } from './store-address/index';
import { StoreComponent } from './store.component';
import { SetPreferredStoreModule } from '../../container/set-preferred-store/set-preferred-store.module';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    SpinnerModule,
    SetPreferredStoreModule,
  ],
  exports: [StoreComponent, StoreScheduleComponent, StoreAddressComponent],
  declarations: [StoreComponent, StoreScheduleComponent, StoreAddressComponent],
})
export class StoreModule {}
