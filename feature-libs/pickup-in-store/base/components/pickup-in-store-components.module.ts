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
  CheckoutPickUpInStoreDetailsModule,
  defaultPickupOptionsDialogLayoutConfig,
  MyPreferredStoreModule,
  OrderConfirmationPickupInStoreModule,
  PdpPickupOptionsContainerModule,
  PickupInfoContainerModule,
  PickupInStoreDetailsReviewModule,
} from './container/index';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CartPickupOptionsContainerModule,
    PdpPickupOptionsContainerModule,
    PickupInfoContainerModule,
    MyPreferredStoreModule,
    CheckoutPickUpInStoreDetailsModule,
    PickupInStoreDetailsReviewModule,
    OrderConfirmationPickupInStoreModule,
  ],
  providers: [provideDefaultConfig(defaultPickupOptionsDialogLayoutConfig)],
})
export class PickupInStoreComponentsModule {}
