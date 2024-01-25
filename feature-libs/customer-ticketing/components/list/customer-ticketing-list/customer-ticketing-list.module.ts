/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardModule,
  IconModule,
  ListNavigationModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CustomerTicketingListComponent } from './customer-ticketing-list.component';
import { CustomerTicketingCreateModule } from '../customer-ticketing-create/customer-ticketing-create.module';

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
