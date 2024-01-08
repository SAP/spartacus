/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  UrlModule,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  CardModule,
  IconModule,
  ListNavigationModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { CustomerTicketingCreateModule } from '../customer-ticketing-create/customer-ticketing-create.module';
import { CustomerTicketingListComponent } from './customer-ticketing-list.component';

@NgModule({
  imports: [
    CustomerTicketingCreateModule,
    CommonModule,
    I18nModule,
    UrlModule,
    CardModule,
    IconModule,
    ListNavigationModule,
    RouterModule,
    SpinnerModule,
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
