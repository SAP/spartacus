/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { CustomerTicketingEventListener } from './customer-ticketing-event.listener';

@NgModule({
  providers: [
    provideAppInitializer(() => {
      inject(CustomerTicketingEventListener);
    }),
  ],
})
export class CustomerTicketingEventModule {}
