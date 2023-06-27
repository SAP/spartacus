/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  BindCartParams,
  CustomerListsPage,
  CustomerRegistrationForm,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import { User } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AsmAdapter } from './asm.adapter';

@Injectable({
  providedIn: 'root',
})
export class AsmConnector {
  constructor(protected asmAdapter: AsmAdapter) {}

  customerSearch(
    options: CustomerSearchOptions
  ): Observable<CustomerSearchPage> {
    return this.asmAdapter.customerSearch(options);
  }

  customerLists(): Observable<CustomerListsPage> {
    return this.asmAdapter.customerLists();
  }

  bindCart(options: BindCartParams): Observable<unknown> {
    return this.asmAdapter.bindCart(options);
  }

  createCustomer(user: CustomerRegistrationForm): Observable<User> {
    return this.asmAdapter.createCustomer(user);
  }
}
