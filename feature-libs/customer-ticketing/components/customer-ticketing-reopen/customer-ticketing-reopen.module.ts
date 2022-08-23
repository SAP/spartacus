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

@NgModule({
  imports: [CommonModule, I18nModule, UrlModule],
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
  declarations: [CustomerTicketingReopenComponent],
  exports: [CustomerTicketingReopenComponent],
})
export class CustomerTicketingReopenModule {}
