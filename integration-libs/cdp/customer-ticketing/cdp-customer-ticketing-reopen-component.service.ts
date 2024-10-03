/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CustomerTicketingReopenComponentService } from '@spartacus/customer-ticketing/components';
import { Observable, of } from 'rxjs';

@Injectable()
export class CdpCustomerTicketingReopenComponentService extends CustomerTicketingReopenComponentService {
  enableReopenButton(): Observable<boolean | undefined> {
    return of(false);
  }
}
