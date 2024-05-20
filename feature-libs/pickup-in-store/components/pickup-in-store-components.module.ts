/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideDefaultConfig } from '@spartacus/core';
import { OutletModule } from '@spartacus/storefront';
import {
  CartPickupOptionsContainerModule,
  defaultPickupOptionsDialogLayoutConfig,
  MyPreferredStoreModule,
  OrderConsignmentContainerModule,
  PdpPickupOptionsContainerModule,
  PickupInfoContainerModule,
} from './container/index';

import { PickUpItemsDetailsModule } from './container/pickup-items-details';
@NgModule({
  imports: [
    ReactiveFormsModule,
    PickupInfoContainerModule,
    MyPreferredStoreModule,
    PickUpItemsDetailsModule,
    PdpPickupOptionsContainerModule,
    OutletModule.forChild(),
    CartPickupOptionsContainerModule,
    OrderConsignmentContainerModule,
  ],
  providers: [provideDefaultConfig(defaultPickupOptionsDialogLayoutConfig)],
})
export class PickupInStoreComponentsModule {}
