/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  AsmCustomer360Request,
  AsmCustomer360Response,
} from '@spartacus/asm/customer-360/root';
import { Observable } from 'rxjs';

import { AsmCustomer360Adapter } from './asm-customer-360.adapter';

@Injectable({
  providedIn: 'root',
})
export class AsmCustomer360Connector {
  constructor(protected asmCustomer360Adapter: AsmCustomer360Adapter) {}

  getAsmCustomer360Data(
    request: AsmCustomer360Request
  ): Observable<AsmCustomer360Response> {
    return this.asmCustomer360Adapter.getAsmCustomer360Data(request);
  }
}
