/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { OrderDetailAttachmentsComponent } from './order-detail-attachments/order-detail-attachments.component';
import { AttachmentsDialogComponent } from './order-detail-attachments/attachments-dialog/attachments-dialog.component';
import { defaultOrderAttachmentsLayoutConfig } from './config/order-attachments-layout.config';
import { defaultOrderCmsConfig } from './config/order-attachments-cms.config';
import { IconModule, KeyboardFocusModule, MessageComponentModule, SpinnerModule } from '@spartacus/storefront';
import { CommonModule } from '@angular/common';

const moduleComponents = [
  OrderDetailAttachmentsComponent,
  AttachmentsDialogComponent,
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
  providers: [
    provideDefaultConfig(defaultOrderCmsConfig),
    provideDefaultConfig(defaultOrderAttachmentsLayoutConfig),
  ],
  declarations: [...moduleComponents],
  exports: [...moduleComponents],
})
export class S4omComponentsModule {
}
