/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  AsmCustomer360Request,
  AsmCustomer360Response,
  BindCartParams,
  CustomerListsPage,
} from '@spartacus/asm/root';
import { Observable } from 'rxjs';

import {
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../models/asm.models';
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

  getCustomer360Data(
    request: AsmCustomer360Request
  ): Observable<AsmCustomer360Response> {
    return this.asmAdapter.getCustomer360Data(request);
  }
}
