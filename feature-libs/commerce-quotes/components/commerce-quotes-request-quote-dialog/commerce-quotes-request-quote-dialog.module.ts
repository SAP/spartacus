import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
  ModalModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { I18nModule, UrlModule } from '@spartacus/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommerceQuotesRequestQuoteDialogComponent } from './commerce-quotes-request-quote-dialog.component';

@NgModule({
  declarations: [CommerceQuotesRequestQuoteDialogComponent],
  exports: [CommerceQuotesRequestQuoteDialogComponent],
  imports: [
    CommonModule,
    ModalModule,
    I18nModule,
    UrlModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorsModule,
    RouterModule,
    KeyboardFocusModule,
    SpinnerModule,
  ],
})
export class CommerceQuotesRequestQuoteDialogModule {}
