import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CustomerTicketReopenComponent } from './customer-ticket-reopen.component';

@NgModule({
  imports: [CommonModule, I18nModule, UrlModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SupportTicketReopenComponent: {
          component: CustomerTicketReopenComponent,
          gurds: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [CustomerTicketReopenComponent],
  exports: [CustomerTicketReopenComponent],
})
export class CustomerTicketReopenModule {}
