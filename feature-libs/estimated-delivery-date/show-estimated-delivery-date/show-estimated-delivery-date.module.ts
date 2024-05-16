/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule, provideDefaultConfig } from '@spartacus/core';
import {
  IconModule,
  OutletPosition,
  provideOutlet,
} from '@spartacus/storefront';
import { EstimatedDeliveryDateComponent } from './components/estimated-delivery-date.component';
import { defaultOccCartWithEddConfig } from './config/default-occ-cart-with-edd.config';
import { CartOutlets } from '@spartacus/cart/base/root';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, IconModule],

  declarations: [EstimatedDeliveryDateComponent],
  exports: [EstimatedDeliveryDateComponent],
  providers: [
    provideDefaultConfig(defaultOccCartWithEddConfig),
    provideOutlet({
      id: CartOutlets.ITEM_DETAILS,
      position: OutletPosition.AFTER,
      component: EstimatedDeliveryDateComponent,
    }),
  ],
})
export class ShowEstimatedDeliveryDateModule {}
