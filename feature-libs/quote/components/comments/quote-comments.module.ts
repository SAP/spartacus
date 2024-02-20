/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
import { QuoteCommentsComponent } from './quote-comments.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, ChatMessagingModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteCommentsComponent: {
          component: QuoteCommentsComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [QuoteCommentsComponent],
  exports: [QuoteCommentsComponent],
})
export class QuoteCommentsModule {}
