/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuoteCoreConfig } from '@spartacus/quote/core';
import { QuoteActionType } from '@spartacus/quote/root';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { QuoteActionsByRoleComponent } from './quote-actions-by-role.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  providers: [
    provideDefaultConfig(<QuoteCoreConfig>{
      quote: {
        actions: {
          primaryActions: [
            QuoteActionType.APPROVE,
            QuoteActionType.CHECKOUT,
            QuoteActionType.SUBMIT,
            QuoteActionType.REQUOTE,
          ],
          actionsOrderByState: {
            BUYER_DRAFT: [
              QuoteActionType.SUBMIT,
              QuoteActionType.EDIT,
              QuoteActionType.CANCEL,
            ],
            BUYER_OFFER: [
              QuoteActionType.CHECKOUT,
              QuoteActionType.EDIT,
              QuoteActionType.CANCEL,
            ],
            CANCELLED: [QuoteActionType.REQUOTE],
            EXPIRED: [QuoteActionType.REQUOTE, QuoteActionType.CANCEL],
            SELLER_REQUEST: [QuoteActionType.SUBMIT, QuoteActionType.EDIT],
            SELLER_DRAFT: [QuoteActionType.SUBMIT, QuoteActionType.EDIT],
          },
        },
      },
    }),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteActionsByRoleComponent: {
          component: QuoteActionsByRoleComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [QuoteActionsByRoleComponent],
  exports: [QuoteActionsByRoleComponent],
})
export class QuoteActionsByRoleModule {}
