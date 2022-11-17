import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CustomerTicketingMessagesComponent } from './customer-ticketing-messages.component';
import { MessagingModule } from '@spartacus/storefront';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    MessagingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SupportTicketUpdateComponent: {
          component: CustomerTicketingMessagesComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [CustomerTicketingMessagesComponent],
  exports: [CustomerTicketingMessagesComponent],
})
export class CustomerTicketingMessagesModule {}
