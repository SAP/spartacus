/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideDefaultConfig } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { CustomerTicketingCloseModule } from './details/customer-ticketing-close';
import { CustomerTicketingDetailsModule } from './details/customer-ticketing-details';
import { CustomerTicketingMessagesModule } from './details/customer-ticketing-messages';
import { CustomerTicketingReopenModule } from './details/customer-ticketing-reopen';
import { CustomerTicketingCreateModule } from './list/customer-ticketing-create';
import { CustomerTicketingListModule } from './list/customer-ticketing-list';
import { MyAccountV2CustomerTicketingModule } from './my-account-v2';
import { defaultCustomerTicketingFormLayoutConfig } from './shared/customer-ticketing-dialog';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormErrorsModule,
    CustomerTicketingDetailsModule,
    CustomerTicketingCloseModule,
    CustomerTicketingReopenModule,
    CustomerTicketingListModule,
    CustomerTicketingMessagesModule,
    CustomerTicketingCreateModule,
    MyAccountV2CustomerTicketingModule,
  ],
  providers: [provideDefaultConfig(defaultCustomerTicketingFormLayoutConfig)],
})
export class CustomerTicketingComponentsModule {}
