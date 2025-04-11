/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OrderAttachmentsFacade, OrderAttachmentsService } from './facade';
import { OrderAttachmentsConnector } from './connector';

@NgModule({
  providers: [
    OrderAttachmentsConnector,
    OrderAttachmentsService,
    {
      provide: OrderAttachmentsFacade,
      useExisting: OrderAttachmentsService,
    },
  ],
})
export class S4omOrderCoreModule {
}
