/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule, KeyboardFocusModule, MessageComponentModule, SpinnerModule } from '@spartacus/storefront';
import { CommonModule } from '@angular/common';
import { S4omOrderDetailAttachmentsComponent } from './s4om-order-detail-attachments.component';
import { S4omAttachmentsDialogComponent } from './attachments-dialog/s4om-attachments-dialog.component';

const moduleComponents = [
  S4omOrderDetailAttachmentsComponent,
  S4omAttachmentsDialogComponent,
];

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    I18nModule,
    SpinnerModule,
    MessageComponentModule,
    KeyboardFocusModule,
  ],
  declarations: [...moduleComponents],
  exports: [...moduleComponents],
})
export class S4omOrderAttachmentsModule {
}
