/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  UrlModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { CardModule, SpinnerModule } from '@spartacus/storefront';
import { CustomerTicketingDetailsComponent } from './customer-ticketing-details.component';

@NgModule({
  imports: [CommonModule, I18nModule, UrlModule, CardModule, SpinnerModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SupportTicketDetailsComponent: {
          component: CustomerTicketingDetailsComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [CustomerTicketingDetailsComponent],
  exports: [CustomerTicketingDetailsComponent],
})
export class CustomerTicketingDetailsModule {}
