import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { CustomerTicketingDialogComponent } from './customer-ticketing-dialog.component';
import {
  FileUploadModule,
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
} from '@spartacus/storefront';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    KeyboardFocusModule,
    ReactiveFormsModule,
    FormErrorsModule,
    FileUploadModule,
  ],
  declarations: [CustomerTicketingDialogComponent],
  exports: [CustomerTicketingDialogComponent],
})
export class CustomerTicketingDialogModule {}
