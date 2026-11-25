/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FiscalId } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class CheckoutFiscalIdAdapter {
  abstract setFiscalId(
    userId: string,
    cartId: string,
    fiscalId: FiscalId
  ): Observable<unknown>;
}
