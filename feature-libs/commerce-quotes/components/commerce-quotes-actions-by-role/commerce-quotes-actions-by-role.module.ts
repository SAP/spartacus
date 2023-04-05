/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CQConfig } from '@spartacus/commerce-quotes/core';
import { QuoteActionType } from '@spartacus/commerce-quotes/root';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { CommerceQuotesActionsByRoleComponent } from './commerce-quotes-actions-by-role.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  providers: [
    provideDefaultConfig(<CQConfig>{
      commerceQuotes: {
        actions: {
          primaryActions: [
            QuoteActionType.APPROVE,
            QuoteActionType.CHECKOUT,
            QuoteActionType.SUBMIT,
          ],
          actionsOrderByState: {
            BUYER_DRAFT: [QuoteActionType.CANCEL, QuoteActionType.SUBMIT],
            CANCELLED: [QuoteActionType.REQUOTE],
            SELLER_REQUEST: [QuoteActionType.EDIT, QuoteActionType.SUBMIT],
            BUYER_OFFER: [
              QuoteActionType.CANCEL,
              QuoteActionType.EDIT,
              QuoteActionType.CHECKOUT,
            ],
          },
        },
      },
    }),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CommerceQuotesActionsByRoleComponent: {
          component: CommerceQuotesActionsByRoleComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [CommerceQuotesActionsByRoleComponent],
  exports: [CommerceQuotesActionsByRoleComponent],
})
export class CommerceQuotesActionsByRoleModule {}
