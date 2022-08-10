import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CustomerTicketingCloseComponent } from './customer-ticketing-close.component';

@NgModule({
  imports: [CommonModule, I18nModule, UrlModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SupportTicketCloseComponent: {
          component: CustomerTicketingCloseComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [CustomerTicketingCloseComponent],
  exports: [CustomerTicketingCloseComponent],
})
export class CustomerTicketingCloseModule {}
