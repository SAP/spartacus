/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { ChatMessagingModule } from '@spartacus/storefront';
import { CustomerTicketingMessagesComponentService } from './customer-ticketing-messages-component.service';
import { CustomerTicketingMessagesComponent } from './customer-ticketing-messages.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    ChatMessagingModule,
    ReactiveFormsModule,
    FormsModule,
    CustomerTicketingMessagesComponent,
  ],
  providers: [
    CustomerTicketingMessagesComponentService,
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SupportTicketUpdateComponent: {
          component: CustomerTicketingMessagesComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  exports: [CustomerTicketingMessagesComponent],
})
export class CustomerTicketingMessagesModule {}
