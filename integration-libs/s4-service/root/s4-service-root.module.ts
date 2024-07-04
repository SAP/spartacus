/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { provideOutlet, OutletPosition } from '@spartacus/storefront';
import { ServiceDetailsCardComponent } from '../order/components';

@NgModule({
  providers: [
    provideOutlet({
      id: CartOutlets.SERVICE_DETAILS,
      position: OutletPosition.REPLACE,
      component: ServiceDetailsCardComponent,
    }),
  ],
})
export class S4ServiceRootModule {}
