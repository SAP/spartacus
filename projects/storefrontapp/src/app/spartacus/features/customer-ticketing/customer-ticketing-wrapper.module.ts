/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { CustomerTicketingModule } from '@spartacus/customer-ticketing';
import { CdpCustomerTicketingModule } from '@spartacus/cdp/customer-ticketing';

const extensions: Type<any>[] = [];

if (environment.cdp) {
  extensions.push(CdpCustomerTicketingModule);
}

@NgModule({
  imports: [CustomerTicketingModule, ...extensions],
})
export class CustomerTicketingWrapperModule {}
