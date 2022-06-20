import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommerceQuotesRequestQuoteButtonComponent } from './commerce-quotes-request-quote-button.component';
import { ModalModule } from '@spartacus/storefront';
import { I18nModule } from '@spartacus/core';

@NgModule({
  declarations: [CommerceQuotesRequestQuoteButtonComponent],
  exports: [CommerceQuotesRequestQuoteButtonComponent],
  imports: [CommonModule, ModalModule, I18nModule],
})
export class CommerceQuotesRequestQuoteButtonModule {}
