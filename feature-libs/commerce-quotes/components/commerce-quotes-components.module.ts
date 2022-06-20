import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  I18nModule,
  UrlModule,
  provideDefaultConfig,
  CmsConfig,
  AuthGuard,
} from '@spartacus/core';
import { ListNavigationModule, ViewConfig } from '@spartacus/storefront';
import { CommerceQuotesListComponent } from './commerce-quotes-list/commerce-quotes-list.component';
import { CommerceQuotesRequestQuoteButtonModule } from './commerce-quotes-request-quote-button/commerce-quotes-request-quote-button.module';
import { CommerceQuotesRequestQuoteDialogModule } from './commerce-quotes-request-quote-dialog/commerce-quotes-request-quote-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    CommerceQuotesRequestQuoteButtonModule,
    CommerceQuotesRequestQuoteDialogModule,
    I18nModule,
    UrlModule,
    RouterModule,
    ListNavigationModule,
  ],
  providers: [
    provideDefaultConfig(<ViewConfig>{
      view: {
        defaultPageSize: 5,
      },
    }),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountMyQuotesComponent: {
          component: CommerceQuotesListComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [CommerceQuotesListComponent],
  exports: [CommerceQuotesListComponent],
})
export class CommerceQuotesComponentsModule {}
