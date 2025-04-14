/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { S4OM_FEATURE } from './feature-name';
import { defaultS4omConfig } from './config';

export const defaultS4OMComponentsConfig: CmsConfig = {
  featureModules: {
    [S4OM_FEATURE]: {
      cmsComponents: [
        'S4omOrderAttachmentsComponent',
      ],
    },
  },
};

@NgModule({
  imports: [
    ScheduleLinesModule,
    RequestedDeliveryDateComponentsModule, //Adding dependency with Requested Delivery Date so that the library gets installed along with S4OM
    PDFInvoicesComponentsModule, //Adding dependency with PDF Invoices so that the library gets installed along with S4OM
  ],
  providers: [
    provideDefaultConfig(defaultS4OMComponentsConfig),
    provideDefaultConfig(defaultS4omConfig),
    provideOutlet({
      id: CartOutlets.ITEM_DETAILS,
      position: OutletPosition.AFTER,
      component: ScheduleLinesComponent,
    }),
  ],
})
export class S4omRootModule {}
