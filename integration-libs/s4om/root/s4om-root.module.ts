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
import { DEFAULT_MIME_TYPE_CONFIG, S4OM_ORDER_ATTACHMENTS_PREVIEW_MIME_TYPES } from '../components';

export const defaultS4OMComponentsConfig: CmsConfig = {
  featureModules: {
    [S4OM_FEATURE]: {
      cmsComponents: [
        'AccountOrderDetailsOrderAttachmentsComponent',
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
    provideOutlet({
      id: CartOutlets.ITEM_DETAILS,
      position: OutletPosition.AFTER,
      component: ScheduleLinesComponent,
    }),
    {
      provide: S4OM_ORDER_ATTACHMENTS_PREVIEW_MIME_TYPES,
      useValue: DEFAULT_MIME_TYPE_CONFIG
    }
  ],
})
export class S4omRootModule {}
