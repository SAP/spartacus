/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CustomerTicketingMessagesComponent } from './customer-ticketing-messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatMessagingModule } from '@spartacus/storefront';
import { CustomerTicketingMessagesComponentService } from './customer-ticketing-messages-component.service';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    ChatMessagingModule,
    ReactiveFormsModule,
    FormsModule,
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
  declarations: [CustomerTicketingMessagesComponent],
  exports: [CustomerTicketingMessagesComponent],
})
export class CustomerTicketingMessagesModule {}
