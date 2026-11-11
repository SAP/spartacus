/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, inject, provideEnvironmentInitializer } from '@angular/core';
import { CustomerTicketingEventListener } from './customer-ticketing-event.listener';

@NgModule({
  providers: [
    provideEnvironmentInitializer(() => {
      inject(CustomerTicketingEventListener);
    }),
  ],
})
export class CustomerTicketingEventModule {}
