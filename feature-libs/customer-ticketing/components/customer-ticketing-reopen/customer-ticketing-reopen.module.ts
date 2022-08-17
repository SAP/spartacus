import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CustomerTicketingReopenComponent } from './customer-ticketing-reopen.component';
import {
  FileUploadModule,
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
} from '@spartacus/storefront';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerTicketingReopenDialogComponent } from './customer-ticketing-reopen-dialog/customer-ticketing-reopen-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    IconModule,
    KeyboardFocusModule,
    ReactiveFormsModule,
    FormErrorsModule,
    FileUploadModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SupportTicketReopenComponent: {
          component: CustomerTicketingReopenComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [
    CustomerTicketingReopenComponent,
    CustomerTicketingReopenDialogComponent,
  ],
  exports: [CustomerTicketingReopenComponent],
})
export class CustomerTicketingReopenModule {}
