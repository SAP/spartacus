/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { CustomerTicketingFacade } from '@spartacus/customer-ticketing/root';
import { CustomerTicketingService } from './customer-ticketing.service';

export const facadeProviders: Provider[] = [
  CustomerTicketingService,
  {
    provide: CustomerTicketingFacade,
    useExisting: CustomerTicketingService,
  },
];
