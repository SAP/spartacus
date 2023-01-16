/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PickupOptionsModule } from '../../presentational/index';

import { PdpPickupOptionsContainerComponent } from './pdp-pickup-options-container.component';

@NgModule({
  imports: [CommonModule, PickupOptionsModule],
  exports: [PdpPickupOptionsContainerComponent],
  declarations: [PdpPickupOptionsContainerComponent],
  // providers: [
  //   provideOutlet({
  //     id: CartOutlets.ADD_TO_CART_CONTAINER,
  //     position: OutletPosition.REPLACE,
  //     component: PdpPickupOptionsContainerComponent,
  //   }),
  // ],
})
export class PdpPickupOptionsContainerModule {}
