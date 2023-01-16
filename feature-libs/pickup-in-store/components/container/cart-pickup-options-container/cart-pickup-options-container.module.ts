/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PickupOptionsModule } from '../../presentational/index';

import { CartPickupOptionsContainerComponent } from './cart-pickup-options-container.component';

@NgModule({
  imports: [CommonModule, PickupOptionsModule],
  exports: [CartPickupOptionsContainerComponent],
  declarations: [CartPickupOptionsContainerComponent],
  // providers: [
  //   provideOutlet({
  //     id: CartOutlets.ITEM_DELIVERY_DETAILS,
  //     position: OutletPosition.REPLACE,
  //     component: CartPickupOptionsContainerComponent,
  //   }),
  // ],
})
export class CartPickupOptionsContainerModule {}
