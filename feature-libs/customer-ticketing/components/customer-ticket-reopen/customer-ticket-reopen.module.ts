import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
} from '@spartacus/storefront';
import { CustomerTicketReopenComponent } from './customer-ticket-reopen.component';
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
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SupportTicketReopenComponent: {
          component: CustomerTicketReopenComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [
    CustomerTicketReopenComponent,
    CustomerTicketingReopenDialogComponent,
  ],
  exports: [CustomerTicketReopenComponent],
})
export class CustomerTicketReopenModule {}
