/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuoteConfig } from '@spartacus/quote/core';
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
    provideDefaultConfig(<QuoteConfig>{
      quote: {
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
            SELLER_DRAFT: [QuoteActionType.SUBMIT],
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
