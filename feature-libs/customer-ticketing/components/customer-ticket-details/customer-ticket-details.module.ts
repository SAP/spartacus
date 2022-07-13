import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CardModule } from '@spartacus/storefront';
import { CustomerTicketDetailsComponent } from './customer-ticket-details.component';

@NgModule({
  imports: [CommonModule, I18nModule, UrlModule, CardModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SupportTicketDetailsComponent: {
          component: CustomerTicketDetailsComponent,
          gurds: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [CustomerTicketDetailsComponent],
  exports: [CustomerTicketDetailsComponent],
})
export class CustomerTicketDetailsModule {}
