/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartAssociatedQuotePurchaseOrderNumberFacade } from '@spartacus/cart/base/root';

@Injectable()
export class CartAssociatedQuotePurchaseOrderNumberService
  implements CartAssociatedQuotePurchaseOrderNumberFacade
{
  isPurchaseOrderNumberNonEditable(_: string): Observable<boolean> {
    return of(false);
  }
}
