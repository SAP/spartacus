/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { FiscalId } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutFiscalIdAdapter } from './checkout-fiscal-id.adapter';

@Injectable()
export class CheckoutFiscalIdConnector {
  constructor(protected adapter: CheckoutFiscalIdAdapter) {}

  setFiscalId(
    userId: string,
    cartId: string,
    fiscalId: FiscalId
  ): Observable<unknown> {
    return this.adapter.setFiscalId(userId, cartId, fiscalId);
  }
}
