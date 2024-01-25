/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { PDFInvoicesComponentsModule } from '@spartacus/pdf-invoices/components';
import { RequestedDeliveryDateComponentsModule } from '@spartacus/requested-delivery-date/root';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { ScheduleLinesComponent } from './components/schedule-lines/schedule-lines.component';
import { ScheduleLinesModule } from './components/schedule-lines/schedule-lines.module';

@NgModule({
  imports: [
    ScheduleLinesModule,
    RequestedDeliveryDateComponentsModule, //Adding dependency with Requested Delivery Date so that the library gets installed along with S4OM
    PDFInvoicesComponentsModule, //Adding dependency with PDF Invoices so that the library gets installed along with S4OM
  ],
  providers: [
    provideOutlet({
      id: CartOutlets.ITEM_DETAILS,
      position: OutletPosition.AFTER,
      component: ScheduleLinesComponent,
    }),
  ],
})
export class S4omRootModule {}
