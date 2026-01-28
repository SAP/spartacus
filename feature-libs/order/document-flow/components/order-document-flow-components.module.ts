/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  IconModule,
  KeyboardFocusModule,
  MessageComponentModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { defaultOrderDocumentFlowDialogLayoutConfig } from './default-order-document-flow-dialog-layout.config';
import { OrderDocumentFlowComponent } from './order-document-flow';
import {
  OrderDocumentFlowDialogComponent,
  OrderDocumentOrderEntryListComponent,
  OrderSubsequentDocumentListComponent,
  OrderSubsequentDocumentNodeComponent,
} from './order-document-flow-dialog';

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
    OrderDocumentFlowComponent,
    OrderDocumentFlowDialogComponent,
    OrderSubsequentDocumentListComponent,
    OrderSubsequentDocumentNodeComponent,
    OrderDocumentOrderEntryListComponent,
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
  exports: [
    OrderDocumentFlowComponent,
    OrderDocumentFlowDialogComponent,
    OrderSubsequentDocumentListComponent,
    OrderSubsequentDocumentNodeComponent,
    OrderDocumentOrderEntryListComponent,
  ],
})
export class OrderDocumentFlowComponentsModule {}
