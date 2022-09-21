import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule, IconModule } from '@spartacus/storefront';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CustomerTicketingListComponent } from './customer-ticketing-list.component';
import { ListNavigationModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    CardModule,
    IconModule,
    ListNavigationModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SupportTicketHistoryComponent: {
          component: CustomerTicketingListComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [CustomerTicketingListComponent],
  exports: [CustomerTicketingListComponent],
})
export class CustomerTicketingListModule {}
