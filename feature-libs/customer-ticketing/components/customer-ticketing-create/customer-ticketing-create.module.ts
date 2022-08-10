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
  FileUploadModule,
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
} from '@spartacus/storefront';
import { CustomerTicketingCreateDialogComponent } from './customer-ticketing-create-dialog/customer-ticketing-create-dialog.component';
import { CustomerTicketingCreateComponent } from './customer-ticketing-create.component';

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
        SupportTicketCreateComponent: {
          component: CustomerTicketingCreateComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [
    CustomerTicketingCreateComponent,
    CustomerTicketingCreateDialogComponent,
  ],
  exports: [CustomerTicketingCreateComponent],
})
export class CustomerTicketingCreateModule {}
