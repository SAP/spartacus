/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  Customer360Request,
  Customer360Response,
} from '@spartacus/asm/customer-360/root';
import { Observable } from 'rxjs';

import { Customer360Adapter } from './customer-360.adapter';

@Injectable({
  providedIn: 'root',
})
export class Customer360Connector {
  constructor(protected customer360Adapter: Customer360Adapter) {}

  getCustomer360Data(
    request: Customer360Request
  ): Observable<Customer360Response> {
    return this.customer360Adapter.getCustomer360Data(request);
  }
}
