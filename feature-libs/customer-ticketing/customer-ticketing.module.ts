/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CustomerTicketingComponentsModule } from '@spartacus/customer-ticketing/components';
import { CustomerTicketingCoreModule } from '@spartacus/customer-ticketing/core';
import { CustomerTicketingOccModule } from '@spartacus/customer-ticketing/occ';

@NgModule({
  imports: [
    CustomerTicketingComponentsModule,
    CustomerTicketingCoreModule,
    CustomerTicketingOccModule,
  ],
})
export class CustomerTicketingModule {}
