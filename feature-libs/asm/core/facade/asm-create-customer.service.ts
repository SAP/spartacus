/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CustomerRegistrationForm, AsmCreateCustomerFacade } from '@spartacus/asm/root';
import { Observable } from 'rxjs';
import { AsmConnector } from '../connectors';
import { User } from '@spartacus/core';

@Injectable()
export class AsmCreateCustomerService implements AsmCreateCustomerFacade {
  constructor(
    protected asmConnector: AsmConnector,
  ) {}

  createCustomer(user: CustomerRegistrationForm): Observable<User>{
    return this.asmConnector.createCustomer(user);
  }
}
