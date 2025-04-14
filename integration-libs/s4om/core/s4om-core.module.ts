/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { S4omOrderAttachmentsFacade, S4omOrderAttachmentsService } from './facade';
import { S4omOrderAttachmentsConnector } from './connector';

@NgModule({
  providers: [
    S4omOrderAttachmentsConnector,
    S4omOrderAttachmentsService,
    {
      provide: S4omOrderAttachmentsFacade,
      useExisting: S4omOrderAttachmentsService,
    },
  ],
})
export class S4omCoreModule {
}
