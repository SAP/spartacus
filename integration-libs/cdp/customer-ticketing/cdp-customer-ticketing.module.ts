/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  CustomerTicketingCloseComponentService,
  CustomerTicketingMessagesComponentService,
  CustomerTicketingReopenComponentService,
} from '@spartacus/customer-ticketing/components';
import { CdpCustomerTicketingCloseComponentService } from './cdp-customer-ticketing-close-component.service';
import { CdpCustomerTicketingReopenComponentService } from './cdp-customer-ticketing-reopen-component.service';
import { CdpCustomerTicketingMessagesComponentService } from './cdp-customer-ticketing-messages-component.service';

@NgModule({
  imports: [],
  providers: [
    {
      provide: CustomerTicketingCloseComponentService,
      useClass: CdpCustomerTicketingCloseComponentService,
    },
    {
      provide: CustomerTicketingReopenComponentService,
      useClass: CdpCustomerTicketingReopenComponentService,
    },
    {
      provide: CustomerTicketingMessagesComponentService,
      useClass: CdpCustomerTicketingMessagesComponentService,
    },
  ],
  declarations: [],
})
export class CdpCustomerTicketingModule {}
