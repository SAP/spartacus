/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideDefaultConfig } from '@spartacus/core';
import {
  CheckoutPickUpInStoreDetailsModule,
  defaultPickupOptionsDialogLayoutConfig,
  MyPreferredStoreModule,
  OrderConfirmationPickupInStoreModule,
  PickupInfoContainerModule,
  PickupInStoreDetailsReviewModule,
} from './container/index';

@NgModule({
  imports: [
    ReactiveFormsModule,
    PickupInfoContainerModule,
    MyPreferredStoreModule,
    CheckoutPickUpInStoreDetailsModule,
    PickupInStoreDetailsReviewModule,
    OrderConfirmationPickupInStoreModule,
  ],
  providers: [provideDefaultConfig(defaultPickupOptionsDialogLayoutConfig)],
})
export class PickupInStoreComponentsModule {}
