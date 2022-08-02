import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CQConfig } from '@spartacus/commerce-quotes/core';
import { QuoteAction } from '@spartacus/commerce-quotes/root';
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
        primaryActions: [
          QuoteAction.APPROVE,
          QuoteAction.CHECKOUT,
          QuoteAction.SUBMIT,
        ],
        actionsOrderByState: {
          BUYER_DRAFT: [QuoteAction.CANCEL, QuoteAction.SUBMIT],
          CANCELLED: [QuoteAction.REQUOTE],
          SELLER_REQUEST: [QuoteAction.EDIT, QuoteAction.SUBMIT],
          BUYER_OFFER: [
            QuoteAction.CANCEL,
            QuoteAction.EDIT,
            QuoteAction.CHECKOUT,
          ],
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
