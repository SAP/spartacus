/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import {
  IconModule,
  OutletPosition,
  provideOutlet,
} from '@spartacus/storefront';
import { EstimatedDeliveryDateComponent } from '../components/estimated-delivery-date.component';
import { I18nModule, UrlModule, provideDefaultConfig } from '@spartacus/core';
import { CommonModule } from '@angular/common';
import { defaultOccCartWithEddConfig } from '../root/occ/default-occ-cart-with-edd.config';

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
export class EstimatedDeliveryDateComponentModule {}
