import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CustomerTicketCloseComponent } from './customer-ticket-close.component';

@NgModule({
  imports: [CommonModule, I18nModule, UrlModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SupportTicketCloseComponent: {
          component: CustomerTicketCloseComponent,
          gurds: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [CustomerTicketCloseComponent],
  exports: [CustomerTicketCloseComponent],
})
export class CustomerTicketCloseModule {}
