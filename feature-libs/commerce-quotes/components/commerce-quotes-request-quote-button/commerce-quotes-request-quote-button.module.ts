import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommerceQuotesRequestQuoteButtonComponent } from './commerce-quotes-request-quote-button.component';
import { ModalModule } from '@spartacus/storefront';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';

@NgModule({
  declarations: [CommerceQuotesRequestQuoteButtonComponent],
  exports: [CommerceQuotesRequestQuoteButtonComponent],
  imports: [CommonModule, ModalModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CommerceQuotesRequestComponent: {
          component: CommerceQuotesRequestQuoteButtonComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
})
export class CommerceQuotesRequestQuoteButtonModule {}
