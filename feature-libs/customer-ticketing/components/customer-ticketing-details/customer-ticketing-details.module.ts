import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from '@spartacus/storefront';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CustomerTicketingDetailsComponent } from './customer-ticketing-details.component';

@NgModule({
  imports: [CommonModule, I18nModule, UrlModule, CardModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SupportTicketDetailsComponent: {
          component: CustomerTicketingDetailsComponent,
          gurds: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [CustomerTicketingDetailsComponent],
  exports: [CustomerTicketingDetailsComponent],
})
export class CustomerTicketingDetailsModule {}
