/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { ChatMessagingModule, IconModule } from '@spartacus/storefront';
import { QuoteDetailsCommentComponent } from './quote-details-comment.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, ChatMessagingModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteContactVendorComponent: {
          component: QuoteDetailsCommentComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [QuoteDetailsCommentComponent],
  exports: [QuoteDetailsCommentComponent],
})
export class QuoteDetailsCommentModule {}
