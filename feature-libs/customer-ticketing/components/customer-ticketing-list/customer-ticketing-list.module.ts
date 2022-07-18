import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  FeaturesConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';

import { CustomerTicketingListTableComponent } from './customer-ticketing-list-table/customer-ticketing-list-table.component';
import { CustomerTicketingListHeaderComponent } from './customer-ticketing-list-header/customer-ticketing-list-header.component';

const moduleComponents = [
  CustomerTicketingListTableComponent,
  CustomerTicketingListHeaderComponent,
];

@NgModule({
  imports: [CommonModule, I18nModule, UrlModule, RouterModule],
  providers: [
    provideDefaultConfig(<CmsConfig | FeaturesConfig>{
      cmsComponents: {
        CustomerTicketingListComponent: {
          component: CustomerTicketingListComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: moduleComponents,
  exports: moduleComponents,
})
export class CustomerTicketingListModule {}
