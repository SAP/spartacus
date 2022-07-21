import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CustomerTicketMessagesComponent } from './customer-ticket-messages.component';
import { MessagingModule } from '@spartacus/storefront';

@NgModule({
  imports: [CommonModule, I18nModule, UrlModule, MessagingModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SupportTicketUpdateComponent: {
          component: CustomerTicketMessagesComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [CustomerTicketMessagesComponent],
  exports: [CustomerTicketMessagesComponent],
})
export class CustomerTicketMessagesModule {}
