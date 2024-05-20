/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CustomerTicketingEventListener } from './customer-ticketing-event.listener';

@NgModule({})
export class CustomerTicketingEventModule {
  constructor(_customerTicketingEventListener: CustomerTicketingEventListener) {
    // Intentional empty constructor
  }
}
