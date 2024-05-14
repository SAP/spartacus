/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { EstimatedDeliveryDateComponent } from './components/estimated-delivery-date/estimated-delivery-date.component';
import { EstimatedDeliveryDateModule } from './components/estimated-delivery-date/estimated-delivery-date.module';

@NgModule({
  imports: [EstimatedDeliveryDateModule],
  providers: [
    provideOutlet({
      id: CartOutlets.ITEM_DETAILS,
      position: OutletPosition.AFTER,
      component: EstimatedDeliveryDateComponent,
    }),
  ],
})
export class EstimatedDeliveryDateRootModule {}
