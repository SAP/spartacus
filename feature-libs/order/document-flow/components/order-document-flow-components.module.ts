/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { OrderDocumentFlowComponent } from './order-document-flow';
import { defaultOrderDocumentFlowDialogLayoutConfig } from './default-order-document-flow-dialog-layout.config';
import {
  OrderDocumentFlowDialogComponent,
  OrderDocumentOrderEntryListComponent,
  OrderSubsequentDocumentListComponent,
  OrderSubsequentDocumentNodeComponent,
} from './order-document-flow-dialog';
import { CommonModule } from '@angular/common';
import {
  IconModule,
  KeyboardFocusModule,
  MessageComponentModule,
  SpinnerModule,
} from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    SpinnerModule,
    RouterModule,
    KeyboardFocusModule,
    IconModule,
    MessageComponentModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountOrderDocumentFlowComponent: {
          component: OrderDocumentFlowComponent,
          guards: [AuthGuard],
        },
      },
    }),
    provideDefaultConfig(defaultOrderDocumentFlowDialogLayoutConfig),
  ],
  declarations: [
    OrderDocumentFlowComponent,
    OrderDocumentFlowDialogComponent,
    OrderSubsequentDocumentListComponent,
    OrderSubsequentDocumentNodeComponent,
    OrderDocumentOrderEntryListComponent,
  ],
  exports: [
    OrderDocumentFlowComponent,
    OrderDocumentFlowDialogComponent,
    OrderSubsequentDocumentListComponent,
    OrderSubsequentDocumentNodeComponent,
    OrderDocumentOrderEntryListComponent,
  ],
})
export class OrderDocumentFlowComponentsModule {}
