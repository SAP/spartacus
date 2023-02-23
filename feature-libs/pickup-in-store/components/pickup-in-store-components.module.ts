/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideDefaultConfig } from '@spartacus/core';
import {
  CartPickupOptionsContainerModule,
  defaultPickupOptionsDialogLayoutConfig,
  MyPreferredStoreModule,
  PdpPickupOptionsContainerModule,
  PickupInfoContainerModule,
} from './container/index';
import { PickUpItemsDetailsModule } from './container/pickup-items-details';
@NgModule({
  imports: [
    ReactiveFormsModule,
    CartPickupOptionsContainerModule,
    PdpPickupOptionsContainerModule,
    PickupInfoContainerModule,
    MyPreferredStoreModule,
    PickUpItemsDetailsModule,
  ],
  providers: [provideDefaultConfig(defaultPickupOptionsDialogLayoutConfig)],
})
export class PickupInStoreComponentsModule {}
